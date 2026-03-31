# FR-02 — Services Page (French)

**Route:** `/fr/services`
**View file:** `src/views/Services.tsx`
**App page:** `src/app/services/page.tsx` (metadata) + `src/app/[locale]/services/page.tsx` (existing locale shell)
**Data source:** `src/lib/services-content.ts` — service data objects live here
**Depends on:** FR-00

---

## Goal

Extract all strings from `Services.tsx` and the service data objects in `services-content.ts` into `messages/fr.json` under `"services"`.

---

## String sections to extract

### Hero / page header
- Page eyebrow label
- Page headline (H1)
- Page subheading / descriptor paragraph
- Any CTA link text in the hero

### Service pillars section
- Section eyebrow
- Section headline
- Each pillar card: `title`, `body`, `details[]`

### Solution programs teaser section
- Section eyebrow
- Section headline
- Each program item: `title`, `description`
- "View all programs" link text

### Delivery phases section
- Section eyebrow
- Section headline
- Each phase: `title`, `description`

### Service data (`src/lib/services-content.ts`)
This file contains the structured service content objects. Extract:
- All service `title`, `description`, `tagline` fields
- All `features[]` label/body pairs
- All `outcomes[]` strings
- Anchor IDs (`id`) should NOT be translated — they are used in URLs

---

## messages/fr.json target keys

```json
"services": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "pillars": {
    "eyebrow": "",
    "headline": "",
    "items": []
  },
  "solutionTeaser": {
    "eyebrow": "",
    "headline": "",
    "viewAll": ""
  },
  "delivery": {
    "eyebrow": "",
    "headline": "",
    "phases": []
  }
}
```

Service data strings (from `services-content.ts`) go under a separate top-level key to keep them reusable:
```json
"servicesData": {
  "items": []
}
```

---

## Metadata to translate

In `src/app/services/page.tsx`:
- `title`
- `description`
- `keywords` — add French variants: `"consulting technologique Maroc"`, `"automatisation IA"`, `"logiciel sur mesure Maroc"`

---

## Notes
- Anchor IDs like `#solution-programs`, `#ai-agents` are used for scroll navigation — do NOT translate.
- Service icon names (e.g. `Bot`, `Cloud`) are Lucide component names — not translatable.
- `services-content.ts` is also consumed by `ServicesInDetail.tsx` and `ServicesSolutionPrograms.tsx` — extracting strings here benefits FR-03 and FR-04 as well.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `Services.tsx` replaced with `t('services.xxx')`
- [ ] Service data strings from `services-content.ts` extracted and referenced
- [ ] `messages/fr.json` `"services"` and `"servicesData"` sections fully translated
- [ ] `/fr/services` renders correctly in French
- [ ] No broken anchor links (test `#solution-programs` scroll)
- [ ] No TypeScript errors
