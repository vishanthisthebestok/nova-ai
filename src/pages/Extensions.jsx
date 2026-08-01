import { useState, useEffect } from 'react';

export default function Extensions() {
  const [extensions, setExtensions] = useState([
    { id: 1, name: 'Web Search', description: 'Search the web for real-time information', installed: true },
    { id: 2, name: 'Code Runner', description: 'Execute code snippets in various languages', installed: false },
    { id: 3, name: 'Image Generator', description: 'Generate images from text descriptions', installed: false },
  ]);

  useEffect(() => {
    const savedExtensions = localStorage.getItem('extensions');
    if (savedExtensions) {
      try {
        setExtensions(JSON.parse(savedExtensions));
      } catch (error) {
        console.error('Error loading extensions from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('extensions', JSON.stringify(extensions));
  }, [extensions]);

  const toggleExtension = (id) => {
    setExtensions(extensions.map(ext => 
      ext.id === id ? { ...ext, installed: !ext.installed } : ext
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Extensions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {extensions.map((extension) => (
          <div key={extension.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{extension.name}</h3>
              <button
                onClick={() => toggleExtension(extension.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  extension.installed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {extension.installed ? 'Installed' : 'Install'}
              </button>
            </div>
            <p className="text-sm text-gray-600">{extension.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Coming Soon</h2>
        <p className="text-blue-700">
          More extensions will be available soon. Check back regularly for new capabilities.
        </p>
      </div>
    </div>
  );
}
