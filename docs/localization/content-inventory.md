# Localization content inventory

This is the earlier full-site localization baseline, including its recorded CMS counts and French draft state. It is not a current dataset inventory or the simpler site's page count. The [11-page plan](../simple-v1-site-plan.md) governs target content; current locale availability comes from `src/i18n/config.ts` and approved CMS records. The new homepage presentation copy is in `src/data/studio-home.ts` for all four public locales.

## Git-owned content

- Global layout: metadata defaults, Organization/WebSite/Navigation JSON-LD, accessibility states.
- Shared UI: navigation, language switcher, footer, bottom CTA, FAQ controls, sliders, carousel
  controls, client-evidence labels, loading/error/empty/not-found states.
- Static views: Home shell, ARC, capability overviews, industries, portfolio, contact, privacy,
  legal, links, and five geo/service landing pages.
- Static data: FAQ collections, fallback capability copy, fallback editorial content, hero content,
  service guides, SEO keyword sets, and machine-readable descriptions.
- Form copy: labels, help text, validation messages, submission status, `locale`, `sourceUrl`, and
  `formIdentifier`.

## Sanity-owned content

| Type | Production count at audit | Localized fields |
|---|---:|---|
| `capability` | 6 | title, slug, summaries, narrative, lists, links, image alt, SEO |
| `caseStudy` | 3 | title, slug, industry label, narrative, modules, integrations, SEO, image alt |
| `employeeProfile` | 3 | slug, role, summary, story, experience, education, expertise, image alt, SEO |
| `post` | 5 | title, slug, subtitle, summary, sections, tags, sources labels, image alt, SEO |
| `newsArticle` | 1 | title, slug, subtitle, summary, sections, tags, sources labels, image alt, SEO |
| `perspective` | 2 | title, slug, subtitle, summary, sections, tags, sources labels, image alt, SEO |
| `researchReport` | 3 | title, slug, subtitle, summary, sections, keywords, source labels, image alt, SEO |

Total baseline: 23 published English documents.

The recorded localization baseline contained 23 corresponding unpublished French drafts and 23
translation metadata documents. Draft scaffolds are not approved translations. Public queries
must use the actual approved publication state after copy and slug review.

## Preserved values

- Document and asset IDs, dates, URLs, file assets, client and organization identities.
- Client logos and source images.
- Signed PDFs, exact client quotations, and their stored BCP 47 language tags.
- Operational classifications and visibility/order values.

## Publication gate

French content is public only when the French document is published and its
`translationStatus` is `approved`. The frontend never substitutes English content on a French
CMS route.
