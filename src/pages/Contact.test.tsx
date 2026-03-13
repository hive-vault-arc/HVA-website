import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';

vi.mock('../components/PageAmbientBackground', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Contact form', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CONTACT_API_URL', 'https://example.com/contact');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('shows success feedback on successful submit', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Khalid' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'khalid@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Need a platform build.' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Thank you. Your message was sent successfully.')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
