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
    screen.getAllByRole('link', { name: 'Real Estate & Construction' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#real-estate'));
    screen.getAllByRole('link', { name: 'Healthcare & Life Sciences' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#healthcare'));
    screen.getAllByRole('link', { name: 'Financial Services' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#financial-services'));
    screen.getAllByRole('link', { name: 'Government & Public Sector' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#government'));
    screen.getAllByRole('link', { name: 'Retail & E-Commerce' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#retail'));
    screen.getAllByRole('link', { name: 'Energy & Sustainability' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#energy'));
    screen.getAllByRole('link', { name: 'Logistics & Transportation' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#logistics'));
    screen.getAllByRole('link', { name: 'Consumer Goods & Luxury' }).forEach(link => expect(link).toHaveAttribute('href', '/industries#consumer-goods'));
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
    screen.getAllByRole('link', { name: 'Blogs' }).forEach(link => expect(link).toHaveAttribute('href', '/blog'));
    screen.getAllByRole('link', { name: 'Case Studies' }).forEach(link => expect(link).toHaveAttribute('href', '/case-studies'));
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

