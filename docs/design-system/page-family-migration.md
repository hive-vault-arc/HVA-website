# Simple v1 page migration map

The [site plan](../simple-v1-site-plan.md) defines the 11-page core on `site/simple-v1`; the October 19 [requirements brief](../simple-v1-requirements.md) adds the required Insights library and latest design direction. This map adapts existing templates to that scope. The previous full-site family migration order is superseded for this branch.

The core pages, required Insights families and service-detail pages now use the simpler shared shell locally. The table below records the migration targets and intended content, while the [implementation review](../simple-v1-implementation-review.md) records what has been built and verified. Industry, location and other retained routes still await a route-by-route design review.

## Shared shell

Use the same simpler navigation, footer, page frame, controls, focus treatment and language behavior across the core and required Insights pages as they migrate. Target navigation is Services, Case Studies, About, Insights and Book a Call leading to Contact; the logo returns Home. Footer links include Insights, Privacy Policy, Cookie Policy and Legal Notice.

Retain the approved palette, existing logo assets and typography from [DESIGN.md](../../DESIGN.md), including its simple-v1 reference choices. Preserve cookie preferences, consent-aware analytics, locale routing, loading/error states and contact contracts.

The shared shell now covers the core and required Insights pages. Keep the inherited routes reachable while their individual treatment is reviewed.

## Main pages

| Target | Existing template | Migration work |
| --- | --- | --- |
| Home | `src/views/Home.tsx` | Apply the latest hero/storytelling brief while preserving Plan / Build / Run, real client work, ARC, FAQ and contact contracts. Add the short team introduction and selected Insights; align navigation and CTA with the site plan. |
| Services | `src/app/[locale]/capabilities/page.tsx` | Combine the overview, detailed overview and useful program content into one page. Explain six services through problems, deliverables, examples, engagement steps and relevant FAQs. |
| Case Studies | `src/app/[locale]/case-studies/page.tsx` | Feature the three named client projects with images, client problems, delivery summaries and links to real details. Absorb useful Portfolio content. Keep internal demonstrations labelled separately. |
| About | `src/app/[locale]/aboutus/page.tsx` | Explain the company, real founders and location. Use short bios and a concise How we work section instead of requiring separate founder or ARC pages in the core. |
| Contact | `src/app/[locale]/contact/page.tsx` | Use a short enquiry, approved contact facts, a real booking option when configured, and a clear explanation of the next step. Verify validation and truthful success/failure states. |

Use existing canonical paths while redesigning. Services and About are navigation labels; new `/services` or `/about` routes are not prerequisites.

## Three client details

Use `src/app/[locale]/case-studies/[slug]/page.tsx` and the approved existing CMS slugs for:

- ImmoWorld CRM and Real Estate Operations.
- Premium Advice & Training / KeepZen Digital Academy.
- Tarik Rami Immobilier Project and Client Management Platform.

All three follow client context, problem, what we built, screenshots, verified results or delivery status, and Contact CTA. Keep client colors inside their proof frames. Preserve asset identities, source quotes and approved project facts; do not invent outcome metrics or replace real screenshots with generated concepts.

## Three policy pages

Retain the existing Privacy Policy, Cookie Policy and Legal Notice at `/privacy-policy`, `/cookie-policy` and `/mentions-legales`. Adapt the presentation and footer access while preserving reviewed legal copy and consent behavior. Policy content changes remain subject to legal review.

## Content outside the core

ARC becomes How we work on Home and About. Industry descriptions become relevant service and project examples. Founder summaries belong on About; Portfolio joins Case Studies.

The existing published Insights library is required alongside the core. Adapt `/insights`, `/blog` and the existing News, Perspectives and Research Reports index/detail families with their localized routes. Reuse CMS content and preserve article identities, metadata and translation/fallback behavior. A unified Insights navigation entry keeps the experience simple without removing categories or entries.

The six fuller service explanations remain as additional detail pages in the Simple v1 layout. Location pages, utility routes and machine-readable company resources are outside the 11-page count. Preserve their existing behavior until their treatment is reviewed.

For a future consolidation redirect, document the source, useful replacement, each locale equivalent, canonical and sitemap updates, and verification. Removing a navigation item alone does not remove its route.

## Implementation order

1. Complete Home against the target brief and establish the reusable simple shell.
2. Adapt Services, then the Case Studies index and three detail pages.
3. Adapt About and Contact.
4. Bring all three policies into the shared shell without changing legal meaning.
5. Adapt the required Insights families, then review other retained content, internal links and any proposed redirects.
6. Verify the full core, Insights families and retained destinations in every public locale.

The [active sequence](../../sprints/simple-v1/README.md) tracks this order. The older full-site sprint pack remains reference material.

## Acceptance

A migrated page must use approved visual tokens and assets, readable text measures, logical mobile order, visible keyboard focus and at least 44px controls. Generated concepts must be labelled; client evidence must remain real.

Check overflow and layout at 320, 375, 390, 430, 768, 820, 1024, 1280, 1440 and 1920px. Capture affected families at 390×844, 820×1180, 1440×1000 and 1920×1080. Check enlarged text, reduced motion and Arabic right-to-left behavior.

Verify navigation, all six service destinations, the three client details, Insights library and entry links, policy links, locale switching and the contact flow. Preserve metadata, approved CMS rendering, consent and missing-content states. Run the relevant checks in [AGENTS.md](../../AGENTS.md), and distinguish inherited audit debt from new page failures.
