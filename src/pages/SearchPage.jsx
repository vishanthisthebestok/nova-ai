import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Simulate search
    setResults([
      { id: 1, type: 'chat', title: `Chat about ${query}`, date: '2024-01-15' },
      { id: 2, type: 'prompt', title: `Prompt containing ${query}`, date: '2024-01-14' },
    ]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats, prompts, and more..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {results.length === 0 ? (
          <p className="text-gray-500">Enter a search term to find content</p>
        ) : (
          results.map((result) => (
            <div key={result.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{result.title}</h3>
                  <p className="text-sm text-gray-500">{result.type} • {result.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
