# Simple v1 implementation sequence

This is the active page implementation sequence for `site/simple-v1`. The [site plan](../../docs/simple-v1-site-plan.md) defines the 11-page core, navigation and consolidation. Keep `main` serving the full website until a reviewed release is requested, and maintain that version on `site/enterprise-maintained`.

The October 19 [requirements brief](../../docs/simple-v1-requirements.md) adds the existing published Insights library as required scope and records the hero direction and reference roles. The owner subsequently authorized implementation on this branch.

## Current state

The 11 core pages, required Insights families and six service-detail pages now use the simpler shared navigation and footer. The core page designs, Home Insights carousel, three named case-study details, service details and policy presentation are implemented locally. Older search destinations remain available on their existing routes. The [implementation review](../../docs/simple-v1-implementation-review.md) records current checks and remaining release dependencies.

## Work order

| Step | Scope | Completion evidence |
| --- | --- | --- |
| 1 | Home and shared shell | Apply the latest hero direction and storytelling brief, including the short team introduction and selected Insights. Align navigation to Services, Case Studies, About, Insights and Book a Call → Contact. Preserve working service groups, client evidence, ARC, FAQ and enquiry contracts. Establish shared header/footer components for the remaining pages. |
| 2 | Services | Present all six services in Plan / Build / Run with concrete problems, deliverables, examples, engagement steps and relevant FAQs. Consolidate useful overview/program copy. |
| 3 | Case Studies and three details | Feature ImmoWorld, Premium Advice & Training / KeepZen and Tarik Rami Immobilier. Each detail uses client context, problem, what we built, screenshots, verified results or delivery status, and Contact CTA. |
| 4 | About | Explain company identity, real founders, location and approach using short bios and real photographs. |
| 5 | Contact | Short enquiry, approved contact details, truthful delivery states, booking option when configured and a clear next-step explanation. |
| 6 | Privacy, Cookie and Legal Notice | All three are accessible from the shared footer and readable on phones. Preserve reviewed legal meaning and consent behavior. |
| 7 | Insights and retained route review | Adapt the required Insights hub, existing category/index pages and editorial detail families to the simpler shell. Retain currently published content and URLs. Review optional fuller service pages and any proposed redirects with their localized destinations. |
| 8 | Complete-site review | Check every core page, required Insights family and retained destination across all public locales, responsive sizes, keyboard use, enlarged text and reduced motion. Reconcile applicable full-version maintenance fixes. |

Do not use the old full-site sprint order to add standalone ARC, Industries, Portfolio or founder pages to the core. These topics belong in the destinations defined by the site plan.

## Acceptance and release

Use [AGENTS.md](../../AGENTS.md), [DESIGN.md](../../DESIGN.md), the [page migration map](../../docs/design-system/page-family-migration.md) and the [contribution workflow](../../docs/contributing-workflow.md). Run checks appropriate to the changed templates and preserve CMS, metadata, locale and contact contracts.

The complete simpler website is ready only when all five main pages, three client details, three policies and the required Insights families meet their briefs and use the shared simpler shell. Generated concepts must remain labelled, project results must remain verified, and booking actions must have truthful behavior. Earlier homepage checks cover that implementation alone.

A release to `main` is a separate explicitly requested action after complete-site review. Preserve the full version locally and on origin before any eventual production change.
