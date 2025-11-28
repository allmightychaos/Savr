import { VideoData, Platform, DownloadFormat } from '../types';
import { detectPlatform } from './detector';

// Note: In a production environment, it is strongly recommended to proxy these requests 
// through your own backend to handle CORS headers and API keys securely.
// This implementation attempts to use public CORS-friendly instances or fallback logic.

const TIKWM_API = 'https://www.tikwm.com/api/';
// Using a known Cobalt instance. If this goes down, replace with another instance or your own proxy.
const COBALT_API = 'https://co.wuk.sh/api/json'; 

export const fetchVideoData = async (url: string): Promise<VideoData> => {
  const platform = detectPlatform(url);

  // Strategy Pattern
  if (platform === Platform.TikTok) {
    return fetchTikTokData(url);
  } else {
    // Default to Cobalt for everything else (YT, Twitter, Insta, etc.)
    return fetchCobaltData(url, platform);
  }
};

const fetchTikTokData = async (url: string): Promise<VideoData> => {
  try {
    const res = await fetch(`${TIKWM_API}?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data.code !== 0) {
      throw new Error(data.msg || 'Failed to fetch TikTok video');
    }

    const video = data.data;
    const formats: DownloadFormat[] = [];

    if (video.play) formats.push({ label: 'No Watermark (MP4)', url: video.play, ext: 'mp4' });
    if (video.wmplay) formats.push({ label: 'Watermark (MP4)', url: video.wmplay, ext: 'mp4' });
    if (video.music) formats.push({ label: 'Audio (MP3)', url: video.music, isAudio: true, ext: 'mp3' });

    return {
      id: video.id,
      platform: Platform.TikTok,
      originalUrl: url,
      title: video.title || `TikTok by ${video.author?.nickname}`,
      description: video.title,
      thumbnail: video.cover,
      formats,
      timestamp: Date.now(),
      author: video.author?.nickname
    };
  } catch (error) {
    console.error("TikTok API Error", error);
    throw new Error("Could not fetch TikTok data. Ensure the link is valid.");
  }
};

const fetchCobaltData = async (url: string, platform: Platform): Promise<VideoData> => {
  try {
    const res = await fetch(COBALT_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        filenamePattern: "basic"
      })
    });

    const data = await res.json();

    if (data.status === 'error') {
       throw new Error(data.text || 'Error fetching video');
    }

    // Map Cobalt response to our schema
    const formats: DownloadFormat[] = [];
    
    // Cobalt returns a 'url' for the main file, or a 'picker' array for multiple qualities
    if (data.url) {
        formats.push({
            label: 'Best Quality',
            url: data.url,
            ext: 'mp4'
        });
    }

    if (data.picker) {
        data.picker.forEach((p: any) => {
            formats.push({
                label: `Type: ${p.type}`,
                url: p.url,
                ext: 'mp4'
            });
        });
    }
    
    // Sometimes cobalt returns audio track separate
    if (data.audio) {
         formats.push({
            label: 'Audio Only',
            url: data.audio,
            isAudio: true,
            ext: 'mp3'
        });
    }

    // Mock title if missing since some APIs don't return metadata fully
    const title = data.filename || `${platform} Video`;
    const thumbnail = 'https://picsum.photos/800/600'; // Placeholder as Cobalt sometimes skips thumb

    return {
      id: crypto.randomUUID(),
      platform: platform === Platform.Unknown ? Platform.Unknown : platform,
      originalUrl: url,
      title: title,
      description: `Downloaded via Savr`,
      thumbnail: thumbnail,
      formats,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error("Cobalt API Error", error);
    // Fallback Mock for demonstration purposes if API is blocked by CORS or down
    // In a real app, you would show a toast error.
    if (process.env.NODE_ENV === 'development') {
       console.warn("Falling back to mock data due to API failure");
       return mockData(url, platform);
    }
    throw new Error("Unable to process this URL. The service might be busy.");
  }
};

const mockData = (url: string, platform: Platform): VideoData => ({
    id: 'mock-123',
    platform,
    originalUrl: url,
    title: 'Demo Video Result (API Failed)',
    description: 'This is a mock result because the public API endpoint might be rate-limited or blocked by CORS in this environment.',
    thumbnail: 'https://picsum.photos/seed/mock/600/400',
    formats: [
        { label: 'MP4 (720p)', url: '#', ext: 'mp4' },
        { label: 'MP3 Audio', url: '#', isAudio: true, ext: 'mp3' }
    ],
    timestamp: Date.now()
});