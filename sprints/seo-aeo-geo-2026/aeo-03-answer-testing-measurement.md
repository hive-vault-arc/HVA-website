# AEO-03 — Answer Testing and Measurement

- Priority: P2
- Duration: one week to establish; recurring monthly operation
- Primary owners: SEO lead, analytics owner, localization reviewers, subject-matter reviewers
- Depends on: AEO-02 first cohort deployed; GA4 and company Search Console access working

## Goal

Measure whether approved answers are found, selected as sources, represented accurately, and associated with useful visits or leads. Keep the method reproducible and avoid treating stochastic assistant output as a conventional fixed ranking.

## Measurement model

Separate five different outcomes:

1. Index eligibility: the page can be crawled and indexed.
2. Retrieval: the engine appears to use or surface the page.
3. Citation selection: the website is visibly linked or named as a source.
4. Factual absorption: an answer reflects a Hive Vault Arc fact without a visible citation.
5. Business response: the interaction creates a qualified visit or conversion.

These outcomes are related but not interchangeable. A page can be indexed without being cited, cited without driving a click, or reflected in an answer without visible attribution.

## Task 1 — Create a controlled prompt panel

Create `docs/seo/answer-engine-panel.csv` with:

```text
prompt_id
locale
market
intent_cluster
prompt_text
target_page
target_fact
engine
account_state
search_or_browse_state
device
run_date
run_number
site_present
source_selected
citation_position
fact_absorbed
fact_accurate
competitors_present
result_notes
evidence_capture
reviewer
```

Start with 10–15 high-value prompts per relevant locale, balanced across service, local, comparison, risk, proof, and company questions. Use natural prompts; do not stuff brand terms into every query.

## Task 2 — Record a pre-change baseline

Before evaluating an AEO-02 cohort, run its prompt subset and capture:

- engine and product surface;
- date, locale, and geographic context;
- signed-in or signed-out state;
- whether web search or browsing was active;
- exact prompt;
- visible sources and order;
- whether Hive Vault Arc appeared by link, name, or factual description;
- whether the answer was accurate;
- a screenshot or exported evidence reference where policy allows.

Do not mix results gathered under different conditions into one undocumented score.

## Task 3 — Use repeated observations

Assistant answers can vary. For each priority prompt:

1. Run at least three observations across separate dates in the measurement window.
2. Avoid repeatedly regenerating until a preferred answer appears.
3. Record no-result and inconsistent-result observations.
4. Re-run the same panel after material content changes.
5. Keep a stable control cohort of pages that did not change.

Report the count and denominator, for example “cited in 4 of 12 controlled observations,” rather than claiming a permanent rank.

## Task 4 — Define the core metrics

Calculate by engine, locale, intent, and page cohort:

- brand presence rate;
- linked citation rate;
- first-source rate;
- accurate factual-absorption rate;
- misstatement rate;
- share of observed cited sources;
- landing sessions from assistant and AI search referrals;
- engaged-session rate;
- key-event and qualified-lead rate.

Keep citation selection and factual absorption as separate fields. Research indicates that systems may use information without exposing the same source as a visible citation.

## Task 5 — Connect Search Console and GA4 evidence

Once company-only access exists:

- use Search Console page and query reports for the affected cohort;
- use the Search Console generative AI report when available for the property;
- link Search Console to the production GA4 property;
- segment landing pages, locales, sources, mediums, and campaigns;
- recognize OpenAI links tagged with `utm_source=chatgpt.com`;
- maintain a documented channel group for known assistant referrers without overwriting raw source/medium;
- compare 28-day and 90-day windows rather than reacting to daily noise.

Do not infer a search-engine citation solely from a direct visit, and do not infer a business outcome solely from prompt-panel visibility.

## Task 6 — Establish a safe experiment cadence

For each monthly cohort:

1. Select pages with a shared intent and comparable baseline.
2. Record the content, schema, internal-link, and evidence changes.
3. Change one coherent intervention group at a time.
4. Wait at least four weeks unless a severe error requires immediate repair.
5. Compare against the unchanged control cohort.
6. Record confounders such as seasonality, engine releases, site outages, campaigns, or major press.

Use the result to prioritize the next test, not to claim causality that the design cannot support.

## Task 7 — Create a misstatement register

Create `docs/seo/assistant-misstatements.csv` with:

```text
observed_date
engine
locale
prompt_id
incorrect_or_stale_claim
displayed_source
correct_fact
canonical_evidence_url
risk_level
remediation
owner
status
retest_date
```

Remediation may include correcting the canonical page, aligning external profiles, improving evidence, requesting an eligible profile update, or waiting for recrawl. Never create deceptive pages or fake third-party corroboration to influence an answer.

## Task 8 — Publish a monthly decision report

The report must state:

- sample size and exact testing method;
- changes shipped during the period;
- retrieval, citation, absorption, accuracy, traffic, and conversion results separately;
- strongest and weakest prompt clusters;
- known limitations and confounders;
- approved actions for the next cohort.

Archive raw observations so results remain auditable when products or interfaces change.

## Verification

1. Re-run five records from the panel and confirm another reviewer can reproduce the procedure.
2. Check that every percentage has a visible numerator and denominator.
3. Confirm no account-personalized output was silently mixed into anonymous tests.
4. Validate GA4 referrals against landing-page server logs where available.
5. Confirm Search Console and GA4 use the production property and company account.
6. Confirm screenshots or notes contain no private account or customer data.

## Acceptance criteria

- [ ] The controlled prompt panel contains approved multilingual prompts, target facts, pages, and test conditions.
- [ ] A pre-change baseline exists for the first AEO cohort.
- [ ] Citation, absorption, accuracy, referral, and business metrics are reported separately.
- [ ] Repeated observations and denominators are retained.
- [ ] Search Console and GA4 cohorts are defined without modifying raw attribution.
- [ ] The misstatement register exists with owners and retest dates.
- [ ] The first monthly decision report documents method and limitations.
- [ ] No result is described as a guaranteed or permanent assistant ranking.

## KPIs

- presence, linked-citation, and accurate-absorption rates;
- high-risk misstatement count and time to correction;
- assistant referral sessions and engagement;
- organic and assistant-assisted key events;
- qualified leads by landing-page cohort;
- experiment cohorts completed with adequate documentation.

## Evidence

- [Google generative AI performance reporting](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [Google Search Console performance documentation](https://support.google.com/webmasters/answer/7576553)
- [Google Analytics and Search Console linking instructions](https://support.google.com/analytics/answer/10737381?hl=en)
- [OpenAI publisher and developer FAQ](https://help.openai.com/en/articles/12627856)
- [Citation selection and factual absorption study](https://arxiv.org/abs/2604.25707)
