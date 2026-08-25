# ES-06 — QA, accessibility, and release readiness

**Prerequisites:** ES-05  
**Owners:** QA, engineering, Spanish reviewer, SEO, legal  
**Human gate:** complete-locale approval board

## Goal

Prove that Spanish is complete, accurate, accessible, and non-regressive before a controlled release.

## Checks

- Run message parity, placeholder, protected-term, CMS completeness, route, dynamic-target, metadata, canonical, `hreflang`, Open Graph, JSON-LD, sitemap, and revalidation tests.
- Review representative static, dynamic, legal, contact, and geo-service routes at `390×844`, `820×1180`, `1440×1000`, and `1920×1080`.
- Check text expansion, truncation, keyboard navigation, focus, locale switcher availability, mobile behavior, console errors, and fallback absence.
- Run the project quality gates defined by the eventual implementation change set: brand/responsive audits, lint, unit tests, E2E, build, and `git diff --check`.

## Acceptance criteria

- Every release-scope English source has exactly one approved Spanish partner.
- No public Spanish page contains fallback English editorial content.
- Spanish passes human editorial and legal approval, automated checks, and visual QA with no release-blocking defect.

## Rollback

Spanish remains disabled; unpublish incomplete targets and resolve defects before reopening the launch gate.
