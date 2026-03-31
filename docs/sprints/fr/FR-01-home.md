# FR-01 — Home Page (French)

**Route:** `/fr` → `/fr/` (after next-intl setup)
**View file:** `src/views/Home.tsx`
**App page:** `src/app/page.tsx` (metadata) + `src/app/[locale]/page.tsx` (existing locale shell)
**Depends on:** FR-00

---

## Goal

Extract all hardcoded English strings from `Home.tsx` into `messages/en.json` under the `"home"` key, then provide French equivalents in `messages/fr.json`.

---

## String sections to extract

Work through `src/views/Home.tsx` top to bottom. The main string clusters are:

### Hero section
- Hero eyebrow label (e.g. `"Our Identity"`)
- Hero headline (H1) — two-line heading with italic emphasis
- Hero subheading / body paragraph
- Hero secondary label / tagline beneath subheading
- CTA button text

### Pillars / identity cards
- Each pillar: `title`, `body`, list of `details[]`
- Section eyebrow label

### Stats / proof section
- Section eyebrow label
- Section headline
- Each stat item: `label`, `value`, `description`

### Service highlights section (dark background)
- Section headline with italic emphasis
- Three cards: `"Strategic Consulting"`, `"Precision Engineering"`, `"Technical Execution"` — title + body each

### Testimonial / quote block
- Pull quote text
- Attribution name + role

### Technology stack section
- Section label / eyebrow
- Any descriptive text (tech logos are images — skip)

### World map section
- Section headline
- Any descriptor text beneath it

### Insights carousel
- Section eyebrow + headline (these may come from `InsightsCarousel.tsx` — check there too)

### Bottom CTA
- Headline, sub-text, button label (these live in `src/components/BottomCTA.tsx` — covered in FR-16 shared components sprint, do NOT duplicate here)

---

## messages/fr.json target keys

```json
"home": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "headlineEmphasis": "",
    "body": "",
    "tagline": "",
    "ctaPrimary": "",
    "ctaSecondary": ""
  },
  "pillars": {
    "eyebrow": "",
    "items": []
  },
  "stats": {
    "eyebrow": "",
    "headline": ""
  },
  "services": {
    "headline": "",
    "headlineEmphasis": "",
    "cards": []
  },
  "testimonial": {
    "quote": "",
    "name": "",
    "role": ""
  },
  "techStack": {
    "eyebrow": ""
  },
  "worldMap": {
    "headline": "",
    "body": ""
  },
  "insights": {
    "eyebrow": "",
    "headline": ""
  }
}
```

---

## Metadata to translate

In `src/app/page.tsx` (or the locale shell), update:
- `title` — French page title
- `description` — French meta description
- `keywords` — add French keyword variants (e.g. `"automatisation IA Maroc"`, `"transformation numérique Maroc"`)
- `og:title` / `og:description`

---

## Notes
- The hero headline uses `<em>` italic styling — preserve this split in the French string (use two keys: `headline` + `headlineEmphasis`).
- Do NOT translate tech stack icon labels — they are brand names (React, Python, Docker, etc.).
- `LogoLoop` / `LogoItem` are client logo strips — no translatable strings.
- The `VideoScrollSection` component may have a caption — check `src/components/ui/VideoScrollSection.tsx`.

---

## Acceptance criteria
- [ ] All hardcoded EN strings in `Home.tsx` replaced with `t('home.xxx')` calls
- [ ] `messages/en.json` `"home"` section fully populated
- [ ] `messages/fr.json` `"home"` section fully translated (no empty strings)
- [ ] `/fr` renders the French home page without layout breaks
- [ ] No TypeScript errors
