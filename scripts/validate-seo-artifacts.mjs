import {readFile} from 'node:fs/promises';

const REQUIRED_COLUMNS = {
  'docs/seo/intent-map.csv': [
    'cluster_id', 'locale', 'primary_page', 'gsc_baseline', 'owner', 'status',
  ],
  'docs/seo/answer-inventory.csv': [
    'answer_id', 'locale', 'question', 'primary_url', 'evidence_required',
    'subject_matter_owner', 'locale_reviewer', 'status',
  ],
  'docs/seo/answer-engine-panel.csv': [
    'prompt_id', 'locale', 'prompt_text', 'target_page', 'target_fact',
    'engine', 'account_state', 'search_or_browse_state', 'reviewer',
  ],
  'docs/seo/assistant-misstatements.csv': [
    'observed_date', 'engine', 'incorrect_or_stale_claim', 'correct_fact',
    'owner', 'status', 'retest_date',
  ],
  'docs/seo/authority-surfaces.csv': [
    'surface', 'profile_or_page_url', 'owner_account', 'company_controlled',
    'last_verified', 'action', 'status',
  ],
  'docs/research/claim-registry.csv': [
    'claim_id', 'exact_claim', 'claim_type', 'evidence_type', 'reviewer',
    'review_due', 'status', 'source_location',
  ],
  'docs/seo/tracking-plan.csv': [
    'event_name', 'trigger', 'parameters', 'consent_requirement',
    'GA4_key_event', 'owner', 'validation_method',
  ],
};

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (quoted) throw new Error('Unclosed quoted CSV field.');
  return rows.filter((item) => item.some((value) => value.length));
}

async function records(file) {
  const rows = parseCsv(await readFile(file, 'utf8'));
  const headers = rows.shift();
  if (!headers) throw new Error(`${file}: missing header`);
  for (const required of REQUIRED_COLUMNS[file]) {
    if (!headers.includes(required)) throw new Error(`${file}: missing ${required}`);
  }
  return rows.map((row, index) => {
    if (row.length !== headers.length) {
      throw new Error(`${file}:${index + 2}: expected ${headers.length} fields, found ${row.length}`);
    }
    return Object.fromEntries(headers.map((header, fieldIndex) => [header, row[fieldIndex]]));
  });
}

function expectLocaleCohorts(rows, idField, minimumFamilies) {
  const locales = ['en', 'fr', 'es', 'ar'];
  const families = new Map();
  for (const row of rows) {
    const values = families.get(row[idField]) ?? new Set();
    values.add(row.locale);
    families.set(row[idField], values);
  }
  if (families.size < minimumFamilies) {
    throw new Error(`${idField}: expected at least ${minimumFamilies} families, found ${families.size}`);
  }
  for (const [id, values] of families) {
    const missing = locales.filter((locale) => !values.has(locale));
    if (missing.length) throw new Error(`${id}: missing locales ${missing.join(', ')}`);
  }
}

async function main() {
  const strict = process.argv.includes('--strict');
  const data = Object.fromEntries(
    await Promise.all(
      Object.keys(REQUIRED_COLUMNS).map(async (file) => [file, await records(file)]),
    ),
  );

  expectLocaleCohorts(data['docs/seo/intent-map.csv'], 'cluster_id', 10);
  expectLocaleCohorts(data['docs/seo/answer-inventory.csv'], 'answer_id', 10);

  const promptRows = data['docs/seo/answer-engine-panel.csv'];
  for (const locale of ['en', 'fr', 'es', 'ar']) {
    const count = promptRows.filter((row) => row.locale === locale).length;
    if (count < 10) throw new Error(`answer panel: ${locale} has only ${count} prompts`);
  }

  for (const file of [
    'docs/seo/intent-map.csv',
    'docs/seo/answer-inventory.csv',
    'docs/seo/answer-engine-panel.csv',
  ]) {
    for (const row of data[file]) {
      for (const [key, value] of Object.entries(row)) {
        if ((key.includes('url') || key.includes('page')) && /^https?:\/\//.test(value)) {
          if (new URL(value).origin !== 'https://hivevaultarc.com') {
            throw new Error(`${file}: non-canonical URL ${value}`);
          }
        }
      }
    }
  }

  const eventRows = data['docs/seo/tracking-plan.csv'];
  const eventNames = eventRows.map((row) => row.event_name).sort();
  const expectedEvents = ['book_call_click', 'case_study_open', 'generate_lead'];
  if (JSON.stringify(eventNames) !== JSON.stringify(expectedEvents)) {
    throw new Error(`tracking plan events mismatch: ${eventNames.join(', ')}`);
  }
  if (eventRows.some((row) => /name|email|phone|message|crm|client_id/i.test(row.parameters))) {
    throw new Error('Tracking plan contains a prohibited personal parameter.');
  }

  const claims = data['docs/research/claim-registry.csv'];
  if (claims.length < 20) throw new Error('Claim registry is unexpectedly small.');
  if (claims.some((row) => !row.status || !row.source_location)) {
    throw new Error('Claim registry contains unowned or untraceable candidates.');
  }
  const expiredClaims = claims.filter(
    (row) =>
      row.review_due &&
      Date.parse(`${row.review_due}T23:59:59Z`) < Date.now() &&
      !['removed', 'approved', 'qualified'].includes(row.status),
  );
  if (expiredClaims.length) {
    throw new Error(`${expiredClaims.length} unresolved claim reviews are overdue.`);
  }
  if (
    strict &&
    claims.some((row) => !['removed', 'approved', 'qualified'].includes(row.status))
  ) {
    throw new Error('Strict publishing gate: unresolved public claim candidates remain.');
  }
  if (
    claims.some(
      (row) =>
        ['approved', 'qualified'].includes(row.status) &&
        (!row.source_url || !row.reviewer || !row.accessed_date),
    )
  ) {
    throw new Error('Approved or qualified claims require a source, reviewer, and access date.');
  }

  const performance = JSON.parse(
    await readFile('docs/seo/performance-budgets.json', 'utf8'),
  );
  if (
    performance.fieldThresholdsP75?.lcpMillisecondsMax !== 2500 ||
    performance.fieldThresholdsP75?.inpMillisecondsMaxExclusive !== 200 ||
    performance.fieldThresholdsP75?.clsMaxExclusive !== 0.1
  ) {
    throw new Error('Core Web Vitals thresholds do not match the approved budget.');
  }

  console.log(JSON.stringify({
    intentClusters: new Set(data['docs/seo/intent-map.csv'].map((row) => row.cluster_id)).size,
    answerFamilies: new Set(data['docs/seo/answer-inventory.csv'].map((row) => row.answer_id)).size,
    answerPrompts: promptRows.length,
    claimCandidates: claims.length,
    analyticsEvents: eventNames,
    strict,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
