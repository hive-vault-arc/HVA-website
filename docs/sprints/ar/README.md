# Arabic localization sprints

This is the inherited full-site Arabic rollout sequence. Arabic is now configured as public in `src/i18n/config.ts`; the original pre-launch order below is historical. The [simple-v1 plan](../../simple-v1-site-plan.md) and [active sequence](../../../sprints/simple-v1/README.md) govern new page scope. Preserve Arabic copy, localized routes and right-to-left behavior while adapting the core pages.

Arabic is Modern Standard Arabic with Moroccan business context: `ar`, `ar-MA`, and `ar_MA`. It is right-to-left and will use `/ar` only after `AR-08` passes the complete-locale gate. Use the [canonical specification](../../localization/es-ar-localization-spec.md), [Arabic style guide](../../localization/arabic-style-guide.md), and [route manifest](../../localization/es-ar-route-manifest.md).

Run `LS-00` first. Build the RTL foundation before producing Arabic public copy. Arabic is a separate launch: Spanish launch readiness does not make Arabic public.
