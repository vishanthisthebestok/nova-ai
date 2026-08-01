import React, { useState } from "react";

export default function ChatInput({ mode, onModeChange, onSend, loading, onStop }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="border-t border-slate-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {loading ? (
            <button onClick={onStop} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
              Stop
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
