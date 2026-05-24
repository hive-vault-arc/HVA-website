# Sprint 02 - Crawl Foundation

Priority: Critical
Depends on: Sprint 01
Primary spec: `../../docs/specs/seo-ai-discovery/01-technical-seo-ai-spec.md`

## Goal

Harden crawler access, sitemap coverage, canonical route discovery, and localized route signals for Google, Bing/Copilot, ChatGPT Search, Perplexity, Claude, and normal social preview crawlers.

## Files To Modify

- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/seo.ts` if route/canonical helpers need a single source of truth
- related tests if they exist

## Tasks

1. Simplify and clarify `robots.ts`.
   - Keep public pages allowed.
   - Disallow only intentionally non-public paths: `/links`, `/admin/`, `/api/private/`.
   - Keep `/llms.txt`, `/llms-full.txt`, and future `/ai/company` accessible.
   - Do not block static assets, images, fonts, CSS, JS, or Open Graph media.

2. Add documented crawler user agents.
   - Search/indexing: `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`.
   - User-triggered retrieval: `ChatGPT-User`, `Claude-User`, `Perplexity-User`.
   - Training/AI controls: `GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`.
   - Social previews: `facebookexternalhit`, `FacebookBot`, `Twitterbot`, `LinkedInBot`, `Slackbot`, `Discordbot`, `WhatsApp`.

3. Complete sitemap coverage.
   - Add missing `/products-systems`.
   - Add `/ai/company` after Sprint 03 implements it, or leave a TODO if this sprint runs first.
   - Ensure blog and case study detail routes continue to be generated from source data.
   - Ensure no `hiva-nine.vercel.app` URLs appear.

4. Add localized alternates where valid.
   - Use Next.js `alternates.languages` for real language equivalents only.
   - Do not claim alternates for incomplete routes.
   - Verify `/fr`, `/ar`, `/es` pages are intentionally indexable or update route metadata/sitemap accordingly.

5. Keep canonical values production-first.
   - `SITE_URL` must resolve to `https://hivevaultarc.com` in production.
   - No sitemap entry, canonical URL, Open Graph URL, or schema `@id` should use staging.

## Acceptance Criteria

- `robots.txt` allows legitimate search and AI crawlers.
- `robots.txt` disallows only intended non-public paths.
- `sitemap.xml` includes all important canonical public pages, including `/products-systems`.
- Locale alternates exist only where the target page exists and is meaningful.
- No staging URLs appear in robots, sitemap, metadata, or schema.

## Verification

```powershell
npm run build
curl.exe -s https://hivevaultarc.com/robots.txt
curl.exe -s https://hivevaultarc.com/sitemap.xml
rg "hiva-nine|products-systems|ai/company|xhtml:link|hreflang" src public docs sprints
```

After deploy, confirm:

- `https://hivevaultarc.com/robots.txt` returns `200 text/plain`.
- `https://hivevaultarc.com/sitemap.xml` returns `200 application/xml`.
- The sitemap output contains expected canonical URLs and valid localized alternate links if implemented.
