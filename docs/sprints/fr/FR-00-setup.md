# FR-00 — Setup: French Translation Infrastructure

**Locale:** `fr`
**Depends on:** Nothing — do this first before any other FR sprint
**Blocks:** All FR-01 through FR-15 sprints

---

## Goal

Install `next-intl`, wire up French locale routing, and create the empty `messages/fr.json` scaffold that all page sprints will populate.

---

## Files to create / modify

| Action | File |
|---|---|
| Install | `next-intl` npm package |
| Create | `src/i18n/routing.ts` |
| Create | `src/i18n/request.ts` |
| Modify | `next.config.ts` — add next-intl plugin |
| Create | `src/middleware.ts` — locale detection + redirect |
| Create | `messages/en.json` — empty scaffold with section keys |
| Create | `messages/fr.json` — empty scaffold, same keys, values TBD |
| Modify | `src/app/[locale]/layout.tsx` — add `lang` and `dir` attributes |

---

## Steps

### 1. Install
```bash
npm install next-intl
```

### 2. `src/i18n/routing.ts`
```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'ar', 'es'],
  defaultLocale: 'en',
});
```

### 3. `src/middleware.ts`
```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

### 4. `next.config.ts` — wrap existing config
```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl({ ...existingConfig });
```

### 5. `messages/fr.json` scaffold
Create the file with all top-level section keys but empty string values:
```json
{
  "nav": {},
  "footer": {},
  "home": {},
  "services": {},
  "servicesInDetail": {},
  "solutionPrograms": {},
  "contact": {},
  "about": {},
  "portfolio": {},
  "industries": {},
  "productsSystems": {},
  "arc": {},
  "blogIndex": {},
  "caseStudies": {},
  "insightsHub": {},
  "insightsCollection": {}
}
```

### 6. `src/app/[locale]/layout.tsx`
Ensure the `<html>` tag gets `lang` and `dir` from the locale param:
```tsx
export default function LocaleLayout({ children, params: { locale } }) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return <html lang={locale} dir={dir}>{children}</html>;
}
```

---

## Acceptance criteria
- [ ] `npm run dev` still starts without errors
- [ ] Visiting `/fr` serves the French locale page
- [ ] Visiting `/` redirects to `/en` (default locale)
- [ ] `messages/fr.json` exists with all section keys
- [ ] TypeScript has no new errors (`npx tsc --noEmit`)
