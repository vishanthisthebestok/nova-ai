import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 rounded-card bg-slate-100 skeleton" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 rounded-card bg-slate-100 skeleton" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 rounded-card bg-slate-100 skeleton" />
        ))}
      </div>
    </div>
  );
}
