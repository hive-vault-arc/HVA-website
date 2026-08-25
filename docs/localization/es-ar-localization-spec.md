# Spanish and Arabic localization specification

Status: implementation in progress — release-gated  
Owners: Hive Vault Arc frontend, Sanity Studio, Spanish editorial review, Arabic editorial review, legal review  
Last reviewed: 2026-08-24

## 1. Purpose and release boundary

This specification adds first-class Spanish and Arabic support to the existing English/French `next-intl` architecture without enabling either locale until its complete public experience is reviewed.

- English remains the unprefixed default.
- French remains at `/fr`; this specification does not change its current public behavior.
- Spanish will launch at `/es`; Arabic will launch at `/ar`.
- A locale is not publicly launched merely because it appears in Studio or the language switcher. It launches only after all required static copy and current approved CMS content are approved, published, tested, and indexed safely.
- No Spanish or Arabic URL may show English CMS editorial copy as a fallback. Missing translations are unavailable, unlinked, unindexed, and return the existing localized not-found behavior.
- This work does not localize machine endpoints (`/ai/company`, `/llms.txt`, `/llms-full.txt`, API routes, or IndexNow), original signed evidence, source files, or exact quotations.

## 2. Live baseline and source of truth

The current public website uses `next-intl` with `en` and `fr` in `src/i18n/config.ts`, `src/i18n/routing.ts`, `src/i18n/request.ts`, and the `[locale]` App Router tree. English/French language handling is not yet generic: route alternates, metadata, revalidation, `TranslationTargets`, fallback helpers, and several source-data branches still assume two locales.

This document supersedes the implementation detail in `docs/spanish-localization-implementation-guide.md`. The French sprint archive is historical evidence of scope, not a source of current code patterns. In particular, it predates the live `src/proxy.ts`, current message catalogue, and the present Sanity translation data.

The current public message source remains `messages/en.json`. Sanity document localization remains document-level, linked by the existing `translation.metadata` group; no `titleEs`, `titleAr`, or language-specific field copies are permitted.

## 3. Locale profile contract

All technical locale behavior must come from one typed `LocaleProfile` map rather than language-specific conditionals.

| App / CMS code | Direction | Formatting locale | Open Graph locale | Public prefix | Editorial standard |
| --- | --- | --- | --- | --- | --- |
| `en` | `ltr` | `en-GB` | `en_US` | none | Existing English |
| `fr` | `ltr` | `fr-FR` | `fr_FR` | `/fr` | Existing French |
| `es` | `ltr` | `es-ES` | `es_ES` | `/es` | Spain-oriented Spanish |
| `ar` | `rtl` | `ar-MA` | `ar_MA` | `/ar` | Modern Standard Arabic with Moroccan context |

Future implementation extends `AppLocale` to `en | fr | es | ar`, and derives `APP_LOCALES`, locale labels, formatting, direction, prefixes, Open Graph values, revalidation tags, sitemaps, and alternates from the same map. English remains `x-default`.

`localePrefix: 'as-needed'`, disabled locale detection, and disabled locale cookies remain unchanged. Visitors choose a language deliberately through its URL or the switcher.

## 4. Routes, navigation, and content availability

`docs/localization/es-ar-route-manifest.md` is the canonical map for every configured static, dynamic, legal, and geo-service route. Components must use the localized navigation and route-manifest helpers; they must not concatenate translated URL segments.

For a dynamic document:

1. The public Sanity query accepts only the requested language and `translationStatus == 'approved'` outside Draft Mode.
2. The query exposes approved `translationTargets` with language and translated slug.
3. The page registers only those actual targets with `TranslationAvailability`.
4. The switcher enables the language only when that target exists. It never reuses the current slug in another locale.
5. A missing target has no alternate, no sitemap URL, and no localized fallback page.

Collections in Spanish and Arabic contain only approved content in the requested language. Before launch, the current approved English source set must have one approved, published partner in the target locale or a documented owner-approved exclusion that also prevents public launch. Existing French fallback code is not copied to `es` or `ar`.

## 5. Copy, CMS, and review workflow

### Git-owned copy

`messages/es.json` and `messages/ar.json` are created from `messages/en.json`, preserving every object key, array position, rich-text marker, and ICU variable. They include static page copy, metadata, JSON-LD labels, form/help/error states, aria labels, image-independent alt text, empty states, and locale names.

The localisation test suite must reject missing keys, type/array differences, missing placeholders, empty translated values, and untranslated English leakage outside a narrow protected-term allowlist. Run `npm run i18n:validate -- es` and `npm run i18n:validate -- ar` against reviewed candidate files before those locales can join `PUBLIC_LOCALES`.

### Sanity-owned copy

The live inventory must cover these localized types: `capability`, `industry`, `employeeProfile`, `caseStudy`, `post`, `newsArticle`, `perspective`, and `researchReport`. The Studio workstream must:

- add `es` and `ar` to the shared supported-language configuration;
- create translations through the Translations action or an idempotent migration that appends to existing metadata groups;
- create drafts with `translationStatus: 'draft'`, then move them through review, approval, and publication;
- translate slugs, visitor-facing references, body Portable Text, SEO, captions, and alt text;
- preserve exact metrics, dates, source links, IDs, assets, product/client/technology names, and original-language evidence;
- remap localized references to their matching Spanish or Arabic target where one exists;
- update Studio preview URLs from the shared route manifest.

AI may prepare protected-token drafts and QA suggestions. It must never approve, publish, rewrite signed quotations, alter evidence, or substitute human legal/brand review. Spain-based technical editorial review is required for Spanish. Arabic review requires a qualified Modern Standard Arabic technical editor and a Morocco-market reviewer. Privacy and legal pages require qualified legal review.

## 6. Arabic RTL and typography requirements

The `[locale]` layout renders `lang="ar" dir="rtl"` on the server. No client-side direction switch is allowed. Add a dedicated Arabic UI and display typeface with real weights; do not rely on Latin-only Manrope/Newsreader, synthetic bold, or synthetic italic.

Shared layout, navbar, menus, accordion rows, buttons, form fields, cards, pagination, breadcrumbs, and fixed/overlapping panels must use logical spacing/alignment where their meaning is directional. Use `text-align: start`, `margin-inline-*`, `padding-inline-*`, and logical borders instead of left/right overrides wherever possible.

Mirror reading order and semantic forward/back arrows, chevrons, breadcrumb separators, and directional disclosure placement. Do not mirror logos, company marks, photographs, client/product proof, code, charts, technical identifiers, phone numbers, URLs, email addresses, dates, numerical tables, or external-link symbols. Preserve source-language evidence with its stored `lang` and `dir` attributes.

Arabic UI text uses a minimum readable 16px body size, appropriate Arabic line height, and no forced Latin letter spacing. Technical strings with LTR content must use isolated LTR direction so surrounding Arabic text does not reorder them.

## 7. Metadata, indexing, and cache contract

Every launched static route has a self-canonical and reciprocal `hreflang` links for currently launched locales plus `x-default` English. Dynamic alternates exist only for actual approved translation targets. Manual alternate generation remains in the route metadata helpers; `next-intl` automatic alternates remain disabled.

Localized metadata and JSON-LD must use the locale profile, including page title/description, Organization and WebSite descriptions, founder role labels, service names, offer catalog text, navigation names, dates, numbers, and Open Graph locale. Assets and proof files retain their original language where required.

The sitemap includes a locale only after its complete release gate passes. Sanity webhooks and cache tags must revalidate all four locale tag variants generically, including changes to `translation.metadata`. Before public release, `/es/**` and `/ar/**` retain controlled 404 behavior and are absent from navigation, metadata alternates, and sitemap output.

## 8. Release gates and rollback

### Pre-launch gate for each locale

- Live Sanity inventory completed from the production dataset; historical French record counts are not reused.
- Every current approved English CMS source has one approved published target-language document, or the release is stopped.
- Message parity and protected-term tests pass.
- All route, switcher, canonical, hreflang, JSON-LD, sitemap, and revalidation tests pass.
- Spanish or Arabic editor, Morocco-market reviewer for Arabic, and legal reviewer approve required content.
- Visual, keyboard, screen-reader, LTR/RTL, responsive, and reduced-motion checks pass at 390x844, 820x1180, 1440x1000, and 1920x1080.

### Rollback

If a post-release locale defect risks incorrect language, missing content, broken routes, SEO misindexing, or RTL usability, remove only the affected locale from public locale configuration, alternates, switcher options, sitemap, and cache tags; retain approved CMS documents and translation groups. English and French remain unaffected. Do not delete translation metadata or published content as a rollback mechanism.

## 9. Non-goals

- No public route, language, CMS mutation, Studio deployment, translation, or publication is part of this documentation phase.
- No automatic browser redirect, locale cookie, translation service, or new localization dependency is introduced.
- No change is made to existing English/French public copy or current design system except during later RTL-ready implementation work.
