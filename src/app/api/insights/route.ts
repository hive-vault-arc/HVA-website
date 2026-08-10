import {draftMode} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

import {isAppLocale} from '@/i18n/config';
import type {InsightPageCursor} from '@/lib/insight-pagination';
import {getResilientPaginatedInsights} from '@/lib/resilient-insights';

function cursorFromRequest(request: NextRequest): InsightPageCursor | null {
  const date = request.nextUrl.searchParams.get('cursorDate');
  const id = request.nextUrl.searchParams.get('cursorId');

  if (!date && !id) return null;
  if (!date || !id || id.length > 256 || Number.isNaN(Date.parse(date))) {
    throw new Error('Invalid pagination cursor.');
  }

  return {date, id};
}

export async function GET(request: NextRequest) {
  const localeParam = request.nextUrl.searchParams.get('locale');
  if (!isAppLocale(localeParam)) {
    return NextResponse.json({error: 'Unsupported locale.'}, {status: 400});
  }

  let cursor: InsightPageCursor | null;
  try {
    cursor = cursorFromRequest(request);
  } catch {
    return NextResponse.json({error: 'Invalid pagination cursor.'}, {status: 400});
  }

  try {
    const pagePromise = getResilientPaginatedInsights(localeParam, cursor);
    const previewPromise = draftMode();
    const [page, preview] = await Promise.all([pagePromise, previewPromise]);
    const response = NextResponse.json(page);
    response.headers.set(
      'Cache-Control',
      preview.isEnabled
        ? 'private, no-store'
        : 'public, s-maxage=300, stale-while-revalidate=3600',
    );
    return response;
  } catch {
    return NextResponse.json(
      {error: 'Insights are temporarily unavailable.'},
      {
        status: 502,
        headers: {'Cache-Control': 'no-store'},
      },
    );
  }
}
