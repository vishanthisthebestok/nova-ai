import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CHAT_MODES } from "@/lib/modes";
import {
  Plus, MessageSquare, Bookmark, Brain, Sparkles, ArrowUpRight,
  Pin, Clock, Zap, TrendingUp, Layers, FileText,
} from "lucide-react";
import AIActivityChart from "@/components/dashboard/AIActivityChart";
import FilePreviews from "@/components/dashboard/FilePreviews";
import PinnedList from "@/components/dashboard/PinnedList";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { Image } from "@/components/ui/image";
import { isModeEnabled } from "@/lib/extensions";

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [memories, setMemories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [c, p, m, u] = await Promise.all([
        base44.entities.Conversation.list("-updated_date", 8).catch(() => []),
        base44.entities.Prompt.list("-created_date", 4).catch(() => []),
        base44.entities.Memory.list("-created_date", 4).catch(() => []),
        base44.auth.me().catch(() => null),
      ]);
      setConversations(c || []);
      setPrompts(p || []);
      setMemories(m || []);
      if (u) setUser(u);
      setLoading(false);
    })();
  }, []);

  const pinned = conversations.filter((c) => c.pinned);
  const stats = { chats: conversations.length, prompts: prompts.length, memories: memories.length };
  const usage = [40, 65, 48, 80, 55, 92, 70];

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-card border border-blue-400/20 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 sm:p-8 text-white shadow-float animate-fade-up">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-sky-300/20 blur-2xl" />
          <div className="relative">
            <div className="relative mb-3 h-12 w-12">
              <span className="absolute -inset-2 rounded-full bg-white/20 blur-md animate-glow-pulse" aria-hidden="true" />
              <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-soft ring-2 ring-white/50">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Your avatar"
                  fittingType="fill"
                  className="h-12 w-12 object-cover"
                />
              </div>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Welcome back{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-blue-50/90">
              Your intelligent workspace is ready. Start a new conversation, pick a mode, and let Nova help you think, build, and create.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/chat" className="shine-sweep flex items-center gap-1.5 rounded-btn bg-white/95 px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop active:scale-95">
                <Plus className="h-4 w-4" /> New Chat
              </Link>
              <Link to="/prompts" className="flex items-center gap-1.5 rounded-btn bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                <Bookmark className="h-4 w-4" /> Prompt Library
              </Link>
            </div>
          </div>
        </section>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat icon={<MessageSquare className="h-4 w-4" />} label="Conversations" value={stats.chats} tint="text-blue-600 bg-blue-50" delay={0} />
              <Stat icon={<Bookmark className="h-4 w-4" />} label="Prompts" value={stats.prompts} tint="text-violet-600 bg-violet-50" delay={40} />
              <Stat icon={<Brain className="h-4 w-4" />} label="Memories" value={stats.memories} tint="text-emerald-600 bg-emerald-50" delay={80} />
              <Stat icon={<Zap className="h-4 w-4" />} label="This week" value={usage.reduce((a, b) => a + b, 0)} tint="text-sky-600 bg-sky-50" delay={120} />
            </div>

            {/* Quick actions */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {Object.entries(CHAT_MODES).filter(([key]) => isModeEnabled(key)).map(([key, m], i) => (
                <Link
                  key={key}
                  to="/chat"
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="group flex flex-col gap-2 rounded-mode border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow hover:border-blue-200 animate-fade-up"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-btn bg-slate-50 ${m.accent}`}>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{m.label}</div>
                    <div className="text-[11px] text-slate-500">{m.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recent chats */}
              <div className="space-y-6 lg:col-span-2">
                <div>
                  <SectionHeader title="Recent Chats" icon={<Clock className="h-4 w-4" />} action={<Link to="/chat" className="text-xs font-semibold text-blue-600 hover:underline">View all</Link>} />
                  <div className="space-y-2">
                    {conversations.length === 0 && (
                      <div className="rounded-card border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
                        <MessageSquare className="mx-auto mb-2 h-6 w-6" /> No conversations yet.
                      </div>
                    )}
                    {conversations.map((c, i) => (
                      <Link
                        key={c.id}
                        to={`/chat/${c.id}`}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className="group flex items-center justify-between gap-2 rounded-card border border-slate-200 bg-white p-3.5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-float animate-fade-up"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-btn bg-blue-50 text-blue-600">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-800">{c.title || "New Chat"}</div>
                            <div className="text-[11px] text-slate-400">{c.mode}</div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:text-blue-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Files */}
                <div>
                  <SectionHeader title="Recent Files" icon={<FileText className="h-4 w-4" />} />
                  <FilePreviews />
                </div>

                {/* AI Activity */}
                <div className="rounded-card border border-slate-200 bg-white p-5 shadow-soft transition-all hover:shadow-float">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <h3 className="text-sm font-semibold text-slate-800">AI Activity</h3>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">This week</span>
                  </div>
                  <AIActivityChart />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <SectionHeader title="Pinned" icon={<Pin className="h-4 w-4" />} />
                  <PinnedList items={pinned} />
                </div>

                <div>
                  <SectionHeader title="AI Memory" icon={<Brain className="h-4 w-4" />} action={<Link to="/memory" className="text-xs font-semibold text-blue-600 hover:underline">Manage</Link>} />
                  <div className="space-y-2">
                    {memories.length === 0 ? (
                      <div className="rounded-card border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">Add context Nova remembers.</div>
                    ) : memories.map((m) => (
                      <div key={m.id} className="rounded-btn bg-white p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-float">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-slate-500">{m.label}</span>
                        <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">{m.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-card border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-soft transition-all hover:shadow-float">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-slate-800">Workspace Overview</h3>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    <OverviewRow label="Active conversations" value={stats.chats} color="bg-blue-500" pct={Math.min(stats.chats * 10, 100)} />
                    <OverviewRow label="Saved prompts" value={stats.prompts} color="bg-violet-500" pct={Math.min(stats.prompts * 16, 100)} />
                    <OverviewRow label="Memory notes" value={stats.memories} color="bg-emerald-500" pct={Math.min(stats.memories * 20, 100)} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value, tint, delay }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="rounded-card border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-float animate-fade-up">
      <div className={`flex h-8 w-8 items-center justify-center rounded-btn ${tint}`}>{icon}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function SectionHeader({ title, icon, action }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-400">{icon}<h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h2></div>
      {action}
    </div>
  );
}

function OverviewRow({ label, value, color, pct }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-700">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
