import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Folder, Plus, Search, Trash2, ExternalLink, Code2, Sparkles } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Synaptix AI Engine",
      description: "Neural AI workspace providing conversational intelligence and context memory.",
      status: "Active",
      tech: ["React", "Tailwind", "Vite"],
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Autonomous Data Ingestion",
      description: "High-throughput stream processing pipeline for real-time telemetry.",
      status: "In Progress",
      tech: ["Python", "BigQuery"],
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Chrome DevTools Integration",
      description: "Browser automation suite supporting direct accessibility auditing.",
      status: "Completed",
      tech: ["TypeScript", "Puppeteer"],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", techStr: "" });

  useEffect(() => {
    const saved = localStorage.getItem("synaptix_projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("synaptix_projects", JSON.stringify(projects));
  }, [projects]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const projectItem = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      status: "Active",
      tech: newProject.techStr ? newProject.techStr.split(",").map((t) => t.trim()) : ["React"],
      createdAt: new Date().toISOString(),
    };

    setProjects([projectItem, ...projects]);
    setNewProject({ name: "", description: "", techStr: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Folder className="w-6 h-6 text-cyan-400" />
            <span>Projects Workspace</span>
          </h1>
          <p className="text-sm text-slate-400">Organize and manage software projects, scripts, and modules.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No projects created yet.</p>
          </div>
        ) : (
          filtered.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-[11px] font-mono">
                    {project.status}
                  </span>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-slate-100 text-base mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-medium cursor-pointer hover:underline">
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
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
            <h2 className="text-xl font-bold text-slate-100 mb-4">Create New Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. Neural Vision Agent"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Project scope and objectives..."
                  rows={3}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={newProject.techStr}
                  onChange={(e) => setNewProject({ ...newProject, techStr: e.target.value })}
                  placeholder="React, TypeScript, Tailwind"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
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
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
