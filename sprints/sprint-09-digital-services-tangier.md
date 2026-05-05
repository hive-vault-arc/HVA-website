# Sprint 09 — Rank #1 for "Digital Services Tangier"

> **Priority:** HIGH — "Digital services Tangier" is the broadest and most commercially valuable local keyword cluster. Ranking #1 here drives discovery for every H.V.A service line simultaneously. The same formula that produced the #1 ranking for "ai agents tangier" is applied here with broader coverage.
> **Estimated effort:** 3–5 hours
> **Depends on:** Sprint 01 (SITE_URL correct), Sprint 06 (geo pages exist for cross-linking), Sprint 08 (llms.txt structure)

---

## What This Sprint Is

H.V.A ranks #1 for "ai agents tangier". That ranking came from a dedicated landing page with:

- Exact keyword in URL slug, `<title>`, `<h1>`, and meta description
- `ProfessionalService` JSON-LD with `areaServed: Tangier`
- `BreadcrumbList` schema
- `FAQPage` JSON-LD with a real FAQ section
- 800–1200 words of substantive content
- Internal links from homepage and capability pages
- Sitemap entry at priority 0.8
- Listed in `public/llms.txt`

**This sprint replicates and extends that formula for "digital services tangier"** — a broader keyword that covers the full H.V.A offering instead of a single service line.

Key differences from the AI agents page:

- This page is a hub page. It covers all three H.V.A pillars (AI agents, IT consulting, custom software) and links down to the specific service pages already built.
- "Digital services" has French-language demand as well ("services digitaux Tanger", "agence digitale Tanger"). This sprint adds a French-URL companion page.
- The homepage keywords and `GLOBAL_KEYWORDS` in `seo.ts` need "digital services Tangier" added explicitly — currently missing.
- All four existing geo pages (`/ai-agents-tangier`, `/ai-agents-morocco`, `/it-consulting-tangier`, `/custom-software-morocco`) must cross-link to the new page to pass authority to it.

---

## New Pages to Create

| Route | Primary Keyword | Language |
|-------|----------------|----------|
| `/digital-services-tangier` | "digital services Tangier" | English |
| `/services-digitaux-tanger` | "services digitaux Tanger" | French |

Both pages target Tangier + Morocco. The French page targets the "agence digitale Tanger", "services numériques Tanger", and "agence numérique Tanger" cluster.

---

## Tasks

---

### Task 9.1 — Create `/digital-services-tangier` page

**File:** `src/app/digital-services-tangier/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'Digital Services in Tangier — AI, Software & IT Consulting | H.V.A',
  description:
    'H.V.A delivers end-to-end digital services in Tangier: AI agents, custom software, IT consulting, and digital transformation programs. Tangier-based team, global engineering standards.',
  path: '/digital-services-tangier',
  keywords: [
    'digital services Tangier',
    'digital services Tanger',
    'digital agency Tangier',
    'IT services Tangier Morocco',
    'technology services Tangier',
    'digital transformation Tangier',
    'software development Tangier',
    'AI services Tangier',
    'tech company Tangier',
    'digital services Morocco',
  ],
});
```

**JSON-LD schemas to include:**

```typescript
const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Digital Services in Tangier',
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: 'Digital Services',
  areaServed: [
    { '@type': 'Country', name: 'Morocco' },
    { '@type': 'City', name: 'Tangier', containedInPlace: { '@type': 'Country', name: 'Morocco' } },
    { '@type': 'City', name: 'Casablanca' },
    { '@type': 'City', name: 'Rabat' },
    { '@type': 'City', name: 'Marrakech' },
    { '@type': 'AdministrativeArea', name: 'Tanger-Tetouan-Al Hoceima' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'H.V.A Digital Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agent Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Transformation Programs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Automation' } },
    ],
  },
  availableLanguage: ['en', 'fr', 'ar', 'es'],
  url: `${SITE_URL}/digital-services-tangier`,
  description:
    'H.V.A delivers end-to-end digital services in Tangier: AI agents, custom software, IT consulting, and digital transformation programs.',
  image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Digital Services Tangier', path: '/digital-services-tangier' },
]);
```

**Content sections (write real content — no placeholder text):**

1. **Hero** — `h1: "Digital Services Built for Tangier Businesses"`. Lead paragraph: what H.V.A provides as a digital services firm based in Tangier, and who it is for.

2. **Feature band (3 cards)** — one card per H.V.A pillar:
   - AI & Automation (links to `/ai-agents-tangier`)
   - IT Consulting (links to `/it-consulting-tangier`)
   - Custom Software (links to `/custom-software-morocco`)

3. **"What Are Digital Services?"** — 2–3 paragraphs explaining digital services in plain language for a Moroccan SME owner. Frame it as: the full spectrum from strategy to software to AI, not just website design.

4. **H.V.A's Full Digital Services Offering** — grid of 6 service tiles:
   - AI Agents & WhatsApp Automation
   - IT Consulting & Technology Strategy
   - Custom Software & SaaS Development
   - Digital Transformation Programs
   - CRM & Operations Systems
   - Cloud Infrastructure & DevOps

5. **Why Tangier Businesses Choose H.V.A** — local advantage (local context, multilingual team, Tangier presence), global standard (production case studies, engineering depth), full-spectrum (strategy through execution without handoffs).

6. **The ARC Process Snapshot** — the 3-step model (Audit → Roadmap → Craft) as it applies to digital services engagements broadly.

7. **Production Results** — 2 case study teasers (WhatsApp AI agent: <18s response, 85% triage reduction / CRM: $2.4M pipeline visible, 40% less manual data entry). Link to `/case-studies`.

8. **FAQ section** (see Task 9.1a below).

9. **Bottom CTA** — "Start with a Discovery Call" → `/contact`.

**FAQ items for this page (`DIGITAL_SERVICES_TANGIER_FAQS`):**

```typescript
const DIGITAL_SERVICES_TANGIER_FAQS: FaqItem[] = [
  {
    question: 'What digital services does H.V.A offer in Tangier?',
    answer:
      'H.V.A delivers AI agents and WhatsApp automation, IT consulting and technology strategy, custom software and SaaS development, digital transformation programs, CRM engineering, and cloud infrastructure — all from a team based in Tangier, Morocco.',
  },
  {
    question: 'Is H.V.A just an advice firm or do you also build and deliver?',
    answer:
      'Both. H.V.A consults and builds. Every engagement includes strategy, architecture, and hands-on delivery. We stay accountable through production launch and ongoing optimization — not just the advisory phase.',
  },
  {
    question: 'How do digital services from a Tangier firm differ from international agencies?',
    answer:
      'A Tangier-based team brings local business context, Arabic and French fluency, alignment with Moroccan regulatory requirements, and direct communication without timezone delays. H.V.A pairs that local presence with international engineering standards and production case studies.',
  },
  {
    question: 'What types of businesses in Tangier does H.V.A work with?',
    answer:
      'Primarily Moroccan SMEs in Real Estate, Healthcare, Logistics, and Finance, plus French companies with Morocco operations and global startups that need AI or software infrastructure. We have production case studies in Real Estate.',
  },
  {
    question: 'How long does a typical digital services engagement take?',
    answer:
      'Focused engagements — such as an AI agent deployment or a CRM transformation — typically run 6 to 12 weeks. Broader digital transformation programs span longer timelines with staged milestones and defined checkpoints.',
  },
];
```

**Internal links from this page:**
- Link to `/ai-agents-tangier` from the AI tile and from the "AI agents" mention in the body
- Link to `/it-consulting-tangier` from the IT Consulting tile
- Link to `/custom-software-morocco` from the Custom Software tile
- Link to `/arc` from the ARC Process section
- Link to `/case-studies` from the Production Results section
- Link to `/contact` from the CTA section

---

### Task 9.2 — Create `/services-digitaux-tanger` (French companion page)

**File:** `src/app/services-digitaux-tanger/page.tsx`

This page targets French-speaking searchers: "services digitaux Tanger", "agence digitale Tanger", "services numériques Tanger".

**Metadata:**

```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'Services Digitaux à Tanger — IA, Logiciel & Conseil IT | H.V.A',
  description:
    "H.V.A offre des services digitaux complets à Tanger : agents IA, développement logiciel sur mesure, conseil IT et transformation digitale. Équipe basée à Tanger, standards d'ingénierie internationaux.",
  path: '/services-digitaux-tanger',
  keywords: [
    'services digitaux Tanger',
    'agence digitale Tanger',
    'services numériques Tanger',
    'agence numérique Tanger',
    'transformation digitale Tanger',
    'développement logiciel Tanger',
    'conseil IT Tanger',
    'services IA Tanger',
    'agence digitale Maroc',
    'services digitaux Maroc',
  ],
  locale: 'fr',
});
```

**JSON-LD:** Same `ProfessionalService` schema structure as Task 9.1 but with `name: "Services Digitaux à Tanger"` and `serviceType: "Services Digitaux"`. Add `inLanguage: "fr"` to the service schema.

**Content:** Write all body content in French. Mirror the structure of the English page (hero, 3-pillar band, what are digital services, services grid, why H.V.A, ARC process, case study teasers, FAQ, CTA).

**French FAQ items:**

```typescript
const SERVICES_DIGITAUX_TANGER_FAQS: FaqItem[] = [
  {
    question: 'Quels services digitaux H.V.A propose-t-elle à Tanger ?',
    answer:
      "H.V.A délivre des agents IA et l'automatisation WhatsApp, le conseil IT et la stratégie technologique, le développement logiciel sur mesure, les programmes de transformation digitale, l'ingénierie CRM et l'infrastructure cloud — depuis une équipe basée à Tanger.",
  },
  {
    question: 'H.V.A fait-elle uniquement du conseil ou aussi du développement ?',
    answer:
      "Les deux. H.V.A conseille et construit. Chaque mission comprend la stratégie, l'architecture et la livraison opérationnelle. Nous restons responsables jusqu'au lancement en production et à l'optimisation continue.",
  },
  {
    question: 'Pourquoi choisir une agence digitale basée à Tanger ?',
    answer:
      "Une équipe tangéroise apporte le contexte métier local, la maîtrise du français et de l'arabe, l'alignement avec les exigences réglementaires marocaines et une communication directe sans décalage horaire. H.V.A associe cette présence locale à des standards d'ingénierie internationaux.",
  },
  {
    question: 'Avec quels types d\'entreprises à Tanger H.V.A travaille-t-elle ?',
    answer:
      "Principalement des PME marocaines dans l'immobilier, la santé, la logistique et la finance, ainsi que des entreprises françaises opérant au Maroc et des startups mondiales ayant besoin d'une infrastructure IA ou logicielle.",
  },
  {
    question: 'Quelle est la durée d\'une mission type de services digitaux ?',
    answer:
      "Les missions ciblées — comme un déploiement d'agent IA ou une transformation CRM — durent généralement 6 à 12 semaines. Les programmes de transformation digitale plus larges s'étendent sur des délais plus longs avec des jalons définis.",
  },
];
```

---

### Task 9.3 — Update `GLOBAL_KEYWORDS` in `src/lib/seo.ts`

**File:** `src/lib/seo.ts`

Find the `GLOBAL_KEYWORDS` array and add the missing "digital services" terms:

```typescript
export const GLOBAL_KEYWORDS = [
  BUSINESS_NAME,
  ...BRAND_SEARCH_VARIANTS,
  'AI Morocco',
  'AI consulting Tangier',
  'WhatsApp AI agent',
  'AI agents Morocco',
  'digital transformation',
  'custom software Morocco',
  'CRM Morocco',
  'IT consulting Morocco',
  'ARC program HVA',
  // ── Add these ──────────────────────────────
  'digital services Tangier',
  'digital services Morocco',
  'digital agency Tangier',
  'services digitaux Tanger',
  'agence digitale Tanger',
  'digital services Tanger',
  'technology services Tangier',
];
```

---

### Task 9.4 — Update homepage keywords in `src/app/page.tsx`

**File:** `src/app/page.tsx`

Find the `buildPageMetadata` call on the homepage. Add to the `keywords` array:

```typescript
keywords: mergeKeywords(GLOBAL_KEYWORDS, [
  // existing...
  'technology consulting firm Tangier',
  'digital transformation partner Morocco',
  // ── Add these ──────────────────────────────
  'digital services Tangier',
  'digital services Morocco',
  'digital agency Tangier',
  'services digitaux Tanger',
  'agence digitale Tanger',
]),
```

---

### Task 9.5 — Add cross-links from all existing geo pages

Each existing geo landing page must link to `/digital-services-tangier` so it receives internal link authority from pages that are already indexed and trusted.

**`src/app/ai-agents-tangier/page.tsx`**

In the bottom CTA section, alongside the existing links, add:

```tsx
<Link href="/digital-services-tangier" className="editorial-link">
  See All Digital Services in Tangier →
</Link>
```

**`src/app/it-consulting-tangier/page.tsx`**

Same pattern — add in the bottom CTA section:

```tsx
<Link href="/digital-services-tangier" className="editorial-link">
  Explore All Digital Services →
</Link>
```

**`src/app/custom-software-morocco/page.tsx`**

Add in the bottom CTA or the body section:

```tsx
<Link href="/digital-services-tangier" className="editorial-link">
  View Full Digital Services Portfolio →
</Link>
```

**`src/app/ai-agents-morocco/page.tsx`**

Add in the body or bottom CTA:

```tsx
<Link href="/digital-services-tangier" className="editorial-link">
  Digital Services in Tangier →
</Link>
```

---

### Task 9.6 — Add internal links from homepage

**File:** `src/app/page.tsx` or `src/views/Home.tsx`

In the homepage services/capabilities section (wherever the service cards or capability links are rendered), add a visible link to the new page:

```tsx
<Link href="/digital-services-tangier">
  Digital Services in Tangier
</Link>
```

If there is already a link cluster to geo pages, add `/digital-services-tangier` and `/services-digitaux-tanger` alongside them.

---

### Task 9.7 — Update `src/app/sitemap.ts`

**File:** `src/app/sitemap.ts`

Add the two new pages to the geo landing pages section:

```typescript
// ── Geo landing pages ─────────────────────────────────────────────────
{ url: `${SITE_URL}/ai-agents-tangier`,          lastModified: now, ...m(0.8) },
{ url: `${SITE_URL}/ai-agents-morocco`,          lastModified: now, ...m(0.8) },
{ url: `${SITE_URL}/it-consulting-tangier`,      lastModified: now, ...m(0.8) },
{ url: `${SITE_URL}/custom-software-morocco`,    lastModified: now, ...m(0.8) },
// ── Add these ──────────────────────────────
{ url: `${SITE_URL}/digital-services-tangier`,   lastModified: now, ...m(0.9) },
{ url: `${SITE_URL}/services-digitaux-tanger`,   lastModified: now, ...m(0.8) },
```

> Note: `/digital-services-tangier` gets priority `0.9` — one step above the specific service pages — because it is the hub page and the primary target keyword for this sprint.

---

### Task 9.8 — Update `public/llms.txt`

**File:** `public/llms.txt`

Under the Service Landing Pages block, add the two new pages:

```markdown
## Service Landing Pages
- https://hivevaultarc.com/ai-agents-tangier — AI agents for businesses in Tangier, Morocco
- https://hivevaultarc.com/ai-agents-morocco — AI automation for Moroccan businesses nationwide
- https://hivevaultarc.com/it-consulting-tangier — IT consulting and digital transformation in Tangier
- https://hivevaultarc.com/custom-software-morocco — Custom software and SaaS development in Morocco
- https://hivevaultarc.com/digital-services-tangier — Full digital services offering for Tangier businesses (AI, software, IT consulting)
- https://hivevaultarc.com/services-digitaux-tanger — Services digitaux complets pour les entreprises à Tanger (IA, logiciel, conseil IT)
```

Also update the FAQ block in `llms.txt`. Add this question to the existing Q&A section:

```markdown
**What digital services does H.V.A provide in Tangier?**
H.V.A provides end-to-end digital services in Tangier, Morocco: AI agents and WhatsApp automation, IT consulting and technology strategy, custom software and SaaS development, CRM engineering, digital transformation programs, and cloud infrastructure. H.V.A is the Tangier-based digital services firm for Moroccan SMEs and international companies operating in Morocco. See: https://hivevaultarc.com/digital-services-tangier

**Is H.V.A a digital agency in Tangier?**
Yes. H.V.A (Hive Vault Arc) is a digital services and technology consulting firm based in Tangier, Morocco. Unlike traditional web agencies, H.V.A specializes in AI automation, intelligent systems, and end-to-end digital transformation rather than marketing or design services.
```

---

### Task 9.9 — Submit new URLs to Google Search Console

After deployment:

1. Go to: `https://search.google.com/search-console?resource_id=https%3A%2F%2Fhivevaultarc.com%2F`
2. Use **URL Inspection** → paste `https://hivevaultarc.com/digital-services-tangier` → **Request Indexing**
3. Repeat for `https://hivevaultarc.com/services-digitaux-tanger`
4. Navigate to **Sitemaps** → confirm the sitemap is already submitted and shows no errors

This manual submission accelerates Google's crawl of the new pages. Without it, indexing can take 1–4 weeks. With it, the pages typically appear in Search Console within 48–72 hours.

---

### Task 9.10 — Verify Google Business Profile (off-site signal)

This is an off-site task — do it in Google directly, not in the codebase.

> **Why:** Google uses your Business Profile's category, services, and website URL as a local authority signal. If the profile is missing "digital services" as a listed service, Google's local ranking algorithm doesn't fully connect the website to the keyword.

Go to **Google Business Profile** (`business.google.com`):

1. **Primary category:** Should be "Internet company" or "Software company". If it is something unrelated, update it.
2. **Additional services:** Add explicit services:
   - Digital Services
   - AI Consulting
   - IT Consulting
   - Custom Software Development
   - Digital Transformation
3. **Website:** Must point to `https://hivevaultarc.com`
4. **Description:** Should mention "digital services in Tangier" naturally within the first 250 characters.
5. **Add a Google Post:** After the pages go live, publish a Business Profile post linking to `/digital-services-tangier` with a short description. Posts are crawled by Google and send a freshness signal.

---

## Why This Works: The Formula Explained

The `/ai-agents-tangier` page reached #1 because Google's local algorithm rewards:

| Signal | Where it lives |
|--------|---------------|
| Exact keyword in URL | `/ai-agents-tangier` slug |
| Exact keyword in `<title>` | `buildPageMetadata` title |
| Exact keyword in `<h1>` | First heading on the page |
| Exact keyword in meta description | `description` field |
| Local entity in JSON-LD | `areaServed: City/Tangier` |
| Authoritative structured data | `ProfessionalService` + `BreadcrumbList` + `FAQPage` |
| Content depth | 800–1200 words, real substance |
| Internal authority | Links from existing pages + homepage |
| Crawl coverage | In sitemap at priority 0.8+ |
| AI search visibility | Listed in `llms.txt` |

This sprint applies every one of these signals to "digital services Tangier".

The French companion page (`/services-digitaux-tanger`) additionally captures a separate keyword cluster with zero current competition from H.V.A and low overall competition in Moroccan search results.

---

## Acceptance Criteria

- [ ] `src/app/digital-services-tangier/page.tsx` exists with correct metadata (title contains "Digital Services in Tangier", description, canonical, OG)
- [ ] `src/app/services-digitaux-tanger/page.tsx` exists with correct French metadata
- [ ] Both pages have `ProfessionalService` JSON-LD with `areaServed` including Tangier
- [ ] Both pages have `BreadcrumbList` JSON-LD
- [ ] Both pages have `FAQPage` JSON-LD rendered via `FaqSection`
- [ ] English page has minimum 5 FAQ items; French page has minimum 5 FAQ items in French
- [ ] Both pages have substantive body content — no Lorem Ipsum
- [ ] English page links to `/ai-agents-tangier`, `/it-consulting-tangier`, `/custom-software-morocco`, `/arc`, `/contact`
- [ ] All four existing geo pages (`/ai-agents-tangier`, `/ai-agents-morocco`, `/it-consulting-tangier`, `/custom-software-morocco`) link to `/digital-services-tangier`
- [ ] Homepage (`src/app/page.tsx`) keywords include "digital services Tangier"
- [ ] `GLOBAL_KEYWORDS` in `seo.ts` includes "digital services Tangier", "services digitaux Tanger", "agence digitale Tanger"
- [ ] Both new pages appear in `sitemap.ts` (English at priority 0.9, French at 0.8)
- [ ] `public/llms.txt` lists both new URLs with descriptions
- [ ] `public/llms.txt` FAQ block includes "digital services" and "digital agency Tangier" questions
- [ ] `npm run build` passes with zero errors

---

## Exit Criteria

- [ ] Visit `https://hivevaultarc.com/digital-services-tangier` — page loads, content is readable and matches H.V.A brand
- [ ] Visit `https://hivevaultarc.com/services-digitaux-tanger` — page loads in French
- [ ] Google Rich Results Test on both pages — `ProfessionalService` and `FAQPage` schemas validate without errors
- [ ] `curl https://hivevaultarc.com/sitemap.xml | grep "digital-services"` — returns 2 entries
- [ ] Both pages submitted for indexing in Google Search Console
- [ ] Google Business Profile lists "Digital Services" as a service category
- [ ] Within 2–4 weeks of deployment: both pages appear in Google Search Console → Coverage → Valid

---

## Expected Timeline to #1

Based on the `/ai-agents-tangier` precedent (built in Sprint 06, indexed and ranked within 2–3 weeks):

| Week | Expected state |
|------|---------------|
| 0 — Deploy | Pages live, sitemap submitted, Search Console indexing requested |
| 1 | Pages appear in Google Search Console as "Discovered — not indexed" or "Indexed" |
| 2–3 | Pages indexed, starting to appear in search results for exact-match queries |
| 4–6 | Rankings stabilize; monitor position in Search Console → Search Results |
| 6+ | If not in top 3, audit: check if competitors have newer content, add more internal links, publish a blog post that links to the page |

> The "digital services Tangier" keyword has low existing competition from local firms with proper on-page SEO. Helloworld-agency.com (French, no FAQ schema) and digitalplace.ma (generic, not geo-targeted) are the closest competitors visible in the SERP. Neither has the structured data depth H.V.A's pages use.

---

## Monitoring After Deploy

Check these weekly in Google Search Console:

- **Search Results** → filter by query "digital services tangier" — watch impression count and average position
- **Coverage** → confirm both new pages move from "Discovered" to "Valid"
- **Core Web Vitals** — new pages should inherit the site's performance baseline

Check monthly:
- Google manually: search `digital services tangier` in an incognito window from a Morocco-based VPN or ask a Tangier contact to search
- Check that `services digitaux Tanger` also shows hivevaultarc.com in top results

