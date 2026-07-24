# English–French localization audit

Updated: 2026-07-23

## Baseline

- Runtime: Next.js App Router 16.2.x, React 19.2.x, TypeScript, npm.
- CMS: standalone Sanity Studio 6.5.x, project `0zprc9fo`, dataset `production`.
- Public locales for this release: `en` and `fr`.
- English remains unprefixed. French uses `/fr`.
- Arabic and Spanish are intentionally paused and must not appear in navigation, metadata, or the sitemap.
- Machine endpoints (`/api/**`, `/ai/company`, `/indexnow-key.txt`, `/llms.txt`,
  `/llms-full.txt`) are not localized.

## Findings addressed by this implementation

- The previous locale implementation duplicated two pages and exposed incomplete `fr`, `ar`,
  and `es` URLs.
- The previous root layout hard-coded `lang="en"` and changed document language on the client.
- Internal links were direct `next/link` links and therefore could leave the active locale.
- Canonicals and sitemap alternates advertised translations that did not exist.
- Sanity documents had no language or translation workflow.
- Public GROQ queries did not filter language or approval status.
- Shared navigation, footer, forms, error states, accessibility labels, and metadata used
  hard-coded English strings.

## Decisions

- `next-intl` owns locale parsing, translated pathnames, navigation, and messages.
- `messages/en.json` is the source topology. `messages/fr.json` must contain exactly the same keys.
- URL segments live in `src/i18n/routing.ts`; components never concatenate translated routes.
- Static UI copy remains Git-owned.
- All seven public Sanity types use document-level localization.
- French CMS routes do not fall back to English. Missing French content is a true 404 and is not
  offered in the language switcher.
- French content must be both published and `translationStatus == "approved"`.
- Signed PDFs and exact client quotations remain in their stored language.

## Quality gate

- Message keys and ICU variables match.
- No `/en`, `/ar`, or `/es` URL is present in the sitemap.
- Every French page renders server-side `lang="fr"`.
- Every launched static route has reciprocal canonical and hreflang links.
- Dynamic alternates exist only when both documents are published and approved.
- No preview token is emitted into client code.
- English screenshots remain visually equivalent after the route migration.

## Implementation status

Completed on the protected `feature/en-fr-localization` branch:

- One shared `[locale]` App Router tree serves unprefixed English and `/fr` French routes.
- `next-intl` 4.13.3 owns routing, message loading, navigation, metadata, and exact-page
  language switching.
- Static copy, metadata, forms, errors, accessibility labels, alt text, and JSON-LD are present
  in matching English and French message catalogs.
- Internal string links pass through the central route manifest, including dynamic slugs,
  fragments, and query parameters.
- `/en/**` and legacy French capability URLs redirect to launched canonicals. `/ar/**` and
  `/es/**` return localized, controlled 404 responses.
- Every localized Sanity getter filters by locale and `translationStatus == "approved"`;
  French requests never retry in English.
- Draft Mode is server-only and returns `503` when `SANITY_PREVIEW_TOKEN` is not configured.
- Signed Sanity webhooks invalidate locale and document tags for both sides of a translation.

Production dataset state verified on 2026-07-23:

| State | Count |
|---|---:|
| Approved English documents | 23 |
| Unpublished French drafts | 23 |
| Translation metadata documents | 23 |
| Complete English–French associations | 23 |
| Published French documents | 0 |

French CMS drafts intentionally remain unpublished and unapproved until translation, fluent brand
review, legal review where applicable, and route preview are complete.

## Verification record

- Frontend: ESLint, TypeScript through the production build, 60 Vitest tests, and 10 applicable
  Playwright checks pass.
- Browser coverage: desktop and mobile navigation, exact route switching, missing translations,
  legal/contact routes, redirects, paused locales, sitemap resolution, 320/390/768/1440 widths,
  and 200% zoom.
- Frontend production build: 54 static generation units completed successfully.
- Client bundle scan: no configured preview token and no preview secret detected in `.next/static`.
- Studio: ESLint, Prettier, schema validation, and production build pass with zero schema warnings.
- The localization-compatible Studio schema and plugin are deployed at
  `https://hva.sanity.studio/`; the hosted authentication endpoint resolves successfully.
- Dataset verification is read-only; the repair dry-run reports zero required patches.
