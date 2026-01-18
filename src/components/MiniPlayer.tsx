'use client';

import { usePlayer } from '@/hooks/usePlayer';
import styles from './MiniPlayer.module.css';

interface MiniPlayerProps {
  onExpand: () => void;
}

export default function MiniPlayer({ onExpand }: MiniPlayerProps) {
  const { currentSong, isPlaying, currentTime, duration, togglePlay, nextSong } = usePlayer();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const coverUrl = `/api/music/cover?id=${currentSong.id}&platform=${currentSong.platform}`;

  return (
    <div className={styles.miniPlayer}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      
      <div className={styles.miniPlayerContent}>
        <button 
          type="button"
          className={styles.albumArt} 
          onClick={onExpand}
          aria-label="展开播放器"
        >
          <img 
            src={coverUrl} 
            alt={currentSong.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className={styles.albumArtPlaceholder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </button>
        
        <button 
          type="button"
          className={styles.songInfo} 
          onClick={onExpand}
          aria-label={`${currentSong.name} - ${currentSong.artist}`}
        >
          <div className={styles.songName}>{currentSong.name}</div>
          <div className={styles.songArtist}>{currentSong.artist}</div>
        </button>
        
        <div className={styles.controls}>
          <button 
            type="button"
            className={`${styles.controlButton} ${styles.playButton}`} 
            onClick={togglePlay} 
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" role="img" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" role="img" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>
          
          <button 
            type="button"
            className={styles.controlButton} 
            onClick={nextSong} 
            aria-label="下一首"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" role="img" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
