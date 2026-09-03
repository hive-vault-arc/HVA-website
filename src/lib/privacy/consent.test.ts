import {afterEach, describe, expect, it} from 'vitest';
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  createConsentPreferences,
  readConsentCookie,
  writeConsentCookie,
} from './consent';

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0`;
});

describe('cookie consent preferences', () => {
  it('writes and reads the versioned analytics choice', () => {
    const preference = createConsentPreferences(true);
    writeConsentCookie(preference);

    expect(readConsentCookie()).toEqual(preference);
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=`);
  });

  it('rejects malformed or incompatible stored preferences', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=%7Bnot-json; Path=/`;
    expect(readConsentCookie()).toBeNull();

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify({
      version: 0,
      necessary: true,
      analytics: true,
      advertising: false,
      decidedAt: new Date().toISOString(),
    }))}; Path=/`;
    expect(readConsentCookie()).toBeNull();
  });

  it('uses the agreed six-month cookie lifetime', () => {
    expect(CONSENT_MAX_AGE_SECONDS).toBe(15_552_000);
  });

  it('rejects expired, future-dated, and invalid decisions', () => {
    for (const decidedAt of ['not-a-date', '2000-01-01T00:00:00.000Z', '2999-01-01T00:00:00.000Z']) {
      writeConsentCookie({...createConsentPreferences(true), decidedAt});
      expect(readConsentCookie()).toBeNull();
    }
  });
});
