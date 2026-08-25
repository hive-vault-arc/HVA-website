# Spanish and Arabic localization inventory template

Status: execution template. Complete it with a fresh read-only inventory of the production Sanity dataset before any schema or content mutation. Do not reuse historical French counts.

## Inventory rules

- Record the frontend commit, Studio commit, Sanity project ID, dataset, inventory timestamp, and operator.
- Count only currently published, approved English source documents for rollout completeness.
- Record existing French, Spanish, Arabic, orphan, duplicate, draft, and unapproved records separately.
- Every expected Spanish/Arabic document must join the source document's existing `translation.metadata` group. Never create a second group for the same English source.
- Keep asset IDs, source files, exact quotes, dates, metrics, URLs, client/partner names, product names, and IDs unchanged unless a source correction is independently approved.

## Git-owned content checklist

| Area | Inventory owner | Spanish | Arabic / RTL |
| --- | --- | --- | --- |
| Message catalogue and ICU variables | Frontend | Full `es.json` parity | Full `ar.json` parity |
| Navigation, footer, mobile menu, locale switcher | Frontend | Labels and available states | Labels, RTL order, directional icons |
| Static page views and local data | Frontend | Copy, alt text, metadata | Copy, RTL layout, alt text, metadata |
| Forms, errors, empty/loading/not-found states | Frontend | Copy and validation | Copy, RTL field alignment and LTR data isolation |
| Metadata, JSON-LD, SEO routes, sitemap | Frontend | `es-ES` / `es_ES` | `ar-MA` / `ar_MA` |
| Revalidation and Draft Mode guards | Frontend / Studio | Locale-generic tags | Locale-generic tags |
| Fonts and shared CSS | Frontend | Existing LTR behavior | Arabic fonts, logical properties, no mirroring of proof |

## Sanity-owned content checklist

| Type | English source count | Spanish approved/published | Arabic approved/published | Reference remapping verified | Reviewer |
| --- | ---: | ---: | ---: | --- | --- |
| `capability` |  |  |  |  |  |
| `industry` |  |  |  |  |  |
| `employeeProfile` |  |  |  |  |  |
| `caseStudy` |  |  |  |  |  |
| `post` |  |  |  |  |  |
| `newsArticle` |  |  |  |  |  |
| `perspective` |  |  |  |  |  |
| `researchReport` |  |  |  |  |  |

## Per-record review fields

For each source record, record the English `_id`, source slug, translation-metadata `_id`, target `_id`, target slug, publication state, approval state, related translated references, SEO review, image alt/caption review, evidence handling, reviewer, and preview URL result.

## Completeness gate

Spanish or Arabic may become public only when every row has matching approved/published counts, every expected translation group is unique and reciprocal, all Git-owned content has passed parity checks, and all planned exclusions are resolved. A missing record blocks the whole-locale launch.
