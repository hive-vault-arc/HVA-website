# September 2026 implementation baseline

Recorded: 2026-09-13

## Measurement boundary

This is an implementation baseline, not a visibility result. Current Search Console coverage, query, and generative-search values are unavailable because the company Google account does not yet own the domain property. GA4 production data begins only after the production measurement ID is present, the consented tag is deployed, and a visitor accepts cookies.

## Known pre-change production observations

- The live sitemap observed during planning contained 193 URLs: 48 English/root, 48 French, 48 Spanish, 48 Arabic, and `/ai/company`.
- Sitemap, canonical, Open Graph, and alternate URLs were emitted on `hive-vault-arc-website.vercel.app` because the production site-origin variable was incorrect.
- The current Vercel alias returned `200`, splitting authority instead of redirecting.
- A historical screenshot showed 71 indexed and 39 not indexed, but it is not a current or reconciled baseline and must not be used as the program denominator.

## Implemented measurement controls

- Production builds reject a non-canonical site origin.
- Static sitemap entries no longer receive a false current timestamp.
- Non-user utility endpoints are excluded from the sitemap.
- Dynamic documents marked `noindex` are excluded from the sitemap in every locale.
- Strict consent gates both GA4 and Clarity.
- `generate_lead`, `book_call_click`, and `case_study_open` use coarse parameters and require analytics consent.
- IndexNow accepts only explicit changed canonical URLs.
- `npm run audit:seo -- --base https://hivevaultarc.com` is the post-deployment URL-surface gate.

## Required post-deployment evidence

1. Export the final crawl JSON from the SEO smoke test.
2. Record PageSpeed/Lighthouse runs for every representative template in `performance-budgets.json`.
3. Confirm the consent matrix on all four locale roots and one client-side transition.
4. After company Search Console ownership exists, export 28-day, 90-day, and maximum available query/page data.
5. Update `search-acquisition-scorecard.csv` with reconciled denominators.

No citation, ranking, traffic, or conversion improvement is claimed by this baseline.

## Live pre-deployment check — 2026-09-13

- Apex homepage: direct `200`.
- `www.hivevaultarc.com`: one `308` to the apex homepage.
- `hiva-nine.vercel.app`: one `308` to the apex homepage.
- `hive-vault-arc-website.vercel.app`: direct `200`; the new application redirect is not deployed yet.
- Live sitemap: 193 locations, all on `https://hive-vault-arc-website.vercel.app`.
- Forbidden alias text in the live sitemap: 1,153 occurrences across locations and alternates.
- `npm run audit:seo -- --base https://hivevaultarc.com --limit 5`: correctly failed before crawling pages because the production sitemap contained a non-production origin.
- PageSpeed Insights API: baseline request returned quota-exhausted; no performance value was recorded as zero.

These observations are a failure baseline for the currently deployed version. They are not evidence that the local fixes have reached Production.

## Local release-candidate verification — 2026-09-13

- Production build completed and generated 108 static pages.
- The rebuilt sitemap contains 188 approved indexable URLs.
- The local production crawl passed 188 of 188 URLs with zero failures.
- The crawl checks direct `200`, HTML content type, self-canonical, matching `og:url`, one H1, absence of `noindex`, production-origin alternates, parseable JSON-LD, and absence of known Vercel aliases.
- The synthetic healthcare administrative-workflow demonstration remains `noindex` and is now correctly omitted from the four localized sitemap entries.
- The complete test suite passed: 40 files, 203 tests.
- ESLint, TypeScript, the WebP-only asset gate, and the normal SEO-artifact validator passed.
- The strict claim gate remains intentionally blocked until company reviewers resolve the 214 claim candidates.

This verifies the local release candidate only. Repeat the crawl against `https://hivevaultarc.com` after the company Vercel deployment.
