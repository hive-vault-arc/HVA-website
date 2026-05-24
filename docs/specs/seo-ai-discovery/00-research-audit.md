# SEO and AI Discovery Research Audit

Last updated: 2026-05-24

## Purpose

This document turns `../research.md` plus fresh source checks into a clean implementation baseline for Hive Vault Arc SEO and AI search discovery. It should be treated as the source of truth before starting the SEO/AI discovery sprint pack.

The goal is not to trick AI systems into recommending the company. The goal is to make Hive Vault Arc easy to crawl, easy to classify, easy to verify, and easy to cite.

## Inputs Reviewed

- `research.md` in the workspace root.
- Current repo SEO files: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`, `src/lib/seo.ts`, `public/llms.txt`, `public/llms-full.txt`.
- Existing docs and sprints under `docs/` and `sprints/`.
- Production endpoint checks against `https://hivevaultarc.com`.
- Current official guidance from Google, OpenAI, Anthropic, Perplexity, Next.js, IndexNow, llms.txt, and Open Graph.

## Current Production Checks

Checked on 2026-05-24:

| URL | Status | Finding |
| --- | --- | --- |
| `https://hivevaultarc.com/robots.txt` | 200 | Exists and is readable. |
| `https://hivevaultarc.com/sitemap.xml` | 200 | Exists and is readable. |
| `https://hivevaultarc.com/llms.txt` | 200 | Exists and is readable. |
| `https://hivevaultarc.com/llms-full.txt` | 200 | Exists and is readable. |
| `https://hivevaultarc.com/ai/company` | 404 | Missing machine-readable company endpoint. |
| `https://hiva-nine.vercel.app/` | 200 | Staging/preview URL remains reachable and can split canonical signals. |

Additional checks:

- Direct production homepage HTML did not contain `Something went wrong`.
- Public search snapshot still showed `Something went wrong`, so crawler/rendering history still needs investigation.
- Public sitemap does not include `/products-systems`, `/ai/company`, or `hreflang` alternates.
- The current source uses `Hive Vault Arc` as the primary brand and keeps `H.V.A` / `HVA` as aliases and search variants.

## What Is Already Good

- The site has real crawlable service pages, local pages, case studies, founder/team content, and FAQ content.
- `Organization` and `ProfessionalService` JSON-LD already exist in the root layout.
- `FAQPage` schema is already emitted through the shared FAQ component.
- `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt` are already deployed.
- The company identity is now mostly centralized in `src/lib/seo.ts` and visible copy has moved toward `Hive Vault Arc`.
- The primary phone number in current source appears consistent as `+212 670 431 249`.

## Priority Gaps

1. Add `GET /ai/company`
   - Return cacheable JSON for company identity, services, industries, founders, languages, locations, important URLs, and social profiles.
   - Link it from `llms.txt` and optionally expose it in metadata as an alternate machine-readable resource.

2. Harden crawler policy
   - Keep public pages open to legitimate search, AI search, user-triggered, and training crawlers.
   - Add missing current user agents such as `Claude-SearchBot`, `Claude-User`, and `Perplexity-User`.
   - Keep non-public paths disallowed only where they actually exist or are intentionally reserved.

3. Complete sitemap coverage
   - Add `/products-systems`.
   - Decide whether `/ai/company` belongs in the sitemap. Default: include if it is intended as a public machine-readable profile.
   - Add `alternates.languages` only for real translated equivalents.

4. Investigate crawler-rendered error text
   - The indexed `Something went wrong` text may come from a prior deployment, a crawler-specific render path, or an error boundary snapshot.
   - This must be verified with raw HTML, bot user agents, Search Console live inspection, and deployed route testing.

5. Control staging/canonical leakage
   - `hiva-nine.vercel.app` currently returns `200`.
   - Staging should either redirect permanently to production, require protection, or emit `noindex` and canonical production URLs.

6. Clean stale docs
   - Existing sprint/docs files contain mojibake from pasted smart quotes, dashes, arrows, and emoji bytes.
   - Several older docs still describe H.V.A as the main public name. New docs should set `Hive Vault Arc` as the public brand and keep abbreviations as aliases.

## Current Research Takeaways

- Google AI features use normal Search eligibility. Google says there are no extra AI-only files, markup, or special requirements for AI Overviews / AI Mode beyond normal SEO foundations.
- OpenAI separates `OAI-SearchBot` for ChatGPT Search visibility, `GPTBot` for training-related crawling, and `ChatGPT-User` for user-triggered visits.
- Anthropic separates `ClaudeBot` for training, `Claude-SearchBot` for search/indexing quality, and `Claude-User` for user-triggered retrieval.
- Perplexity separates `PerplexityBot` for Perplexity search results and `Perplexity-User` for user-triggered retrieval.
- `llms.txt` is useful as an LLM-readable curated overview, but it should be treated as an assistive context file, not a proven ranking factor.
- Open Graph metadata remains important for social previews and third-party link unfurling.
- IndexNow is useful for fast update notification to participating search engines, especially after publishing or changing service pages.

## Source Links

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google robots.txt: https://developers.google.com/search/reference/robots_txt
- Google common crawlers: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Google Organization structured data: https://developers.google.com/search/blog/2023/11/introducing-organization-markup
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- OpenAI crawlers: https://platform.openai.com/docs/bots/
- Anthropic crawlers: https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity crawlers: https://docs.perplexity.ai/guides/bots
- Next.js robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- llms.txt proposal: https://llmstxt.org/
- IndexNow documentation: https://www.indexnow.org/documentation
- Open Graph protocol: https://ogp.me/

## Acceptance Criteria For This Audit

- The sprint pack references this audit before implementation.
- Every remaining `H.V.A` / `HVA` usage in new specs is framed as an alias, code identifier, or search variant.
- No implementation sprint assumes root SEO files are missing; it treats them as existing files to improve.
- No sprint asks an implementer to invent addresses, hours, reviews, social URLs, or third-party profiles.
