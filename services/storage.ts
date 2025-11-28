import { VideoData } from '../types';

const STORAGE_KEY = 'savr_library_v1';

export const getLibrary = (): VideoData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load library', e);
    return [];
  }
};

export const addToLibrary = (video: VideoData): VideoData[] => {
  try {
    const current = getLibrary();
    // Prevent duplicates by URL or ID
    const exists = current.find(v => v.originalUrl === video.originalUrl || v.id === video.id);
    if (exists) {
        // Move to top
        const filtered = current.filter(v => v.id !== exists.id);
        const updated = [video, ...filtered];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }
    
    const updated = [video, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save to library', e);
    return [];
  }
};

export const clearLibrary = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const removeFromLibrary = (id: string): VideoData[] => {
    const current = getLibrary();
    const updated = current.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}