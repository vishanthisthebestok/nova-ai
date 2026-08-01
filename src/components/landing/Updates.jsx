import React from "react";

export default function Updates() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500 mb-2">July 2024</div>
            <h3 className="text-lg font-semibold mb-2">New Voice Mode</h3>
            <p className="text-slate-600">Experience natural voice conversations with Nova.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500 mb-2">June 2024</div>
            <h3 className="text-lg font-semibold mb-2">Enhanced Memory</h3>
            <p className="text-slate-600">Nova now remembers more context across conversations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
