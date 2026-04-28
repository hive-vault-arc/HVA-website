# Sprint 07 — Locale Content Audit (/fr, /ar, /es)

> **Priority:** MEDIUM — Thin or untranslated locale pages are a duplicate content risk. Google may penalize or ignore them. Either complete them properly or deindex them.
> **Estimated effort:** 4–8 hours (depends on translation quality needed)
> **Depends on:** Sprint 01 (SITE_URL), Sprint 02 (schema helpers)

---

## What This Sprint Is

The site has multilingual routing under `src/app/[locale]/` (English default + `/fr`, `/ar`, `/es`). The risk: if these locale pages exist but contain untranslated content, identical English text, or thin pages with no unique value, Google will treat them as duplicate content.

This sprint audits every locale page, defines a strategy, and either completes the translation or cleanly deindexes the locale.

---

## Pre-Work: Audit Existing Locale Pages

Before coding, manually check each locale route in the browser:

| Route | Check | Status |
|-------|-------|--------|
| `/fr` | Is the homepage in French? | Audit |
| `/fr/capabilities` | French content? | Audit |
| `/fr/arc` | French content? | Audit |
| `/ar` | Is the homepage in Arabic (RTL)? | Audit |
| `/ar/capabilities` | Arabic content? | Audit |
| `/es` | Is homepage in Spanish? | Audit |

Fill in status as: ✅ Translated / ⚠️ Partial / ❌ Untranslated / 404

---

## Decision Matrix

After the audit, apply one of these strategies per locale:

**Strategy A — Locale is fully translated → Ship it**
- Add `hreflang` tags (see Task 7.3)
- Ensure locale-specific metadata (title, description) is translated
- Add the locale pages to sitemap

**Strategy B — Locale is partially translated → Complete or deindex**
- Either complete the translation (Task 7.2) or
- Set `robots: { index: false }` on all locale pages until translation is complete

**Strategy C — Locale exists in code but has no real content → Deindex or remove**
- Add noindex to the route group
- Or delete the `[locale]` route files for that specific locale and redirect to English

---

## Tasks

### Task 7.1 — Add `hreflang` tags to all translated pages

**File:** `src/app/layout.tsx` (or per-page metadata where locale is known)

For any page that has a translated equivalent, add `hreflang` alternates:

```typescript
// In page-level metadata (e.g., homepage):
alternates: {
  canonical: absoluteUrl('/'),
  languages: {
    'en': absoluteUrl('/'),
    'fr': absoluteUrl('/fr'),
    'ar': absoluteUrl('/ar'),
    'es': absoluteUrl('/es'),
    'x-default': absoluteUrl('/'),
  },
},
```

> **Only add hreflang for locales that have actual translated content.** If `/ar` has no Arabic content, do not include it in hreflang — that makes things worse.

---

### Task 7.2 — Fix locale-specific metadata

**Files:** `src/app/[locale]/page.tsx` and related locale pages

Ensure each locale page has a translated `title` and `description` in its metadata:

```typescript
// For /fr:
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  if (locale === 'fr') {
    return {
      title: 'Hive Vault Arc — Conseil en IA et Transformation Digitale | Maroc',
      description: 'H.V.A accompagne les entreprises marocaines et françaises dans leur transformation digitale grâce à l\'IA. Agents WhatsApp, ARC Program, développement SaaS.',
      // ... canonical, OG
    };
  }
  
  if (locale === 'ar') {
    return {
      title: 'هايف فولت آرك — استشارات الذكاء الاصطناعي والتحول الرقمي | المغرب',
      description: 'نساعد الشركات المغربية والعالمية على التحول الرقمي بالذكاء الاصطناعي. وكلاء واتساب، برامج ARC، وتطوير SaaS.',
      // ...
    };
  }
  
  // Spanish...
}
```

---

### Task 7.3 — RTL support for Arabic pages

**File:** `src/app/[locale]/layout.tsx` (if it exists) or the root layout

For `/ar` locale, the HTML `dir` attribute must be `rtl`:

```tsx
// In the layout that wraps locale-specific pages:
const dir = locale === 'ar' ? 'rtl' : 'ltr';

return (
  <html lang={locale} dir={dir}>
    <body>{children}</body>
  </html>
);
```

Without this, Arabic text renders incorrectly in RTL languages.

---

### Task 7.4 — Add locale pages to sitemap (only translated ones)

**File:** `src/app/sitemap.ts`

Add completed locale pages to the sitemap. Only include locales that are actually translated:

```typescript
// Add these only for locales with real content:
{ url: absoluteUrl('/fr'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
{ url: absoluteUrl('/fr/capabilities'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
// ... etc for each translated route
```

---

### Task 7.5 — Deindex incomplete locales

For any locale where translation is not complete:

**Option A — Noindex the entire locale route group:**

```typescript
// In src/app/[locale]/layout.tsx:
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const incompleteLocales = ['es']; // adjust based on audit
  
  if (incompleteLocales.includes(locale)) {
    return { robots: { index: false, follow: false } };
  }
  
  return {};
}
```

**Option B — Add locale to robots.txt disallow:**

```typescript
// In robots.ts, add to disallow:
disallow: ['/es/', '/api/', '/_next/'],
```

---

### Task 7.6 — Verify locale-specific OG and Twitter images

Each locale page's Open Graph image should ideally be in the appropriate language. At minimum, ensure the `og:locale` meta tag is correct:

```typescript
openGraph: {
  locale: locale === 'fr' ? 'fr_FR' : locale === 'ar' ? 'ar_MA' : locale === 'es' ? 'es_ES' : 'en_US',
  // ...
}
```

---

## Acceptance Criteria

- [ ] Audit complete: each locale marked as ✅ Translated / ⚠️ Partial / ❌ Untranslated
- [ ] `hreflang` tags added for all fully-translated locale pages
- [ ] Each translated locale page has a locale-specific `title` and `description`
- [ ] Arabic pages have `dir="rtl"` on the `<html>` element
- [ ] Untranslated locales are either noindexed or removed
- [ ] Sitemap includes only translated locale pages
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] View source on `/fr` — `<html lang="fr">` and French title/description present
- [ ] View source on `/ar` — `<html lang="ar" dir="rtl">` and Arabic title present
- [ ] `hreflang` alternate links appear in `<head>` of translated pages
- [ ] Google Search Console (after deployment) — no "Alternate page with hreflang" errors
- [ ] Build passes

