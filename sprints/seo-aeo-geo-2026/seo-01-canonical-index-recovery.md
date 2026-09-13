# SEO-01 — Canonical Authority and Index Recovery

- Priority: P0 / production incident
- Duration: one to two working days for the fix, then two to six weeks of observation
- Primary owners: web engineering, Vercel administrator, Search Console owner
- Depends on: none
- Blocks: every other deployment in this program

## Goal

Make `https://hivevaultarc.com` the only public canonical authority, restore Search Console control to a company-owned account, and create a truthful indexable URL inventory.

## Why this is first

On 2026-09-13, production returned the following contradictory signals:

- All 193 sitemap `<loc>` URLs use `https://hive-vault-arc-website.vercel.app`.
- All 960 sitemap alternate URLs use that Vercel alias.
- The robots sitemap line uses that Vercel alias.
- 192 HTML pages on `hivevaultarc.com` declare the Vercel alias as canonical and `og:url`.
- `/ai/company` contains 58 references to the Vercel alias.
- The current Vercel alias returns an indexable `200` instead of redirecting.
- The company Google account cannot access the domain Search Console property.

Canonical signals are hints, but these hints are consistent and point at the wrong host. Do not publish more SEO content until the authority error is fixed.

## Scope

### In scope

- Production environment correction.
- Current and legacy Vercel-host consolidation.
- Canonical, OG, schema, sitemap, robots, and machine-readable URL validation.
- Indexable-inventory policy.
- Company-owned Search Console verification and sitemap resubmission.
- Search Console issue triage after deployment.

### Out of scope

- New landing pages.
- Keyword expansion.
- Content rewrites unrelated to canonical/index status.
- Bulk “request indexing” for every URL.
- Search Console access through a personal account.

## Inputs

- `src/lib/seo.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/ai/company/route.ts`
- `src/i18n/route-manifest.ts`
- `next.config.ts`
- `src/test/legacy-redirects.test.ts`
- `.env.example`
- Vercel project settings for the company project
- Company-controlled DNS for `hivevaultarc.com`

## Task 1 — Correct the production authority variable

In the company Vercel project, set this exact Production value:

```ini
NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com
```

Rules:

1. No trailing slash.
2. Use the apex host, not `www` and not any `vercel.app` hostname.
3. Confirm the variable belongs to the company project before saving.
4. Keep Preview deployments protected. If public previews are intentionally supported, make them `noindex` and keep canonical metadata pointed at production.
5. Redeploy Production because this `NEXT_PUBLIC_` value is embedded at build time.

Add a server-side validation helper or build check that rejects production builds when `SITE_URL`:

- is not HTTPS;
- has a path, query, or fragment;
- is not exactly `hivevaultarc.com` in Production;
- ends in `vercel.app` in Production.

Do not log environment values beyond the normalized public site URL.

## Task 2 — Consolidate every alternate host

The existing redirect covers `hiva-nine.vercel.app` but not the current alias. Add and test a permanent redirect for:

```text
hive-vault-arc-website.vercel.app/:path* -> https://hivevaultarc.com/:path*
```

Keep the existing redirects for:

- `www.hivevaultarc.com`;
- `hiva-nine.vercel.app`.

Prefer Vercel domain-level redirects or protection when available. Keep the application redirect as a tested defense for known production aliases. Do not attempt to enumerate every deployment preview hostname in code; previews should be protected or `noindex` by environment policy.

Update `src/test/legacy-redirects.test.ts` so all three known aliases are covered.

## Task 3 — Define the indexable inventory

Create a table in the implementation PR description with one row per route family:

| Route family | Index? | Sitemap? | Reason |
|---|---:|---:|---|
| Core company and service pages | Yes | Yes | Commercial and navigational value |
| Approved insight and case-study detail pages | Yes | Yes | Useful editorial/proof content |
| Privacy, cookie, and legal pages | Company decision | Match decision | Compliance pages need not be acquisition targets |
| `/links` and other utility pages | No | No | Not a search landing page |
| Redirect sources | No | No | Only final canonical destinations belong in sitemap |
| `/ai/company` JSON | No for Google | No | Auxiliary machine endpoint, not a user search result |
| `llms.txt` files | No sitemap entry | No | Optional auxiliary files; not Google Search inputs |

Update `ROUTE_MANIFEST.indexable` and `sitemap.ts` to match the approved table. Do not try to maximize the sitemap URL count.

## Task 4 — Make sitemap freshness truthful

Static entries currently receive `new Date()` on every sitemap request. Replace that behavior with one of these, in order of preference:

1. A real content/build modification date tracked per route.
2. The deployment date when a static route actually changed.
3. No `lastModified` value when the project cannot provide a truthful timestamp.

For dynamic Sanity records, continue using the content record's actual `lastUpdated` or `publishedAt`. Never refresh dates solely to look fresh.

Add tests asserting:

- every sitemap URL uses `https://hivevaultarc.com`;
- no sitemap URL redirects;
- no duplicate `<loc>` values exist;
- each alternate set includes itself and only real approved translations;
- `lastModified` is stable across two calls when content has not changed;
- non-indexable utility routes are absent.

## Task 5 — Verify every emitted URL surface

After the production deployment, run a crawler over the approved sitemap inventory and record:

- HTTP status and final URL;
- canonical URL;
- `og:url`;
- `hreflang` values and reciprocity;
- JSON-LD `@id`, `url`, `sameAs`, `mainEntityOfPage`, and breadcrumb URLs;
- internal links;
- robots meta and `X-Robots-Tag`;
- content type.

The scan must report zero occurrences of:

```text
hive-vault-arc-website.vercel.app
hiva-nine.vercel.app
```

Verify at minimum:

```powershell
curl.exe -I https://hivevaultarc.com/
curl.exe -I https://www.hivevaultarc.com/
curl.exe -I https://hive-vault-arc-website.vercel.app/
curl.exe -I https://hiva-nine.vercel.app/
curl.exe https://hivevaultarc.com/robots.txt
curl.exe https://hivevaultarc.com/sitemap.xml
curl.exe https://hivevaultarc.com/ai/company
```

Expected behavior:

- Apex production URLs return `200` directly.
- Alternate hosts return one permanent redirect to the equivalent apex path.
- The production canonical, sitemap, `hreflang`, OG, and schema URLs all use the apex host.
- Redirect chains are not accepted.

## Task 6 — Restore company-owned Search Console access

The company Chrome profile currently shows “you don't have access to this property” for the domain property. Resolve it without adopting a personal account as the operating owner.

Preferred procedure:

1. Sign in with the company Google account.
2. Add the `sc-domain:hivevaultarc.com` property.
3. Choose DNS verification.
4. Add Google's TXT record through the company-controlled DNS account.
5. Complete verification and confirm the company account is an Owner, not merely a restricted user.
6. Once company ownership is proven, remove personal-account access if it is no longer required by company policy.
7. Record the accountable company owner and a recovery owner in the private company credential register—not in this repository.

Do not publish DNS verification tokens in sprint documentation or screenshots.

## Task 7 — Resubmit and triage, not blindly request indexing

Only after Tasks 1–6 pass:

1. Remove obsolete Vercel-host sitemap submissions if present.
2. Submit `https://hivevaultarc.com/sitemap.xml`.
3. Open Page indexing and export the current indexed/not-indexed reason groups.
4. Compare those groups with the approved indexable inventory.
5. Inspect representative URLs from each reason, not only the totals.
6. For priority pages, compare User-declared canonical with Google-selected canonical.
7. Request indexing for a small set of repaired priority pages:
   - homepage;
   - capabilities index;
   - one primary service page;
   - one case study;
   - one recent insight.
8. Use “Validate fix” only for the relevant resolved issue group.

Expected exclusions such as redirects or intentionally `noindex` pages are not defects. “Crawled — currently not indexed” and “Discovered — currently not indexed” require content and discovery investigation, not repeated submission.

## Task 8 — Capture the recovery baseline

Record a dated baseline in the sprint closeout:

- approved indexable URL count;
- submitted sitemap URL count;
- indexed target count;
- not-indexed target count by reason;
- number of URLs where Google selected another canonical;
- crawl date for five priority pages;
- Google Search impressions/clicks for the preceding 28 and 90 days;
- Generative AI Search impressions if the report has data.

Do not compare the current 193-URL inventory directly with the historical screenshot showing 71 indexed and 39 not indexed without reconciling the URL sets.

## Verification

1. Run the production-host crawl twice and confirm the results are stable.
2. Confirm every known alias redirects in one hop while every approved apex URL returns direct `200`.
3. Search the complete response corpus for both known Vercel aliases; the result must be zero.
4. Parse the sitemap, `hreflang`, Open Graph, and JSON-LD URLs and assert the apex host.
5. Confirm the company account is an owner in Search Console and the production sitemap succeeds.
6. Inspect five priority URLs and record Google's selected canonical and index state.
7. Save the dated crawl and Search Console exports with the sprint closeout.

## Acceptance criteria

- [ ] `NEXT_PUBLIC_SITE_URL` is exactly `https://hivevaultarc.com` in company Production.
- [ ] Production was rebuilt after the variable correction.
- [ ] All known alternate hosts permanently redirect to the equivalent apex path.
- [ ] Every approved sitemap URL returns direct `200` and declares itself canonical.
- [ ] Sitemap, robots, OG, JSON-LD, and `/ai/company` contain zero Vercel-alias URLs.
- [ ] Sitemap `lastModified` values are accurate or omitted.
- [ ] `/ai/company` and other non-user resources follow the approved indexability decision.
- [ ] The company Google account is a verified owner of the domain Search Console property.
- [ ] The apex sitemap is submitted and current issue groups are exported.
- [ ] Five representative URL inspections confirm the production host is the selected or pending canonical.
- [ ] A dated recovery baseline exists.

## Rollback and incident handling

- If the corrected variable breaks absolute asset or link generation, roll back the deployment—not the canonical authority decision—and fix the URL builder.
- If a host redirect creates a loop, remove the failing redirect rule immediately and verify Vercel domain assignment before redeploying.
- Do not use Search Console Removals against the production domain. Use removals for an unwanted alias only after redirects/protection are confirmed.
- Do not change canonical URLs again during the observation window unless an actual defect is found.

## Evidence

- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq)
- [Google localized versions guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Console performance reporting](https://support.google.com/webmasters/answer/7576553?hl=en)
