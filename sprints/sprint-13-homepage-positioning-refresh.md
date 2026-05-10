# Sprint 13 — Homepage Positioning Refresh

> **Priority:** HIGH — The homepage is the highest-traffic page and still uses old positioning language.
> **Estimated effort:** 2–3 hours
> **Blocking:** Sprint 15 (homepage metadata)
> **Blocked by:** Sprint 10 (positioning.ts must be updated first)

---

## What This Sprint Is

The homepage (`src/views/Home.tsx`) has three areas that still reflect the old positioning:

1. **The identity panel** ("Strategic Clarity. Engineering Precision.") — needs to reflect "Technology Transformation Partner" and the Advise. Build. Operate. tagline.
2. **The capability pillars section** — currently has 6 cards with old labels. Replace with the 6 new service pillars.
3. **The "Operational Mastery" features section** — 3 feature blocks currently labeled "Strategic Consulting", "Precision Engineering", "Technical Execution". Rename to map to the ARC framework phases: Assess → Re-engineer → Command.

The page `src/app/page.tsx` also has a hardcoded `title.absolute` that references old positioning — update it.

---

## Tasks

### Task 13.1 — Update the identity panel heading and descriptor

**File:** `src/views/Home.tsx`

Find:
```tsx
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-[1.08] mb-8">
              Strategic Clarity.<br />
              <em className="font-headline italic text-white/35">Engineering Precision.</em>
            </h2>
            <p className="text-white/60 font-body leading-relaxed text-base mb-10 max-w-sm">
              H.V.A builds AI automation systems, leads digital transformation programs, and delivers production-grade engineering — from strategic roadmap through long-term operations.
            </p>
            <div className="h-px w-12 bg-[#2563EB] mb-4" />
            <p className="text-[9px] font-label font-bold uppercase tracking-[0.28em] text-white/35">
              AI · Transformation · Consulting · Cloud
            </p>
```

Replace with:
```tsx
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-[1.08] mb-8">
              Advise. Build.<br />
              <em className="font-headline italic text-white/35">Operate.</em>
            </h2>
            <p className="text-white/60 font-body leading-relaxed text-base mb-10 max-w-sm">
              H.V.A is a technology transformation partner — combining strategy, AI engineering, software development, and managed operations in one team. We stay until it works.
            </p>
            <div className="h-px w-12 bg-[#2563EB] mb-4" />
            <p className="text-[9px] font-label font-bold uppercase tracking-[0.28em] text-white/35">
              Strategy · AI Engineering · Software · Operations
            </p>
```

---

### Task 13.2 — Replace the `capabilityPillars` array

**File:** `src/views/Home.tsx`

Find the entire `const capabilityPillars = [` array (6 entries — from `icon: <Bot` to the closing `];` of the array) and replace it with:

```typescript
  const capabilityPillars = [
    {
      icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Strategy & Business Consulting',
      desc: 'Diagnose, define, and design transformation before a single line of code is written.',
      details: [
        'Business and digital transformation strategy',
        'Operational diagnostics and process redesign',
        'Innovation strategy and market expansion',
      ],
    },
    {
      icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Technology Consulting',
      desc: 'Architecture decisions made early compound positively. We design systems that last.',
      details: [
        'Enterprise architecture and technology roadmaps',
        'Platform strategy and systems integration',
        'IT modernization and infrastructure design',
      ],
    },
    {
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
      title: 'AI, Data & Analytics',
      desc: 'AI agents on WhatsApp, web chat, and email — multilingual, always-on, trained on your operations.',
      details: [
        'AI agent design and deployment',
        'Generative AI strategy and engineering',
        'Data engineering and business intelligence',
      ],
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Software Engineering',
      desc: 'Production-grade custom software, SaaS platforms, and web and mobile applications.',
      details: [
        'Custom software and SaaS platform development',
        'Web and mobile application delivery',
        'API engineering and DevOps',
      ],
    },
    {
      icon: <Cloud className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Cloud & Infrastructure',
      desc: 'Built for scale, security, and resilience — zero-trust design and observability from day one.',
      details: [
        'AWS, Azure, and GCP cloud migration',
        'Infrastructure automation and security architecture',
        'Observability, DR, and managed cloud services',
      ],
    },
    {
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Operations & Managed Services',
      desc: 'We stay after go-live. Same team — strategy through production. No handoff.',
      details: [
        'Managed operations and application maintenance',
        'AI system management post-deployment',
        'Business process outsourcing and shared services',
      ],
    },
  ];
```

---

### Task 13.3 — Update the "Operational Mastery" feature section

**File:** `src/views/Home.tsx`

This section has 3 feature blocks. Update all three to map to ARC phases.

**Feature 01 — Find:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Strategic Consulting</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We diagnose operational friction, map decision bottlenecks, and translate leadership goals into an executable transformation program.
                  </p>
```
**Replace with:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Assess — Strategy & Architecture</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We diagnose operational friction, define target architecture, and sequence the transformation so leadership has a plan they can actually execute.
                  </p>
```

**Feature 02 — Find:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Precision Engineering</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    Systems are engineered for reliability under pressure, then continuously tuned to improve business performance.
                  </p>
```
**Replace with:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Re-engineer — AI, Software & Cloud</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We build the systems, deploy the intelligence, and wire the infrastructure — engineered for reliability under real operational load.
                  </p>
```

**Feature 03 — Find:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Technical Execution</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We run a predictable consulting-to-delivery cadence so strategy decisions translate into measurable operational outcomes.
                  </p>
```
**Replace with:**
```tsx
                <h4 className="font-headline text-2xl text-white mb-2">Command — Operate & Evolve</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We stabilize, monitor, and evolve the systems we build — owning outcomes long-term so strategy decisions translate into measurable operational results.
                  </p>
```

---

### Task 13.4 — Update the section heading for "Operational Mastery"

**File:** `src/views/Home.tsx`

Find:
```tsx
              <em className="not-italic text-[#2563EB] font-headline italic">Operational Mastery</em>
```

Replace with:
```tsx
              <em className="not-italic text-[#2563EB] font-headline italic">The Full ARC</em>
```

---

### Task 13.5 — Update the homepage `title.absolute` in `page.tsx`

**File:** `src/app/page.tsx`

Find:
```typescript
  title: {
    absolute: 'Hive Vault Arc (H.V.A) | AI & Digital Transformation · Technology Consulting · Tangier',
  },
```

Replace with:
```typescript
  title: {
    absolute: 'Hive Vault Arc (H.V.A) | Technology Transformation Partner · Strategy · AI Engineering · Tangier',
  },
```

---

### Task 13.6 — Update homepage metadata keywords

**File:** `src/app/page.tsx`

Find the `keywords: mergeKeywords(GLOBAL_KEYWORDS, [` array on the homepage page.tsx and add these entries:

```typescript
      'technology transformation partner Morocco',
      'technology transformation partner Tangier',
      'AI engineering firm Morocco',
      'managed operations Morocco',
      'strategy AI engineering operations',
```

> Add them after `'long-term technology partner',` in the existing keywords list.

---

## Acceptance Criteria

- [ ] Identity panel heading reads "Advise. Build. Operate."
- [ ] Identity panel subtext references "technology transformation partner"
- [ ] Capability pillars array has 6 entries matching the 6 service pillars
- [ ] Feature section headings read "Assess", "Re-engineer", "Command"
- [ ] `page.tsx` `title.absolute` references "Technology Transformation Partner"
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -n "Strategic Clarity\|Engineering Precision\|AI & Automation\|AI & Intelligent Automation\|Digital Transformation" src/views/Home.tsx` returns zero results
- [ ] Running dev server at `/` shows updated identity panel and 6 pillar cards
- [ ] Build passes locally
