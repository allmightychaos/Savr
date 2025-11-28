import React from 'react';
import { Platform } from '../types';
import { Youtube, Twitter, Instagram, Facebook, Video, Globe } from 'lucide-react';

interface Props {
  platform: Platform;
  className?: string;
}

const PlatformIcon: React.FC<Props> = ({ platform, className = "w-6 h-6" }) => {
  switch (platform) {
    case Platform.YouTube:
      return <Youtube className={`${className} text-red-500`} />;
    case Platform.Twitter:
      return <Twitter className={`${className} text-blue-400`} />;
    case Platform.Instagram:
      return <Instagram className={`${className} text-pink-500`} />;
    case Platform.Facebook:
      return <Facebook className={`${className} text-blue-600`} />;
    case Platform.TikTok:
      // Lucide doesn't have TikTok, using Video as generic or SVG if I could inline it.
      // Using a text label or custom SVG path is better, but stick to lucide for simplicity or generic video
      return (
         <svg className={`${className} text-black dark:text-white`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
         </svg>
      );
    case Platform.Reddit:
      return <Globe className={`${className} text-orange-500`} />;
    default:
      return <Video className={`${className} text-gray-500`} />;
  }
};

export default PlatformIcon;