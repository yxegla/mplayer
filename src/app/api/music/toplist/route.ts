import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://music-dl.sayqz.com';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform') || 'netease';
  const listId = searchParams.get('id') || '19723756';

  try {
    const res = await fetch(`${API_BASE}/api/?source=${platform}&id=${listId}&type=toplist`);
    const data = await res.json();
    
    const songs = (data.data?.list || []).map((item: Record<string, unknown>) => ({
      id: String(item.id),
      name: item.name || '',
      artist: item.artist || '',
      album: item.album || '',
      platform: platform,
    }));

    return NextResponse.json({ songs });
  } catch {
    return NextResponse.json({ error: 'Failed to get toplist' }, { status: 500 });
  }
}
