# Sprint 11 — Capabilities: Six Service Pillars

> **Priority:** HIGH — Must run after Sprint 10 (positioning.ts type changes affect this file).
> **Estimated effort:** 3–5 hours
> **Blocking:** Sprint 13 (homepage service cards), Sprint 15 (SEO metadata for capabilities pages)
> **Blocked by:** Sprint 10 (CapabilityCluster type must be updated first)

---

## What This Sprint Is

`src/lib/capabilities-content.ts` currently defines 8 `CapabilityDomain` entries that don't match H.V.A's new 6 service pillars:

| Old (8 domains) | New (6 pillars) |
|---|---|
| ai-systems | strategy-business |
| business-transformation | technology-consulting |
| digital-technology-data | ai-data-analytics |
| consulting | software-engineering |
| engineering | cloud-infrastructure |
| data-growth | operations-managed |
| cybersecurity-risk | *(folded into cloud-infrastructure)* |
| emerging-tech | *(folded into ai-data-analytics)* |

This sprint replaces `CAPABILITY_DOMAINS` with 6 entries aligned to the new pillars, updates `CAPABILITY_BRIEF_SECTIONS` landing links, and verifies that `Capabilities.tsx` and `CapabilitiesInDetail.tsx` render correctly with the new data shape.

---

## Tasks

### Task 11.1 — Replace `CAPABILITY_DOMAINS` array

**File:** `src/lib/capabilities-content.ts`

Find the entire `export const CAPABILITY_DOMAINS: CapabilityDomain[] = [` array (from line 48 to the closing `];`) and replace it entirely with:

```typescript
export const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'strategy-business',
    title: 'Strategy & Business Consulting',
    briefLine: 'The thinking layer — diagnosing, defining, and designing transformation before a line of code is written.',
    briefBullets: ['Business transformation', 'Digital transformation', 'Operational excellence'],
    strategicContext:
      'Transformation succeeds when the business model, operating model, and technology architecture move together from the first decision.',
    executionContext:
      'We run diagnostics, design target operating models, build technology roadmaps, and sequence transformation programs that leadership and operators can execute.',
    subCapabilities: [
      'Business and digital transformation strategy',
      'Operational diagnostics and process redesign',
      'Innovation strategy and market expansion via technology',
      'Organizational redesign and change management',
      'Cost optimization and operational excellence',
    ],
    relatedOutcomes: ['Sharper prioritization', 'Reduced delivery risk', 'Clearer transformation sequencing'],
  },
  {
    id: 'technology-consulting',
    title: 'Technology Consulting',
    briefLine: 'The architecture layer — designing systems that last before building them.',
    briefBullets: ['Enterprise architecture', 'Technology roadmaps', 'Systems integration'],
    strategicContext:
      'Architecture decisions made early compound positively. Architecture decisions deferred compound into technical debt.',
    executionContext:
      'We design the technology blueprint, sequence the roadmap, select platforms, and connect fragmented tools so data and workflows move without friction.',
    subCapabilities: [
      'Enterprise architecture and technology roadmaps',
      'Platform strategy — build vs. buy vs. agent',
      'IT modernization and legacy system replacement',
      'Systems integration and digital workplace design',
      'Infrastructure modernization for cloud, AI, and scale',
    ],
    relatedOutcomes: ['Systems built to last', 'Reduced integration debt', 'Technology that serves the business 3–5 years out'],
  },
  {
    id: 'ai-data-analytics',
    title: 'AI, Data & Analytics',
    briefLine: 'The intelligence layer — where H.V.A is deepest: AI engineering, not just AI consulting.',
    briefBullets: ['AI agents', 'Generative AI engineering', 'Predictive analytics'],
    strategicContext:
      'AI becomes competitive advantage only when integrated into day-to-day operations at the channel clients already live in — not isolated in a pilot dashboard.',
    executionContext:
      'We scope operational goals, deploy production AI agents, build data infrastructure, and connect every workflow to measurable outcomes — including WhatsApp, Morocco\'s primary B2B channel.',
    subCapabilities: [
      'AI agent design and deployment',
      'Generative AI strategy and engineering',
      'Machine learning and predictive analytics',
      'Data engineering, warehouses, and pipelines',
      'Business intelligence and executive dashboards',
      'Conversational AI and WhatsApp agent systems',
      'MLOps and AI production operations',
    ],
    relatedOutcomes: ['Faster decisions', 'Lower manual load', '24/7 operational continuity'],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering & Product Development',
    briefLine: 'The build layer — production-grade systems, not prototypes.',
    briefBullets: ['Custom software', 'SaaS platforms', 'Web and mobile applications'],
    strategicContext:
      'Growth requires systems built for operational fit, not generic tooling that creates workflow friction and scales the wrong behaviors.',
    executionContext:
      'We engineer custom applications, SaaS platforms, APIs, and mobile apps with reliability, security, and maintainability built in — sprint-based, with CI/CD from day one.',
    subCapabilities: [
      'Custom software development — bespoke systems for the exact problem',
      'SaaS platform development — multi-tenant, subscription-based',
      'Web application engineering (Next.js, React)',
      'Mobile application development (React Native, Expo)',
      'API development and deep integration engineering',
      'UX/UI engineering — design wired to the actual frontend',
      'DevOps, CI/CD, and platform engineering',
    ],
    relatedOutcomes: ['Faster product delivery', 'Better system fit', 'Sustainable maintainability'],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    briefLine: 'The foundation layer — built for scale, security, and resilience.',
    briefBullets: ['Cloud migration', 'Security architecture', 'Infrastructure automation'],
    strategicContext:
      'Security and infrastructure cannot be retrofitted after launch. Risk controls, zero-trust design, and observability must be designed in from the start.',
    executionContext:
      'We migrate, design cloud-native systems, automate infrastructure, implement zero-trust security, and deliver observability from day one — no manual infrastructure.',
    subCapabilities: [
      'AWS, Azure, and GCP cloud migration and native development',
      'Infrastructure automation with Terraform and IaC',
      'Security architecture, zero-trust design, and secrets management',
      'Disaster recovery — RTO/RPO planning and multi-region failover',
      'Observability, logging, tracing, and alerting',
      'Managed cloud services and cost optimization',
      'Cybersecurity posture and digital risk assessment',
    ],
    relatedOutcomes: ['Lower operational risk', 'Stronger compliance posture', 'Resilient production systems'],
  },
  {
    id: 'operations-managed',
    title: 'Operations & Managed Services',
    briefLine: 'The evolution layer — we stay after go-live, because that\'s where transformation actually happens.',
    briefBullets: ['Managed operations', 'Application maintenance', 'AI system management'],
    strategicContext:
      'Most transformation programs fail at the handoff. Advisory firms advise, then leave after the deck. Agencies ship and disappear. H.V.A eliminates the handoff — same team, strategy through production.',
    executionContext:
      'We provide ongoing ownership of the systems we build — monitoring, evolving, and operating them as a long-term partner, not a vendor.',
    subCapabilities: [
      'Managed operations — ongoing ownership post-launch',
      'Application maintenance, performance tuning, and feature expansion',
      'Automation and AI system management and evolution',
      'IT support and helpdesk (L1/L2) for internal digital systems',
      'Business process outsourcing and shared services',
    ],
    relatedOutcomes: ['Stable production operations', 'Continuous improvement post-launch', 'Long-term partnership accountability'],
  },
];
```

---

### Task 11.2 — Update `CAPABILITY_BRIEF_SECTIONS` landing links

**File:** `src/lib/capabilities-content.ts`

Find the `CAPABILITY_BRIEF_SECTIONS` mapping:

```typescript
export const CAPABILITY_BRIEF_SECTIONS: CapabilityBriefSection[] = CAPABILITY_DOMAINS.map((domain) => ({
  id: domain.id,
  title: domain.title,
  summary: domain.briefLine,
  bullets: domain.briefBullets.slice(0, 3),
  landingLinks:
    domain.id === 'ai-systems'
      ? [
          { label: 'AI Agents Tangier', href: '/ai-agents-tangier' },
          { label: 'AI Agents Morocco', href: '/ai-agents-morocco' },
        ]
      : domain.id === 'consulting'
      ? [{ label: 'IT Consulting Tangier', href: '/it-consulting-tangier' }]
      : domain.id === 'engineering'
      ? [{ label: 'Custom Software Morocco', href: '/custom-software-morocco' }]
      : [],
}));
```

Replace with:
```typescript
export const CAPABILITY_BRIEF_SECTIONS: CapabilityBriefSection[] = CAPABILITY_DOMAINS.map((domain) => ({
  id: domain.id,
  title: domain.title,
  summary: domain.briefLine,
  bullets: domain.briefBullets.slice(0, 3),
  landingLinks:
    domain.id === 'ai-data-analytics'
      ? [
          { label: 'AI Agents Tangier', href: '/ai-agents-tangier' },
          { label: 'AI Agents Morocco', href: '/ai-agents-morocco' },
        ]
      : domain.id === 'technology-consulting'
      ? [{ label: 'IT Consulting Tangier', href: '/it-consulting-tangier' }]
      : domain.id === 'software-engineering'
      ? [{ label: 'Custom Software Morocco', href: '/custom-software-morocco' }]
      : [],
}));
```

---

### Task 11.3 — Update `BOT_DELIVERY_MODEL` to reflect ARC language

**File:** `src/lib/capabilities-content.ts`

The `BOT_DELIVERY_MODEL` is fine structurally but should reflect ARC terminology. Find:

```typescript
export const BOT_DELIVERY_MODEL: DeliveryModel = {
  name: 'Build-Operate-Transfer',
```

Replace with:
```typescript
export const BOT_DELIVERY_MODEL: DeliveryModel = {
  name: 'ARC — Assess · Re-engineer · Command',
```

Also update the `fitCriteria` array to match ARC language. Find:

```typescript
  fitCriteria: [
    'Internal team needs staged capability transfer',
    'Operations must stay stable during scale-up',
    'Leadership wants execution certainty before handover',
  ],
```

Replace with:
```typescript
  fitCriteria: [
    'Client needs strategy and build delivered by the same team',
    'Operations must remain stable while transformation scales',
    'Leadership wants execution certainty with long-term operating accountability',
  ],
```

---

### Task 11.4 — Verify views render correctly

Check `src/views/Capabilities.tsx` and `src/views/CapabilitiesInDetail.tsx` for any hardcoded references to old domain IDs. Search:

```bash
grep -rn "ai-systems\|business-transformation\|digital-technology-data\|data-growth\|cybersecurity-risk\|emerging-tech" src/
```

For each match found, update the ID reference to the corresponding new pillar ID:

| Old ID | New ID |
|---|---|
| `ai-systems` | `ai-data-analytics` |
| `business-transformation` | `strategy-business` |
| `digital-technology-data` | `technology-consulting` |
| `consulting` | `technology-consulting` |
| `engineering` | `software-engineering` |
| `data-growth` | `ai-data-analytics` |
| `cybersecurity-risk` | `cloud-infrastructure` |
| `emerging-tech` | `ai-data-analytics` |

> Note: If `Capabilities.tsx` or `CapabilitiesInDetail.tsx` are purely data-driven (they map over `CAPABILITY_DOMAINS`), no view changes are needed — the new data will render automatically.

---

### Task 11.5 — Update `PROGRAM_SUMMARIES` keys if needed

**File:** `src/lib/capabilities-content.ts`

Check `CAPABILITY_SOLUTION_PROGRAM_DETAILS` rendering — the `PROGRAM_SUMMARIES` map uses program names as keys (not domain IDs), so this likely needs no change. Verify after build.

---

## Acceptance Criteria

- [ ] `CAPABILITY_DOMAINS` has exactly 6 entries with IDs: `strategy-business`, `technology-consulting`, `ai-data-analytics`, `software-engineering`, `cloud-infrastructure`, `operations-managed`
- [ ] All 8 old domain IDs are removed from the file
- [ ] `CAPABILITY_BRIEF_SECTIONS` landing links reference new IDs (`ai-data-analytics`, `technology-consulting`, `software-engineering`)
- [ ] `BOT_DELIVERY_MODEL.name` reflects ARC terminology
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `/capabilities` page renders 6 cards (not 8)
- [ ] `/capabilities/in-detail` page renders 6 sections

---

## Exit Criteria

- [ ] `grep -rn "ai-systems\|cybersecurity-risk\|emerging-tech\|data-growth" src/lib/capabilities-content.ts` returns zero results
- [ ] `npm run build` completes without errors
- [ ] Running the dev server and visiting `/capabilities` shows 6 capability cards with correct titles
