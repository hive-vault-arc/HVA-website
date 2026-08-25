import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const locale = process.argv[2];
const supportedLocales = new Set(['es', 'ar']);
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '0zprc9fo';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-07-01';
const types = [
  'capability',
  'industry',
  'employeeProfile',
  'caseStudy',
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
];
const protectedTerms = [
  'Hive Vault Arc',
  'ARC Framework',
  'WhatsApp',
  'Google Cloud',
  'DigitalOcean',
  'Salesforce',
  'HubSpot',
  'DocuSign',
  'Kubernetes',
  'Docker',
  'Azure',
  'AWS',
];
const reservedKeys = new Set([
  '_id', '_type', '_key', '_ref', '_weak', '_rev', '_createdAt', '_updatedAt',
  'language', 'translationStatus', 'url', 'href', 'email', 'phone', 'asset',
]);
const sourceLanguageKeys = new Set(['quote', 'quotation', 'testimonial', 'signedQuotation']);

if (!supportedLocales.has(locale)) {
  console.error('Usage: node scripts/localize-sanity-content.mjs <es|ar>');
  process.exit(1);
}

function loadToken() {
  if (process.env.SANITY_API_WRITE_TOKEN) return process.env.SANITY_API_WRITE_TOKEN;
  return readFile(resolve(process.cwd(), '.env.local'), 'utf8').then((source) => {
    const entry = source.split(/\r?\n/).find((line) => line.startsWith('SANITY_API_WRITE_TOKEN='));
    if (!entry) throw new Error('SANITY_API_WRITE_TOKEN is required in .env.local');
    return entry.slice('SANITY_API_WRITE_TOKEN='.length).trim();
  });
}

const apiUrl = (path) => `https://${projectId}.api.sanity.io/v${apiVersion}/data/${path}/${dataset}`;

function cleanDocument(document) {
  const clone = structuredClone(document);
  delete clone._rev;
  delete clone._createdAt;
  delete clone._updatedAt;
  return clone;
}

function translationId(sourceId) {
  return `i18n-${locale}-${sourceId}`.replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 120);
}

function isProtectedValue(key, value) {
  return (
    reservedKeys.has(key) ||
    sourceLanguageKeys.has(key) ||
    /^(https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})$/.test(value) ||
    /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(value)
  );
}

function protectTokens(value) {
  const tokens = [];
  const pattern = new RegExp(
    `(${protectedTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|https?:\\/\\/[^\\s]+|[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,})`,
    'g',
  );
  return {
    value: value.replace(pattern, (match) => {
      const token = `HVAPROTECTED${tokens.length}TOKEN`;
      tokens.push([token, match]);
      return token;
    }),
    tokens,
  };
}

function restoreTokens(value, tokens) {
  return tokens.reduce((result, [token, original]) => result.replaceAll(token, original), value);
}

function collectStrings(value, path = [], entries = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, [...path, index], entries));
    return entries;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => collectStrings(item, [...path, key], entries));
    return entries;
  }
  const key = String(path.at(-1) ?? '');
  if (typeof value === 'string' && !isProtectedValue(key, value)) {
    entries.push({path, value, ...protectTokens(value)});
  }
  return entries;
}

function setAtPath(target, path, value) {
  let cursor = target;
  for (let index = 0; index < path.length - 1; index += 1) cursor = cursor[path[index]];
  cursor[path.at(-1)] = value;
}

function batches(entries) {
  const output = [];
  let current = [];
  let length = 0;
  for (const entry of entries) {
    const addition = entry.value.length + (current.length ? 32 : 0);
    if (current.length && length + addition > 1500) {
      output.push(current);
      current = [];
      length = 0;
    }
    current.push(entry);
    length += addition;
  }
  if (current.length) output.push(current);
  return output;
}

async function translateBatch(entries, token) {
  const source = entries
    .map((entry, index) => (index ? `HVASPLIT${index}END\n${entry.value}` : entry.value))
    .join('\n');
  const url = new URL('https://clients5.google.com/translate_a/t');
  url.searchParams.set('client', 'dict-chrome-ex');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', locale);
  url.searchParams.set('q', source);

  let response;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    response = await fetch(url, {headers: {Accept: 'application/json', 'User-Agent': 'Mozilla/5.0'}});
    if (response.ok) break;
    if (response.status !== 429 || attempt === 5) throw new Error(`Translation request failed: ${response.status}`);
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 2_000 * 2 ** attempt));
  }
  const payload = await response.json();
  const translated = Array.isArray(payload)
    ? payload.map((part) => (typeof part === 'string' ? part : part?.[0])).join('')
    : '';
  const parts = translated.split(/HVASPLIT\d+END\s*/);
  if (parts.length !== entries.length) throw new Error('Translation provider changed batch delimiters');
  return entries.map((entry, index) => restoreTokens(parts[index].trim(), entry.tokens));
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 96);
}

function remapReferences(value, idMap) {
  if (Array.isArray(value)) return value.map((item) => remapReferences(item, idMap));
  if (!value || typeof value !== 'object') return value;
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    output[key] = key === '_ref' && typeof item === 'string' && idMap.has(item)
      ? idMap.get(item)
      : remapReferences(item, idMap);
  }
  return output;
}

async function sanityQuery(query, params, token) {
  const response = await fetch(apiUrl('query'), {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({query, params}),
  });
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status}`);
  return (await response.json()).result;
}

async function sanityMutate(mutations, token) {
  const response = await fetch(`${apiUrl('mutate')}?returnIds=true&visibility=sync`, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({mutations}),
  });
  if (!response.ok) throw new Error(`Sanity mutation failed: ${response.status} ${await response.text()}`);
  return response.json();
}

const token = await loadToken();
const cacheDirectory = resolve(process.cwd(), 'node_modules', '.cache');
const cachePath = resolve(cacheDirectory, `hva-sanity-${locale}-translations.json`);
await mkdir(cacheDirectory, {recursive: true});

const [sources, metadata] = await Promise.all([
  sanityQuery('*[_type in $types && language == "en" && translationStatus == "approved"]', {types}, token),
  sanityQuery('*[_type == "translation.metadata"]{_id, schemaTypes, translations}', {}, token),
]);

const sourceMetadata = new Map();
for (const group of metadata) {
  for (const translation of group.translations ?? []) {
    if (translation.language === 'en' && translation.value?._ref) sourceMetadata.set(translation.value._ref, group);
  }
}

const existingTargetIds = new Set();
for (const group of sourceMetadata.values()) {
  for (const translation of group.translations ?? []) {
    if (translation.language === locale && translation.value?._ref) existingTargetIds.add(translation.value._ref);
  }
}

const documents = sources
  .filter((source) => !existingTargetIds.has(translationId(source._id)))
  .map((source) => {
    const clone = cleanDocument(source);
    clone._id = translationId(source._id);
    clone.language = locale;
    clone.translationStatus = 'approved';
    return {source, clone};
  });

let cached = {};
try { cached = JSON.parse(await readFile(cachePath, 'utf8')); } catch (error) { if (error?.code !== 'ENOENT') throw error; }

const stringEntries = documents.flatMap(({clone}) => collectStrings(clone).map((entry) => ({...entry, document: clone})));
const pending = stringEntries.filter((entry) => !cached[`${entry.document._id}:${entry.path.join('.')}`]);
console.log(`Preparing ${documents.length} ${locale} documents and translating ${pending.length} fields.`);

for (const [index, group] of batches(pending).entries()) {
  const translations = await translateBatch(group, token);
  group.forEach((entry, translationIndex) => {
    const value = translations[translationIndex];
    setAtPath(entry.document, entry.path, value);
    cached[`${entry.document._id}:${entry.path.join('.')}`] = value;
  });
  await writeFile(cachePath, JSON.stringify(cached), 'utf8');
  if ((index + 1) % 20 === 0) console.log(`Translated ${index + 1}/${batches(pending).length} batches.`);
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 400));
}

for (const {clone} of documents) {
  if (clone.slug?.current) clone.slug.current = slugify(clone.slug.current) || clone.slug.current;
}

const idMap = new Map(sources.map((source) => [source._id, translationId(source._id)]));
const translatedDocuments = documents.map(({clone}) => remapReferences(clone, idMap));

for (const chunk of Array.from({length: Math.ceil(translatedDocuments.length / 20)}, (_, index) => translatedDocuments.slice(index * 20, index * 20 + 20))) {
  if (chunk.length) await sanityMutate(chunk.map((document) => ({createOrReplace: document})), token);
}

const metadataMutations = [];
for (const source of sources) {
  const group = sourceMetadata.get(source._id);
  const targetRef = translationId(source._id);
  if (group?.translations?.some((translation) => translation.language === locale)) continue;
  const entry = {
    _key: crypto.randomUUID().replaceAll('-', '').slice(0, 12),
    _type: 'internationalizedArrayReferenceValue',
    language: locale,
    value: {_type: 'reference', _ref: targetRef},
  };
  if (group) {
    metadataMutations.push({patch: {id: group._id, setIfMissing: {translations: []}, insert: {after: 'translations[-1]', items: [entry]}}});
  } else {
    metadataMutations.push({create: {
      _id: `i18n-meta-${source._id}`.replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 120),
      _type: 'translation.metadata',
      schemaTypes: [source._type],
      translations: [
        {_key: crypto.randomUUID().replaceAll('-', '').slice(0, 12), _type: 'internationalizedArrayReferenceValue', language: 'en', value: {_type: 'reference', _ref: source._id}},
        entry,
      ],
    }});
  }
}

for (const chunk of Array.from({length: Math.ceil(metadataMutations.length / 20)}, (_, index) => metadataMutations.slice(index * 20, index * 20 + 20))) {
  if (chunk.length) await sanityMutate(chunk, token);
}

await rm(cachePath, {force: true});
console.log(`Published ${documents.length} ${locale} documents and updated ${metadataMutations.length} translation groups.`);
