# FR-13 — Case Studies (French)

**Routes:** `/fr/case-studies` + `/fr/case-studies/[slug]`
**View files:** `src/views/CaseStudies.tsx`
**App pages:** `src/app/case-studies/page.tsx` + `src/app/case-studies/[slug]/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Case Studies index and individual case study pages. Case study content (client names, project details) follows the same strategy decision as blog posts — see FR-12.

---

## String sections to extract

### Index page (`CaseStudies.tsx`)

**Page header:**
- Eyebrow label
- Headline (H1)
- Intro paragraph

**Case study card UI:**
- Industry/category label
- Results / outcome label (e.g. `"Results"`, `"Outcome"`)
- `"View case study"` CTA text
- Client label (e.g. `"Client:"`)
- Timeline label (e.g. `"Timeline:"`)
- Services label (e.g. `"Services:"`)

**Filter UI (if present):**
- All filter label
- Industry filter labels
- No results state

### Individual case study page (`/case-studies/[slug]`)

Check `src/app/case-studies/[slug]/page.tsx` and the view it renders for:
- Back link text
- `"Challenge"` section label
- `"Solution"` section label
- `"Results"` section label
- `"Technologies used"` label
- `"Services delivered"` label
- Metric labels (e.g. `"reduction"`, `"increase"`, `"faster"`)
- Related case studies section label

---

## messages/fr.json target keys

```json
"caseStudies": {
  "index": {
    "eyebrow": "",
    "headline": "",
    "body": "",
    "filters": {
      "all": ""
    },
    "cards": {
      "viewCaseStudy": "",
      "clientLabel": "",
      "timelineLabel": "",
      "servicesLabel": "",
      "resultsLabel": ""
    },
    "noResults": ""
  },
  "post": {
    "backLink": "",
    "challengeLabel": "",
    "solutionLabel": "",
    "resultsLabel": "",
    "techLabel": "",
    "servicesLabel": "",
    "relatedLabel": ""
  }
}
```

---

## Content strategy

Same as FR-12 blog posts. Client names, company names, and project names stay in English. Descriptive copy (challenge, solution, results text) should be translated if French case study content is created.

**Recommended:** Keep case study content in English until a French-language client relationship warrants a French version. The UI shell (labels, navigation) should always be in French regardless.

---

## Metadata to translate

In `src/app/case-studies/page.tsx`:
- `title`, `description`, `keywords`

In `src/app/case-studies/[slug]/page.tsx`:
- Dynamic metadata pulled from case study data — ensure French posts have translated title/description

---

## Notes
- Metric values (numbers, percentages) are never translated — only their surrounding labels.
- Industry names in filters should match the same French terms defined in FR-08 Industries.

---

## Acceptance criteria
- [ ] All UI strings in `CaseStudies.tsx` and slug view extracted
- [ ] `messages/fr.json` `"caseStudies"` section fully translated
- [ ] `/fr/case-studies` renders correctly in French
- [ ] Industry filter labels match FR-08 terminology
- [ ] No TypeScript errors
