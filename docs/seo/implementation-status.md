# Nine-sprint implementation status

Updated: 2026-09-13

Status meanings: `implemented` means code or repository artifact is complete locally; `in review` requires company, subject-matter, legal, or native-language approval; `blocked external` requires a company-controlled external account or post-deployment data.

| Sprint | Implemented locally | Remaining gate | Status |
|---|---|---|---|
| SEO-01 Canonical and index recovery | Production-origin build guard; alias redirects; truthful sitemap dates; every `noindex` dynamic document excluded from the sitemap; non-indexable machine endpoint excluded; route inventory; sitemap/robots/redirect tests; production smoke-test command | Company Vercel variable and deployment; company Search Console DNS ownership; sitemap resubmission and current coverage export | blocked external |
| SEO-02 Intent and multilingual architecture | 40-row intent map; overlap decisions; ten priority briefs; French fallback-detail defect removed; incomplete translations omitted from dynamic alternates; locale audit | Native review, GSC baselines, approved public copy, contextual-link changes, and CMS translation inventory | in review |
| SEO-03 Performance and measurement | Performance budgets; baseline matrix without invented values; strict GA4/Clarity consent tests; three consent-aware events; IndexNow canonical changed-URL workflow; scorecard; SEO smoke test | Production Lighthouse/field data, production consent matrix, GA4 activation, Search Console link | blocked external |
| AEO-01 Question and answer inventory | Ten stable question families in four locales (40 records) with primary URLs, evidence needs, owners, reviewers, actions, and status | Sales/delivery approval, native review, and first-party/GSC question evidence | in review |
| AEO-02 Answer-first pages and schema | Editorial answer contract extended with question, evidence, related-question, and review fields; existing server-rendered direct answers retained; production schema IDs centralized and tested | Evidence approval, native copy review, and any visible answer-section refinement | in review |
| AEO-03 Answer testing and measurement | Controlled 40-prompt multilingual panel; misstatement register; reproducible conditions; measurement separation in sprint/runbook | Three-date baseline runs per priority prompt and GA4/GSC cohort data | blocked external |
| GEO-01 Entity truth and crawler governance | Code and YAML fact registries; `/ai/company` v2; canonical and fact-parity tests; retrieval/training crawler separation; default training denial | Company fact verification, leadership crawler-policy approval, production log review, external-profile reconciliation | in review |
| GEO-02 Original evidence and citation assets | Automated high-recall claim registry with 214 source-traceable candidates; publishing gate; three complete evidence data plans | Explicit permission to qualify/remove unsupported claims; approved data, reviewers, privacy/legal checks; at least one real HTML asset | in review |
| GEO-03 Earned authority and observability | Authority-surface inventory; relationship candidate register; observation log; correction workflow and company-only account policy | Company ownership checks, relationship approval, asset publication, outreach, and ongoing mention/referral observations | blocked external |

## Verification completed locally

- Canonical, entity, sitemap, crawler, redirects, localization, privacy, analytics-event, content-resilience, and editorial projection tests.
- TypeScript type check.
- IndexNow dry run with no secret output.
- Claim and SEO artifact validation.
- Full production build: 108 static pages generated successfully.
- Local production crawl: 188 of 188 approved sitemap URLs passed direct-200, canonical, Open Graph URL, H1, robots, alternate-origin, JSON-LD parsing, and forbidden-host checks.
- Full repository suite: 40 test files and 203 tests passed; ESLint passed with no errors.

## No-results claims

No improvement in ranking, indexing, citations, traffic, Core Web Vitals, or qualified leads is claimed before post-deployment measurement. Unknown and unavailable values remain labelled rather than recorded as zero.
