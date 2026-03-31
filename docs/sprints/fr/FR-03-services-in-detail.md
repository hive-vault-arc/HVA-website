# FR-03 — Services In Detail Page (French)

**Route:** `/fr/services/in-detail`
**View file:** `src/views/ServicesInDetail.tsx`
**App page:** `src/app/services/in-detail/page.tsx`
**Data source:** `src/lib/services-content.ts` (shared with FR-02)
**Depends on:** FR-00, FR-02 (service data strings already extracted there)

---

## Goal

Translate the deep-dive service descriptions page. Most string content comes from `services-content.ts` (handled in FR-02). This sprint covers the page shell strings and any additional copy unique to this view.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Page intro paragraph / subheading

### Per-service detail blocks
Each service renders an expanded section. Check `ServicesInDetail.tsx` for:
- Section eyebrow / service category label
- Expanded description body (may differ from the short description in `services-content.ts`)
- Feature list headers
- Outcome list headers
- Any inline CTA text per service block

### Navigation / back link
- "Back to Services" or equivalent link label
- Any section jump links / in-page nav labels

### Bottom section
- Any closing section headline or body text before the CTA
- CTA is shared — handled in FR-16

---

## messages/fr.json target keys

```json
"servicesInDetail": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "sections": {
    "featuresHeader": "",
    "outcomesHeader": "",
    "backLink": ""
  }
}
```

Extended per-service descriptions (if they differ from `servicesData`) go here:
```json
"servicesInDetail": {
  "items": []
}
```

---

## Metadata to translate

In `src/app/services/in-detail/page.tsx`:
- `title`
- `description`
- `keywords` — `"services IA détaillés Maroc"`, `"ingénierie logicielle Maroc"`, etc.

---

## Notes
- Most content is driven by `services-content.ts` — verify with FR-02 that data strings are already covered before duplicating work.
- This page is content-heavy and may have 300+ translatable strings — budget extra time.
- Preserve all `id` anchor attributes on section elements unchanged.

---

## Acceptance criteria
- [ ] All hardcoded EN strings unique to `ServicesInDetail.tsx` extracted
- [ ] Strings shared with `services-content.ts` correctly reused from `"servicesData"` key (no duplication)
- [ ] `messages/fr.json` `"servicesInDetail"` section fully translated
- [ ] `/fr/services/in-detail` renders correctly in French
- [ ] No TypeScript errors
