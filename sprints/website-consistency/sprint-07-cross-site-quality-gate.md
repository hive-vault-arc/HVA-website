# Sprint 07: Cross-Site Quality Gate

## Goal

Verify that the full public website behaves as one responsive, accessible, performant brand system.

## Work

- Run strict palette and logo audits.
- Run static scans for fixed viewport heights, fixed widths, negative offsets, overflow risks, no-wrap text, large arbitrary type, and absolute mobile overlays.
- Run lint, tests, build, and Playwright coverage.
- Capture phone, tablet, and desktop screenshots for every page family.
- Check navigation, forms, carousels, accordions, locale switching, article rendering, CMS fallbacks, metadata, and console output.
- Test reduced motion, keyboard focus, text zoom, and long translated strings.
- Record durable corrections in `docs/AGENT_LESSONS.md` and automate repeated failures.

## Acceptance

- `npm run audit:brand:strict` exits successfully.
- No unapproved site UI color or legacy logo reference remains.
- No page has horizontal overflow or incoherent overlap at required widths.
- Every interactive target is at least 44px.
- Titles, buttons, cards, and navigation tolerate long localized text.
- No unexpected runtime or hydration error appears.
- Lint, unit tests, build, and E2E checks pass.
- The migration matrix is signed off family by family.
