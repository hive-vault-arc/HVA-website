# FR-08 — Industries Page (French)

**Route:** `/fr/industries`
**View file:** `src/views/Industries.tsx`
**App page:** `src/app/industries/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Industries page (176 lines — medium size). Industry names should use standard French business terminology.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro / positioning paragraph

### Industry cards / grid
For each industry entry:
- Industry `name` / `title` — translate using standard French terms
- Industry `description` — translate
- `useCases[]` or `capabilities[]` list items — translate

### Industry name reference table

| English | French |
|---|---|
| Financial Services | Services Financiers |
| Healthcare | Santé |
| Retail & E-commerce | Commerce de Détail & E-commerce |
| Manufacturing | Industrie Manufacturière |
| Logistics | Logistique |
| Real Estate | Immobilier |
| Education | Éducation |
| Government / Public Sector | Secteur Public |

Adjust based on what industries are actually in the page.

### CTA section (if unique to this page)
- Headline + body + button text
- If using shared `BottomCTA`, skip — handled in FR-16

---

## messages/fr.json target keys

```json
"industries": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "items": []
}
```

---

## Metadata to translate

In `src/app/industries/page.tsx`:
- `title`
- `description`
- `keywords` — `"IA par industrie Maroc"`, `"solutions sectorielles Maroc"`, `"transformation numérique secteurs"`, etc.

---

## Notes
- Industry names should match the terminology a French-speaking Moroccan business audience would use.
- If industries link to anchor sections or separate pages, verify URLs remain untranslated.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `Industries.tsx` extracted
- [ ] `messages/fr.json` `"industries"` section fully translated
- [ ] Industry names use standard French business terminology
- [ ] `/fr/industries` renders correctly
- [ ] No TypeScript errors
