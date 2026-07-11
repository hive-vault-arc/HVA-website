# Sprint 12 — Industries: Eight Verticals

> **Priority:** HIGH — The current Industries page shows 6 verticals, 4 of which no longer match H.V.A's strategic vertical structure.
> **Estimated effort:** 4–6 hours
> **Blocking:** Sprint 14 (navbar industries dropdown), Sprint 15 (SEO metadata for industry pages)
> **Blocked by:** None (independent of Sprints 10–11)

---

## What This Sprint Is

The current `Industries.tsx` page has 6 verticals:
1. Real Estate & Property ✅ (keep, anchor vertical)
2. Healthcare & Clinical Ops ✅ (keep)
3. Construction & Projects ✅ (keep — subsumed under Real Estate & Construction)
4. Logistics & Operations ✅ (keep)
5. Finance & Brokerage ✅ (keep, rename to Financial Services)
6. SME & Professional Capabilities ❌ (remove — this is a client segment, not an industry)

New H.V.A 8-vertical structure to implement:
1. **Real Estate & Construction** — anchor vertical, proven
2. **Healthcare & Life Sciences** — H2 2026, building
3. **Financial Services** — 2027 pipeline
4. **Government & Public Sector** — 2027 strategic opportunity
5. **Retail & E-Commerce** — 2027 pipeline
6. **Energy, Utilities & Sustainability** — 2028 identified
7. **Logistics & Transportation** — 2027 pipeline
8. **Consumer Goods & Luxury** — 2028 identified

This sprint also requires adding images for the 4 new verticals, updating the `IMGS` map, updating the bento grid layout for 8 cards, and updating the navbar `industriesItems` array.

---

## Tasks

### Task 12.1 — Add images for new verticals

**Directory:** `public/Images/industries/`

Add the following image files (source, generate, or use placeholder webp files for now):

```
government-digital-transformation-morocco.webp
retail-ecommerce-platform-morocco.webp
energy-sustainability-digital-morocco.webp
consumer-goods-luxury-operations-morocco.webp
```

> If final images are not ready, use a placeholder by copying an existing image:
> ```bash
> cp public/Images/industries/sme-capabilities-it-modernization-morocco.webp public/Images/industries/government-digital-transformation-morocco.webp
> cp public/Images/industries/sme-capabilities-it-modernization-morocco.webp public/Images/industries/retail-ecommerce-platform-morocco.webp
> cp public/Images/industries/sme-capabilities-it-modernization-morocco.webp public/Images/industries/energy-sustainability-digital-morocco.webp
> cp public/Images/industries/sme-capabilities-it-modernization-morocco.webp public/Images/industries/consumer-goods-luxury-operations-morocco.webp
> ```
> Replace with properly named, SEO-optimized images before final deployment.

---

### Task 12.2 — Update `IMGS` map in `Industries.tsx`

**File:** `src/views/Industries.tsx`

Find:
```typescript
const IMGS = {
  realEstate:   '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:   '/Images/industries/healthcare-clinical-operations-dashboard-morocco.webp',
  construction: '/Images/industries/construction-project-management-automation-morocco.webp',
  logistics:    '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance:      '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  sme:          '/Images/industries/sme-capabilities-it-modernization-morocco.webp',
  rdLab:        '/Images/brand/hva-ai-software-agency-tangier.webp',
};
```

Replace with:
```typescript
const IMGS = {
  realEstate:    '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:    '/Images/industries/healthcare-clinical-operations-dashboard-morocco.webp',
  construction:  '/Images/industries/construction-project-management-automation-morocco.webp',
  logistics:     '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance:       '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  government:    '/Images/industries/government-digital-transformation-morocco.webp',
  retail:        '/Images/industries/retail-ecommerce-platform-morocco.webp',
  energy:        '/Images/industries/energy-sustainability-digital-morocco.webp',
  consumerGoods: '/Images/industries/consumer-goods-luxury-operations-morocco.webp',
  rdLab:         '/Images/brand/hva-ai-software-agency-tangier.webp',
};
```

---

### Task 12.3 — Replace the bento industry grid

**File:** `src/views/Industries.tsx`

Find the entire `{/* ── Bento Industry Grid ── */}` section (from `<section className="bg-[#f2f4f6] py-24 md:py-32">` to its closing `</section>`) and replace it with:

```tsx
      {/* ── Bento Industry Grid ──────────────────────────────────────────────── */}
      <section className="bg-[#f2f4f6] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
          >

            {/* ── Real Estate — col-span-7, side-by-side ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-7 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.realEstate}
                  alt="Real estate CRM lead operations Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Real Estate &amp; Construction
                </p>
                <h3
                  className="text-3xl mb-5 italic text-[#0F172A]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Real Estate
                </h3>
                <ul className="space-y-2.5 text-sm text-[#475569]">
                  {['Lead operations & CRM', 'AI agent for client communication', 'Pipeline governance'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/case-studies/top-tier-crm-transformation-program-real-estate-operations"
                  className="mt-7 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                >
                  See related work <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* ── Healthcare — col-span-5, image + dark overlay ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-5 group relative overflow-hidden bg-[#0F172A] flex flex-col justify-between min-h-[320px]"
            >
              <Image
                src={IMGS.healthcare}
                alt="Healthcare clinical operations dashboard Morocco"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#93c5fd] mb-4">
                    Healthcare &amp; Life Sciences
                  </p>
                  <h3
                    className="text-3xl italic text-white mb-4"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    Healthcare
                  </h3>
                  <p className="text-[#bfdbfe] text-sm leading-relaxed">
                    Clinical dashboards, electronic medical systems, and AI diagnostics for critical care environments.
                  </p>
                </div>
                <Link
                  href="/case-studies"
                  className="mt-8 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#93c5fd] hover:text-white transition-colors"
                >
                  See related work <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* ── Financial Services — col-span-4, image top ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.finance}
                  alt="Financial services deal pipeline Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Financial Services
                </p>
                <h3
                  className="text-2xl italic text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Finance &amp; Banking
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Core banking modernization, AI fraud detection, and digital banking platforms.
                </p>
              </div>
            </motion.div>

            {/* ── Government — col-span-4, image top ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.government}
                  alt="Government digital transformation Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Government &amp; Public Sector
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Government
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Digital government platforms, citizen portals, and national AI initiatives under Morocco's Maroc IA 2030 roadmap.
                </p>
              </div>
            </motion.div>

            {/* ── Retail — col-span-4, image top ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.retail}
                  alt="Retail e-commerce platform Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Retail &amp; E-Commerce
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Retail
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Omnichannel commerce, AI personalization, and CRM systems across the Morocco–France corridor.
                </p>
              </div>
            </motion.div>

            {/* ── Logistics — col-span-6, image left ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-2/5 h-52 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.logistics}
                  alt="Logistics dispatch workflow automation Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Logistics &amp; Transportation
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Logistics
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Fleet management, route optimization, and SLA monitoring. Built for Tanger Med — Africa's largest port corridor.
                </p>
              </div>
            </motion.div>

            {/* ── Energy — col-span-6, image left ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-2/5 h-52 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.energy}
                  alt="Energy sustainability digital Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Energy &amp; Sustainability
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Energy
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Smart grids, ESG analytics, and predictive maintenance for Morocco's renewable energy market.
                </p>
              </div>
            </motion.div>

            {/* ── Construction & Consumer Goods — col-span-6 each ── */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.construction}
                  alt="Construction project management automation Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Construction &amp; Projects
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Construction
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Operational planning, schedule visibility, and field-to-office process automation.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.consumerGoods}
                  alt="Consumer goods luxury operations Morocco France"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Consumer Goods &amp; Luxury
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Consumer &amp; Luxury
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Customer analytics, AI marketing, and retail intelligence across the Morocco–France luxury corridor.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
```

---

### Task 12.4 — Update `industriesItems` in `Navbar.tsx`

**File:** `src/components/Navbar.tsx`

Find:
```typescript
  const industriesItems = [
    { path: '/industries#real-estate', label: 'Real Estate' },
    { path: '/industries#healthcare', label: 'Healthcare' },
    { path: '/industries#construction', label: 'Construction' },
    { path: '/industries#logistics', label: 'Logistics' },
    { path: '/industries#finance-brokerage', label: 'Finance & Brokerage' },
    { path: '/industries#sme-capabilities', label: 'SME Capabilities' },
  ];
```

Replace with:
```typescript
  const industriesItems = [
    { path: '/industries#real-estate', label: 'Real Estate & Construction' },
    { path: '/industries#healthcare', label: 'Healthcare & Life Sciences' },
    { path: '/industries#financial-services', label: 'Financial Services' },
    { path: '/industries#government', label: 'Government & Public Sector' },
    { path: '/industries#retail', label: 'Retail & E-Commerce' },
    { path: '/industries#energy', label: 'Energy & Sustainability' },
    { path: '/industries#logistics', label: 'Logistics & Transportation' },
    { path: '/industries#consumer-goods', label: 'Consumer Goods & Luxury' },
  ];
```

---

### Task 12.5 — Update hero copy on the Industries page

**File:** `src/views/Industries.tsx`

The hero subtext still references the old framing. Find:

```tsx
            <p className="mt-8 max-w-2xl text-xl md:text-2xl font-light leading-relaxed text-[#45464d]">
              H.V.A designs transformation programs around sector workflows, operating constraints,
              and decision models — not copied templates.
            </p>
```

Replace with:
```tsx
            <p className="mt-8 max-w-2xl text-xl md:text-2xl font-light leading-relaxed text-[#45464d]">
              H.V.A operates across 8 industry verticals — combining domain expertise with the full ARC delivery model: strategy, engineering, and operations in one team.
            </p>
```

---

## Acceptance Criteria

- [ ] `IMGS` map has 10 entries (9 industries + rdLab)
- [ ] All 4 new image files exist in `public/Images/industries/`
- [ ] Bento grid renders 8 industry cards (no SME Capabilities card)
- [ ] Real Estate card label reads "Real Estate & Construction"
- [ ] Healthcare card label reads "Healthcare & Life Sciences"
- [ ] Finance card reads "Finance & Banking" (not "Finance & Brokerage")
- [ ] 4 new verticals visible: Government, Retail, Energy, Consumer Goods & Luxury
- [ ] `industriesItems` in `Navbar.tsx` has 8 entries
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -n "SME" src/views/Industries.tsx` returns zero results
- [ ] `grep -n "Finance & Brokerage" src/components/Navbar.tsx` returns zero results
- [ ] Running dev server at `/industries` shows 8 industry cards
- [ ] Navbar Industries dropdown shows all 8 verticals
- [ ] No broken image paths — check browser console for 404s
