# AEO-02 — Answer-First Pages and Structured Data

- Priority: P1
- Duration: one week
- Primary owners: content engineering, frontend engineering, SEO lead, subject-matter reviewers
- Depends on: AEO-01 first publishing cohort; SEO-01 canonical repair

## Goal

Turn the approved answer inventory into clear, server-rendered page sections supported by accurate structured data. The visible answer remains the source of truth; schema describes it but does not replace it.

## Existing foundation to reuse

The current application already contains useful editorial fields and components, including direct answers, sources, authors, reviewers, methodology, limitations, evidence types, related cases, capability relationships, FAQ sections, and JSON-LD helpers. Extend this model rather than creating a second parallel content system.

Relevant implementation areas include:

- `src/lib/editorial-taxonomy.ts`;
- `src/lib/content-seo.ts`;
- the article and case-study detail components;
- `GeoServicePage.tsx`;
- `FaqSection.tsx`;
- `src/lib/seo.ts`;
- Sanity projections and validation rules.

## Task 1 — Define the answer-section contract

Add or standardize a reusable answer section with these fields:

```text
question
directAnswer
details
evidenceLinks[]
limitations
lastReviewed
reviewedBy
relatedQuestions[]
```

Rendering rules:

1. Put the direct answer immediately after the question heading.
2. Use a semantic heading that matches a real user question.
3. Keep essential text in the server-rendered HTML.
4. Add detail, evidence, and limitations directly below the summary.
5. Use lists, tables, and steps when they are the clearest form.
6. Do not hide the only useful answer behind a tab, modal, hover state, or client-only request.
7. Do not repeat an identical answer block across unrelated pages.

## Task 2 — Implement the first answer cohort

Implement the approved AEO-01 questions on the priority pages chosen in SEO-02. Begin with pages that have commercial relevance and real evidence, such as:

- homepage or company positioning;
- the capabilities index;
- AI and automation capability;
- cloud and platform capability;
- cybersecurity capability;
- approved Tangier and Morocco service pages;
- one case study and one Research Report with strong evidence.

Each page must still read as a coherent page, not a pasted FAQ bank. Integrate answers where the question naturally occurs in the decision journey.

## Task 3 — Make evidence inspectable

For every externally verifiable claim:

- link to the exact supporting primary source or first-party evidence page;
- place the citation close to the claim;
- show the publisher or evidence owner where useful;
- distinguish published research, client-approved outcome, anonymized internal evidence, and demonstration data;
- expose methodology and limitations for original research;
- remove or qualify a claim when the source does not support the exact wording.

Do not cite a publisher homepage when a specific report or dataset is required. Do not fabricate precision to make a short answer sound authoritative.

## Task 4 — Standardize entity and content identifiers

Use stable HTTPS `@id` values based on the production domain:

```text
https://hivevaultarc.com/#organization
https://hivevaultarc.com/#website
https://hivevaultarc.com/{canonical-path}#webpage
https://hivevaultarc.com/{canonical-path}#article
```

Connect page entities to the Organization and WebSite entities where valid. The identifier must not change by deployment alias, request host, or locale rendering accident.

## Task 5 — Apply only supported structured data

Use schema types according to page purpose:

- `Organization` on the company identity source;
- `WebSite` for the site;
- `BreadcrumbList` for visible breadcrumb paths;
- `Article`, `BlogPosting`, or a more specific supported article type for editorial content;
- `Person` only for real published authors or reviewers;
- `Service` where it truthfully describes a visible service;
- `FAQPage` only when the exact question and answer are visibly present and eligible under current Google rules.

Do not add invented aggregate ratings, fake reviews, unsupported prices, hidden questions, or schema that describes content absent from the page. Do not implement a fictional `GEO` or `AEO` schema type.

Google generally limits FAQ rich-result display to well-known authoritative government and health sites. FAQ markup may still describe content correctly, but it must not be sold as a likely rich-result gain for this website.

## Task 6 — Enforce visible/schema parity

Add validation so structured data cannot claim more than the page shows:

- schema headline matches the editorial title;
- description is supported by visible content;
- author and reviewer identities exist and are public;
- `datePublished` reflects original publication;
- `dateModified` changes only for substantive content changes;
- image URLs resolve and are representative;
- citations and `sameAs` URLs are approved;
- FAQ questions and answers exactly match the visible version;
- canonical URL and schema URL use `https://hivevaultarc.com`.

## Task 7 — Preserve accessibility and agent-readable semantics

- Maintain a logical heading hierarchy.
- Use native links and buttons with accurate accessible names.
- Use real lists and tables instead of styled generic containers.
- Give accordions an accessible expanded state; keep core answers available in HTML.
- Add useful image alt text and avoid putting essential facts only in an image.
- Test Arabic directionality and focus order.
- Respect keyboard navigation and reduced motion.

These practices help people first and also make page structure easier for automated systems to interpret.

## Task 8 — Add automated and manual validation

Automate checks for representative pages in all four locales:

- exactly one valid self-canonical;
- no Vercel alias in metadata or JSON-LD;
- JSON-LD parses without duplicate entity conflicts;
- required direct-answer text appears in the initial HTML;
- schema and visible content match;
- links and evidence URLs resolve;
- no duplicate manual pageview code appears with the GA component.

Manually test Google Rich Results Test for supported types and Schema.org Validator for overall graph quality. A passing validator is necessary, not proof that Google will show an enhancement.

## Verification

Run:

```powershell
npm run lint
npm run test
npm run build
```

Then inspect a production sample with JavaScript disabled or raw-source retrieval:

1. Direct answer and primary content are present.
2. Canonical and JSON-LD use the production domain.
3. Evidence links point to the exact source.
4. Visible author, reviewer, and dates agree with structured data.
5. Every locale renders the correct language and direction.
6. Rich Results Test reports no blocking errors for supported markup.

## Acceptance criteria

- [ ] A reusable answer-section model and rendering contract are documented and implemented.
- [ ] The first approved answer cohort is live on its primary pages.
- [ ] Essential answers are server-rendered and usable without interaction.
- [ ] Every factual claim in the cohort is supported, qualified, or removed.
- [ ] Stable Organization, WebSite, WebPage, and content identifiers use the production domain.
- [ ] Structured data matches visible content and page purpose.
- [ ] No fake reviews, ratings, prices, FAQ content, authors, or special “AI schema” were added.
- [ ] Automated tests cover canonical host, raw answer HTML, and JSON-LD parsing in all four locales.
- [ ] Accessibility and Arabic directionality checks pass.

## KPIs after release

- verified answer coverage on priority pages;
- structured-data errors and warnings by type;
- question-shaped search impressions and clicks;
- source selection and factual absorption in the AEO-03 prompt panel;
- engagement with evidence and related-answer links;
- qualified conversions assisted by answer pages.

## Evidence

- [Google guidance for AI features and the website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google FAQ and HowTo visibility changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
