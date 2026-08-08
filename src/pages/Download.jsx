import React from "react";
import { motion } from "framer-motion";
import { Download as DownloadIcon, Monitor, Apple, Terminal, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function Download() {
  const platforms = [
    {
      name: "Windows",
      icon: Monitor,
      type: "Installer (.exe)",
      version: "v2.5.0-x64",
      size: "88.4 MB",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "macOS",
      icon: Apple,
      type: "Apple Silicon & Intel (.dmg)",
      version: "v2.5.0-universal",
      size: "94.1 MB",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Linux",
      icon: Terminal,
      type: "Debian & AppImage (.deb / .AppImage)",
      version: "v2.5.0-x86_64",
      size: "76.9 MB",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <DownloadIcon className="w-6 h-6 text-cyan-400" />
          <span>Download Synaptix Desktop</span>
        </h1>
        <p className="text-sm text-slate-400">Get the native desktop app for offline neural acceleration and keyboard shortcuts.</p>
      </div>

      {/* Platform Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-xl group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">{platform.name}</h3>
                <p className="text-xs text-cyan-400 font-mono mb-2">{platform.type}</p>
                <p className="text-xs text-slate-400 mb-6">
                  Version: {platform.version} • Size: {platform.size}
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm">
                <DownloadIcon className="w-4 h-4" />
                <span>Download for {platform.name}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* System Requirements & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-slate-100 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>Desktop Features</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Global ⌘+Space / Alt+Space hotkey invocation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Offline local prompt caching and neural index</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Native OS file system drag-and-drop integration</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-slate-100 text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>System Requirements</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Windows 10+, macOS 11.0+, or modern Linux distro</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>4GB RAM minimum (8GB recommended for high throughput)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>250MB free disk space for installer</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
