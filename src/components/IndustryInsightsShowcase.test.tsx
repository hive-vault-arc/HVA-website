import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import IndustryInsightsShowcase, {
  type IndustryInsightItem,
} from './IndustryInsightsShowcase';

vi.mock('@/i18n/navigation', () => ({
  Link: (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      locale?: string;
      prefetch?: boolean;
    },
  ) => {
    const {locale, prefetch, ...anchorProps} = props;
    void locale;
    void prefetch;
    return <a {...anchorProps} />;
  },
}));

const items: IndustryInsightItem[] = [
  {
    id: 'one',
    tag: 'Perspective',
    title: 'First publication',
    description: 'First publication summary.',
    image: '/first.webp',
    href: '/insights/first',
    sourceLocale: 'en',
  },
  {
    id: 'two',
    tag: 'Research',
    title: 'Second publication',
    description: 'Second publication summary.',
    image: '/second.webp',
    href: '/insights/second',
    sourceLocale: 'en',
  },
  {
    id: 'three',
    tag: 'Case study',
    title: 'Third publication',
    description: 'Third publication summary.',
    image: '/third.webp',
    href: '/insights/third',
    sourceLocale: 'en',
  },
  {
    id: 'four',
    tag: 'News',
    title: 'Fourth publication',
    description: 'Fourth publication summary.',
    image: '/fourth.webp',
    href: '/insights/fourth',
    sourceLocale: 'en',
  },
];

describe('IndustryInsightsShowcase', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('renders two featured stories and withholds offscreen rail images', () => {
    const {container} = render(<IndustryInsightsShowcase items={items} />);

    expect(container.querySelectorAll('.industries-insights-feature-card')).toHaveLength(
      2,
    );
    expect(container.querySelectorAll('.industries-insights-rail-card')).toHaveLength(
      items.length,
    );
    expect(container.querySelectorAll('img')).toHaveLength(3);
    expect(
      screen.getAllByRole('link', {name: /Read insight:/i}),
    ).toHaveLength(items.length + 2);
  });

  it('autoplays only while the showcase is visible and not hovered', async () => {
    vi.useFakeTimers();

    class ImmediateIntersectionObserver {
      private readonly callback: IntersectionObserverCallback;

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }

      observe(target: Element) {
        this.callback(
          [
            {
              isIntersecting: true,
              target,
            } as IntersectionObserverEntry,
          ],
          this as unknown as IntersectionObserver,
        );
      }

      disconnect() {}
      unobserve() {}
      takeRecords() {
        return [];
      }
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];
    }

    vi.stubGlobal('IntersectionObserver', ImmediateIntersectionObserver);

    const {container} = render(<IndustryInsightsShowcase items={items} />);
    const region = screen.getByRole('region', {
      name: 'Ideas tested against operating reality.',
    });
    const railCards = Array.from(
      container.querySelectorAll<HTMLElement>('.industries-insights-rail-card'),
    );

    expect(railCards[0]).toHaveAttribute('aria-current', 'true');

    fireEvent.mouseEnter(region);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000);
    });
    expect(railCards[0]).toHaveAttribute('aria-current', 'true');

    fireEvent.mouseLeave(region);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5200);
    });
    expect(railCards[1]).toHaveAttribute('aria-current', 'true');
  });
});
