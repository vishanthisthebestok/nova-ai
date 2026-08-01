import React from "react";

export default function TopBar({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 px-4 bg-white">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded hover:bg-slate-100">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex-1"></div>
    </header>
  );
}
