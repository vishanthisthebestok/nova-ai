import React from "react";
import { Link } from "react-router-dom";

export default function PinnedList({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">
        Pin conversations for quick access.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/chat/${item.id}`}
          className="block rounded-btn bg-white p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-float"
        >
          <div className="text-sm font-semibold text-slate-800 truncate">{item.title || "Pinned Chat"}</div>
          <div className="text-[11px] text-slate-400">{item.mode}</div>
        </Link>
      ))}
    </div>
  );
}
