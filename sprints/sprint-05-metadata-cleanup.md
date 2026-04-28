# Sprint 05 — Metadata Cleanup & Quick Fixes

> **Priority:** MEDIUM — These are targeted fixes to individual metadata issues. None are blocking but each erodes SEO quality if left unfixed.
> **Estimated effort:** 1–2 hours
> **Depends on:** Sprint 01 (SITE_URL)

---

## What This Sprint Is

Several metadata and content issues found during audit that need targeted fixes:

1. **Global `keywords` meta tag is 2,680 characters** — Google ignores keywords meta entirely, but Bing and AI crawlers may penalize keyword stuffing signals. Trim to under 200 chars, 10 most relevant terms.
2. **LinkedIn links across the site point to `linkedin.com` (generic)** — needs the actual company page URL once created.
3. **`robots.txt` `Host` directive** — Yandex-specific directive, legacy from pre-domain-migration. Should be cleaned up.
4. **`foundingDate: '2026'`** — verify accuracy, update if incorrect.
5. **`/insights/blogs/page.tsx` and `/insights/case-studies/page.tsx`** have `robots: { index: false }` with canonicals pointing to `/blog` and `/case-studies`. Confirm this is intentional — if these are true redirects/duplicates of the main pages, they should 301 redirect instead of being noindex pages.

---

## Tasks

### Task 5.1 — Trim global keywords meta tag

**File:** `src/lib/seo.ts` or `src/app/layout.tsx` (wherever global keywords are defined)

Find the current keywords string/array and trim to 10 high-priority terms:

```typescript
// Replace whatever is there with:
keywords: [
  'AI consulting Morocco',
  'digital transformation Tangier',
  'WhatsApp AI agent',
  'AI agents Morocco',
  'AI transformation consulting',
  'custom software Morocco',
  'ARC program HVA',
  'Hive Vault Arc',
  'IT consulting Tangier',
  'AI consulting North Africa',
],
```

---

### Task 5.2 — Fix LinkedIn links (placeholder until company page exists)

**Files to search:** Run `grep -rn "linkedin.com" src/`

For each result, replace the generic `https://linkedin.com` or `https://www.linkedin.com` with the actual company page URL:

```
https://www.linkedin.com/company/hive-vault-arc
```

> **Note:** This URL must be created first (see `outside-configuration.md` — Task OUT-5). If the LinkedIn company page doesn't exist yet, add a `TODO` comment and use a placeholder:
```typescript
// TODO: Replace with real LinkedIn company page once created
const LINKEDIN_URL = 'https://www.linkedin.com/company/hive-vault-arc';
```

Store it as a constant in `src/lib/seo.ts` or a shared config file so it only needs to be updated in one place.

---

### Task 5.3 — Clean `robots.txt` `Host` directive

**File:** `src/app/robots.ts`

The `Host` directive is Yandex-specific and outdated. Remove it. The file should look like:

```typescript
import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // AI crawler rules (keep as-is from current implementation)
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Remove: host: SITE_URL  ← delete this line
  };
}
```

> Verify the current robots.ts — if `host` is a field in the MetadataRoute.Robots type, Next.js may handle it. If it is a custom addition or string output, remove it.

---

### Task 5.4 — Audit `/insights/blogs` and `/insights/case-studies` routes

**Files:**
- `src/app/insights/blogs/page.tsx`
- `src/app/insights/case-studies/page.tsx`

These pages currently have:
```typescript
robots: { index: false, follow: true }
```
with canonical pointing to `/blog` and `/case-studies` respectively.

**Decision required — choose one:**

**Option A — They are true duplicates → Convert to 301 redirects**

In `next.config.ts`:
```typescript
async redirects() {
  return [
    { source: '/insights/blogs', destination: '/blog', permanent: true },
    { source: '/insights/case-studies', destination: '/case-studies', permanent: true },
  ];
},
```
Then delete the page files.

**Option B — They serve a purpose → Keep noindex but ensure canonical is correct**

If these pages are entry points from the `/insights/` hub that should funnel visitors to the canonical routes, keep them but make sure the canonical URL is correct and consistent.

Recommended: **Option A** (cleaner URL architecture, eliminates thin duplicate content risk).

---

### Task 5.5 — Verify and update `foundingDate`

**File:** `src/app/layout.tsx` (in the Organization schema)

Confirm: Was H.V.A officially founded in 2026? If yes, `foundingDate: '2026'` is correct. If the company was conceived or operating before 2026 even informally, update to the accurate year.

This is a factual check — update the code to reflect reality.

---

### Task 5.6 — Add social profile meta tags to layout

**File:** `src/app/layout.tsx`

In the root metadata export, add:

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  other: {
    // OpenGraph article publisher (for blog posts to inherit)
    'article:publisher': 'https://www.linkedin.com/company/hive-vault-arc',
  },
};
```

---

## Acceptance Criteria

- [ ] Global keywords meta is ≤ 200 characters (10 terms max)
- [ ] All LinkedIn links in the codebase point to `https://www.linkedin.com/company/hive-vault-arc`
- [ ] `robots.ts` does not output a `Host:` directive
- [ ] Decision made and implemented for `/insights/blogs` and `/insights/case-studies` routes
- [ ] `foundingDate` verified and accurate
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] `curl https://hivevaultarc.com/robots.txt` — no `Host:` line present
- [ ] View page source on homepage — keywords meta tag is short and focused
- [ ] `grep -rn "linkedin.com" src/` — all results point to `/company/hive-vault-arc`
- [ ] `/insights/blogs` either 301-redirects to `/blog` or is cleanly noindex
- [ ] Build passes

