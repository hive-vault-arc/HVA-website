# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Next.js)
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Run all Vitest tests
npx vitest run src/components/Navbar.test.tsx  # Run a single test file
npx tsc --noEmit   # Type-check without building (exclude test files for clean output)
```

> Note: `tsc --noEmit` will show pre-existing errors in `Navbar.test.tsx` and `Contact.test.tsx` due to missing Vitest global type config — these are not regressions.

## Architecture

### Page → View split

Every route in `src/app/` is a thin shell that owns **metadata + JSON-LD schema**. The actual UI lives in `src/views/`. Example: `app/services/page.tsx` defines metadata and `<JsonLd>` then renders `<Services />` from `views/Services.tsx`. Don't put UI in `app/` pages.

### SEO layer

All SEO primitives live in `src/lib/seo.ts`:
- `buildPageMetadata()` — builds `Metadata` objects (OG, Twitter, canonical, hreflang alternates)
- `GLOBAL_KEYWORDS` — shared keyword array included on every page
- `mergeKeywords()` — deduplicates keyword arrays

Structured data is injected via `<JsonLd data={...} />` directly in page components. The root organization schema (LocalBusiness + ProfessionalService) is defined once in `app/layout.tsx` and referenced by `@id` (`${SITE_URL}/#organization`) on child pages.

### Blog system

Blog posts are **TypeScript objects** in `src/lib/blog.ts` — there is no CMS or markdown. Each post has typed `sections: ContentSection[]` (paragraph, heading, subheading, pullquote, stat-block, list) plus `faqs`, `sources`, and `tags`. The `BlogPost` type is the source of truth. To add a post, append to the `POSTS` array; `getAllPosts()` / `getPostBySlug()` are the only consumers.

### Locale routes

`src/app/[locale]/` handles SEO-targeted pages for `en | fr | ar | es`. These are **separate static pages** with hardcoded translated content objects — they are not i18n wrappers over the main pages. The main pages (`/`, `/services`, etc.) are English-default; the locale routes are duplicate content with hreflang signals pointing back to them.

### Animation quality system

`src/lib/animationQuality.ts` exports `useAnimationQuality()` which returns a config tier (`high | medium | low`) based on device signals (RAM, CPU cores, `prefers-reduced-motion`, data-saver). Components that use WebGL (Plasma), Spline 3D, or heavy Framer Motion animations should consume this hook and reduce/disable effects at lower tiers. At `medium` and `low`, Spline is disabled.

### CSP constraints

`next.config.ts` sets strict security headers. `'unsafe-inline'` and `'unsafe-eval'` in `script-src` are required by **GSAP** and **Framer Motion** internals — do not remove them. `font-src 'self'` works because `next/font` self-hosts Google Fonts at build time.

### Tailwind color system

Custom palette in `tailwind.config.js`:
- `primary` → `#2563EB` (brand blue)
- `secondary` → `#475569` (slate-600, muted text)
- `tertiary` → `#0F172A` (slate-900, dark backgrounds, CTA buttons)
- `neutral` → `#F8FAFC` (page background)
- `purple` → legacy alias mapped to the primary blue scale (backward compat only — use `primary` for new work)

### Skills

Project-level Claude Code skills are in `.claude/skills/`: `ai-seo`, `programmatic-seo`, `schema-markup`. These can be invoked with `/ai-seo`, `/programmatic-seo`, `/schema-markup`.
