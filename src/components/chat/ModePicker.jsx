import React from "react";
import { CHAT_MODES } from "@/lib/modes";
import { isModeEnabled } from "@/lib/extensions";

export default function ModePicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {Object.entries(CHAT_MODES)
        .filter(([key]) => isModeEnabled(key))
        .map(([key, mode]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`p-3 rounded-lg border ${
              value === key
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            <div className="text-sm font-medium">{mode.label}</div>
            <div className="text-xs text-slate-500">{mode.description}</div>
          </button>
        ))}
    </div>
  );
}
