import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const keyPattern = /^[A-Za-z0-9_-]{8,128}$/;

export async function GET() {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key || !keyPattern.test(key)) {
    return new NextResponse('IndexNow key is not configured.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
