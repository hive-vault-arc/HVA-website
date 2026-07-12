# Hosting, Indexing, and Outside Configuration Checklist

Last updated: 2026-05-24

This file explains what must be configured outside the codebase so Hive Vault Arc is crawlable, canonical, and trusted by search engines, AI search tools, and social platforms. These items live in dashboards such as Vercel, DNS, Google Search Console, Bing Webmaster Tools, Google Business Profile, and social accounts.

## Goal

After each SEO deployment, the public internet should see only one official version of the website:

- Production domain: `https://hivevaultarc.com`
- Primary brand: `Hive Vault Arc`
- Short aliases: `H.V.A`, `HVA`, `HiveVaultArc`
- Primary contact email: `contact@hivevaultarc.com`
- Primary phone: `+212 670 431 249`
- Location: Tangier, Morocco

Everything outside the repo should match those facts.

## 1. Vercel Hosting

### Required Production Settings

- Project framework: `Next.js`
- Production domain: `hivevaultarc.com`
- Canonical apex domain: `https://hivevaultarc.com`
- Redirect `www.hivevaultarc.com` to `https://hivevaultarc.com`
- Production environment variable:

```txt
NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com
```

### Staging and Preview Control

The old/staging URL `https://hiva-nine.vercel.app/` must not compete with production.

Current code includes a permanent redirect from `hiva-nine.vercel.app` to `https://hivevaultarc.com/:path*`. After deployment, verify:

```powershell
curl.exe -I https://hiva-nine.vercel.app/
curl.exe -I https://hiva-nine.vercel.app/capabilities
```

Expected result:

- `308` or `301` redirect to `https://hivevaultarc.com/...`
- Not `200 index, follow`

If Vercel dashboard protection is available, also enable preview deployment protection so random preview URLs are not indexed.

### Required Post-Deploy Checks

```powershell
curl.exe -I https://hivevaultarc.com/
curl.exe -I https://hivevaultarc.com/robots.txt
curl.exe -I https://hivevaultarc.com/sitemap.xml
curl.exe -I https://hivevaultarc.com/llms.txt
curl.exe -I https://hivevaultarc.com/llms-full.txt
curl.exe -I https://hivevaultarc.com/ai/company
```

Expected:

- Production homepage returns `200`
- SEO files return `200`
- `/ai/company` returns JSON
- No Vercel staging URL appears in canonicals, sitemap, schema, or Open Graph output

## 2. DNS

Use the domain provider dashboard to confirm:

- `hivevaultarc.com` points to Vercel correctly.
- `www.hivevaultarc.com` points to Vercel or redirects through Vercel.
- Google Search Console DNS TXT verification record exists if using a Domain property.
- No old records point to unrelated hosting.

Keep DNS records simple. Do not add tracking or redirect services between the domain and Vercel unless there is a clear need.

## 3. Google Search Console

### Setup

1. Add a Domain property for `hivevaultarc.com`.
2. Verify using DNS TXT.
3. Submit sitemap:

```txt
https://hivevaultarc.com/sitemap.xml
```

4. Inspect and request indexing for priority URLs:

- `https://hivevaultarc.com/`
- `https://hivevaultarc.com/capabilities`
- `https://hivevaultarc.com/capabilities/in-detail`
- `https://hivevaultarc.com/capabilities/solution-programs`
- `https://hivevaultarc.com/arc`
- `https://hivevaultarc.com/industries`
- `https://hivevaultarc.com/aboutus`
- `https://hivevaultarc.com/contact`
- `https://hivevaultarc.com/ai-agents-tangier`
- `https://hivevaultarc.com/ai-agents-morocco`
- `https://hivevaultarc.com/blog`
- `https://hivevaultarc.com/case-studies`

### Specific Sprint 05 Follow-Up

The search result previously showed a stale `Something went wrong` snippet. After deployment:

1. Use URL Inspection for `https://hivevaultarc.com/`.
2. Click live test.
3. Confirm rendered HTML does not include `Something went wrong`.
4. Request indexing.

If `hiva-nine.vercel.app` appears in Google Search Console:

1. Confirm the staging redirect is live first.
2. Then use removals only if needed.
3. Do not request removal before redirect/noindex/protection is active.

## 4. Bing Webmaster Tools

Setup:

1. Add `https://hivevaultarc.com`.
2. Verify ownership, or import from Google Search Console.
3. Submit `https://hivevaultarc.com/sitemap.xml`.
4. Inspect priority URLs.
5. Enable or configure IndexNow.

Acceptance:

- Sitemap is accepted.
- Bing can fetch the homepage.
- Bing sees production canonicals.
- No staging URL is indexed as canonical.

## 5. IndexNow

IndexNow helps notify Bing and participating search engines when URLs change.

Required:

1. Generate an IndexNow key.
2. Add it to Vercel production as `INDEXNOW_KEY`.
3. Verify the public key route:

```powershell
curl.exe -I https://hivevaultarc.com/indexnow-key.txt
```

Expected after configuration: `200` with `text/plain`.

Expected before configuration: `404`, because no key has been provided.

4. Preview the submission payload locally:

```powershell
npm run indexnow:dry-run
```

5. Submit the default priority URL set:

```powershell
$env:INDEXNOW_KEY="YOUR_KEY"
npm run indexnow
```

6. Submit a specific changed URL set when needed:

```powershell
$env:INDEXNOW_KEY="YOUR_KEY"
npm run indexnow -- https://hivevaultarc.com/ https://hivevaultarc.com/capabilities
```

Common URL submission set:

- `https://hivevaultarc.com/`
- `https://hivevaultarc.com/sitemap.xml`
- `https://hivevaultarc.com/robots.txt`
- `https://hivevaultarc.com/llms.txt`
- `https://hivevaultarc.com/llms-full.txt`
- `https://hivevaultarc.com/ai/company`
- Any page changed in the deploy

The key is public through the required verification route, but keep the dashboard/source value controlled and rotate it if abused.

## 6. Business Profiles

### Google Business Profile

Create or claim the business profile using:

- Name: `Hive Vault Arc`
- Website: `https://hivevaultarc.com`
- Phone: `+212 670 431 249`
- Email: `contact@hivevaultarc.com`
- Location/service area: Tangier, Morocco
- Category: technology consultant, software company, business technology service, or closest available category
- Languages: English, French, Arabic, Spanish

Add:

- Logo
- Cover image
- Service list
- Short business description
- Social links where Google allows them

Do not invent a street address or opening hours if they are not public and accurate.

### Bing Places

Create/import a listing with the same:

- Name
- Website
- Phone
- Location/service area
- Categories
- Logo and brand assets

Consistency matters more than keyword stuffing.

## 7. Social Profiles and SameAs

The website currently uses these official social URLs in schema and `/ai/company`:

- LinkedIn: `https://www.linkedin.com/company/hive-vault-arc`
- GitHub: `https://github.com/hive-vault-arc`
- Instagram: `https://www.instagram.com/hive.vault.arc/`
- Facebook: `https://www.facebook.com/hivevaultarc`
- X: `https://x.com/Hivevaultarc`
- TikTok: `https://www.tiktok.com/@hivevaultarc`

Before treating Sprint 04 as externally complete, confirm each profile is actually owned by Hive Vault Arc and has:

- Same brand name
- Same website
- Same logo or visual identity
- Same short description
- No conflicting phone/email

If a profile is not official or will not be maintained, remove it from `SOCIAL_PROFILES` in `src/lib/seo.ts`.

## 8. Social Preview Validation

After deployment, validate previews in:

- LinkedIn Post Inspector
- Facebook Sharing Debugger
- X/Twitter Card preview if available
- WhatsApp link preview
- Slack unfurl
- Discord unfurl

Expected:

- Title includes `Hive Vault Arc`
- Description describes the company, not an error state
- Image loads
- URL is `https://hivevaultarc.com`
- No staging URL is shown

## 9. AI Search Checks

After indexing has had time to refresh, test discovery manually:

- Google Search / AI features
- Bing / Copilot
- ChatGPT Search
- Perplexity
- Claude search or web retrieval, if available

Useful prompts:

- `Who is Hive Vault Arc?`
- `Hive Vault Arc Tangier Morocco`
- `AI agents company in Tangier`
- `WhatsApp AI automation Morocco`
- `technology transformation partner Morocco`

Check whether responses:

- Use `Hive Vault Arc` as the primary name
- Mention Tangier, Morocco
- Understand the company as AI, software, cloud, strategy, and managed operations
- Cite `https://hivevaultarc.com`
- Avoid staging URLs

## 10. Recurring Maintenance

Weekly during rollout:

- Check Google Search Console indexing status.
- Check Bing Webmaster Tools indexing status.
- Check whether the stale `Something went wrong` snippet disappeared.
- Check if `hiva-nine.vercel.app` appears in search results.
- Submit changed URLs through IndexNow after deploys.

Monthly:

- Review social profile consistency.
- Review business profile information.
- Refresh `/llms.txt`, `/llms-full.txt`, `/ai/company`, schema, and sitemap if company facts change.
- Search for indexed staging URLs.
- Check external citations for wrong phone, wrong name, or old staging domain.

## Done Checklist

- [ ] `NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com` is set in Vercel production.
- [ ] `hivevaultarc.com` is the production domain.
- [ ] `www.hivevaultarc.com` redirects to the apex domain.
- [ ] `hiva-nine.vercel.app` redirects or is protected.
- [ ] Google Search Console Domain property is verified.
- [ ] `https://hivevaultarc.com/sitemap.xml` is submitted in Google Search Console.
- [ ] Homepage live inspection passes and indexing is requested.
- [ ] Bing Webmaster Tools is configured.
- [ ] IndexNow is configured.
- [ ] `INDEXNOW_KEY` is set in Vercel production.
- [ ] `https://hivevaultarc.com/indexnow-key.txt` returns `200` after the key is configured.
- [ ] `npm run indexnow:dry-run` prints the expected URL set.
- [ ] Google Business Profile exists or verification is started.
- [ ] Bing Places exists or verification is started.
- [ ] Official social profiles are verified.
- [ ] Social previews show the right title, image, and production URL.
- [ ] No staging URL appears in search results, sitemap, schema, or social previews.
