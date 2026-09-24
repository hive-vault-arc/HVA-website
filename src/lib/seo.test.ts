import {join} from 'node:path';
import sharp from 'sharp';
import {describe, expect, it} from 'vitest';
import {
  CANONICAL_SITE_URL,
  CONTACT_PHONE_E164S,
  CONTACT_PHONES,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  WHATSAPP_URLS,
  compactMetaDescription,
  resolveSiteUrl,
  SCHEMA_IDS,
  schemaId,
} from './seo';

describe('default social preview', () => {
  it('uses a versioned 1200 by 630 WebP asset', async () => {
    expect(DEFAULT_OG_IMAGE_PATH).toBe('/Images/brand/hva-og-share-v3.webp');
    expect(DEFAULT_OG_IMAGE_WIDTH).toBe(1200);
    expect(DEFAULT_OG_IMAGE_HEIGHT).toBe(630);

    const imagePath = join(
      process.cwd(),
      'public',
      DEFAULT_OG_IMAGE_PATH.replace(/^\//, ''),
    );
    const metadata = await sharp(imagePath).metadata();

    expect(metadata).toMatchObject({format: 'webp', width: 1200, height: 630});
  });
});

describe('organization logo', () => {
  it('uses the approved square Rostex wordmark in structured data', () => {
    expect(SITE_LOGO_PATH).toBe('/Images/brand/hva-rostex-wordmark-stacked.svg');
    expect(SITE_LOGO_WIDTH).toBe(1080);
    expect(SITE_LOGO_HEIGHT).toBe(1080);
  });
});

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
  it('uses both official numbers for display, structured data, and WhatsApp', () => {
    expect(CONTACT_PHONES).toEqual([
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
    expect(CONTACT_PHONE_E164S).toEqual(['+212610014949', '+212610012727']);
    expect(WHATSAPP_URLS).toEqual([
      'https://wa.me/212610014949',
      'https://wa.me/212610012727',
    ]);
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
