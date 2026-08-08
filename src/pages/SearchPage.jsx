import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MessageSquare, Bookmark, Brain, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const mockData = [
    {
      id: 1,
      type: "chat",
      icon: MessageSquare,
      title: "System Architecture & Microservices Chat",
      preview: "Discussed optimal scalable microservices structure and event-driven messaging queue using Redis...",
      path: "/chat",
      date: "Today",
    },
    {
      id: 2,
      type: "prompt",
      icon: Bookmark,
      title: "System Architecture Design Prompt",
      preview: "Act as a Principal System Architect. Design a highly scalable, fault-tolerant microservice architecture...",
      path: "/prompts",
      date: "Yesterday",
    },
    {
      id: 3,
      type: "memory",
      icon: Brain,
      title: "Tech Stack Preference Memory",
      preview: "Prefers React + TailwindCSS + Vite for frontend web applications with dark glassmorphism design...",
      path: "/memory",
      date: "3 days ago",
    },
    {
      id: 4,
      type: "file",
      icon: FileText,
      title: "architecture_diagram.png",
      preview: "Image file stored in Synaptix storage • 2.45 MB",
      path: "/files",
      date: "4 days ago",
    },
  ];

  const filtered = mockData.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.type === activeFilter.toLowerCase();
    const matchesQuery =
      !query.trim() ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.preview.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Search className="w-6 h-6 text-cyan-400" />
          <span>Universal Neural Search</span>
        </h1>
        <p className="text-sm text-slate-400">Search across your entire Synaptix workspace: chats, prompts, memories, and files.</p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-4 text-cyan-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything in Synaptix..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 shadow-xl text-base"
          autoFocus
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Chat", "Prompt", "Memory", "File"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeFilter === filter
                ? "bg-blue-500/20 text-cyan-400 border border-blue-500/30"
                : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            {filter === "All" ? "All Types" : `${filter}s`}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No neural matches found for "{query}".</p>
          </div>
        ) : (
          filtered.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  to={item.path}
                  className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-slate-700/80 transition-all hover:shadow-xl group block"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase font-mono tracking-wider">
                          {item.type}
                        </span>
                        <span className="text-[10px] text-slate-500">{item.date}</span>
                      </div>
                      <h3 className="font-semibold text-slate-100 text-base mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-2">{item.preview}</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl text-slate-500 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
