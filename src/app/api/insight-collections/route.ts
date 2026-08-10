import {draftMode} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

import {isAppLocale} from '@/i18n/config';
import {
  isInsightCollectionType,
  type InsightCollectionCursor,
} from '@/lib/insight-collection-pagination';
import {getResilientPaginatedInsightCollection} from '@/lib/resilient-insights';

function cursorFromRequest(request: NextRequest): InsightCollectionCursor | null {
  const date = request.nextUrl.searchParams.get('cursorDate');
  const id = request.nextUrl.searchParams.get('cursorId');

  if (!date && !id) return null;
  if (!date || !id || id.length > 256 || Number.isNaN(Date.parse(date))) {
    throw new Error('Invalid pagination cursor.');
  }

  return {date, id};
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale');
  const collectionType = request.nextUrl.searchParams.get('type');
  const industry = request.nextUrl.searchParams.get('industry');

  if (!isAppLocale(locale)) {
    return NextResponse.json({error: 'Unsupported locale.'}, {status: 400});
  }
  if (!collectionType || !isInsightCollectionType(collectionType)) {
    return NextResponse.json(
      {error: 'Unsupported collection type.'},
      {status: 400},
    );
  }
  if (industry && industry.length > 256) {
    return NextResponse.json({error: 'Invalid industry.'}, {status: 400});
  }

  let cursor: InsightCollectionCursor | null;
  try {
    cursor = cursorFromRequest(request);
  } catch {
    return NextResponse.json(
      {error: 'Invalid pagination cursor.'},
      {status: 400},
    );
  }

  try {
    const pagePromise = getResilientPaginatedInsightCollection(
      locale,
      collectionType,
      cursor,
      industry || null,
      false,
    );
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
      {error: 'This publication collection is temporarily unavailable.'},
      {
        status: 502,
        headers: {'Cache-Control': 'no-store'},
      },
    );
  }
}
