'use client';

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { Song, LyricLine } from '@/types/music';
import { getSongUrl, getSongLyrics, shuffleArray } from '@/lib/api';

interface PlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  lyrics: LyricLine[];
  currentLyricIndex: number;
  isRandomMode: boolean;
  playSong: (song: Song) => void;
  playQueue: (songs: Song[], startIndex?: number) => void;
  restoreQueue: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  toggleShuffle: () => void;
  setVolume: (volume: number) => void;
  setRandomMode: (enabled: boolean) => void;
  appendToQueue: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [isRandomMode, setIsRandomMode] = useState(false);

  const nextSongInternalRef = useRef<() => void>(() => {});
  const prevSongRef = useRef<() => void>(() => {});

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('durationchange', () => {
      setDuration(audio.duration || 0);
    });

    audio.addEventListener('ended', () => {
      nextSongInternalRef.current();
    });

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        audio.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (lyrics.length === 0 || currentTime === 0) {
      setCurrentLyricIndex(-1);
      return;
    }

    let index = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= currentTime) {
        index = i;
      } else {
        break;
      }
    }
    setCurrentLyricIndex(index);
  }, [currentTime, lyrics]);

  useEffect(() => {
    if ('mediaSession' in navigator && duration > 0) {
      navigator.mediaSession.setPositionState({
        duration: duration,
        playbackRate: 1,
        position: Math.min(currentTime, duration),
      });
    }
  }, [currentTime, duration]);

  const loadAndPlay = useCallback(async (song: Song) => {
    if (!audioRef.current) return;
    
    try {
      if ('mediaSession' in navigator) {
        const actions: MediaSessionAction[] = [
          'play', 'pause', 'previoustrack', 'nexttrack',
          'seekbackward', 'seekforward', 'seekto'
        ];
        actions.forEach(action => {
          try {
            navigator.mediaSession.setActionHandler(action, null);
          } catch {}
        });

        navigator.mediaSession.setActionHandler('play', () => {
          audioRef.current?.play();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          audioRef.current?.pause();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          prevSongRef.current();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          nextSongInternalRef.current();
        });
        navigator.mediaSession.setActionHandler('seekbackward', () => {
          prevSongRef.current();
        });
        navigator.mediaSession.setActionHandler('seekforward', () => {
          nextSongInternalRef.current();
        });

        const coverUrl = `${window.location.origin}/api/music/cover?id=${song.id}&platform=${song.platform}`;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.name,
          artist: song.artist,
          album: song.album || song.name,
          artwork: [
            { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
            { src: coverUrl, sizes: '128x128', type: 'image/jpeg' },
            { src: coverUrl, sizes: '192x192', type: 'image/jpeg' },
            { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
            { src: coverUrl, sizes: '384x384', type: 'image/jpeg' },
            { src: coverUrl, sizes: '512x512', type: 'image/jpeg' },
          ],
        });
      }

      const url = await getSongUrl(song);
      audioRef.current.src = url;
      await audioRef.current.play();
      setCurrentSong(song);

      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
      
      const songLyrics = await getSongLyrics(song);
      setLyrics(songLyrics);
    } catch (error) {
      console.error('Failed to play song:', error);
    }
  }, []);

  const nextSongInternal = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextIndex: number;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }
    
    setQueueIndex(nextIndex);
    loadAndPlay(queue[nextIndex]);
  }, [queue, queueIndex, shuffle, loadAndPlay]);

  useEffect(() => {
    nextSongInternalRef.current = nextSongInternal;
  }, [nextSongInternal]);

  const playSong = useCallback((song: Song) => {
    setQueue([song]);
    setQueueIndex(0);
    loadAndPlay(song);
  }, [loadAndPlay]);

  const playQueue = useCallback((songs: Song[], startIndex = 0) => {
    const songsToPlay = shuffle ? shuffleArray(songs) : songs;
    setQueue(songsToPlay);
    setQueueIndex(startIndex);
    loadAndPlay(songsToPlay[startIndex]);
  }, [shuffle, loadAndPlay]);

  const restoreQueue = useCallback((songs: Song[], startIndex = 0) => {
    setQueue(songs);
    setQueueIndex(startIndex);
    setCurrentSong(songs[startIndex]);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const nextSong = useCallback(() => {
    nextSongInternal();
  }, [nextSongInternal]);

  const prevSong = useCallback(() => {
    if (queue.length === 0) return;
    
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
    setQueueIndex(prevIndex);
    loadAndPlay(queue[prevIndex]);
  }, [queue, queueIndex, currentTime, loadAndPlay]);

  useEffect(() => {
    prevSongRef.current = prevSong;
  }, [prevSong]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, volume));
  }, []);

  const setRandomModeValue = useCallback((enabled: boolean) => {
    setIsRandomMode(enabled);
  }, []);

  const appendToQueue = useCallback((songs: Song[]) => {
    const existingIds = new Set(queue.map(s => `${s.platform}-${s.id}`));
    const newSongs = songs.filter(s => !existingIds.has(`${s.platform}-${s.id}`));
    if (newSongs.length > 0) {
      setQueue(prev => [...prev, ...shuffleArray(newSongs)]);
    }
  }, [queue]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        queueIndex,
        isPlaying,
        currentTime,
        duration,
        shuffle,
        lyrics,
        currentLyricIndex,
        isRandomMode,
        playSong,
        playQueue,
        restoreQueue,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        toggleShuffle,
        setVolume,
        setRandomMode: setRandomModeValue,
        appendToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
