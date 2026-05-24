# SEO and AI Discovery Outside Configuration

Last updated: 2026-05-24

These tasks require dashboards, accounts, DNS, or third-party platforms. Do not block code implementation on every external task, but do not mark the SEO/AI discovery pack complete until the critical items are done.

## Critical

### OUT-01 - Production Domain and Staging Control

Owner: site/admin

Tasks:

1. Confirm `https://hivevaultarc.com` is the production canonical domain.
2. Confirm `NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com` in Vercel production environment.
3. Make `https://hiva-nine.vercel.app/` non-competitive:
   - Preferred: redirect to production or protect preview/staging.
   - Fallback: emit `noindex` and production canonical.
4. Verify:
   - `curl -I https://hivevaultarc.com/`
   - `curl -I https://hiva-nine.vercel.app/`

Acceptance:

- Production loads.
- Staging is not an indexable duplicate.
- Canonicals point to production.

### OUT-02 - Google Search Console

Tasks:

1. Add `hivevaultarc.com` as a Domain property.
2. Verify with DNS TXT if possible.
3. Submit `https://hivevaultarc.com/sitemap.xml`.
4. Request indexing for homepage and priority pages.
5. Inspect any indexed staging URLs and remove only after redirect/noindex is active.

Acceptance:

- Property verified.
- Sitemap accepted.
- Priority URLs inspected/requested.

### OUT-03 - Bing Webmaster Tools

Tasks:

1. Add or import `https://hivevaultarc.com`.
2. Submit sitemap.
3. Inspect priority URLs.
4. Enable IndexNow if available.

Acceptance:

- Site verified.
- Sitemap accepted.
- Priority URLs inspectable.

## High Priority

### OUT-04 - IndexNow

Tasks:

1. Generate an IndexNow key.
2. Set it in Vercel production as `INDEXNOW_KEY`.
3. Verify `https://hivevaultarc.com/indexnow-key.txt` returns the key.
4. Preview the default submission set with `npm run indexnow:dry-run`.
5. Submit changed URLs after major SEO deploys with `npm run indexnow`.

Acceptance:

- Key route returns `200` after the environment variable is configured.
- Submission returns `200` or `202`.

### OUT-05 - Google Business Profile

Tasks:

1. Create or claim `Hive Vault Arc`.
2. Use the same website, email, phone, location, and business category as the site.
3. Add logo, cover image, service list, service area, and languages.
4. Add social links where allowed.
5. Request legitimate reviews from real clients only.

Acceptance:

- Profile verified or verification process started.
- No fake address, hours, or reviews.

### OUT-06 - Bing Places

Tasks:

1. Create or import the business listing.
2. Match name, phone, website, location, categories, and service area with the website.
3. Add logo and brand assets.

Acceptance:

- Listing created or verification started.

### OUT-07 - LinkedIn Company Page

Tasks:

1. Create or verify the official LinkedIn company page.
2. Use `Hive Vault Arc` as the company name.
3. Link to `https://hivevaultarc.com`.
4. Add logo, cover, description, company size, industry, and location.
5. Add the verified URL to schema `sameAs`, footer links, `/ai/company`, and `llms.txt`.

Acceptance:

- Official LinkedIn URL is verified and documented.

## Medium Priority

### OUT-08 - Official Social Profiles

Create or verify only profiles that the company will maintain:

- GitHub
- Instagram
- Facebook
- X
- YouTube
- TikTok

Acceptance:

- Only verified official URLs are added to `sameAs`.
- Dead or placeholder profiles are not added.

### OUT-09 - Directories and Citations

Recommended listings:

- Crunchbase
- Clutch
- GoodFirms
- DesignRush
- Moroccan startup or tech directories
- Local business directories
- Relevant chamber or partner listings

Rules:

- Use the same name, website, phone, location, and description.
- Do not buy low-quality spam backlinks.
- Request real client reviews only.

Acceptance:

- At least 3 credible third-party profiles are created or planned.

### OUT-10 - Social Preview Validation

Check previews after metadata updates:

- LinkedIn Post Inspector
- Facebook Sharing Debugger
- X/Twitter Card preview
- WhatsApp share preview
- Discord and Slack unfurls

Acceptance:

- Preview title includes `Hive Vault Arc`.
- Preview image loads.
- URL is production.
- Description is correct and not an error shell.

## Monitoring

Weekly during rollout:

- Google Search Console index coverage and sitemap state.
- Bing Webmaster Tools index state.
- Brand searches for `Hive Vault Arc`, `H.V.A`, `HVA`, `HiveVaultArc`.
- AI search checks in ChatGPT Search, Perplexity, Claude, and Bing/Copilot.
- Social preview cache state after metadata changes.

Monthly after rollout:

- Refresh `llms.txt`, `llms-full.txt`, `/ai/company`, schema, and sitemap if company data changes.
- Review third-party profile consistency.
- Check for indexed staging URLs.
