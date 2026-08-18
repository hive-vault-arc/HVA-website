# Sprint 02: Tokens, Assets, And Shared Shell

## Goal

Make the shared system capable of enforcing the approved design before page migrations begin.

## Work

- Define semantic color, type, spacing, width, radius, border, shadow, and motion tokens.
- Copy approved canonical logo, wordmark, and lockup assets into `public/Images/brand/`.
- Replace legacy numbered WebP logo use in shared components.
- Standardize `Logo`, `Navbar`, mobile navigation, `Footer`, shared CTA, page shell, buttons, labels, links, and focus states.
- Remove conflicting utility colors and stale shared font roles.
- Create reusable light section, alternate section, inset dark module, proof frame, and editorial heading primitives.
- Keep visual behavior stable for CMS and locale routes.

## Acceptance

- Shared components use semantic tokens only.
- Navigation uses the compact canonical mark; footer uses a canonical full lockup.
- Mobile navigation is keyboard-accessible and supports parent links plus submenu expansion.
- No shared component uses unapproved colors or numbered logo files.
- Shared dark modules retain visible page gutters.
- Shared components pass screenshots at `390x844`, `820x1180`, and `1440x1000`.
- Lint, tests, build, and relevant navigation E2E tests pass.

## Progress: 2026-08-13

Completed:

- copied the six canonical SVG mark, lockup, and wordmark assets;
- removed numbered logo references from source and SEO metadata;
- removed Satoshi and its external font request;
- replaced Tailwind palette definitions with approved tokens and compatibility mappings;
- constrained shared frame widths and added media/dark-module primitives;
- changed navbar active states from filled amber blocks to restrained rules and soft-ivory states;
- changed the footer to the full lockup and removed its interactive spotlight/grid decoration;
- removed repeated section marks and decorative glow/grid effects from the shared bottom CTA;
- added the generated-image framing contract;
- verified lint, focused navbar tests, and the production build.

Remaining before Sprint 02 closes:

- migrate older global helper styles that still contain unapproved literals;
- review and reduce the remaining `SectionBrandMark` usage across page families;
- capture responsive screenshots when a local server is explicitly available for visual QA.
