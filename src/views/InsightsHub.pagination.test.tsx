import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import type {InsightListingItem} from '@/lib/insight-pagination';
import {AllInsightsGrid} from './InsightsHub';

function listingItem(index: number): InsightListingItem {
  return {
    id: `document-${index}`,
    type: 'perspective',
    tag: 'Perspective',
    title: `Publication ${index}`,
    excerpt: `Summary ${index}`,
    image: `/publication-${index}.webp`,
    href: `/insights/perspectives/publication-${index}`,
    date: `2026-06-${String(20 - index).padStart(2, '0')}`,
    readTime: '5 min read',
    sourceLocale: 'en',
  };
}

describe('Insights grid pagination', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('requests and appends exactly six more publications on deliberate load', async () => {
    const initialItems = Array.from({length: 6}, (_, index) => listingItem(index + 1));
    const nextItems = Array.from({length: 6}, (_, index) => listingItem(index + 7));
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          items: nextItems,
          total: 12,
          hasFallbackContent: false,
          nextCursor: null,
        }),
        {status: 200, headers: {'content-type': 'application/json'}},
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const {container} = render(
      <AllInsightsGrid
        initialItems={initialItems}
        total={12}
        initialCursor={{date: initialItems[5].date, id: initialItems[5].id}}
        locale="en"
      />,
    );

    expect(container.querySelectorAll('img.insights-card-image--color')).toHaveLength(6);
    expect(screen.getAllByText('Publication 1')).toHaveLength(2);
    expect(screen.queryAllByText('Publication 7')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', {name: 'Load more'}));

    await waitFor(() => {
      expect(screen.getAllByText('Publication 12')).toHaveLength(2);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      '/api/insights?locale=en&cursorDate=2026-06-14&cursorId=document-6',
    );
    expect(screen.queryByRole('button', {name: 'Load more'})).not.toBeInTheDocument();
  });
});
