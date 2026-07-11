# Sprint 14 — Navigation & Footer Update

> **Priority:** MEDIUM — Navigation is seen on every page. Must reflect 8 industries and correct service language.
> **Estimated effort:** 1–2 hours
> **Blocking:** None
> **Blocked by:** Sprint 12 (industries must be finalized before updating nav labels)

---

## What This Sprint Is

Two components need updating after the positioning and industry changes:

1. **`Navbar.tsx`** — The `CapabilitiesItems` dropdown only shows 2 links (Solution Programs, In Detail). It should also surface the 6 service pillars or a landing-page approach. Additionally, the `industriesItems` update is in Sprint 12 — this sprint handles any remaining navbar polish after that's done.

2. **`SiteFooter.tsx`** — The `expertiseLinks` array still lists old service labels. It should be updated to surface the 6 service pillars as a footer navigation column. The `shortDescriptor` in the footer already auto-updates from `CANONICAL_MARKET_IDENTITY` after Sprint 10 — no manual change needed there.

---

## Tasks

### Task 14.1 — Update `expertiseLinks` in `SiteFooter.tsx`

**File:** `src/components/SiteFooter.tsx`

Find:
```typescript
const expertiseLinks = [
  { href: '/capabilities/solution-programs', label: 'Solution Programs' },
  { href: '/case-studies/multilingual-whatsapp-ai-agent', label: 'WhatsApp Agent Operations' },
  { href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations', label: 'CRM Modernization' },
  { href: '/case-studies', label: 'Healthcare Case Studies' },
  { href: '/insights/research-reports', label: 'Research Reports' },
];
```

Replace with:
```typescript
const expertiseLinks = [
  { href: '/capabilities#strategy-business', label: 'Strategy & Business Consulting' },
  { href: '/capabilities#ai-data-analytics', label: 'AI, Data & Analytics' },
  { href: '/capabilities#software-engineering', label: 'Software Engineering' },
  { href: '/capabilities#cloud-infrastructure', label: 'Cloud & Infrastructure' },
  { href: '/capabilities#operations-managed', label: 'Operations & Managed Services' },
  { href: '/capabilities/solution-programs', label: 'Solution Programs' },
];
```

---

### Task 14.2 — Rename the footer Expertise column to "Services"

**File:** `src/components/SiteFooter.tsx`

Find:
```tsx
              <p className="site-footer__title">Expertise</p>
```

Replace with:
```tsx
              <p className="site-footer__title">Services</p>
```

---

### Task 14.3 — Add "Industries" navigation column to the footer

**File:** `src/components/SiteFooter.tsx`

After the closing `</nav>` tag of the Services column, add a new Industries nav column:

```tsx
            <nav className="site-footer__group" aria-label="Footer industries">
              <p className="site-footer__title">Industries</p>
              <ul className="site-footer__list-stack">
                {[
                  { href: '/industries#real-estate', label: 'Real Estate & Construction' },
                  { href: '/industries#healthcare', label: 'Healthcare & Life Sciences' },
                  { href: '/industries#financial-services', label: 'Financial Services' },
                  { href: '/industries#government', label: 'Government & Public Sector' },
                  { href: '/industries#retail', label: 'Retail & E-Commerce' },
                  { href: '/industries#logistics', label: 'Logistics & Transportation' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
```

> Note: Only 6 industries listed in footer (most prominent). Energy and Consumer Goods are 2028 targets — include them at your discretion.

---

### Task 14.4 — Verify navbar `CapabilitiesItems` is accurate

**File:** `src/components/Navbar.tsx`

The `CapabilitiesItems` array currently shows:
```typescript
  const CapabilitiesItems = [
    { path: '/capabilities/solution-programs', label: 'Solution Programs' },
    { path: '/capabilities/in-detail', label: 'In Detail' },
  ];
```

This is acceptable as a compact dropdown pointing to the capabilities sub-pages. No change needed unless you want to expand it to 6 pillar links. If expanding, replace with:

```typescript
  const CapabilitiesItems = [
    { path: '/capabilities#strategy-business', label: 'Strategy & Business Consulting' },
    { path: '/capabilities#technology-consulting', label: 'Technology Consulting' },
    { path: '/capabilities#ai-data-analytics', label: 'AI, Data & Analytics' },
    { path: '/capabilities#software-engineering', label: 'Software Engineering' },
    { path: '/capabilities#cloud-infrastructure', label: 'Cloud & Infrastructure' },
    { path: '/capabilities#operations-managed', label: 'Operations & Managed Services' },
    { path: '/capabilities/solution-programs', label: 'Solution Programs' },
    { path: '/capabilities/in-detail', label: 'Full Detail View' },
  ];
```

> This is optional — the compact 2-link version is clean. Choose based on UX preference.

---

### Task 14.5 — Verify footer `shortDescriptor` auto-update

**File:** `src/components/SiteFooter.tsx`

The footer already renders:
```tsx
              {CANONICAL_MARKET_IDENTITY.shortDescriptor}
```

After Sprint 10 updates `positioning.ts`, this will automatically read:
> "Hive Vault Arc (H.V.A) is a technology transformation partner combining strategy, AI engineering, and managed operations."

**No additional change needed** — verify this renders correctly after Sprint 10 is applied.

---

### Task 14.6 — Verify `HeroSlider` does not contain old positioning language

**File:** `src/components/ui/HeroSlider.tsx` (or wherever the hero slider content is defined)

Search for old phrases:
```bash
grep -rn "AI & Automation\|digital transformation firm\|chatbot\|AI-powered" src/components/ui/
```

If any old positioning phrases appear in the slider content, update them to align with "technology transformation partner" language.

---

## Acceptance Criteria

- [ ] Footer "Expertise" column renamed to "Services" with 6 service pillar links
- [ ] Footer has an "Industries" column with at least 6 vertical links
- [ ] `CANONICAL_MARKET_IDENTITY.shortDescriptor` in footer reflects new positioning after Sprint 10
- [ ] `industriesItems` in `Navbar.tsx` has 8 entries (set in Sprint 12)
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -n "WhatsApp Agent Operations\|CRM Modernization\|Healthcare Case Studies" src/components/SiteFooter.tsx` returns zero results
- [ ] Footer renders 2 new nav columns: Services and Industries
- [ ] Build passes locally
