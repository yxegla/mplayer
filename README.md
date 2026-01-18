# MPlayer

A minimalist, responsive web-based music player built with Next.js and TypeScript. Supports music playback, playlist management, and background audio.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

- 🎵 **Music Playback**: Stream songs from multiple sources.
- 🔀 **Smart Playlist**: Auto-shuffle and aggregate songs from configured playlists.
- 📱 **Responsive Design**: Full-featured mobile and desktop experience.
- 💾 **Persistence**: Saves playback state (current song, playlist, progress) to local storage.
- 🎨 **Minimalist UI**: Clean interface focused on the listening experience.
- ⌨️ **Media Session**: Integration with system media controls (play/pause/next/prev).

## Architecture

This project follows a strict **L1-L4 Atomic Architecture** to ensure scalability and maintainability.

### Layer Structure

1.  **L1 Entry Layer** (`src/app/layout.tsx`, `src/entry/`)
    - **Role**: Application entry point, global providers, initialization.
    - **Responsibility**: Setup `PlayerProvider`, global styles, metadata.
    - **Constraint**: No business logic.

2.  **L2 Coordination Layer** (`src/app/page.tsx`, `src/coordinators/`)
    - **Role**: Coordinate flows, bridge UI and Logic.
    - **Responsibility**: Connect UI components with Molecules/Atoms.
    - **Constraint**: No direct L4 access, must go through L3 for business logic.

3.  **L3 Molecular Layer** (`src/molecules/`)
    - **Role**: Reusable business logic units.
    - **Responsibility**: Combine multiple Atoms to form a business feature (e.g., `getToplist` combines fetching and shuffling).
    - **Constraint**: Pure business logic, independent of UI.

4.  **L4 Atomic Layer** (`src/atoms/`)
    - **Role**: Single-responsibility primitives.
    - **Responsibility**: Pure API clients, storage wrappers, utility functions.
    - **Constraint**: No dependencies on higher layers, no business logic.

### Directory Structure

```
src/
├── app/                 # Next.js App Router (L1/L2)
├── atoms/               # L4 Atomic Layer
│   ├── api/             # Pure API clients
│   ├── storage/         # LocalStorage wrappers
│   └── utils/           # Pure utility functions
├── molecules/           # L3 Molecular Layer
│   └── playlist/        # Playlist business logic
├── components/          # UI Components
├── hooks/               # React Hooks
├── lib/                 # Shared libraries
└── types/               # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/mplayer.git
    cd mplayer
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the player.

## Development

### Adding a New Feature

Follow the architectural guidelines:

1.  **Atom**: Create basic building blocks in `src/atoms/` (e.g., new API call).
2.  **Molecule**: specific business logic in `src/molecules/` using atoms.
3.  **Coordinator**: Use the molecule in a page or hook.
4.  **UI**: Render the result in `src/components/`.

## License

MIT
