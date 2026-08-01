import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Ready to get started?
        </h2>
        <p className="text-xl mb-8 text-slate-300">Join thousands of users who are already using Nova AI.</p>
        <Link to="/register" className="inline-block group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-lg font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Start for free</span>
        </Link>
      </div>
    </section>
  );
}
