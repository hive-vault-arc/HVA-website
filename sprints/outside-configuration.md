# Outside Configuration — Non-Code Tasks

> These are tasks that cannot be done by an AI coding agent. They require human action in external dashboards, command lines, or third-party services.
> **Execute these yourself** — no code changes required.

---

## CRITICAL — Do These First (Before Any Code Deployment)

### OUT-1 — Set `NEXT_PUBLIC_SITE_URL` in Vercel

**Where:** Vercel Dashboard → Project Settings → Environment Variables

**Action:**
1. Go to https://vercel.com/dashboard
2. Select the `hiva-website` project
3. Go to **Settings → Environment Variables**
4. Add (or update) the variable:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://hivevaultarc.com`
   - **Environment:** Production (check Production, uncheck Preview and Development)
5. Click Save
6. **Redeploy** the project (go to Deployments → click the three dots on the latest deployment → Redeploy)

**Why this is critical:** Every canonical URL, sitemap entry, Open Graph URL, and JSON-LD `@id` in the website uses this value. Without it, everything points to `hiva-nine.vercel.app` instead of `hivevaultarc.com`.

**Verify:** After redeployment, visit `https://hivevaultarc.com/sitemap.xml` — every URL should start with `https://hivevaultarc.com/`.

---

### ~~OUT-2 — Custom Domain DNS Setup~~ ✅ DONE

- hivevaultarc.com → Production ✅
- www.hivevaultarc.com → 308 permanent redirect to hivevaultarc.com ✅
- hiva-nine.vercel.app → 403 by design (Standard Protection — blocks internal URL to public) ✅
- SSL auto-provisioned ✅
- Firewall active, CDN healthy (90.3% cache hit, 0% error rate) ✅
- Speed Insights active ✅
- Security: Build Logs Protection, Source Protection, Git Fork Protection all enabled ✅

> **One thing left:** `NEXT_PUBLIC_SITE_URL` env var (OUT-1) still needs to be set. Framework mismatch warning (Vite vs Next.js in Project Settings) — low priority, auto-resolves on next deploy.

**Verify:** `https://hivevaultarc.com` loads correctly and shows a valid SSL certificate (green padlock).

---

## HIGH PRIORITY — Google Ecosystem Setup

### OUT-3 — Google Search Console

**Where:** https://search.google.com/search-console

**Action:**
1. Add property: `https://hivevaultarc.com` (Domain property if possible)
2. Verify ownership — choose DNS verification (add TXT record to your registrar) or HTML file method
3. Once verified:
   - Go to **Sitemaps** → Submit `https://hivevaultarc.com/sitemap.xml`
   - Go to **URL Inspection** → Enter the homepage URL → Request Indexing
   - Request indexing for the 4 new SEO landing pages once Sprint 06 is deployed

**Monitor:** Check weekly for:
- Coverage errors (pages not being indexed)
- Core Web Vitals issues
- Mobile usability issues
- Any `hreflang` errors (after Sprint 07)

---

### OUT-4 — Google Analytics 4 (GA4)

**Where:** https://analytics.google.com

**Action:**
1. Create a new GA4 property for `hivevaultarc.com`
2. Get the **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Add it to Vercel environment variables:
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX`
4. In the codebase, install and wire up GA4:
   ```bash
   npm install @next/third-parties
   ```
   In `src/app/layout.tsx`:
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google';
   // In <body>:
   <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
   ```
5. Set up key conversion events in GA4:
   - Contact form submission
   - CTA button clicks ("Book a Call", "Contact Us")
   - Page views on landing pages (auto-tracked)

**Verify:** Use GA4 DebugView while browsing the site to confirm events are firing.

---

### OUT-5 — Google Tag Manager (Optional but Recommended)

**Where:** https://tagmanager.google.com

**Action:**
1. Create a GTM account and container for `hivevaultarc.com`
2. Get the GTM container ID (format: `GTM-XXXXXXX`)
3. Install GTM in `layout.tsx` (or use `@next/third-parties`):
   ```tsx
   import { GoogleTagManager } from '@next/third-parties/google';
   // In <head>:
   <GoogleTagManager gtmId="GTM-XXXXXXX" />
   ```
4. Use GTM to manage all tracking tags (GA4, LinkedIn Insight, Facebook Pixel if needed) from one place without code deploys

---

## HIGH PRIORITY — Business Presence

### OUT-6 — Google Business Profile

**Where:** https://business.google.com

**Action:**
1. Create a Business Profile for **Hive Vault Arc**
2. Fill in:
   - Business name: Hive Vault Arc
   - Category: Management Consultant (primary), IT Consulting, Software Company
   - Location: Tangier, Morocco (add address if you have a physical office)
   - Phone: your business number
   - Website: `https://hivevaultarc.com`
   - Description: "AI and digital transformation consulting firm based in Tangier, Morocco. Specializing in custom AI agents, WhatsApp automation, ARC programs, and SaaS development."
   - Add photos: logo, team, office (if applicable)
3. Verify the listing (Google will send a postcard or call/text)
4. Once verified: add services, business hours, and request first reviews from early clients

**Why:** Google Business Profile is a major E-E-A-T signal and enables local search visibility ("AI consulting near Tangier").

---

### OUT-7 — LinkedIn Company Page

**Where:** https://www.linkedin.com/company/setup/new/

**Action:**
1. Create a LinkedIn company page for **Hive Vault Arc**
2. Fill in:
   - Company name: Hive Vault Arc
   - URL: `linkedin.com/company/hive-vault-arc` (try to get this exact URL slug)
   - Industry: Information Technology and Services
   - Company size: 1–10 employees
   - Website: `https://hivevaultarc.com`
   - Tagline: "AI & Digital Transformation Consulting | Morocco"
   - Description: Full company description matching the website About page
   - Logo: upload the H.V.A logo (min 400×400px)
   - Cover image: upload a branded cover
3. Once created, update the `sameAs` array in the Organization schema (Sprint 02, Task 2.1) with the real URL
4. Update all LinkedIn links in the codebase (Sprint 05, Task 5.2) with the real URL
5. Post the first company update: announce the website/company launch

---

### OUT-8 — Update `.env.example` and notify team

**Where:** Code + documentation

**Action:**
1. Confirm Sprint 01 is merged and `.env.example` shows `hivevaultarc.com`
2. If there is a team or `.env.local` template anywhere, update it too
3. Add a note in the repo README (if it exists) about required environment variables

---

## MEDIUM PRIORITY — SEO & AEO Signal Building

### OUT-9 — Submit to AI Directories

AI search engines like Perplexity and ChatGPT pull from the web AND from curated directories. Submit H.V.A to:

- **Crunchbase:** https://www.crunchbase.com/add-new/organization — free basic listing
  - Add to `sameAs` in Organization schema after creating
- **LinkedIn** (OUT-7 above)
- **Clutch.co:** https://clutch.co/list-your-company — B2B services directory, important for AI consulting
  - Request 2–3 client reviews on Clutch once you have them
- **G2.com:** https://sell.g2.com/ — if H.V.A offers any product/SaaS

---

### OUT-10 — Google Search Console: Core Web Vitals Monitoring

**Where:** Google Search Console → Core Web Vitals report

**Action (recurring — monthly):**
1. Check CWV report for failing URLs
2. Fix identified issues in code (usually LCP or CLS on specific pages)
3. After Sprint 04 (image optimization), request re-validation in GSC

---

### OUT-11 — Index the 4 New SEO Landing Pages (after Sprint 06)

**Where:** Google Search Console → URL Inspection

**Action (after Sprint 06 is deployed):**
For each new page, paste the URL into URL Inspection and click **Request Indexing**:
- `https://hivevaultarc.com/ai-agents-tangier`
- `https://hivevaultarc.com/ai-agents-morocco`
- `https://hivevaultarc.com/it-consulting-tangier`
- `https://hivevaultarc.com/custom-software-morocco`

---

### OUT-12 — GITEX Africa Presence (Future)

**Where:** https://gitexafrica.com

**Action (plan for next event):**
- Register for GITEX Africa in Casablanca
- Publish a blog post announcing H.V.A's presence before the event
- Create a `/resources/gitex-africa-2026` landing page for the event
- Collect contacts at the event and follow up via WhatsApp (use the WhatsApp agent)

---

## Tracking Checklist

| Task | Owner | Status | Deadline |
|------|-------|--------|----------|
| OUT-1: Vercel env var (`NEXT_PUBLIC_SITE_URL`) | Khalid | ⬜ | Immediately |
| OUT-2: Custom domain + www redirect | Khalid | ✅ Done | 2026-04-28 |
| OUT-3: Google Search Console | Khalid | ⬜ | Week 1 |
| OUT-4: Google Analytics 4 | Khalid | ⬜ | Week 1 |
| OUT-5: Google Tag Manager | Khalid | ⬜ | Week 2 |
| OUT-6: Google Business Profile | Khalid | ⬜ | Week 1 |
| OUT-7: LinkedIn Company Page | Khalid | ⬜ | Week 1 |
| OUT-8: Update .env.example | Dev | ⬜ | With Sprint 01 |
| OUT-9: AI Directories | Khalid | ⬜ | Week 2–3 |
| OUT-10: CWV Monitoring | Khalid | ⬜ | Monthly |
| OUT-11: Index new pages | Khalid | ⬜ | After Sprint 06 |
| OUT-12: GITEX Africa | Khalid | ⬜ | Future |

