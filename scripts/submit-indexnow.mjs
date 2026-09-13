#!/usr/bin/env node

import {
  CANONICAL_BASE_URL,
  buildIndexNowPayload,
  normalizeIndexNowUrls,
  validateIndexNowKey,
} from './indexnow-core.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const explicitValues = args.filter((arg) => arg !== '--dry-run');
const environmentValues = (process.env.INDEXNOW_URLS ?? '')
  .split(/[\r\n,]+/)
  .map((value) => value.trim())
  .filter(Boolean);
const inputValues = explicitValues.length > 0 ? explicitValues : environmentValues;

if (inputValues.length === 0) {
  console.error(
    'Provide only the canonical URLs that changed, for example: npm run indexnow -- /updated-page',
  );
  process.exit(1);
}

const configuredBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || CANONICAL_BASE_URL;
if (new URL(configuredBaseUrl).origin !== CANONICAL_BASE_URL) {
  console.error(`IndexNow submissions must use ${CANONICAL_BASE_URL}.`);
  process.exit(1);
}

let urls;
try {
  urls = normalizeIndexNowUrls(inputValues, CANONICAL_BASE_URL);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const key = process.env.INDEXNOW_KEY?.trim();
const keyLocation =
  process.env.INDEXNOW_KEY_LOCATION?.trim() ||
  new URL('/indexnow-key.txt', CANONICAL_BASE_URL).toString();

if (!dryRun && !validateIndexNowKey(key)) {
  console.error('INDEXNOW_KEY must contain 8-128 ASCII letters, numbers, or hyphens.');
  process.exit(1);
}

let payload;
try {
  payload = buildIndexNowPayload({
    urls,
    key: key || 'INDEXNOW_KEY_NOT_SET',
    keyLocation,
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (dryRun) {
  console.log(JSON.stringify({
    host: payload.host,
    keyConfigured: Boolean(key),
    keyLocation: payload.keyLocation,
    urlList: payload.urlList,
  }, null, 2));
  process.exit(0);
}

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify(payload),
});

const responseMessages = {
  200: 'URLs accepted.',
  202: 'URLs received; key validation is pending.',
  400: 'Invalid request format.',
  403: 'The IndexNow key could not be verified.',
  422: 'The submitted URLs do not belong to the declared host or do not match the key.',
  429: 'Too many requests. Retry after the provider delay.',
};

console.log(`IndexNow status: ${response.status} ${response.statusText}`);
console.log(responseMessages[response.status] ?? 'Unexpected IndexNow response.');

if (![200, 202].includes(response.status)) process.exit(1);
