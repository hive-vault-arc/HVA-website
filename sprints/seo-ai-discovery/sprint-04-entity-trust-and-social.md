# Sprint 04 - Entity Trust and Social Signals

Priority: High
Depends on: Sprint 01, Sprint 03 preferred
Primary specs:

- `../../docs/specs/seo-ai-discovery/01-technical-seo-ai-spec.md`
- `../../docs/specs/seo-ai-discovery/02-offsite-entity-spec.md`

## Goal

Make Hive Vault Arc look like one verified entity across schema, social previews, footer links, official profile links, and public metadata.

## Files To Modify

- `src/app/layout.tsx`
- `src/lib/seo.ts`
- `src/components/SiteFooter.tsx`
- `src/views/SocialLinks.tsx`
- page metadata files where Open Graph or Twitter data is missing
- `public/llms.txt`
- `public/llms-full.txt`
- `/ai/company` endpoint from Sprint 03

## Tasks

1. Verify official profile URLs.
   - Confirm each existing profile URL is live and owned by Hive Vault Arc.
   - Remove or mark unverified URLs instead of adding questionable `sameAs` links.
   - Priority profiles: LinkedIn, Google Business Profile, Bing Places, GitHub, Instagram, Facebook, X, YouTube, TikTok.

2. Align schema `sameAs`.
   - Root Organization schema uses only verified official profile URLs.
   - `/ai/company` uses the same verified profile list.
   - Footer/social components link to the same official URLs.

3. Strengthen Organization and ProfessionalService JSON-LD.
   - Keep one stable `@id`: `https://hivevaultarc.com/#organization`.
   - Use `name: "Hive Vault Arc"`.
   - Keep aliases in `alternateName`.
   - Keep Tangier/Morocco address locality unless a real public street address is approved.
   - Keep founder/person nodes aligned with `src/lib/leadership.ts`.

4. Check page-level schema.
   - Blog/detail pages use `Article` or `BlogPosting`.
   - FAQ schema appears only where FAQ content is visible.
   - Service/geo pages use `Service` or `ProfessionalService` only where visible content supports it.
   - Breadcrumb schema exists where useful for page families.

5. Audit social preview metadata.
   - All indexable pages have canonical production URLs.
   - Open Graph includes title, description, URL, image, site name, type, and image alt.
   - Twitter cards remain valid.
   - Shared images are production URLs and renderable.

## Acceptance Criteria

- `sameAs` contains only verified official Hive Vault Arc URLs.
- Footer/social profile links match schema and `/ai/company`.
- Organization JSON-LD validates.
- Page-level schema validates for home, about, contact, geo pages, blog detail, and case study detail.
- Open Graph previews include the brand name and correct production URL.
- No staging URLs or fake profile URLs are present.

## Verification

```powershell
npm run build
rg "sameAs|linkedin|instagram|facebook|github|youtube|tiktok|x.com|hiva-nine" src public docs sprints
```

Manual validation:

- Google Rich Results Test.
- Schema.org validator.
- LinkedIn Post Inspector.
- Facebook Sharing Debugger.
- X Card Validator or equivalent preview check.
- WhatsApp/Discord/Slack link unfurl test.
