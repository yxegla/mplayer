# Project Context

## Purpose
mplayer is a simple, beautiful web-based music player for iPhone users. It uses the TuneHub API to search and play music from multiple platforms (NetEase, Kuwo, QQ Music) with random playback support.

## Tech Stack
- Next.js 14 (App Router) - for Vercel deployment
- TypeScript - type safety
- Vanilla CSS - custom styling, mobile-first
- TuneHub API (https://music-dl.sayqz.com) - music source

## Project Conventions

### Code Style
- Use TypeScript strict mode
- Functional components with hooks
- CSS modules for component styling
- Mobile-first responsive design

### Architecture Patterns
- App Router with server components where appropriate
- Client components for interactive UI
- API routes for proxying external requests (CORS)

### Testing Strategy
- Manual testing on iPhone Safari
- Vercel preview deployments for testing

### Git Workflow
- Main branch for production
- Feature branches for development
- Conventional commits (feat:, fix:, docs:)

## Domain Context
- Target users: iPhone users who want to listen to music
- Primary interaction: Search songs, play randomly, control playback
- API supports multiple Chinese music platforms with auto-fallback

## Important Constraints
- Must work well on iPhone Safari (PWA-friendly)
- Vercel deployment (serverless functions for API proxy)
- No user accounts required - simple stateless player

## External Dependencies
- TuneHub API: https://music-dl.sayqz.com
  - Platforms: netease, kuwo, qq
  - Features: search, aggregate search, toplists, song info, streaming URLs, lyrics, covers
