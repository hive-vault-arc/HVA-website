# Sprint 15 - SEO & Metadata Update

> 2026-05-24 status: historical sprint. Use `sprints/seo-ai-discovery/` for current SEO + AI discovery work. Public-facing brand should now be `Hive Vault Arc`; `H.V.A` and `HVA` remain aliases/search variants.

> **Priority:** HIGH — Metadata is read by Google, LLMs, and social crawlers on every page. Old positioning in titles and descriptions actively works against the new brand.
> **Estimated effort:** 2–3 hours
> **Blocking:** None
> **Blocked by:** Sprint 10 (positioning.ts must be updated — `DEFAULT_DESCRIPTION` auto-pulls from it)

---

## What This Sprint Is

After Sprint 10 updates `positioning.ts`, `DEFAULT_DESCRIPTION` in `seo.ts` will automatically update because it is derived from `CANONICAL_MARKET_IDENTITY.longDescriptor`. However, several things remain hardcoded and must be updated manually:

1. `DEFAULT_TITLE` in `seo.ts` — still hardcoded with old language
2. `GLOBAL_KEYWORDS` — missing "technology transformation partner" and 6 pillar keywords
3. Individual page titles and descriptions in `src/app/*/page.tsx` files — several reference old language
4. The industries page metadata — needs keywords for all 8 new verticals
5. The ARC page metadata — needs updating for new ARC framing

---

## Tasks

### Task 15.1 — Update `DEFAULT_TITLE` in `seo.ts`

**File:** `src/lib/seo.ts`

Find:
```typescript
export const DEFAULT_TITLE = `${SITE_NAME} | AI & Automation · Digital Transformation · Technology Consulting`;
```

Replace with:
```typescript
export const DEFAULT_TITLE = `${SITE_NAME} | Technology Transformation Partner · Strategy · AI Engineering · Operations`;
```

---

### Task 15.2 — Update `GLOBAL_KEYWORDS` in `seo.ts`

**File:** `src/lib/seo.ts`

Find:
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
  'digital services Tangier',
  'digital services Morocco',
  'digital agency Tangier',
  'services digitaux Tanger',
  'agence digitale Tanger',
  'digital services Tanger',
  'technology services Tangier',
];
```

Replace with:
```typescript
export const GLOBAL_KEYWORDS = [
  BUSINESS_NAME,
  ...BRAND_SEARCH_VARIANTS,
  // Core positioning
  'technology transformation partner Morocco',
  'technology transformation partner Tangier',
  'technology consulting firm Morocco',
  'AI engineering firm Morocco',
  'digital transformation company Morocco',
  'managed operations Morocco',
  // Service pillar keywords
  'strategy consulting Morocco',
  'AI agents Morocco',
  'WhatsApp AI agent Morocco',
  'custom software Morocco',
  'cloud infrastructure Morocco',
  'IT consulting Morocco',
  'IT consulting Tangier',
  // Industry keywords
  'real estate technology Morocco',
  'healthcare technology Morocco',
  'government digital transformation Morocco',
  // Local/multilingual
  'digital services Tangier',
  'digital services Morocco',
  'services digitaux Tanger',
  'agence digitale Tanger',
  'ARC program HVA',
  'CRM Morocco',
];
```

---

### Task 15.3 — Update the Industries page metadata

**File:** `src/app/industries/page.tsx`

Find the `buildPageMetadata` call and update `title`, `description`, and `keywords`:

Find:
```typescript
export const metadata: Metadata = buildPageMetadata({
  title: ...  // whatever the current title is
  description: ... // whatever the current description is
```

Replace the title, description, and keywords with:
```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'Industries | Technology Transformation Across 8 Verticals',
  description:
    'Hive Vault Arc (H.V.A) operates across 8 industry verticals — Real Estate, Healthcare, Financial Services, Government, Retail, Energy, Logistics, and Consumer Goods — combining domain expertise with strategy, AI engineering, and managed operations.',
  path: '/industries',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'real estate technology transformation Morocco',
    'healthcare digital transformation Morocco',
    'financial services technology Morocco',
    'government digital transformation Morocco Maroc IA 2030',
    'retail ecommerce technology Morocco',
    'energy sustainability technology Morocco',
    'logistics technology Morocco Tanger Med',
    'consumer goods luxury technology Morocco France',
    'industry-specific technology consulting Morocco',
    'secteur immobilier technologie Maroc',
    'transformation digitale secteur santé Maroc',
  ]),
});
```

---

### Task 15.4 — Update the Capabilities page metadata

**File:** `src/app/capabilities/page.tsx`

Update `title` and `description`:

```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'Capabilities | Six Service Pillars — Strategy to Operations',
  description:
    'H.V.A delivers across six integrated service pillars: Strategy & Business Consulting, Technology Consulting, AI & Data Analytics, Software Engineering, Cloud & Infrastructure, and Operations & Managed Services.',
  path: '/capabilities',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'strategy consulting Morocco',
    'technology consulting Morocco',
    'AI data analytics Morocco',
    'software engineering Morocco',
    'cloud infrastructure Morocco',
    'managed operations Morocco',
    'six service pillars technology firm',
    'end-to-end technology delivery Morocco',
  ]),
});
```

---

### Task 15.5 — Update the ARC page metadata

**File:** `src/app/arc/page.tsx`

Find:
```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'ARC | Category Framework for Transformation Execution',
  description:
    'ARC is H.V.A's category framework that combines strategic consulting, engineering execution, and operational evolution for long-term transformation outcomes.',
  path: '/arc',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'ARC transformation framework',
    'consulting and execution model',
    'technology strategy to production',
    'digital transformation operating model',
  ]),
});
```

Replace with:
```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'ARC Framework | Assess · Re-engineer · Command',
  description:
    'ARC is H.V.A\'s delivery model — Assess (Strategy & Technology Consulting), Re-engineer (AI, Software & Cloud), Command (Operations & Managed Services). Same team. Strategy through production. No handoff.',
  path: '/arc',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'ARC transformation framework',
    'assess re-engineer command',
    'technology strategy to production Morocco',
    'full lifecycle technology delivery',
    'no handoff transformation model',
    'strategy engineering operations one team Morocco',
  ]),
});
```

---

### Task 15.6 — Update the About page metadata

**File:** `src/app/aboutus/page.tsx`

Find:
```typescript
  description:
    'Meet the H.V.A team: a consulting-led digital transformation firm in Tangier that combines strategy, architecture, engineering delivery, and long-term operations ownership.',
```

Replace with:
```typescript
  description:
    'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco — combining strategy, AI engineering, software development, cloud infrastructure, and managed operations in one team.',
```

Also update the `title`:

Find:
```typescript
  title: 'About | Technology Consulting and Transformation Partner',
```

Replace with:
```typescript
  title: 'About H.V.A | Technology Transformation Partner — Tangier, Morocco',
```

---

### Task 15.7 — Update `llm.txt` (AEO — AI Engine Optimization)

**File:** `public/llm.txt` (or wherever it is defined — check `public/` or `src/app/`)

```bash
find src/ public/ -name "llm.txt" 2>/dev/null
```

If `llm.txt` exists, update the H.V.A description paragraph to:

```
Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco. H.V.A combines strategy and business consulting, technology consulting, AI and data engineering, custom software development, cloud and infrastructure, and managed operations — delivering across the full lifecycle from strategy through production. H.V.A serves 8 industry verticals: Real Estate & Construction, Healthcare & Life Sciences, Financial Services, Government & Public Sector, Retail & E-Commerce, Energy & Sustainability, Logistics & Transportation, and Consumer Goods & Luxury. H.V.A's delivery model is ARC: Assess (strategy and architecture), Re-engineer (AI, software, and cloud), Command (operations and managed services). No handoff. Same team. Tangier, Morocco — delivering globally.
```

---

### Task 15.8 — Check JSON-LD organization schema

**File:** `src/components/JsonLd.tsx` or wherever the global Organization schema is defined

```bash
grep -rn "description.*consulting\|description.*AI-powered\|description.*digital transformation firm" src/
```

If any JSON-LD `description` fields still reference old positioning, update them to:
```
"Hive Vault Arc (H.V.A) is a technology transformation partner combining strategy, AI engineering, software development, and managed operations."
```

---

## Acceptance Criteria

- [ ] `DEFAULT_TITLE` in `seo.ts` references "Technology Transformation Partner"
- [ ] `GLOBAL_KEYWORDS` includes "technology transformation partner Morocco" and all 6 pillar keywords
- [ ] Industries page metadata describes all 8 verticals
- [ ] Capabilities page metadata describes all 6 pillars
- [ ] ARC page metadata uses "Assess · Re-engineer · Command" framing
- [ ] About page description references "technology transformation partner"
- [ ] `llm.txt` (if present) is updated with new description
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -rn "AI & Automation · Digital Transformation · Technology Consulting" src/` returns zero results
- [ ] `grep -rn "AI-powered digital transformation and technology consulting firm" src/` returns zero results (auto-cleared by Sprint 10)
- [ ] Running `curl https://hivevaultarc.com/ | grep "Technology Transformation"` returns a match after deployment
- [ ] Google Search Console — no manual action; monitor for re-crawl and title/description update over 2–4 weeks
