import {describe, expect, it} from 'vitest';

import {
  getLocalInsightCollectionPage,
  getLocalInsightsPage,
} from './resilient-insights';

describe('local insight pagination fallback', () => {
  it('preserves the four-item initial and three-item continuation contract', () => {
    const initialPage = getLocalInsightCollectionPage('en', 'post');

    expect(initialPage.items).toHaveLength(4);
    expect(initialPage.total).toBe(5);
    expect(initialPage.hasFallbackContent).toBe(true);
    expect(initialPage.nextCursor).not.toBeNull();

    const nextPage = getLocalInsightCollectionPage(
      'en',
      'post',
      initialPage.nextCursor,
    );

    expect(nextPage.items).toHaveLength(1);
    expect(nextPage.nextCursor).toBeNull();
    expect(
      new Set([
        ...initialPage.items.map((item) => item.id),
        ...nextPage.items.map((item) => item.id),
      ]).size,
    ).toBe(5);
  });

  it('normalizes legacy real-estate labels into one filterable industry', () => {
    const page = getLocalInsightCollectionPage(
      'en',
      'caseStudy',
      null,
      null,
      true,
    );

    expect(page.industries).toEqual([
      {
        id: 'real-estate',
        slug: 'real-estate',
        title: 'Real Estate',
      },
    ]);

    const filtered = getLocalInsightCollectionPage(
      'en',
      'caseStudy',
      null,
      'real-estate',
    );

    expect(filtered.total).toBe(page.total);
    expect(
      filtered.items.every((item) => item.industry?.id === 'real-estate'),
    ).toBe(true);
  });

  it('returns only the first six lightweight records for the insights hub', () => {
    const page = getLocalInsightsPage('en');

    expect(page.items).toHaveLength(6);
    expect(page.total).toBeGreaterThan(6);
    expect(page.nextCursor).not.toBeNull();
    expect(page.hasFallbackContent).toBe(true);
  });
});
