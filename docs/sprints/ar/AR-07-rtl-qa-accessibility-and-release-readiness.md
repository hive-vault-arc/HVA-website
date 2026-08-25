# AR-07 — RTL QA, accessibility, and release readiness

**Prerequisites:** AR-03, AR-06  
**Owners:** QA, engineering, Arabic reviewer, accessibility specialist, SEO, legal  
**Human gate:** complete-locale approval board

## Goal

Demonstrate complete Arabic content, readable RTL rendering, and stable behavior before public release.

## Checks

- Verify message parity, protected terms, CMS completeness, Arabic-script routes, translation-target switching, revalidation, canonical URLs, `hreflang`, Open Graph locale, JSON-LD, and sitemap gating.
- Verify `lang="ar"`, `dir="rtl"`, font weights, mixed bidi content, keyboard order, focus sequence, form errors, mirrored directional controls, unmirrored proof, and screen-reader labels.
- Review representative static, dynamic, legal, contact, and geo-service routes at `390×844`, `820×1180`, `1440×1000`, and `1920×1080`.
- Run implementation quality gates: brand/responsive audits, lint, unit tests, E2E, build, and `git diff --check`.

## Acceptance criteria

- The Arabic release scope is complete and approved; no Arabic route contains fallback editorial content.
- RTL visual review finds no overflow, truncation, synthetic typography, incorrect mirroring, or focus-order defect.
- Human Arabic, legal, accessibility, SEO, and product approvals are recorded.

## Rollback

Keep Arabic disabled from public launch, unpublish incomplete targets, and resolve defects before the approval board reconvenes.
