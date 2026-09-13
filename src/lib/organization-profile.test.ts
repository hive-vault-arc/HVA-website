import {describe, expect, it} from 'vitest';
import {resolveOrganizationFacts, type OrganizationFacts} from './organization-profile';

const fallback: OrganizationFacts = {
  brandName: 'Hive Vault Arc',
  legalName: 'Hive Vault Arc',
  canonicalWebsite: 'https://hivevaultarc.com',
  description: 'Fallback description',
  publicEmail: 'fallback@example.com',
  publicTelephone: '+000',
  serviceAreas: ['Fallback market'],
  sameAs: ['https://example.com/fallback'],
};

describe('approved organization fact resolution', () => {
  it('keeps code facts when no approved CMS profile is available', () => {
    expect(resolveOrganizationFacts(null, 'en', fallback)).toEqual(fallback);
  });

  it('uses the same approved CMS facts for structured and machine-readable consumers', () => {
    const resolved = resolveOrganizationFacts(
      {
        brandName: 'Approved Brand',
        legalName: 'Approved Legal Name',
        canonicalWebsite: 'https://hivevaultarc.com',
        descriptions: {en: 'Approved description', ar: 'وصف معتمد'},
        publicEmail: 'approved@example.com',
        publicTelephone: '+111',
        serviceAreas: ['Morocco'],
        sameAs: ['https://example.com/approved'],
        logoUrl: 'https://cdn.sanity.io/logo.webp',
      },
      'ar',
      fallback,
    );

    expect(resolved.description).toBe('وصف معتمد');
    expect(resolved.brandName).toBe('Approved Brand');
    expect(resolved.sameAs).toEqual(['https://example.com/approved']);
  });
});
