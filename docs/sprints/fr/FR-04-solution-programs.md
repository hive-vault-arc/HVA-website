# FR-04 — Services Solution Programs Page (French)

**Route:** `/fr/services/solution-programs`
**View file:** `src/views/ServicesSolutionPrograms.tsx`
**App page:** `src/app/services/solution-programs/page.tsx`
**Data source:** `src/lib/services-content.ts` (shared with FR-02 / FR-03)
**Depends on:** FR-00, FR-02

---

## Goal

Translate the Solution Programs page. This is the shortest of the three services sub-pages (92 lines). Most program data comes from `services-content.ts`.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph

### Program cards grid
Each program card has:
- `title`
- `description`
- `phase` or `tier` label (if present)
- CTA link text per card (e.g. `"Learn more"`, `"Get started"`)

### How it works / process section (if present)
- Section headline
- Step labels and descriptions

### Back / navigation
- Any breadcrumb or back-link text

---

## messages/fr.json target keys

```json
"solutionPrograms": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "cards": {
    "ctaLabel": ""
  },
  "process": {
    "headline": "",
    "steps": []
  },
  "backLink": ""
}
```

---

## Metadata to translate

In `src/app/services/solution-programs/page.tsx`:
- `title`
- `description`
- `keywords` — `"programmes solutions IA Maroc"`, `"consulting transformation numérique"`, etc.

---

## Notes
- `SOLUTION_PROGRAM_DETAILS` constant in `services-content.ts` is the data source for program cards. If already extracted in FR-02, reuse those keys.
- This page is small — a focused half-day sprint.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `ServicesSolutionPrograms.tsx` extracted
- [ ] `messages/fr.json` `"solutionPrograms"` section fully translated
- [ ] `/fr/services/solution-programs` renders correctly in French
- [ ] No TypeScript errors
