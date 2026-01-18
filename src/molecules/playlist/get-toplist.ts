import type { Song, Platform } from '@/types/music';
import { fetchPlaylist } from '@/atoms/api/music-client';
import { shuffleArray } from '@/atoms/utils/shuffle';
import type { PlaylistCategory } from '@/atoms/storage/playlist-storage';

const PLAYLIST_IDS: Record<Exclude<PlaylistCategory, 'all'>, string> = {
  chinese: '19723756',
  foreign: '180106',
  jpkr: '60131',
  anime: '71385702',
};

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
