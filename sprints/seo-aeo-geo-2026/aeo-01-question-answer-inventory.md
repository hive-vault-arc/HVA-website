# AEO-01 — Question and Answer Inventory

- Priority: P1
- Duration: one week
- Primary owners: content lead, sales lead, subject-matter reviewers, localization reviewers
- Depends on: SEO-01 measurement access; SEO-02 intent map may run in parallel

## Goal

Build a verified, multilingual inventory of the questions real buyers ask and assign each question to one useful canonical page. This becomes the editorial source of truth for answer-first content; it is not a mandate to create one page per question.

## Operating definition

For this plan, answer-engine optimization means making accurate answers easy for people, search systems, and assistants to retrieve from normal indexable pages. It does not require a separate “AI version” of every page, a magic answer length, or special AEO schema.

## Scope

### In scope

- English, French, Spanish, and Arabic question discovery.
- Commercial, implementation, risk, comparison, proof, and local-intent questions.
- Answer ownership, evidence requirements, and editorial prioritization.
- A reusable answer brief and review workflow.

### Out of scope

- Mass-generated FAQ pages.
- Invented questions created only to place keywords.
- Publishing unsupported answers.
- Copying People Also Ask text or competitor answers.
- Sending contact-form personal data to research or analytics tools.

## Task 1 — Collect first-party questions safely

Hold a 60-minute structured session with sales, delivery, and leadership. Ask each participant to list questions heard before a buyer:

- requests a consultation;
- approves discovery;
- selects a technology or vendor;
- raises a security, privacy, integration, or governance objection;
- asks about Morocco, Tangier, languages, delivery location, or support;
- requests proof, timing, price, or an implementation boundary.

Review sanitized themes from discovery calls and contact-form categories. Never copy names, email addresses, phone numbers, message bodies, CRM IDs, or confidential client details into the inventory.

Record the exact language buyers use. A French or Arabic question should originate from a native query or be reviewed as natural language; it should not be a mechanical English translation.

## Task 2 — Add observable search demand

Once the company account has Search Console access, export query/page data for 16 months, 90 days, and 28 days. Add questions and modifiers from:

- queries that already produce impressions;
- queries ranking on the wrong page;
- Google autocomplete, related searches, and People Also Ask observed in the target market;
- Bing result questions and Copilot-oriented result patterns;
- Google Business Profile query themes;
- internal site search, if the site search feature is used;
- relevant public community or industry questions;
- real assistant prompts used by prospective buyers.

Treat these sources as samples. Search interfaces change and Search Console does not expose every query.

## Task 3 — Use a stable question taxonomy

Classify each question into one of these families:

1. Definition: What is the service or concept?
2. Fit: Who is it for, and when is it a poor fit?
3. Outcome: What problem can it solve?
4. Process: How does discovery, delivery, testing, and launch work?
5. Integration: Which systems, channels, and data sources can connect?
6. Risk: What are the security, privacy, reliability, and human-oversight constraints?
7. Scope and pricing: What changes effort, cost, and timeline?
8. Comparison: Build vs buy, automation vs agent, or one approach vs another.
9. Proof: What has been demonstrated, measured, or learned?
10. Local and language: Where is delivery available and which languages are supported?

Tag the buyer stage as discovery, evaluation, validation, or decision.

## Task 4 — Create the answer inventory

Create `docs/seo/answer-inventory.csv` with this minimum schema:

```text
answer_id
locale
market
question
question_family
buyer_stage
primary_url
supporting_url
current_answer
answer_gap
evidence_required
evidence_url
subject_matter_owner
locale_reviewer
conversion_action
priority_score
status
last_reviewed
```

Use one stable `answer_id` for conceptually equivalent questions across locales, plus a locale-specific record for the wording and answer. Do not force equivalence where market context changes the answer.

## Task 5 — Assign one primary page per answer

Map each high-priority question to an existing canonical page whenever possible:

- company questions → About or the relevant trust page;
- broad service questions → capability pages;
- location-specific purchase questions → approved Tangier or Morocco service pages;
- implementation lessons → Perspectives;
- evidence and outcomes → case studies or Research Reports;
- policy questions → legal or governance pages;
- conversion questions → Contact, without duplicating the service explanation there.

A question may appear briefly on more than one relevant page, but one page owns the complete answer. Create a new URL only when the question represents a distinct, durable user need and the proposed page has enough original value to stand alone.

## Task 6 — Draft answer briefs

Draft the first 10–15 question families per priority market before expanding the inventory. Each brief must include:

- the natural-language question;
- a direct answer in one to three sentences where that is sufficient;
- important qualifications and non-scope;
- supporting process, example, or evidence;
- the exact source for factual claims;
- last-reviewed date and named role responsible for review;
- related follow-up questions;
- appropriate next action.

The short answer is a summary, not an artificial word-count target. Complex safety, privacy, contractual, or pricing questions must preserve necessary nuance.

## Task 7 — Prioritize by usefulness and evidence

Score each candidate from 0–3 on:

- relevance to an actual Hive Vault Arc service;
- buyer importance;
- observed demand or repeated first-party use;
- current answer gap;
- ability to supply verified evidence;
- strategic market importance.

Publish high-scoring answers only when evidence and an accountable reviewer exist. Lower-confidence questions stay in the backlog until the answer can be made trustworthy.

## Task 8 — Establish the editorial workflow

Use these statuses:

```text
discovered -> mapped -> evidence_ready -> drafted -> reviewed -> localized -> published -> monitored
```

Every material claim needs a source. Every locale needs a reviewer. Pricing, compliance, security, client outcomes, and market statistics need explicit subject-matter approval. Record changes so answers can be corrected consistently across the site.

## Verification

1. Deduplicate questions by intent, not merely exact wording.
2. Confirm every P1 answer has one primary canonical URL.
3. Check that the answer is relevant to the visible page purpose.
4. Confirm every factual assertion has an evidence requirement or source.
5. Verify no personal or confidential data entered the inventory.
6. Run native-language review on the first cohort in all four locales.
7. Compare the inventory with the SEO intent map to find collisions.

## Acceptance criteria

- [ ] `docs/seo/answer-inventory.csv` exists with the required fields.
- [ ] The first 10–15 priority question families are mapped in each relevant locale.
- [ ] Every P1 question has one primary URL, evidence requirement, content owner, and locale reviewer.
- [ ] No proposed page is justified only by a keyword variation.
- [ ] High-risk answers preserve qualifications instead of using an oversimplified snippet.
- [ ] No personal, confidential, or invented evidence appears in the inventory.
- [ ] Sales, delivery, SEO, and localization owners approve the first publishing cohort.

## KPIs after release

- priority questions with a published verified answer;
- answers reviewed before their due date;
- search impressions and clicks for question-shaped queries;
- query clusters landing on the intended page;
- assistant source selections and factual mentions from the AEO-03 panel;
- assisted consultations and qualified organic leads.

## Evidence

- [Google guidance for useful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google guidance for AI features and the website](https://developers.google.com/search/docs/appearance/ai-features)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
