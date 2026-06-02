# Sprint 03 - Machine-Readable Company Profile

Priority: Critical
Depends on: Sprint 01, Sprint 02 preferred
Primary spec: `../../docs/specs/seo-ai-discovery/01-technical-seo-ai-spec.md`

## Goal

Add a public, cacheable `GET /ai/company` endpoint and align `llms.txt`, `llms-full.txt`, and JSON-LD identity data around one consistent Hive Vault Arc entity.

## Files To Modify

- `src/app/ai/company/route.ts`
- `src/lib/seo.ts`
- `src/lib/leadership.ts`
- `src/lib/capabilities-content.ts`
- `src/lib/proof.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `src/app/sitemap.ts`
- `src/app/robots.ts` if Sprint 02 has not already allowed `/ai/company`

## Endpoint Requirements

Route:

```txt
GET /ai/company
```

Response requirements:

- Status `200`.
- Valid JSON.
- Cache header: `public, max-age=86400, stale-while-revalidate=604800`.
- No authentication.
- No private data.
- `lastUpdated` uses `YYYY-MM-DD`.
- Do not expose environment secrets or internal paths.

Minimum fields:

- `schemaVersion`
- `lastUpdated`
- `company.name`
- `company.shortName`
- `company.alternateNames`
- `company.description`
- `company.website`
- `company.email`
- `company.telephone`
- `company.location`
- `company.marketsServed`
- `company.languages`
- `company.founders`
- `company.services`
- `company.industries`
- `company.aiCapabilities`
- `company.importantPages`
- `company.socialProfiles`

## Tasks

1. Build endpoint from existing constants where possible.
   - Reuse `SITE_URL`, brand constants, leadership data, capability data, and proof/case study data where stable.
   - Do not duplicate long source-of-truth arrays if an import can be used safely.

2. Add `/ai/company` links.
   - Add to `public/llms.txt`.
   - Add to `public/llms-full.txt`.
   - Add to `sitemap.ts` if intended indexable.
   - Ensure `robots.ts` allows it.

3. Clean LLM files.
   - Remove mojibake.
   - Use `Hive Vault Arc` as the primary name.
   - Keep aliases in a single clear identity section.
   - Keep `llms.txt` short and curated.
   - Keep `llms-full.txt` detailed but structured.

4. Align data with root JSON-LD.
   - The endpoint, schema, and LLM files must agree on name, aliases, phone, email, location, founders, services, industries, and important URLs.
   - Empty `socialProfiles` is acceptable if official URLs are not verified.

## Acceptance Criteria

- `GET /ai/company` returns valid JSON with the expected fields.
- Response cache headers are present.
- `llms.txt` links to `/ai/company`.
- `llms-full.txt` links to `/ai/company`.
- No `hiva-nine.vercel.app` URLs appear.
- No fake address, opening hours, reviews, awards, or social links are introduced.
- `npm run build` passes.

## Verification

```powershell
npm run build
curl.exe -s https://hivevaultarc.com/ai/company
curl.exe -I https://hivevaultarc.com/ai/company
rg "hiva-nine|/ai/company|H\\.V\\.A|HVA" public src docs sprints
```

After deploy, parse the endpoint response in a JSON validator and verify all public URLs return `200`.
