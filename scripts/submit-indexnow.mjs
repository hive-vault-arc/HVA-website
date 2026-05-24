#!/usr/bin/env node

const DEFAULT_BASE_URL = 'https://hivevaultarc.com';
const DEFAULT_PATHS = [
  '/',
  '/arc',
  '/capabilities',
  '/capabilities/in-detail',
  '/capabilities/solution-programs',
  '/industries',
  '/products-systems',
  '/whoweare/abouthva',
  '/contact',
  '/ai-agents-tangier',
  '/ai-agents-morocco',
  '/it-consulting-tangier',
  '/custom-software-morocco',
  '/digital-services-tangier',
  '/services-digitaux-tanger',
  '/case-studies',
  '/blog',
  '/llms.txt',
  '/llms-full.txt',
  '/ai/company',
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const explicitUrls = args.filter((arg) => arg !== '--dry-run');
const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE_URL);
const host = baseUrl.host;
const key = process.env.INDEXNOW_KEY?.trim();
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || new URL('/indexnow-key.txt', baseUrl).toString();

const toAbsoluteUrl = (value) => {
  const url = new URL(value, baseUrl);
  if (url.host !== host) {
    throw new Error(`IndexNow URL must belong to ${host}: ${url.toString()}`);
  }
  url.hash = '';
  return url.toString();
};

const urls = Array.from(
  new Set((explicitUrls.length > 0 ? explicitUrls : DEFAULT_PATHS).map((path) => toAbsoluteUrl(path)))
);

const payload = {
  host,
  key: key || 'INDEXNOW_KEY_NOT_SET',
  keyLocation,
  urlList: urls,
};

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

if (!key || !/^[A-Za-z0-9_-]{8,128}$/.test(key)) {
  console.error('INDEXNOW_KEY must be set to 8-128 letters, numbers, underscores, or hyphens.');
  console.error('Example: $env:INDEXNOW_KEY="your-key"; npm run indexnow -- --dry-run');
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
});

const body = await response.text();

console.log(`IndexNow status: ${response.status} ${response.statusText}`);
if (body) {
  console.log(body);
}

if (![200, 202].includes(response.status)) {
  process.exit(1);
}
