import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.MUSIC_API_BASE;

interface LyricLine {
  time: number;
  text: string;
}

function parseLRC(lrc: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/g;
  
  for (const match of lrc.matchAll(regex)) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    const ms = parseInt(match[3].padEnd(3, '0'), 10);
    const time = minutes * 60 + seconds + ms / 1000;
    const text = match[4].trim();
    
    if (text) {
      lines.push({ time, text });
    }
  }

  return lines.sort((a, b) => a.time - b.time);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const platform = searchParams.get('platform') || 'netease';

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/api/?source=${platform}&id=${id}&type=lrc`);
    const text = await res.text();
    
    const lyrics = parseLRC(text);
    return NextResponse.json({ lyrics });
  } catch {
    return NextResponse.json({ lyrics: [] });
  }
}
