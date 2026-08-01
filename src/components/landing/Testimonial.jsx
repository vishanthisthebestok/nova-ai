import React from "react";

export default function Testimonial() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <p className="text-xl text-slate-300 italic leading-relaxed">
              "Nova AI has transformed how I work. It's like having a brilliant assistant available 24/7."
            </p>
            <p className="mt-6 text-white font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              — Sarah Johnson, Product Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
