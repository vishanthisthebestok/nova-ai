import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Trash2, Search, File, HardDrive, Download, Sparkles } from "lucide-react";

export default function Files() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "architecture_diagram.png",
      size: 2450000,
      type: "image/png",
      category: "Images",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "neural_network_spec.pdf",
      size: 1120000,
      type: "application/pdf",
      category: "Documents",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "synaptix_config.json",
      size: 3400,
      type: "application/json",
      category: "Code",
      uploadedAt: new Date().toISOString(),
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("synaptix_files");
    if (saved) {
      try {
        setFiles(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("synaptix_files", JSON.stringify(files));
  }, [files]);

  const handleUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput?.files.length > 0) {
      const file = fileInput.files[0];
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type || "file",
        category: file.type.startsWith("image/") ? "Images" : file.name.endsWith(".json") || file.name.endsWith(".js") ? "Code" : "Documents",
        uploadedAt: new Date().toISOString(),
      };
      setFiles([newFile, ...files]);
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);
  const usedMB = (totalBytes / (1024 * 1024)).toFixed(2);

  const filtered = files.filter((f) => {
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Files & Storage</span>
          </h1>
          <p className="text-sm text-slate-400">Upload code, datasets, and docs to attach to your AI sessions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Storage Bar */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Neural Storage</h3>
            <p className="text-xs text-slate-400">{usedMB} MB of 500 MB used ({files.length} items)</p>
          </div>
        </div>
        <div className="w-full md:w-64 bg-slate-950/80 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(5, (totalBytes / (500 * 1024 * 1024)) * 100))}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {["All", "Documents", "Code", "Images"].map((cat) => (
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

      {/* Files List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No files uploaded yet.</p>
          </div>
        ) : (
          filtered.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-slate-700/80 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-200 text-sm truncate">{file.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-100 mb-4">Upload File</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-8 text-center bg-slate-950/40 transition-colors">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-200 mb-1">Select a file to upload</p>
                <p className="text-xs text-slate-500 mb-4">PDF, PNG, JPG, JSON, JS, TXT (Max 50MB)</p>
                <input
                  type="file"
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-500/20 file:text-cyan-400 hover:file:bg-blue-500/30 cursor-pointer"
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
                  Upload File
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
