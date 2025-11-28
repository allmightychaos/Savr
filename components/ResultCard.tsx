import React from 'react';
import { VideoData, DownloadFormat } from '../types';
import { Download, Music } from 'lucide-react';

interface Props {
  data: VideoData | null;
  onDownload: (url: string, filename: string) => void;
}

const ResultCard: React.FC<Props> = ({ data, onDownload }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-12 animate-slide-up">
      <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row">
        {/* Left: Thumbnail */}
        <div className="md:w-1/3 bg-gray-100 dark:bg-gray-800 relative group">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="w-full h-full object-cover min-h-[200px]"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <span className="text-white font-bold tracking-widest uppercase text-sm border-2 border-white px-3 py-1">Preview</span>
          </div>
        </div>

        {/* Right: Info & Downloads */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary uppercase">
                 {data.platform}
               </span>
               {data.author && (
                   <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">@{data.author}</span>
               )}
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 mb-2">
              {data.title}
            </h2>
            {data.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {data.description}
                </p>
            )}
          </div>

          <div className="space-y-2 mt-4">
             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Available Formats</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.formats.map((format: DownloadFormat, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => onDownload(format.url, `${data.title}.${format.ext || 'mp4'}`)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        format.isAudio 
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300' 
                        : 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-indigo-300'
                    }`}
                  >
                    {format.isAudio ? <Music className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {format.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;