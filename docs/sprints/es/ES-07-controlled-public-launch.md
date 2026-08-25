# ES-07 — Controlled public launch

**Prerequisites:** ES-06 approved  
**Owners:** product owner, engineering, SEO, content operations  
**Human gate:** written launch approval from Spanish, legal, SEO, and product owners

## Goal

Make only the complete Spanish locale publicly discoverable and monitor it without changing English/French behavior.

## Work

- Add `es` to the public launch registry, locale switcher, sitemap, canonical/hreflang outputs, and deployment routing only after approval.
- Publish the approved Spanish CMS set and revalidate only approved Spanish paths.
- Monitor 404s, locale switch targets, search indexing, metadata, cache behavior, errors, and language feedback during the agreed observation window.

## Acceptance criteria

- Public `/es` routes, switcher links, sitemap entries, and SEO alternatives resolve only complete reviewed pages.
- English/French routes and analytics remain stable.
- Monitoring has no unresolved Spanish 404, fallback, cache, or metadata incident.

## Rollback

Immediately remove `es` from the public launch registry, sitemap and switcher; serve no Spanish fallback pages, unpublish accidental content if necessary, purge affected Spanish cache tags, and retain English/French traffic unchanged.
