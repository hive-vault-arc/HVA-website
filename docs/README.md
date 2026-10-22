# Hive Vault Arc website documentation

This checkout develops the simpler website on `site/simple-v1`. Start with the [requirements brief](simple-v1-requirements.md), the [site plan](simple-v1-site-plan.md) and the [active implementation sequence](../sprints/simple-v1/README.md). The scope retains the 11-page core and now requires the existing Insights library. The current full website stays on `main` until the simpler version is ready; `site/enterprise-maintained` preserves and maintains that version.

## Active guidance

| Document | Use |
| --- | --- |
| [Requirements brief](simple-v1-requirements.md) | October 19–20 owner requirements, SME priority, required Insights and carousel, component references, Hero 230 direction, SEO/schema, pending calendar integration and completion criteria. |
| [Site plan](simple-v1-site-plan.md) | Page scope, content briefs, navigation, consolidation and branch arrangement. |
| [Homepage implementation](simple-v1-homepage.md) | Current local homepage behavior, design choices and verification. |
| [Operating rules](../AGENTS.md) | Contributor rules and required checks. |
| [Design system](../DESIGN.md) | Approved identity, palette, typography and responsive requirements. |
| [Page migration map](design-system/page-family-migration.md) | How existing page templates become the simpler experience. |
| [Contribution workflow](contributing-workflow.md) | Development branches, synchronization, review and eventual release. |
| [Brand copy checklist](brand-copy-checklist.md) | Public naming and factual copy review. |
| [Agent lessons](AGENT_LESSONS.md) | Recorded defects and prevention rules. |

## Shared implementation references

Keep the existing localization, consent, analytics, CMS, SEO and company-fact contracts when adapting the pages. The [route manifest](localization/route-manifest.md), [Spanish and Arabic routes](localization/es-ar-route-manifest.md), [content inventory](localization/content-inventory.md) and [indexable inventory](seo/indexable-inventory.md) describe inherited implementation or dated baselines; they do not independently expand the agreed core and required Insights scope.

Current runtime authority is `src/i18n/config.ts`, `src/i18n/routing.ts`, `src/i18n/route-manifest.ts` and approved CMS records. Historical launch notes and counts may differ from those sources. Keep company facts in their existing shared registries and preserve reviewed legal text.

## Earlier full-site work

The [full-site visual sprint pack](../sprints/website-consistency/README.md), [SEO, AEO and GEO program](../sprints/seo-aeo-geo-2026/README.md), [May discovery pack](../sprints/seo-ai-discovery/README.md), [editorial rebuild](insights-editorial/README.md) and [locale sprint packs](sprints/fr/README.md) remain implementation history and reference material. Their route-expansion and execution orders are superseded for `site/simple-v1` by the active site plan.

Use an older task only when it supports the simpler site's scope. Review its assumptions against the current code before applying it. Changes for the full version belong on `site/enterprise-maintained` and require their own review.
