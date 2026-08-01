import React from "react";

export default function TypingIndicator() {
  return (
    <div className="p-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
            N
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
