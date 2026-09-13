# SEO-02 — Intent Architecture and Multilingual Content

- Priority: P1
- Duration: one week
- Primary owners: SEO lead, content lead, localization reviewers, web engineering
- Depends on: SEO-01 deployed and company Search Console access working

## Goal

Give every valuable search intent one clear canonical page, build strong internal discovery paths, and ensure English, French, Spanish, and Arabic pages contain genuinely localized main content.

## Starting point

The site already has four-language route infrastructure and 48 sitemap URLs per locale. It also has commercial landing pages for:

- AI agents in Tangier;
- AI agents in Morocco;
- IT consulting in Tangier;
- custom software in Morocco;
- digital services in Tangier.

The problem is no longer “make many landing pages.” The problem is deciding which existing page owns which buyer intent, strengthening pages with original proof, resolving language fallbacks, and preventing cannibalization.

## Scope

### In scope

- Query and intent mapping using Search Console and live SERPs.
- Page-role decisions: keep, improve, merge, redirect, or intentionally exclude.
- Four-language metadata and main-content quality.
- Contextual internal-link architecture.
- Canonical and `hreflang` validation after content decisions.
- Content briefs for existing high-value pages.

### Out of scope

- Programmatic city/service page generation.
- Copying competitor pages.
- Buying backlinks.
- Translating every English article merely to reach equal URL counts.
- Rewriting pages to hit a word count.

## Task 1 — Build the query evidence set

Export the last 16 months available from Search Console, plus focused 28-day and 90-day views. Include:

- query;
- landing page;
- country;
- device;
- clicks;
- impressions;
- CTR;
- average position.

Create separate working views for:

- branded vs non-branded;
- Morocco and priority export markets;
- English, French, Spanish, and Arabic query language;
- mobile vs desktop;
- service, location, industry, problem, and comparison intent.

Search Console omits anonymized queries and may truncate tables. Treat the displayed query list as a sample, not the total demand universe. Combine it with:

- customer and discovery call questions;
- contact-form categories without copying personal data;
- Google related searches and People Also Ask observed in Morocco;
- Business Profile query themes;
- sales-team language;
- the current five service landing pages;
- actual capability and case-study vocabulary.

Do not use search volume as the sole prioritization measure. A low-volume, high-fit transformation query can be more valuable than a broad “AI” query.

## Task 2 — Create the intent-to-page map

Create `docs/seo/intent-map.csv` or an equivalent Sanity-managed table with these columns:

```text
cluster_id
locale
query_or_theme
intent_type
buyer_stage
market
current_url
recommended_action
primary_page
supporting_pages
proof_required
conversion_action
gsc_baseline
owner
status
```

Use these intent types:

- navigational / brand;
- commercial service;
- local commercial;
- problem-aware;
- comparison or vendor selection;
- educational / informational;
- proof / case study;
- trust / team / company;
- support or legal.

For each cluster, assign one primary URL. Supporting articles and cases should link toward it but should not repeat the same title, H1, and opening promise.

## Task 3 — Decide the role of overlapping commercial pages

Audit the following pairs and groups carefully:

- `/capabilities` vs the six capability-detail pages;
- `/ai-agents-tangier` vs `/ai-agents-morocco`;
- `/digital-services-tangier` vs specific service pages;
- `/custom-software-morocco` vs Software Engineering capability;
- `/it-consulting-tangier` vs Technology Consulting capability;
- `/arc` vs solution-program pages;
- `/blog` articles vs Perspectives vs Research Reports.

For each overlap, document:

1. Distinct user need.
2. Distinct query cluster.
3. Unique evidence or utility.
4. Desired next action.
5. Why both URLs deserve to exist.

If two pages cannot pass those five checks, merge the better material into the stronger URL and permanently redirect the weaker URL. Do not use canonical tags as a substitute for a necessary redirect.

## Task 4 — Upgrade priority page briefs

Create implementation briefs for the homepage, capabilities index, five existing commercial landing-page families, and the three most valuable capability pages. Each brief must define:

- primary intent and exclusions;
- audience and decision stage;
- one descriptive title and H1;
- page-specific meta description;
- direct opening answer;
- scope and non-scope;
- delivery process;
- integrations and constraints;
- relevant industries;
- local or market-specific evidence;
- one approved case or demonstration;
- real buyer questions;
- CTA and key event;
- internal links in and out;
- source and reviewer requirements;
- translation notes.

Original value matters more than keyword repetition. Add content that a generic agency page cannot truthfully provide: delivery decisions, constraints, anonymized operating patterns, implementation boundaries, named reviewers, approved outcomes, and practical artifacts.

## Task 5 — Repair multilingual content quality

### Immediate known defect

The following French URLs currently reuse the English title and description and require approved French metadata and main content:

- `/fr/etudes-de-cas/healthcare-ai-receptionist-crm`
- `/fr/etudes-de-cas/multilingual-whatsapp-ai-agent`

### Full locale audit

For every dynamic page family, record:

- source locale;
- translation status;
- translated title, description, H1, body, FAQ, image alt, CTA, and schema strings;
- approved locale reviewer;
- reciprocal translation relationship;
- whether the localized page deserves indexing.

Rules:

1. Do not emit `hreflang` to a page whose main content remains in another language.
2. If a translation is not ready, keep the English source reachable from the locale experience, but do not present the fallback as an equivalent indexable translation.
3. Native reviewers must approve Arabic directionality and natural phrasing, French market vocabulary, and Spanish phrasing.
4. Do not translate proper names, client-approved quotes, or regulated terminology without an explicit rule.
5. Keep slugs stable once indexed; use redirects for approved changes.

Update `getPublishedCollection`, `getPublishedDocument`, `translationParams`, and sitemap alternate generation if needed so fallback UX and search annotations are separate decisions.

## Task 6 — Build contextual internal-link clusters

Create hub-and-spoke paths that reflect real decisions:

```text
Homepage
  -> Capabilities
     -> Relevant capability detail
        -> Commercial service/location page
           -> Relevant case study
           -> Relevant operating guide or research report
           -> Contact
```

For each priority commercial page:

- add at least three contextually relevant incoming links from different page types;
- add links to one relevant case, one useful insight, and the contact path;
- use descriptive anchors that explain the destination;
- use normal crawlable `<a href>` links;
- avoid sitewide exact-match keyword stuffing;
- keep links appropriate to the current locale.

Run a crawl after implementation. Zero-inbound approved pages and unexpected high-depth pages are defects. Account for percent-encoded Arabic URLs before declaring them orphaned.

## Task 7 — Clean metadata and search appearance

For each approved indexable page:

- one useful, non-repetitive `<title>`;
- one page-specific meta description;
- one visible H1;
- self-canonical production URL;
- accurate Open Graph title, description, image, and URL;
- index/follow default unless explicitly excluded;
- correct `lang` and `dir`;
- representative, high-resolution social/search image;
- consistent brand name `Hive Vault Arc`.

Remove `meta keywords` from the delivery checklist. If `GLOBAL_KEYWORDS` remains for internal reuse, do not treat it as a search ranking mechanism.

Google may rewrite titles and snippets. Optimize for accurate expectations and CTR, not an arbitrary character count.

## Task 8 — Validate `hreflang` and canonicals together

Every indexable localized page must:

- canonicalize to itself, not to another language;
- list itself and each genuinely equivalent approved translation;
- receive reciprocal links from those translations;
- include `x-default` pointing to the English/root equivalent where appropriate;
- use full production URLs;
- omit nonexistent, fallback-only, redirected, or `noindex` alternates.

Add automated tests for static and dynamic examples in all four locales. Include one translation group with all languages and one intentionally incomplete group.

## Task 9 — Use a controlled publishing gate

Before a new or revised page becomes indexable, require:

- intent owner approved;
- duplication check passed;
- factual sources verified;
- evidence classification visible;
- locale reviewer approved;
- title, description, H1, canonical, alternates, and schema checked;
- relevant internal links added;
- CTA and analytics event defined;
- mobile QA passed;
- sitemap inclusion correct.

Do not update `publishedAt` or `lastModified` unless the main content changed materially.

## Verification

Run repository checks:

```powershell
npm run i18n:validate
npm run lint
npm run test
npm run build
```

Run production checks:

1. Crawl the full approved sitemap.
2. Group titles and descriptions to find duplicates.
3. Check H1 count, canonicals, redirects, and robots state.
4. Validate reciprocal `hreflang` for every translation cluster.
5. Inspect raw HTML for the direct answer and primary content.
6. Inspect the top-priority pages in Search Console after recrawl.
7. Compare Google-selected and user-declared canonical.

## Acceptance criteria

- [ ] One primary URL owns every prioritized intent cluster.
- [ ] Each overlapping page has a documented distinct role or was consolidated.
- [ ] The ten priority briefs are approved and implemented.
- [ ] No approved localized page exposes untranslated main content as an equivalent translation.
- [ ] The two known French case-study metadata duplicates are resolved.
- [ ] All approved pages have unique, useful titles and descriptions and exactly one visible H1.
- [ ] Each priority commercial page has at least three relevant incoming internal links.
- [ ] Canonical and `hreflang` tests pass for complete and incomplete translation groups.
- [ ] Search Console baselines are attached by locale and intent cluster.
- [ ] No new doorway-style city/service variants were created.

## KPIs after release

Track by locale and intent cluster for 28, 90, and 180 days:

- non-brand impressions and clicks;
- pages receiving first impressions;
- CTR changes on pages with stable average position;
- query-to-page cannibalization;
- indexed share of the approved inventory;
- organic key events and qualified leads;
- local Search and Business Profile discovery for Tangier/Morocco intents.

Do not use average position alone as the success measure.

## Evidence

- [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google Business Profile local ranking factors](https://support.google.com/business/answer/7091?hl=en)
