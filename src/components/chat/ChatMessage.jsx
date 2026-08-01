import React from "react";

export default function ChatMessage({ message, isLast, onRegenerate }) {
  return (
    <div className={`p-4 ${message.role === "user" ? "bg-slate-50" : "bg-white"}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>
            {message.role === "user" ? "U" : "N"}
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-700">{message.content}</div>
            {isLast && onRegenerate && (
              <button onClick={onRegenerate} className="mt-2 text-xs text-blue-600 hover:underline">
                Regenerate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
