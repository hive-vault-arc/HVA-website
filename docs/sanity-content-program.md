# Sanity + SEO/AEO/GEO operating program

This repository contains the public Next.js application at the root and the independently deployable Sanity Studio in `studio/`. The Studio history was imported intact into the company repository. Each application keeps its own lockfile.

## Ownership boundary

Only the company-controlled GitHub organization, Vercel project, Sanity project, Analytics property, Search Console property, and Clarity project may be used. Before any push or deployment, verify that the company remote is `https://github.com/hive-vault-arc/HVA-website.git` and that the active service account is company-controlled.

## Local commands

```text
npm run dev
npm run studio:dev
npm run studio:verify
npm run studio:build
```

The frontend and Studio install independently:

```text
npm ci
npm ci --prefix studio
```

## Content contracts

- Long-form documents use document-level localization for English, French, Spanish, and Arabic.
- Shared organization facts use field-level localization through `internationalizedArrayText`.
- `studio/content-route-contract.ts` is generated from the frontend route manifest with `npm run routes:generate`. CI regenerates it, rejects drift, and frontend tests compare every static and dynamic route.
- Unicode slugs accept letters and numbers separated by single hyphens. Existing Arabic URLs are preserved.
- Canonicals are generated from the route contract and `https://hivevaultarc.com`; editors cannot override them.
- `pageOptimization` supplies approved, route-bound metadata and answer fields while layouts and stable page copy remain in code.
- Public dynamic queries require approved translations and public visibility. Strategic families require four approved locales. Sitemap and alternate generation also exclude noindexed content.

## Evidence and company-fact safety

- `evidenceRecord` starts as `unverified` and `publiclyCitable: false`.
- Public queries only dereference evidence that is both `verified` and approved for public use.
- Numeric, external-research, and first-party-research answers require approved evidence.
- First-party research requires methodology and limitations.
- `organizationProfile` is a singleton. Public consumers only read it after `approvedForPublicUse`, reviewer, and review date are present.
- `/ai/company`, Organization JSON-LD, and the About page resolve company facts through the same approved-profile merge function. Until an approved singleton exists, current code facts remain unchanged.
- No migration may invent reviews, statistics, credentials, customer details, contact information, or evidence.

## Dry-run gates

Run these only while signed in with the company Sanity account:

```text
npm --prefix studio run localization:verify
npm --prefix studio run localization:plan
npm --prefix studio run content:readiness
npm --prefix studio run editorial:plan
```

The evidence plan is local-only and never connects to Sanity:

```text
npm --prefix studio run evidence:plan
```

It currently identifies 214 claim candidates and proposes only internal `unverified` records. It has no apply mode.

The former French-only one-off scripts remain in Git history for auditability, but they are no longer exposed as package commands. New localization work starts from the four-language, dry-run-only `localization:plan` report.

Before any approved migration:

1. Export the production dataset with the company account.
2. Run the localization and readiness audits.
3. Capture the dry-run output, including IDs and field-level proposals.
4. Test against a temporary company staging dataset when available.
5. Obtain native-language review for French, Spanish, and Arabic.
6. Obtain explicit company approval for organization facts, founders, contact details, client evidence, public claims, and legal text.
7. Apply one reviewed cohort at a time. No apply command is provided by this implementation for the new evidence or editorial backfills.

## Editorial workflow

Studio queues expose missing translations, in-review documents, approved drafts, missing metadata, missing evidence, stale reviews, and noindexed content. Presentation supports all routed document types and all four locales. Draft Mode uses the uncached Sanity API, stega encoding, and `VisualEditing`; production continues to use the existing webhook and cache-tag model.

Strategic types (`capability`, `caseStudy`, `employeeProfile`, `industry`, and `pageOptimization`) are not returned by public queries until their translation family has four approved documents. Their normal single-document Publish action is replaced by **Publish approved family**, which validates the four locales, native-language reviews, SEO metadata, public visibility, research disclosures, and public evidence before atomically publishing the family. Each successful release creates a read-only `strategicReleaseAudit` record with the publisher, timestamp, document IDs, affected routes, and validation results. Editorial types may publish one locale at a time, and alternates include only approved, indexable translations. Sanity Content Releases remain optional; the base workflow uses drafts, review status, the controlled family action, document history, and the readiness audits.

## Deployment and verification order

1. Run both CI jobs and save the results.
2. Deploy Studio through the company Sanity account.
3. Verify Presentation routes and click-to-edit in all four locales.
4. Deploy the frontend through the company Vercel project.
5. Publish only approved content cohorts.
6. Verify canonicals, Open Graph URLs, sitemap membership, alternate links, robots directives, visible answer parity, and JSON-LD.
7. Reject analytics consent and confirm neither GA4 nor Clarity loads. Accept cookies and confirm exactly one GA4 tag plus the approved Clarity integration.
8. Record dated baselines in Search Console, GA4 organic landing pages, Clarity, and multilingual answer observations.

Do not claim ranking, indexing, traffic, or citation gains until the 30-day observation period provides evidence.
