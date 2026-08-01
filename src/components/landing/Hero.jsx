import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="py-32 px-4 text-center relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
      <div className="absolute top-32 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
          Welcome to Nova AI
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your intelligent assistant for productivity, creativity, and automation. 
          Experience the future of AI-powered workflows.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="group relative px-8 py-4 rounded-xl text-lg font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Start for free</span>
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-xl text-lg font-medium bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
