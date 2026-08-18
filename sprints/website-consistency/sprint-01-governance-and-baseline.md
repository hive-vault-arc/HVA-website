# Sprint 01: Governance And Baseline

## Goal

Create enforceable design rules and a measurable baseline before modifying public page visuals.

## Work

- Add the repository operating rules in `AGENTS.md`.
- Replace stale or conflicting guidance in `DESIGN.md`.
- Add `docs/AGENT_LESSONS.md` for durable correction writeback.
- Add a page-family migration map.
- Add this ordered sprint pack.
- Add a brand audit that reports unapproved color values and legacy logo references.
- Record current violations without trying to hide or suppress them.

## Acceptance

- The approved palette is decision-complete. Brand-gold accents use `#E8A838`; normal copy uses navy or body gray instead of dark gold.
- Logo roles, frequency, and canonical source files are explicit.
- Dark-module, image-density, typography, and responsive rules are explicit.
- The audit can run in report mode against the current baseline.
- The audit has a strict mode for the final gate.
- No production UI, content, route, or CMS behavior changes in this sprint.

## Baseline Record

Date: 2026-08-13

- Current branch: `website-consistency`
- Existing source contains substantial palette drift and repeated section-brand-mark use.
- Legacy numbered logo files are still referenced by shared components and SEO metadata.
- Satoshi remains in the current typography stack and must be removed during the shared-system migration.
- The complete numeric baseline is produced by `npm run audit:brand`; do not hardcode it here because the count must decrease with every implementation sprint.

## Verification Note

- `npm run lint` passes at sprint creation.
- The full test suite has one existing failure in `src/components/InsightIndexPage.test.tsx`: the load-more test cannot find the `Case study 7` heading after requesting three more records. This sprint does not change that component or its data flow.
