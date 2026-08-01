import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, Bookmark, Brain, FileText, Plus, LogOut, Settings, Activity, Zap, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Glassmorphism Sidebar */}
      <aside className="w-72 bg-slate-800/20 backdrop-blur-xl border-r border-slate-700/30 flex flex-col">
        <div className="p-6 border-b border-slate-700/30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Synaptix
              </h1>
              <p className="text-slate-500 text-xs">AI that thinks with you</p>
            </div>
          </motion.div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <Activity className="h-5 w-5" />, label: "Dashboard", path: "/dashboard", active: true },
            { icon: <MessageSquare className="h-5 w-5" />, label: "Chat", path: "/chat" },
            { icon: <Bookmark className="h-5 w-5" />, label: "Prompts", path: "/prompts" },
            { icon: <Brain className="h-5 w-5" />, label: "Memory", path: "/memory" },
            { icon: <FileText className="h-5 w-5" />, label: "Files", path: "/files" },
            { icon: <Settings className="h-5 w-5" />, label: "Settings", path: "/settings" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:bg-slate-700/30 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/30">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/30 hover:text-white transition-all w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Glassmorphism Top Bar */}
        <header className="h-20 bg-slate-800/20 backdrop-blur-xl border-b border-slate-700/30 flex items-center justify-between px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Welcome, Vishanth</p>
              <p className="text-slate-400 text-sm">Premium Workspace</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/chat"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">New Chat</span>
            </Link>
          </motion.div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h1 className="text-5xl font-bold text-white mb-3">
                Your Neural Workspace
              </h1>
              <p className="text-slate-400 text-xl">
                AI that thinks with you. Start creating something amazing.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { icon: <MessageSquare className="h-6 w-6" />, label: "Chats", value: "0", color: "from-blue-500 to-cyan-500" },
                { icon: <Bookmark className="h-6 w-6" />, label: "Prompts", value: "0", color: "from-purple-500 to-pink-500" },
                { icon: <Brain className="h-6 w-6" />, label: "Memory", value: "0", color: "from-green-500 to-emerald-500" },
                { icon: <FileText className="h-6 w-6" />, label: "Files", value: "0", color: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 hover:bg-slate-800/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white`}>
                      {stat.icon}
                    </div>
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <h3 className="text-slate-300 font-semibold text-lg">{stat.label}</h3>
                  <p className="text-slate-500 text-sm">Total items</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 mb-10"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: <Plus className="h-6 w-6" />, label: "New Chat", desc: "Start a conversation", path: "/chat", color: "from-blue-500 to-cyan-500" },
                  { icon: <Bookmark className="h-6 w-6" />, label: "Create Prompt", desc: "Build reusable prompts", path: "/prompts", color: "from-purple-500 to-pink-500" },
                  { icon: <Brain className="h-6 w-6" />, label: "Add Memory", desc: "Store information", path: "/memory", color: "from-green-500 to-emerald-500" },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      to={action.path}
                      className="flex items-center gap-4 p-5 bg-slate-700/20 rounded-xl hover:bg-slate-700/30 transition-all group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform text-white`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{action.label}</h3>
                        <p className="text-slate-400 text-sm">{action.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { icon: <Zap className="h-6 w-6" />, title: "Lightning Fast", desc: "Instant AI responses with our optimized neural architecture" },
                { icon: <Sparkles className="h-6 w-6" />, title: "Creative AI", desc: "Generate ideas, code, and content with unprecedented creativity" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.03 }}
                  className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 hover:bg-slate-800/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
