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
    editorialFormat: index % 2 === 0 ? 'evidence-brief' : 'operating-note',
    topics: index % 2 === 0 ? ['data-cloud-reliability'] : ['ai-operational-systems'],
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

    expect(container.querySelectorAll('img')).toHaveLength(6);
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.queryAllByText('Publication 7')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', {name: 'Load six more'}));

    await waitFor(() => {
      expect(screen.getByText('Publication 12')).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      '/api/insights?locale=en&cursorDate=2026-06-14&cursorId=document-6',
    );
    expect(screen.queryByRole('button', {name: 'Load six more'})).not.toBeInTheDocument();
  });

  it('filters the loaded library by stable topic and format keys', () => {
    const initialItems = Array.from({length: 6}, (_, index) => listingItem(index + 1));
    render(
      <AllInsightsGrid
        initialItems={initialItems}
        total={6}
        initialCursor={null}
        locale="en"
      />,
    );

    fireEvent.change(screen.getByLabelText('Topic'), {
      target: {value: 'data-cloud-reliability'},
    });
    expect(screen.getByText('Publication 2')).toBeInTheDocument();
    expect(screen.queryByText('Publication 1')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Format'), {
      target: {value: 'evidence-brief'},
    });
    expect(screen.getByText('Publication 4')).toBeInTheDocument();
  });

  it('checks later pages before reporting that a filter has no matches', async () => {
    const initialItems = Array.from({length: 6}, (_, index) => ({
      ...listingItem(index + 1),
      topics: ['ai-operational-systems'] as InsightListingItem['topics'],
    }));
    const laterItems = Array.from({length: 6}, (_, index) => ({
      ...listingItem(index + 7),
      topics: ['data-cloud-reliability'] as InsightListingItem['topics'],
    }));
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({items: laterItems, total: 12, hasFallbackContent: false, nextCursor: null}),
        {status: 200, headers: {'content-type': 'application/json'}},
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AllInsightsGrid
        initialItems={initialItems}
        total={12}
        initialCursor={{date: initialItems[5].date, id: initialItems[5].id}}
        locale="en"
      />,
    );

    fireEvent.change(screen.getByLabelText('Topic'), {
      target: {value: 'data-cloud-reliability'},
    });

    expect(screen.queryByText('No publications match these filters.')).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Publication 7')).toBeInTheDocument());
    expect(screen.queryByText('Publication 1')).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('offers a retry instead of claiming no matches when a filtered page fails', async () => {
    const initialItems = Array.from({length: 6}, (_, index) => ({
      ...listingItem(index + 1),
      topics: ['ai-operational-systems'] as InsightListingItem['topics'],
    }));
    const laterItem = {
      ...listingItem(7),
      topics: ['data-cloud-reliability'] as InsightListingItem['topics'],
    };
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('Network unavailable'))
      .mockResolvedValueOnce(new Response(
        JSON.stringify({items: [laterItem], total: 7, hasFallbackContent: false, nextCursor: null}),
        {status: 200, headers: {'content-type': 'application/json'}},
      ));
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AllInsightsGrid
        initialItems={initialItems}
        total={12}
        initialCursor={{date: initialItems[5].date, id: initialItems[5].id}}
        locale="en"
      />,
    );

    fireEvent.change(screen.getByLabelText('Topic'), {
      target: {value: 'data-cloud-reliability'},
    });

    await waitFor(() => expect(screen.getByRole('button', {name: 'Try again'})).toBeInTheDocument());
    expect(screen.queryByText('No publications match these filters.')).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', {name: 'Try again'}));
    await waitFor(() => expect(screen.getByText('Publication 7')).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
