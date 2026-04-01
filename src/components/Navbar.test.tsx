import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders only valid core navigation links', () => {
    render(<Navbar />);

    screen.getAllByRole('link', { name: 'ARC' }).forEach(link => expect(link).toHaveAttribute('href', '/arc'));
    screen.getAllByRole('link', { name: 'Solution Programs' }).forEach(link => expect(link).toHaveAttribute('href', '/capabilities/solution-programs'));
    screen.getAllByRole('link', { name: 'In Detail' }).forEach(link => expect(link).toHaveAttribute('href', '/capabilities/in-detail'));
    screen.getAllByRole('link', { name: 'Real Estate' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#real-estate'));
    screen.getAllByRole('link', { name: 'Healthcare' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#healthcare'));
    screen.getAllByRole('link', { name: 'Construction' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#construction'));
    screen.getAllByRole('link', { name: 'Logistics' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#logistics'));
    screen.getAllByRole('link', { name: 'Finance & Brokerage' }).forEach(link =>
      expect(link).toHaveAttribute('href', '/industries#finance-brokerage')
    );
    screen.getAllByRole('link', { name: 'SME Capabilities' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#sme-capabilities'));
    screen.getAllByRole('link', { name: 'Capabilities' }).forEach(link => expect(link).toHaveAttribute('href', '/capabilities'));
    screen.getAllByRole('link', { name: 'Industries' }).forEach(link => expect(link).toHaveAttribute('href', '/industries'));
    screen.getAllByRole('link', { name: 'Who We Are' }).forEach(link =>
      expect(link).toHaveAttribute('href', '/whoweare/abouthva')
    );
    screen.getAllByRole('link', { name: 'About H.V.A' }).forEach(link =>
      expect(link).toHaveAttribute('href', '/whoweare/abouthva')
    );
    screen.getAllByRole('link', { name: 'Portfolio' }).forEach(link =>
      expect(link).toHaveAttribute('href', '/whoarewe/portfolio')
    );
    screen.getAllByRole('link', { name: 'Insights' }).forEach(link => expect(link).toHaveAttribute('href', '/insights'));
    screen.getAllByRole('link', { name: 'Blogs' }).forEach(link => expect(link).toHaveAttribute('href', '/insights/blogs'));
    screen.getAllByRole('link', { name: 'Case Studies' }).forEach(link => expect(link).toHaveAttribute('href', '/insights/case-studies'));
    screen.getAllByRole('link', { name: 'News Articles' }).forEach(link => expect(link).toHaveAttribute('href', '/insights/news-articles'));
    screen.getAllByRole('link', { name: 'Perspectives' }).forEach(link => expect(link).toHaveAttribute('href', '/insights/perspectives'));
    screen.getAllByRole('link', { name: 'Research Reports' }).forEach(link => expect(link).toHaveAttribute('href', '/insights/research-reports'));
    expect(screen.queryByRole('link', { name: 'Contact' })).toBeNull();
  });

  it('routes Book a Call CTA to contact page', () => {
    render(<Navbar />);

    const ctaLinks = screen.getAllByRole('link', { name: 'Book a call' });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/contact');
    });
  });
});


