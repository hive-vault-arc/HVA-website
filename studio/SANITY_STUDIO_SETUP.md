# Hive Vault Arc Studio setup

Verified: 2026-09-13

The Studio lives at `studio/` inside the company website repository, retains its imported Git history, and deploys independently through Sanity CLI. The frontend remains at the repository root. Each application has a separate lockfile.

## Project

```text
projectId: 0zprc9fo
dataset: production
local Studio: http://localhost:3333
```

Use only the company-controlled Sanity account. Never deploy, export, import, or mutate this dataset from a personal account.

## Commands

From the repository root:

```text
npm ci --prefix studio
npm run studio:dev
npm run studio:verify
npm run studio:build
npm run studio:deploy
```

`studio:verify` runs lint, formatting, TypeScript, schema extraction, and TypeGen. Generated artifacts are committed at `studio/schema.json` and `src/sanity/sanity.types.ts`; CI rejects drift.

## Environment

Set `SANITY_STUDIO_WEBSITE_URL` for the production site origin used by Presentation. Set the frontend `NEXT_PUBLIC_SANITY_STUDIO_URL` to the company Studio URL for click-to-edit overlays. Local preview falls back to `http://localhost:3333`.

## Content model

Document-level localization supports `en`, `fr`, `es`, and `ar`. Shared organization descriptions use field-level localization. The Studio includes route-bound page optimization, organization facts, editorial contributors, evidence records, answer-first editorial fields, Unicode-safe slugs, editorial queues, and Presentation routes for every public localized document type.

See [`../docs/sanity-content-program.md`](../docs/sanity-content-program.md) for the migration, review, release, evidence, account, and launch rules.
