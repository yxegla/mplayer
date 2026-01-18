'use client';

import type { Song } from '@/types/music';
import { usePlayer } from '@/hooks/usePlayer';
import { PlatformIcon, MusicNoteIcon } from '@/components/icons';
import styles from './SongList.module.css';

interface SongListProps {
  songs: Song[];
  onPlayAll?: () => void;
}

export default function SongList({ songs }: SongListProps) {
  const { currentSong, isPlaying, playQueue } = usePlayer();

  const handleSongClick = (song: Song, index: number) => {
    if (currentSong?.id === song.id && currentSong?.platform === song.platform) {
      return;
    }
    playQueue(songs, index);
  };

  const isCurrentSong = (song: Song) => {
    return currentSong?.id === song.id && currentSong?.platform === song.platform;
  };

  if (songs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <MusicNoteIcon className={styles.emptyIcon} size={48} />
      </div>
    );
  }

  return (
    <div className={styles.songList}>
      {songs.map((song, index) => (
        <button
          type="button"
          key={`${song.platform}-${song.id}`}
          className={`${styles.songItem} ${isCurrentSong(song) ? styles.active : ''}`}
          onClick={() => handleSongClick(song, index)}
        >
          <span className={styles.songIndex}>
            {isCurrentSong(song) && isPlaying ? (
              <span className={styles.playingIndicator}>
                <span className={styles.bar} />
                <span className={styles.bar} />
                <span className={styles.bar} />
              </span>
            ) : (
              index + 1
            )}
          </span>
          
          <div className={styles.songInfo}>
            <span className={styles.songName}>{song.name}</span>
            <span className={styles.songArtist}>{song.artist}</span>
          </div>
          
          <span className={styles.platformBadge}>
            <PlatformIcon platform={song.platform} size={16} />
          </span>
        </button>
      ))}
    </div>
  );
}
