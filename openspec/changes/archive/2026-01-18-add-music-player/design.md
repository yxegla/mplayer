# Design: Music Player Web App

## Context
Building a mobile-first music player web app for iPhone users. The app will use the TuneHub API which aggregates music from NetEase, Kuwo, and QQ Music platforms.

**Constraints:**
- iPhone Safari is the primary target browser
- Must handle CORS (API is on different domain)
- Vercel serverless functions for API proxy
- No user authentication needed

## Goals / Non-Goals

**Goals:**
- Beautiful, modern UI optimized for iPhone
- Fast search with aggregate results
- Reliable audio playback with error handling
- Random/shuffle playback from toplists
- Lyrics display during playback

**Non-Goals:**
- Offline playback (no caching)
- User accounts or playlists
- Desktop optimization (mobile-first only)
- Download functionality

## Decisions

### 1. Framework: Next.js 14 with App Router
**Why:** 
- Native Vercel integration
- Server components for initial load
- API routes for CORS proxy
- Built-in optimizations

**Alternatives:**
- Vite + React: Simpler but no API routes, needs separate backend
- Plain HTML/JS: Too manual, hard to maintain

### 2. Styling: Vanilla CSS with CSS Modules
**Why:**
- Full control over mobile styling
- No build complexity from Tailwind
- Easy to customize glassmorphism effects

### 3. Audio: HTML5 Audio API
**Why:**
- Native browser support
- Works well on iPhone Safari
- No library needed

### 4. API Proxy Strategy
**Why:** TuneHub API doesn't support CORS for browser requests.

**Implementation:**
- Next.js API routes at `/api/music/*`
- Proxy requests to `https://music-dl.sayqz.com`
- Handle redirects for audio/image URLs

### 5. Random Playback Source
**Why:** Need a pool of songs for random play.

**Implementation:**
- Fetch toplist from a platform (e.g., NetEase hot songs)
- Shuffle and queue songs
- Allow "shuffle all" from search results too

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| TuneHub API downtime | Show friendly error, API has auto-fallback between platforms |
| Audio URL expiration | Fetch fresh URL on each play |
| iPhone audio restrictions | Require user interaction before first play |
| CORS on audio files | Proxy or use redirect URLs directly |

## Component Architecture

```
App
├── Layout (mobile viewport, safe areas)
├── Header (logo, minimal nav)
├── SearchBar (input, submit)
├── SongList (scrollable results)
├── MiniPlayer (bottom bar when song playing)
└── NowPlaying (full-screen modal)
    ├── AlbumArt
    ├── SongInfo
    ├── ProgressBar
    ├── Controls (prev, play/pause, next, shuffle)
    └── Lyrics (scrolling LRC)
```

## API Routes Structure

```
/api/music/search     - Aggregate search proxy
/api/music/song       - Get song info
/api/music/url        - Get streaming URL
/api/music/lyrics     - Get LRC lyrics
/api/music/toplist    - Get chart songs
```

## Open Questions
- None currently - straightforward implementation
