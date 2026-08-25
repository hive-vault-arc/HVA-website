# ES-02 — Static pages, metadata, and SEO

**Prerequisites:** ES-01  
**Owners:** engineering, Spanish editorial reviewer, SEO owner  
**Human gate:** reviewed Spanish static copy and metadata

## Goal

Prepare complete Spanish static pages and locale-aware SEO without releasing them publicly.

## Work

- Draft and review all Git-owned static messages through the Spanish style guide; AI drafts are review-only.
- Generate canonical URLs, Open Graph locale, JSON-LD, dates, numbers, language labels, and locale-switcher choices from the locale profile.
- Add Spanish metadata only for pages whose complete reviewed page content exists.
- Keep excluded Spanish routes out of sitemap, hreflang, and indexable output until launch.
- Verify protected terms, source-language legal originals, evidence, exact quotations, IDs, URLs, and client proof remain unchanged.

## Acceptance criteria

- Each reviewed Spanish static route has correct title, description, canonical, `hreflang`, Open Graph locale, and JSON-LD output.
- No incomplete Spanish route is indexed, linked by `hreflang`, or offered in the public switcher.
- English/French metadata output is unchanged.

## Rollback

Remove Spanish from the locale launch registry and generated SEO sets; keep review records and drafts for correction.
