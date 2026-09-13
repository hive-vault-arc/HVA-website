# Hive Vault Arc Website Operating Rules

## Project

This repository is the public Hive Vault Arc website. It is a multilingual Next.js 16 App Router project using React 19, TypeScript, Tailwind CSS 3, shared CSS, Sanity-backed content, and next-intl.

The website is a reusable production system. Do not treat it as a disposable visual prototype.

## Read Order

Before changing public UI, read these files in order:

1. `AGENTS.md`
2. `DESIGN.md`
3. `docs/AGENT_LESSONS.md`
4. `docs/design-system/page-family-migration.md`
5. The active file under `sprints/website-consistency/`
6. `docs/brand-copy-checklist.md` when changing public copy

Canonical external brand assets live in:

`C:\Users\aliam\Documents\the vault\.branding`

The external brand package is read-only from this project. Copy an approved asset into `public/Images/brand/` when the website needs it; do not edit the canonical source from this repository.

## Non-Negotiable Visual Contract

- `DESIGN.md` is the website visual source of truth.
- Do not introduce a visual color outside its approved palette.
- Colors naturally contained inside photographs, generated raster art, videos, client logos, and framed client/product interfaces are exempt. Their surrounding website UI is not exempt.
- Intrinsic colors inside canonical supplied Hive Vault Arc logo SVGs are also exempt. Do not extract those asset-only colors into surrounding UI.
- Do not create new gold, gray, navy, blue, teal, cyan, purple, beige, or black values.
- Never introduce dark-gold text. On light surfaces, use navy or body gray for labels and copy; reserve `#E8A838` for structural accents, icons, sequence markers, and at most one large editorial phrase per major section. Gold text is allowed on dark navy surfaces.
- Electric blue, cyan, and teal may appear only inside clearly framed client or product proof.
- Do not use gradients that introduce unapproved colors. Tone-only gradients composed from approved tokens require a clear functional reason.
- Do not use the company mark beside routine section headings. Most sections use an eyebrow label and rule, not a logo.
- Use the approved responsive wordmark or lockup when the full company identity is useful. Use the standalone mark only for navigation, favicon/app identity, or an intentional brand moment.
- Do not use the legacy numbered WebP logo files in new work.
- Do not redraw, recolor, crop, or reconstruct the mark.
- Keep dark content modules inset from the viewport edges. Only the global footer may be a routine full-bleed dark band.
- Default to light pages. A primary page may have at most one substantial dark emphasis module before the footer unless the active sprint explicitly approves an exception.
- Page titles must normally fit within two lines on desktop and three lines on a 320px phone.
- Do not solve hierarchy with oversized text. Use weight, spacing, alignment, and color first.
- Write public copy in short, active sentences with familiar words. Keep it technical but plain, direct, and inviting; do not stack jargon or long clauses.
- Prefer one idea per sentence. As a working target, use 3-8 words for headings and 6-14 words for supporting sentences unless accuracy requires more.
- Use images only when they show a real person, place, system, client proof, industry context, or one approved conceptual idea.
- Do not decorate every section with an image, logo, card, glow, grid, or diagram.
- Keep client/product colors inside their proof frame.
- Preserve content meaning and route structure unless the task explicitly includes copy or information architecture.

## Layout And Responsive Rules

- Build mobile-first and use Tailwind 3-compatible syntax.
- Use the shared page shell and gutters defined in `DESIGN.md`.
- Use CSS Grid for page structure; avoid percentage-width flex calculations.
- Fluid type inside a capped content frame must use container-relative units (`cqw`) or breakpoint sizes. Do not combine a max-width shell with `vw`/`vh` font sizing.
- Use `min-height: 100dvh` where viewport height matters. Do not use `100vh` or `h-screen` for page heroes.
- All interactive controls need a minimum `44px` touch target.
- No horizontal page overflow at `320`, `375`, `390`, `430`, `768`, `820`, `1024`, `1280`, `1440`, or `1920` pixels.
- Mobile reading order must remain logical without relying on absolute positioning.
- Floating media cards and overlapping proof panels must stack into normal flow below `768px`.

## Code Rules

- Work with the existing stack. Do not add a dependency unless the task requires it and `package.json` has been checked.
- Prefer shared semantic tokens and components over page-specific hardcoded values.
- Do not add another large page-specific block to `src/app/globals.css` when a shared primitive can own the behavior.
- Keep Server Components as the default. Isolate interaction in small Client Components.
- Animate only `transform` and `opacity` where possible.
- Respect `prefers-reduced-motion`.
- Preserve user changes and unrelated worktree changes.
- Add comments only when they explain a non-obvious constraint or prevention rule.
- Use only the company-controlled GitHub account, the `hive-vault-arc` organization repository, and the company-owned Vercel project for this website. Never use a personal GitHub account, personal remote, fork, or Vercel project. Before pushing or changing deployment settings, verify the company remote and approved account.

## Required Verification

Run the checks appropriate to the change:

```powershell
npm run audit:brand
npm run audit:responsive
npm run lint
npm run test
npm run build
git diff --check
```

Visual changes also require screenshots at `390x844`, `820x1180`, `1440x1000`, and `1920x1080` for every affected page family. Check color use, logo count, title wrapping, edge spacing, image density, overflow, focus states, and console errors.

`npm run audit:brand:strict` becomes a required completion gate only after the palette migration sprint removes the current baseline violations.

## Lessons And Writeback

When Ali or QA corrects a repeated visual mistake, add a dated entry to `docs/AGENT_LESSONS.md` containing:

- the triggering problem;
- the durable rule;
- the prevention check;
- affected files or tests;
- whether the rule was promoted into `AGENTS.md` or `DESIGN.md`.

Turn deterministic lessons into audit rules, tests, or screenshot acceptance checks whenever practical.

## Stop And Escalate

Stop and ask before:

- introducing a color outside the approved palette;
- creating or modifying a logo;
- replacing real client proof with generated content;
- changing public claims, metrics, testimonials, founders, contact details, or legal text;
- adding a new full-page visual system that conflicts with `DESIGN.md`;
- performing any CMS mutation, publication, deployment, or external account action that was not explicitly requested.
