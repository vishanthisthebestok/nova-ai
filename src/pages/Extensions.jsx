import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Boxes, Check, Power, Search, Sparkles } from "lucide-react";

export default function Extensions() {
  const [extensions, setExtensions] = useState([
    {
      id: 1,
      name: "Web Search & Fetch",
      category: "Tools",
      description: "Perform real-time web queries and extract content directly into Synaptix chat sessions.",
      installed: true,
    },
    {
      id: 2,
      name: "Code Execution Sandbox",
      category: "Developer",
      description: "Safely execute JavaScript, Python, and SQL snippets directly inside your workspace.",
      installed: true,
    },
    {
      id: 3,
      name: "Neural Image Synthesis",
      category: "Creative",
      description: "Generate high-fidelity UI mockups, icons, and illustrations using generative diffusion models.",
      installed: false,
    },
    {
      id: 4,
      name: "GitHub Repository Sync",
      category: "Developer",
      description: "Connect your GitHub repositories to automatically index commits and pull requests.",
      installed: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("synaptix_extensions");
    if (saved) {
      try {
        setExtensions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("synaptix_extensions", JSON.stringify(extensions));
  }, [extensions]);

  const toggleExtension = (id) => {
    setExtensions(
      extensions.map((ext) =>
        ext.id === id ? { ...ext, installed: !ext.installed } : ext
      )
    );
  };

  const filtered = extensions.filter(
    (ext) =>
      ext.name.toLowerCase().includes(search.toLowerCase()) ||
      ext.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Boxes className="w-6 h-6 text-cyan-400" />
          <span>Extensions & Plugins</span>
        </h1>
        <p className="text-sm text-slate-400">Enhance Synaptix capabilities with modular plugins and tools.</p>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search extensions..."
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
        />
      </div>

      {/* Extensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((ext) => (
          <motion.div
            key={ext.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-[10px] font-mono">
                  {ext.category}
                </span>
                <button
                  onClick={() => toggleExtension(ext.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    ext.installed
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {ext.installed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Installed</span>
                    </>
                  ) : (
                    <>
                      <Power className="w-3.5 h-3.5" />
                      <span>Install</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-2">{ext.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{ext.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/20 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-cyan-300 text-base mb-1">Developer Plugin SDK</h3>
          <p className="text-xs text-slate-300">
            Build custom extensions for Synaptix using our open SDK and TypeScript interfaces.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500/20 text-cyan-300 border border-blue-500/40 rounded-xl text-xs font-medium hover:bg-blue-500/30 transition-all shrink-0">
          View Plugin Docs
        </button>
      </div>
    </div>
  );
}
