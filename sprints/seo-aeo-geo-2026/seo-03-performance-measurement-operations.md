# SEO-03 — Performance, Measurement, and Search Operations

- Priority: P1
- Duration: one week to establish; then recurring operations
- Primary owners: web engineering, analytics owner, SEO owner
- Depends on: SEO-01; GA4 and Clarity consent implementation live

## Goal

Create a reliable operating loop for page experience, search performance, content releases, URL discovery, and lead outcomes without duplicate analytics or misleading vanity metrics.

## Starting point

- GA4 and Microsoft Clarity are already consent-gated.
- GA4 Enhanced Measurement and browser-history page changes are enabled.
- Search Console is not yet available to the company account.
- PageSpeed Insights returned a quota response during planning, so no current performance score is asserted.
- Sample production HTML transferred approximately 57–93 KB compressed, while decoded HTML ranged roughly 247–525 KB across sampled pages.
- The repository has performance-heavy interactive and visual components, so template-level profiling is required.
- IndexNow exists, but its default URL list includes redirects/outdated paths and does not follow the full canonical content inventory.

## Task 1 — Establish field and lab performance baselines

Measure these representative templates on mobile and desktop:

- homepage;
- capabilities index;
- capability detail;
- service/location landing page;
- blog article;
- research report;
- case study;
- contact page;
- Arabic homepage and one Arabic detail page.

Collect two evidence types:

1. **Field data:** Search Console Core Web Vitals and Chrome UX Report when sufficient traffic exists.
2. **Lab data:** PageSpeed Insights/Lighthouse with recorded test date, device profile, throttling, and URL.

Use Google's good thresholds at the 75th percentile:

- LCP at or below 2.5 seconds;
- INP below 200 milliseconds;
- CLS below 0.1.

Lab scores diagnose; they do not replace field data. When a URL lacks field data, report “insufficient field data,” not zero.

## Task 2 — Build a performance budget by template

Use a production build and bundle analyzer to record:

- initial JavaScript per route;
- hydration cost;
- third-party script cost after consent;
- server response time;
- HTML transfer size;
- largest image and video transfers;
- font requests;
- long tasks and main-thread time;
- LCP element and request chain;
- layout-shift sources;
- INP interaction candidates.

Set budgets from the measured baseline, then tighten them. At minimum, fail review when a change:

- increases initial JavaScript on a priority template without justification;
- introduces a new blocking third-party script;
- loads analytics before consent;
- makes a below-threshold Core Web Vital worse;
- adds an unoptimized hero asset;
- hides core content behind a client-only render.

Do not remove meaningful design or accessibility features solely to improve a synthetic score. Optimize the critical path and defer non-critical motion/media.

## Task 3 — Fix priority performance causes

Work from trace evidence, not generic checklists. Likely inspection targets include:

- large hero media and animated assets;
- above-the-fold client components;
- GSAP/Framer Motion hydration cost;
- Spline or other visual embeds;
- font loading and unused font weights;
- non-critical carousels and maps;
- image `sizes`, priority, dimensions, and responsive sources;
- repeated JSON-LD or serialized content in the response;
- locale payload size, especially Arabic;
- third-party analytics after acceptance.

Prefer server components, route-level code splitting, lazy loading below the fold, reserved media dimensions, and reduced-motion support. Verify that optimization does not remove server-rendered copy or crawlable links.

## Task 4 — Confirm analytics integrity

Re-run the strict consent matrix on Production:

| State | GA4 | Clarity | Expected cookies |
|---|---|---|---|
| No decision | Not loaded | Not loaded | No `_ga`, `_clck`, or `_clsk` |
| Reject | Not loaded | Not loaded | No analytics cookies |
| Accept cookies | Load once | Load once | Only expected analytics cookies |
| Revoke | Stop future loading and clear/expire according to policy | Same | Consent state updated |

Check all four locale roots and one client-side route transition. There must be one GA4 configuration and no manual duplicate `page_view` instrumentation while Enhanced Measurement history events are enabled.

## Task 5 — Add only decision-useful events

After base pageview validation, implement:

- `generate_lead` only after a successful contact-form response;
- `book_call_click` for the consultation CTA;
- `case_study_open` for deliberate case-study engagement.

Define each event in a tracking plan:

```text
event_name
trigger
eligible_pages
parameters
consent_requirement
GA4_key_event
owner
validation_method
```

Allowed parameters should be coarse and non-personal, for example locale, page type, CTA placement, or case-study slug. Never send names, emails, phone numbers, free-text messages, CRM IDs, client identifiers, or URL parameters that may contain personal data.

Mark `generate_lead` as a key event only after validation. Decide whether CTA clicks are diagnostic events or key events based on actual sales use.

## Task 6 — Link GA4 and Search Console

After SEO-01 establishes company ownership:

1. Open GA4 Admin with the company account.
2. Go to Product links → Search Console Links.
3. Link the `hivevaultarc.com` domain property to the existing production web stream.
4. Verify the Organic Search Queries and Organic Search Traffic reports.
5. Publish the relevant Search Console report collection if GA4 does not expose it automatically.

Required roles: GA4 Editor and verified Search Console owner. Do not use a personal account to bridge the link.

## Task 7 — Build the search acquisition scorecard

Create one company-owned reporting view with:

- indexed target pages / approved indexable pages;
- indexing exclusions by reason;
- Google-selected canonical mismatches;
- non-brand clicks and impressions;
- CTR by page and stable-position query cohort;
- target-market and locale splits;
- Generative AI Search impressions and pages;
- organic sessions and engaged sessions;
- `generate_lead` and assisted conversions;
- ChatGPT and other identifiable AI referral sessions;
- Core Web Vitals template groups;
- content publication and material-update annotations.

Use weekly views for incident detection and monthly/quarterly views for trend decisions. Preserve raw exports so definition changes do not erase the baseline.

## Task 8 — Repair IndexNow operations

IndexNow supports Bing and participating engines; it does not submit URLs to Google and does not guarantee indexing.

Refactor `scripts/submit-indexnow.mjs` so it:

- accepts only production-host canonical URLs;
- uses the approved sitemap/content inventory rather than a stale hardcoded list;
- excludes redirect sources such as `/products-systems` and the root `/services-digitaux-tanger`;
- submits only URLs that were added, materially updated, redirected, or deleted;
- supports deletion and redirect notifications;
- validates the official key character rules;
- batches safely and handles `200`, `202`, `400`, `403`, `422`, and `429` explicitly;
- logs URL count, response, and timestamp without logging secrets;
- runs from a company-controlled CI/deploy or Sanity webhook flow.

Keep XML sitemaps for the full inventory. Use IndexNow for changes, not repeated full-site submission.

## Task 9 — Create the release SEO smoke test

Add an automated post-deployment job that checks:

- production homepage and representative locale pages return `200`;
- known alternate hosts permanently redirect;
- canonical, OG, schema, sitemap, and robots URLs use the production host;
- approved sitemap URLs do not redirect or return errors;
- `hreflang` sets are reciprocal;
- no unexpected `noindex` appears;
- one H1 exists on HTML pages;
- JSON-LD parses and matches visible facts;
- GA4 and Clarity are absent before consent;
- the contact success event does not include personal data;
- performance budgets do not regress beyond the approved threshold.

Fail the release on canonical-host, robots, sitemap, or consent regressions.

## Task 10 — Establish operating cadence

### Weekly

- review new indexing errors and canonical mismatches;
- inspect non-brand query/page changes;
- confirm recent content appears in sitemap with accurate dates;
- review organic and AI-referred key events;
- inspect production errors and performance regressions.

### Monthly

- compare locale and intent-cluster trends;
- review Core Web Vitals field groups;
- inspect Generative AI Search report;
- validate the top five acquisition pages and top five declining pages;
- reconcile new/updated/deleted CMS URLs with sitemap and IndexNow logs;
- document one prioritized action per finding.

### Quarterly

- audit consent and analytics duplication;
- review event usefulness and remove unused events;
- review internal traffic filters in test state before activation;
- rerun the full crawl and structured-data sample;
- review whether target queries, markets, and page inventory still match the commercial strategy.

## Verification

```powershell
npm run lint
npm run test
npm run build
npm run indexnow:dry-run
```

In GA4 DebugView and Realtime:

1. Accept cookies on a fresh browser profile.
2. Visit a locale page and navigate client-side to a second page.
3. Confirm one page view per view/navigation.
4. Submit the test contact form with non-production test data.
5. Confirm one `generate_lead` after success and no personal parameters.

In Search Console:

1. Confirm the GA4 association.
2. Confirm the current sitemap success state.
3. Open Core Web Vitals and record field groups.
4. Open the Generative AI performance report and record its first baseline.

## Acceptance criteria

- [ ] Field and lab baselines exist for every representative template and locale sample.
- [ ] Performance budgets are documented and enforced in review or CI.
- [ ] Priority Core Web Vitals failures have trace-backed fixes or owned follow-ups.
- [ ] Consent rejection produces no GA4 or Clarity requests/cookies.
- [ ] Consent acceptance loads each analytics product exactly once.
- [ ] Three approved events are documented, tested, and free of personal data.
- [ ] GA4 and Search Console are linked through company accounts.
- [ ] The scorecard separates index coverage, search visibility, traffic quality, and lead outcomes.
- [ ] IndexNow submits only changed canonical URLs and no redirects.
- [ ] The post-deployment SEO smoke test fails on critical regressions.

## Evidence

- [Google Core Web Vitals and thresholds](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Google Search Console performance report](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Connect Search Console to Google Analytics](https://support.google.com/analytics/answer/10737381?hl=en)
- [Google Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [IndexNow protocol documentation](https://www.indexnow.org/documentation)
- [Bing URL submission guidance](https://www.bing.com/webmasters/help/url-submission-62f2860b)
