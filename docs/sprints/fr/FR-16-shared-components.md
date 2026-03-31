# FR-16 — Shared Components (French)

**Components:**
- `src/components/Navbar.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/BottomCTA.tsx`
- `src/components/FaqSection.tsx`
- `src/components/InsightsCarousel.tsx`

**Test file:** `src/components/Navbar.test.tsx` — update if it asserts on visible text
**Depends on:** FR-00
**Note:** Do this sprint BEFORE or IN PARALLEL with FR-01 through FR-15 — these components appear on every page and are needed site-wide.

---

## Goal

Translate all strings in shared components that appear across multiple pages. Getting this right once eliminates repetition across all other page sprints.

---

## String sections to extract

### Navbar (`Navbar.tsx`)

- Site name / logo label (the `"H.V.A"` text — keep as-is, it's a brand name)
- Navigation link labels:
  - Home → `"Accueil"`
  - Services → `"Services"`
  - About / Who We Are → `"Qui sommes-nous"`
  - Industries → `"Industries"`
  - Insights → `"Insights"` (same in French)
  - Products & Systems → `"Produits & Systèmes"`
  - Arc → `"Arc"` (brand name, keep)
  - Contact → `"Contact"` (same in French)
  - Portfolio → `"Portfolio"` (same in French)
- Dropdown / submenu labels (if any)
- Mobile menu open/close aria labels
- `"Get in touch"` / `"Contact us"` CTA button text
- Language switcher label (if present)

### Footer (`SiteFooter.tsx`)

- Footer tagline / descriptor
- Column section headings (e.g. `"Services"`, `"Company"`, `"Legal"`)
- All footer nav link labels
- Copyright notice text (translate surrounding copy, keep year dynamic)
- Legal disclaimers or tagline text
- Social media labels (if text labels exist alongside icons)
- Newsletter signup (if present): label, placeholder, button text

### Bottom CTA (`BottomCTA.tsx`)

- CTA headline
- CTA sub-text / body
- Primary button text
- Secondary button text (if any)

### FAQ Section (`FaqSection.tsx`)

- Section eyebrow
- Section headline
- Check if FAQs are loaded from `src/data/faqs.ts` — if so, the `question` and `answer` fields in that file need French versions
- `"See all FAQs"` link text (if present)

### Insights Carousel (`InsightsCarousel.tsx`)

- Section eyebrow label
- Section headline
- `"Read more"` / `"Explore all"` link text
- Item card: read time label, date format, category label

---

## messages/fr.json target keys

```json
"nav": {
  "home": "",
  "services": "",
  "about": "",
  "industries": "",
  "insights": "",
  "products": "",
  "arc": "",
  "contact": "",
  "portfolio": "",
  "cta": "",
  "mobileMenuOpen": "",
  "mobileMenuClose": ""
},
"footer": {
  "tagline": "",
  "columns": {},
  "copyright": "",
  "newsletter": {
    "label": "",
    "placeholder": "",
    "button": ""
  }
},
"bottomCta": {
  "headline": "",
  "body": "",
  "primary": "",
  "secondary": ""
},
"faq": {
  "eyebrow": "",
  "headline": "",
  "seeAll": ""
},
"insightsCarousel": {
  "eyebrow": "",
  "headline": "",
  "exploreAll": "",
  "readMore": "",
  "minRead": ""
},
"common": {
  "minRead": "",
  "readMore": "",
  "learnMore": "",
  "getStarted": "",
  "backTo": ""
}
```

> The `"common"` key collects strings used in 3+ places so they are defined once.

---

## Notes
- `"Insights"`, `"Arc"`, `"Portfolio"`, `"Contact"` are identical in French — still extract them (avoids hardcoding assumptions about future locales).
- `"H.V.A"` and `"Hive Vault Arc"` are never translated.
- Footer copyright year should use `new Date().getFullYear()` dynamically — do not hardcode.
- `Navbar.test.tsx` likely has `getByText('Services')` assertions — check and update for locale context.
- FAQs in `src/data/faqs.ts` — add a `locale` field or create `faqs.fr.ts` parallel file.

---

## Acceptance criteria
- [ ] All Navbar link labels extracted and translated
- [ ] Footer copy, column headings, and legal text extracted and translated
- [ ] BottomCTA strings extracted and translated
- [ ] FAQ section shell strings extracted (FAQ content handled separately)
- [ ] InsightsCarousel shell strings extracted and translated
- [ ] `"common"` key populated with shared utility strings
- [ ] `messages/fr.json` all shared component keys fully translated
- [ ] Navbar renders correctly in French on all locale pages
- [ ] No TypeScript errors
