# FR-10 — Arc Page (French)

**Route:** `/fr/arc`
**View file:** `src/views/Arc.tsx`
**App page:** `src/app/arc/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the Arc page (559 lines — the largest single view). Arc appears to be a flagship product/concept page. Treat copy with extra care to preserve the brand positioning.

---

## String sections to extract

This is the largest view in the project. Work through it systematically section by section:

### Hero section
- Eyebrow / category label
- Headline (H1) — may have multi-line structure with emphasis
- Subheading / descriptor paragraph
- CTA button text(s)

### What is Arc section
- Section eyebrow
- Section headline
- Body paragraphs (may be multiple)
- Feature/capability bullets

### How it works / architecture section
- Section headline
- Each step or layer: `title`, `description`
- Any diagram labels (if rendered as text, not images)

### Benefits / outcomes section
- Section headline
- Each benefit: `title`, `body`

### Use cases section
- Section headline
- Each use case: `title`, `description`

### Testimonial or proof block (if present)
- Quote text
- Attribution

### Technical specs (if present)
- Section headline
- Spec labels + values (some may be technical terms that stay in English)

### FAQ section (if present)
- Check if it pulls from `src/data/faqs.ts` or is hardcoded
- Each FAQ: `question`, `answer`

---

## messages/fr.json target keys

```json
"arc": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "headlineEmphasis": "",
    "body": "",
    "ctaPrimary": "",
    "ctaSecondary": ""
  },
  "what": {
    "eyebrow": "",
    "headline": "",
    "body": []
  },
  "howItWorks": {
    "eyebrow": "",
    "headline": "",
    "steps": []
  },
  "benefits": {
    "eyebrow": "",
    "headline": "",
    "items": []
  },
  "useCases": {
    "eyebrow": "",
    "headline": "",
    "items": []
  },
  "faq": {
    "headline": "",
    "items": []
  }
}
```

---

## Metadata to translate

In `src/app/arc/page.tsx`:
- `title`
- `description`
- `keywords` — `"Arc H.V.A"`, `"plateforme IA Maroc"`, `"automatisation intelligente"`, etc.

---

## Notes
- "Arc" is a brand name — never translated.
- Technical architecture terms (API, webhook, pipeline, SDK) remain in English.
- This page may contain the most brand-sensitive copy on the site — review against `docs/brand-copy-checklist.md` carefully.
- If the page uses GSAP or Framer Motion text animations, animated strings also need to be localized.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `Arc.tsx` extracted (all sections)
- [ ] Brand names and technical terms preserved in English
- [ ] `messages/fr.json` `"arc"` section fully translated
- [ ] Copy reviewed against `docs/brand-copy-checklist.md`
- [ ] `/fr/arc` renders correctly without animation breakage
- [ ] No TypeScript errors
