import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Bot, Key, Shield, LogOut, Sparkles, Check, Moon, Sun } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [savedMessage, setSavedMessage] = useState("");
  const [name, setName] = useState(user?.name || "Vishanth");
  const [email, setEmail] = useState(user?.email || "vishanth@synaptix.ai");
  const [model, setModel] = useState("Gemini 1.5 Pro");
  const [apiKey, setApiKey] = useState("sk-synaptix-••••••••••••••••");

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage("Settings successfully saved!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          <span>System Settings</span>
        </h1>
        <p className="text-sm text-slate-400">Configure your profile, AI model preferences, and workspace parameters.</p>
      </div>

      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{savedMessage}</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Profile Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
          </div>
        </div>

        {/* AI Engine Model Preferences */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>AI Model Engine</span>
          </h2>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Default Model Architecture</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Multimodal & Fast)</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Advanced Reasoning)</option>
              <option value="GPT-4o">GPT-4o (Versatile & Code High-Yield)</option>
              <option value="DeepSeek R1">DeepSeek R1 (Deep Reasoning)</option>
            </select>
          </div>
        </div>

        {/* API & Credentials */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <span>API Keys & Integrations</span>
          </h2>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Custom API Token</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-rose-300 text-base">Sign Out of Session</h3>
          <p className="text-xs text-rose-300/70">Safely log out from this browser instance.</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-sm font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
