# Sprint 01 — Critical SEO Foundations

> **Priority:** CRITICAL — Must be done first. All canonical URLs, sitemap, robots.txt, and OG tags are broken without these fixes.
> **Estimated effort:** 1–2 hours
> **Blocking:** All other sprints depend on NEXT_PUBLIC_SITE_URL being correct.

---

## What This Sprint Is

Two foundational fixes that, if missing, make every other SEO effort irrelevant:

1. The `.env.example` file still references the Vercel preview domain `hiva-nine.vercel.app`. The production environment variable `NEXT_PUBLIC_SITE_URL` is not set in Vercel, which means `src/lib/seo.ts` falls back to the wrong domain for ALL canonical URLs, sitemap entries, Open Graph URLs, and JSON-LD `@id` values.
2. `@vercel/analytics` is not installed — there is no page-view or web-vitals tracking.

---

## Tasks

### Task 1.1 — Fix `.env.example`

**File:** `/.env.example`

Find:
```
NEXT_PUBLIC_SITE_URL=https://hiva-nine.vercel.app
```

Replace with:
```
NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com
```

> Note: `.env.example` is committed to the repo as documentation. The actual value must also be set in Vercel Dashboard (see `outside-configuration.md`).

---

### Task 1.2 — Install `@vercel/analytics`

Run in the project root:
```bash
npm install @vercel/analytics
```

---

### Task 1.3 — Wire `@vercel/analytics` into the root layout

**File:** `src/app/layout.tsx`

Add this import at the top:
```typescript
import { Analytics } from '@vercel/analytics/react';
```

Inside the `<body>` element, add `<Analytics />` as the last child before `</body>`:
```tsx
<body>
  {/* ... existing children ... */}
  <Analytics />
</body>
```

The `Analytics` component is lightweight, loads asynchronously, and does not block rendering.

---

### Task 1.4 — Verify `src/lib/seo.ts` fallback

**File:** `src/lib/seo.ts`

Confirm the `SITE_URL` line reads:
```typescript
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivevaultarc.com';
```

Update the fallback if it still points to `hiva-nine.vercel.app`.

---

## Acceptance Criteria

- [ ] `.env.example` shows `NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com`
- [ ] `seo.ts` fallback URL is `https://hivevaultarc.com`
- [ ] `@vercel/analytics` appears in `package.json` under `dependencies`
- [ ] `<Analytics />` is rendered in `src/app/layout.tsx` inside `<body>`
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] Running `grep -r "hiva-nine.vercel.app" src/` returns zero results
- [ ] `package.json` contains `"@vercel/analytics"` in dependencies
- [ ] Build passes locally
- [ ] After Vercel deployment with correct env var set (see `outside-configuration.md`), visiting `https://hivevaultarc.com/sitemap.xml` shows URLs starting with `https://hivevaultarc.com/`

