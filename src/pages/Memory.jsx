import { useState, useEffect } from 'react';

export default function Memory() {
  const [memories, setMemories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: '', content: '' });

  useEffect(() => {
    const savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
      try {
        setMemories(JSON.parse(savedMemories));
      } catch (error) {
        console.error('Error loading memories from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const handleCreate = (e) => {
    e.preventDefault();
    const memory = {
      id: Date.now(),
      ...newMemory,
      createdAt: new Date().toISOString(),
    };
    setMemories([...memories, memory]);
    setNewMemory({ title: '', content: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Memory</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Memory
        </button>
      </div>

      <div className="space-y-4">
        {memories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No memories stored yet. Add memories to help AI remember important information.</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div key={memory.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{memory.title}</h3>
                  <p className="text-sm text-gray-600">{memory.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(memory.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(memory.id)}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Memory</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newMemory.content}
                  onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
