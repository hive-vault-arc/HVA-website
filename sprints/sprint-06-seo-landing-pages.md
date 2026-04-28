# Sprint 06 — SEO Landing Pages (Keyword-Targeted)

> **Priority:** MEDIUM-HIGH — These pages are the primary organic traffic drivers for H.V.A's core service keywords. Currently missing from the site entirely.
> **Estimated effort:** 4–6 hours
> **Depends on:** Sprint 01 (SITE_URL), Sprint 02 (schema helpers)

---

## What This Sprint Is

The SEO Growth Playbook identifies four landing pages as high-priority targets for Moroccan and North African keyword clusters. None of these pages exist yet. Without them, H.V.A cannot rank for its primary commercial intent keywords.

Target pages to build:

| Route | Primary Keyword | Intent |
|-------|----------------|--------|
| `/ai-agents-tangier` | "AI agents Tangier" | Local commercial |
| `/ai-agents-morocco` | "AI agents Morocco" | National commercial |
| `/it-consulting-tangier` | "IT consulting Tangier" | Local commercial |
| `/custom-software-morocco` | "custom software Morocco" | National commercial |

Each page must be:
- A standalone Next.js App Router page (`src/app/[route]/page.tsx`)
- Fully static (no client components at the page level)
- SEO-complete (metadata, JSON-LD, canonical, OG)
- Content-rich (800–1200 words minimum, real value for the reader)
- Linked from the homepage and/or Capabilities page (internal linking)
- Added to `sitemap.ts`

---

## Page Architecture

Each landing page follows this structure:

```
src/app/
  ai-agents-tangier/
    page.tsx
  ai-agents-morocco/
    page.tsx
  it-consulting-tangier/
    page.tsx
  custom-software-morocco/
    page.tsx
```

---

## Tasks

### Task 6.1 — `/ai-agents-tangier` page

**File:** `src/app/ai-agents-tangier/page.tsx`

**Metadata:**
```typescript
export const metadata = buildPageMetadata({
  title: 'AI Agents in Tangier — Automate Your Business | Hive Vault Arc',
  description:
    'Custom AI agents for Tangier businesses. WhatsApp automation, lead qualification, and intelligent customer support built by H.V.A — the AI consulting firm based in Tangier, Morocco.',
  path: '/ai-agents-tangier',
  keywords: [
    'AI agents Tangier',
    'AI automation Tangier',
    'WhatsApp AI Tangier',
    'chatbot Tangier',
    'artificial intelligence Tangier',
  ],
});
```

**JSON-LD:** Add `ProfessionalService` schema with `areaServed` set to Tangier + `serviceType: "AI Agent Development"`.

**Content sections (write real content — do not use placeholder text):**
1. Hero: "AI Agents Built for Tangier Businesses" — what H.V.A builds and why it matters locally
2. What is an AI Agent? — 2–3 paragraphs explaining AI agents in plain language for a Moroccan SME audience
3. H.V.A's AI Agent offerings in Tangier — WhatsApp agent, lead qualification agent, customer support agent
4. Why Tangier businesses are adopting AI (market context — reference Maroc IA 2030, local adoption stats)
5. H.V.A's Process — how an engagement works (brief ARC overview)
6. FAQ section (5 questions) using `FaqSection` component with FAQ JSON-LD schema
7. CTA section linking to `/contact`

**Internal links to add:**
- Link from `/capabilities` page to `/ai-agents-tangier`
- Link from homepage footer or services section to `/ai-agents-tangier`

---

### Task 6.2 — `/ai-agents-morocco` page

**File:** `src/app/ai-agents-morocco/page.tsx`

**Metadata:**
```typescript
export const metadata = buildPageMetadata({
  title: 'AI Agents in Morocco — WhatsApp Automation & Intelligent Systems | H.V.A',
  description:
    'H.V.A builds AI agents for Moroccan businesses. WhatsApp lead qualification, automated customer ops, and custom AI systems. Serving all of Morocco from Tangier.',
  path: '/ai-agents-morocco',
  keywords: [
    'AI agents Morocco',
    'AI automation Morocco',
    'WhatsApp AI Morocco',
    'artificial intelligence Morocco',
    'AI consulting Morocco',
  ],
});
```

**Content sections:**
1. Hero: National-scope — "Morocco's AI Agent Partner"
2. The Moroccan AI opportunity (Maroc IA 2030, 28.47% CAGR, 85% businesses investing in AI)
3. H.V.A's AI agent stack — what gets built (WhatsApp API, n8n, FastAPI, custom models)
4. Industries served in Morocco — Real Estate, Healthcare, Logistics, Finance
5. Case study teaser (link to a real case study if exists)
6. Pricing range (WhatsApp agent: MAD 15K–40K setup, MAD 2K–6K/month — or hide if not ready to publish publicly)
7. FAQ (5 questions) with FAQ schema
8. CTA to contact

**Schema:** `ProfessionalService` with `areaServed: Morocco`.

---

### Task 6.3 — `/it-consulting-tangier` page

**File:** `src/app/it-consulting-tangier/page.tsx`

**Metadata:**
```typescript
export const metadata = buildPageMetadata({
  title: 'IT Consulting in Tangier — Technology Strategy & Digital Transformation | H.V.A',
  description:
    'H.V.A provides IT consulting and digital transformation services to businesses in Tangier. Technology audits, architecture design, system integration, and AI strategy.',
  path: '/it-consulting-tangier',
  keywords: [
    'IT consulting Tangier',
    'technology consulting Tangier',
    'digital transformation Tangier',
    'IT services Tangier',
    'tech consulting Morocco',
  ],
});
```

**Content sections:**
1. Hero: "IT Consulting for Tangier's Growing Businesses"
2. What H.V.A does as an IT consulting partner (technology audit, roadmap, implementation)
3. The ARC framework explained (Audit → Roadmap → Craft)
4. Services: system architecture, database design, API development, cloud infrastructure
5. Why local IT consulting matters (understand Moroccan regulatory context, bilingual team, on-the-ground presence)
6. FAQ (5 questions)
7. CTA to `/arc` and `/contact`

---

### Task 6.4 — `/custom-software-morocco` page

**File:** `src/app/custom-software-morocco/page.tsx`

**Metadata:**
```typescript
export const metadata = buildPageMetadata({
  title: 'Custom Software Development in Morocco — FastAPI, Next.js, SaaS | H.V.A',
  description:
    'H.V.A builds custom software for Moroccan businesses. FastAPI backends, Next.js frontends, SaaS platforms, and AI-powered applications. Based in Tangier, serving all of Morocco.',
  path: '/custom-software-morocco',
  keywords: [
    'custom software Morocco',
    'software development Morocco',
    'SaaS development Morocco',
    'web application Morocco',
    'FastAPI development Morocco',
  ],
});
```

**Content sections:**
1. Hero: "Custom Software Built for Moroccan Businesses"
2. What custom software means (vs off-the-shelf — ROI argument)
3. H.V.A's tech stack (FastAPI, Next.js, PostgreSQL, AI/ML layers)
4. Types of software H.V.A builds (SaaS platforms, internal tools, AI-integrated systems)
5. The build process (brief sprint-based development overview)
6. FAQ (5 questions)
7. CTA to contact

---

### Task 6.5 — Add new pages to sitemap

**File:** `src/app/sitemap.ts`

Add the four new routes to the sitemap:

```typescript
{ url: absoluteUrl('/ai-agents-tangier'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: absoluteUrl('/ai-agents-morocco'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: absoluteUrl('/it-consulting-tangier'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: absoluteUrl('/custom-software-morocco'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
```

---

### Task 6.6 — Add internal links to new pages

From **`src/app/page.tsx`** (homepage) or the Capabilities view:
- Add at least 2 of the 4 new pages as anchor links from the services/capabilities section

From **`src/app/capabilities/page.tsx`**:
- Link to all 4 pages from the relevant capability cards

---

## Acceptance Criteria

- [ ] All 4 landing pages exist with correct metadata (title, description, canonical, OG)
- [ ] Each page has a `ProfessionalService` JSON-LD schema
- [ ] Each page has substantive, readable content (no Lorem Ipsum, no placeholder text)
- [ ] Each page has a visible FAQ section with FAQ JSON-LD schema
- [ ] All 4 pages appear in `sitemap.ts`
- [ ] At least 2 pages linked from homepage or capabilities page
- [ ] `npm run build` passes and pages are statically generated

---

## Exit Criteria

- [ ] Visit each `/ai-agents-tangier`, `/ai-agents-morocco`, `/it-consulting-tangier`, `/custom-software-morocco` — pages load correctly
- [ ] Google Rich Results Test on each page — `ProfessionalService` and `FAQPage` schemas validate
- [ ] `curl https://hivevaultarc.com/sitemap.xml | grep "ai-agents"` — returns 2 entries
- [ ] Pages are readable, valuable, and match H.V.A's brand voice

