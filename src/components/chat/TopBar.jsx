import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Search, Sparkles, User, Bell } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function TopBar({ onMenuClick }) {
  const location = useLocation();
  const { user } = useAuth();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/chat")) return "Chat Assistant";
    if (pathname.startsWith("/prompts")) return "Prompt Library";
    if (pathname.startsWith("/memory")) return "Neural Memory";
    if (pathname.startsWith("/projects")) return "Projects Workspace";
    if (pathname.startsWith("/files")) return "Files & Assets";
    if (pathname.startsWith("/search")) return "Universal Search";
    if (pathname.startsWith("/extensions")) return "Extensions & Plugins";
    if (pathname.startsWith("/download")) return "Download Desktop App";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    return "Synaptix AI";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800/60 px-4 md:px-6 bg-slate-900/40 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors border border-slate-800/40"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-100">
            {getPageTitle(location.pathname)}
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-cyan-400 border border-blue-500/20">
            <Sparkles className="w-3 h-3" />
            <span>v2.5 Neural</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search Button */}
        <Link
          to="/search"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">⌘K</kbd>
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "V"}
          </div>
          <span className="hidden md:inline text-xs font-medium text-slate-300">
            {user?.name || "Vishanth"}
          </span>
        </div>
      </div>
    </header>
  );
}
