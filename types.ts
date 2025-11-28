export enum Platform {
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  Reddit = 'Reddit',
  Unknown = 'Unknown'
}

export interface DownloadFormat {
  label: string;
  url: string;
  ext?: string;
  isAudio?: boolean;
}

export interface VideoData {
  id: string;
  platform: Platform;
  originalUrl: string;
  title: string;
  description?: string;
  thumbnail: string;
  formats: DownloadFormat[];
  timestamp: number;
  author?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}