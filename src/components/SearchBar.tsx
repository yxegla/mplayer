'use client';

import { useState, FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim() && !isLoading) {
      onSearch(keyword.trim());
    }
  };

  const handleClear = () => {
    setKeyword('');
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-label="搜索">
          <title>搜索</title>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        
        <input
          type="text"
          className={styles.input}
          placeholder="搜索歌曲、歌手..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        
        {keyword && (
          <button type="button" className={styles.clearButton} onClick={handleClear} aria-label="清除">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" role="img" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <button type="submit" className={styles.submitButton} disabled={!keyword.trim() || isLoading} aria-label="搜索">
          {isLoading ? (
            <div className="spinner" style={{ width: 20, height: 20 }} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
