# Hive Vault Arc simpler website

This branch, `site/simple-v1`, develops the simpler Hive Vault Arc website. Its core has five main pages, three client case studies and three policy pages. The [site plan](docs/simple-v1-site-plan.md) defines their content and the consolidation of the larger website.

The current full website remains on `main` until this version is ready. `site/enterprise-maintained` preserves and maintains the full version alongside it. Both development branches have matching `origin` branches; see the [contribution workflow](docs/contributing-workflow.md).

## Pages and navigation

| Main pages | Case-study details | Footer policies |
| --- | --- | --- |
| Home | ImmoWorld CRM and Real Estate Operations | Privacy Policy |
| Services | Premium Advice & Training / KeepZen Digital Academy | Cookie Policy |
| Case Studies | Tarik Rami Immobilier Project and Client Management Platform | Legal Notice |
| About | | |
| Contact | | |

The target menu is **Services · Case Studies · About · Book a Call**, with the logo returning to Home and Book a Call leading to Contact. Services groups the six existing services into Plan / Build / Run. Useful publications and fuller service details may remain additional to the 11-page core.

The first service studio homepage implementation is local. Its current menu uses section anchors, while inner routes retain the inherited full-site design. The target page set and navigation are planned work, not a completed release. The [homepage record](docs/simple-v1-homepage.md) describes what is implemented and tested.

## Development

The application uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, next-intl and Sanity. English, French, Spanish and Arabic are configured as public locales; Arabic uses right-to-left layout. Vitest and Playwright support verification.

Run commands from this checkout:

```powershell
git branch --show-current
npm ci
if (-not (Test-Path -LiteralPath .env.local)) {
  Copy-Item -LiteralPath .env.example -Destination .env.local
}
npm run dev
```

The branch should be `site/simple-v1`. Open `http://localhost:3000`. Keep environment files private and preserve an existing `.env.local` rather than overwriting it. `.env.example` documents the public site URL, Sanity configuration and optional integrations.

`NEXT_PUBLIC_CONTACT_API_URL` enables JSON form delivery to the configured endpoint. Without it, the homepage prepares a `mailto:` draft. A booking integration needs a real configured destination before the site can confirm appointments.

## Checks and working documents

Use [AGENTS.md](AGENTS.md), [DESIGN.md](DESIGN.md), the [documentation index](docs/README.md) and the [active simple-v1 sequence](sprints/simple-v1/README.md). Earlier full-site sprint packs are reference material for this branch.

Run lint, tests, build and relevant locale, asset and browser checks for code changes. For documentation-only changes, check links, factual consistency and `git diff --check`. `npm run build` checks WebP assets before compiling; `npm run start` runs that build locally.

## Release

Development on `site/simple-v1` does not change production. Keep `main` serving the full website until the simpler version passes review and the user requests the release. Maintain shared corrections deliberately in both development versions. Production changes use the company repository and company hosting project.

Consent and analytics details remain in the [Clarity setup notes](docs/clarity-setup-2026-09-03.md). Legal copy, CMS publication and external account settings keep their existing review requirements.

