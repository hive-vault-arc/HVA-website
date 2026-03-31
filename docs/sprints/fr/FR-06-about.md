# FR-06 — About HVA Page (French)

**Route:** `/fr/whoweare/abouthva`
**View file:** `src/views/About.tsx`
**App page:** `src/app/whoweare/abouthva/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate the About page — one of the most brand-sensitive pages on the site. All copy must align with `docs/brand-copy-checklist.md` positioning language.

---

## String sections to extract

### Hero / intro section
- Page eyebrow label
- Page headline (H1) — typically contains a positioning statement
- Intro paragraph
- Proof points strip (e.g. `"Based in Morocco"`, `"Software & Cloud"`, `"Serving Worldwide"`)

### Team section
For each `teamMembers[]` entry:
- `name` — do NOT translate (proper names)
- `role` / `title` — translate
- `bio` — translate

### Principles section
`principles[]` array — each has:
- `title` — translate
- `description` / `body` — translate

### Delivery flow section
`deliveryFlow[]` array — each step has:
- `title` — translate
- `detail` — translate
Current steps: `"Business Discovery"`, `"System Design"`, `"Build & Validate"`, `"Stabilize & Scale"`

### Values / culture section (if separate from principles)
- Section eyebrow + headline
- Any additional descriptive body text

---

## messages/fr.json target keys

```json
"about": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": "",
    "proofPoints": []
  },
  "team": {
    "eyebrow": "",
    "headline": "",
    "roleLabels": {}
  },
  "principles": {
    "eyebrow": "",
    "headline": "",
    "items": []
  },
  "deliveryFlow": {
    "eyebrow": "",
    "headline": "",
    "steps": []
  }
}
```

---

## Metadata to translate

In `src/app/whoweare/abouthva/page.tsx`:
- `title`
- `description`
- `keywords` — `"qui est H.V.A"`, `"équipe technologie Maroc"`, `"entreprise IA Tanger"`, etc.

---

## Notes
- Brand name `"H.V.A"` and `"Hive Vault Arc"` are never translated — they appear as-is in all locales.
- Check `docs/brand-copy-checklist.md` before finalising any positioning statements in French.
- `"Outcome-Driven"`, `"Quality by Default"`, `"Morocco + Worldwide"` are brand principles — translate meaning faithfully, not literally.
- The delivery flow step names have specific technical connotations — preserve those.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `About.tsx` extracted
- [ ] Brand name, team member names, and technical terms preserved in English where appropriate
- [ ] `messages/fr.json` `"about"` section fully translated
- [ ] `/fr/whoweare/abouthva` renders correctly
- [ ] Copy reviewed against `docs/brand-copy-checklist.md`
- [ ] No TypeScript errors
