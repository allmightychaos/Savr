import React from 'react';
import { DownloadCloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-dark/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <DownloadCloud size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Savr
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
           {/* Placeholder for future nav items or settings */}
           <a href="https://github.com/google/gemini-api" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
              API
           </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;