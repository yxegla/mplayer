export interface Song {
  id: string;
  name: string;
  artist: string;
  album?: string;
  platform: 'netease' | 'kuwo' | 'qq';
  duration?: number;
  cover?: string;
}

export interface SearchResult {
  songs: Song[];
  total: number;
}

export interface LyricLine {
  time: number; // seconds
  text: string;
}

export interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  volume: number;
}

export type Platform = 'netease' | 'kuwo' | 'qq';

export interface ToplistItem {
  name: string;
  id: string;
  platform: Platform;
}
