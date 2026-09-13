# Hive Vault Arc SEO, AEO, and GEO Program

- Research date: 2026-09-13
- Website: `https://hivevaultarc.com`
- Delivery model: nine implementation sprints; three each for SEO, AEO, and GEO
- Repository authority: company GitHub organization and company Vercel project only

## Outcome

This program turns the current website into a dependable acquisition and citation system. It does not treat SEO, AEO, and GEO as isolated channels:

- **SEO** makes the right public URLs crawlable, indexable, understandable, competitive, and measurable.
- **AEO** makes real buyer questions easy to answer from the visible page, with concise answers supported by useful detail.
- **GEO** makes Hive Vault Arc facts and expertise easy to retrieve, verify, cite, and keep accurate in generative search systems.

Google's current guidance explicitly says that AEO and GEO work for Google Search is still grounded in normal SEO. Google AI features retrieve from the Search index and do not require a special AI file or special schema. Bing likewise states that its search and Copilot grounding experiences share crawl, index, content-clarity, and authority foundations. The sprint sequence reflects that dependency.

## Research method

The plan was built from four evidence layers:

1. Current production responses from `hivevaultarc.com`, including all URLs listed by the live sitemap.
2. Current company worktree code, tests, historical audits, and the May 2026 discovery pack.
3. The internal vault note at `C:\Users\khali\Desktop\KV\Knowledge\Engineering\Web Dev & SEO.md`.
4. Current primary sources from Google, Microsoft/Bing, OpenAI, Anthropic, Perplexity, IndexNow, and the cited research papers.

Live behavior and current vendor documentation take precedence over older internal notes. Vendor claims are not generalized to other engines. Academic GEO findings are treated as experimental evidence, not ranking guarantees.

## Current production baseline

### Critical findings

| Finding | Observed state on 2026-09-13 | Consequence |
|---|---|---|
| Canonical host | 192 HTML sitemap pages declare `hive-vault-arc-website.vercel.app` instead of `hivevaultarc.com` | Google is being asked to consolidate production pages into a public Vercel clone. |
| Sitemap host | All 193 `<loc>` values and all 960 `hreflang` URLs use the Vercel alias | The submitted inventory contradicts the desired production domain. |
| robots sitemap line | Points to the Vercel alias sitemap | Crawlers are directed away from the company domain. |
| Current Vercel alias | `https://hive-vault-arc-website.vercel.app/` returns an indexable `200` | It can compete with production and split signals. |
| Old Vercel alias | `hiva-nine.vercel.app` redirects to production | The code protects the old alias but not the current one. |
| Machine-readable company endpoint | `/ai/company` returns `200`, but contains 58 Vercel-alias references and reports `lastUpdated: 2026-07-12` | Entity facts and resource links are stale and use the wrong authority URL. |
| Search Console ownership | The company Chrome account reports that it has no access to the domain property | A company-only indexing workflow cannot begin until ownership is restored. |

The likely immediate source is the production value of `NEXT_PUBLIC_SITE_URL`. The code fallback is already `https://hivevaultarc.com`, but the deployed environment overrides it with the Vercel alias.

### What is already working

- The live sitemap contains 193 unique entries: 48 English/root, 48 French, 48 Spanish, 48 Arabic, plus `/ai/company`.
- After substituting the production host for the bad sitemap host, all 193 target URLs returned `200` during the crawl.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `/ai/company` return `200`.
- The sampled HTML is server-rendered and contains meaningful headings and content without requiring client-side interaction.
- The main page templates include canonical metadata, localized alternates, Organization/ProfessionalService/WebSite data, breadcrumbs, Article or service data where applicable, and visible FAQ content.
- The codebase already models `directAnswer`, authors, reviewers, sources, methodology, limitations, evidence type, related cases, related capabilities, and localized content.
- GA4 and Microsoft Clarity are present behind the strict consent gate established in the prior analytics work.
- `www.hivevaultarc.com` and the former `hiva-nine.vercel.app` alias redirect to the apex domain.

### Secondary findings

- Two English/French case-study pairs publish identical English titles and descriptions:
  - `healthcare-ai-receptionist-crm`
  - `multilingual-whatsapp-ai-agent`
- French CMS fallbacks can expose English main content under a French URL. Google considers localized pages duplicates when the main content remains untranslated, regardless of translated navigation.
- Several priority commercial landing pages have weak contextual internal-link discovery. A dedicated crawler must verify exact inbound-link counts after URL normalization, especially for Arabic paths.
- The live search result sampled for `/capabilities` still described an older eight-domain/H.V.A version while the current page uses six service pillars and the full brand. This is a freshness and canonical-recovery issue, not a reason to change dates artificially.
- Static sitemap entries use the current request time as `lastModified`, even when the page did not change. Google advises against artificial freshness, and Bing asks for accurate sitemap freshness signals.
- The default IndexNow list includes redirected or outdated paths and is not generated from the canonical content inventory.
- Current `robots.txt` allows search/retrieval crawlers and training crawlers together. Those are separate company policy decisions.
- `llms.txt` and `llms-full.txt` are useful optional publishing surfaces for systems that choose to read them, but Google explicitly ignores them for Search visibility and ranking.
- Some older editorial material contains strong statistics and market claims. The content model supports sources, but each claim still needs source-level verification and a durable evidence record.
- PageSpeed Insights returned a quota response during this research, so current field and lab Core Web Vitals must be baselined in SEO-03 rather than guessed.

### Search Console caveat

A prior user-provided screenshot showed 71 indexed pages and 39 not indexed. That is historical context only. The live sitemap now contains 193 URLs, and the company account cannot currently open the property, so no current indexed/not-indexed total is asserted in this plan. Also, “all URLs indexed” is not the right target: redirects, non-canonical duplicates, utility pages, and intentionally excluded URLs should not be indexed. The correct KPI is coverage of the approved indexable inventory.

## Strategy corrections applied to older material

The earlier repository playbooks and vault notes contain useful direction, but the following rules supersede them:

1. Do not describe `llms.txt` as a Google Search or Google AI ranking lever. Maintain it only as an optional auxiliary interface.
2. Do not create pages for every keyword or prompt variation. One useful page should satisfy one coherent intent cluster.
3. Do not target a word count. Write enough to resolve the buyer's task with original information and evidence.
4. Do not treat `meta keywords` as an SEO deliverable.
5. Do not promise FAQ rich results. Google normally limits them to authoritative government and health sites. Visible FAQs can still help people and answer extraction.
6. Do not confuse search/retrieval crawlers with model-training crawlers. Training access is a governance choice, not a visibility requirement.
7. Do not report sitemap submission as indexing. Verify Google-selected canonical and index status separately.
8. Do not manufacture reviews, statistics, citations, client evidence, author credentials, or third-party mentions.
9. Do not publish translated shells around untranslated main content as equivalent localized pages.
10. Do not use personal GitHub, Vercel, Analytics, Search Console, or outreach accounts for company work.

## The nine sprints

| Track | Sprint | Purpose | Hard dependency |
|---|---|---|---|
| SEO | [SEO-01](./seo-01-canonical-index-recovery.md) | Repair canonical authority and regain company-owned Search Console operations | Must run first |
| SEO | [SEO-02](./seo-02-intent-architecture-multilingual-content.md) | Build a defensible multilingual intent and internal-link architecture | SEO-01 deployed |
| SEO | [SEO-03](./seo-03-performance-measurement-operations.md) | Establish Core Web Vitals, GA4/GSC measurement, and release operations | SEO-01; analytics consent live |
| AEO | [AEO-01](./aeo-01-question-answer-inventory.md) | Create a buyer-question and answer inventory in four languages | Can research during SEO-01 |
| AEO | [AEO-02](./aeo-02-answer-first-pages-structured-data.md) | Implement answer-first, evidence-backed page patterns | AEO-01; SEO-01 |
| AEO | [AEO-03](./aeo-03-answer-testing-measurement.md) | Run a reproducible answer visibility and accuracy program | AEO-02; SEO-03 |
| GEO | [GEO-01](./geo-01-entity-truth-crawler-governance.md) | Establish one entity truth and explicit crawler policy | SEO-01 |
| GEO | [GEO-02](./geo-02-original-evidence-citation-assets.md) | Produce verifiable, citable first-party evidence | GEO-01; AEO-02 patterns |
| GEO | [GEO-03](./geo-03-earned-authority-distribution-observability.md) | Earn corroboration and measure citations across engines | GEO-02; SEO-03 |

## Recommended execution order

Do not run the nine files as three isolated backlogs. Use this sequence:

1. **Emergency gate:** SEO-01.
2. **Research foundation:** AEO-01 and the inventory work in GEO-01.
3. **Search architecture:** SEO-02.
4. **On-site answer and entity work:** AEO-02, then finish GEO-01.
5. **Measurement foundation:** SEO-03; begin the baseline as soon as SEO-01 is deployed.
6. **Evidence production:** GEO-02.
7. **Ongoing observation:** AEO-03 and GEO-03.

The whole program is approximately ten to eleven focused weeks for a small team if run sequentially. SEO-01 should be treated as a same-day incident before the normal sprint cadence begins; research and measurement work can overlap where the dependency table permits it.

## Shared definition of done

Every sprint must satisfy these gates:

- Work occurs in the company repository and company service accounts only.
- Any public claim has an identifiable owner and evidence status.
- English, French, Spanish, and Arabic are tested deliberately; a locale is not assumed correct because English passes.
- Canonical, `hreflang`, schema URLs, OG URLs, sitemap URLs, and internal links use `https://hivevaultarc.com`.
- Important content is visible in server-rendered HTML.
- Structured data matches visible page content exactly.
- No personal data, client secrets, private metrics, or confidential project details enter analytics, schema, AI endpoints, or public content.
- No change is called complete until production verification is recorded with date, URL, and result.

## Program scorecard

### SEO outcomes

- 100% of approved indexable pages declare the production canonical host.
- 100% of sitemap URLs are canonical, return `200`, and are intentionally indexable.
- Search Console company ownership is active; the sitemap and priority URL inspections are current.
- Non-brand impressions, clicks, qualified organic leads, and target-market visibility trend upward by locale and intent cluster.
- Priority templates meet the good Core Web Vitals thresholds at the 75th percentile where field data is available.

### AEO outcomes

- Priority buyer questions have a mapped canonical answer URL and an approved answer in each supported locale where demand is validated.
- Answer blocks are visible, accurate, self-contained, and supported by relevant detail or evidence.
- Generative Search impressions, answer-feature visibility, AI referral sessions, and resulting key events are tracked without claiming causality from isolated observations.
- Answer accuracy audits find no critical outdated company, service, location, pricing, or privacy facts.

### GEO outcomes

- Company facts match across website, JSON-LD, `/ai/company`, Business Profile, LinkedIn, GitHub organization, and approved third-party profiles.
- Search/retrieval crawler access is verified separately from training crawler policy.
- Numeric and comparative claims have exact sources, dates, methods, and limitations.
- A recurring multilingual prompt panel records retrieval, citation, prominence, factual absorption, accuracy, and referral behavior by engine.
- Earned third-party references are relevant and genuine; no paid-link or fake-review quotas are used.

## Primary-source research library

### Google Search

- [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Search Essentials](https://developers.google.com/search/docs/essentials)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [FAQ and HowTo rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Search Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [Google Business Profile local ranking](https://support.google.com/business/answer/7091?hl=en)
- [Connect Search Console to GA4](https://support.google.com/analytics/answer/10737381?hl=en)

### Other discovery and answer systems

- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow documentation](https://www.indexnow.org/documentation)
- [OpenAI publisher and developer FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Anthropic crawler controls](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Google-Extended crawler token](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended)

### Research evidence

- [GEO: Generative Engine Optimization, KDD 2024](https://arxiv.org/abs/2311.09735)
- [Critical survey of GEO evidence, 2023–2026](https://arxiv.org/abs/2607.14035)
- [Citation selection and citation absorption measurement](https://arxiv.org/abs/2604.25707)
- [Generative Engine Optimization: How to Dominate AI Search](https://arxiv.org/abs/2509.08919)

The KDD paper demonstrates that content changes can affect visibility in its experimental setting. The 2026 critical survey correctly limits the conclusion: the evidence does not prove stable organic discoverability, cross-platform durability, or downstream business impact. The program therefore uses experiments and measurement rather than “40% visibility” promises.
