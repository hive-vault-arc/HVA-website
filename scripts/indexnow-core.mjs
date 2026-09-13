export const CANONICAL_BASE_URL = 'https://hivevaultarc.com';

export function validateIndexNowKey(key) {
  return typeof key === 'string' && /^[A-Za-z0-9-]{8,128}$/.test(key);
}

export function normalizeIndexNowUrls(values, baseUrl = CANONICAL_BASE_URL) {
  const base = new URL(baseUrl);

  return Array.from(new Set(values.map((value) => {
    const url = new URL(value, base);
    if (url.origin !== base.origin) {
      throw new Error(`IndexNow URL must belong to ${base.origin}: ${url.toString()}`);
    }
    if (url.username || url.password || url.search || url.hash) {
      throw new Error(`IndexNow URL must be a clean canonical URL: ${url.toString()}`);
    }
    return url.toString();
  })));
}

export function buildIndexNowPayload({urls, key, keyLocation}) {
  const keyUrl = new URL(keyLocation);
  const canonicalOrigin = new URL(CANONICAL_BASE_URL).origin;

  if (keyUrl.origin !== canonicalOrigin || keyUrl.search || keyUrl.hash) {
    throw new Error(`INDEXNOW_KEY_LOCATION must use ${canonicalOrigin}.`);
  }

  if (urls.length === 0 || urls.length > 10_000) {
    throw new Error('IndexNow requires between 1 and 10,000 changed URLs per request.');
  }

  return {
    host: new URL(CANONICAL_BASE_URL).host,
    key,
    keyLocation: keyUrl.toString(),
    urlList: normalizeIndexNowUrls(urls),
  };
}
