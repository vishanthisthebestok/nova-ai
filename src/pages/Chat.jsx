import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Zap,
  Brain,
  MessageSquare,
  RefreshCw
} from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I am **Synaptix Neural AI**. I can help you architect code, brainstorm ideas, analyze data, or organize your workspace. How can we collaborate today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI responses based on input
    setTimeout(() => {
      let aiText = "I have processed your query with high-precision reasoning.";
      const lower = userMessage.content.toLowerCase();

      if (lower.includes("hello") || lower.includes("hi")) {
        aiText = "Welcome to Synaptix! What project or concept shall we work on today?";
      } else if (lower.includes("code") || lower.includes("react") || lower.includes("js")) {
        aiText = "```javascript\n// Synaptix Neural Optimised Function\nexport async function processTask(data) {\n  const result = await synaptix.compute(data);\n  return { success: true, result };\n}\n```\nHere is an optimized clean implementation tailored to your workspace structure.";
      } else if (lower.includes("prompt") || lower.includes("memory")) {
        aiText = "You can save or access custom prompts and memories anytime using the sidebar items. I will contextualize our conversation accordingly!";
      } else {
        aiText = `Analyzing "${userMessage.content}"...\n\n1. **Context Assessment**: Evaluated against Synaptix knowledge base.\n2. **Synthesis**: Formulated a structured solution with clean execution.\n\nLet me know if you would like me to generate full code or drill deeper into any specific step!`;
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1100);
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Chat history cleared. How can I assist you next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const suggestions = [
    "Draft a React component with Framer Motion",
    "Explain quantum computing in simple terms",
    "Create a system architecture outline for a Web app",
    "Optimize SQL query performance for large datasets"
  ];

  return (
    <div className="flex flex-col h-full w-full bg-slate-950/20 backdrop-blur-md">
      {/* Header bar within chat view */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/40 bg-slate-900/30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">Synaptix Neural Engine (Active)</span>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg border border-slate-800/60 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Session</span>
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 text-white shadow-blue-500/20"
                  : "bg-slate-800 border border-slate-700 text-cyan-400"
              }`}
            >
              {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            {/* Bubble */}
            <div className="flex flex-col max-w-[85%] sm:max-w-[75%] space-y-1">
              <div
                className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500/30 rounded-tr-none shadow-lg shadow-blue-500/10"
                    : "bg-slate-900/60 backdrop-blur-md text-slate-200 border-slate-800/80 rounded-tl-none shadow-lg"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {/* Footer metadata */}
              <div
                className={`flex items-center gap-2 text-[10px] text-slate-500 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-slate-300 transition-colors"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 items-center"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="px-4 py-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length < 3 && (
        <div className="px-6 py-2 flex flex-wrap gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInput(s)}
              className="text-xs bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-full transition-all"
            >
              ✨ {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-slate-800/60 bg-slate-900/40 backdrop-blur-xl">
        <form onSubmit={handleSend} className="flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Synaptix anything..."
            className="flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20 active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}