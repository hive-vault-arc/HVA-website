# GEO-02 — Original Evidence and Citation Assets

- Priority: P1
- Duration: two weeks
- Primary owners: research lead, delivery leads, content lead, legal/privacy reviewer, design and web engineering
- Depends on: GEO-01 fact registry; AEO-01 answer inventory

## Goal

Replace weak or unsupported claims with auditable evidence, then publish a small set of genuinely useful assets that journalists, buyers, search systems, and assistants can cite. No data or client outcome may be invented to satisfy the sprint.

## Starting point

The codebase already models methodology, limitations, sources, authors, reviewers, and evidence types. Some current articles and marketing pages also contain numerical or market claims that need exact-source verification. This sprint turns the existing editorial model into an enforceable evidence system.

## Task 1 — Build the claim and evidence registry

Create `docs/research/claim-registry.csv` with:

```text
claim_id
exact_claim
page_url
locale
claim_type
evidence_type
source_url
source_title
publisher_or_owner
published_date
accessed_date
method_or_sample
geographic_scope
limitations
reuse_permission
reviewer
review_due
status
```

Use controlled evidence types:

- primary public source;
- peer-reviewed research;
- client-approved measured outcome;
- anonymized internal observation;
- synthetic demonstration;
- expert interpretation;
- unsupported — remove or rewrite.

## Task 2 — Audit claims across every public surface

Search the rendered site and content source for:

- percentages, counts, currencies, and time savings;
- superlatives such as “leading,” “best,” or “first”;
- market adoption or regional prevalence claims;
- security, privacy, and compliance promises;
- client results and testimonials;
- feature and integration availability;
- company facts, awards, memberships, and partner status;
- statistics repeated in metadata, schema, `/ai/company`, or AI-oriented files.

For each claim:

1. Locate the exact source, dataset, contractually approved result, or measurement record.
2. Confirm the source supports the wording, population, geography, and time period.
3. Record limitations and expiry.
4. Link the exact report or evidence page, not a publisher homepage.
5. Remove, qualify, or reframe unsupported language before launch.

Do not present synthetic demos or conceptual interfaces as real client deployments. Do not turn an anonymized observation into a market-wide statistic.

## Task 3 — Create three evidence-led flagship briefs

Select three assets only after confirming that usable data and reviewers exist. Recommended candidates are:

### 1. Multilingual AI response and qualification benchmark

Possible scope: evaluate a controlled set of English, French, Spanish, and Moroccan Arabic customer-service questions against defined accuracy, routing, safety, and escalation criteria.

Required disclosure:

- model and configuration date;
- prompt set and language distribution;
- scoring rubric and human reviewers;
- number of runs;
- known limitations;
- whether the data is synthetic or production-derived.

### 2. Cloud and platform reliability readiness index

Possible scope: an assessment framework covering observability, backups, recovery, deployment safety, secrets, access control, incident readiness, and performance budgets.

Required disclosure:

- scoring dimensions and weights;
- intended organization profile;
- what the score cannot predict;
- reviewer qualifications;
- update cadence.

### 3. Morocco operating guide for AI-enabled customer workflows

Possible scope: a practical decision guide for channels, languages, human escalation, data minimization, vendor selection, deployment, and measurement.

Required disclosure:

- source date;
- legal review boundary and disclaimer;
- primary official sources;
- which recommendations are expert judgment;
- version history.

If source data is unavailable, publish a transparent research synthesis or checklist instead of fabricating a benchmark.

## Task 4 — Use a complete citation-asset template

Each asset must include:

- descriptive title and direct executive answer;
- named author and accountable reviewer;
- publication and substantive-update dates;
- methodology;
- sample, test set, or evidence selection method;
- findings with units and denominators;
- limitations and non-applicable cases;
- downloadable or copyable table where disclosure is safe;
- chart alt text and a corresponding HTML table or textual explanation;
- primary-source references close to the claims;
- a canonical HTML page;
- relevant service and case-study links;
- a correction contact and change log.

PDF may be a secondary download, but the core evidence must remain available in indexable HTML.

## Task 5 — Protect customers and confidential data

- Obtain written approval for identifiable client names, logos, quotes, and outcomes.
- Aggregate or anonymize internal data using a documented method.
- Suppress small samples that risk re-identification.
- Do not expose prompts, logs, messages, or records containing personal data.
- Do not publish access credentials, infrastructure detail that increases security risk, or contractual information.
- Have privacy/legal review sign off before publication.

## Task 6 — Make assets useful outside the site

Provide citation-friendly elements without manipulating sources:

- one-sentence finding summaries;
- stable section anchors;
- clear tables with units and time periods;
- downloadable CSV only when rights and privacy allow;
- embeddable charts with a visible source link and accessible equivalent;
- concise methodology excerpt;
- approved expert quote;
- Open Graph image and descriptive metadata.

Avoid vague infographics that cannot be audited or charts that omit denominators.

## Task 7 — Localize evidence responsibly

Translate assets only when a native reviewer can preserve technical meaning. Keep the underlying methodology and data consistent across locales, while adapting:

- question wording;
- local context and examples;
- units or currency presentation;
- search terms;
- legal and cultural notes.

Do not imply that a global or synthetic sample represents Morocco unless the methodology supports that conclusion.

## Task 8 — Enforce evidence in publishing

Add editorial validation so a numerical, comparative, or client-outcome claim cannot reach `published` without:

- `claim_id` or an approved evidence record;
- source and evidence type;
- reviewer;
- review date;
- limitations when required.

Add a quarterly stale-claim report and a blocking check for expired or missing sources on high-risk pages.

## Verification

1. Crawl every public text and machine-readable surface for claims.
2. Sample at least 20 high-risk claims and trace each to its exact evidence.
3. Confirm all charts match their source tables and calculations.
4. Recompute benchmark metrics from the retained data.
5. Validate methodology and limitation visibility in raw HTML.
6. Run privacy, legal, accessibility, and localization review.
7. Test citations and downloads for stable production URLs.

## Acceptance criteria

- [ ] The claim registry covers all public numerical, comparative, superlative, client, and compliance claims.
- [ ] Every high-risk claim is supported, qualified, or removed.
- [ ] Synthetic, anonymized, client-approved, and public-source evidence are visibly distinguished.
- [ ] At least one flagship asset is published; the remaining two have approved data plans and owners.
- [ ] Every published asset includes methodology, limitations, reviewer, dates, sources, and accessible evidence.
- [ ] No private, personal, confidential, or fabricated data is published.
- [ ] Editorial validation prevents unreviewed high-risk claims from being published.

## KPIs after release

- verified-claim coverage;
- high-risk unsupported claim count;
- evidence assets published and updated on time;
- referring domains and qualified mentions to evidence assets;
- citations in controlled GEO/AEO observations;
- evidence-page assisted conversions;
- corrections requested and time to resolution.

## Evidence

- [Google guidance for useful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google guidance for AI features and the website](https://developers.google.com/search/docs/appearance/ai-features)
- [Generative Engine Optimization research](https://arxiv.org/abs/2311.09735)
- [Critical survey of generative engine optimization](https://arxiv.org/abs/2607.14035)
- [Citation selection and factual absorption study](https://arxiv.org/abs/2604.25707)
