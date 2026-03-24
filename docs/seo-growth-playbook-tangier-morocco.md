# SEO Growth Playbook (Tangier + Morocco IT/AI Queries)

Date: 2026-03-24
Project: H.V.A website (`migration/nextjs16`)
Primary market: Tangier, Morocco

## 1) Goal and Reality Check

Your goal is to rank first for high-intent queries like:
- `AI agents Tangier`
- `AI agents Morocco`
- `Custom software solutions Morocco`
- `IT service and consulting Morocco`
- `IT services consultant Tangier`

Important: no one can guarantee "#1" for all terms. Google local and organic rankings depend on relevance, distance/proximity, and prominence (authority/reviews/mentions). We can, however, build a system that gives you the strongest chance to win high-intent local traffic.

## 2) What We Found (Current State)

### 2.1 Site-level gaps (from current codebase)

- Global metadata is too generic (`title: H.V.A`, generic description) and not location/service intent-specific.
- No clear route-level SEO metadata strategy for each target keyword cluster.
- No dedicated local landing pages for exact high-intent terms (for example, no `/ai-agents-tangier` page).
- No explicit robots/sitemap setup currently visible in project public assets.
- Current content already mentions Morocco/Tangier in places, but intent is spread across long pages and not structured around search clusters.

### 2.2 Search landscape snapshot (web reconnaissance)

For Morocco software/IT terms, search results commonly include:
- Local agency pages optimized around exact service + location combinations.
- Directory/marketplace pages capturing broad commercial terms.
- Programmatic long-tail pages targeting very specific service + city combinations.

Implication: to outrank, H.V.A needs stronger query-page alignment, local authority signals, and consistent business profile/citation/review strength.

Because SERPs change by location, language, and personalization, run a repeatable SERP audit from Morocco/Tangier monthly:
- Use incognito and logged-out Google sessions.
- Check Desktop and Mobile separately.
- Track top 10 results for each target query.
- Record page type (agency, directory, marketplace, map pack) and common SEO patterns (title formula, schema use, review count, local proof).

## 3) Keyword Strategy and Page Mapping

Create clear one-intent pages. Do not force all intents into one Services page.

### 3.1 Priority keyword clusters

Cluster A: AI Agents
- AI agents Tangier
- AI agents Morocco
- AI automation agency Morocco
- AI receptionist Morocco

Cluster B: IT Consulting / Services
- IT services consultant Tangier
- IT service and consulting Morocco
- IT consulting Morocco

Cluster C: Custom Software
- custom software solutions Morocco
- custom software development Tangier
- software development company Morocco

### 3.2 Required page architecture

Keep current core routes, and add focused SEO landing pages:
- `/ai-agents-tangier`
- `/ai-agents-morocco`
- `/it-consulting-tangier`
- `/it-services-morocco`
- `/custom-software-morocco`

Each page should have unique:
- Search intent
- H1
- Title tag
- Meta description
- Intro copy with local proof
- Case-study proof block
- FAQ block
- CTA

## 4) On-Page SEO Specification (Code + Content)

### 4.1 Metadata rules (must implement per route)

For each target page:
- Title: `Primary Keyword | H.V.A`
- Meta description: 140-160 chars, include service + location + value proposition.
- Canonical URL set to self.
- Open Graph/Twitter metadata aligned to same intent.

Example title patterns:
- `AI Agents in Tangier | H.V.A`
- `IT Services Consulting in Morocco | H.V.A`
- `Custom Software Solutions in Morocco | H.V.A`

### 4.2 Heading + copy rules

- Exactly one H1 aligned with primary keyword.
- First 120 words must state service + location naturally.
- Add entity-rich terms: Tangier, Morocco, automation, custom platforms, cloud infrastructure, AI operations.
- Add trust blocks: process, stack, industries, outcomes.

### 4.3 Internal linking rules

- From Home/About/Services footer and body sections, link to new intent pages with keyword-rich anchors.
- Add reciprocal links between related landing pages.
- Add links to Contact with commercial anchors (`Book AI strategy call`, `Request IT consulting`).

### 4.4 Image SEO

- Keep using `next/image` for key hero and proof images.
- File naming: descriptive and location-aware (`ai-agents-tangier-dashboard.webp`).
- Alt text: describe service outcome + context, not keyword stuffing.

### 4.5 Structured data (required)

Implement JSON-LD:
- `Organization` (global)
- `ProfessionalService` and/or `LocalBusiness` (location/service pages)
- `BreadcrumbList` for landing pages
- `FAQPage` where FAQs exist

Minimum fields to include:
- `name`, `url`, `logo`, `sameAs`
- `address` (Tangier), `telephone`, `email`
- `areaServed` (Tangier, Morocco)
- `serviceType`

## 5) Technical SEO Checklist

### 5.1 Indexing and crawl

- Add `/robots.txt` (allow core pages, disallow irrelevant parameter paths if any).
- Add `/sitemap.xml` with all canonical URLs.
- Register property in Google Search Console.
- Submit sitemap in Search Console.
- Use URL Inspection for all priority pages after publish.

### 5.2 Performance and quality

- Keep Core Web Vitals healthy (especially LCP on Home and landing pages).
- Avoid soft-404 style thin pages; each landing page needs substantial unique content.
- Ensure mobile usability and no intrusive interstitial issues.

### 5.3 Duplicate control

- One canonical per intent page.
- Avoid multiple pages targeting identical keyword intent with near-duplicate copy.

## 6) Local SEO (Manual, Outside Code)

These are critical and cannot be solved by code alone.

### 6.1 Google Business Profile (GBP)

- Verify and fully complete profile.
- Primary category must match your main offer (software/IT/consulting as applicable).
- Add services exactly matching target intents (AI agents, IT consulting, custom software).
- Keep NAP (name/address/phone) exactly consistent with website.
- Publish weekly GBP posts (case snippets, offers, launches).
- Add high-quality geo-relevant images regularly.

### 6.2 Reviews engine

- Build monthly review acquisition process.
- Request reviews from Morocco/Tangier clients with service-specific language in natural form.
- Reply to all reviews with helpful, keyword-relevant responses.

### 6.3 Citations and authority mentions

- Create/clean business profiles in relevant Morocco business directories.
- Ensure identical NAP everywhere.
- Pursue local digital PR and partnerships (Tangier business ecosystem, startup communities, tech media).
- Earn backlinks to specific intent pages (not only homepage).

### 6.4 Social + entity consistency

- Align company descriptions on LinkedIn and other profiles with the same service/location entities.
- Link social profiles to website and include in Organization schema `sameAs`.

## 7) Content Plan (90 Days)

### Month 1 (Foundation)

- Publish all 5 priority landing pages.
- Implement metadata + schema + robots + sitemap.
- Set up Search Console tracking and baseline dashboards.
- Optimize GBP and ensure NAP consistency.

### Month 2 (Authority + Proof)

- Publish 4-6 case/proof articles targeting long-tail local intents.
- Add FAQ sections based on real sales questions.
- Start citation cleanup and local backlink outreach.
- Run review acquisition campaign.

### Month 3 (Expansion + Iteration)

- Add second-layer pages (industry + service + location combos).
- Improve underperforming pages using GSC query data.
- Strengthen internal links toward pages with impressions but low CTR.
- Build at least 5 quality external links to priority landing pages.

## 8) Measurement Framework

Track weekly:
- Impressions, clicks, CTR, average position for each priority query cluster.
- Indexed status of all priority pages.
- GBP metrics: calls, direction requests, profile views.
- Number and quality of reviews.
- Top landing pages by organic leads (not just traffic).

Track monthly outcomes:
- Number of keywords in Top 3 / Top 10.
- Organic leads from Morocco + Tangier.
- Lead-to-client conversion by landing page.

## 9) Manual Changes You Must Do (Non-Code)

- Verify and optimize Google Business Profile.
- Run a monthly review campaign and response routine.
- Build local citations and fix NAP inconsistencies.
- Run ongoing local PR/backlink outreach.
- Collect client proof assets (logos, case outcomes, testimonials) and publish them.
- Maintain social/entity consistency across LinkedIn and directories.

## 10) Practical Priority Order

If you do only a few things first, do these in order:
1. Build intent-specific landing pages for Tangier/Morocco queries.
2. Implement per-page metadata + schema + sitemap + robots + Search Console.
3. Optimize GBP and launch review system.
4. Build local citations and first wave of authority backlinks.
5. Iterate monthly from GSC query data.

## 11) Sources (Official + Recon)

Google official documentation:
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Snippets and meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Favicons in Search: https://developers.google.com/search/docs/appearance/favicon-in-search
- Site names: https://developers.google.com/search/docs/appearance/site-names
- Local Business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Build and submit sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- robots.txt guidance: https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
- Google Business Profile local ranking factors: https://support.google.com/business/answer/7091
- About Search Console: https://support.google.com/webmasters/answer/9128668

Schema references:
- LocalBusiness: https://schema.org/LocalBusiness
- ProfessionalService: https://schema.org/ProfessionalService

Additional official ecosystem resources:
- Bing Webmaster Blog (Bing + AI visibility + IndexNow): https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility
- robots.txt implementation details: https://developers.google.com/crawling/docs/robots-txt/create-robots-txt

## 12) Expert and Influencer Insights (Applied to H.V.A)

This section translates advice from trusted SEO practitioners into practical actions for your site.

### 12.1 E-E-A-T and authority signals (Lily Ray / Marie Haynes style approach)

Why it matters:
- For competitive commercial queries, trust and brand credibility heavily influence which pages keep visibility over time.

What to implement:
- Add expert/leadership proof on key pages:
  - short founder bios
  - delivery credentials
  - project outcomes with concrete metrics
- Add stronger trust sections on service pages:
  - \"who this is for\"
  - \"how we deliver\"
  - \"why trust us for this service\"
- Add transparent business signals in footer/contact:
  - legal business identity
  - office location consistency
  - same phone/email across all profiles

Practical source references:
- Lily Ray E-E-A-T resource hub: https://lilyray.nyc/e-a-t-expertise-authoritativeness-trustworthiness/
- Marie Haynes on core update quality patterns: https://www.mariehaynes.com/google-core-updates/

### 12.2 Process-driven SEO operating model (Aleyda Solis / LearningSEO approach)

Why it matters:
- Strong SEO outcomes come from repeatable processes, not one-off page edits.

What to implement:
- Run a monthly SEO process cycle:
  1. Keyword & intent review
  2. Content/page updates
  3. Technical checks (crawl/index/canonicals)
  4. Reporting and next sprint planning
- Keep one operating dashboard for:
  - impressions/clicks/rank trends
  - indexing issues
  - local visibility (GBP + organic)

Practical source references:
- LearningSEO roadmap and process model: https://learningseo.io/

### 12.3 Tactical checklists for execution speed (Backlinko / Ahrefs / Semrush style)

Why it matters:
- Checklists prevent missing high-impact fundamentals while scaling content.

What to implement:
- Build 3 internal SOP checklists in your team docs:
  - New page launch checklist (metadata, schema, internal links, CTA, index check)
  - Local page checklist (location intent, NAP consistency, local proof, GBP link)
  - Monthly health checklist (GSC issues, CWV, sitemap freshness, broken links)
- Keep these as mandatory gates before publishing.

Practical source references:
- Backlinko SEO checklist (execution structure): https://backlinko.com/seo-checklist
- Ahrefs local SEO guide (local + organic balance): https://ahrefs.com/blog/local-seo/
- Semrush local SEO checklist (workflow framing): https://www.semrush.com/blog/ultimate-local-seo-checklist/

## 13) What To Change Outside Code (Expanded Manual Playbook)

Beyond code changes, these are now mandatory if you want Top-3 local competitiveness:

### 13.1 Google Business Profile operations
- Weekly posting cadence (projects, outcomes, offers, updates).
- Monthly photo refresh (office/team/work snapshots).
- Service list alignment with your exact keyword clusters.
- Review response SLA: respond to every review in under 72 hours.

### 13.2 Reputation and review acquisition engine
- Create a review request flow after each successful delivery milestone.
- Ask clients to mention service context naturally (AI agents, IT consulting, custom software).
- Build review diversity (Google + relevant local/business directories).

### 13.3 Citation and entity consistency
- Audit and fix NAP consistency everywhere.
- Ensure exact same brand description, categories, and contact data across profiles.
- Add/refresh profiles in authoritative Morocco business directories and partner pages.

### 13.4 Local digital PR and links
- Run quarterly link campaigns tied to:
  - local case studies
  - partnerships
  - community/tech events in Tangier or Morocco
- Prioritize backlinks that point to service-location landing pages, not only home page.

### 13.5 SERP and competitor intelligence routine
- Every month, for each primary query:
  - capture top 10 SERP
  - log page types and angle
  - compare title/H1/schema/review signal patterns
- Update your page copy and internal links based on what is actually winning.

---

If you want, the next step is for me to convert this playbook into an execution board (exact tasks by file, owner, deadline, and KPI target).

## 14) 2026 Source-Backed Upgrade (Official + Expert)

This section tightens the strategy using newer guidance and stronger external signals.

### 14.1 Official documentation upgrades (must follow)

Google Search quality baseline:
- Use "people-first content" checks as publishing gates for every service/location page.
- Add clear authorship and "who/how/why" context on important pages.
- Avoid scaled thin pages created only to capture long-tail traffic.

Google references:
- Helpful content and E-E-A-T framing: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- How Search works (crawl/index/rank context): https://developers.google.com/search/docs/advanced/guidelines/how-search-works
- Guidance for generative AI content: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Search documentation updates feed (monitor monthly): https://developers.google.com/search/updates

Google local and operations references:
- Improve local ranking (relevance, distance, prominence): https://support.google.com/business/answer/7091
- Search Console overview: https://support.google.com/webmasters/answer/9128668
- Core Web Vitals report in Search Console: https://support.google.com/webmasters/answer/10218333

Technical freshness and recrawl acceleration:
- IndexNow protocol docs: https://www.indexnow.org/documentation
- Bing Webmaster guidelines/help entry: https://www.bing.com/webmaster/help/webmaster-guidelines-36f3f4e8

### 14.2 Trusted expert frameworks (how to use them)

Use these as execution frameworks, not as "copy-paste tactics":

Local SEO operations and audits:
- Search Engine Land local SEO audit framework (Miriam Ellis): https://searchengineland.com/guide/local-seo-audit
- Search Engine Land local keywords framework: https://searchengineland.com/guide/local-keywords
- Search Engine Land 90-day local sprint model: https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059

Execution checklist systems:
- Backlinko SEO checklist (keep as SOP baseline): https://backlinko.com/seo-checklist
- Ahrefs local SEO guide (website + GBP workflow): https://ahrefs.com/blog/local-seo/
- Semrush local SEO checklist (task sequencing): https://www.semrush.com/blog/ultimate-local-seo-checklist/
- LearningSEO roadmap (Aleyda Solis process model): https://learningseo.io/

Industry visibility and authority perspectives:
- Marie Haynes on core updates and quality systems: https://www.mariehaynes.com/google-core-updates/
- Lily Ray E-E-A-T resource page: https://lilyray.nyc/e-a-t-expertise-authoritativeness-trustworthiness/
- Whitespark local ranking observations and citation/review signals: https://whitespark.ca/blog/7-local-search-ranking-factors-that-may-challenge-your-current-thinking/

Consumer behavior and reviews (local trust engine):
- BrightLocal Local Consumer Review Survey (latest): https://www.brightlocal.com/research/local-consumer-review-survey/
- BrightLocal AI/local recommendation trend: https://www.brightlocal.com/research/lcrs-ai-trust/

### 14.3 What this changes for H.V.A immediately

Add these mandatory requirements to every priority landing page:
- Clear author/business ownership signal (who provides the service).
- Original local proof (Tangier/Morocco case outcomes, not generic copy).
- Review and testimonial freshness cadence (new proof monthly).
- FAQ blocks matching real buyer questions, not keyword-stuffed variants.
- Explicit service scope and delivery method to reduce ambiguity.

Add these mandatory non-code operating rules:
- Monthly SERP benchmark run for top 15 target queries (mobile + desktop, incognito).
- Monthly GBP hygiene sprint (services, posts, images, Q&A, review replies).
- Monthly citation consistency audit (NAP + business categories + description).
- Quarterly local PR/link sprint focused on Tangier/Morocco authority mentions.

## 15) Manual SEO Playbook v2 (Outside Code, High Priority)

If your target is top results for "AI agents Tangier/Morocco" and related terms, the following operations are required continuously:

### 15.1 Google Business Profile operating system

- Define one primary category and tightly relevant secondary categories only.
- Update services list with exact commercial intents (AI agents, IT consulting, custom software).
- Publish 1-2 posts per week with proof content (results, before/after, launches).
- Upload fresh geo-relevant photos monthly (team, office, delivery snapshots).
- Maintain consistent opening hours, contact data, and service area.

### 15.2 Review acquisition and trust loop

- Request reviews systematically after delivery milestones.
- Ask for natural mention of service context and outcome.
- Respond to every review in under 72 hours.
- Build review velocity (steady flow), not sporadic bursts.

### 15.3 Citation and entity authority

- Standardize brand naming format across every directory/profile.
- Keep NAP, website URL, and service summary identical everywhere.
- Add profiles to authoritative local and industry directories.
- Track and fix duplicates/inconsistencies quarterly.

### 15.4 Local authority and link acquisition

- Prioritize links/mentions from Morocco and Tangier-relevant publications.
- Pitch case studies and practical insights to local business/tech media.
- Earn links to service-location pages, not only homepage.
- Build partnerships with local organizations/events for legitimate mentions.

### 15.5 AI and answer-engine visibility

- Publish concise answer blocks for high-intent local questions.
- Use structured data consistently (Organization, LocalBusiness/ProfessionalService, FAQPage, BreadcrumbList).
- Keep high-value pages updated and date-stamped.
- Ensure crawl accessibility and avoid accidental robot blocking.

## 16) Reporting and Governance (So This Actually Executes)

Run a recurring monthly operating review:
1. SERP share report: Top 3 / Top 10 movement by query cluster.
2. Local trust report: reviews added, response rate, sentiment trend.
3. Authority report: new mentions/links and their destination URLs.
4. Performance report: CWV and top page engagement metrics.
5. Action review: completed tasks vs planned tasks, next sprint priorities.

Define ownership:
- Marketing owner: content calendar, GBP, reviews, reporting.
- Technical owner: metadata/schema/indexing/performance integrity.
- Business owner: proof assets, case data, partnerships, PR approvals.

Without these ownership boundaries, SEO plans fail in execution even when technical implementation is correct.

## 17) Code-Only SEO + ChatGPT Visibility Blueprint (New)

This section is intentionally code-only. It focuses on what to implement in the Next.js codebase to improve visibility in:
- Google Search
- ChatGPT search/citations

## 18) Multilingual Keyword System (EN + FR + AR + ES)

Target the same commercial intent across three language layers:
- English (international + local expats/business users)
- French (Morocco business search behavior)
- Arabic (including local wording variants)

### 18.1 Core keyword clusters by language

English:
- ai agents tangier
- ai agents morocco
- custom software solutions morocco
- it service and consulting morocco
- it services consultant tangier

French:
- agents IA Tanger
- agents IA Maroc
- solutions logicielles sur mesure Maroc
- services et conseil informatique Maroc
- consultant services IT Tanger

Arabic:
- وكلاء الذكاء الاصطناعي طنجة
- وكلاء الذكاء الاصطناعي المغرب
- حلول برمجية مخصصة المغرب
- خدمات واستشارات تقنية المعلومات المغرب
- مستشار خدمات تقنية المعلومات طنجة

Darija/Latin variants (optional pages/FAQ targeting):
- ai agents tanger
- agence ia maroc
- consulting it tanger

## 18.3 Service-Derived Multilingual Keyword Map (From Home + Services Pages)

Source of truth used:
- Home page positioning: software engineering, AI-powered applications, cloud platforms, custom mobile/web systems.
- Services page lines: AI Receptionist & Agent Operations, AI Analyst & Decision Intelligence, Automation & Custom Platforms, Delivery Ecosystem & Reliability.

Use this keyword map directly for metadata, H1/H2 variants, FAQ questions, and internal anchor text.

### A) AI Receptionist and Agent Operations

English:
- ai receptionist morocco
- ai receptionist tangier
- ai call agent morocco
- ai customer support agent morocco
- whatsapp ai chatbot morocco
- ai lead qualification morocco
- ai appointment booking agent morocco

French:
- standard téléphonique IA maroc
- réceptionniste IA tanger
- agent conversationnel IA maroc
- chatbot WhatsApp IA maroc
- qualification de leads par IA maroc
- agent IA prise de rendez-vous maroc

Arabic:
- موظف استقبال بالذكاء الاصطناعي المغرب
- استقبال آلي بالذكاء الاصطناعي طنجة
- وكيل ذكاء اصطناعي لخدمة العملاء المغرب
- شات بوت واتساب بالذكاء الاصطناعي المغرب
- تأهيل العملاء المحتملين بالذكاء الاصطناعي المغرب
- حجز المواعيد بالذكاء الاصطناعي المغرب

Spanish:
- recepcionista con ia marruecos
- recepcionista ia tanger
- agente de atencion al cliente con ia marruecos
- chatbot de whatsapp con ia marruecos
- calificacion de leads con ia marruecos
- agente de citas con ia marruecos

### B) AI Analyst and Decision Intelligence

English:
- ai analyst morocco
- ai reporting dashboard morocco
- predictive analytics dashboard morocco
- nlp reporting automation morocco
- business intelligence ai morocco
- executive dashboard automation morocco

French:
- analyste IA maroc
- tableau de bord IA maroc
- tableau de bord prédictif maroc
- reporting NLP automatisé maroc
- intelligence décisionnelle IA maroc
- tableau de bord exécutif automatisé maroc

Arabic:
- محلل ذكاء اصطناعي المغرب
- لوحات معلومات بالذكاء الاصطناعي المغرب
- تحليلات تنبؤية للأعمال المغرب
- تقارير آلية بمعالجة اللغة الطبيعية المغرب
- ذكاء أعمال بالذكاء الاصطناعي المغرب
- لوحة قيادة تنفيذية آلية المغرب

Spanish:
- analista de ia marruecos
- panel de reportes con ia marruecos
- analitica predictiva para empresas marruecos
- automatizacion de informes con nlp marruecos
- inteligencia de negocio con ia marruecos
- panel ejecutivo automatizado marruecos

### C) Automation and Custom Platforms

English:
- workflow automation morocco
- business process automation tangier
- custom software development morocco
- custom enterprise saas morocco
- crm development morocco
- inventory management software morocco
- api integration services morocco
- internal portal development morocco

French:
- automatisation des workflows maroc
- automatisation des processus métier tanger
- développement logiciel sur mesure maroc
- saas entreprise sur mesure maroc
- développement crm maroc
- logiciel de gestion de stock maroc
- services d'intégration api maroc
- développement de portail interne maroc

Arabic:
- أتمتة سير العمل المغرب
- أتمتة العمليات التجارية طنجة
- تطوير برمجيات مخصصة المغرب
- تطوير منصات ساس للمؤسسات المغرب
- تطوير نظام crm المغرب
- برنامج إدارة المخزون المغرب
- خدمات تكامل api المغرب
- تطوير بوابة داخلية للشركات المغرب

Spanish:
- automatizacion de flujos de trabajo marruecos
- automatizacion de procesos de negocio tanger
- desarrollo de software a medida marruecos
- saas empresarial a medida marruecos
- desarrollo de crm marruecos
- software de gestion de inventario marruecos
- servicios de integracion api marruecos
- desarrollo de portal interno marruecos

### D) Delivery Ecosystem, Cloud, CI/CD, Security

English:
- cloud infrastructure services morocco
- devops consulting morocco
- ci cd pipeline setup morocco
- zero downtime deployment morocco
- cloud migration morocco
- application security audit morocco
- infrastructure monitoring morocco

French:
- services d'infrastructure cloud maroc
- conseil devops maroc
- mise en place pipeline ci cd maroc
- déploiement sans interruption maroc
- migration cloud maroc
- audit de sécurité applicative maroc
- supervision d'infrastructure maroc

Arabic:
- خدمات البنية التحتية السحابية المغرب
- استشارات ديف أوبس المغرب
- إعداد خطوط ci cd المغرب
- نشر بدون توقف المغرب
- ترحيل إلى السحابة المغرب
- تدقيق أمن التطبيقات المغرب
- مراقبة البنية التحتية المغرب

Spanish:
- servicios de infraestructura en la nube marruecos
- consultoria devops marruecos
- implementacion de pipelines ci cd marruecos
- despliegue sin tiempo de inactividad marruecos
- migracion a la nube marruecos
- auditoria de seguridad de aplicaciones marruecos
- monitoreo de infraestructura marruecos

### E) Web and Mobile Product Engineering

English:
- web application development morocco
- mobile app development morocco
- custom web platform tangier
- saas product development morocco
- full stack development morocco

French:
- développement d'applications web maroc
- développement d'applications mobiles maroc
- plateforme web sur mesure tanger
- développement produit saas maroc
- développement full stack maroc

Arabic:
- تطوير تطبيقات ويب المغرب
- تطوير تطبيقات موبايل المغرب
- منصة ويب مخصصة طنجة
- تطوير منتجات ساس المغرب
- تطوير فل ستاك المغرب

Spanish:
- desarrollo de aplicaciones web marruecos
- desarrollo de aplicaciones moviles marruecos
- plataforma web a medida tanger
- desarrollo de productos saas marruecos
- desarrollo full stack marruecos

### 18.4 Keyword-to-Page Mapping Rules (Code Planning)

Implement this mapping in route-level metadata files:
- Homepage: broad brand + engineering + AI/cloud umbrella terms in EN/FR/AR/ES alternates.
- Services page: cluster-intent overview terms only.
- Dedicated service pages: each page targets one main cluster + 5 to 10 secondary long-tail variants per language.

Page targeting plan:
- `/en/ai-receptionist-morocco` + FR/AR/ES alternates
- `/en/ai-analyst-morocco` + FR/AR/ES alternates
- `/en/workflow-automation-morocco` + FR/AR/ES alternates
- `/en/custom-software-morocco` + FR/AR/ES alternates
- `/en/cloud-devops-morocco` + FR/AR/ES alternates
- `/en/web-mobile-development-morocco` + FR/AR/ES alternates

Do not place all keywords in one page. Distribute by intent.

## 18.5 Multilingual Metadata Pattern (Use in Code)

For each service page locale version:
- `title`: primary keyword + location + brand
- `description`: one natural sentence with service, location, and value proposition
- `h1`: exact intent phrase in page language
- first paragraph: include one primary and one secondary keyword naturally
- FAQ block: 4 to 6 real commercial questions in the same language

Example EN title patterns:
- `AI Receptionist in Morocco | H.V.A`
- `AI Analyst & Reporting Systems in Morocco | H.V.A`
- `Workflow Automation Services in Tangier, Morocco | H.V.A`

Example FR title patterns:
- `Réceptionniste IA au Maroc | H.V.A`
- `Systèmes d'analyste IA et reporting au Maroc | H.V.A`

Example AR title patterns:
- `خدمات موظف استقبال بالذكاء الاصطناعي في المغرب | H.V.A`
- `أنظمة محلل ذكاء اصطناعي وتقارير أعمال في المغرب | H.V.A`

Example ES title patterns:
- `Recepcionista con IA en Marruecos | H.V.A`
- `Sistemas de analista de IA y reportes en Marruecos | H.V.A`

### 18.2 URL and page architecture for multilingual intent

Use language-specific URLs (Google recommendation for multilingual sites):
- `/en/ai-agents-tangier`
- `/fr/agents-ia-tanger`
- `/ar/وكلاء-الذكاء-الاصطناعي-طنجة` (or Arabic content on latin slug if preferred for ops simplicity)

Keep one intent per URL and avoid mixed-language content on the same page.

## 19) Next.js Implementation Tasks (Code)

### 19.1 Add language routing and alternates

Implement locale route groups and alternates:
- Add per-locale routes under `src/app/(site)/[locale]/...` (or equivalent structure).
- Add `alternates.languages` in Next metadata for every equivalent page.
- Set correct `lang` and `dir` (`dir="rtl"` for Arabic pages).

Example metadata shape:

```ts
export const metadata = {
  alternates: {
    canonical: "https://www.hiva.ma/en/ai-agents-tangier",
    languages: {
      "en": "https://www.hiva.ma/en/ai-agents-tangier",
      "fr": "https://www.hiva.ma/fr/agents-ia-tanger",
      "ar": "https://www.hiva.ma/ar/وكلاء-الذكاء-الاصطناعي-طنجة",
      "x-default": "https://www.hiva.ma/en/ai-agents-tangier",
    },
  },
};
```

### 19.2 Add `robots.ts` with AI crawler controls

For ChatGPT inclusion, do not block `OAI-SearchBot`.
If you want search visibility but less training exposure, you can allow `OAI-SearchBot` while disallowing `GPTBot`.

Example `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" }, // optional policy choice
    ],
    sitemap: "https://www.hiva.ma/sitemap.xml",
  };
}
```

### 19.3 Add multilingual sitemap

Ensure sitemap includes every locale URL and alternates (`hreflang` equivalents).
In Next, add `src/app/sitemap.ts` and include all language variants for each intent page.

### 19.4 Add route-level metadata in each language

For each locale page:
- Unique title + description in that language.
- Canonical pointing to itself.
- OG/Twitter localized content.
- Same intent, localized phrasing.

### 19.5 Add structured data per locale page

At minimum:
- `Organization` (global)
- `LocalBusiness` or `ProfessionalService` (service/location pages)
- `FAQPage` (localized FAQs)
- `BreadcrumbList`

Use localized `name`, `description`, `areaServed`, and FAQs per language.

### 19.6 Add answer-block content structure in code templates

To improve citation extraction in AI answers:
- Put a concise direct answer in first paragraph of each section.
- Add Q/A blocks (`<h2>` question, short answer paragraph).
- Keep key factual statements in standalone 1-2 sentence blocks.

This should be enforced in reusable page section components.

### 19.7 Accessibility/agent compatibility improvements

ChatGPT agent guidance emphasizes accessibility structure:
- Use semantic HTML landmarks (`header`, `main`, `nav`, `footer`).
- Add clear ARIA labels for interactive controls/forms.
- Ensure buttons/inputs have descriptive accessible names.

Apply this especially on contact forms and CTA flows.

### 19.8 Analytics instrumentation for ChatGPT referrals

Capture traffic from ChatGPT search using `utm_source=chatgpt.com`:
- Add dashboard filters and custom reports in analytics.
- Track conversions from ChatGPT referral sessions separately from Google organic.

## 20) Code Acceptance Checklist (Must Pass)

Before shipping SEO/AEO code work:
1. All locale URLs return `200` and are crawlable.
2. `robots.txt` allows `OAI-SearchBot`.
3. Sitemap lists all locale variants.
4. Canonical and language alternates are valid and reciprocal.
5. JSON-LD validates for all target pages.
6. Lighthouse/PSI shows no major regressions on priority landing pages.
7. Metadata is unique per language/intent page.

## 21) Sources for This New Section

Official:
- OpenAI publisher/developer FAQ (OAI-SearchBot, GPTBot, `utm_source=chatgpt.com`): https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- OpenAI ChatGPT search overview: https://openai.com/index/introducing-chatgpt-search/
- OpenAI merchant/search discoverability guidance (OAI-SearchBot): https://openai.com/chatgpt/search-product-discovery/
- Google multilingual/multi-regional guidance (`hreflang`, language URLs): https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google people-first/helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google structured data local business docs: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Schema.org LocalBusiness: https://schema.org/LocalBusiness
- Schema.org ProfessionalService: https://schema.org/ProfessionalService

Applied framework references:
- LearningSEO roadmap: https://learningseo.io/
- Ahrefs local SEO guide: https://ahrefs.com/blog/local-seo/
- Semrush local SEO checklist: https://www.semrush.com/blog/ultimate-local-seo-checklist/
