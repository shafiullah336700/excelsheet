import React, { useState, useEffect } from 'react';
import { File, Settings, Search, X } from 'lucide-react';

interface SearchResult {
  title: string;
  category: string;
  action: () => void;
}

export const ProgramFrame: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setIsSearchVisible(true);
        // Focus the search input when it becomes visible
        setTimeout(() => {
          const searchInput = document.getElementById('tell-me-search');
          if (searchInput) {
            searchInput.focus();
          }
        }, 0);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(e.target as Node)) {
        setIsSearchVisible(false);
        setSearchQuery('');
        setIsSearchFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock search results - in a real app, this would be more comprehensive
  const searchResults: SearchResult[] = [
    { 
      title: 'Format Cells',
      category: 'Format',
      action: () => console.log('Format cells')
    },
    {
      title: 'Insert Chart',
      category: 'Insert',
      action: () => console.log('Insert chart')
    },
    {
      title: 'Sort & Filter',
      category: 'Data',
      action: () => console.log('Sort and filter')
    }
  ].filter(result => 
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center justify-between bg-[#217346] text-white h-8 px-2">
      <div className="flex items-center gap-2">
        <File size={16} />
        <span className="text-sm">Book1 - Excel</span>
      </div>
      <div className="flex items-center gap-4">
        <div id="search-container" className="relative">
          {isSearchVisible && (
            <div className="flex items-center bg-[#2e855a] rounded">
              <Search size={14} className="ml-2 text-gray-300" />
              <input
                id="tell-me-search"
                type="text"
                placeholder="Tell me what you want to do"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsSearchVisible(false);
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }
                }}
                className="bg-[#2e855a] text-white placeholder-gray-300 px-2 py-1 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-white rounded"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mr-2 hover:text-white text-gray-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Search results dropdown */}
          {isSearchVisible && isSearchFocused && searchQuery && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-auto z-50"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking results
            >
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700"
                    onClick={() => {
                      result.action();
                      setIsSearchVisible(false);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="text-sm">{result.title}</span>
                    <span className="text-xs text-gray-500">{result.category}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-[#2e855a] p-1 rounded">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};