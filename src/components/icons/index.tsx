interface IconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="MPlayer"
    >
      <title>MPlayer</title>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function ShuffleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  );
}

export function ListIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function SpinnerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={`${className || ''} spinner-rotate`}
      role="img" 
      aria-label="加载中"
    >
      <circle cx="12" cy="12" r="10" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

export function RefreshIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export function MusicNoteIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function MicOffIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export function NeteaseIcon({ className, size = 16 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="网易云音乐"
    >
      <title>网易云音乐</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
    </svg>
  );
}

export function QQMusicIcon({ className, size = 16 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="QQ音乐"
    >
      <title>QQ音乐</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-1.5v-1.5H12V16H9v-2h1.5v-1.5H12V11h1.5v1.5H15v2h-1.5V16H15v-2z"/>
    </svg>
  );
}

export function KugouIcon({ className, size = 16 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="酷狗音乐"
    >
      <title>酷狗音乐</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
    </svg>
  );
}

export function KuwoIcon({ className, size = 16 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="酷我音乐"
    >
      <title>酷我音乐</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
  );
}

export function MiguIcon({ className, size = 16 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      width={size} 
      height={size}
      className={className}
      role="img" 
      aria-label="咪咕音乐"
    >
      <title>咪咕音乐</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  );
}

export function PlatformIcon({ platform, className, size = 16 }: { platform: string } & IconProps) {
  switch (platform.toLowerCase()) {
    case 'netease':
      return <NeteaseIcon className={className} size={size} />;
    case 'qq':
    case 'tencent':
      return <QQMusicIcon className={className} size={size} />;
    case 'kugou':
      return <KugouIcon className={className} size={size} />;
    case 'kuwo':
      return <KuwoIcon className={className} size={size} />;
    case 'migu':
      return <MiguIcon className={className} size={size} />;
    default:
      return <MusicNoteIcon className={className} size={size} />;
  }
}

export function HKIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} role="img" aria-label="港台">
      <title>港台</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );
}

export function WesternIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} role="img" aria-label="欧美">
      <title>欧美</title>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
  );
}

export function JPKRIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} role="img" aria-label="日韩">
      <title>日韩</title>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
    </svg>
  );
}

export function AnimeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} role="img" aria-label="动漫">
      <title>动漫</title>
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
}

export function MovieIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} role="img" aria-label="影视">
      <title>影视</title>
      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
    </svg>
  );
}
