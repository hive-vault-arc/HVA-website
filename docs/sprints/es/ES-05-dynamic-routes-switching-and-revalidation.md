# ES-05 — Dynamic routes, switching, and revalidation

**Prerequisites:** ES-02, ES-04  
**Owners:** engineering, Studio owner, SEO owner  
**Human gate:** content completeness sign-off

## Goal

Serve only approved Spanish dynamic content and make switching, cache invalidation, and SEO behavior locale-correct.

## Work

- Query Spanish dynamic collections and detail pages only for published approved `es` documents.
- Replace French-only fallback and route-switching special cases with translation-target-aware generic logic; do not create an ES fallback path.
- Build locale-specific revalidation tags and routes from the locale profile and approved targets.
- Require switcher options to be available only when the target document exists and is approved; never infer a Spanish slug from the current one.

## Acceptance criteria

- Missing Spanish content returns unavailable/not found and is unindexed.
- A case study, insight, or other dynamic link changes language only through its matching approved target.
- Revalidation affects the precise Spanish collection/detail path without damaging English/French caches.

## Rollback

Disable Spanish target routing and revalidation entries, remove Spanish from launch eligibility, and retain source cache behavior.
