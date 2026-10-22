# Simple v1 website plan

The simpler Hive Vault Arc website has an 11-page core: five main pages, three client case studies and three policy pages. This is the active information architecture for `site/simple-v1`, based on the page list supplied on October 10, 2026.

The owner's October 19 [requirements brief](simple-v1-requirements.md) adds the existing Insights library as required scope alongside this core and records the evolving homepage and storytelling references. The current Home opening pairs its direct offer with an original moving system graphic, followed by a wide real-project gallery and verified-client proof panel. Its index and controls replace the earlier next-project preview. The 11-page count is the core, not a cap on editorial entries or retained URLs. The [implementation review](simple-v1-implementation-review.md) records the local work and verification.

The homepage follows the supplied service studio showcase and long branding website reference: a compact introduction, a broad visual gallery, clear service groups and generous white space. The separate Services, Case Studies and About pages give visitors room to explore those subjects.

## Branch arrangement

| Branch | Role during this work |
| --- | --- |
| `main` | Keep the current full website in production until the simpler website is finished and ready for an explicitly requested release. |
| `site/simple-v1` | Develop and review the simpler website locally. Its upstream is `origin/site/simple-v1`. |
| `site/enterprise-maintained` | Preserve and maintain the full website alongside the simpler version. Its upstream is `origin/site/enterprise-maintained`. |

The full-site preservation point is `304f39c45c597cda7201babd40fd536f611523ac`. Share corrections to company facts, service definitions, legal requirements, translations and integrations between the two maintained versions where they apply. Review each change before transferring it; the simpler site's layout and page consolidation do not automatically belong in the full version.

Finishing a page or pushing a development branch does not move the simpler website to `main`. A later release must review the complete site, preserve the full version and confirm the production change. See the [contribution workflow](contributing-workflow.md).

## The 11 core pages

English paths below use existing canonical routes. Page labels can become simpler without renaming their URLs. Locale equivalents continue to come from `src/i18n/routing.ts`; case-study slugs come from approved published CMS records.

| No. | Page | Existing route to reuse | Required content |
| --- | --- | --- | --- |
| 1 | Home | `/` | Clear hero, service overview, selected case studies, how we work, short team introduction, FAQs and a Book a Call section. |
| 2 | Services | `/capabilities` | Six services grouped into Plan / Build / Run; client problems, deliverables, examples and how an engagement starts. |
| 3 | Case Studies | `/case-studies` | Three prominent client projects with images, the problem, what we delivered and links to their full case studies. |
| 4 | About | `/aboutus` | Company identity, real founder photographs, short bios, where we work and a straightforward account of our approach. |
| 5 | Contact | `/contact` | Short project enquiry form, booking option, approved contact details and an explanation of what happens next. |
| 6 | ImmoWorld CRM and Real Estate Operations | `/case-studies/[slug]` | ImmoWorld's client context and the CRM and real estate operations project. Preserve the actual CMS identity and evidence. |
| 7 | Premium Advice & Training / KeepZen Digital Academy | `/case-studies/[slug]` | The digital academy project, using the approved client identity and published delivery evidence. |
| 8 | Tarik Rami Immobilier Project and Client Management Platform | `/case-studies/[slug]` | The project and client management platform, using the actual project assets and delivery status. |
| 9 | Privacy Policy | `/privacy-policy` | Existing reviewed privacy information, with readable headings and access from the footer. |
| 10 | Cookie Policy | `/cookie-policy` | Existing reviewed cookie information and access to consent preferences. |
| 11 | Legal Notice | `/mentions-legales` | Existing reviewed company and legal information. |

Count each page once across languages. The three named projects are three individual pages, even though they share one dynamic route template. The required Insights library, optional service details, technical endpoints and retained older URLs are additional to this core.

## Navigation and contact

The logo returns to Home. Following the October 19 scope extension, the target main navigation is **Services · Case Studies · About · Insights · Book a Call**. Book a Call leads to Contact; Contact remains a main page without needing a second ordinary menu link.

The footer provides Privacy Policy, Cookie Policy and Legal Notice, along with Insights, useful contact links and the language control. The existing published editorial library is required for this version.

Use a real booking destination when one is configured. Until then, Contact can explain how to request a call through the enquiry form; it must not report a confirmed appointment. The existing contact API is optional. Without it, the homepage form prepares an email draft and tells the visitor to send it in their email app.

## Services content

| Group | Services | What the page must explain |
| --- | --- | --- |
| Plan | Strategy & Business Consulting; Technology Consulting | The business decision or process problem, assessment, priorities and a practical roadmap. |
| Build | AI, Data & Analytics; Software Engineering | The workflow or tool to improve, what will be delivered, integrations and relevant examples. |
| Run | Cloud & Infrastructure; Operations & Managed Services | The systems to operate, setup, monitoring, maintenance and ongoing support. |

Keep the six existing service definitions. Use concrete client problems and deliverables rather than repeating broad transformation claims. Explain how discovery leads to a defined scope and next step. Put service-specific FAQs beside the relevant content.

## Client case studies

Use the same reading order for all three detail pages:

1. Client context.
2. Problem.
3. What we built.
4. Real screenshots.
5. Verified results or delivery status.
6. Contact CTA.

The homepage and Case Studies index link to these details. Each index card needs enough context to distinguish the client's problem and our work. Check current approved CMS evidence before stating delivery status or numerical results. Keep labelled interface concepts and internal demonstrations separate from client evidence.

## Consolidating the larger website

| Existing material | Destination in the simpler experience |
| --- | --- |
| ARC Framework | How we work sections on Home and About. |
| Capabilities overview, Capabilities in Detail and Solution Programs | One Services page organized into Plan / Build / Run. |
| Industry descriptions | Relevant examples within Services and Case Studies. |
| Separate founder profiles | Short founder bios on About. |
| Portfolio overview | Case Studies. |
| FAQs | Home and Services, according to the question. |
| Blog, news, perspectives and reports | Required Insights hub and existing editorial destinations, linked from navigation and footer. Preserve published content, URLs and available translations. |
| Individual service detail pages | Optional additional pages when the service needs a fuller explanation. |
| Location-specific service pages | Retained outside the core while their search value and future treatment are reviewed. |
| Company reference and machine-readable resources | Retained technical and entity references outside the core navigation. |

Consolidating the visitor experience does not immediately remove existing URLs. Keep their current behavior until a route-by-route migration is reviewed. Record any future permanent redirect, destination, locale equivalent and metadata/sitemap changes together. Do not silently redirect useful articles to Home or remove CMS content to reach the page count.

## Implementation state

As of October 20, the 11 core pages and the required Insights hub, indexes and article details are implemented locally on `site/simple-v1`. A shared navigation and footer now connect Services, Case Studies, About, Insights, Contact and all three policies. Home follows the agreed challenge → Plan / Build / Run → real projects → ARC → founders → Insights → FAQ → enquiry sequence. The three named project details use the full approved project records and images. Published editorial entries, localized routes and retained older URLs remain available.

The calendar booking tool is still pending, so the call action leads to a truthful enquiry flow. The six service-detail pages now use the Simple v1 layout while preserving their CMS content. Location pages and other retained destinations keep their existing content pending route-by-route migration review. See the [homepage implementation record](simple-v1-homepage.md), [page migration map](design-system/page-family-migration.md) and [active implementation sequence](../sprints/simple-v1/README.md). No change has been released to `main`.

## Earlier website inventory

The supplied audit recorded 49 distinct live pages across languages and 171 sitemap URLs, with one additional linked demonstration absent from that sitemap. Its categories were company and approach (8), capabilities (9), portfolio and case studies (7), publications (16), location pages (5), policies (3) and company reference (1).

These are the supplied earlier audit's counts, not the new site's target or a current production measurement. Older inventories and sprint reports retain their original dates. Runtime routes and locale availability are determined by the code and approved CMS content.
