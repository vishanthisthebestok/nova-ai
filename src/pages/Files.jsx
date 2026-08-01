import { useState, useEffect } from 'react';

export default function Files() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedFiles = localStorage.getItem('files');
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles));
      } catch (error) {
        console.error('Error loading files from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  const handleUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };
      setFiles([...files, newFile]);
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Files</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload File
        </button>
      </div>

      <div className="space-y-4">
        {files.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No files uploaded yet. Upload files to manage your documents.</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-red-600 hover:text-red-700"
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
            <h2 className="text-xl font-bold mb-4">Upload File</h2>
            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
