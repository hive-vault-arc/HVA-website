# FR-09 — Products & Systems Page (French)

**Route:** `/fr/products-systems`
**View file:** `src/views/ProductsSystems.tsx`
**App page:** `src/app/products-systems/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Products & Systems page (208 lines). Product names are brand identifiers — keep them in English.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph

### Product / system cards
For each product entry:
- Product `name` — keep in English (brand name)
- Product `tagline` — translate
- Product `description` — translate
- Feature list `items[]` — translate
- Status badge (e.g. `"Coming Soon"`, `"Available"`, `"Beta"`) — translate
- CTA text per product (e.g. `"Request access"`, `"Learn more"`) — translate

### Systems section (if separate from products)
- Section headline
- Each system entry: same fields as above

### How it integrates section (if present)
- Section headline + body
- Integration step labels

---

## messages/fr.json target keys

```json
"productsSystems": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "statusLabels": {
    "available": "",
    "comingSoon": "",
    "beta": ""
  },
  "cards": {
    "ctaLearnMore": "",
    "ctaRequestAccess": "",
    "featuresHeader": ""
  },
  "items": []
}
```

---

## Metadata to translate

In `src/app/products-systems/page.tsx`:
- `title`
- `description`
- `keywords` — `"produits IA Maroc"`, `"systèmes logiciels H.V.A"`, `"solutions technologiques Maroc"`, etc.

---

## Notes
- Product brand names (if any exist) remain in English regardless of locale.
- Status labels like `"Coming Soon"` → `"Bientôt disponible"` are important for UX.
- If pricing tiers are shown, currency and number formatting should use `Intl.NumberFormat` with the `fr-MA` locale.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `ProductsSystems.tsx` extracted
- [ ] Product names preserved, descriptive copy translated
- [ ] Status badge labels translated
- [ ] `messages/fr.json` `"productsSystems"` section fully translated
- [ ] `/fr/products-systems` renders correctly
- [ ] No TypeScript errors
