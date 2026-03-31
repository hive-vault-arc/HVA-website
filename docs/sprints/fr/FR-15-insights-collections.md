# FR-15 — Insights Sub-collections (French)

**Routes (5 pages, 1 shared view):**
- `/fr/insights/blogs`
- `/fr/insights/case-studies`
- `/fr/insights/news-articles`
- `/fr/insights/perspectives`
- `/fr/insights/research-reports`

**View file:** `src/views/InsightsCollection.tsx` — all 5 sub-pages share this single view (105 lines)
**App pages:** `src/app/insights/blogs/page.tsx`, `src/app/insights/case-studies/page.tsx`, `src/app/insights/news-articles/page.tsx`, `src/app/insights/perspectives/page.tsx`, `src/app/insights/research-reports/page.tsx`
**Depends on:** FR-00, FR-14

---

## Goal

Since all 5 sub-collections share `InsightsCollection.tsx`, this is a single view translation sprint that unlocks 5 pages simultaneously. The view receives collection-specific data (title, items) as props — translate the shell strings and the prop values per collection.

---

## String sections to extract

### Shared view shell (`InsightsCollection.tsx`)

- Back link text (e.g. `"← Back to Insights"`)
- Items count label (e.g. `"X articles"`, `"X reports"`)
- Date label / format
- Read time label
- Empty state text (e.g. `"No content yet — check back soon"`)
- CTA per card (e.g. `"Read"`, `"Download"`, `"View"`)
- Filter or sort labels (if present)

### Per-collection page titles and descriptions

Each of the 5 app pages passes a title/description to the view. These need French versions:

| Page | EN title | FR title |
|---|---|---|
| blogs | Blogs | Articles de Blog |
| case-studies | Case Studies | Études de Cas |
| news-articles | News & Articles | Actualités & Articles |
| perspectives | Perspectives | Perspectives |
| research-reports | Research Reports | Rapports de Recherche |

Each page also has:
- A page eyebrow / category label
- A page intro paragraph
- Unique `keywords` for metadata

---

## messages/fr.json target keys

```json
"insightsCollection": {
  "backLink": "",
  "itemsCount": "",
  "readLabel": "",
  "downloadLabel": "",
  "viewLabel": "",
  "minRead": "",
  "emptyState": "",
  "pages": {
    "blogs": {
      "eyebrow": "",
      "headline": "",
      "body": ""
    },
    "caseStudies": {
      "eyebrow": "",
      "headline": "",
      "body": ""
    },
    "newsArticles": {
      "eyebrow": "",
      "headline": "",
      "body": ""
    },
    "perspectives": {
      "eyebrow": "",
      "headline": "",
      "body": ""
    },
    "researchReports": {
      "eyebrow": "",
      "headline": "",
      "body": ""
    }
  }
}
```

---

## Metadata to translate

For each of the 5 app pages, translate:
- `title`
- `description`
- `keywords`

| Page | FR keywords examples |
|---|---|
| blogs | `"blog technologie Maroc"`, `"articles IA"` |
| case-studies | `"études de cas IA Maroc"`, `"projets réalisés"` |
| news-articles | `"actualités H.V.A"`, `"nouvelles technologie Maroc"` |
| perspectives | `"points de vue IA"`, `"réflexions numériques"` |
| research-reports | `"rapports de recherche IA"`, `"études marché numérique Maroc"` |

---

## Notes
- Because all 5 pages share one view component, `InsightsCollection.tsx` changes benefit all 5 pages simultaneously — highest leverage sprint.
- Content items (article titles, report abstracts) follow the same strategy as FR-12 (blog posts) — UI shell always in French, content translation is a separate editorial decision.
- `minRead` string is shared with FR-11 and FR-12 — consider moving it to a top-level `"common"` key to avoid duplication.

---

## Acceptance criteria
- [ ] All shell strings in `InsightsCollection.tsx` extracted
- [ ] Per-collection page header strings added for all 5 collections
- [ ] `messages/fr.json` `"insightsCollection"` section fully translated
- [ ] All 5 `/fr/insights/*` routes render correctly in French
- [ ] Metadata translated for all 5 pages
- [ ] No TypeScript errors
