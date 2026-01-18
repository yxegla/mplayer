'use client';

import { Song } from '@/types/music';
import { usePlayer } from '@/hooks/usePlayer';
import styles from './SongList.module.css';

interface SongListProps {
  songs: Song[];
  onPlayAll?: () => void;
}

export default function SongList({ songs }: SongListProps) {
  const { currentSong, isPlaying, playSong, playQueue } = usePlayer();

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
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="无结果">
          <title>无结果</title>
          <path d="M9 19V6l12-3v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <p>搜索你喜欢的歌曲</p>
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
          
          <span className={styles.platformBadge}>{song.platform}</span>
        </button>
      ))}
    </div>
  );
}
