# FR-11 — Blog Index Page (French)

**Route:** `/fr/blog`
**View file:** `src/views/BlogIndex.tsx`
**App page:** `src/app/blog/page.tsx`
**Data source:** `src/lib/blog.ts`
**Depends on:** FR-00

---

## Goal

Translate the Blog index page UI. Blog post content (titles, bodies) is a separate concern — covered in FR-12.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph

### Blog card UI strings
These are UI labels that appear on every card, NOT the post content itself:
- Read time label (e.g. `"min read"` → `"min de lecture"`)
- Date format — use `Intl.DateTimeFormat` with `fr-FR` locale (do not hardcode French month names)
- Tag/category pill labels
- `"Read article"` / `"Continue reading"` CTA text
- Author label (e.g. `"By"` → `"Par"`)

### Filter / search UI (if present)
- Search input placeholder
- Category filter labels
- `"All posts"` / `"All topics"` label
- No results state text

### Pagination (if present)
- `"Previous"` → `"Précédent"`
- `"Next"` → `"Suivant"`
- `"Page X of Y"` pattern

### Featured post block (if different from regular cards)
- `"Featured"` badge label
- Any unique CTA text

---

## messages/fr.json target keys

```json
"blogIndex": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "cards": {
    "readMore": "",
    "minRead": "",
    "by": "",
    "featured": ""
  },
  "filters": {
    "all": "",
    "searchPlaceholder": "",
    "noResults": ""
  },
  "pagination": {
    "previous": "",
    "next": "",
    "pageOf": ""
  }
}
```

---

## Metadata to translate

In `src/app/blog/page.tsx`:
- `title`
- `description`
- `keywords` — `"blog IA Maroc"`, `"articles transformation numérique"`, `"insights technologie Tanger"`, etc.

---

## Notes
- Blog post titles, excerpts, and body content from `src/lib/blog.ts` are NOT translated in this sprint — that is a content decision handled separately.
- Date rendering must use `Intl.DateTimeFormat('fr-FR', ...)` — never hardcode French date strings.
- Tags/categories may be defined in `blog.ts` — if so, a separate tag translation map is needed (add to this sprint if blocked).

---

## Acceptance criteria
- [ ] All UI strings in `BlogIndex.tsx` extracted
- [ ] Date formatting uses `fr-FR` locale via `Intl.DateTimeFormat`
- [ ] `messages/fr.json` `"blogIndex"` section fully translated
- [ ] `/fr/blog` renders the post list in French UI
- [ ] No TypeScript errors
