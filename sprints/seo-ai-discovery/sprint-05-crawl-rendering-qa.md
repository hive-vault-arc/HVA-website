# Sprint 05 - Crawl Rendering QA

Priority: High
Depends on: Sprint 02, Sprint 03 preferred
Primary spec: `../../docs/specs/seo-ai-discovery/00-research-audit.md`

## Goal

Find and eliminate any crawler-visible error shell, stale indexed error text, staging canonical leakage, or bot-specific rendering problem that could make search engines or AI systems see the wrong version of the site.

## Known Issue

A public search snapshot for the homepage showed `Something went wrong`, while direct production HTML did not contain that text. Treat this as unresolved until confirmed through Search Console live inspection and bot-user-agent checks.

## Files To Review

- `src/app/error.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/Layout.tsx`
- `src/components/Navbar.tsx`
- `src/components/ui/HeroSlider.tsx`
- routes that use dynamic/browser-only components
- `next.config.ts`
- `vercel.json`

## Tasks

1. Reproduce crawler HTML.
   - Fetch production homepage with normal curl.
   - Fetch with Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, and social preview user agents.
   - Compare title, canonical, body text, JSON-LD, and error text.

2. Check Search Console live rendering.
   - Use URL Inspection on homepage and priority service pages.
   - Confirm crawled HTML does not include `Something went wrong`.
   - Request reindexing after fixes.

3. Audit error boundaries and client-only components.
   - Confirm `src/app/error.tsx` text cannot leak into static snapshots unless a real error occurs.
   - Verify browser-only code is guarded from SSR errors.
   - Check dynamic imports and animation/media components for SSR-safe usage.

4. Verify staging behavior.
   - `https://hiva-nine.vercel.app/` must not remain an indexable clone.
   - Prefer redirect/protection in Vercel.
   - If code is needed, ensure staging emits `noindex` and production canonical URLs.

5. Verify production canonical consistency.
   - Homepage, service pages, blog, case studies, and locale pages must point to `https://hivevaultarc.com`.
   - No metadata or schema should point to Vercel staging.

## Acceptance Criteria

- No tested bot user agent receives `Something went wrong` in homepage HTML.
- Search Console live test shows a healthy rendered page.
- Staging URL is redirected, protected, or noindexed.
- No canonical/OG/schema/sitemap URL points to staging.
- Browser console has no unexpected runtime errors on key pages.

## Verification

```powershell
$agents = @(
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "facebookexternalhit",
  "LinkedInBot"
)

foreach ($agent in $agents) {
  curl.exe -A $agent -s https://hivevaultarc.com/ | Select-String "Something went wrong|Hive Vault Arc|canonical|application/ld+json"
}

curl.exe -I https://hiva-nine.vercel.app/
rg "Something went wrong|hiva-nine" src public docs sprints
npm run build
```

Manual QA:

- Browser QA on `/`, `/arc`, `/capabilities`, `/whoweare/abouthva`, `/contact`, `/insights`, `/blog`, `/privacy-policy`, and geo pages.
- Search Console URL Inspection after deploy.
