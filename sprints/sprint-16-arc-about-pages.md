# Sprint 16 — ARC & About Pages Update

> **Priority:** MEDIUM — These are brand-defining pages that must match the new positioning.
> **Estimated effort:** 2–3 hours
> **Blocking:** None
> **Blocked by:** Sprint 10 (positioning language established first)

---

## What This Sprint Is

Two pages need positioning updates after the repositioning:

**`Arc.tsx`** — The ARC page currently uses:
- Hero: "Category Thinking + Field Execution" — no longer accurate
- Phase names: "Diagnose", "Engineer", "Run & Evolve" — replace with the official ARC triad: **Assess**, **Re-engineer**, **Command**
- Phase descriptors reference "digital transformation" without the new "transformation partner" framing

**`About.tsx`** — The About page currently references:
- "AI systems, digital transformation strategy, software architecture, and cloud engineering" — needs updating to name all 6 service pillars and use "technology transformation partner"
- Footer CTA subtext uses old framing

Both pages are high-intent pages visited by prospects evaluating H.V.A — the language must be sharp and consistent with the vault positioning.

---

## Tasks

### Task 16.1 — Update the ARC hero heading

**File:** `src/views/Arc.tsx`

Find the h1 hero block:
```tsx
            <h1 className="font-headline text-[clamp(3rem,7vw,6rem)] text-[#0F172A] leading-[1.02] tracking-tight mb-8">
              The <span className="text-[#2563EB]">ARC</span> Framework:
              <br />
              <em className="italic font-light text-[var(--on-surface-variant)]">Category</em>
              <span className="block md:ml-[0.7em]">
                <em className="italic font-light text-[var(--on-surface-variant)]">Thinking</em> + Field
              </span>
              <span className="block md:ml-[2.1em]">Execution.</span>
            </h1>
```

Replace with:
```tsx
            <h1 className="font-headline text-[clamp(3rem,7vw,6rem)] text-[#0F172A] leading-[1.02] tracking-tight mb-8">
              The <span className="text-[#2563EB]">ARC</span> Model:
              <br />
              <em className="italic font-light text-[var(--on-surface-variant)]">Assess.</em>
              <span className="block md:ml-[0.7em]">
                <em className="italic font-light text-[var(--on-surface-variant)]">Re-engineer.</em>
              </span>
              <span className="block md:ml-[2.1em]">Command.</span>
            </h1>
```

---

### Task 16.2 — Update the ARC hero subtext

**File:** `src/views/Arc.tsx`

Find:
```tsx
            <p className="text-xl text-[var(--on-surface-variant)] font-light max-w-xl leading-relaxed mb-10">
              A rigorous architectural approach to digital transformation. Strategy, engineering, and operational iteration — in one accountable loop.
            </p>
```

Replace with:
```tsx
            <p className="text-xl text-[var(--on-surface-variant)] font-light max-w-xl leading-relaxed mb-10">
              H.V.A's delivery model. Strategy and consulting. AI engineering and software. Operations and managed services — in one team, across the full lifecycle. No handoff.
            </p>
```

---

### Task 16.3 — Rename Phase 01: "Diagnose" → "Assess"

**File:** `src/views/Arc.tsx`

Find:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Diagnose</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Map operating friction, decision bottlenecks, and technology constraints with leadership and functional teams.
              </p>
```

Replace with:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Assess</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Map operating friction, define target architecture, and sequence the transformation — strategy and technology consulting before a single line of code is written.
              </p>
```

Also update the visual code tag in the same Phase 01 card. Find:
```tsx
                      SCANNING_BOTTLENECKS
```
Replace with:
```tsx
                      ASSESSING_CONSTRAINTS
```

---

### Task 16.4 — Rename Phase 02: "Engineer" → "Re-engineer"

**File:** `src/views/Arc.tsx`

Find:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Engineer</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Translate strategy into architecture, workflows, and software modules that run under real production pressure.
              </p>
```

Replace with:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Re-engineer</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Build the systems, deploy the intelligence, wire the infrastructure — AI engineering, custom software, and cloud delivered under real production pressure.
              </p>
```

---

### Task 16.5 — Rename Phase 03: "Run & Evolve" → "Command"

**File:** `src/views/Arc.tsx`

Find:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Run &amp; Evolve</h3>
```

Replace with:
```tsx
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Command</h3>
```

Also find and update the Phase 03 description. Look for the text following "Run & Evolve" and update to:
```tsx
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Stabilize, monitor, and evolve — managing operations, AI systems, and applications long-term. Same team. No handoff.
              </p>
```

---

### Task 16.6 — Update the "ARC is Different" contrast section

**File:** `src/views/Arc.tsx`

Find:
```tsx
              Most transformation programs fail at the handoff. Advisory firms leave after the deck. Agencies ship and disappear. ARC eliminates that gap — permanently.
```

Replace with:
```tsx
              Most transformation programs fail at the handoff. Advisory firms leave after the deck. Agencies ship and disappear. H.V.A eliminates that gap entirely — same team, strategy through production, no drift.
```

---

### Task 16.7 — Update the ARC `CapabilityEngagementStep` labels

**File:** `src/views/Arc.tsx`

Search for any section that maps the four engagement steps (Diagnose, Build, Operate, Transfer). If these appear in Arc.tsx as rendered content:

Find:
```tsx
        title: 'Diagnose',
```
Replace with:
```tsx
        title: 'Assess',
```

> The engagement steps are defined in `src/lib/capabilities-content.ts` in `CAPABILITY_ENGAGEMENT_STEPS`. Check that file:
> ```bash
> grep -n "Diagnose\|Engineer\|Run\|Operate\|Transfer" src/lib/capabilities-content.ts
> ```
> Update the `step` titles there if they still use old ARC language:

In `capabilities-content.ts`, find:
```typescript
export const CAPABILITY_ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: '01',
    title: 'Diagnose',
```
Replace `'Diagnose'` with `'Assess'`. Keep `'Build'`, `'Operate'`, and `'Transfer'` as-is — they align with the Command phase.

---

### Task 16.8 — Update the About page founding team descriptor

**File:** `src/views/About.tsx`

Find:
```tsx
              Our founding team blends AI systems, digital transformation strategy, software architecture, and cloud engineering to deliver programs that are practical, resilient, and built for long-term evolution.
```

Replace with:
```tsx
              Our founding team combines strategy consulting, technology architecture, AI engineering, software development, cloud infrastructure, and managed operations — delivering technology transformation programs that are practical, resilient, and built for long-term evolution.
```

---

### Task 16.9 — Update the About page CTA subtext

**File:** `src/views/About.tsx`

Find:
```tsx
          subtext="Share your goals and constraints. We will map the right AI automation, digital transformation, and engineering delivery path — then discuss scope after discovery."
```

Replace with:
```tsx
          subtext="Share your goals and constraints. We will map the right strategy, engineering, and operations path — and discuss scope after discovery. No handoff. Same team."
```

---

### Task 16.10 — Update the About page quoted line about "real AI and digital transformation"

**File:** `src/views/About.tsx`

Find:
```tsx
                      "Real AI and digital transformation is only complete when it works under real operational pressure."
```

Replace with:
```tsx
                      "Real technology transformation is only complete when the systems are running, the team has handed off nothing, and the outcomes are measurable."
```

---

## Acceptance Criteria

- [ ] ARC hero heading reads "Assess. Re-engineer. Command."
- [ ] ARC hero subtext references "technology transformation partner" language
- [ ] Phase 01 labeled "Assess" with updated description
- [ ] Phase 02 labeled "Re-engineer" with updated description
- [ ] Phase 03 labeled "Command" with updated description
- [ ] `CAPABILITY_ENGAGEMENT_STEPS[0].title` is `'Assess'` in `capabilities-content.ts`
- [ ] About page founding team description names all 6 service pillars
- [ ] About page CTA subtext updated
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -n "Diagnose\|Category Thinking\|Field Execution\|Run & Evolve" src/views/Arc.tsx` returns zero results
- [ ] `grep -n "AI systems, digital transformation strategy" src/views/About.tsx` returns zero results
- [ ] Running dev server at `/arc` shows "Assess. Re-engineer. Command." in hero
- [ ] Running dev server at `/whoweare/abouthva` shows updated founder descriptor
- [ ] Build passes locally
