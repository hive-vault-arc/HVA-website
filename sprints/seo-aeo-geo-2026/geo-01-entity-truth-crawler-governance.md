# GEO-01 — Entity Truth and Crawler Governance

- Priority: P1
- Duration: one week
- Primary owners: company leadership, SEO lead, platform engineering, legal/privacy reviewer
- Depends on: SEO-01 canonical repair

## Goal

Give search and generative systems one consistent, verifiable description of Hive Vault Arc, while making crawler access an explicit company policy. Correctness and provenance matter more than repeating the brand everywhere.

## Operating definition

For this plan, generative-engine optimization means improving the chance that accurate, useful Hive Vault Arc information can be retrieved and cited by AI-assisted search products. It extends technical SEO, entity consistency, original evidence, and earned authority. It is not a guaranteed-placement service.

## Starting point

The website already exposes Organization JSON-LD, multilingual pages, `llms.txt`, `llms-full.txt`, and `/ai/company`. The live audit found that `/ai/company`, canonicals, social URLs, structured data, `robots.txt`, and sitemap output currently inherit the wrong public Vercel alias. The current crawler policy also mixes search/retrieval crawlers and model-training controls into one undifferentiated allow list.

## Task 1 — Create the company fact registry

Create `docs/company/entity-facts.yml` or an equivalent approved data source with:

```text
legal_name
public_brand_name
short_description
long_description
canonical_website
logo_url
founding_date
headquarters
service_areas
public_phone
public_email
business_hours
supported_languages
capabilities
official_profile_urls
verified_memberships
approved_awards
last_reviewed
approved_by
```

For every field, record the source and approval owner. Keep unknown values absent rather than inferred. Separate public contact data from private billing, administrator, or personal-account information.

## Task 2 — Reconcile all first-party surfaces

Compare the fact registry with:

- homepage and About page;
- Contact and legal pages;
- Organization and LocalBusiness structured data;
- Open Graph and social metadata;
- `/ai/company`;
- `llms.txt` and `llms-full.txt`;
- Google Business Profile;
- LinkedIn company page;
- the company GitHub organization;
- approved directory and partner profiles.

Create a discrepancy log with current value, approved value, source, owner, and remediation status. Search results observed during planning included stale company wording and at least one phone variant; confirm the canonical number with company leadership before changing external profiles.

## Task 3 — Repair the machine-readable company endpoint

Update `/ai/company` so it:

- emits only `https://hivevaultarc.com` URLs;
- uses the approved entity-fact source;
- has a documented schema version;
- exposes a truthful `lastUpdated` date tied to substantive changes;
- links to canonical company, services, evidence, legal, and contact resources;
- avoids claims absent from visible first-party pages;
- includes locale relationships only where the translated resource exists;
- sends appropriate JSON content type and caching headers;
- exposes no secrets, personal administrator data, draft content, or customer data.

Add a contract test for required fields, URL host, schema version, and fact parity.

## Task 4 — Stabilize the entity graph

Use the IDs established in AEO-02 and keep them stable across pages. Connect:

- WebSite → publisher Organization;
- WebPage → isPartOf WebSite;
- Article or case study → author, reviewer where public, publisher, and canonical page;
- Service → provider Organization;
- breadcrumb items → canonical page URLs.

Use `sameAs` only for real, publicly accessible, company-controlled or verified profiles. Do not use it for a temporary deployment, a directory search page, an employee's personal account, or an unrelated mention.

## Task 5 — Adopt a crawler-purpose policy

Create `docs/seo/crawler-policy.md` with a company decision for each crawler category.

### Search and user-request retrieval

Review and normally allow, unless a specific legal or security decision says otherwise:

- Googlebot;
- Bingbot;
- OAI-SearchBot;
- ChatGPT-User;
- Claude-SearchBot;
- Claude-User;
- PerplexityBot;
- Perplexity-User.

### Model training and grounding controls

Require an explicit company policy for:

- GPTBot;
- ClaudeBot;
- Google-Extended.

Google documents that Google-Extended does not affect inclusion or ranking in Google Search. Treat it as a Gemini/Vertex generative-AI control, not as the way to allow Googlebot.

Verify currently documented tokens before deployment and remove obsolete or undocumented entries such as the legacy `anthropic-ai` token if no current first-party documentation supports it.

## Task 6 — Implement policy without accidental blocking

- Keep normal search crawlers able to reach public HTML, CSS, JavaScript, images, sitemap, and canonical resources.
- Disallow private, preview, administrative, and internal API paths explicitly.
- Do not rely on `robots.txt` for access control.
- Keep staging and preview deployments non-indexable and access-controlled where practical.
- Confirm CDN, WAF, rate limiting, and bot protection do not return challenges or 403 responses to approved crawlers.
- Keep `llms.txt` optional. Google states that no special AI file is required for its AI search features.

## Task 7 — Verify behavior from logs

For an approved monitoring window, record:

- crawler user agent;
- requested canonical URL;
- status code;
- response type;
- robots decision;
- WAF or CDN action;
- timestamp;
- suspicious volume or spoofing indicators.

User-agent strings can be spoofed. Use provider-published verification methods where available before changing security controls based on a claimed bot identity.

## Task 8 — Establish entity-change governance

Any change to name, address, phone, domain, description, service list, leadership, or official profiles must trigger:

1. Fact-registry update and approval.
2. Website and structured-data update.
3. `/ai/company` and optional AI-file update.
4. Company profile reconciliation.
5. Sitemap or IndexNow notification only for affected URLs.
6. Search and assistant retest.

All external profile changes must use the company-controlled organization account. Do not use personal GitHub, Vercel, Google, or directory identities for company operations.

## Verification

1. Compare every public fact surface to the approved registry.
2. Parse Organization JSON-LD and the `/ai/company` response.
3. Crawl the site and assert no public metadata or schema uses a Vercel alias.
4. Test approved and disallowed bot policies against `robots.txt`.
5. Review CDN/WAF logs for successful crawler fetches and blocks.
6. Verify official profile ownership under company accounts.
7. Re-run brand and company-fact prompts in the AEO-03 panel.

## Acceptance criteria

- [ ] The entity-fact registry exists with sources, owner, and review date.
- [ ] First-party and approved external surfaces have no unresolved high-risk fact conflicts.
- [ ] `/ai/company` passes schema, fact-parity, production-host, caching, and privacy tests.
- [ ] Stable entity IDs and approved `sameAs` links are used consistently.
- [ ] Search/retrieval and model-training crawler policies are documented separately.
- [ ] Company leadership or the designated policy owner approves training-crawler choices.
- [ ] No preview host is presented as the canonical company website.
- [ ] All company profile access and changes use organization-controlled accounts.

## KPIs after release

- unresolved entity discrepancies by severity;
- percentage of approved surfaces aligned to the registry;
- successful fetch rate for approved crawlers;
- accidental WAF/robots block count;
- incorrect company facts observed in the AEO-03 panel;
- time from approved entity change to cross-surface reconciliation.

## Evidence

- [Google common crawlers and Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [Google guidance for AI features and the website](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI publisher and developer FAQ](https://help.openai.com/en/articles/12627856)
- [Anthropic web crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
