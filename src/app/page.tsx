'use client';

import { useState, useCallback } from 'react';
import { PlayerProvider } from '@/hooks/usePlayer';
import { aggregateSearch, getToplist, shuffleArray } from '@/lib/api';
import { Song } from '@/types/music';
import SearchBar from '@/components/SearchBar';
import SongList from '@/components/SongList';
import MiniPlayer from '@/components/MiniPlayer';
import NowPlaying from '@/components/NowPlaying';
import styles from './page.module.css';

function HomeContent() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (keyword: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const result = await aggregateSearch(keyword);
      setSongs(result.songs);
    } catch {
      setError('搜索失败，请重试');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRandomPlay = useCallback(async () => {
    setIsLoadingRandom(true);
    setError(null);
    
    try {
      const topSongs = await getToplist('netease');
      const shuffled = shuffleArray(topSongs);
      setSongs(shuffled);
      setHasSearched(true);
    } catch {
      setError('获取歌曲失败，请重试');
    } finally {
      setIsLoadingRandom(false);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-label="MPlayer">
                <title>MPlayer</title>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <span className={styles.logoText}>MPlayer</span>
          </div>
        </header>

        <section className={styles.searchSection}>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        <div className={styles.actions}>
          <button 
            type="button"
            className={`${styles.actionButton} ${styles.primary}`}
            onClick={handleRandomPlay}
            disabled={isLoadingRandom}
          >
            {isLoadingRandom ? (
              <div className="spinner" style={{ width: 20, height: 20 }} />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-hidden="true">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            )}
            随机播放
          </button>
        </div>

        <section className={styles.songListSection}>
          {hasSearched && <h2 className={styles.sectionTitle}>搜索结果</h2>}
          
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className="spinner" />
              <p>搜索中...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p>{error}</p>
              <button type="button" className={styles.retryButton} onClick={() => handleRandomPlay()}>
                重试
              </button>
            </div>
          ) : (
            <SongList songs={songs} />
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
    <PlayerProvider>
      <HomeContent />
    </PlayerProvider>
  );
}
