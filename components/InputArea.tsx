import React, { useState, useEffect } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Platform } from '../types';
import { detectPlatform, isValidUrl } from '../services/detector';
import PlatformIcon from './PlatformIcon';

interface Props {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');
  const [detected, setDetected] = useState<Platform>(Platform.Unknown);

  useEffect(() => {
    if (!url) {
      setDetected(Platform.Unknown);
      return;
    }
    const p = detectPlatform(url);
    setDetected(p);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && isValidUrl(url)) {
      onSearch(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Download Video from Any Platform
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Paste a link from TikTok, YouTube, Instagram, Twitter...
        </p>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             {detected !== Platform.Unknown ? (
               <div className="animate-fade-in">
                  <PlatformIcon platform={detected} />
               </div>
             ) : (
               <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
             )}
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-32 py-4 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg placeholder-gray-400"
            placeholder="Paste video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              disabled={isLoading || !url}
              className="bg-primary hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Supported Platforms Indicators */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
             {[Platform.TikTok, Platform.YouTube, Platform.Instagram, Platform.Twitter, Platform.Facebook].map(p => (
                 <div key={p} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <PlatformIcon platform={p} className="w-4 h-4" />
                    <span className="hidden sm:inline">{p}</span>
                 </div>
             ))}
        </div>
      </div>
    </div>
  );
};

export default InputArea;