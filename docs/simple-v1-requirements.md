# Hive Vault Arc — Simple v1 requirements

- Date: October 19, 2026
- Updated: October 20, 2026
- Status: Working requirements brief; local implementation is recorded in [the review](simple-v1-implementation-review.md).
- Working branch: `site/simple-v1`

## 1. Purpose and authority

Build on the simpler website already in this branch. A visitor should quickly understand what Hive Vault Arc does, recognize a relevant business problem, see credible work and know how to start a conversation.

The existing [site plan](simple-v1-site-plan.md) supplies the page inventory and content briefs. This document records the owner's October 19–20 requirements: retain Insights, prioritize SMEs, reuse current content, use the specified storytelling/component references, select a hero direction, and include SEO and structured data. These additions supersede earlier descriptions of publications as optional. The [local implementation review](simple-v1-implementation-review.md) records what has since been built and verified.

The four parts of the brief are **requirements** (sections 2–3 and 7), **inspiration** (sections 4–5), **constraints** (section 6) and **completion criteria** (section 8). Confirmed decisions and remaining inputs are summarized in section 9.

Use [DESIGN.md](../DESIGN.md) for HVA's identity, typography, palette and layout tokens, and [AGENTS.md](../AGENTS.md) for implementation and verification rules. The [homepage record](simple-v1-homepage.md) describes work completed earlier, rather than the full future scope.

The original request for this document did not authorize implementation. The owner later asked for the website build on `site/simple-v1`; that local work does not authorize a release.

## 2. Confirmed owner requirements

| ID | Requirement |
| --- | --- |
| R1 | Create a simple, coherent company website using the existing Simple v1 work and agreed page inventory. |
| R2 | Develop on `site/simple-v1`. Keep the full website on `main` until the simpler version is complete and its release is explicitly requested. Preserve `site/enterprise-maintained` as the maintained full version. |
| R3 | Include the existing Insights material: blog posts, news/articles and other published editorial content already used by the full website. Reuse the content and integrations rather than asking the owner to recreate them. |
| R4 | Use Solvestack as the primary reference for explanation, company storytelling and the progression between sections. |
| R5 | Use QuantumFlux as a reference for visual composition, components, layout, motion and making the offer easy to understand. |
| R6 | Choose the most suitable homepage hero from Hero 231, Hero 213 and Hero 230, adapting the direction to HVA. The owner delegated this choice. |
| R7 | Keep HVA's established branding and fonts, large shared navigation/wordmark, real client proof and the previously requested discovery-call action. |
| R8 | Prioritize small and medium enterprises struggling with disorganized operations, disconnected workflows or missing software such as a CRM. Larger companies remain a secondary audience. |
| R9 | Reuse current approved company content and the same published Insights content from Sanity for now. A wholesale copy rewrite or editorial migration is not part of this brief. |
| R10 | Use Apple Cards Carousel as the direction for a horizontal selection of random existing Insights. Record the other supplied components as preferred references, selecting coherent combinations rather than adding every variant. |
| R11 | Include technical/on-page SEO and accurate structured data, especially for Home, Services, Case Studies and Insights articles. Preserve the existing SEO contracts while redesigning. |
| R12 | Complete all agreed pages with a distinctive, polished design drawn from the supplied references. Home must explain who HVA is, exactly what it does and some of its work, using creative sections that still make the offer easy to understand. |
| R13 | Refine Home again: let [Softriver](https://www.softriver.co/) and [Hero 213](https://www.shadcnblocks.com/block/hero213) guide the header/hero, use [QuantumFlux](https://quantumflux.framer.ai/) for the remaining page's visual rhythm, and keep [Solvestack](https://solvestack.framer.website/) as the storytelling reference. |
| R14 | Give Home a more distinctive overall visual personality. Use stronger editorial transitions, a clear image-led service rhythm and real project screens, while retaining the approved HVA brand, readable offer and verified proof. |
| R15 | Push Home toward a bolder digital and dynamic visual personality. Adapt the supplied references into HVA's approved light-first system; keep real project evidence distinct from explanatory diagrams and illustrative service imagery. |

### Audience and message

The primary audience is an SME whose daily work has become difficult to manage: fragmented information, disconnected tools, manual handoffs or a need for a CRM or other practical business software. Explain the work through recognizable business situations before introducing technologies. Connect Plan / Build / Run to clearer priorities, better workflows, useful software and reliable operations.

Keep the six existing services and the ability to serve larger organizations. Do not narrow the company to CRM development alone. The owner has not specified a priority industry or geographic market; use existing approved company facts and project evidence without inventing regional targeting or industry credentials.

### Booking and content decisions

The owner is developing a calendar-based booking tool, but its URL and integration contract are not available. Retain the current discovery-call request flow until that tool is supplied. Do not build a replacement calendar, display invented availability or claim a confirmed booking. Its later integration is a separate dependency and does not prevent completing the current enquiry experience.

Reuse the same approved company and CMS editorial content for now. Changes to composition, ordering, navigation and technical metadata may improve clarity, but must preserve factual meaning, original authorship and publication history. Request new copy or assets only for a specific gap that the existing material cannot fill.

## 3. Pages and content

Keep the existing 11-page core and add the required Insights experience. The total is not capped at 12 pages: existing editorial entries have their own URLs, and each public language has its localized equivalents.

Paths below are English route patterns. Reuse the actual localized paths in `src/i18n/routing.ts`, published CMS slugs and existing metadata contracts.

| Page or family | Route | Required purpose and content |
| --- | --- | --- |
| Home | `/` | Explain the offer, show relevant problems, services, real work, approach, people and a clear next step. Follow the narrative in section 5. |
| Services | `/capabilities` | Explain the six existing services through Plan / Build / Run. Include problems, deliverables, relevant examples, how engagements begin and useful FAQs. |
| Case Studies | `/case-studies` | Present the three agreed client projects with clear context and links to full details. |
| About | `/aboutus` | Explain the company, real founders, short bios, where HVA works and its practical approach. |
| Contact | `/contact` | Provide a short enquiry flow, approved contact details, discovery-call information and truthful next steps. |
| ImmoWorld detail | `/case-studies/[slug]` | Reuse its approved CMS record, CRM/real-estate operations story and actual project assets. |
| Premium Advice & Training / KeepZen detail | `/case-studies/[slug]` | Reuse the approved digital academy identity, delivery story and evidence. |
| Tarik Rami Immobilier detail | `/case-studies/[slug]` | Reuse the approved project/client management platform story and assets. |
| Privacy Policy | `/privacy-policy` | Preserve reviewed legal meaning and present it readably. |
| Cookie Policy | `/cookie-policy` | Preserve reviewed policy content and consent-preference access. |
| Legal Notice | `/mentions-legales` | Preserve approved company and legal information. |
| Insights hub | `/insights` | Give visitors one clear entry to the existing editorial library, with understandable content types/topics and access to individual entries. |
| Blog index and entries | `/blog`, `/blog/[slug]` | Retain existing published blog content and its working links. |
| News/articles index and entries | `/insights/news-articles`, `/insights/news-articles/[slug]` | Retain existing published news and articles. |
| Perspectives index and entries | `/insights/perspectives`, `/insights/perspectives/[slug]` | Retain existing published perspectives. |
| Research reports index and entries | `/insights/research-reports`, `/insights/research-reports/[slug]` | Retain existing published reports and source information. |

Do not add separate core pages for ARC, industries or founder profiles merely because the full website has them. Use the consolidation map in the site plan. Existing additional URLs remain available until their migration is reviewed.

### Insights requirements

- Treat Insights as required scope, with an obvious navigation entry and a footer link. A unified hub can keep the site simple without losing the library's depth.
- Reuse the existing Sanity integration, published records, images, authors, dates, citations, content-type distinctions and available translations. Keep technical content types separate from reader-facing labels when necessary.
- Preserve individual URLs, localized slugs, canonical metadata, language alternatives and sitemap behavior. Any eventual redirect needs a separate route-level review.
- Make the collection usable on phones: readable cards or rows, clear type/topic labels, working category navigation and pagination or loading behavior appropriate to the existing collection. Preserve useful existing search/filter behavior; do not add controls without working behavior.
- Individual entries need a readable title, available publication metadata, complete article content, source/credit information and a route back to the library. Include related material where supported by actual content.
- Keep all currently published editorial content by default. Flag content the owner may want excluded; do not silently delete, unpublish or rewrite it.
- Preserve existing translation/fallback rules and clearly identify fallback-language content. Do not imply every article already exists in every language.
- Earlier editorial rewrite drafts and migration proposals are not permission to replace published text or mutate the CMS. See the [editorial implementation record](insights-editorial/README.md) for its historical context.

## 4. Reference roles and selected hero

The references guide different decisions. They do not replace HVA's company facts or brand system.

| Reference | Apply to HVA |
| --- | --- |
| [Solvestack](https://solvestack.framer.website/) | Make the story move from a clear offer and recognizable problems to services, evidence, practical questions and a conversation. Each section should answer the next question a prospective client would ask. |
| [QuantumFlux](https://quantumflux.framer.ai/) | Use deliberate framing, strong hierarchy, distinct service chapters and measured scrolling transitions. Make capabilities concrete through meaningful imagery and real work. Adapt the composition to HVA's light palette and existing typography. |
| [QuantumFlux About](https://quantumflux.framer.ai/about-us) | Adapt its large editorial introduction, split image-and-statement panel, open process sequence, staggered evidence and people-led composition to HVA's About page. Use the three real founders, published client projects and existing ARC phases instead of its timeline dates, awards or metrics. |
| [Hero 231](https://www.shadcnblocks.com/block/hero231) | Alternative considered: a split composition with a portrait coverflow and logo band. This emphasizes people/gallery motion more than HVA's business-system offer. |
| [Hero 213](https://www.shadcnblocks.com/block/hero213) | Latest gallery reference: large imagery with a smaller next-project preview and clear previous/next interaction. Keep HVA's actual product screenshots readable, rather than applying the reference's crop to a client interface. |
| [Hero 230](https://www.shadcnblocks.com/block/hero230) | Initial selected direction: a centered message and actions, followed by client proof and a horizontal visual strip. Its content hierarchy remains useful in the revised composition. |

The owner's [Softriver](https://www.softriver.co/) and [Hero 213](https://www.shadcnblocks.com/block/hero213) request superseded the centered Hero 230 composition. The later **bolder digital and dynamic** direction makes a full-width navy opening the current wide-screen model: a larger offer and direct actions lead into one wide, readable screenshot from a published project, with manual gallery controls. A white band carries verified counts and real client logos. Phones stack the same material in its semantic order. The [Solvestack](https://solvestack.framer.website/) question-to-answer sequence drives the remainder: recognizable problems, connected services, real projects, process, people, insights and an enquiry. The problem chapter uses three direct, numbered explanations and one compact illustrative diagram of separate inputs converging into a connected output. Remove repeat sections when their message is already conveyed; the separate working-together values block has been folded into the offer, process and founder introduction. Do not import source-site colors, copy, prices or unverified claims.

### Hero content and behavior

1. Lead with the established message: **“We plan, build and run your business systems.”**
2. Retain the approved benefit: **“Built to save you time. Planned around your budget.”** Support it with one short, plain explanation of strategy, AI, software, cloud and ongoing operations.
3. Make **“Book your free 30-minute discovery call”** the primary action and a work/case-studies link the secondary action. These must have real destinations.
4. Place real client proof close to the offer. Preserve grayscale logos with their existing animated color reveal on hover and keyboard focus.
5. Use a large, readable gallery of the three approved project screenshots with a small next-project preview and manual controls. The later Case Studies section supplies the full context; do not duplicate its dossier inside the hero.
6. Keep the hero readable on a normal laptop without requiring scrolling to reach the main action. Avoid forcing its height or shrinking copy to fit.
7. Retain the requested amber background movement behind the gallery where it remains readable. Keep its pause control, stop it off-screen and make it static under reduced motion. Project changes are manual; avoid running a second automatic carousel against the moving background and logo proof.
8. Use only documented company numbers. The current six-service/three-founder facts may remain as compact context if still verified; do not invent savings, ratings, prices, scarcity or turnaround promises.

The three Shadcnblocks pages identify these as Pro blocks. Their public descriptions and official screenshots were reviewed; paid source code was not accessed. An original implementation inspired by the selected layout is the default. Exact block-source reuse would require the owner's appropriately licensed source.

### Additional component references — October 20

**Owner-specified placement:** Apple Cards Carousel must inform the horizontal Insights selection. The other placements below are implementation recommendations, since the owner supplied them as liked references without assigning every block to a particular page. Alternatives are choices within a section, not instructions to duplicate the section.

| Reference | Suggested place and adaptation | Status |
| --- | --- | --- |
| [Apple Cards Carousel](https://ui.aceternity.com/components/apple-cards-carousel) | Home's Selected Insights: large readable editorial cards, horizontal touch scrolling, arrows and links to existing articles. Apply the selection contract below. | Explicit owner placement. |
| [Logo Cloud With Swap Animation](https://ui.aceternity.com/blocks/logo-clouds/logo-cloud-with-swap-animation) | Homepage client-proof area: measured swaps among real approved client logos, retaining grayscale and hover/focus color reveal. Keep stable links and accessible client names during swaps. | Preferred proof/motion reference. |
| [CTA With Background Noise](https://ui.aceternity.com/blocks/cta-sections/cta-with-background-noise) | Final discovery-call section: a distinctive inset CTA with restrained texture made from HVA tokens and readable text/form controls. | Preferred closing-CTA direction. |
| [About 25](https://www.shadcnblocks.com/block/about25) | About page and a shortened Home introduction: clear company story, real imagery, people and a useful next step. Use metrics only if verified. | Preferred About reference. |
| [Testimonial 33](https://www.shadcnblocks.com/block/testimonial33) | Candidate composition for a client-proof section; select only when the available real quotes/assets support it. | Alternative; exact block page needs visual inspection. |
| [Testimonial 2](https://www.shadcnblocks.com/block/testimonial2) | Candidate for a compact people-led invitation near a CTA. Use real approved portraits; do not imply those people are customers or reviewers when they are founders. | Alternative. |
| [Testimonial 39](https://www.shadcnblocks.com/block/testimonial39) | Candidate for proof connecting real client quotes to project imagery and case-study links. | Alternative. |
| [Testimonials Photo Carousel](https://ui.aceternity.com/blocks/testimonials/testimonials-photo-carousel) | Alternative photo-led client-proof treatment when approved quotes and corresponding photographs exist. | Alternative. |
| [Social Proof 12](https://pro.reactbits.dev/docs/blocks/social-proof/social-proof-12?variantSort=latest) | Additional client-proof candidate; inspect the live block before choosing its composition. | Reference saved; public text does not establish the full visual behavior. |
| [Team 12](https://www.shadcnblocks.com/block/team12) | About founders and a compact Home team preview. Its portrait-trio direction can suit the three real founders. | Recommended team starting point. |
| [Team 14](https://www.shadcnblocks.com/block/team14) | Alternative team layout, to compare with Team 12 using real bios and photographs. | Reference saved; exact page needs visual inspection. |
| [Shader 19](https://www.shadcnblocks.com/block/shader19) | Optional reference for one distinctive ambient visual, adapted to HVA's palette. Choose between this and existing wave treatment where they compete. Include a static fallback and keep it behind content. | Optional effect; subject to readability and performance checks. |
| [Process 2](https://www.shadcnblocks.com/block/process2) | Home's Plan / Build / Run chapters use one sticky, changing visual on desktop and inline images on smaller screens. The same pattern can be considered for the ARC explanation on Services when it adds clarity. | Applied to Home services. |
| [Process 1](https://www.shadcnblocks.com/block/process1) | Home's ARC explanation uses a sticky heading beside three numbered, border-separated stages on one vertical line. Preserve Assess → Re-engineer → Command rather than adopting the template's step count. | Applied to Home ARC process. |
| [Case Study 1](https://www.shadcnblocks.com/block/case-study1) | Long-form project narrative with practical navigation and evidence. Metric modules are conditional on actual approved results. | Case-detail alternative. |
| [Case Study 8](https://www.shadcnblocks.com/block/case-study8) | Case-study detail structure with client/company context beside the project story and real screenshots. | Recommended case-detail starting point. |
| [Contact Form Grid With Details](https://ui.aceternity.com/blocks/contact-sections/contact-form-grid-with-details) | Contact page: clear enquiry form beside approved contact facts and next-step information. Preserve the existing delivery contract. | Recommended Contact starting point. |
| [Contact 5](https://pro.reactbits.dev/docs/blocks/contact/contact-5?variantSort=latest) | Alternative Contact composition, to compare once its live layout has been inspected. | Reference saved; public text does not establish the full visual behavior. |
| [Stats 18](https://pro.reactbits.dev/docs/blocks/stats/stats-18?variantSort=latest) | Optional compact company-fact presentation on Home/About, using only verified numbers. Do not manufacture a statistics section to fill the reference. | Reference saved; exact visual behavior remains to inspect. |

Do not add separate sections for every testimonial, team or process reference. Choose a consistent composition for each purpose. Client quotes, portraits, ratings, project outcomes and client identities must come from approved evidence. If real testimonials are unavailable, use an honest project-proof composition rather than invented quotes, stars or endorsements.

The reference register records the owner's preferences. Public descriptions were checked where available; unavailable or app-only previews are explicitly marked. Recheck the actual visual states before implementing a candidate. Reuse paid source only when appropriate access is provided; an original adaptation remains the default.

### Random Insights carousel contract

- Select a small, varied set of existing published CMS entries across eligible editorial types. Exclude drafts, entries marked non-indexable from public promotion, duplicates and entries without a valid destination.
- Prefer content in the current language. Preserve the existing clearly labelled fallback policy when no translation exists; do not invent translated titles, slugs or content.
- Randomize the selection on the server or within an intentional cache/refresh interval. Keep that selection/order stable between server HTML and hydration and during a visitor's interaction. Never shuffle on every render or layout resize.
- Cards show the actual title, content type and available approved cover image, with a real crawlable link to the full entry. Any enlarged preview is optional; the carousel must not become the only location of the article body.
- Provide manual arrows, native touch/trackpad scrolling, keyboard access and RTL behavior. Keep focus visible and controls at least 44px. Do not require autoplay or dragging as the only navigation.
- Reserve image/card geometry to avoid layout shifts. Reduce motion without hiding articles. Show a simpler list when the available set is too small; omit an empty section rather than fill it with placeholder articles.
- Keep a visible link to the complete Insights library. Random selection must not make it impossible to discover the rest of the content through index/category navigation and pagination.

## 5. Homepage storytelling

Recommended section order, adapting the owner's references to the existing HVA content:

| Order | Section | Question it answers | Content and behavior |
| --- | --- | --- | --- |
| 1 | Shared navigation and hero | What do you do, and is it relevant to me? | Large existing wordmark/navigation, direct offer, time/budget benefit, call/work actions, client proof and compact visual preview. |
| 2 | Recognizable challenges | Do you understand our situation? | A few concrete business problems, such as unclear priorities, disconnected tools and unstable operations. Connect each to a relevant service group. |
| 3 | Plan / Build / Run | How can you help? | Explain the six services in three understandable groups, with outcomes and deliverables rather than a list of technologies. |
| 4 | Selected case studies | Have you done relevant work? | The three agreed client projects, their actual context, what HVA delivered and links to full evidence. |
| 5 | ARC delivery process | What will working with you involve? | Assess → Re-engineer → Command, explained in plain language with concrete activities and next steps. |
| 6 | People and working relationship | Who will work with us? | Short company/team introduction, real founders and the practical working relationship, linking to About. Combine these into one section when that reads more clearly. |
| 7 | Selected Insights | Can I learn more before contacting you? | Apple Cards Carousel-inspired horizontal selection of random eligible published pieces, stable during reading, with a link to the full library. |
| 8 | Practical FAQ | What might stop us from starting? | Service fit, starting small, current systems, scope/timing/budget discussion and ongoing support. Use approved answers. |
| 9 | Discovery-call enquiry | What should I do next? | Clear invitation, the free 30-minute call, a short request/booking flow and an honest explanation of what happens next. |
| 10 | Shared footer | Where can I find the rest? | Core destinations, Insights, approved contact information, language access and all three policies. |

This order is the proposed implementation structure within the owner's delegated discretion. Sections can be combined or shortened when their information overlaps. Maintain the progression from understanding to evidence to action; do not add a section solely to imitate a template.

### Inner-page structure

Use the page briefs already agreed in the site plan. Make each page's opening explain its purpose before showing detailed content. Keep the same shared navigation, footer, spacing system and action language throughout.

- **Services:** client problem → relevant group/service → deliverables/examples → how to begin → service-specific questions → Contact.
- **Case-study details:** client context → problem → what we built → real screenshots → verified results or delivery status → Contact.
- **About:** company purpose → ARC approach → published client work → real founders and working relationship → Contact.
- **Contact:** what the call/enquiry is for → short form or configured booking → approved contact details → next steps.
- **Insights:** library navigation → relevant entries → complete readable article/report → related content and contextual next step.
- **Policies:** clear title and reviewed text, with accessible navigation and consent controls where applicable.

## 6. Shared components and design constraints

### Reusable parts

Use shared components for navigation, language selection, footer, primary/secondary actions, content frames, section headings, client logos, service chapters, case-study previews, editorial previews, FAQ disclosures and contact states. Reuse the existing project components where suitable. Share editorial detail primitives while retaining type-specific fields and evidence.

Proposed navigation: **Services · Case Studies · About · Insights**, with **Book a Call → Contact** as the main action. The logo returns to Home. Contact remains directly reachable through the action and footer. Use a compact mobile menu when the labels no longer fit.

### Brand and composition

- Preserve the deployed site's approved wordmark assets and typography: Manrope for hero/body/navigation/controls, Newsreader for section/card headings, and the existing Arabic font treatment.
- Use the existing color tokens: white `#FFFFFF`, warm canvas `#FCFBF8`, navy `#1A2535`, body gray `#536174` and amber `#E8A838`. All other states must use approved semantic tokens from DESIGN.md.
- Keep a predominantly light page, restrained amber accents and real project colors inside their media frames. Follow the existing limit on substantial dark emphasis modules.
- Use the established compact/standard content frames, gutters, spacing scale and component geometry. Extend shared semantic tokens when a new layout needs them.
- Preserve meaningful whitespace and varied section rhythm. Images should explain a person, project, system or approved concept.
- Make the composition specific to HVA's services, people and real work. Avoid interchangeable template sections, repetitive card grids and decorative effects that obscure what the company does. Evaluate the supplied references as a coherent direction rather than a collection of widgets.
- Reference layouts do not authorize importing their fonts, branding, testimonials, client logos, business claims or unrelated media.

### Interaction and technical behavior

- Keep the existing Next.js/React/TypeScript/Tailwind/Sanity/next-intl stack and contracts. A component reference does not require adding its animation libraries or changing Tailwind versions.
- Preserve English, French, Spanish and Arabic, including right-to-left reading order and localized routes.
- Support keyboard navigation, visible focus, accessible menu/FAQ states, meaningful image alternatives and touch targets of at least 44px.
- Keep native scrolling. Any sticky chapter, stacked panel or parallax treatment must remain readable and fall back to ordinary flow on small/short viewports and with reduced motion.
- Carousels need working controls, understandable labels and touch/keyboard access. Automatically moving content needs pause behavior; decorative movement must never carry essential information.
- Preserve existing consent, analytics, contact delivery and error handling. A request for a call must not be presented as a confirmed appointment unless a booking system confirms it.
- Use the configured enquiry/booking behavior. If no booking URL is available, retain the truthful request flow; do not invent a calendar link.
- The owner's separate calendar tool is pending. Keep the current request flow usable and prepare an ordinary configurable destination/integration point without implementing a new scheduling product.
- Preserve server rendering, metadata, internal links and content availability. Avoid heavy media or client-side animation that prevents reading the page before hydration.
- Use the previously requested design, motion and design-system skills during the later build. Reference components must fit the project's brand, responsive rules and existing stack. A shader must have a static fallback, respect reduced motion, stop off-screen/when the page is hidden and never contain essential text or navigation.

## 7. SEO and structured-data requirements

### Search intent and on-page content

The priority is helping relevant SME clients discover and understand HVA's actual services. Map distinct intent to existing destinations instead of creating competing pages for every keyword. Home explains the company and overall offer; Services answers practical service needs; Case Studies demonstrates actual delivery; Insights answers the subject of each existing publication.

| Page family | SEO/content requirement |
| --- | --- |
| Home | Clearly identify Hive Vault Arc, its SME-oriented business-system offer, Plan / Build / Run, real client work and the discovery-call next step. Keep meaningful links to Services, Case Studies, About and Insights in readable HTML. |
| Services | Explain all six service pillars with descriptive headings, business problems, deliverables and relevant proof. CRM/workflow examples support the offer without replacing the other services. Existing sections can meet this need; six new landing pages are not required. |
| Case-study index/details | Use distinct client/project titles, accurate summaries, real images, client context, delivered work and verified results or honest delivery status. Link to relevant services and enquiry. |
| Insights hub/categories/articles | Preserve published text, article identities, authorship, dates, sources and useful metadata. Keep titles descriptive, full article text readable without interaction, and related links relevant. Random homepage cards supplement the complete library. |

Every indexable page needs a suitable unique title, useful meta description, clear main heading and logical heading hierarchy, canonical URL, appropriate robots directives, and accurate social-sharing title/description/image. Preserve reviewed CMS SEO values when appropriate; report specific missing or inconsistent fields rather than undertaking an unrequested editorial rewrite. Do not keyword-stuff copy or add unsupported geographic, industry or performance claims.

### Technical and multilingual SEO

- Preserve the canonical production origin from the existing shared configuration. Internal links, canonical/Open Graph URLs, JSON-LD identifiers and sitemap URLs must agree on host, locale and slug. No localhost, preview host or stale alias may leak into production metadata.
- Keep indexable canonical pages directly reachable with correct status codes. Missing content must return the existing proper not-found behavior; remove accidental soft 404s, redirect chains and broken internal destinations.
- Preserve useful existing editorial and client-project URLs. Record source/destination, language variants and metadata/sitemap effects before any future permanent redirect. Do not send unrelated retired pages to Home.
- Use self-canonicals for genuine translated pages and reciprocal `hreflang` only for available equivalents, including self references. Follow the existing `x-default` and fallback/indexability policy. Do not canonicalize every real translation to English or invent untranslated alternates. See [Google's localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).
- Keep sitemap entries limited to intended canonical, indexable URLs. Use actual content changes for `lastmod`; a design build or random carousel refresh is not an editorial publication/update date.
- Retain deliberate robots/noindex handling for internal search/filter combinations, drafts, previews and missing translations. Keep non-production deployments out of indexing using the existing environment policy; ensure those restrictions do not reach production. Blocking crawling alone does not substitute for a deliberate indexing policy.
- Preserve server-rendered core content and real anchor links. Article bodies, service explanations and project evidence must not require opening a carousel/modal, scrolling through a shader or accepting analytics cookies to read them.
- Reserve media dimensions, use responsive optimized images, load off-screen media appropriately, and avoid eagerly loading entire carousels or GPU effects before the main content. Target good Core Web Vitals: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile when sufficient field data exists. Record local lab evidence separately from post-release field measurements. See [Google's Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).
- Preserve existing consent-aware measurement and metadata contracts. Search Console verification/submission and production monitoring belong to an explicitly authorized release/post-release task; they are not evidence already available from local work.

### Schema architecture and data sources

Use the invoked [schema skill](C:/Users/khali/.codex/skills/schema-markup/SKILL.md) as implementation guidance, with current primary documentation taking precedence over outdated examples or feature claims. The requirements below are for the later build, not JSON-LD added by this documentation change.

Use server-rendered JSON-LD through the existing `src/components/JsonLd.tsx`, schema helpers/IDs in `src/lib/seo.ts`, locale routing, shared organization facts and published CMS data. Preserve safe JSON serialization. Inspect layout-level schema before adding page-level nodes; extend/reuse the existing graph instead of creating conflicting Organization, WebSite or article objects.

Keep the established canonical `/#organization` and `/#website` identifiers. Page/content IDs derive from the actual canonical localized URL. Connect nodes with `@id`, `publisher`, `provider`, `isPartOf`, `mainEntityOfPage` and breadcrumbs where relevant. JSON-LD may be an `@graph` or compatible existing JSON-LD scripts; correctness and entity consistency matter more than the number of script tags.

| Page | Required schema design | Data contract |
| --- | --- | --- |
| Home | Existing **Organization**, **WebSite** and localized **WebPage**, consistently linked. | Use the approved company name, canonical site URL, real logo, description and verified contact/profile facts. Keep WebSite `name` and canonical homepage `url`; reference the same publisher identity. Do not duplicate layout nodes or create extra businesses from service labels. |
| Services | Localized **CollectionPage**/WebPage, **ItemList** of the six actual **Service** nodes, and **BreadcrumbList** matching navigation. | Each service has a stable identity, visible name/description and actual URL or section anchor; its `provider` references HVA. Include `serviceType`/`areaServed` only where supported by approved visible content. Do not invent prices, `Offer` amounts or service locations. |
| Case-study index | **CollectionPage**, **ItemList** for the visible client-project cards, and **BreadcrumbList**. | List identities, order, titles, images and destinations must match the rendered collection. Internal demos are not labelled as client work. |
| Case-study detail | **Article** for the existing narrative case-study pages, connected to a localized **WebPage**, publisher and **BreadcrumbList**. | Use the actual project headline, summary, representative image, original publication/modification dates when known, and true author. Describe client/project subject without implying a rating or endorsement. Do not invent a `CaseStudy` type, Product listing or outcome metric. |
| Insights hub/category | **CollectionPage**, optional **ItemList** describing the rendered collection, and **BreadcrumbList**. | Use actual editorial entries and canonical destinations. A changing/random homepage selection must never become a fabricated complete catalogue. |
| Insights blog/article | **BlogPosting** for a genuine blog post, **NewsArticle** for genuine news reporting, otherwise **Article** for an editorial perspective, plus localized page/publisher/breadcrumb relationships. | Use CMS headline, description, relevant image, actual authors and original dates. An actual research report may use **Report** where semantically appropriate; this is not a promised Google Article rich-result feature. Do not attach multiple competing article types just to increase markup. |
| About/Contact | Appropriate **AboutPage**/**ContactPage**, reusing the established organization identity and breadcrumbs. | Real founders may have Person nodes when their visible biographies support them. Do not invent a public office, phone number or calendar action. |

`Service`, `CollectionPage`, `ItemList` and `Report` describe meaning; their use alone does not guarantee a Google rich result. Treat [Google's Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article), [Organization documentation](https://developers.google.com/search/docs/appearance/structured-data/organization), [site-name guidance](https://developers.google.com/search/docs/appearance/site-names), [breadcrumb documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Schema.org Service](https://schema.org/Service) and [Schema.org Article](https://schema.org/Article) as the primary references for these decisions.

### Schema accuracy and current eligibility

- Mark up content that readers can actually find on that page. Names, descriptions, visible breadcrumbs, client relationships and project status must agree with the rendered content. Follow [Google's general structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- Use the real author, whether Person or Organization; never turn a publisher into a fictional named author. Preserve source attribution and available author/profile links.
- `datePublished` is the original publication date; `dateModified` reflects a real content change. Use valid ISO 8601 values, with timezone information when known. Do not populate both from a build date, carousel shuffle or an unrelated last-updated field. If source data is missing, omit unsupported optional values and record the data gap for review.
- Use crawlable, absolute representative image URLs with meaningful image metadata. Do not use a company logo as the article's only image when it does not represent that article.
- As checked October 20, 2026, Google has retired FAQ rich results and removed the feature documentation. Visible FAQs can still help visitors; retaining accurate FAQPage for semantic purposes is optional, not a Google eligibility/completion target. Do not add FAQ/HowTo markup or a fictitious site-search action on the assumption that it creates an enhanced Google result. See [Google's current documentation updates](https://developers.google.com/search/updates).
- Testimonials and verified business facts can be displayed without rating schema. Do not add Review/AggregateRating to HVA's own company/service marketing merely to seek stars, or turn client logos/founder counts into reviews. Review any existing ProfessionalService/LocalBusiness typing for factual fit and required location details rather than inheriting it blindly.
- Article and Organization properties listed in Google's current guidance are largely recommended, not a universal set of mandatory fields. Supply applicable facts; do not fabricate data to eliminate an optional warning. Valid markup does not guarantee rankings, indexing, a knowledge panel or rich-result display.

### SEO/schema acceptance for the later build

1. Audit the existing schema before editing. Cover Home, Services, the Case Studies index and each of its three details, the Insights hub/categories and representative entries from every editorial type; check every public locale with available content.
2. Verify the server HTML and rendered DOM: titles, descriptions, headings, canonicals, robots, reciprocal available alternates, crawlable links and JSON-LD. Check hydration does not introduce duplicate or conflicting entities.
3. Parse every JSON-LD script, verify valid types/properties, stable IDs, real canonical URLs and consistency with visible/CMS content. Add meaningful regression coverage for source-to-schema fields, missing optional data, dates, locale availability and duplicate entity conflicts.
4. Validate representative outputs with the [Schema.org Validator](https://validator.schema.org/) and use [Google's Rich Results Test](https://search.google.com/test/rich-results) only for supported features. Site-name/Service semantic markup need not appear as a supported rich-result item. Fix critical errors; review non-critical warnings and document legitimate missing optional data.
5. Crawl intended indexable destinations locally: verify status, links, canonical/robots/sitemap consistency, language alternatives, readable body content and no preview-host leakage. Record actual checks and remaining inherited issues; do not claim a live Google result from a local validation.
6. At a separately authorized production release, verify the production robots/noindex state, sitemap and representative URLs in Search Console where access is available. Record coverage/performance observations when data exists; traffic or ranking gains are not a local completion prerequisite.

## 8. Completion criteria for the later build

- Every core page and the required Insights index/category/detail families work in the shared simpler experience.
- The offer, service groups, real proof, working process and next action are clear without relying on animation.
- Home explains who HVA is, what it does and actual work to the primary SME audience. Services explains every offered pillar through concrete business needs and deliverables.
- The visual review shows a deliberate HVA identity, creative section composition and varied layouts inspired by the supplied references. Reject a visually interchangeable template, repeated generic card sections, unreadable effects or decorative filler even when the code builds.
- The Insights carousel follows the Apple Cards direction, offers a valid random published selection and remains usable without motion, dragging or JavaScript-only navigation.
- All published editorial entries in the agreed inventory remain reachable; missing translations follow existing fallback rules without broken links.
- Shared header/footer and primary actions behave consistently across pages and languages.
- No invented business claims, placeholder case studies, empty sections or nonfunctional controls remain.
- Layouts work at 320, 375, 390, 430, 768, 820, 1024, 1280, 1440 and 1920px, including enlarged text, Arabic, keyboard use and reduced motion.
- Review screenshots for every affected page family at 390×844, 820×1180, 1440×1000 and 1920×1080. Check title wrapping, edge spacing, image readability, focus states and console errors.
- Run the repository's required brand/responsive audits, relevant lint/tests, production build and whitespace checks. Distinguish inherited audit baselines from new defects.
- Verify navigation, CMS-backed views, localized metadata, consent and enquiry success/failure behavior without sending real test enquiries.
- Complete the SEO/schema acceptance above, including source accuracy, multilingual canonical/alternate checks, validation and representative family coverage. Record legitimate external/post-release dependencies separately from finished local work.
- Record what was built and verified. Finishing the implementation does not itself authorize pushing, merging to `main`, deployment or CMS publication.

## 9. Confirmed decisions and remaining inputs

The October 20 answers settle the priority audience, current content source, existing brand/stack and interim booking behavior. These do not need to be supplied again. The owner subsequently requested implementation and may still add page-specific references for later refinement.

| Item | Decision/status | Implementation handling |
| --- | --- | --- |
| Priority audience | Confirmed: SMEs with operational chaos and practical software/system needs; larger companies secondary. No narrower market or industry specified. | Use this order in messaging while preserving the full service offer and approved company facts. |
| Branding and technical stack | Confirmed: existing HVA brand and project stack, including Next.js and Sanity. | Reuse existing tokens, assets, fonts, CMS contracts and localization. |
| Page/component references | The October 20 register adds 19 references; further page-specific references may follow. | Apple Cards Insights placement is explicit. Choose among other alternatives coherently; inspect unavailable previews before implementing them. |
| Booking destination | Pending: owner's calendar tool is in development and cannot be provided yet. | Complete the existing call-request flow; integrate the separate tool when its URL/contract is supplied. |
| Content | Confirmed: reuse the existing company content and the same Insights content in the CMS for now. | Preserve published text, authors, source evidence, dates, identities and locale availability. |
| Completion priorities | Confirmed: all agreed pages, a distinctive polished design and a homepage that clearly explains HVA and its work; add the SEO/schema criteria in section 7. | Review functional, visual, content and SEO evidence together. Passing a build alone is insufficient. |
| Final execution request | Subsequently provided by the owner for `site/simple-v1`. | Complete and review the local implementation against this brief; keep release to `main` separate. |

Exact paid component source is optional and needed only if exact source reuse is requested. No purchase is required for the default original interpretation of the public layout reference.

## 10. Inspection record

Reviewed October 19, 2026: the active site plan, design system, homepage implementation record, existing Insights page and localized routing, and the publication route definitions on local `main` (read-only). Solvestack was reviewed through its live public page content; QuantumFlux through the live browser; all three hero choices through official descriptions and published preview screenshots.

Updated October 20, 2026: recorded the owner's SME audience, pending calendar tool, unchanged CMS content and qualitative completion requirements. Read the schema skill and checked current Google Search Central/Schema.org guidance. Reviewed the existing JsonLd component, shared schema IDs, layout Organization/WebSite nodes, Services, case-study and article schema sources read-only. Existing last-updated/publication field use and any fixed article-specific subject values must be checked against actual CMS/visible content during implementation, rather than presumed correct.

The additional component register includes all 19 supplied URLs. Public text was accessible for Aceternity's five pages and most Shadcnblocks descriptions; Testimonial 33 was identifiable through the official block catalogue. Testimonial 33/Team 14 exact pages and React Bits Stats 18 were not inspectable through the text fetch. React Bits Social Proof 12/Contact 5 exposed documentation shells after removing the sorting query; their full previews and paid source were not assessed. These access limits do not remove the references from the brief or imply the components are unavailable to the owner.

This establishes the requirements and design selection. The [implementation review](simple-v1-implementation-review.md) holds the later build and test evidence, including remaining external release dependencies.
