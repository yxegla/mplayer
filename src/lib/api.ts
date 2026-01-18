import type { Song, SearchResult, LyricLine, Platform } from '@/types/music';

const API_BASE = '/api/music';

export type PlaylistCategory = 'all' | 'chinese' | 'foreign' | 'jpkr' | 'anime';

const PLAYLIST_IDS: Record<Exclude<PlaylistCategory, 'all'>, string> = {
  chinese: '19723756',
  foreign: '180106',
  jpkr: '60131',
  anime: '71385702',
};

const STORAGE_KEY = 'mplayer_random_playlist';
const CATEGORY_KEY = 'mplayer_selected_category';

export function savePlaylist(songs: Song[], category: PlaylistCategory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ songs, category, timestamp: Date.now() }));
  } catch {}
}

export function loadPlaylist(): { songs: Song[]; category: PlaylistCategory } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
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

export async function searchSongs(keyword: string, platform: Platform = 'netease'): Promise<SearchResult> {
  const res = await fetch(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&platform=${platform}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function aggregateSearch(keyword: string): Promise<SearchResult> {
  const res = await fetch(`${API_BASE}/aggregate?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getSongUrl(song: Song): Promise<string> {
  const res = await fetch(`${API_BASE}/url?id=${song.id}&platform=${song.platform}`);
  if (!res.ok) throw new Error('Failed to get song URL');
  const data = await res.json();
  return data.url;
}

export async function getSongLyrics(song: Song): Promise<LyricLine[]> {
  const res = await fetch(`${API_BASE}/lyrics?id=${song.id}&platform=${song.platform}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.lyrics;
}

export async function getSongCover(song: Song): Promise<string> {
  return `${API_BASE}/cover?id=${song.id}&platform=${song.platform}`;
}

async function fetchPlaylist(listId: string, platform: Platform = 'netease'): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/toplist?platform=${platform}&id=${listId}`);
  if (!res.ok) throw new Error('Failed to get toplist');
  const data = await res.json();
  return data.songs || [];
}

export async function getToplist(platform: Platform = 'netease', category?: PlaylistCategory): Promise<Song[]> {
  if (!category || category === 'all') {
    const allLists = await Promise.all(
      Object.values(PLAYLIST_IDS).map(id => fetchPlaylist(id, platform).catch(() => []))
    );
    const allSongs = allLists.flat();
    const shuffled = shuffleArray(allSongs);
    return shuffled.slice(0, 20);
  }
  
  const listId = PLAYLIST_IDS[category];
  const songs = await fetchPlaylist(listId, platform);
  const shuffled = shuffleArray(songs);
  return shuffled.slice(0, 20);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
