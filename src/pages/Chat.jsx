import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Send, Plus, MoreVertical, MessageSquare, Brain, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function Chat() {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hello! I'm Synaptix, your AI assistant. How can I help you think, build, and create today?" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { id: messages.length + 1, role: "user", content: message };
    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        id: messages.length + 2, 
        role: "assistant", 
        content: "I understand your request. Let me think about this and provide you with the best possible solution..." 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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

        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">New Chat</span>
          </motion.button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-slate-500 text-xs font-medium mb-2 px-2">Recent Chats</div>
          {[1, 2, 3].map((i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, x: 5 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/30 hover:text-white transition-all text-left"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm truncate">Conversation {i}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/30">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/30 hover:text-white transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-20 bg-slate-800/20 backdrop-blur-xl border-b border-slate-700/30 flex items-center justify-between px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <div>
                <h2 className="text-white font-semibold text-lg">Synaptix Chat</h2>
                <p className="text-slate-400 text-sm">AI-powered conversation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-700/30 hover:text-white transition-all">
              <MoreVertical className="h-5 w-5" />
            </button>
          </motion.div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 text-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-700/30">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="relative">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Synaptix anything..."
                  className="w-full bg-transparent text-white placeholder-slate-500 px-6 py-4 pr-14 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </form>
            <div className="flex items-center gap-4 mt-4 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span>Powered by Synaptix AI</span>
              </div>
              <span>•</span>
              <span>Neural understanding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}