# Search Console indexing ledger

This file is the handoff marker for manual Google Search Console work. Update it after every indexing session so the next session starts from evidence instead of repeating requests.

## 2026-09-13 — Africa/Casablanca

- Property: `sc-domain:hivevaultarc.com`
- Search Console data last updated: `2026-09-04`
- Company account used for indexing: `workspace@hivevaultarc.com`
- Access correction: granted the company Workspace account **Full** access; it previously had no access.
- Indexed in the Page Indexing report: **71**
- Not indexed in the Page Indexing report: **39**
- Daily quota reached: **No**
- Successful indexing requests today: **2**
- Live sitemap audit: **193 URLs currently use `https://hive-vault-arc-website.vercel.app` instead of the canonical domain.** Before the next production deployment, set `NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com` for the Production environment. The current code rejects any different Vercel Production origin; re-run `npm run audit:seo -- --base https://hivevaultarc.com --expected-origin https://hivevaultarc.com` after deployment.

### Requested today

| URL | Status before request | Request result |
| --- | --- | --- |
| `https://hivevaultarc.com/ai/company` | Crawled — currently not indexed | Added to Google's priority crawl queue |
| `https://hivevaultarc.com/llms.txt` | Crawled — currently not indexed | Added to Google's priority crawl queue |

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

### Next session

1. Open Search Console only as `workspace@hivevaultarc.com`.
2. Recheck the report totals and record its new `Last update` date.
3. Inspect `/ai/company` and `/llms.txt`; mark them indexed only if URL Inspection says **URL is on Google**.
4. Request indexing only for newly reported canonical `200` HTML/content URLs that are not intentionally noindexed.
5. Never request redirects, canonical alternates, fonts, icons, manifests, or other static assets.

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
