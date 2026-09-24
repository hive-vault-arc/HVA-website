import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';

vi.mock('../components/PageAmbientBackground', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Contact form', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_CONTACT_API_URL', 'https://example.com/contact');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('places contact details before the discovery form in the compact reading order', () => {
    render(<Contact />);

    const detailsHeading = screen.getByRole('heading', {
      name: 'Contact details',
    });
    const formHeading = screen.getByRole('heading', {
      name: 'Send a short brief',
    });

    expect(
      detailsHeading.compareDocumentPosition(formHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByRole('link', {name: '+212 610 014 949'})).toHaveAttribute(
      'href',
      'tel:+212610014949',
    );
    expect(screen.getByRole('link', {name: '+212 610 012 727'})).toHaveAttribute(
      'href',
      'tel:+212610012727',
    );
  });

  it('shows success feedback on successful submit', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Khalid' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'khalid@example.com' } });
    fireEvent.change(screen.getByLabelText('Transformation Brief'), {
      target: { value: 'Need a digital transformation roadmap and engineering support.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Thank you. Your message has been received.')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
