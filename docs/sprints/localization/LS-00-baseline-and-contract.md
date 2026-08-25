# LS-00 — Baseline and locale contract

**Status:** planned — documentation and baseline work only  
**Prerequisites:** none  
**Blocks:** every ES and AR implementation sprint

## Goal

Record the current English/French system and establish the shared contract for a complete, reviewable Spanish or Arabic release. This sprint must not add a public locale, edit editorial copy, or mutate Sanity.

## Baseline to capture

- Record the active worktree boundary before localization begins; do not absorb unrelated visual, media, or navigation work.
- Re-audit every two-locale assumption, including `APP_LOCALES`, routing, request configuration, route manifests, metadata, SEO, sitemap, revalidation, locale switching, tests, and French-only conditional paths.
- Record the live Sanity inventory for the eight localized types: capabilities, industries, people, case studies, posts, news, perspectives, and research reports.
- Confirm the Studio repository/location and its release process at execution time. Studio work is an external workstream and must not assume a historical local directory is current.
- Save the expected English message-key shape as the parity source for every future locale.

## Shared contract

- Future application locale type: `en | fr | es | ar`, sourced from `APP_LOCALES`; code must not branch on a binary English/French test.
- English stays unprefixed. French, Spanish, and Arabic use `/fr`, `/es`, and `/ar`. Keep explicit selection: no browser detection and no locale cookie.
- Add a typed locale profile containing direction, formatting locale, Open Graph locale, display label, and public prefix. Use it for metadata, dates, numbers, routes, switcher options, sitemap, JSON-LD, and revalidation.
- Keep a separate launch registry. A locale may be supported by implementation while it is absent from public navigation, sitemap, hreflang, and routable production deployment until it passes the complete-locale gate.
- A Spanish or Arabic route may render only reviewed source-language-specific editorial and CMS content. Missing content is unavailable and unindexed; it must never fall back to English or be guessed from a current slug.
- Preserve source language for signed evidence, exact quotations, client proof, identifiers, URLs, APIs, code, and legal originals unless an approved contextual translation exists.

## Complete-locale publication gate

Before a locale is public, every approved English source in scope has exactly one published, approved partner; all message keys, ICU placeholders, dynamic routes, metadata, and translation targets resolve; human language and legal review are recorded; and automated plus visual checks pass. Content production may run in parallel after LS-00, but Spanish and Arabic launch independently.

## Acceptance criteria

- The baseline names every existing two-locale assumption and its owner for refactoring.
- The canonical references in `docs/localization/` are reviewed as the source of truth for ES/AR work.
- The locale profile, launch registry, no-fallback rule, and external Studio boundary are accepted by engineering, content, SEO, and legal owners.
- No public route, message file, CMS document, locale switcher option, or deployment state changes.

## Owners and review gates

| Area | Owner | Gate |
|---|---|---|
| Application baseline | Engineering | Technical inventory reviewed |
| CMS baseline | Content operations + Studio owner | Fresh inventory and grouping model confirmed |
| Editorial terms | Spanish/Arabic reviewers | Glossary and style guides accepted |
| Publication policy | SEO + legal + product owner | Complete-locale gate signed off |

## Rollback

This is documentation and baseline work only. Revert the planning documents if a contract decision changes; do not change production behavior.
