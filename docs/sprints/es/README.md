# Spanish localization sprints

This is the inherited full-site Spanish rollout sequence. Spanish is now configured as public in `src/i18n/config.ts`; the original pre-launch order below is historical. The [simple-v1 plan](../../simple-v1-site-plan.md) and [active sequence](../../../sprints/simple-v1/README.md) govern new page scope. Keep Spanish copy and route contracts while adapting the core pages.

Spanish is Spain-oriented: `es`, `es-ES`, and `es_ES`. Its public prefix will be `/es` only after `ES-07` passes the complete-locale gate. Use the [canonical specification](../../localization/es-ar-localization-spec.md), [Spanish style guide](../../localization/spanish-style-guide.md), and [route manifest](../../localization/es-ar-route-manifest.md) for all implementation decisions.

Run `LS-00` first. ES-03 and ES-04 may proceed in parallel after ES-01 has established the message and routing contracts. Do not use the historical French-only fallback model for Spanish.
