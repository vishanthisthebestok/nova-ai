import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CHAT_MODES } from "@/lib/modes";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ModePicker from "@/components/chat/ModePicker";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { isModeEnabled } from "@/lib/extensions";
import { Sparkles, Trash2, Download, Pin } from "lucide-react";

const SUGGESTIONS = [
  { title: "Explain a concept", text: "Explain how vector databases work, with a simple analogy.", mode: "general" },
  { title: "Debug my code", text: "Why might useEffect run twice in React 18 StrictMode, and how do I handle it?", mode: "coding" },
  { title: "Reason through it", text: "If a train leaves A at 60mph and another leaves B at 40mph 100 miles away, when do they meet?", mode: "reasoning" },
  { title: "Draft an email", text: "Write a polished cold outreach email for a senior product designer role.", mode: "writing" },
];

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("general");
  const [loading, setLoading] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  const loadConversation = useCallback(async () => {
    if (!id) {
      setConversation(null);
      setMessages([]);
      return;
    }
    setLoadingMsgs(true);
    try {
      const conv = await base44.entities.Conversation.get(id);
      setConversation(conv);
      setMode(conv.mode || "general");
      const msgs = await base44.entities.Message.filter({ conversation_id: id }, "created_date", 200);
      setMessages(msgs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMsgs(false);
    }
  }, [id]);

  useEffect(() => { loadConversation(); }, [loadConversation]);

  const loadMemory = async () => {
    try {
      const mems = await base44.entities.Memory.list("-created_date", 10);
      return (mems || []).map((m) => `- ${m.content}`).join("\n");
    } catch { return ""; }
  };

  const generateAssistant = async (cfg, convId, text, history) => {
    if (cfg.kind === "image") {
      const { url } = await base44.integrations.Core.GenerateImage({ prompt: text });
      return { content_type: "image", media_url: url, content: "Here's the image you requested." };
    }
    if (cfg.kind === "voice") {
      const memoryNotes = await loadMemory();
      const promptParts = [
        cfg.system,
        memoryNotes ? `\nUser context (memory):\n${memoryNotes}` : "",
        ...history.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`),
        `\nUser: ${text}`,
        "\nRespond as Nova with a concise, natural spoken answer.",
      ];
      const res = await base44.integrations.Core.InvokeLLM({ prompt: promptParts.join("\n") });
      const content = typeof res === "string" ? res : res?.response || res?.text || "Here's the response.";
      const { url } = await base44.integrations.Core.GenerateSpeech({ text: content, voice: "honey" });
      return { content_type: "voice", media_url: url, content };
    }
    const memoryNotes = await loadMemory();
    const promptParts = [
      cfg.system,
      memoryNotes ? `\nUser context (memory):\n${memoryNotes}` : "",
      "\nConversation so far:",
      ...history.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`),
      `\nUser: ${text}`,
      "\nRespond as Nova.",
    ];
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: promptParts.join("\n"),
      add_context_from_internet: !!cfg.web,
    });
    const content = typeof res === "string" ? res : res?.response || res?.text || JSON.stringify(res);
    return { content };
  };

  const persistAssistant = async (convId, mode, payload) => {
    const data = { conversation_id: convId, role: "assistant", content: payload.content, mode };
    if (payload.content_type) data.content_type = payload.content_type;
    if (payload.media_url) data.media_url = payload.media_url;
    return await base44.entities.Message.create(data);
  };

  const send = async (text) => {
    let convId = id;
    let conv = conversation;
    if (!convId) {
      conv = await base44.entities.Conversation.create({ title: text.slice(0, 48), mode });
      convId = conv.id;
      setConversation(conv);
      navigate(`/chat/${convId}`, { replace: true });
    } else if (mode !== conv.mode) {
      conv = await base44.entities.Conversation.update(convId, { mode });
      setConversation(conv);
    }

    const userMsg = { id: "tmp-" + Date.now(), conversation_id: convId, role: "user", content: text, mode };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    const history = messages
      .filter((m) => !String(m.id).startsWith("tmp-"))
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const cfg = CHAT_MODES[mode];
      const payload = await generateAssistant(cfg, convId, text, history);

      const savedUser = await base44.entities.Message.create({ conversation_id: convId, role: "user", content: text, mode });
      const saved = await persistAssistant(convId, mode, payload);
      setMessages((m) => m.map((x) => x.id === userMsg.id ? savedUser : x).concat([saved]));
    } catch (e) {
      setMessages((m) => [...m, { id: "err-" + Date.now(), conversation_id: convId, role: "assistant", content: "⚠️ I couldn't generate a response. Please try again.", mode }]);
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async () => {
    if (!id) return;
    const idx = messages.findIndex((m) => m.role === "user");
    const lastUser = idx >= 0 ? messages.filter((m) => m.role === "user").slice(-1)[0] : null;
    if (!lastUser) return;
    const userIdx = messages.findIndex((m) => m.id === lastUser.id);
    setMessages((m) => m.filter((x, i) => !(i === m.length - 1 && x.role === "assistant")));
    setLoading(true);
    try {
      const cfg = CHAT_MODES[mode];
      const history = messages
        .filter((m) => !String(m.id).startsWith("tmp-") && messages.indexOf(m) < userIdx)
        .map((m) => ({ role: m.role, content: m.content }));
      const payload = await generateAssistant(cfg, id, lastUser.content, history);
      const saved = await persistAssistant(id, mode, payload);
      setMessages((m) => m.filter((x, i) => !(i === m.length - 1 && x.role === "assistant")).concat([saved]));
    } catch (e) {
      setMessages((m) => [...m, { id: "err-" + Date.now(), conversation_id: id, role: "assistant", content: "⚠️ Regeneration failed.", mode }]);
    } finally {
      setLoading(false);
    }
  };

  const stop = () => setLoading(false);

  const togglePin = async () => {
    if (!conversation) return;
    const updated = await base44.entities.Conversation.update(conversation.id, { pinned: !conversation.pinned });
    setConversation(updated);
  };

  const del = async () => {
    if (!conversation) return;
    await base44.entities.Message.deleteMany({ conversation_id: conversation.id }).catch(() => {});
    await base44.entities.Conversation.delete(conversation.id);
    navigate("/chat");
  };

  const exportChat = () => {
    const text = messages.map((m) => `## ${m.role === "user" ? "You" : "Nova"}\n\n${m.content}`).join("\n\n---\n\n");
    const blob = new Blob([`# ${conversation?.title || "Chat"}\n\n${text}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(conversation?.title || "chat").replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showEmpty = !id && messages.length === 0;
  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id;

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex h-16 items-center gap-2 border-b border-slate-200 px-4 sm:px-8 bg-white/70 backdrop-blur-md">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-slate-900">{conversation?.title || "New Conversation"}</h1>
        </div>
        {conversation && (
          <div className="flex items-center gap-1">
            <button onClick={togglePin} className="rounded-btn p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600" title="Pin">
              <Pin className="h-4 w-4" fill={conversation.pinned ? "currentColor" : "none"} />
            </button>
            <button onClick={exportChat} className="rounded-btn p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Export">
              <Download className="h-4 w-4" />
            </button>
            <button onClick={del} className="rounded-btn p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600" title="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      {showEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-10">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-card bg-gradient-to-br from-blue-500 to-indigo-600 shadow-glow animate-float">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-slate-900">How can I help today?</h2>
          <p className="mt-2 text-sm text-slate-500">Choose a mode and start a conversation.</p>
          <div className="mt-8 w-full max-w-3xl">
            <ModePicker value={mode} onChange={setMode} />
          </div>
          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2">
            {SUGGESTIONS.filter((s) => isModeEnabled(s.mode)).map((s) => (
              <button
                key={s.title}
                onClick={() => { setMode(s.mode); send(s.text); }}
                className="rounded-card border border-slate-200 bg-white p-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-float hover:border-blue-200"
              >
                <div className="text-xs font-semibold text-slate-800">{s.title}</div>
                <div className="mt-0.5 text-xs text-slate-500 line-clamp-2">{s.text}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-100">
            {loadingMsgs ? (
              <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" /></div>
            ) : (
              messages.map((m) => (
                <ChatMessage key={m.id} message={m} isLast={m.id === lastAssistantId && !loading} onRegenerate={regenerate} />
              ))
            )}
            {loading && <TypingIndicator />}
          </div>
        </div>
      )}

      <ChatInput mode={mode} onModeChange={setMode} onSend={send} loading={loading} onStop={stop} />
    </div>
  );
}
