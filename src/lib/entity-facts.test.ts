import {describe, expect, it} from 'vitest';
import {COMPANY_ENTITY_FACTS, COMPANY_SOCIAL_PROFILES} from './entity-facts';

describe('company entity facts', () => {
  it('uses the canonical company authority and public contact values', () => {
    expect(COMPANY_ENTITY_FACTS.canonicalWebsite).toBe('https://hivevaultarc.com');
    expect(COMPANY_ENTITY_FACTS.publicPhones).toEqual([
      {
        e164: '+212610014949',
        display: '+212 610 014 949',
        whatsappUrl: 'https://wa.me/212610014949',
      },
      {
        e164: '+212610012727',
        display: '+212 610 012 727',
        whatsappUrl: 'https://wa.me/212610012727',
      },
    ]);
    expect(COMPANY_ENTITY_FACTS.publicPhones.every(({e164}) => /^\+[1-9]\d+$/.test(e164))).toBe(true);
    expect(COMPANY_ENTITY_FACTS.publicEmail).toMatch(/@hivevaultarc\.com$/);
  });

  it('contains only HTTPS official profile URLs', () => {
    expect(COMPANY_SOCIAL_PROFILES.length).toBeGreaterThan(0);
    for (const profile of COMPANY_SOCIAL_PROFILES) {
      expect(new URL(profile.url).protocol).toBe('https:');
    }
  });
});
