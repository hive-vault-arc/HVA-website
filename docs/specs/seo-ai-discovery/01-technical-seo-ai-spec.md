# Technical SEO and AI Discovery Spec

Last updated: 2026-05-24

## Goal

Improve how Hive Vault Arc is crawled, indexed, understood, and cited by search engines, AI search systems, social platforms, and future machine clients. This spec covers code-facing work only. External account work lives in `02-offsite-entity-spec.md`.

## Non-Goals

- Do not redesign the website.
- Do not change public routes except adding `GET /ai/company`.
- Do not change visible copy except where a sprint explicitly fixes stale brand naming or broken encoding.
- Do not add dependencies unless an implementation sprint proves one is already installed and appropriate.
- Do not add fake schema data.

## Brand Identity Rules

- Primary public prose: `Hive Vault Arc`.
- Uppercase labels or lockups: `HIVE VAULT ARC`.
- Alias/search variants: `H.V.A`, `HVA`, `HiveVaultArc`, `hivevaultarc`, `Hive Vault ARC`, `Hive Vault`, `Vault Arc`.
- Abbreviations may remain in code constants, SEO keywords, schema `alternateName`, `manifest.short_name`, and explicit search-discovery text.

## Crawler Policy

Default policy: allow all legitimate search, AI search, user-triggered, and training crawlers on public pages for maximum discovery.

Required `robots.ts` behavior:

- `User-agent: *` allows `/` and disallows only intentionally non-public paths.
- Keep `/llms.txt` and `/llms-full.txt` accessible.
- Add `/ai/company` to the allowed public machine-readable surface once implemented.
- Do not block `/_next/static`, images, CSS, JS, fonts, public media, or Open Graph images.
- Use exact user-agent tokens where documented:
  - Google/Search: `Googlebot`, `Bingbot`, `Applebot`
  - OpenAI: `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`
  - Anthropic: `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `anthropic-ai`
  - Perplexity: `PerplexityBot`, `Perplexity-User`
  - Google AI controls: `Google-Extended`
  - Social previews where useful: `facebookexternalhit`, `FacebookBot`, `Twitterbot`, `LinkedInBot`, `Slackbot`, `Discordbot`, `WhatsApp`
- Reserved disallow paths:
  - `/links`
  - `/admin/`
  - `/api/private/`

Implementation note: avoid rules that look like a whitelist unless that is intentional. Since `Allow: /` already allows public descendants, do not accidentally imply that only `/llms.txt` and `/llms-full.txt` are crawlable.

## Sitemap Requirements

The generated sitemap must include all important canonical public routes:

- `/`
- `/arc`
- `/capabilities`
- `/capabilities/in-detail`
- `/capabilities/solution-programs`
- `/industries`
- `/products-systems`
- `/whoarewe/portfolio`
- `/aboutus`
- `/contact`
- `/insights`
- `/insights/news-articles`
- `/insights/perspectives`
- `/insights/research-reports`
- `/blog`
- all blog detail routes
- `/case-studies`
- all case study detail routes
- `/privacy-policy`
- `/mentions-legales`
- geo/service pages: `/ai-agents-tangier`, `/ai-agents-morocco`, `/it-consulting-tangier`, `/custom-software-morocco`, `/digital-services-tangier`, `/services-digitaux-tanger`
- locale pages only where real translated content exists
- `/ai/company` only if the endpoint is intended to be public and indexable

Hreflang rules:

- Use Next.js `alternates.languages` in `sitemap.ts` for real language equivalents.
- Do not add alternates for incomplete, duplicate, or placeholder locale pages.
- Include `x-default` only if the implementation confirms Next.js output supports it cleanly or a custom sitemap route is used.

## Machine-Readable Company Endpoint

Add public route:

```txt
GET /ai/company
```

Response:

- Status: `200`
- Content type: JSON
- Cache header: `public, max-age=86400, stale-while-revalidate=604800`
- No authentication
- No private data

Minimum JSON shape:

```json
{
  "schemaVersion": "1.0",
  "lastUpdated": "YYYY-MM-DD",
  "company": {
    "name": "Hive Vault Arc",
    "shortName": "H.V.A",
    "alternateNames": [],
    "description": "",
    "website": "https://hivevaultarc.com",
    "email": "contact@hivevaultarc.com",
    "telephone": "+212670431249",
    "location": {
      "city": "Tangier",
      "country": "Morocco",
      "remoteDelivery": true
    },
    "marketsServed": [],
    "languages": [],
    "founders": [],
    "services": [],
    "industries": [],
    "aiCapabilities": [],
    "importantPages": {},
    "socialProfiles": []
  }
}
```

Data source rules:

- Prefer importing existing constants/data from `src/lib/seo.ts`, `src/lib/leadership.ts`, `src/lib/capabilities-content.ts`, `src/lib/proof.ts`, and other existing source modules.
- Do not duplicate long arrays if a stable existing source exists.
- Do not invent profile URLs. Empty arrays are acceptable until official profiles are confirmed.

## JSON-LD Requirements

Root layout:

- Keep `Organization` + `ProfessionalService`.
- Keep one stable `@id`: `https://hivevaultarc.com/#organization`.
- Use `name: "Hive Vault Arc"`.
- Put abbreviations in `alternateName`.
- Use only real social URLs in `sameAs`.
- Keep `addressLocality: "Tangier"` and `addressCountry: "MA"` unless a real street address is available.
- Do not add fake opening hours, aggregate ratings, reviews, or awards.

Page-level schema:

- Add or verify `BreadcrumbList` for main page families.
- Use `Service` schema on service/geo pages where the visible page describes that service.
- Use `FAQPage` only where the questions and answers are visible on the source page.
- Use `Article` / `BlogPosting` for blog and insight detail pages, with real author/publisher data.
- Link page schemas back to the organization `@id` where appropriate.

## Metadata and Social Previews

Required:

- Every indexable public page has a canonical URL on `https://hivevaultarc.com`.
- No canonical, OG URL, sitemap entry, or schema `@id` points to `hiva-nine.vercel.app`.
- Open Graph fields include at minimum `og:title`, `og:type`, `og:image`, `og:url`, `og:description`, and `og:site_name`.
- `og:image:alt` should be present through Next metadata image `alt`.
- Twitter card metadata should remain `summary_large_image` unless a page has a reason to use a smaller card.

## LLM Context Files

`public/llms.txt`:

- Short, curated, current.
- Uses `Hive Vault Arc` as primary.
- Links to essential pages and `/ai/company`.
- Mentions aliases in one dedicated identity section.
- Avoids bloated case-study detail.

`public/llms-full.txt`:

- Extended context for agents and long-context systems.
- Includes company identity, founders, services, industries, case study summaries, technical stack, market context, and FAQ.
- No mojibake or broken encoding.
- Keep reviewed date current when changes are made.

## Staging and Canonical Controls

Production domain: `https://hivevaultarc.com`.

The old Vercel domain `https://hiva-nine.vercel.app/` must not compete with production.

Preferred resolution order:

1. Vercel/domain setting redirects or blocks preview/staging domain from public indexing.
2. If redirect/block is not possible, add `noindex` on staging while keeping production canonical.
3. Verify with direct fetch and search operator checks.

## Validation

Implementation sprints must run:

```powershell
rg "hiva-nine|Something went wrong|H\\.V\\.A|HVA" docs src public sprints
npm run build
curl -I https://hivevaultarc.com/robots.txt
curl -I https://hivevaultarc.com/sitemap.xml
curl -I https://hivevaultarc.com/llms.txt
curl -I https://hivevaultarc.com/llms-full.txt
curl -I https://hivevaultarc.com/ai/company
```

After deploy, validate:

- Google Rich Results Test on home, about, contact, geo pages, blog, and case studies.
- Schema.org validator for JSON-LD structure.
- Search Console URL Inspection for homepage and primary service pages.
- Bing URL Inspection after submitting sitemap.
- Social preview checks for LinkedIn, Facebook, X, WhatsApp, Discord, and Slack.
