# AR-03 — RTL components, navigation, and forms

**Prerequisites:** AR-01  
**Owners:** engineering, design systems, accessibility QA  
**Human gate:** RTL usability review with an Arabic reader

## Goal

Make shared UI components naturally usable in RTL without mirroring content that should remain source-directional.

## Work

- Audit navigation, menus, breadcrumbs, pagination, accordions, cards, forms, validation, tables, CTAs, and modal/dialog focus order under `dir="rtl"`.
- Mirror only semantic directional controls such as back/forward arrows and chevrons. Do not mirror logos, product interfaces, source-language evidence, charts, code, IDs, technical identifiers, or media merely because the document is RTL.
- Use logical spacing, border, alignment, and inset properties. Avoid broad `transform: scaleX(-1)` solutions.
- Ensure keyboard order, focus placement, Escape behavior, and screen-reader labels match the visual order.
- Validate mixed Arabic/Latin content, URLs, tokens, code, email addresses, and numbers with appropriate bidi isolation.

## Acceptance criteria

- No horizontal overflow or broken ordering appears at `390×844`, `820×1180`, `1440×1000`, or `1920×1080`.
- Navigation and form controls have correct RTL placement, 44px+ touch targets, logical focus order, and accessible labels.
- Technical proof and source-language evidence remain unmirrored and legible.

## Rollback

Revert component-level RTL changes that regress LTR behavior; retain localized, scoped fixes and re-test both directions before retrying.
