# AR-06 — Dynamic routes, switching, and revalidation

**Prerequisites:** AR-02, AR-05  
**Owners:** engineering, Studio owner, SEO owner  
**Human gate:** CMS completeness and dynamic-route review

## Goal

Make dynamic Arabic routes strict, target-aware, RTL-correct, and cache-safe without public launch.

## Work

- Query only published approved Arabic documents and Arabic slugs for dynamic collections, details, related content, and geo-service pages.
- Make locale switching depend only on approved Sanity `translationTargets`; a missing Arabic target is unavailable and never guessed.
- Generate Arabic revalidation tags, canonical data, and dynamic paths from central locale/profile utilities.
- Ensure server-rendered Arabic dynamic documents retain `lang="ar"` and `dir="rtl"` while source-language proof remains unmirrored.

## Acceptance criteria

- Missing Arabic documents return unavailable/not found and remain unindexed.
- Every switch from a dynamic source leads to its matching approved Arabic partner or presents no Arabic option.
- Arabic revalidation updates only intended Arabic paths and does not invalidate unrelated locales.

## Rollback

Disable Arabic dynamic routing/launch eligibility and remove affected cache tags; keep existing language caches and links stable.
