import React from 'react';
import { VideoData } from '../types';
import { Clock, Trash2, Download, ExternalLink } from 'lucide-react';
import PlatformIcon from './PlatformIcon';

interface Props {
  items: VideoData[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

const Library: React.FC<Props> = ({ items, onClear, onRemove }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <Clock className="w-5 h-5" />
          Recent Downloads
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Clear All
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-card border border-gray-100 dark:border-gray-700 rounded-lg p-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-md transition-shadow relative group"
          >
            {/* Delete button (hover only on desktop, always visible on mobile if needed but keeping clean) */}
            <button 
                onClick={() => onRemove(item.id)}
                className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
                title="Remove from history"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {/* Thumbnail */}
            <div className="w-full sm:w-24 h-24 sm:h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden relative">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/60 rounded-full p-0.5">
                    <PlatformIcon platform={item.platform} className="w-3 h-3 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0 pr-8">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate text-sm sm:text-base">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                {new Date(item.timestamp).toLocaleDateString()} • {item.platform}
              </p>
              <a 
                href={item.originalUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"
              >
                View Original <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Actions */}
            <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0">
               {item.formats.slice(0, 2).map((fmt, idx) => (
                   <a 
                     key={idx}
                     href={fmt.url}
                     download // Note: 'download' attr works best for same-origin, otherwise it opens.
                     target="_blank"
                     rel="noreferrer"
                     className="flex-1 sm:flex-none text-center text-xs font-medium px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap"
                   >
                     {fmt.isAudio ? 'MP3' : 'MP4'}
                   </a>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;