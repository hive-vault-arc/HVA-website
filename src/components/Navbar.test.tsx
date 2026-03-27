import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders only valid core navigation links', () => {
    render(<Navbar />);

    screen.getAllByRole('link', { name: 'About' }).forEach(link => expect(link).toHaveAttribute('href', '/about'));
    screen.getAllByRole('link', { name: 'Services' }).forEach(link => expect(link).toHaveAttribute('href', '/services'));
    screen.getAllByRole('link', { name: 'Products' }).forEach(link => expect(link).toHaveAttribute('href', '/products-systems'));
    screen.getAllByRole('link', { name: 'Case Studies' }).forEach(link => expect(link).toHaveAttribute('href', '/case-studies'));
    screen.getAllByRole('link', { name: 'Portfolio' }).forEach(link => expect(link).toHaveAttribute('href', '/portfolio'));
    screen.getAllByRole('link', { name: 'Blog' }).forEach(link => expect(link).toHaveAttribute('href', '/blog'));
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
