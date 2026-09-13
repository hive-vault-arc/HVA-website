import {describe, expect, it} from 'vitest';
import {COMPANY_ENTITY_FACTS, COMPANY_SOCIAL_PROFILES} from './entity-facts';

describe('company entity facts', () => {
  it('uses the canonical company authority and public contact values', () => {
    expect(COMPANY_ENTITY_FACTS.canonicalWebsite).toBe('https://hivevaultarc.com');
    expect(COMPANY_ENTITY_FACTS.publicPhoneE164).toMatch(/^\+[1-9]\d+$/);
    expect(COMPANY_ENTITY_FACTS.publicEmail).toMatch(/@hivevaultarc\.com$/);
  });

  it('contains only HTTPS official profile URLs', () => {
    expect(COMPANY_SOCIAL_PROFILES.length).toBeGreaterThan(0);
    for (const profile of COMPANY_SOCIAL_PROFILES) {
      expect(new URL(profile.url).protocol).toBe('https:');
    }
  });
});
