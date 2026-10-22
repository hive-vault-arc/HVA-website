import {JSDOM} from 'jsdom';

const PRODUCTION_ORIGIN = 'https://hivevaultarc.com';
const FORBIDDEN_HOSTS = [
  'hive-vault-arc-website.vercel.app',
  'hiva-nine.vercel.app',
];

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function normalizedUrl(value) {
  const url = new URL(value);
  url.hash = '';
  return url.toString();
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replaceAll('&amp;', '&').trim(),
  );
}

function jsonLdUrls(value, urls = []) {
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
    urls.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) jsonLdUrls(item, urls);
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) jsonLdUrls(item, urls);
  }
  return urls;
}

async function mapWithConcurrency(items, concurrency, task) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index], index);
    }
  }

  await Promise.all(
    Array.from({length: Math.min(concurrency, items.length)}, worker),
  );
  return results;
}

async function auditPage(url, requestUrl = url) {
  const failures = [];
  const response = await fetch(requestUrl, {
    redirect: 'manual',
    headers: {'user-agent': 'HiveVaultArc-SEO-Smoke-Test/1.0'},
  });

  if (response.status !== 200) {
    failures.push(`expected direct 200, received ${response.status}`);
    return {url, failures};
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    failures.push(`expected text/html, received ${contentType || 'none'}`);
    return {url, failures};
  }

  const html = await response.text();
  for (const host of FORBIDDEN_HOSTS) {
    if (html.includes(host)) failures.push(`contains forbidden host ${host}`);
  }

  const document = new JSDOM(html, {url: requestUrl}).window.document;
  const title = document.title.trim();
  const description = document.querySelector('meta[name="description"]')?.content?.trim() ?? '';
  if (!title) failures.push('missing page title');
  if (!description) failures.push('missing meta description');
  for (const property of ['og:title', 'og:description', 'og:image']) {
    if (!document.querySelector(`meta[property="${property}"]`)?.content?.trim()) {
      failures.push(`missing ${property}`);
    }
  }
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  if (!canonical) {
    failures.push('missing canonical');
  } else if (normalizedUrl(canonical) !== normalizedUrl(url)) {
    failures.push(`canonical mismatch: ${canonical}`);
  }

  const openGraphUrl = document.querySelector('meta[property="og:url"]')?.content;
  if (!openGraphUrl) {
    failures.push('missing og:url');
  } else if (normalizedUrl(openGraphUrl) !== normalizedUrl(url)) {
    failures.push(`og:url mismatch: ${openGraphUrl}`);
  }

  const headings = document.querySelectorAll('h1');
  if (headings.length !== 1) failures.push(`expected one H1, found ${headings.length}`);
  const mainLandmarks = document.querySelectorAll('main');
  if (mainLandmarks.length !== 1) failures.push(`expected one main landmark, found ${mainLandmarks.length}`);

  const robots = document.querySelector('meta[name="robots"]')?.content ?? '';
  if (/noindex/i.test(robots)) failures.push('sitemap URL is noindex');

  const alternates = [
    ...document.querySelectorAll('link[rel="alternate"][hreflang]'),
  ];
  for (const alternate of alternates) {
    const href = alternate.href;
    if (new URL(href).origin !== PRODUCTION_ORIGIN) {
      failures.push(`alternate is not on production origin: ${href}`);
    }
  }

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      for (const linkedUrl of jsonLdUrls(JSON.parse(script.textContent || 'null'))) {
        for (const host of FORBIDDEN_HOSTS) {
          if (linkedUrl.includes(host)) {
            failures.push(`JSON-LD contains forbidden host ${host}`);
          }
        }
      }
    } catch {
      failures.push('contains invalid JSON-LD');
    }
  }

  return {
    url,
    failures,
    title,
    description,
    language: document.documentElement.lang,
    alternates: alternates.map((alternate) => ({
      language: alternate.hreflang,
      url: normalizedUrl(alternate.href),
    })),
  };
}

async function main() {
  const requestedBase = argumentValue('--base') ?? process.env.SEO_AUDIT_BASE_URL;
  if (!requestedBase) {
    throw new Error('Provide --base <origin> or SEO_AUDIT_BASE_URL.');
  }

  const base = new URL(requestedBase);
  if (base.pathname !== '/' || base.search || base.hash) {
    throw new Error('The audit base must be an origin without a path, query, or fragment.');
  }
  const expectedOrigin = new URL(
    argumentValue('--expected-origin') ?? base.origin,
  ).origin;

  const sitemapUrl = new URL('/sitemap.xml', base).toString();
  const sitemapResponse = await fetch(sitemapUrl, {redirect: 'manual'});
  if (sitemapResponse.status !== 200) {
    throw new Error(`Sitemap returned ${sitemapResponse.status}: ${sitemapUrl}`);
  }

  const locations = sitemapLocations(await sitemapResponse.text());
  if (!locations.length) throw new Error('Sitemap contains no URL locations.');

  const duplicates = locations.filter(
    (location, index) => locations.indexOf(location) !== index,
  );
  if (duplicates.length) {
    throw new Error(`Sitemap contains duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);
  }

  const isProductionAudit = expectedOrigin === PRODUCTION_ORIGIN;
  if (
    isProductionAudit &&
    locations.some((location) => new URL(location).origin !== expectedOrigin)
  ) {
    throw new Error('Production sitemap contains a non-production origin.');
  }

  const limit = Number(argumentValue('--limit') ?? locations.length);
  const targets = locations.slice(0, Number.isFinite(limit) ? limit : locations.length);
  const results = await mapWithConcurrency(targets, 6, (target) => {
    const expectedUrl = new URL(target);
    const requestUrl = new URL(
      `${expectedUrl.pathname}${expectedUrl.search}`,
      base,
    ).toString();
    return auditPage(expectedUrl.toString(), requestUrl);
  });
  const failures = results.flatMap((result) =>
    result.failures.map((failure) => `${result.url} — ${failure}`),
  );
  const failedUrls = new Set(results.filter((result) => result.failures.length).map((result) => result.url));
  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const result of results) {
      const value = result[field];
      if (!value) continue;
      const previousUrl = seen.get(value);
      if (previousUrl) {
        failures.push(`${result.url} — duplicate ${field} with ${previousUrl}`);
        failedUrls.add(result.url);
      } else {
        seen.set(value, result.url);
      }
    }
  }

  const auditedByUrl = new Map(results.map((result) => [normalizedUrl(result.url), result]));
  const sitemapUrls = new Set(locations.map(normalizedUrl));
  const fullAudit = targets.length === locations.length;
  for (const result of results) {
    if (!result.alternates?.length) continue;
    const languages = new Set();
    for (const alternate of result.alternates) {
      if (languages.has(alternate.language)) {
        failures.push(`${result.url} — duplicate ${alternate.language} alternate`);
        failedUrls.add(result.url);
      }
      languages.add(alternate.language);
      if (alternate.language === 'x-default') continue;
      if (fullAudit && !sitemapUrls.has(alternate.url)) {
        failures.push(`${result.url} — alternate missing from sitemap: ${alternate.url}`);
        failedUrls.add(result.url);
        continue;
      }
      const target = auditedByUrl.get(alternate.url);
      if (!target) continue;
      const returnLink = target.alternates?.find((entry) => entry.language === result.language);
      if (returnLink?.url !== normalizedUrl(result.url)) {
        failures.push(`${result.url} — ${alternate.language} alternate has no ${result.language} return link`);
        failedUrls.add(result.url);
      }
    }
    if (result.language && !result.alternates.some(
      (alternate) => alternate.language === result.language && alternate.url === normalizedUrl(result.url),
    )) {
      failures.push(`${result.url} — missing ${result.language} self alternate`);
      failedUrls.add(result.url);
    }
  }

  console.log(
    JSON.stringify(
      {
        sitemap: sitemapUrl,
        expectedOrigin,
        audited: targets.length,
        passed: targets.length - failedUrls.size,
        failed: failedUrls.size,
        failures,
      },
      null,
      2,
    ),
  );

  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
