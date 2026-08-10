import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import type {
  InsightCollectionItem,
  InsightIndustry,
} from '@/lib/insight-collection-pagination';

import InsightIndexPage from './InsightIndexPage';

const realEstate: InsightIndustry = {
  id: 'real-estate',
  title: 'Real Estate',
  slug: 'real-estate',
};

function item(index: number): InsightCollectionItem {
  return {
    id: `case-study-${index}`,
    type: 'caseStudy',
    slug: `case-study-${index}`,
    href: `/case-studies/case-study-${index}`,
    title: `Case study ${index}`,
    excerpt: `Case study summary ${index}`,
    image: `/case-study-${index}.webp`,
    date: `2026-06-${String(20 - index).padStart(2, '0')}`,
    sourceLocale: 'en',
    industry: realEstate,
    deploymentStatus: 'Live in production',
  };
}

describe('Shared insight collection index', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders one feature plus three cards, then appends exactly three records', async () => {
    const initialItems = Array.from({length: 4}, (_, index) => item(index + 1));
    const nextItems = Array.from({length: 3}, (_, index) => item(index + 5));
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          items: nextItems,
          industries: [],
          total: 7,
          hasFallbackContent: false,
          nextCursor: null,
        }),
        {status: 200, headers: {'content-type': 'application/json'}},
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const {container} = render(
      <InsightIndexPage
        collectionType="caseStudy"
        eyebrow="Transformation proof"
        headline="Consulting-led"
        headlineItalic="Case studies"
        description="Published delivery evidence."
        initialPage={{
          items: initialItems,
          industries: [realEstate],
          total: 7,
          hasFallbackContent: false,
          nextCursor: {
            date: initialItems[3].date,
            id: initialItems[3].id,
          },
        }}
        industries={[realEstate]}
      />,
    );

    expect(
      container.querySelectorAll(
        'img.insight-index-v2__image.insights-card-image',
      ),
    ).toHaveLength(4);
    expect(screen.getByRole('heading', {name: 'Case study 1'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Case study 4'})).toBeInTheDocument();
    expect(screen.queryByText('Case study 5')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Load 3 more'}));

    await waitFor(() => {
      expect(screen.getByRole('heading', {name: 'Case study 7'})).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      'type=caseStudy&cursorDate=2026-06-16&cursorId=case-study-4',
    );
    expect(
      screen.queryByRole('button', {name: 'Load 3 more'}),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.insight-index-v2__load-zone'),
    ).toBeNull();
    expect(
      screen.getByRole('heading', {
        name: 'Need insights mapped to your operations?',
      }),
    ).toBeInTheDocument();
  });

  it('requests a fresh four-record page when a visitor selects an industry', async () => {
    const education: InsightIndustry = {
      id: 'education-professional-training',
      title: 'Education & Professional Training',
      slug: 'education-professional-training',
    };
    const initialItems = Array.from({length: 4}, (_, index) => item(index + 1));
    const educationItem = {
      ...item(8),
      id: 'education-case-study',
      title: 'Education case study',
      industry: education,
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          items: [educationItem],
          industries: [],
          total: 1,
          hasFallbackContent: false,
          nextCursor: null,
        }),
        {status: 200, headers: {'content-type': 'application/json'}},
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    render(
      <InsightIndexPage
        collectionType="caseStudy"
        eyebrow="Transformation proof"
        headline="Consulting-led"
        headlineItalic="Case studies"
        description="Published delivery evidence."
        initialPage={{
          items: initialItems,
          industries: [realEstate, education],
          total: 4,
          hasFallbackContent: false,
          nextCursor: null,
        }}
        industries={[realEstate, education]}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {name: 'Education & Professional Training'}),
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {name: 'Education case study'}),
      ).toBeInTheDocument();
    });
    expect(fetchMock.mock.calls[0][0]).toContain(
      'type=caseStudy&industry=education-professional-training',
    );
    expect(fetchMock.mock.calls[0][0]).not.toContain('cursorDate');
  });
});
