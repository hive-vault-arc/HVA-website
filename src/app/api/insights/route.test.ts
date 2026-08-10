import {NextRequest} from 'next/server';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const mocks = vi.hoisted(() => ({
  getResilientPaginatedInsights: vi.fn(),
}));

vi.mock('@/lib/resilient-insights', () => ({
  getResilientPaginatedInsights: mocks.getResilientPaginatedInsights,
}));

import {GET} from './route';

describe('Insights pagination endpoint', () => {
  beforeEach(() => {
    mocks.getResilientPaginatedInsights.mockReset();
    mocks.getResilientPaginatedInsights.mockResolvedValue({
      items: [],
      total: 0,
      hasFallbackContent: false,
      nextCursor: null,
    });
  });

  it('rejects unsupported locales before querying Sanity', async () => {
    const response = await GET(
      new NextRequest('https://hivevaultarc.com/api/insights?locale=de'),
    );

    expect(response.status).toBe(400);
    expect(mocks.getResilientPaginatedInsights).not.toHaveBeenCalled();
  });

  it('passes a validated compound cursor and exposes cacheable public data', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insights?locale=fr&cursorDate=2026-06-04&cursorId=document-6',
      ),
    );

    expect(response.status).toBe(200);
    expect(mocks.getResilientPaginatedInsights).toHaveBeenCalledWith('fr', {
      date: '2026-06-04',
      id: 'document-6',
    });
    expect(response.headers.get('cache-control')).toContain('s-maxage=300');
  });

  it('rejects partial cursors without querying Sanity', async () => {
    const response = await GET(
      new NextRequest(
        'https://hivevaultarc.com/api/insights?locale=en&cursorDate=2026-06-04',
      ),
    );

    expect(response.status).toBe(400);
    expect(mocks.getResilientPaginatedInsights).not.toHaveBeenCalled();
  });
});
