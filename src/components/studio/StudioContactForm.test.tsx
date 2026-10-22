import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {STUDIO_COPY} from '@/data/studio-home';
import {trackGenerateLead} from '@/lib/analytics-events';
import StudioContactForm from './StudioContactForm';

vi.mock('@/lib/analytics-events', () => ({trackGenerateLead: vi.fn()}));

function fillBrief() {
  fireEvent.change(screen.getByLabelText('Your name'), {target: {value: 'Preview visitor'}});
  fireEvent.change(screen.getByLabelText('Work email'), {target: {value: 'visitor@example.com'}});
  fireEvent.change(screen.getByLabelText('What would you like to improve?'), {target: {value: 'Connect our existing tools.'}});
}

describe('Studio enquiry delivery', () => {
  beforeEach(() => {vi.stubEnv('NEXT_PUBLIC_CONTACT_API_URL', 'https://example.com/contact');});
  afterEach(() => {vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks();});

  it('uses the existing contact contract and prevents an immediate duplicate delivery', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ok: true});
    vi.stubGlobal('fetch', fetchMock);
    render(<StudioContactForm copy={STUDIO_COPY.en.contact} locale="en" />);
    fillBrief();
    fireEvent.click(screen.getByRole('button', {name: STUDIO_COPY.en.contact.submit}));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(STUDIO_COPY.en.contact.success));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      name: 'Preview visitor', email: 'visitor@example.com', message: 'Connect our existing tools.',
      locale: 'en', formIdentifier: 'contact-discovery', company: '', industry: '', teamSize: '',
    });
    expect(trackGenerateLead).toHaveBeenCalledWith({locale: 'en', formId: 'contact-discovery'});
    fillBrief();
    fireEvent.click(screen.getByRole('button', {name: STUDIO_COPY.en.contact.submit}));
    expect(screen.getByRole('alert')).toHaveTextContent(STUDIO_COPY.en.contact.retry);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps the brief available after a failed delivery and does not record a lead', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok: false}));
    render(<StudioContactForm copy={STUDIO_COPY.en.contact} locale="fr" />);
    fillBrief();
    fireEvent.click(screen.getByRole('button', {name: STUDIO_COPY.en.contact.submit}));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(STUDIO_COPY.en.contact.error));
    expect(screen.getByLabelText('What would you like to improve?')).toHaveValue('Connect our existing tools.');
    expect(screen.getByRole('button', {name: STUDIO_COPY.en.contact.submit})).toBeEnabled();
    expect(trackGenerateLead).not.toHaveBeenCalled();
  });
});
