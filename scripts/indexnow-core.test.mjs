import {describe, expect, it} from 'vitest';
import {
  buildIndexNowPayload,
  normalizeIndexNowUrls,
  validateIndexNowKey,
} from './indexnow-core.mjs';

describe('IndexNow submission safety', () => {
  it('accepts only the official key character set', () => {
    expect(validateIndexNowKey('company-key-2026')).toBe(true);
    expect(validateIndexNowKey('company_key_2026')).toBe(false);
    expect(validateIndexNowKey('short')).toBe(false);
  });

  it('normalizes, deduplicates, and limits URLs to the canonical host', () => {
    expect(normalizeIndexNowUrls(['/capabilities', '/capabilities'])).toEqual([
      'https://hivevaultarc.com/capabilities',
    ]);
    expect(() => normalizeIndexNowUrls(['https://example.com/page'])).toThrow(
      'must belong to https://hivevaultarc.com',
    );
    expect(() => normalizeIndexNowUrls(['/page?email=private@example.com'])).toThrow(
      'clean canonical URL',
    );
  });

  it('builds a payload without expanding to a stale default inventory', () => {
    expect(buildIndexNowPayload({
      urls: ['/updated-page'],
      key: 'company-key-2026',
      keyLocation: 'https://hivevaultarc.com/indexnow-key.txt',
    })).toEqual({
      host: 'hivevaultarc.com',
      key: 'company-key-2026',
      keyLocation: 'https://hivevaultarc.com/indexnow-key.txt',
      urlList: ['https://hivevaultarc.com/updated-page'],
    });
  });
});
