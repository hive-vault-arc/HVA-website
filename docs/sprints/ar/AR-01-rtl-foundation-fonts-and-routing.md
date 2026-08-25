# AR-01 — RTL foundation, fonts, and routing

**Prerequisites:** LS-00  
**Owners:** engineering, design systems, Arabic reviewer  
**Human gate:** Arabic typography and route decisions approved

## Goal

Add Arabic as a non-public supported locale and establish real RTL behavior, Arabic typography, route maps, and strict message parity without enabling Arabic traffic.

## Work

- Generalize the locale contract through `APP_LOCALES` and a typed locale profile; add `ar`, `/ar`, `rtl`, `ar-MA`, and `ar_MA`.
- Add approved Arabic-script pathnames and dynamic slug construction from the route manifest; do not transliterate or infer content slugs.
- Server-render `lang="ar"` and `dir="rtl"` on Arabic documents.
- Add a professional Arabic UI/display font family with real supported weights and styles. Do not synthesize bold or italics; keep Latin fonts unchanged for English/French/Spanish.
- Convert shared directional layout styling to logical properties where needed, while preserving semantic visual intent.
- Create `messages/ar.json` with exact English key, array, and ICU placeholder parity. Keep Arabic outside the public launch registry.

## Acceptance criteria

- Arabic documents render RTL at the root without affecting LTR locales.
- Arabic route generation matches the manifest and is unavailable publicly until launch.
- Arabic text has real font coverage and UI text has an accessible baseline size of at least 16px.
- Parity checks catch missing keys, changed array shape, invalid ICU placeholders, and empty public values.

## Rollback

Disable `ar` in the launch registry and revert Arabic runtime/font changes; keep review-only draft messages and planning records.
