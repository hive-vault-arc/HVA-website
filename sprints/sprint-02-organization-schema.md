# Sprint 02 — Organization Schema & JSON-LD Completeness

> **Priority:** HIGH — Affects how AI search engines (ChatGPT, Claude, Perplexity) understand and cite H.V.A. Also affects Google's Knowledge Panel eligibility.
> **Estimated effort:** 1–2 hours
> **Depends on:** Sprint 01 (SITE_URL must be correct)

---

## What This Sprint Is

The `layout.tsx` root layout contains Organization and WebSite JSON-LD schemas, but both are incomplete in ways that matter for E-E-A-T and AI citation:

- `sameAs: []` — empty array. Google and AI search use `sameAs` to verify identity across the web. LinkedIn, GitHub, Crunchbase, and social profiles must be listed here.
- No `address` field — Google uses this to link the entity to a geographic location (critical for local SEO in Tangier).
- No `email` or `telephone` fields.
- No `geo` coordinates — used for local search and Google Maps entity linking.
- `foundingDate: '2026'` — verify this is correct (H.V.A was founded/launched in 2026).
- WebSite schema is missing `inLanguage` and `description`.

---

## Tasks

### Task 2.1 — Enrich Organization schema in `layout.tsx`

**File:** `src/app/layout.tsx`

Find the `organizationSchema` object and replace it with:

```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Hive Vault Arc',
  alternateName: 'H.V.A',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/Images/favico/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/Images/media/og-default.png`,
  description:
    'AI & digital transformation consulting firm based in Tangier, Morocco. Specializing in custom AI agents, WhatsApp automation, ARC programs, and SaaS platform development for businesses in Morocco, France, and globally.',
  foundingDate: '2026',
  founders: [
    {
      '@type': 'Person',
      name: 'Khalid',
      jobTitle: 'Founder & CEO',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tangier',
    addressRegion: 'Tanger-Tétouan-Al Hoceïma',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.7595,
    longitude: -5.8340,
  },
  areaServed: [
    { '@type': 'Country', name: 'Morocco' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'AdministrativeArea', name: 'North Africa' },
    { '@type': 'AdministrativeArea', name: 'Europe' },
  ],
  serviceType: [
    'AI Consulting',
    'Digital Transformation',
    'WhatsApp AI Agents',
    'Custom Software Development',
    'SaaS Platform Development',
  ],
  email: 'contact@hivevaultarc.com',
  sameAs: [
    'https://www.linkedin.com/company/hive-vault-arc',
    'https://github.com/hive-vault-arc',
    // Add Twitter/X, Instagram, Crunchbase URLs here when accounts exist
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Digital Transformation',
    'WhatsApp Business API',
    'Real Estate Technology',
    'SaaS Development',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'H.V.A Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'ARC Program',
          description: 'Full AI & digital transformation engagement: Audit, Roadmap, Craft',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WhatsApp AI Agent',
          description: 'Intelligent WhatsApp automation for lead qualification, customer support, and sales',
        },
      },
    ],
  },
};
```

> **Important:** Update `sameAs` URLs to actual company profiles once LinkedIn company page and GitHub org are created (see `outside-configuration.md`).

---

### Task 2.2 — Enrich WebSite schema in `layout.tsx`

**File:** `src/app/layout.tsx`

Find the `websiteSchema` object and update it:

```typescript
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Hive Vault Arc',
  description: 'AI & digital transformation consulting for Moroccan and global businesses',
  inLanguage: ['en', 'fr', 'ar', 'es'],
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
```

---

### Task 2.3 — Add BreadcrumbList to inner pages (homepage is exempt)

For every page that is NOT the homepage, add a BreadcrumbList JSON-LD schema. Create a reusable helper in `src/lib/seo.ts`:

```typescript
export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
```

Then use it in each page's `page.tsx`. Example for `/blog/[slug]/page.tsx`:

```typescript
import { buildBreadcrumbSchema } from '../../../lib/seo';

// Inside the page component, add alongside the existing articleSchema:
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: post.title, path: `/blog/${post.slug}` },
]);

// Pass both schemas to JsonLd
<JsonLd data={[articleSchema, breadcrumbSchema]} />
```

Apply `buildBreadcrumbSchema` to these pages (minimum):
- `/blog/[slug]/page.tsx` — Home > Blog > [Post Title]
- `/case-studies/[slug]/page.tsx` — Home > Case Studies > [Study Title]
- `/capabilities/page.tsx` — Home > Capabilities
- `/arc/page.tsx` — Home > ARC Program
- `/industries/page.tsx` — Home > Industries
- `/whoweare/page.tsx` or `/whoarewe/page.tsx` — Home > About
- `/contact/page.tsx` — Home > Contact

> Note: Check whether `JsonLd` component accepts a single object or an array. If single object only, render multiple `<JsonLd>` components.

---

## Acceptance Criteria

- [ ] Organization schema in `layout.tsx` includes: `address`, `geo`, `areaServed`, `email`, `sameAs` (with at least placeholder comment for future URLs), `hasOfferCatalog`
- [ ] WebSite schema includes `inLanguage` and `publisher` reference
- [ ] `buildBreadcrumbSchema` helper exists in `src/lib/seo.ts`
- [ ] At minimum blog post and case study detail pages render BreadcrumbList JSON-LD
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] Paste homepage HTML source into Google's Rich Results Test — Organization schema validates without errors
- [ ] Paste a blog post URL into Rich Results Test — BreadcrumbList validates
- [ ] Running `grep -n "sameAs: \[\]"` in layout.tsx returns no matches
- [ ] Build passes

