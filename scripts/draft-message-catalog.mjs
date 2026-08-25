import {readFile, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const locale = process.argv[2];
const validLocales = new Set(['es', 'ar']);
const messagesDirectory = resolve(process.cwd(), 'messages');
const outputPath = resolve(messagesDirectory, `${locale}.json`);
const cachePath = resolve(messagesDirectory, `.${locale}-draft-cache.json`);
const sourcePath = resolve(messagesDirectory, 'en.json');
const maxBatchCharacters = 1_500;
// Deliberately plain ASCII: translation providers preserve it more reliably
// than punctuation-heavy delimiters or HTML-like markers.
const batchSeparator = (index) => `ZZZHVASPLIT${index}ZZZ`;

if (!validLocales.has(locale)) {
  console.error('Usage: node scripts/draft-message-catalog.mjs <es|ar>');
  process.exit(1);
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function collectStringPaths(value, path = [], entries = []) {
  if (typeof value === 'string') {
    // Message arrays use ids as stable lookup keys in React views. They are
    // implementation contracts, not reader-facing copy, so translating them
    // would disconnect localized labels from their configured media and links.
    if (path.at(-1) !== 'id') entries.push({path, value});
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => collectStringPaths(item, [...path, index], entries));
  } else if (isObject(value)) {
    Object.entries(value).forEach(([key, child]) => collectStringPaths(child, [...path, key], entries));
  }

  return entries;
}

function setPath(target, path, value) {
  let cursor = target;
  for (let index = 0; index < path.length - 1; index += 1) {
    cursor = cursor[path[index]];
  }
  cursor[path.at(-1)] = value;
}

function protectTokens(value) {
  const tokens = [];
  const protectedValue = value.replace(
    /(Hive Vault Arc|ARC Framework|WhatsApp|Google Cloud|DigitalOcean|Salesforce|HubSpot|DocuSign|Kubernetes|Docker|Azure|AWS|\{[A-Za-z][A-Za-z0-9_]*\}|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g,
    (match) => {
      const token = `HVA_TOKEN_${tokens.length}_X`;
      tokens.push({token, value: match});
      return token;
    },
  );

  return {protectedValue, tokens};
}

function restoreTokens(value, tokens) {
  return tokens.reduce(
    (result, token) => result.replaceAll(token.token, token.value),
    value,
  );
}

function decodeEntities(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function batches(entries) {
  const grouped = [];
  let current = [];
  let currentLength = 0;

  for (const entry of entries) {
    const prepared = protectTokens(entry.value);
    const addition = prepared.protectedValue.length + (current.length ? 28 : 0);
    if (current.length && currentLength + addition > maxBatchCharacters) {
      grouped.push(current);
      current = [];
      currentLength = 0;
    }
    current.push({...entry, ...prepared});
    currentLength += addition;
  }

  if (current.length) grouped.push(current);
  return grouped;
}

async function translateBatch(entries, batchIndex) {
  const query = entries
    .map((entry, index) =>
      index === 0 ? entry.protectedValue : `${batchSeparator(index)}\n${entry.protectedValue}`,
    )
    .join('\n');
  const url = new URL('https://clients5.google.com/translate_a/t');
  url.searchParams.set('client', 'dict-chrome-ex');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', locale);
  url.searchParams.set('q', query);

  let response;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (response.ok) break;
    if (response.status !== 429 || attempt === 5) {
      throw new Error(`translation request ${batchIndex + 1} failed with ${response.status}`);
    }
    const retryDelay = Math.min(60_000, 2_000 * 2 ** attempt);
    console.log(`Rate limited at batch ${batchIndex + 1}; retrying in ${Math.round(retryDelay / 1000)}s.`);
    await new Promise((resolveDelay) => setTimeout(resolveDelay, retryDelay));
  }
  const payload = await response.json();
  const translatedText = Array.isArray(payload)
    ? payload
        .map((segment) => (typeof segment === 'string' ? segment : segment?.[0]))
        .join('')
    : '';
  if (!translatedText) {
    throw new Error(`translation request ${batchIndex + 1} returned no usable translation`);
  }

  const translated = decodeEntities(translatedText);
  const sections = translated.split(/ZZZHVASPLIT\d+ZZZ\s*/);
  if (sections.length !== entries.length) {
    throw new Error(
      `translation request ${batchIndex + 1} changed the batch separators (${sections.length}/${entries.length})`,
    );
  }

  return entries.map((entry, index) => ({
    ...entry,
    translated: restoreTokens(sections[index].trim(), entry.tokens),
  }));
}

const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const draft = structuredClone(source);
const entries = collectStringPaths(source);
const grouped = batches(entries);
let completed = {};

try {
  completed = JSON.parse(await readFile(cachePath, 'utf8'));
  console.log(`Resuming ${locale} draft from ${Object.keys(completed).length} translated entries.`);
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

for (const entry of entries) {
  const cachedTranslation = completed[entry.path.join('.')];
  if (cachedTranslation) setPath(draft, entry.path, cachedTranslation);
}

console.log(`Drafting ${entries.length} ${locale} message entries in ${grouped.length} batches.`);

for (const [batchIndex, batch] of grouped.entries()) {
  const pending = batch.filter((entry) => !completed[entry.path.join('.')]);
  if (!pending.length) continue;
  const translations = await translateBatch(pending, batchIndex);
  for (const translation of translations) {
    setPath(draft, translation.path, translation.translated);
    completed[translation.path.join('.')] = translation.translated;
  }
  await writeFile(cachePath, `${JSON.stringify(completed)}\n`, 'utf8');
  if ((batchIndex + 1) % 20 === 0 || batchIndex + 1 === grouped.length) {
    console.log(`Completed ${batchIndex + 1}/${grouped.length} batches.`);
  }
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 400));
}

await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
await rm(cachePath, {force: true});
console.log(`Wrote ${outputPath}`);
