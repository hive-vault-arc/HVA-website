# Offsite Entity and Indexing Spec

Last updated: 2026-05-24

## Goal

Build external trust and verification around Hive Vault Arc so search engines and AI systems can connect the website, social profiles, business listings, founder identities, services, location, and citations into one consistent entity.

This spec covers tasks that require dashboards, accounts, external tools, or third-party sites. These tasks are not purely repo work.

## Entity Baseline

Use this identity everywhere:

- Primary name: `Hive Vault Arc`
- Uppercase lockup: `HIVE VAULT ARC`
- Short name / aliases: `H.V.A`, `HVA`, `HiveVaultArc`, `hivevaultarc`, `Hive Vault ARC`, `Hive Vault`, `Vault Arc`
- Category: Technology transformation partner, AI engineering, technology consulting, software engineering, managed operations
- Location: Tangier, Morocco
- Markets served: Morocco, France, Europe, North Africa, remote delivery worldwide
- Website: `https://hivevaultarc.com`
- Email: `contact@hivevaultarc.com`
- Primary phone: `+212 670 431 249`

Do not publish an exact street address or opening hours unless they are true and approved for public use.

## Google Search Console

Tasks:

1. Add a Domain property for `hivevaultarc.com`.
2. Verify ownership using DNS TXT if possible.
3. Submit `https://hivevaultarc.com/sitemap.xml`.
4. Inspect and request indexing for:
   - `https://hivevaultarc.com/`
   - `https://hivevaultarc.com/capabilities`
   - `https://hivevaultarc.com/arc`
   - `https://hivevaultarc.com/whoweare/abouthva`
   - `https://hivevaultarc.com/contact`
   - `https://hivevaultarc.com/ai-agents-tangier`
   - `https://hivevaultarc.com/ai-agents-morocco`
   - `https://hivevaultarc.com/it-consulting-tangier`
   - `https://hivevaultarc.com/custom-software-morocco`
   - `https://hivevaultarc.com/digital-services-tangier`
5. Inspect `https://hiva-nine.vercel.app/` if visible in Search Console and remove/redirect/deindex as appropriate.
6. Check Pages, Sitemaps, Core Web Vitals, HTTPS, Mobile Usability, and Enhancements weekly during rollout.

Acceptance:

- Sitemap is submitted and read successfully.
- Homepage and priority service pages are indexed or requested.
- No production pages are blocked by robots.
- No staging pages remain indexed intentionally.

## Bing Webmaster Tools

Tasks:

1. Add `https://hivevaultarc.com`.
2. Import from Google Search Console if available.
3. Submit `https://hivevaultarc.com/sitemap.xml`.
4. Inspect priority URLs.
5. Enable or verify IndexNow support.

Acceptance:

- Sitemap accepted.
- Priority URLs can be inspected.
- No staging URL is treated as canonical.

## IndexNow

Tasks:

1. Generate an IndexNow key with 8-128 allowed characters.
2. Set `INDEXNOW_KEY` in the Vercel production environment.
3. Verify the key file route:
   - `https://hivevaultarc.com/indexnow-key.txt`
4. Submit changed URLs after each deployment that modifies SEO-relevant pages.
5. Use the repo helper when possible:

```powershell
npm run indexnow:dry-run
$env:INDEXNOW_KEY="YOUR_KEY"
npm run indexnow
```

The script submits to `https://api.indexnow.org/IndexNow` with `keyLocation` set to `https://hivevaultarc.com/indexnow-key.txt`.

Batch submission shape:

```json
{
  "host": "hivevaultarc.com",
  "key": "INDEXNOW_KEY",
  "urlList": [
    "https://hivevaultarc.com/",
    "https://hivevaultarc.com/capabilities"
  ]
}
```

Acceptance:

- Key file returns `200`.
- IndexNow submission returns `200` or `202`.
- URLs submitted belong to `hivevaultarc.com`.

## Google Business Profile

Tasks:

1. Create or claim the profile for `Hive Vault Arc`.
2. Use exact website, phone, and category alignment.
3. Recommended categories:
   - Primary: IT consulting or business management consultant, whichever is most accurate in Google Business Profile.
   - Secondary: Software company, business consulting service, marketing/automation service only if accurate.
4. Add logo, cover image, service list, service area, languages, and approved description.
5. Add social links where Google allows them.
6. Request legitimate reviews from real clients only.

Acceptance:

- Profile is verified.
- Website, phone, and name match the website and schema.
- No fake address/hours/reviews are present.

## Social and Profile Graph

Create or verify official profiles before adding them to schema `sameAs`.

Priority order:

1. LinkedIn company page.
2. Google Business Profile.
3. Bing Places.
4. GitHub organization if there is public technical work.
5. Instagram / Facebook if maintained.
6. X, YouTube, TikTok only if the company will actively maintain them.
7. Crunchbase, Clutch, GoodFirms, DesignRush, local Moroccan directories, and relevant startup/tech directories.

Rules:

- Every profile must use `Hive Vault Arc` as the company name.
- Profile bios should match the website positioning.
- Website link must be `https://hivevaultarc.com`.
- Phone/email must match the website.
- Add only real profile URLs to `sameAs`.

Acceptance:

- At least LinkedIn, Google Business Profile, and Bing Places exist or are explicitly marked pending.
- `sameAs` in code has only verified official profiles.
- Footer/social links match the same official URLs.

## Staging Deindexing

Problem: `https://hiva-nine.vercel.app/` currently returns `200`.

Tasks:

1. Prefer Vercel project settings to block public preview/staging indexing.
2. If a redirect is safe, redirect the Vercel staging domain to `https://hivevaultarc.com`.
3. If redirect is not safe, make staging return `noindex` and canonical production URLs.
4. Use Google Search Console Removals only after canonical/noindex/redirect is in place.

Acceptance:

- `curl -I https://hiva-nine.vercel.app/` no longer returns an indexable public `200`, or the response has verified `noindex`.
- Search results stop showing staging pages after recrawl/removal.

## Monitoring Cadence

Weekly for the first month after implementation:

- Google Search Console indexing, crawl errors, sitemap reads, and Core Web Vitals.
- Bing Webmaster Tools indexing and sitemap state.
- Brand searches: `Hive Vault Arc`, `H.V.A`, `HVA`, `HiveVaultArc`.
- AI search checks in ChatGPT Search, Perplexity, Claude, and Bing/Copilot.
- Server/CDN logs for major crawlers if available.

Monthly after stabilization:

- Refresh `llms.txt`, `llms-full.txt`, `/ai/company`, schema, and sitemap if services, founders, contact details, locations, or social profiles change.
- Check third-party profile consistency.
- Review indexed pages and remove low-value duplicates.
