import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://music-dl.sayqz.com';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const platform = searchParams.get('platform') || 'netease';

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/?source=${platform}&id=${id}&type=url&br=320k`,
      { redirect: 'manual' }
    );
    
    if (res.status === 302) {
      const location = res.headers.get('location');
      if (location) {
        return NextResponse.json({ url: location });
      }
    }
    
    const data = await res.json();
    if (data.code === 200 && data.data) {
      return NextResponse.json({ url: data.data });
    }
    
    return NextResponse.json({ error: 'Failed to get URL' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Failed to get URL' }, { status: 500 });
  }
}
