import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Bookmark, Copy, Check, Trash2, Tag, Sparkles } from "lucide-react";

export default function Prompts() {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: "System Architecture Design",
      category: "Coding",
      content: "Act as a Principal System Architect. Design a highly scalable, fault-tolerant microservice architecture for...",
      createdAt: new Date().toISOString(),
      favorite: true,
    },
    {
      id: 2,
      title: "Code Refactoring & Optimization",
      category: "Development",
      content: "Review the following code snippet for performance bottlenecks, readability, memory leaks, and modern best practices...",
      createdAt: new Date().toISOString(),
      favorite: false,
    },
    {
      id: 3,
      title: "Creative Storytelling & Ideation",
      category: "Creative",
      content: "Generate 5 innovative concepts for a sci-fi narrative centered on neural interfaces and artificial general intelligence...",
      createdAt: new Date().toISOString(),
      favorite: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [newPrompt, setNewPrompt] = useState({ title: "", category: "Coding", content: "" });

  useEffect(() => {
    const saved = localStorage.getItem("synaptix_prompts");
    if (saved) {
      try {
        setPrompts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("synaptix_prompts", JSON.stringify(prompts));
  }, [prompts]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim() || !newPrompt.content.trim()) return;

    const promptItem = {
      id: Date.now(),
      ...newPrompt,
      createdAt: new Date().toISOString(),
      favorite: false,
    };
    setPrompts([promptItem, ...prompts]);
    setNewPrompt({ title: "", category: "Coding", content: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  const toggleFavorite = (id) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["All", "Coding", "Development", "Creative", "Analysis"];

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-cyan-400" />
            <span>Prompt Library</span>
          </h1>
          <p className="text-sm text-slate-400">Manage and reuse your neural prompts for AI workflows.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Prompt</span>
        </button>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
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

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrompts.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No prompts found matching your criteria.</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-[11px] font-medium flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {prompt.category}
                  </span>
                  <button
                    onClick={() => toggleFavorite(prompt.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      prompt.favorite ? "text-amber-400" : "text-slate-600 hover:text-slate-400"
                    }`}
                  >
                    ★
                  </button>
                </div>
                <h3 className="font-semibold text-slate-100 text-base mb-2 group-hover:text-cyan-300 transition-colors">
                  {prompt.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-4 leading-relaxed mb-4">
                  {prompt.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                <span className="text-[10px] text-slate-500">
                  {new Date(prompt.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(prompt.id, prompt.content)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedId === prompt.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(prompt.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-100 mb-4">Create New Prompt</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                  placeholder="e.g. Code Review Assistant"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <select
                  value={newPrompt.category}
                  onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                >
                  <option value="Coding">Coding</option>
                  <option value="Development">Development</option>
                  <option value="Creative">Creative</option>
                  <option value="Analysis">Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Prompt Content</label>
                <textarea
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                  placeholder="Write your prompt details..."
                  rows={5}
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
                  Save Prompt
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
