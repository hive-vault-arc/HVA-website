# AR-02 — Arabic static copy, metadata, and SEO

**Prerequisites:** AR-01  
**Owners:** Arabic translator, subject-matter reviewer, SEO owner, legal reviewer  
**Human gate:** approved Arabic public copy and metadata

## Goal

Prepare reviewed Modern Standard Arabic static content and locale-correct metadata without making Arabic indexable or public.

## Work

- Draft static messages against the Arabic style guide; AI assists drafting only and cannot approve or publish content.
- Use the locale profile for `ar-MA` formatting, Open Graph locale, canonical/hreflang data, JSON-LD, dates, numbers, and locale labels.
- Translate context but preserve URLs, code, API names, IDs, exact quotations, signed evidence, client proof, metrics, and legal originals in their source language unless approved otherwise.
- Exclude incomplete Arabic pages from switcher options, sitemap, indexable output, and `hreflang` until launch.

## Acceptance criteria

- Reviewed Arabic static pages use accurate language, punctuation, numerals, and terminology without fallback English editorial copy.
- Arabic metadata is correct and isolated from English/French/Spanish output.
- No incomplete Arabic page can be indexed or advertised through SEO alternates.

## Rollback

Remove Arabic from generated public SEO output and retain reviewed drafts for correction; do not alter existing locale metadata.
