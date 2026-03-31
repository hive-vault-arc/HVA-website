# FR-14 — Insights Hub Page (French)

**Route:** `/fr/insights`
**View file:** `src/views/InsightsHub.tsx`
**App page:** `src/app/insights/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Insights Hub — the landing page that links to all insights sub-collections (Blogs, Case Studies, News, Perspectives, Reports).

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph

### Collection cards / navigation tiles
For each collection tile (there are 5):

| EN label | FR label |
|---|---|
| Blogs | Articles de Blog |
| Case Studies | Études de Cas |
| News & Articles | Actualités & Articles |
| Perspectives | Perspectives |
| Research Reports | Rapports de Recherche |

For each tile:
- Collection `title` — translate (see table above)
- Collection `description` / teaser — translate
- CTA text (e.g. `"Explore"`, `"Browse all"`) — translate

### Featured / recent highlights section (if present)
- Section headline
- `"Latest"` / `"Recent"` label
- Individual item teaser labels

### Stats or credibility strip (if present)
- Stat labels

---

## messages/fr.json target keys

```json
"insightsHub": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "collections": {
    "blogs": { "title": "", "description": "", "cta": "" },
    "caseStudies": { "title": "", "description": "", "cta": "" },
    "newsArticles": { "title": "", "description": "", "cta": "" },
    "perspectives": { "title": "", "description": "", "cta": "" },
    "researchReports": { "title": "", "description": "", "cta": "" }
  },
  "featured": {
    "headline": "",
    "latestLabel": ""
  }
}
```

---

## Metadata to translate

In `src/app/insights/page.tsx`:
- `title`
- `description`
- `keywords` — `"insights technologie Maroc"`, `"études de cas IA"`, `"rapports numériques Maroc"`, etc.

---

## Notes
- `"Perspectives"` is the same word in French — no change needed.
- Collection tile destinations (URLs) are not translated — the routes (`/fr/insights/blogs`, etc.) are determined by Next.js routing.
- If `InsightsCarousel` from the home page is also used here, its strings are shared — define them once under a shared `"insightsCarousel"` key.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `InsightsHub.tsx` extracted
- [ ] All 5 collection tile labels translated
- [ ] `messages/fr.json` `"insightsHub"` section fully translated
- [ ] `/fr/insights` renders correctly
- [ ] All collection links point to correct `/fr/insights/*` routes
- [ ] No TypeScript errors
