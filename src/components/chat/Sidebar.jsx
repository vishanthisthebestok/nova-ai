import React from "react";

export default function Sidebar({ open, onToggle }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Nova AI</h1>
          <button onClick={onToggle} className="lg:hidden p-2 rounded hover:bg-slate-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li><a href="/dashboard" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">Dashboard</a></li>
            <li><a href="/chat" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">Chat</a></li>
            <li><a href="/prompts" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">Prompts</a></li>
            <li><a href="/memory" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">Memory</a></li>
            <li><a href="/settings" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">Settings</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
