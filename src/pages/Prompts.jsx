import { useState, useEffect } from 'react';

export default function Prompts() {
  const [prompts, setPrompts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });

  useEffect(() => {
    const savedPrompts = localStorage.getItem('prompts');
    if (savedPrompts) {
      try {
        setPrompts(JSON.parse(savedPrompts));
      } catch (error) {
        console.error('Error loading prompts from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleCreate = (e) => {
    e.preventDefault();
    const prompt = {
      id: Date.now(),
      ...newPrompt,
      createdAt: new Date().toISOString(),
    };
    setPrompts([...prompts, prompt]);
    setNewPrompt({ title: '', content: '' });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Prompts</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          New Prompt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No prompts yet. Create your first prompt to get started.</p>
          </div>
        ) : (
          prompts.map((prompt) => (
            <div key={prompt.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{prompt.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{prompt.content}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Prompt</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
