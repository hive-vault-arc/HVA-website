# HVA Website — Sprint Backlog

> 2026-05-24 note: this is the older general SEO/content backlog. For current SEO + AI discovery work, use `sprints/seo-ai-discovery/README.md`. Public-facing copy should now use `Hive Vault Arc`; `H.V.A` and `HVA` are aliases/search variants unless a historical sprint explicitly says otherwise.

> All remaining work on the hiva-website, organized as sprint files for AI coding agent execution.
> Last updated: 2026-04-28

---

## Execution Order

Run sprints in this order. Each sprint's exit criteria must pass before the next begins.

| Sprint | File | Priority | Description | Time Est. |
|--------|------|----------|-------------|-----------|
| 01 | `sprint-01-critical-seo-foundations.md` | 🔴 CRITICAL | Fix NEXT_PUBLIC_SITE_URL fallback + install analytics | 1–2h |
| 02 | `sprint-02-organization-schema.md` | 🔴 HIGH | Enrich Organization/WebSite JSON-LD + add BreadcrumbList | 1–2h |
| 03 | `sprint-03-semantic-html-blog.md` | 🔴 HIGH | Semantic HTML for blog/article pages (article, time, author) | 2–3h |
| 04 | `sprint-04-image-performance.md` | 🔴 HIGH | Replace raw img tags, compress 8MB video, optimize PNGs | 3–4h |
| 05 | `sprint-05-metadata-cleanup.md` | 🟡 MEDIUM | Keywords trim, LinkedIn links, robots.txt cleanup | 1–2h |
| 06 | `sprint-06-seo-landing-pages.md` | 🟡 MEDIUM | Build 4 keyword-targeted landing pages | 4–6h |
| 07 | `sprint-07-locale-content-audit.md` | 🟡 MEDIUM | Audit /fr /ar /es, add hreflang, deindex incomplete locales | 4–8h |
| 08 | `sprint-08-llms-txt-aeo.md` | 🟡 MEDIUM | Update llms.txt, add Q&A block, create llms-full.txt | 2–3h |

---

## Non-Code Tasks

**File:** `outside-configuration.md`

Tasks that require manual action in Vercel, Google, LinkedIn, and other external dashboards.
**Read this file and execute OUT-1 (Vercel env var) before running any sprint.**

---

## How to Use These Sprints With an AI Coding Agent

1. Read `outside-configuration.md` first — execute OUT-1 before any code work
2. Feed the agent one sprint file at a time
3. The agent reads the sprint → executes all tasks → you verify the exit criteria
4. Mark the sprint as done, move to the next
5. After Sprint 06 deploys: execute OUT-11 (request indexing in Google Search Console)

---

## Key Files in the Codebase

| File | Purpose |
|------|---------|
| `src/lib/seo.ts` | SITE_URL constant, buildPageMetadata, absoluteUrl helpers |
| `src/app/layout.tsx` | Root metadata, Organization + WebSite JSON-LD schemas |
| `src/app/sitemap.ts` | XML sitemap — all routes must be listed here |
| `src/app/robots.ts` | robots.txt — AI crawler rules, disallow list |
| `public/llms.txt` | AEO context file for AI search engines |
| `src/components/JsonLd.tsx` | Reusable JSON-LD renderer |
| `src/components/FaqSection.tsx` | FAQ component with built-in FAQ schema |
| `src/views/BlogPost.tsx` | Blog post rendering (Sprint 03 target) |
| `src/components/ArticleDetailPage.tsx` | Article layout component (Sprint 03 target) |
