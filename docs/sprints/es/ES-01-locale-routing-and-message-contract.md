# ES-01 — Locale routing and message contract

**Prerequisites:** LS-00  
**Owners:** engineering, Spanish reviewer  
**Human gate:** Spanish reviewer approves message-drafting workflow before public copy is committed

## Goal

Implement Spanish as a non-public supported locale with a generic locale contract, localized route map, and exact message parity. Do not expose `/es` in production navigation or translate public editorial copy in this sprint.

## Work

- Replace English/French-only locale types, loops, and `locale === 'fr'` branches with `APP_LOCALES` and the typed locale profile.
- Add `es`, `es-ES`, `es_ES`, `ltr`, label, and `/es` profile values.
- Add Spanish pathname mappings from the approved route manifest, including dynamic and geo-service route builders.
- Create `messages/es.json` with exactly the English keys, array shapes, and ICU placeholders. Add parity, placeholder, and empty-value validation.
- Keep English unprefixed and retain explicit locale selection without browser detection or locale cookies.

## Acceptance criteria

- All shared locale utilities compile without binary French-specific control flow.
- Spanish route construction is deterministic and matches the route manifest; `/es` remains disabled by the launch registry.
- Spanish messages pass exact structural parity against `messages/en.json`.
- No English fallback can render under a Spanish URL.

## Rollback

Disable `es` in the launch registry and revert the implementation commit; preserve reviewed draft messages and route documentation outside production traffic.
