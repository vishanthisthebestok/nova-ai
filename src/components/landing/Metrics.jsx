import React from "react";

export default function Metrics() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">10K+</div>
          <div className="text-slate-600">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">1M+</div>
          <div className="text-slate-600">Conversations</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">99.9%</div>
          <div className="text-slate-600">Uptime</div>
        </div>
      </div>
    </section>
  );
}
