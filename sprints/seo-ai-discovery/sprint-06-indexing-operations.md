# Sprint 06 - Indexing Operations

Priority: High
Depends on: Sprint 02, Sprint 03, Sprint 05
Primary spec: `../../docs/specs/seo-ai-discovery/02-offsite-entity-spec.md`

## Goal

Submit and monitor Hive Vault Arc indexing across Google, Bing/Copilot, and IndexNow after technical SEO changes are deployed.

## Code Files To Modify

Only modify code if IndexNow key hosting or submission helpers are implemented in the repo. Otherwise, this sprint is mostly external operations.

Potential files:

- `src/app/indexnow-key.txt/route.ts`
- `scripts/submit-indexnow.mjs`
- `README.md` or `docs/specs/seo-ai-discovery/02-offsite-entity-spec.md` if operational notes are updated
- `docs/specs/seo-ai-discovery/03-hosting-indexing-checklist.md`

## Tasks

1. Google Search Console setup.
   - Verify `hivevaultarc.com` as a Domain property when possible.
   - Submit `https://hivevaultarc.com/sitemap.xml`.
   - Inspect priority URLs and request indexing.
   - Check Pages, Sitemaps, HTTPS, Core Web Vitals, and Enhancements reports.

2. Bing Webmaster Tools setup.
   - Add/import the site.
   - Submit `https://hivevaultarc.com/sitemap.xml`.
   - Inspect priority URLs.

3. IndexNow setup.
   - Generate an IndexNow key.
   - Set it in Vercel production as `INDEXNOW_KEY`.
   - Verify `https://hivevaultarc.com/indexnow-key.txt`.
   - Preview the default submission payload with `npm run indexnow:dry-run`.
   - Submit changed URLs after deploy with `npm run indexnow`.

4. Priority URL submission list.
   - `/`
   - `/arc`
   - `/capabilities`
   - `/capabilities/in-detail`
   - `/capabilities/solution-programs`
   - `/industries`
   - `/products-systems`
   - `/aboutus`
   - `/contact`
   - `/ai-agents-tangier`
   - `/ai-agents-morocco`
   - `/it-consulting-tangier`
   - `/custom-software-morocco`
   - `/digital-services-tangier`
   - `/case-studies`
   - `/blog`
   - `/ai/company`

5. Staging removal.
   - If `hiva-nine.vercel.app` is indexed, request removal only after redirect/protection/noindex is in place.

## Acceptance Criteria

- Google Search Console property is verified.
- Sitemap is submitted and accepted in Google Search Console.
- Bing Webmaster Tools site is verified or imported.
- Sitemap is submitted and accepted in Bing.
- IndexNow key route and submission script are documented.
- Priority URLs are submitted or scheduled for submission.
- Staging URL handling is documented.

## Verification

External dashboards:

- Google Search Console -> Sitemaps.
- Google Search Console -> URL Inspection.
- Bing Webmaster Tools -> Sitemaps.
- Bing Webmaster Tools -> URL Inspection.

Command checks:

```powershell
curl.exe -I https://hivevaultarc.com/sitemap.xml
curl.exe -I https://hivevaultarc.com/ai/company
curl.exe -I https://hiva-nine.vercel.app/
```

If IndexNow is implemented:

```powershell
curl.exe -I https://hivevaultarc.com/indexnow-key.txt
npm run indexnow:dry-run
```
