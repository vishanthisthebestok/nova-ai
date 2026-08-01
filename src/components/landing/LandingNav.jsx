import React from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-900">Nova AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
              Sign in
            </Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
