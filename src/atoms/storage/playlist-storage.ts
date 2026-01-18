import type { Song } from '@/types/music';

export type PlaylistCategory = 'all' | 'chinese' | 'foreign' | 'jpkr' | 'anime';

const STORAGE_KEY = 'mplayer_random_playlist';
const CATEGORY_KEY = 'mplayer_selected_category';
const PLAYING_INDEX_KEY = 'mplayer_playing_index';

export interface StoredPlaylist {
  songs: Song[];
  category: PlaylistCategory;
  playingIndex: number;
  timestamp: number;
}

export function savePlaylist(songs: Song[], category: PlaylistCategory, playingIndex: number = 0): void {
  try {
    const data: StoredPlaylist = {
      songs,
      category,
      playingIndex,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function savePlayingIndex(index: number): void {
  try {
    localStorage.setItem(PLAYING_INDEX_KEY, String(index));
  } catch {}
}

export function loadPlaylist(): { songs: Song[]; category: PlaylistCategory; playingIndex: number } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as StoredPlaylist;
    const indexStr = localStorage.getItem(PLAYING_INDEX_KEY);
    const playingIndex = indexStr ? parseInt(indexStr, 10) : (parsed.playingIndex ?? 0);
    return { ...parsed, playingIndex };
  } catch {
    return null;
  }
}

export function saveCategory(category: PlaylistCategory): void {
  try {
    localStorage.setItem(CATEGORY_KEY, category);
  } catch {}
}

export function loadCategory(): PlaylistCategory {
  try {
    const data = localStorage.getItem(CATEGORY_KEY);
    if (data && ['all', 'chinese', 'foreign', 'jpkr', 'anime'].includes(data)) {
      return data as PlaylistCategory;
    }
  } catch {}
  return 'all';
}
