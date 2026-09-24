# SEO and AI Discovery Sprint Pack

Last updated: 2026-05-24

## Purpose

This pack turns the SEO/AI discovery research into ordered implementation work for Hive Vault Arc. Run one sprint at a time and do not move to the next sprint until the current sprint's acceptance criteria pass.

Primary specs:

- `../../docs/specs/seo-ai-discovery/00-research-audit.md`
- `../../docs/specs/seo-ai-discovery/01-technical-seo-ai-spec.md`
- `../../docs/specs/seo-ai-discovery/02-offsite-entity-spec.md`
- `../../docs/specs/seo-ai-discovery/03-hosting-indexing-checklist.md`
- `../../docs/specs/seo-ai-discovery/04-high-intent-content-roadmap.md`

## Execution Order

| Sprint | File | Priority | Outcome |
| --- | --- | --- | --- |
| 01 | `sprint-01-baseline-cleanup.md` | Critical | Clean stale research/docs assumptions before implementation. |
| 02 | `sprint-02-crawl-foundation.md` | Critical | Harden robots and sitemap for search/AI crawlers. |
| 03 | `sprint-03-machine-readable-company.md` | Critical | Add `/ai/company` and align LLM context files. |
| 04 | `sprint-04-entity-trust-and-social.md` | High | Strengthen schema, social previews, and official profile signals. |
| 05 | `sprint-05-crawl-rendering-qa.md` | High | Investigate crawler snapshots, staging leakage, and render errors. |
| 06 | `sprint-06-indexing-operations.md` | High | Submit and monitor indexing through Google, Bing, and IndexNow. |
| 07 | `sprint-07-content-roadmap.md` | Medium | Plan high-intent pages for search and AI answers. |

External tasks:

- `outside-configuration.md`
- `../../docs/specs/seo-ai-discovery/03-hosting-indexing-checklist.md`

## Global Rules

- Primary public brand: `Hive Vault Arc`.
- Uppercase lockup: `HIVE VAULT ARC`.
- Keep `H.V.A` and `HVA` only as aliases, search variants, schema alternate names, code identifiers, or manifest short names.
- Production domain: `https://hivevaultarc.com`.
- Public phones: `+212 610 014 949` and `+212 610 012 727`.
- Do not invent street addresses, opening hours, awards, reviews, client claims, or social URLs.
- Keep existing routes and visible content unless a sprint explicitly asks for a cleanup.
- No new dependencies unless the implementation proves one is already installed and appropriate.

## Common Verification Commands

Run from repo root:

```powershell
rg "hiva-nine|Something went wrong|H\\.V\\.A|HVA" docs src public sprints
npm run build
```

After deploy:

```powershell
curl.exe -I https://hivevaultarc.com/robots.txt
curl.exe -I https://hivevaultarc.com/sitemap.xml
curl.exe -I https://hivevaultarc.com/llms.txt
curl.exe -I https://hivevaultarc.com/llms-full.txt
curl.exe -I https://hivevaultarc.com/ai/company
curl.exe -I https://hivevaultarc.com/indexnow-key.txt
```

## Completion Definition

The pack is complete when:

- Production root SEO files return `200`.
- `/ai/company` returns valid cacheable JSON.
- Sitemap includes all important canonical routes and valid localized alternates.
- Robots policy allows legitimate search and AI crawlers while disallowing only intentionally non-public paths.
- Organization/entity schema uses verified social/profile URLs only.
- Staging URLs do not compete with production.
- IndexNow key hosting and submission workflow are documented.
- Google Search Console and Bing Webmaster Tools have accepted the production sitemap.
- `llms.txt`, `llms-full.txt`, schema, and public copy agree on the same company identity.
