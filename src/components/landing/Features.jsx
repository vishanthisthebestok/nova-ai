import React from "react";

export default function Features() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Intelligent Chat</h3>
            <p className="text-slate-600">Natural conversations with AI that understands context.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Smart Prompts</h3>
            <p className="text-slate-600">Create and manage reusable AI prompts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Memory System</h3>
            <p className="text-slate-600">Store and retrieve information across sessions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
