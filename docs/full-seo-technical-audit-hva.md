# Full SEO & Technical Audit — Hive Vault Arc (hiva-nine.vercel.app)

---

## 🔎 EXECUTIVE SUMMARY

The website is well-built technically (Next.js ISR, fast CDN, valid structured data, correct robots.txt, sitemap), but it has **one catastrophic SEO blocker** and several significant issues that explain why it doesn't appear on Google. The site is essentially invisible because it lives on a **Vercel subdomain with zero domain authority**, has **no backlinks or off-page presence**, no analytics to feed Google signals, and a LinkedIn social link that points to linkedin.com homepage instead of the company profile. Below is the full breakdown.

---

## 🚨 CRITICAL ISSUES (Fix this later after buying the domain so for now we will focus on others)

### 1. The Domain is `hiva-nine.vercel.app` — Not a Custom Domain
This is **the single biggest reason the site doesn't rank**. The domain `hiva-nine.vercel.app` is:
- A Vercel-generated subdomain with no standalone authority in Google's eyes
- Not a real business identity from Google's perspective
- Canonicalized to itself, meaning all "authority" stays on this throwaway subdomain
- Completely lacking in backlinks, brand mentions, or any off-page signals

**Fix:** Purchase a custom domain immediately (e.g., `hivevaultarc.com`, `hva.ma`, or similar). Connect it in Vercel → Settings → Domains. Update all canonical URLs, sitemap, robots.txt, structured data `@id` and `url` fields, and OG tags to the new domain. Then resubmit to Google Search Console under the new domain.

---

### 2. No Google Analytics or Google Tag Manager
There is **zero tracking installed** on the site. No GA4, no GTM. This means:
- You have no behavioral data to feed Google's algorithms
- You cannot verify what traffic you do or don't receive
- You cannot use GA4 as a Search Console data source

**Fix:** Install Google Analytics 4 (GA4) via Google Tag Manager. Add the GTM container script to all pages.

---

### 3. Google Search Console is Verified But Likely Not Configured Properly
The `google-site-verification` meta tag is present (`10960c2117d3f45e`), meaning GSC is verified. However, if the sitemap hasn't been submitted manually, or if the domain property (not URL prefix property) isn't set up, Google may not be crawling it aggressively. Also, since you're about to migrate to a custom domain, you'll need to re-verify under the new domain.

**Fix:** In Google Search Console: (1) Submit the sitemap at `/sitemap.xml` manually, (2) use the URL Inspection tool on your homepage and click "Request Indexing", (3) check Coverage reports for any indexing errors.

---

## ⚠️ HIGH-PRIORITY SEO ISSUES

### 4. `sameAs` Array in Organization Schema is Empty
```json
"sameAs": []
```
The Organization structured data schema has an empty `sameAs` field. This array should contain links to your verified social profiles (LinkedIn company page, Twitter/X, Facebook, etc.). An empty array signals to Google that the business has no verifiable online presence, which severely hurts E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

**Fix:** Populate `sameAs` with the actual URLs of your social/directory profiles, e.g.: `["https://www.linkedin.com/company/hive-vault-arc", "https://www.google.com/maps/..."]`

---

### 5. LinkedIn Social Link Points to Homepage, Not Your Company Profile
On the About page, the LinkedIn button links to `https://www.linkedin.com/` — the LinkedIn homepage. This means:
- Users who click it land on LinkedIn's generic homepage
- Google sees a link to linkedin.com with no anchor context (the text is empty)
- There's no verifiable company LinkedIn presence being established

**Fix:** Create or link your actual LinkedIn company page (e.g., `https://www.linkedin.com/company/hive-vault-arc`) everywhere it's referenced.

---

### 6. Organization Schema Missing Physical Address and Email
The Organization schema has telephone numbers but is missing:
- `address` (PostalAddress schema) — critical for local SEO and Google Business
- `email` — a basic trust signal
- `geo` — latitude/longitude for local search

For a firm claiming to be based in Tangier, Morocco, this is especially damaging for local search visibility.

**Fix:** Add to the Organization schema:
```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Tangier",
  "addressCountry": "MA"
},
"email": "khalid.chelhi@outlook.fr"
```
Also consider creating a **Google Business Profile** for the company — this is arguably the fastest path to local visibility.

---

### 7. Very Low Page Word Count on Key Pages
Pages like the homepage (~740 words) and About (~508 words) have thin content relative to what Google expects for competitive B2B consulting queries. Services page is ~883 words. These are well below the 1,500–2,500 word benchmark for ranking in competitive niches.

**Fix:** Expand homepage, About, and Services with more substantive copy — case study excerpts, methodology explanations, process detail, and location-specific content (e.g., "technology consulting in Tangier", "digital transformation in Morocco").

---

### 8. Blog Articles Missing `<article>` HTML Tag and `<time>` Element
All blog posts lack the semantic `<article>` tag and `<time datetime="">` element in the HTML. While Article structured data (JSON-LD) is present, the HTML semantic tags are also important signals for Googlebot to understand the content type and publication date.

**Fix:** Wrap blog post content in `<article>` tags in your Next.js layout. Add `<time dateTime="2025-03-10">March 10, 2025</time>` for publication dates.

---

### 9. Blog Posts Missing Author `<meta name="author">` Tag
No `author` meta tag is present on blog posts. The Article schema does have an author field (`H.V.A Research Team`), but pairing it with a real, named person and a proper author bio page significantly improves E-E-A-T signals.

**Fix:** Add `<meta name="author" content="H.V.A Research Team">` to blog pages. Ideally, attribute posts to a named founder with a bio page (improves E-E-A-T substantially).

---

### 10. No Breadcrumb Navigation or Schema
No breadcrumb trail appears on inner pages (blog posts, case studies, services). Breadcrumbs improve UX, internal linking depth, and generate **sitelinks** in Google search results.

**Fix:** Add visual breadcrumbs (e.g., Home > Blog > Article Title) and add `BreadcrumbList` structured data to all inner pages.

---

## 🟡 MODERATE ISSUES

### 11. `keywords` Meta Tag is 2,680 Characters Long
The keywords meta tag contains a massive keyword list (~60+ keywords). Google has ignored this tag since 2009, and an extremely long one can be seen as a spam signal by other search engines (Bing still processes it). It won't help and could marginally hurt.

**Fix:** Either remove the meta keywords tag entirely, or trim it to 5–10 genuinely relevant terms.

---

### 12. OG Title Doesn't Include Brand Name
The Open Graph title is `"Technology Consulting and Digital Transformation Firm"` (no "H.V.A" or "Hive Vault Arc"). When shared on social media, the brand name won't appear in the preview card title.

**Fix:** Update `og:title` to match the full page title, e.g. `"H.V.A | Technology Consulting and Digital Transformation Firm"`.

---

### 13. `foundingDate` Set to 2026 — Current Year
The Organization schema has `"foundingDate": 2026`. If the firm was founded in 2025 or earlier, this is inaccurate. If it was genuinely founded in 2026, this is unusual — a founding date in the current year can make a business look brand-new and untested to Google's quality algorithms.

**Fix:** Confirm the correct founding year and update accordingly.

---

### 14. Robots.txt Has Minor Syntax Issue
The robots.txt is functional but uses multiple `User-agent` blocks without disallow directives, which is acceptable but verbose. More importantly, the file contains `Host:` directive (`Host: https://hiva-nine.vercel.app`) — the `Host` directive is a Yandex-specific directive and is not standard for Google. It should be removed once you move to a custom domain, and the file should be kept clean.

**Fix:** Clean up the robots.txt after the domain migration, removing the `Host:` directive and simplifying to a minimal valid file.

---

### 15. Sitemap Contains `fr`, `ar`, and `es` Language Variants
The sitemap correctly includes multilingual hreflang alternates (en, fr, ar, es) and references `/fr`, `/ar`, `/es` URL variants. However, visiting those pages was not audited here — if the content at those URLs is not actually translated (or doesn't exist), Google may flag them as duplicate or thin content pages and penalize the whole site.

**Fix:** Verify that `/fr/`, `/ar/`, `/es/` pages actually contain fully translated content. If they don't, remove them from the sitemap and hreflang tags until they're ready.

---

### 16. The Homepage Hero Uses a JavaScript Carousel for the H1
The H1 rotates through different slides ("Strategic Guidance. Accountable Execution.", "AI-Powered Transformation for Operations That Matter.", etc.), but only one H1 exists in the DOM at a time. Google sees whatever is in the initial server-rendered HTML. The carousel content that isn't in the first slide may not be indexed.

**Fix:** This is acceptable as-is since the site uses ISR and the initial H1 is rendered server-side. However, consider whether the key keyword-rich H1 is in the first slide position.

---

## ✅ WHAT'S WORKING WELL

These are areas where the site is already properly set up:

- **Structured Data is extensive and correct** — Organization, WebSite, Service, FAQPage, and Article schemas are present and parseable across all pages
- **Meta robots is `index, follow`** on all pages — no accidental noindex
- **Canonical tags are present** on every page and point to the correct URL
- **Meta descriptions are well-written** — descriptive, within length limits, and include relevant keywords on every page
- **Title tags are well-structured** — clear hierarchy with page name, descriptor, and brand
- **Hreflang is implemented** in both `<head>` and sitemap — multilingual signals are correct
- **All images have alt text** — zero images missing alt attributes
- **robots.txt is valid** and allows all major crawlers including GPTBot, Bingbot, ClaudeBot, Google-Extended, etc.
- **Sitemap is valid XML** — all 23 URLs are listed with correct priority and changefreq
- **Site is served over HTTPS** — SSL is active
- **CDN cache is working** — Vercel edge cache is serving pages with fast TTFB (x-vercel-cache: HIT)
- **ISR (Incremental Static Regeneration)** — pages are pre-rendered server-side, meaning Googlebot can crawl real HTML content, not blank JS shells
- **Page speed indicators are good** — DOM complete in ~266ms, compressed with Brotli encoding
- **Security headers are solid** — CSP, X-Frame-Options, Permissions-Policy all set
- **No broken internal links** detected across main nav pages

---

## 📋 PRIORITIZED ACTION PLAN

| Priority | Action | Effort | Impact |
|---|---|---|---|
| 🔴 1 | **Get a custom domain and connect it** | Low | Extreme |
| 🔴 2 | **Submit sitemap in GSC & request indexing** | Low | High |
| 🔴 3 | **Install GA4 via GTM** | Low | High |
| 🔴 4 | **Fix the LinkedIn link to actual company page** | Low | Medium |
| 🔴 5 | **Create Google Business Profile** | Low | High (local) |
| 🟠 6 | **Populate `sameAs` in Organization schema** | Low | High |
| 🟠 7 | **Add physical address + email to Organization schema** | Low | Medium |
| 🟠 8 | **Add `<article>` and `<time>` to blog posts** | Medium | Medium |
| 🟠 9 | **Expand homepage & About word count** | Medium | Medium |
| 🟠 10 | **Add breadcrumb navigation + BreadcrumbList schema** | Medium | Medium |
| 🟡 11 | **Fix OG title to include brand name** | Low | Low-Medium |
| 🟡 12 | **Remove or trim meta keywords tag** | Low | Low |
| 🟡 13 | **Verify foundingDate accuracy** | Low | Low |
| 🟡 14 | **Verify translated pages at /fr, /ar, /es** | Medium | Medium |
| 🟡 15 | **Add author attribution with real named authors** | Medium | Medium |

---

The root cause of zero Google visibility is almost certainly the **`hiva-nine.vercel.app` subdomain combined with no backlinks and no Google Business Profile**. Fix the domain first — everything else is optimizing a car that isn't on the road yet. After that, submit to GSC, build even 5–10 quality backlinks (directories, partner sites, press mentions), and you'll start seeing results within 4–8 weeks.
