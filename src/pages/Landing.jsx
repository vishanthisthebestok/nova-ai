import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, MessageSquare, Code, Database, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-electric-navy to-slate-900 text-white relative overflow-hidden">
      {/* Electric blue glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Glassmorphism Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/30 rounded-2xl px-6 py-3 flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-cyan rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/20">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-electric-blue via-electric-cyan to-purple-400 bg-clip-text text-transparent">
                  Synaptix
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-electric-blue to-electric-cyan text-white px-6 py-2 rounded-lg hover:from-electric-cyan hover:to-electric-blue transition-all hover:shadow-lg hover:shadow-electric-blue/25"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
          <div className="text-center">
            {/* Large glowing logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-cyan rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-electric-blue to-electric-cyan rounded-3xl flex items-center justify-center shadow-2xl shadow-electric-blue/30">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight"
            >
              <span className="text-white block">Think.</span>
              <span className="text-white block">Build.</span>
              <span className="text-[#06B6D4] block">Create.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light"
            >
              Your neural workspace for coding, research, memory, and creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-electric-blue to-electric-cyan text-white rounded-2xl text-lg font-bold overflow-hidden transition-all hover:shadow-2xl hover:shadow-electric-blue/30 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/studio"
                className="px-8 py-4 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 text-white rounded-2xl text-lg font-semibold hover:bg-slate-800/50 transition-all hover:scale-105 hover:border-electric-blue/30"
              >
                Open Studio
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-slate-400 text-lg">Everything you need in one intelligent workspace</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "AI Chat",
                description: "Intelligent conversations with neural understanding",
                color: "from-electric-blue to-electric-cyan",
                link: "/chat"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Studio",
                description: "Premium workspace for coding and development",
                color: "from-purple-500 to-pink-500",
                link: "/studio"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Core",
                description: "Advanced AI with memory and context awareness",
                color: "from-green-500 to-emerald-500",
                link: "/dashboard"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Files",
                description: "Organize and manage your documents and data",
                color: "from-orange-500 to-red-500",
                link: "/files"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={feature.link} className="block h-full">
                  <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/30 rounded-3xl p-8 hover:bg-slate-800/30 transition-all hover:shadow-2xl hover:shadow-electric-blue/10 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                    <div className="mt-4 flex items-center text-electric-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}