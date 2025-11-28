import { Platform } from '../types';

export const detectPlatform = (url: string): Platform => {
  if (!url) return Platform.Unknown;
  
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('tiktok.com')) return Platform.TikTok;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return Platform.YouTube;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return Platform.Twitter;
  if (lowerUrl.includes('instagram.com')) return Platform.Instagram;
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) return Platform.Facebook;
  if (lowerUrl.includes('reddit.com')) return Platform.Reddit;

  return Platform.Unknown;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};