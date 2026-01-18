'use client';

import { useEffect, useRef } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import styles from './NowPlaying.module.css';

interface NowPlayingProps {
  onClose: () => void;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function NowPlaying({ onClose }: NowPlayingProps) {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    shuffle,
    lyrics,
    currentLyricIndex,
    togglePlay, 
    nextSong, 
    prevSong, 
    seek,
    toggleShuffle,
  } = usePlayer();

  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const activeLyricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const coverUrl = `/api/music/cover?id=${currentSong.id}&platform=${currentSong.platform}`;

  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  return (
    <div className={styles.overlay}>
      <div 
        className={styles.backgroundImage} 
        style={{ backgroundImage: `url(${coverUrl})` }}
      />
      
      <header className={styles.header}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="关闭">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" role="img" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className={styles.headerTitle}>正在播放</span>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        <div className={styles.albumArt}>
          <img 
            src={coverUrl} 
            alt={currentSong.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className={styles.albumArtPlaceholder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </div>

        <div className={styles.songDetails}>
          <h1 className={styles.songName}>{currentSong.name}</h1>
          <p className={styles.songArtist}>{currentSong.artist}</p>
        </div>

        <div className={styles.lyricsContainer} ref={lyricsContainerRef}>
          {lyrics.length > 0 ? (
            <div className={styles.lyrics}>
              {lyrics.map((line, index) => (
                <div 
                  key={`${line.time}-${index}`}
                  ref={index === currentLyricIndex ? activeLyricRef : null}
                  className={`${styles.lyricLine} ${index === currentLyricIndex ? styles.active : ''}`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noLyrics}>暂无歌词</div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progressContainer}>
          <button 
            type="button"
            className={styles.progressBar} 
            onClick={handleProgressClick}
            aria-label="进度条"
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            <div className={styles.progressHandle} style={{ left: `${progress}%` }} />
          </button>
          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.mainControls}>
          <button 
            type="button"
            className={`${styles.controlButton} ${shuffle ? styles.active : ''}`} 
            onClick={toggleShuffle}
            aria-label={shuffle ? '关闭随机播放' : '开启随机播放'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" role="img" aria-hidden="true">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          <button type="button" className={styles.controlButton} onClick={prevSong} aria-label="上一首">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" role="img" aria-hidden="true">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button type="button" className={`${styles.controlButton} ${styles.playButton}`} onClick={togglePlay} aria-label={isPlaying ? '暂停' : '播放'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" role="img" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" role="img" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          <button type="button" className={styles.controlButton} onClick={nextSong} aria-label="下一首">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" role="img" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          <button type="button" className={styles.controlButton} aria-label="播放列表">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" role="img" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
