import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultCard from './components/ResultCard';
import Library from './components/Library';
import { VideoData } from './types';
import { fetchVideoData } from './services/api';
import { addToLibrary, getLibrary, clearLibrary, removeFromLibrary } from './services/storage';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [library, setLibrary] = useState<VideoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load library on mount
    setLibrary(getLibrary());
  }, []);

  const handleSearch = async (url: string) => {
    setLoading(true);
    setError(null);
    setCurrentVideo(null);
    
    try {
      const data = await fetchVideoData(url);
      setCurrentVideo(data);
      // Automatically add to library upon successful fetch
      const updatedLib = addToLibrary(data);
      setLibrary(updatedLib);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    // For many CORS-restricted files, a direct 'download' attribute won't work cross-origin.
    // We open in new tab as fallback.
    window.open(url, '_blank');
  };

  const handleClearLibrary = () => {
    if (confirm('Are you sure you want to clear your download history?')) {
      clearLibrary();
      setLibrary([]);
    }
  };

  const handleRemoveItem = (id: string) => {
      const updated = removeFromLibrary(id);
      setLibrary(updated);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent">
             <InputArea onSearch={handleSearch} isLoading={loading} />
             
             {error && (
               <div className="w-full max-w-lg mx-auto px-4 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
               </div>
             )}
        </section>

        {/* Results Section */}
        {currentVideo && (
           <ResultCard data={currentVideo} onDownload={handleDownload} />
        )}

        {/* Library Section */}
        <section className="w-full bg-white dark:bg-dark border-t border-gray-100 dark:border-gray-800 mt-auto">
           <Library 
              items={library} 
              onClear={handleClearLibrary} 
              onRemove={handleRemoveItem}
           />
        </section>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Savr Downloader. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;