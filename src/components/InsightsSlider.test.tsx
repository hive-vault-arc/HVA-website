import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import InsightsSlider, { type SlideItem } from './InsightsSlider';

const items: SlideItem[] = [
  {
    id: 'one',
    tag: 'Perspective',
    title: 'First publication',
    description: 'First publication summary.',
    image: '/first.webp',
    href: '/insights/first',
  },
  {
    id: 'two',
    tag: 'Research',
    title: 'Second publication',
    description: 'Second publication summary.',
    image: '/second.webp',
    href: '/insights/second',
  },
];

describe('InsightsSlider', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('changes only on deliberate controls and keeps inactive slides out of the tab order', async () => {
    vi.useFakeTimers();
    const { container } = render(<InsightsSlider items={items} />);

    expect(screen.getByRole('region', { name: 'Latest publications carousel' })).toBeInTheDocument();
    const firstIndicator = screen.getByRole('button', { name: 'Go to slide 1' });
    const secondIndicator = screen.getByRole('button', { name: 'Go to slide 2' });
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('.insights-slide-card > a'));
    const initialActiveLink = container.querySelector<HTMLAnchorElement>(
      '.insights-slide-card > a[aria-current="true"]',
    );
    const initialInactiveLink = links.find((link) => link !== initialActiveLink);

    expect(firstIndicator).toHaveAttribute('aria-pressed', 'true');
    expect(initialActiveLink).toHaveAttribute('tabindex', '0');
    expect(initialInactiveLink).toHaveAttribute('tabindex', '-1');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(firstIndicator).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(secondIndicator);

    expect(secondIndicator).toHaveAttribute('aria-pressed', 'true');
    expect(initialActiveLink).toHaveAttribute('tabindex', '-1');
    expect(initialInactiveLink).toHaveAttribute('tabindex', '0');
  });
});
