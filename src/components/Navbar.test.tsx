import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders only valid core navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    screen.getAllByRole('link', { name: 'About' }).forEach(link => expect(link).toHaveAttribute('href', '/about'));
    screen.getAllByRole('link', { name: 'Portfolio' }).forEach(link => expect(link).toHaveAttribute('href', '/portfolio'));
    screen.getAllByRole('link', { name: 'Services' }).forEach(link => expect(link).toHaveAttribute('href', '/services'));
    screen.getAllByRole('link', { name: 'Contact' }).forEach(link => expect(link).toHaveAttribute('href', '/contact'));
  });

  it('routes Book a Call CTA to contact page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    const ctaLinks = screen.getAllByRole('link', { name: 'Book a call' });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/contact');
    });
  });
});
