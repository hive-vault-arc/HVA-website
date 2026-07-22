# Iconsax full-site migration checklist

Last updated: July 21, 2026

Implementation note: `iconsax@0.1.1` dynamically constructs category URLs in a way
that Turbopack rewrites incorrectly. The HVA wrapper therefore bundles the selected
official free linear SVGs in `iconsaxCatalog.generated.ts`, preserving deterministic
SSR and removing client-side icon fetches.

## Definition of done

- Every functional interface icon uses the official `iconsax` package.
- Icon names and variants exist in the installed free manifest.
- Icons inherit the website palette through `currentColor`.
- Decorative icons are hidden from assistive technology.
- Icon-only controls retain an accessible name.
- Existing motion is preserved with motion applied to an HTML wrapper.
- Reduced-motion preferences are respected.
- Technology, client, and unsupported social brand marks remain brand assets rather than being replaced by misleading generic glyphs.
- No `lucide-react` or `dicons` imports remain.
- `react-icons` remains only where an exact brand mark has no free Iconsax equivalent.
- Lint, tests, TypeScript, production build, and browser checks pass.

## Foundation

- [x] Inventory all App Router pages.
- [x] Inventory legacy icon packages and inline SVG candidates.
- [x] Install `iconsax@0.1.1`.
- [x] Bundle the selected official free Iconsax SVG data for deterministic SSR.
- [x] Avoid the package's Turbopack-incompatible dynamic category loader.
- [x] Add the typed HVA Iconsax wrapper and semantic icon map.
- [x] Add shared icon sizing and reduced-motion styles.

## Shared and global components

- [x] Root layout and site layout
- [x] Navbar
- [x] Site footer
- [x] Bottom CTA
- [x] FAQ section
- [x] Not-found and error states
- [x] Hero slider
- [x] Insights slider and carousel
- [x] Article detail page
- [x] Insight index page
- [x] Home decision guide
- [x] Client evidence card and rail
- [x] Timeline and feature-card demos used by pages
- [x] Social links

## Routes

### Home and localized home

- [x] `/`
- [x] `/[locale]`

### Capabilities

- [x] `/capabilities`
- [x] `/[locale]/capabilities`
- [x] `/capabilities/in-detail`
- [x] `/capabilities/solution-programs`
- [x] `/capabilities/[slug]`

### ARC, industries, and company

- [x] `/arc`
- [x] `/industries`
- [x] `/aboutus`
- [x] `/aboutus/our-people/[employee]`
- [x] `/whoarewe/portfolio`

### Case studies and insights

- [x] `/case-studies`
- [x] `/case-studies/[slug]`
- [x] `/insights`
- [x] `/insights/news-articles`
- [x] `/insights/news-articles/[slug]`
- [x] `/insights/perspectives`
- [x] `/insights/perspectives/[slug]`
- [x] `/insights/research-reports`
- [x] `/insights/research-reports/[slug]`
- [x] `/blog`
- [x] `/blog/[slug]`

### Contact, landing, and utility pages

- [x] `/contact`
- [x] `/links`
- [x] `/ai-agents-morocco`
- [x] `/ai-agents-tangier`
- [x] `/custom-software-morocco`
- [x] `/digital-services-tangier`
- [x] `/it-consulting-tangier`
- [x] `/services-digitaux-tanger`
- [x] `/privacy-policy`
- [x] `/mentions-legales`

## Final audits

- [x] Audit inline SVGs and retain only non-icon data/decorative graphics.
- [x] Confirm no `lucide-react` imports remain.
- [x] Confirm no `dicons` imports remain.
- [x] Confirm remaining `react-icons` imports are documented brand-mark exceptions.
- [x] Confirm every Iconsax `name` exists in `dist/manifest.json`.
- [x] Run ESLint.
- [x] Run Vitest.
- [x] Run TypeScript with no emit.
- [x] Run the production build.
- [x] Check representative desktop and mobile routes in a browser.
- [x] Check the browser console for missing-icon warnings.
