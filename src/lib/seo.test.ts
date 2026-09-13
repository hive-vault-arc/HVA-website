import {describe, expect, it} from 'vitest';
import {
  CANONICAL_SITE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  WHATSAPP_URL,
  compactMetaDescription,
  resolveSiteUrl,
  SCHEMA_IDS,
  schemaId,
} from './seo';

describe('compactMetaDescription', () => {
  it('normalizes whitespace without changing a concise description', () => {
    expect(compactMetaDescription('A concise\n  description for a consulting page.')).toBe(
      'A concise description for a consulting page.'
    );
  });

  it('shortens long descriptions at a word boundary', () => {
    const description =
      'Hive Vault Arc combines strategy, engineering, AI systems, cloud infrastructure, and managed operations in one accountable transformation engagement for growing organizations.';
    const compacted = compactMetaDescription(description, 120);

    expect(compacted.length).toBeLessThanOrEqual(120);
    expect(compacted.endsWith('...')).toBe(true);
    expect(compacted).not.toMatch(/\s\.\.\.$/);
  });
});

describe('contact identity', () => {
  it('uses the official number for display, structured data, and WhatsApp', () => {
    expect(CONTACT_PHONE_DISPLAY).toBe('+212 670 431 249');
    expect(CONTACT_PHONE_E164).toBe('+212670431249');
    expect(WHATSAPP_URL).toBe('https://wa.me/212670431249');
  });
});

describe('site URL authority', () => {
  it('uses the production authority when no environment value exists', () => {
    expect(resolveSiteUrl(undefined, 'development')).toBe(CANONICAL_SITE_URL);
  });

  it('normalizes an HTTPS origin', () => {
    expect(resolveSiteUrl('https://hivevaultarc.com/', 'development')).toBe(
      CANONICAL_SITE_URL,
    );
  });

  it.each([
    'http://hivevaultarc.com',
    'https://hivevaultarc.com/path',
    'https://hivevaultarc.com?preview=1',
    'https://user:secret@hivevaultarc.com',
  ])('rejects malformed canonical authority %s', (value) => {
    expect(() => resolveSiteUrl(value, 'development')).toThrow();
  });

  it('rejects every non-canonical Vercel Production origin', () => {
    expect(() =>
      resolveSiteUrl('https://hive-vault-arc-website.vercel.app', 'production'),
    ).toThrow(`NEXT_PUBLIC_SITE_URL=${CANONICAL_SITE_URL}`);
  });
});

describe('stable schema identifiers', () => {
  it('uses the production authority for global and page entity IDs', () => {
    expect(SCHEMA_IDS).toEqual({
      organization: 'https://hivevaultarc.com/#organization',
      website: 'https://hivevaultarc.com/#website',
    });
    expect(schemaId('/fr/expertises', 'webpage')).toBe(
      'https://hivevaultarc.com/fr/expertises#webpage',
    );
  });
});
