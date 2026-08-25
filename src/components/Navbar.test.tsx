import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import Navbar from './Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

const coreLinks = [
  ['ARC Framework', '/arc', 'arc'],
  ['Capabilities', '/capabilities', 'capabilities'],
  ['Industries', '/industries', 'industries'],
  ['Who We Are', '/aboutus', 'who-we-are'],
  ['Insights', '/insights', 'insights'],
] as const;

const submenuLinks = {
  Capabilities: [
    ['Strategy & Business Consulting', '/capabilities/strategy-business'],
    ['Technology Consulting', '/capabilities/technology-consulting'],
    ['AI, Data & Analytics', '/capabilities/ai-data-analytics'],
    ['Software Engineering', '/capabilities/software-engineering'],
    ['Cloud & Infrastructure', '/capabilities/cloud-infrastructure'],
    ['Operations & Managed Services', '/capabilities/operations-managed'],
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
    ['LinkedIn', 'https://www.linkedin.com/company/hive-vault-arc'],
    ['Instagram', 'https://www.instagram.com/hivevaultarc/'],
    ['X', 'https://x.com/Hivevaultarc'],
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
    expect(navSurface).toHaveAttribute('data-navbar-surface', 'shell');
    expect(navSurface).toHaveClass('rounded-none');
    expect(navSurface).toHaveClass('border-transparent');
    expect(navSurface).toHaveClass('shadow-none');

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 });
    fireEvent.scroll(window);

    expect(navSurface).toHaveAttribute('data-scrolled', 'true');
    expect(navSurface).toHaveClass('border-[#DDE3EA]');
    expect(navSurface).toHaveClass('shadow-[0_6px_18px_rgba(26,37,53,0.10)]');
  });

  it('routes core links and exposes submenu links on keyboard focus', () => {
    render(<Navbar />);

    coreLinks.forEach(([name, href, navbarLink]) => {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('data-navbar-link', navbarLink);
    });

    Object.entries(submenuLinks).forEach(([menuName, links]) => {
      fireEvent.focus(screen.getByRole('link', { name: menuName }));
      links.forEach(([name, href]) => {
        expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
      });

      if (menuName === 'Who We Are') {
        ['LinkedIn', 'Instagram', 'X'].forEach((name) => {
          expect(screen.getByRole('link', {name})).toHaveAttribute(
            'target',
            '_blank',
          );
          expect(screen.getByRole('link', {name})).toHaveAttribute(
            'rel',
            'noopener noreferrer',
          );
        });
      }
    });

    expect(screen.queryByRole('link', { name: 'Contact' })).toBeNull();
  }, 10000);

  it('routes Book a Call CTA to contact page', () => {
    render(<Navbar />);

    const ctaLinks = screen.getAllByRole('link', { name: 'Book a Call' });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/contact');
      expect(link).toHaveClass('site-action', 'site-action-primary');
      expect(link.querySelector('svg')).toBeNull();
    });
  });

  it('places an accessible desktop language dropdown beside Book a Call', () => {
    render(<Navbar />);

    const trigger = screen.getByRole('button', {
      name: 'Current language: English',
    });
    const actionGroup = trigger.closest('[data-navbar-actions]');

    expect(actionGroup).not.toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      within(actionGroup as HTMLElement).getByRole('link', {name: 'Book a Call'}),
    ).toHaveAttribute('href', '/contact');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', {name: 'Choose language'})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', {name: 'English'})).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.getByRole('menuitem', {name: 'View this page in Français'}),
    ).toHaveAttribute('href', '/fr');

    fireEvent.keyDown(document, {key: 'Escape'});

    expect(screen.queryByRole('menu', {name: 'Choose language'})).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('keeps the direct language links in the mobile navigation', () => {
    const {container} = render(<Navbar />);

    fireEvent.click(screen.getByRole('button', {name: 'Open navigation menu'}));

    const mobileSwitcher = container.querySelector(
      '[data-locale-switcher="mobile"]',
    );
    expect(mobileSwitcher).not.toBeNull();
    expect(
      within(mobileSwitcher as HTMLElement).getByRole('link', {name: 'English'}),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      within(mobileSwitcher as HTMLElement).getByRole('link', {
        name: 'View this page in Français',
      }),
    ).toHaveAttribute('href', '/fr');
  });

  it('moves focus into the mobile panel and restores it after Escape', async () => {
    render(<Navbar />);

    const trigger = screen.getByRole('button', {name: 'Open navigation menu'});
    fireEvent.click(trigger);

    const panel = screen.getByRole('dialog', {name: 'Mobile navigation'});
    expect(panel).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
    await waitFor(() => {
      expect(
        within(panel).getByRole('button', {name: 'Close navigation menu'}),
      ).toHaveFocus();
    });

    fireEvent.keyDown(document, {key: 'Escape'});

    await waitFor(() => {
      expect(screen.queryByRole('dialog', {name: 'Mobile navigation'})).toBeNull();
      expect(document.body.style.overflow).toBe('');
      expect(trigger).toHaveFocus();
    });
  });

  it('uses a sharp framed mobile navigation rail with separate accordion controls', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', {name: 'Open navigation menu'}));

    const panel = screen.getByRole('dialog', {name: 'Mobile navigation'});
    expect(within(panel).getByAltText('Hive Vault Arc')).toBeInTheDocument();
    expect(panel).not.toHaveClass('rounded-xl');
    expect(panel).not.toHaveClass('rounded-lg');
    expect(within(panel).getByRole('link', {name: 'ARC'})).toHaveAttribute(
      'href',
      '/arc',
    );

    const capabilitiesToggle = within(panel).getByRole('button', {
      name: 'Toggle capabilities submenu',
    });
    expect(capabilitiesToggle).toHaveAttribute('aria-expanded', 'false');
    expect(capabilitiesToggle).toHaveAttribute(
      'aria-controls',
      'mobile-navigation-capabilities',
    );
    expect(within(panel).getByRole('link', {name: 'Capabilities'})).toHaveAttribute(
      'href',
      '/capabilities',
    );

    fireEvent.click(capabilitiesToggle);

    expect(capabilitiesToggle).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(panel).getByRole('link', {name: 'Strategy & Business Consulting'}),
    ).toHaveAttribute('href', '/capabilities/strategy-business');
  });

  it('keeps desktop, locale, and mobile navigation surfaces square', () => {
    const {container} = render(<Navbar />);

    fireEvent.focus(screen.getByRole('link', {name: 'Capabilities'}));
    expect(container.querySelector('[data-navbar-surface="desktop-menu"]')).toHaveClass(
      'rounded-none',
    );

    fireEvent.click(
      screen.getByRole('button', {name: 'Current language: English'}),
    );
    expect(container.querySelector('[data-navbar-surface="locale-menu"]')).toHaveClass(
      'rounded-none',
    );

    fireEvent.click(screen.getByRole('button', {name: 'Open navigation menu'}));
    expect(container.querySelector('[data-navbar-surface="mobile-menu"]')).toBeInTheDocument();
    expect(container.querySelector('.navbar-mobile-panel')).not.toHaveClass('rounded-xl');
    expect(container.querySelector('.navbar-mobile-panel')).not.toHaveClass('rounded-lg');
  });

  it('uses logical RTL-safe placement and mirrors directional arrows', () => {
    const {container} = render(<Navbar />);

    expect(container.firstElementChild).toHaveClass('inset-x-2', 'lg:start-1/2');
    fireEvent.focus(screen.getByRole('link', {name: 'Capabilities'}));
    expect(container.querySelector('[data-navbar-surface="desktop-menu"] > div > div'))
      .toHaveClass('border-s');

    fireEvent.click(screen.getByRole('button', {name: 'Open navigation menu'}));
    expect(container.querySelector('.navbar-mobile-panel')).toHaveClass('end-0', 'border-s');
    expect(container.querySelectorAll('.rtl\\:rotate-180').length).toBeGreaterThan(0);
  });
});
