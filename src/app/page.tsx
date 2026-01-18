'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/hooks/usePlayer';
import { aggregateSearch, getToplist, shuffleArray, savePlaylist, loadPlaylist, savePlayingIndex } from '@/lib/api';
import type { PlaylistCategory } from '@/lib/api';
import type { Song } from '@/types/music';
import SearchBar from '@/components/SearchBar';
import SongList from '@/components/SongList';
import MiniPlayer from '@/components/MiniPlayer';
import NowPlaying from '@/components/NowPlaying';
import { LogoIcon, ShuffleIcon, SpinnerIcon, RefreshIcon, ChineseIcon, ForeignIcon, JPKRIcon, AnimeIcon } from '@/components/icons';
import styles from './page.module.css';

const CATEGORIES: { id: PlaylistCategory; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'chinese', icon: ChineseIcon },
  { id: 'foreign', icon: ForeignIcon },
  { id: 'jpkr', icon: JPKRIcon },
  { id: 'anime', icon: AnimeIcon },
];

function HomeContent() {
  const { queueIndex, queue, isRandomMode, setRandomMode, appendToQueue, playQueue, currentSong } = usePlayer();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PlaylistCategory>('chinese');

  useEffect(() => {
    const saved = loadPlaylist();
    if (saved) {
      setSongs(saved.songs);
      setSelectedCategory(saved.category);
      setHasSearched(true);
      setRandomMode(true);
      if (saved.songs.length > 0) {
        const idx = Math.min(saved.playingIndex, saved.songs.length - 1);
        playQueue(saved.songs, idx);
      }
    }
  }, [setRandomMode, playQueue]);

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

  const handleSearch = useCallback(async (keyword: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setRandomMode(false);
    
    try {
      const result = await aggregateSearch(keyword);
      setSongs(result.songs);
    } catch {
      setError('搜索失败，请重试');
    } finally {
      setIsLoading(false);
    }
  }, [setRandomMode]);

  const handleRandomPlay = useCallback(async (category?: PlaylistCategory) => {
    const cat = category || selectedCategory;
    setIsLoadingRandom(true);
    setError(null);
    
    try {
      const topSongs = await getToplist('netease', cat);
      const shuffled = shuffleArray(topSongs);
      setSongs(shuffled);
      setHasSearched(true);
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

  const coverUrl = currentSong 
    ? `/api/music/cover?id=${currentSong.id}&platform=${currentSong.platform}`
    : null;

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <LogoIcon size={28} />
            </div>
          </div>
        </header>

        <section className={styles.searchSection}>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

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
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <SpinnerIcon size={32} />
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <button type="button" className={styles.retryButton} onClick={() => handleRandomPlay()} aria-label="重试">
                <RefreshIcon size={24} />
              </button>
            </div>
          ) : isRandomMode && currentSong && coverUrl ? (
            <div className={styles.coverDisplay}>
              <div className={styles.coverWrapper}>
                <Image
                  src={coverUrl}
                  alt={currentSong.name}
                  fill
                  className={styles.coverImage}
                  priority
                  unoptimized
                />
              </div>
              <div className={styles.coverInfo}>
                <h2 className={styles.coverTitle}>{currentSong.name}</h2>
                <p className={styles.coverArtist}>{currentSong.artist}</p>
              </div>
            </div>
          ) : (
            hasSearched && <SongList songs={songs} />
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
