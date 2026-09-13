import {beforeEach, describe, expect, it, vi} from 'vitest';

import {
  trackBookCallClick,
  trackCaseStudyOpen,
  trackGenerateLead,
} from './analytics-events';
import {
  createConsentPreferences,
  writeConsentCookie,
} from './privacy/consent';

describe('consent-aware analytics events', () => {
  beforeEach(() => {
    document.cookie = 'hva_consent_v1=; Path=/; Max-Age=0';
    window.gtag = vi.fn();
  });

  it('does not emit events before analytics consent', () => {
    expect(
      trackGenerateLead({locale: 'en', formId: 'contact-discovery'}),
    ).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('emits the approved conversion events after consent', () => {
    writeConsentCookie(createConsentPreferences(true));

    expect(
      trackGenerateLead({locale: 'fr', formId: 'contact-discovery'}),
    ).toBe(true);
    expect(
      trackBookCallClick({locale: 'es', placement: 'bottom_cta'}),
    ).toBe(true);
    expect(
      trackCaseStudyOpen({
        locale: 'ar',
        slug: 'workflow-example',
        placement: 'collection_card',
      }),
    ).toBe(true);

    expect(window.gtag).toHaveBeenNthCalledWith(1, 'event', 'generate_lead', {
      locale: 'fr',
      form_id: 'contact-discovery',
      method: 'contact_form',
    });
    expect(window.gtag).toHaveBeenNthCalledWith(2, 'event', 'book_call_click', {
      locale: 'es',
      placement: 'bottom_cta',
    });
    expect(window.gtag).toHaveBeenNthCalledWith(3, 'event', 'case_study_open', {
      locale: 'ar',
      case_study_slug: 'workflow-example',
      placement: 'collection_card',
    });
  });
});
