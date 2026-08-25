# AR-08 — Controlled public launch

**Prerequisites:** AR-07 approved  
**Owners:** product owner, engineering, content operations, SEO  
**Human gate:** written Arabic, legal, accessibility, SEO, and product approval

## Goal

Launch the complete Arabic locale in a reversible, monitored way without modifying English, French, or Spanish behavior.

## Work

- Add `ar` to the public launch registry only after final approval. Then expose approved `/ar` routes, switcher options, sitemap entries, canonical/hreflang alternatives, and cache revalidation.
- Publish only reviewed Arabic CMS content and monitor 404s, target switching, cache invalidation, indexing, metadata, overflow, and RTL interaction feedback.
- Keep an agreed observation period and rollback owner on call.

## Acceptance criteria

- `/ar` is complete, RTL-correct, indexable only where approved, and discoverable only through valid targets and metadata.
- English/French/Spanish SEO, routes, and user flows remain unchanged.
- Monitoring has no unresolved Arabic routing, fallback, cache, typography, overflow, or accessibility incident.

## Rollback

Remove `ar` from the public launch registry, sitemap, `hreflang`, and switcher; unpublish accidental Arabic content if needed; purge Arabic cache tags; retain existing locales and source content untouched.
