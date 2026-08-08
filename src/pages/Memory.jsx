import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Plus, Search, Trash2, Tag, ShieldCheck, Sparkles } from "lucide-react";

export default function Memory() {
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "Tech Stack Preference",
      category: "Preferences",
      content: "Prefers React + TailwindCSS + Vite for frontend web applications with dark glassmorphism design.",
      importance: "High",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Workspace Context",
      category: "Context",
      content: "Building Synaptix AI application with authentication, real-time chat, and project tracking.",
      importance: "Medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Code Formatting Rules",
      category: "Core",
      content: "Always write modular code, include error handling, and prefer clean functional React hooks.",
      importance: "High",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: "",
    category: "Preferences",
    importance: "Medium",
    content: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("synaptix_memories");
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("synaptix_memories", JSON.stringify(memories));
  }, [memories]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newMemory.title.trim() || !newMemory.content.trim()) return;

    const memoryItem = {
      id: Date.now(),
      ...newMemory,
      createdAt: new Date().toISOString(),
    };

    setMemories([memoryItem, ...memories]);
    setNewMemory({ title: "", category: "Preferences", importance: "Medium", content: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  const filtered = memories.filter((m) => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            <span>Neural Memory</span>
          </h1>
          <p className="text-sm text-slate-400">Manage facts, context, and persistent preferences stored by Synaptix.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Memory</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memories..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {["All", "Core", "Context", "Preferences"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500/20 text-cyan-400 border border-blue-500/30"
                  : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No memories recorded yet.</p>
          </div>
        ) : (
          filtered.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-start justify-between gap-4 hover:border-slate-700/80 transition-all hover:shadow-xl"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-100 text-base">{memory.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-[10px] font-mono">
                    {memory.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono">
                    Priority: {memory.importance}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{memory.content}</p>
                <div className="text-[10px] text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Synced to Synaptix Engine • {new Date(memory.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(memory.id)}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                title="Delete Memory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-100 mb-4">Add Memory Record</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Memory Title</label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  placeholder="e.g. Code Style Standard"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={newMemory.category}
                    onChange={(e) => setNewMemory({ ...newMemory, category: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="Preferences">Preferences</option>
                    <option value="Context">Context</option>
                    <option value="Core">Core</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Importance</label>
                  <select
                    value={newMemory.importance}
                    onChange={(e) => setNewMemory({ ...newMemory, importance: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Memory Information</label>
                <textarea
                  value={newMemory.content}
                  onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                  placeholder="Details you want AI to remember..."
                  rows={4}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md shadow-blue-500/20"
                >
                  Save Memory
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
