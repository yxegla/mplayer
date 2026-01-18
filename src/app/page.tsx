'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/hooks/usePlayer';
import { useColorThief } from '@/hooks/useColorThief';
import { getToplist, shuffleArray, savePlaylist, loadPlaylist, savePlayingIndex } from '@/lib/api';
import type { PlaylistCategory } from '@/lib/api';
import MiniPlayer from '@/components/MiniPlayer';
import NowPlaying from '@/components/NowPlaying';
import { LogoIcon, ShuffleIcon, SpinnerIcon, RefreshIcon, ChineseIcon, ForeignIcon, JPKRIcon, AnimeIcon, AllIcon } from '@/components/icons';
import styles from './page.module.css';

const CATEGORIES: { id: PlaylistCategory; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'all', icon: AllIcon },
  { id: 'chinese', icon: ChineseIcon },
  { id: 'foreign', icon: ForeignIcon },
  { id: 'jpkr', icon: JPKRIcon },
  { id: 'anime', icon: AnimeIcon },
];

function HomeContent() {
  const { queueIndex, queue, isRandomMode, setRandomMode, appendToQueue, playQueue, restoreQueue, currentSong } = usePlayer();
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PlaylistCategory>('all');

  useEffect(() => {
    const saved = loadPlaylist();
    if (saved) {
      setSelectedCategory(saved.category);
      setRandomMode(true);
      if (saved.songs.length > 0) {
        const idx = Math.min(saved.playingIndex, saved.songs.length - 1);
        restoreQueue(saved.songs, idx);
      }
    }
  }, [setRandomMode, restoreQueue]);

  useEffect(() => {
    if (!isRandomMode || queue.length === 0) return;
    
    savePlayingIndex(queueIndex);
    
    const remainingSongs = queue.length - queueIndex - 1;
    if (remainingSongs <= 2) {
      getToplist('netease', selectedCategory).then(topSongs => {
        appendToQueue(topSongs);
      }).catch(() => {});
    }
  }, [queueIndex, queue.length, isRandomMode, appendToQueue, selectedCategory]);

  const handleRandomPlay = useCallback(async (category?: PlaylistCategory) => {
    const cat = category || selectedCategory;
    setIsLoadingRandom(true);
    setError(null);
    
    try {
      const topSongs = await getToplist('netease', cat);
      const shuffled = shuffleArray(topSongs);
      setRandomMode(true);
      setSelectedCategory(cat);
      savePlaylist(shuffled, cat);
      playQueue(shuffled, 0);
    } catch {
      setError('获取歌曲失败，请重试');
    } finally {
      setIsLoadingRandom(false);
    }
  }, [setRandomMode, playQueue, selectedCategory]);

  const handleCategoryClick = useCallback((category: PlaylistCategory) => {
    setSelectedCategory(category);
    handleRandomPlay(category);
  }, [handleRandomPlay]);

  const displaySong = currentSong || (isRandomMode && queue.length > 0 ? queue[queueIndex] : null);
  const coverUrl = displaySong 
    ? `/api/music/cover?id=${displaySong.id}&platform=${displaySong.platform}`
    : null;
  
  const dominantColor = useColorThief(coverUrl);
  
  const containerStyle = dominantColor ? {
    background: `linear-gradient(180deg, rgba(${dominantColor}, 0.6) 0%, rgba(${dominantColor}, 0.3) 40%, var(--color-bg-primary) 100%)`,
  } : undefined;

  return (
    <>
      <div className={styles.container} style={containerStyle}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <LogoIcon size={28} />
            </div>
          </div>
        </header>

        <div className={styles.categorySection}>
          {CATEGORIES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`${styles.categoryButton} ${selectedCategory === id ? styles.active : ''}`}
              onClick={() => handleCategoryClick(id)}
              disabled={isLoadingRandom}
              aria-label={id}
            >
              <Icon size={20} />
            </button>
          ))}
          <button 
            type="button"
            className={`${styles.categoryButton} ${styles.shuffleButton}`}
            onClick={() => handleRandomPlay()}
            disabled={isLoadingRandom}
            aria-label="随机播放"
          >
            {isLoadingRandom ? (
              <SpinnerIcon size={20} />
            ) : (
              <ShuffleIcon size={20} />
            )}
          </button>
        </div>

        <section className={styles.songListSection}>
          {error ? (
            <div className={styles.errorContainer}>
              <button type="button" className={styles.retryButton} onClick={() => handleRandomPlay()} aria-label="重试">
                <RefreshIcon size={24} />
              </button>
            </div>
          ) : displaySong && coverUrl ? (
            <div className={styles.coverDisplay}>
              <div className={styles.coverWrapper}>
                <Image
                  src={coverUrl}
                  alt={displaySong.name}
                  fill
                  className={styles.coverImage}
                  priority
                  unoptimized
                />
              </div>
              <div className={styles.coverInfo}>
                <h2 className={styles.coverTitle}>{displaySong.name}</h2>
                <p className={styles.coverArtist}>{displaySong.artist}</p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>点击上方分类开始播放</p>
            </div>
          )}
        </section>
      </div>

      <MiniPlayer onExpand={() => setShowNowPlaying(true)} />
      
      {showNowPlaying && (
        <NowPlaying onClose={() => setShowNowPlaying(false)} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <HomeContent />
  );
}
