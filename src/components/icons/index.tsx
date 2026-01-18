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

export function ChineseIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label="中文">
      <title>中文</title>
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">中</text>
    </svg>
  );
}

export function ForeignIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label="外语">
      <title>外语</title>
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">EN</text>
    </svg>
  );
}

export function JPKRIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label="日韩">
      <title>日韩</title>
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">日</text>
    </svg>
  );
}

export function AnimeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label="动漫">
      <title>动漫</title>
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">漫</text>
    </svg>
  );
}
