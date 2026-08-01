import React from "react";

export default function Metrics() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">10K+</div>
          <div className="text-slate-400 mt-2">Active Users</div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1M+</div>
          <div className="text-slate-400 mt-2">Conversations</div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">99.9%</div>
          <div className="text-slate-400 mt-2">Uptime</div>
        </div>
      </div>
    </section>
  );
}
