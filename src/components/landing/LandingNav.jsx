import React from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Nova AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-800/50">
              Sign in
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
