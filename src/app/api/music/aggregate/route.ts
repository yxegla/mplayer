import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.MUSIC_API_BASE;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'keyword required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/?type=aggregateSearch&keyword=${encodeURIComponent(keyword)}`
    );
    const data = await res.json();
    
    const songs = (data.data?.results || []).map((item: Record<string, unknown>) => ({
      id: String(item.id),
      name: item.name || '',
      artist: item.artist || '',
      album: item.album || '',
      platform: item.platform || 'netease',
    }));

    return NextResponse.json({ songs, total: songs.length });
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
