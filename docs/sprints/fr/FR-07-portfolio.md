# FR-07 — Portfolio Page (French)

**Route:** `/fr/whoarewe/portfolio`
**View file:** `src/views/Portfolio.tsx`
**App page:** `src/app/whoarewe/portfolio/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Portfolio page. Project names, client names, and technology names are NOT translated — only descriptive copy and UI labels are.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph

### Portfolio item cards
For each project entry, check what fields are hardcoded in the view vs. pulled from a data file:
- Project `description` / `summary` — translate
- `category` label (e.g. `"Web App"`, `"AI Integration"`) — translate
- `outcome` / results text — translate
- `tags[]` — technology tags (React, Python, etc.) are NOT translated
- CTA link text per card (e.g. `"View project"`)

### Filter / category tabs (if present)
- Tab labels: `"All"`, `"Web"`, `"AI"`, `"Mobile"`, etc.

### Empty state (if filtered to no results)
- `"No projects found"` or equivalent

### Stats strip (if present above or below the grid)
- Stat labels and values

---

## messages/fr.json target keys

```json
"portfolio": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "filters": {
    "all": "",
    "labels": {}
  },
  "cards": {
    "viewProject": "",
    "categoryLabels": {}
  },
  "emptyState": "",
  "stats": []
}
```

---

## Metadata to translate

In `src/app/whoarewe/portfolio/page.tsx`:
- `title`
- `description`
- `keywords` — `"portfolio H.V.A Maroc"`, `"projets IA réalisés"`, `"réalisations logicielles Tanger"`, etc.

---

## Notes
- Client names, project names, and technology stack names (React, Python, AWS, etc.) stay in English.
- Category labels should use French industry standard terms (e.g. `"Application Web"`, `"Intégration IA"`, `"Développement Mobile"`).
- If project entries are in a data file (not hardcoded in the view), note the data file path here for the translator.

---

## Acceptance criteria
- [ ] All hardcoded EN UI strings in `Portfolio.tsx` extracted
- [ ] Project names and tech names preserved in English
- [ ] `messages/fr.json` `"portfolio"` section fully translated
- [ ] `/fr/whoarewe/portfolio` renders correctly
- [ ] No TypeScript errors
