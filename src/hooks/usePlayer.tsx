'use client';

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { Song, LyricLine } from '@/types/music';
import { getSongUrl, getSongLyrics, shuffleArray } from '@/lib/api';

interface PlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  lyrics: LyricLine[];
  currentLyricIndex: number;
  playSong: (song: Song) => void;
  playQueue: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  toggleShuffle: () => void;
  setVolume: (volume: number) => void;
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

  const nextSongInternalRef = useRef<() => void>(() => {});

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

  const loadAndPlay = useCallback(async (song: Song) => {
    if (!audioRef.current) return;
    
    try {
      const url = await getSongUrl(song);
      audioRef.current.src = url;
      await audioRef.current.play();
      setCurrentSong(song);
      
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

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        currentTime,
        duration,
        shuffle,
        lyrics,
        currentLyricIndex,
        playSong,
        playQueue,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        toggleShuffle,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
