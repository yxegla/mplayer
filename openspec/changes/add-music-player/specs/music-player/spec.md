## ADDED Requirements

### Requirement: Music Search
The system SHALL provide a search interface that allows users to find songs across multiple music platforms.

#### Scenario: User searches for a song
- **WHEN** user enters a search keyword and submits
- **THEN** the system displays matching songs from all platforms (NetEase, Kuwo, QQ)
- **AND** each result shows song name, artist, and album

#### Scenario: Empty search results
- **WHEN** user searches for a keyword with no matches
- **THEN** the system displays a friendly "no results" message

#### Scenario: Search error handling
- **WHEN** the API request fails
- **THEN** the system displays an error message with retry option

---

### Requirement: Audio Playback
The system SHALL provide audio playback controls for playing music.

#### Scenario: User plays a song
- **WHEN** user taps on a song from the list
- **THEN** the audio starts playing
- **AND** the mini player appears at the bottom showing song info

#### Scenario: User controls playback
- **WHEN** a song is playing
- **THEN** user can pause, resume, skip to next, or go to previous song

#### Scenario: User seeks within a song
- **WHEN** user drags the progress bar
- **THEN** audio playback jumps to the selected position

#### Scenario: Audio playback error
- **WHEN** the audio URL fails to load
- **THEN** the system attempts to fetch a fresh URL
- **AND** shows an error if retry fails

---

### Requirement: Random Playback
The system SHALL support random/shuffle playback mode.

#### Scenario: User enables shuffle mode
- **WHEN** user taps the shuffle button
- **THEN** the next song is randomly selected from the current queue

#### Scenario: Random play from toplists
- **WHEN** user taps "Random Play" without a search
- **THEN** the system fetches songs from a popular toplist
- **AND** starts playing in random order

---

### Requirement: Now Playing View
The system SHALL provide a full-screen now playing view with song details.

#### Scenario: User opens now playing
- **WHEN** user taps the mini player
- **THEN** a full-screen view opens showing album art, song info, and controls

#### Scenario: Lyrics display
- **WHEN** a song with lyrics is playing
- **THEN** synchronized lyrics scroll with the current playback position

#### Scenario: User closes now playing
- **WHEN** user swipes down or taps close
- **THEN** the full-screen view closes and mini player remains visible

---

### Requirement: iPhone Optimization
The system SHALL be optimized for iPhone Safari browsing.

#### Scenario: Mobile viewport
- **WHEN** the app loads on iPhone
- **THEN** it uses proper viewport meta tags and respects safe areas (notch, home indicator)

#### Scenario: Touch interactions
- **WHEN** user interacts with the app
- **THEN** all controls are touch-friendly (minimum 44px tap targets)

#### Scenario: PWA-like experience
- **WHEN** user adds to home screen
- **THEN** the app runs in standalone mode without browser chrome

---

### Requirement: Vercel Deployment
The system SHALL be deployable to Vercel platform.

#### Scenario: Production build
- **WHEN** the project is deployed to Vercel
- **THEN** all features work correctly including API proxy routes

#### Scenario: API proxy
- **WHEN** the app makes API requests
- **THEN** requests are proxied through Next.js API routes to avoid CORS issues
