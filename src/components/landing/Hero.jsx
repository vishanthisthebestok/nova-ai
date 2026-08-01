import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-5xl font-bold text-slate-900 mb-6">Welcome to Nova AI</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        Your intelligent assistant for productivity, creativity, and automation.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
          Start for free
        </Link>
        <Link to="/login" className="bg-white text-slate-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-50 border border-slate-300">
          Sign in
        </Link>
      </div>
    </section>
  );
}
