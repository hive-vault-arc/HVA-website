# Hive Vault Arc website work sequences

The active work on `site/simple-v1` follows the [simpler website sequence](simple-v1/README.md) and [11-page site plan](../docs/simple-v1-site-plan.md). The current full website remains on `main`, with its maintained copy on `site/enterprise-maintained`.

The [full-site visual pack](website-consistency/README.md), [September SEO program](seo-aeo-geo-2026/README.md) and [May discovery pack](seo-ai-discovery/README.md) remain reference material. Their expansion tasks and execution orders are superseded for this branch. Review individual tasks against current code before reusing them.

## Historical general backlog

> The list below preserves the older general SEO/content backlog. Its September successor is the [SEO, AEO and GEO reference program](seo-aeo-geo-2026/README.md). Public-facing copy uses `Hive Vault Arc`; `H.V.A` and `HVA` remain aliases/search variants.

> Earlier full-site work organized as sprint files.
> Last updated: 2026-06-04

---

## Historical execution order

This was the original full-site order. It is not the active simpler-site backlog.

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
| 09 | `sprint-09-digital-services-tangier.md` | 🔴 HIGH | Rank for "Digital Services Tangier" keyword cluster | 3–5h |
| 10 | `sprint-10-positioning-core-update.md` | 🔴 CRITICAL | Update core brand positioning language | 1–2h |
| 11 | `sprint-11-capabilities-six-pillars.md` | 🔴 HIGH | Rebuild capabilities around six service pillars | 3–5h |
| 12 | `sprint-12-industries-eight-verticals.md` | 🔴 HIGH | Update industries page to eight strategic verticals | 4–6h |
| 13 | `sprint-13-homepage-positioning-refresh.md` | 🔴 HIGH | Refresh homepage positioning and service language | 2–3h |
| 14 | `sprint-14-navigation-footer-update.md` | 🟡 MEDIUM | Update navigation and footer labels | 1–2h |
| 15 | `sprint-15-seo-metadata-update.md` | 🔴 HIGH | Update SEO metadata for new positioning | 2–3h |
| 16 | `sprint-16-arc-about-pages.md` | 🟡 MEDIUM | Update ARC and About page language | 2–3h |
| 17 | `sprint-17-about-page-remake.md` | 🔴 HIGH | Full About page remake around H.V.A identity | 4–6h |
| 18 | `sprint-18-perspective-workflow-before-ai.md` | 🔴 HIGH | Publish Perspective 01: Fix the Workflow Before You Add AI | 4–6h |
| 19 | `sprint-19-perspective-consulting-engineering-loop.md` | 🔴 HIGH | Publish Perspective 02: Consulting and Engineering Must Stay in One Loop | 3–5h |

---

## Non-Code Tasks

**File:** `outside-configuration.md`

Tasks that require manual action in Vercel, Google, LinkedIn, and other external dashboards.
These external configuration tasks are historical references, not prerequisites for local simple-v1 work. External changes require the relevant company authorization.

---

## Original full-site procedure

The following procedure is retained as history; it does not authorize its external or deployment steps on this branch.

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
