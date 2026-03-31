# Translation Guide — H.V.A Website

> Research date: March 2026. Covers the current codebase state, the full i18n library landscape, what top-tier companies use, and a concrete recommendation for this project.

---

## 1. Where the Codebase Stands Today

The site already has locale-aware SEO pages at `src/app/[locale]/` (supporting `en | fr | ar | es`). Per `CLAUDE.md`, these are **separate static pages with hardcoded translated content objects** — they are NOT i18n wrappers over the main pages. They exist purely for hreflang SEO signals.

**Problems with the current approach:**
- Every string change must be duplicated across 4+ files manually.
- Adding a new locale means copy-pasting entire view files.
- No single source of truth for strings — copy drift is inevitable.
- Arabic RTL layout is not enforced dynamically (requires manual `dir="rtl"` per page).
- No way to hand strings to a translator without giving them React files.

---

## 2. The i18n Library Landscape (2026)

### The main contenders

| Library | Approach | Bundle impact | Type safety | App Router support | Best for |
|---|---|---|---|---|---|
| **next-intl** | Runtime JSON loading | ~2 KB (gzip) | Good | Native, first-class | Fastest setup, most Next.js-idiomatic |
| **Paraglide JS** | Compile-time codegen | ~2 KB + tree-shakable | Excellent (generated fns) | Yes (plugin) | Max performance, type-safe DX |
| **LinguiJS** | Compile-time extraction | ~6 KB | Good | Yes (manual setup) | Large teams, mature translation workflows |
| **react-i18next / next-i18next** | Runtime JSON loading | ~8 KB | Moderate | Partial (Pages Router first) | Teams already on i18next ecosystem |
| **react-intl** | Runtime | ~12 KB | Moderate | Manual setup | Mature ICU message format needs |
| **Intlayer** | Per-component TS objects | ~3 KB | Excellent | Native | Content co-located with components |

---

## 3. Deep Dive: The Two Best Options

### Option A — `next-intl` ⭐ Recommended for this project

**What it is:** Purpose-built for Next.js App Router. Loads JSON translation files per locale, supports Server Components natively, and provides locale-aware `Link`, `redirect`, and `useRouter` utilities out of the box.

**Why it wins for HIVA:**
- Drop-in: one plugin in `next.config.ts`, one middleware file, JSON files per locale.
- Translations in Server Components add **zero bytes** to the client bundle (rendered server-side).
- The Node.js official website (`nodejs.org`) migrated to next-intl + App Router — a strong signal.
- Watershed.com (Y Combinator climate tech) uses it in production.
- 2 KB client overhead vs 8–12 KB for older alternatives.
- Full ICU message format support (plurals, dates, numbers, currency).
- Works with the existing `[locale]` routing already in `src/app/[locale]/`.

**Bundle size reality:**
- Client-rendered strings: ~2 KB runtime overhead.
- Server-rendered strings (RSC): 0 KB client overhead.
- Since most of this site is RSC-heavy, the real cost is near zero.

**Tradeoff:** Strings live in JSON files, not TypeScript — you lose compile-time key checking unless you add `ts-i18n` or use next-intl's experimental TypeScript plugin.

---

### Option B — Paraglide JS (if bundle size is critical)

**What it is:** A compiler-based i18n library. Instead of loading JSON at runtime, it generates individual TypeScript functions for each translation key at build time. Every key becomes a typed function — full autocomplete, compile-time errors.

**Performance:**
- Up to **70% smaller i18n bundle** vs runtime libraries (benchmark: 47 KB vs 205 KB).
- Unused strings are **tree-shaken away** at build time — you only ship what you actually use.
- No runtime parsing overhead.

**Why it's impressive:**
```ts
// Instead of t('hero.title') as a string at runtime...
import { m } from '../paraglide/messages';
// m.hero_title() — fully typed function, dead-code eliminated if unused
```

**Tradeoff for HIVA:**
- More complex build pipeline (Vite/webpack plugin + codegen step).
- Smaller community than next-intl.
- JSON → function compilation adds a build step that can surprise CI pipelines.
- If you ever need runtime-dynamic translations (user-generated content), Paraglide is awkward.

**Best suited for:** Performance-obsessed products, or teams that want compile-time guarantees above all else.

---

## 4. What Top Companies Actually Use

| Company | Approach |
|---|---|
| **Node.js** (`nodejs.org`) | `next-intl` + Next.js App Router |
| **Watershed** | `next-intl` |
| **Notion** | Smartling TMS + Contentful CMS; custom React i18n layer |
| **Stripe** | Custom internal i18n system; XLIFF 2.0 format for API strings |
| **Vercel** | No public disclosure; internal Next.js i18n routing |
| **Linear** | English-only product (no public i18n) |
| **Shopify** | Custom Ruby/React i18n, `react-i18next` family for partner apps |
| **Airbnb** | `react-intl` (they open-sourced it); ICU message format |

**Pattern observed across top-tier companies:**
1. They separate **code i18n** (the library) from **translation management** (the TMS).
2. Strings live in files the library reads — but translators work in a dedicated TMS, not GitHub.
3. Enterprise teams use CI/CD pipelines that auto-sync strings to/from the TMS on every commit.

---

## 5. Translation Management Systems (TMS)

The library handles runtime display. The TMS handles the human/AI workflow of actually translating strings. These are separate concerns.

| TMS | Best for | Key features |
|---|---|---|
| **Crowdin** | Open source + community | Git integration, 60+ file formats, in-context editor, community contributions, free for OSS |
| **Lokalise** | Developer-first startups | Sleek UI, AI translation suggestions, Figma integration, 50+ formats, CI/CD hooks |
| **Phrase** | Enterprise / large teams | Full CI/CD automation, string extraction → delivery pipeline, best for large agile teams |
| **Smartling** | Enterprise scale (Notion uses it) | Neural MT, TM leverage, highest quality at scale |
| **IntlPull** | next-intl-native workflow | CLI sync, AI translation, designed specifically around next-intl JSON format |

**For HIVA at current scale (4 locales, small team):**
- Start with **Crowdin** (free for public repos, solid Git integration) or **Lokalise** (better DX, free tier available).
- Neither requires changing your library choice.

---

## 6. The Recommended Architecture for HIVA

### Step 1: Keep `[locale]` routing, but make it real

The existing `src/app/[locale]/` structure is already correct. What needs to change is the content layer.

**Current state:**
```
src/app/[locale]/page.tsx  ← hardcoded translated JSX objects
```

**Target state:**
```
src/app/[locale]/page.tsx  ← thin shell (metadata + JsonLd)
src/views/LocaleHome.tsx   ← renders via next-intl useTranslations()
messages/
  en.json
  fr.json
  ar.json
  es.json
```

### Step 2: Middleware for locale detection

`next-intl` provides a middleware that:
- Reads `Accept-Language` headers.
- Redirects `/` → `/en` (or detected locale).
- Sets `locale` in the request context for all pages.

### Step 3: RTL support for Arabic

```tsx
// src/app/[locale]/layout.tsx
const dir = locale === 'ar' ? 'rtl' : 'ltr';
return <html lang={locale} dir={dir}>...</html>
```

This is currently missing and is a real UX bug for Arabic visitors.

### Step 4: Server Components first

All static content (hero text, service descriptions, nav labels) should use `getTranslations()` in Server Components — zero client bundle cost. Only interactive components that need locale at runtime (e.g. a language switcher dropdown) use `useTranslations()` client-side.

---

## 7. Migration Path (Phased)

### Phase 1 — Install and scaffold (1–2 days)
```bash
npm install next-intl
```
- Add `next-intl` plugin to `next.config.ts`.
- Create `i18n/routing.ts` with locale config.
- Add `middleware.ts` for locale detection/redirect.
- Create `messages/en.json` — start with nav strings only.

### Phase 2 — Migrate static strings (3–5 days)
- Extract all hardcoded strings from `src/views/Home.tsx`, `Services.tsx`, `Contact.tsx`, etc. into `messages/en.json`.
- Replace with `useTranslations()` / `getTranslations()`.
- Delete the old hardcoded locale objects from `src/app/[locale]/page.tsx`.

### Phase 3 — Translate (ongoing)
- Export `messages/en.json` to chosen TMS (Crowdin/Lokalise).
- Have FR/AR/ES translated.
- Import translated JSON files back.
- Add `dir="rtl"` support for AR.

### Phase 4 — Type safety (optional, +1 day)
Enable next-intl's TypeScript plugin in `tsconfig.json` to get compile-time key checking:
```json
{
  "plugins": [{ "name": "next-intl/plugin" }]
}
```

---

## 8. What NOT to Do

- **Do not use `next-i18next`** — it is built for the Pages Router and adds complexity for App Router.
- **Do not use Google Translate widget** — it breaks SSR, hurts SEO, and produces low-quality Arabic/French.
- **Do not keep hardcoding translations as TypeScript objects** — it looks like i18n but is just copy-paste maintenance debt.
- **Do not ship all locales in one bundle** — next-intl loads only the active locale's JSON per request.
- **Do not skip the TMS** — once you have 200+ strings across 4 languages, manual JSON editing becomes error-prone.

---

## 9. Quick Decision Chart

```
Are you starting fresh or refactoring?
│
├── Need fastest setup → next-intl
│
├── Bundle size is your #1 priority → Paraglide JS
│
├── Team already uses react-i18next → stick with next-i18next (but accept App Router friction)
│
└── Translators, not developers, manage all content → consider a headless CMS with i18n support
    (e.g. Sanity + next-intl, or Contentful + next-intl)
```

**For H.V.A: use `next-intl`.** The codebase is App Router native, already has `[locale]` routing, and next-intl is the least-friction path to a real multilingual site with proper RTL support, zero client bundle cost for server-rendered strings, and a clean developer experience.

---

## Sources

- [next-intl official docs](https://next-intl.dev/)
- [next-intl complete guide 2026](https://intlpull.com/blog/next-intl-complete-guide-2026)
- [Best i18n Libraries for Next.js & React Native in 2026 — DEV Community](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f)
- [Paraglide JS — inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- [Paraglide JS benchmark](https://inlang.com/m/gerre34r/library-inlang-paraglideJs/benchmark)
- [Why I Replaced i18next with Paraglide.js](https://dropanote.de/en/blog/20250726-why-i-replaced-i18next-with-paraglide-js/)
- [Paraglide.js — Type-Safe, Compiler-Based i18n (Medium)](https://medium.com/@janszotkowski/paraglide-js-the-type-safe-compiler-based-i18n-library-you-should-know-about-53f5d242b6bb)
- [The Best i18n Libraries for Next.js App Router in 2025 (Medium)](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a)
- [next-i18next vs next-intl vs Intlayer — Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Lingui vs i18next — Lingui](https://lingui.dev/misc/i18next)
- [Localization at Notion retrospective — JOEL Localization](https://www.joellocalization.com/localization-at-notion/)
- [Lokalise vs Phrase vs Crowdin vs IntlPull comparison 2025](https://intlpull.com/blog/lokalise-vs-phrase-vs-crowdin-vs-intlpull-2025)
- [Next.js official i18n guide](https://nextjs.org/docs/app/guides/internationalization)
- [Complete guide to i18n in Next.js — LogRocket](https://blog.logrocket.com/complete-guide-internationalization-nextjs/)
- [Crowdin platform](https://crowdin.com/)
