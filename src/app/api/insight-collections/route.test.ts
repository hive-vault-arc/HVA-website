import {NextRequest} from 'next/server';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const mocks = vi.hoisted(() => ({
  getResilientPaginatedInsightCollection: vi.fn(),
}));

vi.mock('@/lib/resilient-insights', () => ({
  getResilientPaginatedInsightCollection:
    mocks.getResilientPaginatedInsightCollection,
}));

import {GET} from './route';

describe('Insight collection pagination endpoint', () => {
  beforeEach(() => {
    mocks.getResilientPaginatedInsightCollection.mockReset();
    mocks.getResilientPaginatedInsightCollection.mockResolvedValue({
      items: [],
      industries: [],
      total: 0,
      hasFallbackContent: false,
      nextCursor: null,
    });
  });

  it('rejects unsupported collection types before querying Sanity', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insight-collections?locale=en&type=video',
      ),
    );

    expect(response.status).toBe(400);
    expect(
      mocks.getResilientPaginatedInsightCollection,
    ).not.toHaveBeenCalled();
  });

  it('requests the server-owned initial page for a selected industry', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insight-collections?locale=fr&type=caseStudy&industry=real-estate&limit=99',
      ),
    );

    expect(response.status).toBe(200);
    expect(mocks.getResilientPaginatedInsightCollection).toHaveBeenCalledWith(
      'fr',
      'caseStudy',
      null,
      'real-estate',
      false,
    );
    expect(response.headers.get('cache-control')).toContain('s-maxage=300');
  });

  it('passes a validated compound cursor for the next three records', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insight-collections?locale=en&type=post&cursorDate=2026-06-04&cursorId=post-4',
      ),
    );

    expect(response.status).toBe(200);
    expect(mocks.getResilientPaginatedInsightCollection).toHaveBeenCalledWith(
      'en',
      'post',
      {date: '2026-06-04', id: 'post-4'},
      null,
      false,
    );
  });

  it('rejects partial cursors without querying Sanity', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insight-collections?locale=en&type=post&cursorId=post-4',
      ),
    );

    expect(response.status).toBe(400);
    expect(
      mocks.getResilientPaginatedInsightCollection,
    ).not.toHaveBeenCalled();
  });
});
