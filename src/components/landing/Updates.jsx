import React from "react";

export default function Updates() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Latest Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="text-sm text-blue-400 mb-2 font-medium">July 2024</div>
            <h3 className="text-lg font-semibold mb-2 text-white">New Voice Mode</h3>
            <p className="text-slate-400">Experience natural voice conversations with Nova.</p>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="text-sm text-purple-400 mb-2 font-medium">June 2024</div>
            <h3 className="text-lg font-semibold mb-2 text-white">Enhanced Memory</h3>
            <p className="text-slate-400">Nova now remembers more context across conversations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
