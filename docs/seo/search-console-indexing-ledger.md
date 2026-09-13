# Search Console indexing ledger

This file is the handoff marker for manual Google Search Console work. Update it after every indexing session so the next session starts from evidence instead of repeating requests.

## 2026-09-13 — Africa/Casablanca

- Property: `sc-domain:hivevaultarc.com`
- Search Console data last updated: `2026-09-04`
- Company account used for indexing: `workspace@hivevaultarc.com`
- Access correction: granted the company Workspace account **Full** access; it previously had no access.
- Indexed in the Page Indexing report: **71**
- Not indexed in the Page Indexing report: **39**
- Manual submission stop reached: **Yes.** After five successful submissions, Search Console returned the same generic submission error twice for the next valid URL. Google did not display an explicit quota message, so this may be a daily limit or a temporary service failure; manual requests were stopped to avoid waste.
- Successful indexing submissions today: **5 across 4 unique URLs**
- Production change: organization-repository commit `b8fda9c` converted `/ai/company` from a JSON-only response into canonical HTML and moved the machine record to `/ai/company.json`.
- Live sitemap audit: **171/171 canonical URLs passed with 0 failures.** Search Console previously reported 193 `URL not allowed` errors because an older sitemap used `https://hive-vault-arc-website.vercel.app`. The corrected sitemap was resubmitted on 2026-09-13 and Search Console now reports **Success**, **171 discovered pages**, and **0 videos**.

### Vercel citation remediation

- Google Search and its AI Overview still displayed the source label **Vercel** for the previously indexed hostname `hive-vault-arc-website.vercel.app` on 2026-09-13.
- The company Vercel project's domain settings now enforce a platform-level **308 Permanent Redirect** from `hive-vault-arc-website.vercel.app` to `https://hivevaultarc.com`.
- Live checks confirm that `/`, `/blog`, `/ai/company`, `/llms.txt`, and query strings preserve their full path and parameters when redirected to the canonical domain.
- The canonical homepage and legacy perspectives destination both render self-referencing `https://hivevaultarc.com` canonical and Open Graph URLs.
- The organization repository also retains the same permanent host redirect in `next.config.ts`, with regression coverage in `src/test/legacy-redirects.test.ts`.
- No temporary Search Console removal was submitted. The Vercel hostname is outside the `sc-domain:hivevaultarc.com` property, and the permanent redirect is the correct consolidation signal. Recheck the branded search result after Google recrawls the old hostname; the label can remain stale during recrawl and canonical processing.

### Requested today

| URL | Status before request | Request result |
| --- | --- | --- |
| `https://hivevaultarc.com/ai/company` | Crawled — currently not indexed; formerly JSON-only | Added to Google's priority crawl queue again after the canonical HTML upgrade deployed |
| `https://hivevaultarc.com/llms.txt` | Crawled — currently not indexed | Added to Google's priority crawl queue |
| `https://hivevaultarc.com/es` | Crawled — currently not indexed | Added to Google's priority crawl queue |
| `https://hivevaultarc.com/fr` | Alternate page with an obsolete Vercel-host canonical | Added to Google's priority crawl queue after the production canonical was corrected |

Indexing requests do not guarantee inclusion. Recheck these URLs in URL Inspection after Google has recrawled them; do not submit them repeatedly while they remain queued.

### Not-indexed report breakdown

| Search Console reason | Count | Action |
| --- | ---: | --- |
| Page with redirect | 20 | No request. Redirecting URLs should remain excluded. |
| Alternate page with proper canonical tag | 5 | No request. Google should index the canonical URL instead. |
| Excluded by `noindex` tag | 2 | No request unless product policy intentionally changes. |
| Crawled — currently not indexed | 12 | Reviewed individually below. |
| Discovered — currently not indexed | 0 | None. |

### Crawled examples reviewed

The three canonical HTML destinations below return `200` and URL Inspection confirms **URL is on Google**:

- `https://hivevaultarc.com/capabilities/in-detail`
- `https://hivevaultarc.com/blog/why-companies-must-integrate-ai-agents-2025`
- `https://hivevaultarc.com/blog/app-onboarding-conversion-revenue`

Their `www` variants in the report return permanent redirects to the apex-domain canonical and must not be submitted.

The remaining examples are non-page assets and must not consume indexing quota:

- `/favicon.ico`
- hashed favicon URLs
- `/Images/favico/favicon.ico`
- `/Images/favico/site.webmanifest`
- two `/_next/static/media/*.woff2` font files

### Confirmed status after the corrected sitemap submission

Already indexed; no request was made:

- `https://hivevaultarc.com/ar`
- `https://hivevaultarc.com/ai-agents-morocco`
- `https://hivevaultarc.com/fr/capabilities`
- `https://hivevaultarc.com/es/capabilities`
- `https://hivevaultarc.com/ar/capabilities`
- `https://hivevaultarc.com/fr/contact`

Confirmed not indexed and not yet successfully queued; inspect these first next session:

| Priority | URL | Search Console state | 2026-09-13 request result |
| ---: | --- | --- | --- |
| 1 | `https://hivevaultarc.com/fr/ai-agents-morocco` | URL is unknown to Google | Failed twice with the same generic submission error; this triggered the manual stop |
| 2 | `https://hivevaultarc.com/es/ai-agents-morocco` | URL is unknown to Google | Not submitted after the stop |
| 3 | `https://hivevaultarc.com/ar/ai-agents-morocco` | URL is unknown to Google | Not submitted after the stop |
| 4 | `https://hivevaultarc.com/es/contact` | URL is unknown to Google | Not submitted after the stop |
| 5 | `https://hivevaultarc.com/ar/contact` | URL is unknown to Google | Not submitted after the stop |

The four successfully queued URLs remain technically “not indexed” until Google recrawls and accepts them. A request is not an indexing guarantee.

### Obsolete-page and removal review

- The Page Indexing report contains no Not Found/404 category.
- The live sitemap contains no missing pages: all 171 entries return a valid canonical response.
- The 20 redirect exclusions, 5 canonical alternatives, and 2 intentional noindex pages are expected exclusions, not stale pages to submit or temporarily remove.
- No Search Console removal request was created. Temporary removals are inappropriate for valid redirects, canonical alternatives, assets, or URLs already absent from the sitemap.

### Next session

1. Open Search Console only as `workspace@hivevaultarc.com`.
2. Recheck the report totals and record its new `Last update` date. The current totals still reflect the 2026-09-04 report snapshot.
3. Inspect the four successfully queued URLs; mark them indexed only if URL Inspection says **URL is on Google**.
4. Start with the five-item priority table above. Request only URLs that remain not indexed and still return canonical `200` HTML.
5. Let the successful 171-URL sitemap cover the remaining inventory; do not attempt to manually submit every sitemap entry.
6. Never request redirects, canonical alternates, fonts, icons, manifests, or other static assets.

## Measurement baseline checked on 2026-09-13

- GA4 property: `hivevaultarc.com`
- GA4 measurement ID: `G-WL4DB4T67D`
- Web stream status: data collection active; traffic received within the past 48 hours.
- Enhanced Measurement: enabled.
- Page views from browser-history changes: enabled.
- GA4 Home at check time: 0 active users, 0 events, 0 key events, and 0 new users in the displayed last-seven-days cards.
- GA4 → Search Console product link: **not linked yet**. Google lists no eligible Search Console properties for `workspace@hivevaultarc.com` because the account has Full access but is not yet a verified site owner. Finish domain ownership verification for the company account, then link `sc-domain:hivevaultarc.com` to web stream `14789249714`; do not fall back to a personal account.
- Microsoft Clarity project: `Hive Vault Arc — Production`
- Clarity project ID: `ycn3r8by3t`
- Clarity dashboard at check time: 0 live users and no recent session data in the displayed three-day window.
- Clarity advanced project cookie setting: Off. The website still controls whether the Clarity recorder loads through its own analytics-consent gate.
