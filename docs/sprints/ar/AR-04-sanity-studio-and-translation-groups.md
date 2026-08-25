# AR-04 — Sanity Studio and translation groups

**Prerequisites:** LS-00, AR-01  
**Owners:** Studio owner, content operations, engineering  
**Human gate:** Studio schema and editorial workflow review in the actual Studio repository

## Goal

Prepare external Sanity Studio to manage Arabic partners, Arabic CMS slugs, and translation groups safely.

## Work

- Extend Studio locale support and validation for Arabic drafts, approved content, and Arabic script slugs.
- Require exactly one approved Arabic partner per translation metadata group; prevent duplicate groups and invalid targets.
- Add Arabic completeness reporting and reference remapping guidance for all eight localized content types.
- Confirm Studio preview, publishing, migration, and rollback paths against the current Studio repository—not historical directory assumptions.

## Acceptance criteria

- Arabic documents are discoverable in Studio only through controlled translation groups and approved locale fields.
- Required Arabic references and slugs validate before launch readiness.
- Preview linking resolves only true approved Arabic targets.

## Rollback

Revert Studio-side Arabic schema/validation changes and unpublish accidental Arabic test documents, leaving English/French/Spanish records intact.
