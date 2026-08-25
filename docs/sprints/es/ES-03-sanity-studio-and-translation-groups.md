# ES-03 — Sanity Studio and translation groups

**Prerequisites:** LS-00, ES-01  
**Owners:** Studio owner, content operations, engineering  
**Human gate:** schema and editorial workflow review in the actual Studio repository

## Goal

Prepare the external Sanity Studio to manage reviewed Spanish partners without duplicating sources or corrupting translation groups.

## Work

- Extend locale fields and validation for `es`; keep publication approval separate from draft state.
- Ensure `translationTargets` represent exactly approved peers and one translation metadata group is shared per content family.
- Add Spanish-aware desk filters, completeness reports, reference-remapping guidance, and validation for all eight localized types.
- Define migration, preview, and rollback steps in the actual Studio codebase; no Studio mutation occurs from this website repository.

## Acceptance criteria

- A source has at most one approved Spanish partner per translation group.
- Spanish documents cannot be marked launch-ready with missing required localized references or source approvals.
- Studio preview resolves Spanish routes only through approved translation targets.

## Rollback

Remove Spanish Studio schema/validation changes in the Studio repository and unpublish any accidental Spanish test documents; keep English/French records unchanged.
