import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.MUSIC_API_BASE;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const platform = searchParams.get('platform') || 'netease';

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/?source=${platform}&id=${id}&type=pic`,
      { redirect: 'manual' }
    );
    
    if (res.status === 302) {
      const location = res.headers.get('location');
      if (location) {
        return NextResponse.redirect(location);
      }
    }

    const imageRes = await fetch(`${API_BASE}/api/?source=${platform}&id=${id}&type=pic`);
    const imageBuffer = await imageRes.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': imageRes.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to get cover' }, { status: 500 });
  }
}
