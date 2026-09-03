import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parse as parseIcuMessage} from '@formatjs/icu-messageformat-parser';

const projectRoot = process.cwd();
const messagesDirectory = resolve(projectRoot, 'messages');
const locale = process.argv[2];
const sourceLocale = 'en';

const PROTECTED_TERMS = [
  'Hive Vault Arc',
  'Microsoft Clarity',
  'ARC Framework',
  'API',
  'APIs',
  'WhatsApp',
  'Azure',
  'AWS',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'DigitalOcean',
  'Salesforce',
  'HubSpot',
  'DocuSign',
  'Meta',
];

function fail(message) {
  console.error(`\nMessage catalog validation failed: ${message}`);
  process.exitCode = 1;
}

function leafEntries(value, path = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leafEntries(item, `${path}[${index}]`));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      leafEntries(child, path ? `${path}.${key}` : key),
    );
  }

  return [[path, value]];
}

function placeholders(value) {
  if (typeof value !== 'string') return [];

  return [...value.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)]
    .map((match) => match[1])
    .sort();
}

function stripProtectedTerms(value) {
  return PROTECTED_TERMS.reduce(
    (result, protectedTerm) => result.replaceAll(protectedTerm, ''),
    value,
  );
}

function isSourceLanguageValue(value) {
  return /^(https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})$/.test(value.trim());
}

async function readCatalog(catalogLocale) {
  const source = await readFile(resolve(messagesDirectory, `${catalogLocale}.json`), 'utf8');
  return JSON.parse(source);
}

if (!locale || !/^(fr|es|ar)$/.test(locale)) {
  console.error('Usage: node scripts/validate-message-catalogs.mjs <fr|es|ar>');
  process.exit(1);
}

const [sourceCatalog, targetCatalog] = await Promise.all([
  readCatalog(sourceLocale),
  readCatalog(locale),
]);

const source = new Map(leafEntries(sourceCatalog));
const target = new Map(leafEntries(targetCatalog));

for (const [path, sourceValue] of source) {
  if (!target.has(path)) {
    fail(`missing key \"${path}\" in ${locale}.json`);
    continue;
  }

  const targetValue = target.get(path);
  if (typeof targetValue !== typeof sourceValue) {
    fail(`type mismatch at \"${path}\" (expected ${typeof sourceValue}, received ${typeof targetValue})`);
    continue;
  }

  if (typeof targetValue === 'string') {
    if (!targetValue.trim()) {
      fail(`empty value at \"${path}\"`);
    }

    try {
      parseIcuMessage(targetValue);
    } catch (error) {
      fail(`invalid ICU message at \"${path}\": ${error.message}`);
    }

    const sourceVariables = placeholders(sourceValue);
    const targetVariables = placeholders(targetValue);
    if (JSON.stringify(sourceVariables) !== JSON.stringify(targetVariables)) {
      fail(`ICU placeholder mismatch at \"${path}\"`);
    }

    if (
      locale !== 'fr' &&
      !path.endsWith('.id') &&
      sourceValue.length > 14 &&
      !isSourceLanguageValue(sourceValue)
    ) {
      const sourceWithoutProtectedTerms = stripProtectedTerms(sourceValue).trim();
      const targetWithoutProtectedTerms = stripProtectedTerms(targetValue).trim();
      if (sourceWithoutProtectedTerms && sourceWithoutProtectedTerms === targetWithoutProtectedTerms) {
        fail(`untranslated English copy at \"${path}\"`);
      }
    }
  }
}

for (const path of target.keys()) {
  if (!source.has(path)) {
    fail(`unexpected key \"${path}\" in ${locale}.json`);
  }
}

if (!process.exitCode) {
  console.log(`Message catalog ${locale}.json matches the ${sourceLocale}.json contract.`);
}
