import { Song, SearchResult, LyricLine, Platform } from '@/types/music';

const API_BASE = '/api/music';

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

export async function getToplist(platform: Platform = 'netease'): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/toplist?platform=${platform}`);
  if (!res.ok) throw new Error('Failed to get toplist');
  const data = await res.json();
  return data.songs;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
