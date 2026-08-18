# Website Consistency Migration Map

## Purpose

This document groups the public website into page families so visual changes are implemented once, reused, and verified consistently. It does not authorize copy, route, CMS, or data changes.

## Shared Target

Every family must use the same:

- approved palette and typography roles from `DESIGN.md`;
- navigation, footer, page shell, gutters, buttons, labels, and focus treatment;
- responsive title scale and vertical rhythm;
- canonical logo assets and logo-frequency limits;
- image-job test and proof-frame rules;
- inset treatment for dark emphasis modules;
- mobile behavior at the acceptance widths in `AGENTS.md`.

## Family 0: Shared Shell

Includes the root locale layout, navigation, mobile menu, footer, bottom CTA, cookie/analytics UI, route loading states, error states, and shared brand marks.

Target:

- one navigation system on every public route;
- one full lockup in the footer and one compact mark in navigation;
- no legacy numbered WebP logos;
- no unapproved colors or page-specific header variants;
- a stable content width and gutter system;
- accessible 44px controls and a keyboard-complete mobile menu.

This family is a dependency for every other migration.

## Family 1: Homepage

Route: `/[locale]`

Target:

- retain the trusted light editorial direction;
- use a concise hero title and one purposeful hero visual;
- reduce decorative imagery and repeated marks;
- use framed client proof without allowing client colors into the surrounding UI;
- keep dark emphasis to one inset module before the footer;
- preserve all existing content meaning and calls to action.

## Family 2: ARC Framework

Route: `/[locale]/arc`

Current risk: this family has historically behaved like a separate dark cinematic website with oversized copy and non-canonical visual language.

Target:

- rebuild as a light-first editorial page within the shared shell;
- use one inset dark module only where the framework genuinely benefits from emphasis;
- remove oversized title treatments and repeated standalone marks;
- use a single consistent framework diagram language based on navy, line gray, amber, and white;
- keep existing ARC content and information architecture.

## Family 3: Capabilities And Programs

Routes:

- `/[locale]/capabilities`
- `/[locale]/capabilities/in-detail`
- `/[locale]/capabilities/solution-programs`
- `/[locale]/capabilities/[slug]`

Target:

- shared landing hero and service-card grammar;
- consistent service detail template;
- no decorative image per capability unless the image adds domain evidence;
- no arbitrary accent color per service;
- long technical content uses readable measures, tables, lists, and proof modules.

## Family 4: Industries

Route: `/[locale]/industries`

Target:

- one clear industry directory pattern;
- restrained image use, with no generic image assigned merely to fill each item;
- consistent icon treatment using the approved UI colors;
- proof and case-study links remain visually distinct from category navigation.

## Family 5: Company And Portfolio

Routes:

- `/[locale]/aboutus`
- `/[locale]/aboutus/our-people/[employee]`
- `/[locale]/whoarewe/portfolio`

Target:

- use real team and client evidence first;
- use the wide lockup only for a deliberate company identity moment;
- standardize person cards, portraits, roles, quotes, and proof summaries;
- crop portraits consistently without modifying source identity;
- avoid placing a company mark beside each company-related heading.

## Family 6: Insights And Articles

Routes:

- `/[locale]/insights`
- `/[locale]/insights/news-articles`
- `/[locale]/insights/news-articles/[slug]`
- `/[locale]/insights/perspectives`
- `/[locale]/insights/perspectives/[slug]`
- `/[locale]/insights/research-reports`
- `/[locale]/insights/research-reports/[slug]`
- `/[locale]/blog`
- `/[locale]/blog/[slug]`

Target:

- one editorial index grammar and one article grammar;
- predictable byline, date, reading measure, related-content, and CTA placement;
- images support the subject rather than repeat generic AI imagery;
- no page-specific type system or accent color;
- long titles wrap without crop or overlap.

## Family 7: Case Studies

Routes:

- `/[locale]/case-studies`
- `/[locale]/case-studies/[slug]`

Target:

- keep client colors and screenshots inside framed proof;
- use the website palette for navigation, labels, metrics, and surrounding surfaces;
- standardize challenge, work, outcome, evidence, and next-step sections;
- do not fabricate metrics, client marks, screenshots, or quotes.

## Family 8: Conversion And Local Landing Pages

Routes:

- `/[locale]/contact`
- `/[locale]/ai-agents-morocco`
- `/[locale]/ai-agents-tangier`
- `/[locale]/custom-software-morocco`
- `/[locale]/digital-services-tangier`
- `/[locale]/it-consulting-tangier`

Target:

- one conversion-oriented layout system;
- consistent trust signals, forms, contact cards, FAQs, and location context;
- no visual novelty added only to make SEO pages look different;
- keep forms full-width and labels visible on mobile;
- local/service imagery must be credible and relevant.

## Family 9: Utility And Legal

Routes:

- `/[locale]/privacy-policy`
- `/[locale]/mentions-legales`
- `/[locale]/links`
- locale error, loading, and not-found states

Target:

- quiet, readable, shared-shell layouts;
- no decorative logo repetition;
- legal copy uses a comfortable reading measure and clear heading hierarchy;
- utility pages do not introduce a separate palette or font system.

## Migration Order

1. Establish tokens, canonical assets, and shared primitives.
2. Migrate the shared shell.
3. Migrate the homepage as the visual reference implementation.
4. Migrate ARC and remove the largest outlier system.
5. Migrate capabilities, industries, company, and portfolio.
6. Migrate insights, articles, case studies, conversion, local, and legal pages.
7. Run cross-family responsive, accessibility, performance, and visual-regression QA.

Do not migrate one isolated route inside a family when a shared family template can solve the same problem for all routes.

## Family Acceptance Matrix

Each family passes only when:

- palette audit reports no family-owned violations;
- no legacy numbered logo asset remains;
- logo frequency complies with `DESIGN.md`;
- title line limits pass at desktop and 320px;
- no horizontal overflow exists at all required widths;
- dark modules are inset and limited;
- images pass the image-job test;
- controls meet touch and keyboard requirements;
- content, links, locale behavior, metadata, and CMS rendering remain intact;
- screenshots pass at `390x844`, `820x1180`, and `1440x1000`.
