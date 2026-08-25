# AR-05 — Arabic CMS content and reference remapping

**Prerequisites:** AR-04  
**Owners:** Arabic translator, subject-matter reviewer, legal reviewer, content operations  
**Human gate:** qualified Arabic and legal approval

## Goal

Produce complete Arabic CMS partners in Modern Standard Arabic with Moroccan business context, preserving exact source-language evidence where required.

## Work

- Translate the eight localized content types according to the Arabic style guide and glossary.
- Use Arabic CMS slugs from the approved manifest; do not derive them mechanically from English/French slugs.
- Map relations only to approved Arabic partners. Preserve technical identifiers, signed quotations, evidence, URLs, APIs, IDs, and legal originals unless a contextual translation is explicitly approved.
- Keep an auditable review log for translation, subject-matter accuracy, legal approval, and publication.

## Acceptance criteria

- Every Arabic collection/detail route in release scope has one published approved Arabic content source and required references.
- There is no English or French editorial fallback beneath `/ar`.
- Translation groups are complete, unique, and correctly linked.

## Rollback

Unpublish incomplete Arabic partners and remove their targets; retain source documents and review history unchanged.
