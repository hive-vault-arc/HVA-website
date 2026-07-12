import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const coreLinks = [
  ['ARC Framework', '/arc'],
  ['Capabilities', '/capabilities'],
  ['Industries', '/industries'],
  ['Who We Are', '/aboutus'],
  ['Insights', '/insights'],
] as const;

const submenuLinks = {
  Capabilities: [
    ['Solution Programs', '/capabilities/solution-programs'],
    ['In Detail', '/capabilities/in-detail'],
  ],
  Industries: [
    ['Real Estate & Construction', '/industries#real-estate'],
    ['Healthcare & Life Sciences', '/industries#healthcare'],
    ['Financial Services', '/industries#financial-services'],
    ['Government & Public Sector', '/industries#government'],
    ['Retail & E-Commerce', '/industries#retail'],
    ['Energy & Sustainability', '/industries#energy'],
    ['Logistics & Transportation', '/industries#logistics'],
    ['Consumer Goods & Luxury', '/industries#consumer-goods'],
  ],
  'Who We Are': [
    ['About Us', '/aboutus'],
    ['Portfolio', '/whoarewe/portfolio'],
  ],
  Insights: [
    ['Blog', '/blog'],
    ['Case Studies', '/case-studies'],
    ['News Articles', '/insights/news-articles'],
    ['Perspectives', '/insights/perspectives'],
    ['Research Reports', '/insights/research-reports'],
  ],
} as const;

describe('Navbar', () => {
  it('adds its framed surface only after the page is scrolled', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    const { container } = render(<Navbar />);
    const navSurface = container.querySelector('[data-scrolled]');

    expect(navSurface).toHaveAttribute('data-scrolled', 'false');

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 });
    fireEvent.scroll(window);

    expect(navSurface).toHaveAttribute('data-scrolled', 'true');
  });

  it('routes core links and exposes submenu links on keyboard focus', () => {
    render(<Navbar />);

    coreLinks.forEach(([name, href]) => {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    });

    Object.entries(submenuLinks).forEach(([menuName, links]) => {
      fireEvent.focus(screen.getByRole('link', { name: menuName }));
      links.forEach(([name, href]) => {
        expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
      });
    });

    expect(screen.queryByRole('link', { name: 'Contact' })).toBeNull();
  });

  it('routes Book a Call CTA to contact page', () => {
    render(<Navbar />);

    const ctaLinks = screen.getAllByRole('link', { name: 'Book a Call' });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/contact');
    });
  });
});
