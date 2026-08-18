# Website Consistency Sprint Pack

## Objective

Bring the complete Hive Vault Arc website under one controlled visual system without changing the meaning of the content, public routes, CMS contracts, or brand identity.

## Source Order

1. `AGENTS.md`
2. `DESIGN.md`
3. `docs/AGENT_LESSONS.md`
4. `docs/design-system/page-family-migration.md`
5. The active sprint file in this directory

## Sprint Order

1. `sprint-01-governance-and-baseline.md`
2. `sprint-02-tokens-assets-shared-shell.md`
3. `sprint-03-home-reference-system.md`
4. `sprint-04-arc-framework-rebuild.md`
5. `sprint-05-core-page-families.md`
6. `sprint-06-content-conversion-utility.md`
7. `sprint-07-cross-site-quality-gate.md`

Each sprint depends on the previous sprint. Do not run several page-family migrations in parallel when they edit the same shared CSS or components.

## Global Completion Gate

The program is complete only when:

- `npm run audit:brand:strict` passes;
- lint, unit tests, build, and relevant Playwright tests pass;
- every public family passes the acceptance matrix;
- no page uses a legacy numbered logo;
- no normal page contains more than one substantial dark module before the footer;
- visual QA passes at phone, tablet, and desktop widths;
- no public content, route, locale, CMS data, metadata, or conversion behavior regresses.

## Decision Log

- Primary experience: light editorial and work-focused.
- Dark content: inset emphasis, not routine full-bleed sections.
- Accent: amber is used for emphasis, not as body copy or large background fields.
- Logo: nav mark, footer lockup, and rare intentional identity moments only.
- Images: fewer and more credible; proof is preferred to decoration.
- Outlier pages: converge on the shared system instead of preserving separate art directions.
