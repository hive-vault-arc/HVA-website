# GEO-03 — Earned Authority, Distribution, and Observability

- Priority: P2
- Duration: two weeks to launch; recurring monthly and quarterly operation
- Primary owners: company leadership, partnerships/communications, SEO lead, analytics owner
- Depends on: GEO-01 entity truth; GEO-02 first evidence asset; AEO-03 measurement panel

## Goal

Make accurate Hive Vault Arc expertise discoverable through credible third-party sources and measure the resulting mentions, links, citations, referrals, and business outcomes. Distribution must earn trust; it must not manufacture consensus.

## Principles

- Use company-controlled accounts for all business profiles and outreach.
- Seek editorially relevant references, not link volume.
- Deep-link to the most useful service, case, or evidence page.
- Disclose sponsorships and commercial relationships.
- Never buy ranking links, create fake reviews, seed false community endorsements, or impersonate customers.
- Treat placements and AI citations as outcomes, not guaranteed sprint deliverables.

## Task 1 — Build the authority-surface inventory

Create `docs/seo/authority-surfaces.csv` with:

```text
surface
surface_type
profile_or_page_url
owner_account
company_controlled
current_name
current_website
current_contact
current_description
target_topic
relationship_owner
last_verified
discrepancy
action
status
```

Include only relevant surfaces:

- Google Business Profile;
- LinkedIn company page;
- company GitHub organization and public repositories;
- approved partner and vendor directories;
- chambers, accelerators, universities, and local technology organizations;
- client partner pages where permission exists;
- event, conference, podcast, and speaker biographies;
- industry publications and research roundups;
- high-quality regional business directories.

Exclude scraper directories, bulk-submission lists, expired event pages with no relevance, and surfaces that require personal ownership for a company asset.

## Task 2 — Reconcile company profiles

Use the GEO-01 fact registry to align:

- brand name;
- canonical production URL;
- public phone and email;
- Tangier/Morocco location and service area;
- concise company description;
- supported languages;
- logo and approved imagery;
- business hours where relevant;
- capability names.

Preserve platform-specific descriptions rather than copying one keyword-heavy paragraph everywhere. Keep facts consistent while matching the audience of each surface.

## Task 3 — Create a relationship-led distribution list

Build a prioritized list based on real relevance:

1. Existing clients and partners who can validate approved work.
2. Technology vendors with legitimate partner, marketplace, or case-study programs.
3. Moroccan and Tangier business or technology organizations.
4. Universities, accelerators, professional associations, and events connected to the research topic.
5. Journalists, newsletters, podcasts, and analysts whose audience benefits from the evidence asset.
6. Specialist communities where a subject-matter expert can answer questions transparently.

Score fit, relationship strength, audience, editorial standard, language, and evidence relevance. Do not prioritize solely by a third-party authority score.

## Task 4 — Prepare useful outreach packages

For each GEO-02 asset, prepare:

- a two-sentence why-it-matters summary;
- three verified findings with exact sources;
- methodology and limitation summary;
- one chart or table with reuse terms;
- approved expert biography and quote;
- canonical deep link;
- suggested audience-specific angle;
- disclosure of any commercial relationship.

Outreach messages must be personalized and sent only after company approval. Offer the evidence because it helps the recipient's audience; never demand a dofollow link or prescribe anchor text.

## Task 5 — Earn local and industry corroboration

Pursue opportunities such as:

- joint client stories with measured, approved outcomes;
- partner integration pages;
- vendor marketplace profiles;
- guest technical sessions or workshops;
- conference and meetup speaker pages;
- university or accelerator resource lists;
- expert commentary grounded in a published evidence asset;
- open-source utilities, templates, or benchmark data with clear maintenance ownership.

Do not use reciprocal-link schemes, private blog networks, mass guest posts, fake awards, or reviews written by employees posing as customers.

## Task 6 — Strengthen first-party distribution paths

When a new evidence asset is published:

- link it from the relevant capability and commercial pages;
- link it from related articles and case studies;
- feature it in the appropriate Research Report or Perspectives index;
- publish an approved company-profile summary in the relevant languages;
- notify real partners who contributed or benefit;
- update `/ai/company` and optional AI-oriented files if the asset belongs there;
- submit the canonical URL through sitemap and approved freshness workflows.

Do not syndicate the complete article onto uncontrolled sites without a canonical or a clear strategic reason.

## Task 7 — Measure mentions, links, and citations

Extend the AEO-03 measurement system with:

- new and lost referring domains;
- linked and unlinked brand mentions;
- referring-page relevance and language;
- links to evidence pages vs homepage-only links;
- referral sessions and assisted conversions;
- Google Business Profile actions;
- assistant citation and factual-absorption observations;
- stale or incorrect third-party facts;
- outreach response, publication, and correction status.

Classify each mention as earned editorial, partner, directory/profile, community, sponsored, or unknown. Volume without relevance is not success.

## Task 8 — Establish correction and reputation operations

Create a monthly stale-fact and misattribution review. For material errors:

1. Capture the exact page or assistant output.
2. Confirm the correct fact in the registry.
3. Correct first-party contradictions first.
4. Contact the publisher through a company account with the evidence URL.
5. Record request and outcome.
6. Re-test after recrawl or an appropriate waiting period.

Do not threaten, spam, or attempt to suppress legitimate critical coverage. Escalate legal or safety issues to the designated company owner.

## Task 9 — Run an honest reporting cadence

### Monthly

- reconcile profile discrepancies;
- review new/lost mentions and referral traffic;
- execute approved outreach for one evidence cohort;
- re-run priority citation prompts;
- update correction and relationship logs.

### Quarterly

- review source diversity by market and language;
- retire low-quality directories;
- refresh outreach assets and expert biographies;
- assess whether evidence is earning relevant references;
- compare authority growth with non-brand search and qualified pipeline;
- document external changes that could affect results.

Separate leading indicators such as approved pitches and profile completeness from lagging outcomes such as earned placements, citations, revenue, and qualified pipeline.

## Verification

1. Confirm every profile is controlled by a company account or has a transfer plan.
2. Compare profile facts and links with the entity registry.
3. Review every target for topical and audience relevance.
4. Scan outreach materials for unsupported claims or undisclosed relationships.
5. Validate links and campaign parameters after publication.
6. Compare referral data with the AEO-03 prompt observations.
7. Sample earned mentions for correct facts, useful context, and source diversity.

## Acceptance criteria

- [ ] The authority-surface inventory exists with owners and last-verified dates.
- [ ] High-priority company profiles use the canonical domain and approved facts.
- [ ] No company surface depends on a personal GitHub, Vercel, Google, or outreach identity.
- [ ] An approved, prioritized relationship list exists for the first evidence asset.
- [ ] Outreach packages include verified findings, method, limitations, disclosure, and canonical links.
- [ ] First-party distribution links are live for the first evidence asset.
- [ ] Mention, backlink, referral, citation, and correction tracking is operating.
- [ ] No paid-link scheme, fake review, fabricated endorsement, or mass directory campaign is used.
- [ ] Monthly and quarterly reporting separates actions from uncertain outcomes.

## KPIs

- accurate, company-controlled profile coverage;
- relevant referring domains and linked/unlinked mentions;
- source diversity by country, language, and surface type;
- links and referrals to evidence pages;
- earned-media response and publication rate;
- assistant citation and accurate-absorption rate;
- non-brand organic visibility and qualified pipeline;
- stale-fact correction time.

## Evidence

- [Google Search Essentials and spam policies](https://developers.google.com/search/docs/essentials)
- [Google guidance for AI features and the website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Business Profile local ranking guidance](https://support.google.com/business/answer/7091?hl=en)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [OpenAI publisher and developer FAQ](https://help.openai.com/en/articles/12627856)
- [Study of citations, earned media, and language in AI search](https://arxiv.org/abs/2509.08919)
