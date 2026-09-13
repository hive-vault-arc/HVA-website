import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const OUTPUT = 'docs/research/claim-registry.csv';
const SOURCE_FILES = [
  'src/app/ai/company/route.ts',
  'src/lib/blog.ts',
  'src/lib/capabilities.ts',
  'src/lib/insights.ts',
  'src/lib/perspectives.ts',
  'src/lib/positioning.ts',
  'src/lib/product-systems.ts',
  'src/lib/proof.ts',
  'messages/en.json',
  'messages/fr.json',
  'messages/es.json',
  'messages/ar.json',
];

const CLAIM_PATTERN =
  /(?:\b\d+(?:[.,]\d+)?\s?(?:%|x|×|million|billion|thousand|hours?|days?|weeks?|months?|years?|minutes?|seconds?|conversations?|users?|companies?|jobs?|agents?|projects?)\b|[$€£]\s?\d|\b(?:first|only|best|leading|guarantee(?:d)?|compliant|compliance|secure|safest|fastest|higher|lower|increase|decrease|reduce[ds]?|improve[ds]?|more than|less than|up to|at least|within)\b)/i;

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function normalizedClaim(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function claimType(value) {
  if (/[$€£]|\d+(?:[.,]\d+)?\s?(?:%|x|×|million|billion|hours?|days?|weeks?|months?|years?|minutes?|seconds?)/i.test(value)) {
    return 'numerical or quantified';
  }
  if (/compliant|compliance|secure|privacy|guarantee/i.test(value)) {
    return 'security privacy or compliance';
  }
  if (/first|only|best|leading|safest|fastest|higher|lower/i.test(value)) {
    return 'comparative or superlative';
  }
  return 'material factual claim';
}

function localeFor(file) {
  const match = file.match(/^messages\/(en|fr|es|ar)\.json$/);
  return match?.[1] ?? 'en';
}

function pageFor(file, slug) {
  if (!slug) return 'route_mapping_required';
  if (file.endsWith('/blog.ts')) return `https://hivevaultarc.com/blog/${slug}`;
  if (file.endsWith('/perspectives.ts')) return `https://hivevaultarc.com/insights/perspectives/${slug}`;
  if (file.endsWith('/proof.ts')) return `https://hivevaultarc.com/case-studies/${slug}`;
  if (file.endsWith('/capabilities.ts')) return `https://hivevaultarc.com/capabilities/${slug}`;
  return `slug:${slug}`;
}

function nearestSlug(node) {
  let current = node.parent;
  while (current) {
    if (ts.isObjectLiteralExpression(current)) {
      const property = current.properties.find(
        (item) =>
          ts.isPropertyAssignment(item) &&
          ((ts.isIdentifier(item.name) && item.name.text === 'slug') ||
            (ts.isStringLiteral(item.name) && item.name.text === 'slug')),
      );
      if (
        property &&
        ts.isPropertyAssignment(property) &&
        (ts.isStringLiteral(property.initializer) ||
          ts.isNoSubstitutionTemplateLiteral(property.initializer))
      ) {
        return property.initializer.text;
      }
    }
    current = current.parent;
  }
  return undefined;
}

function idFor(file, line, claim) {
  const hash = createHash('sha256')
    .update(`${file}:${line}:${claim}`)
    .digest('hex')
    .slice(0, 10);
  return `claim-${hash}`;
}

async function collectTypeScriptClaims(file) {
  const sourceText = await readFile(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const claims = [];

  function visit(node) {
    if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      node.text.length >= 20 &&
      CLAIM_PATTERN.test(node.text)
    ) {
      const claim = normalizedClaim(node.text);
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      claims.push({file, line, claim, slug: nearestSlug(node)});
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return claims;
}

async function collectJsonClaims(file) {
  const sourceText = await readFile(file, 'utf8');
  const data = JSON.parse(sourceText);
  const claims = [];
  let searchFrom = 0;

  function visit(value) {
    if (typeof value === 'string') {
      if (value.length >= 20 && CLAIM_PATTERN.test(value)) {
        const encoded = JSON.stringify(value);
        const index = sourceText.indexOf(encoded, searchFrom);
        if (index >= 0) searchFrom = index + encoded.length;
        const line = sourceText.slice(0, Math.max(index, 0)).split(/\r?\n/).length;
        claims.push({file, line, claim: normalizedClaim(value)});
      }
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (value && typeof value === 'object') {
      for (const item of Object.values(value)) visit(item);
    }
  }

  visit(data);
  return claims;
}

async function main() {
  const groups = await Promise.all(
    SOURCE_FILES.map((file) =>
      file.endsWith('.json')
        ? collectJsonClaims(file)
        : collectTypeScriptClaims(file),
    ),
  );
  const claims = groups.flat().sort((a, b) =>
    a.file.localeCompare(b.file) || a.line - b.line,
  );
  const header = [
    'claim_id',
    'exact_claim',
    'page_url',
    'locale',
    'claim_type',
    'evidence_type',
    'source_url',
    'source_title',
    'publisher_or_owner',
    'published_date',
    'accessed_date',
    'method_or_sample',
    'geographic_scope',
    'limitations',
    'reuse_permission',
    'reviewer',
    'review_due',
    'status',
    'source_location',
  ];
  const rows = claims.map(({file, line, claim, slug}) => [
    idFor(file, line, claim),
    claim,
    pageFor(file, slug),
    localeFor(file),
    claimType(claim),
    'unsupported — remove or rewrite unless exact evidence is approved',
    '',
    '',
    '',
    '',
    '2026-09-13',
    '',
    '',
    'Automated candidate; wording population geography date and source support require human verification.',
    'unknown',
    'Editorial and subject-matter reviewer',
    '2026-09-20',
    'pending_exact_source_review',
    `${file}:${line}`,
  ]);

  await mkdir(path.dirname(OUTPUT), {recursive: true});
  await writeFile(
    OUTPUT,
    [header, ...rows].map((row) => row.map(csv).join(',')).join('\n') + '\n',
    'utf8',
  );
  console.log(`Wrote ${rows.length} claim candidates to ${OUTPUT}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
