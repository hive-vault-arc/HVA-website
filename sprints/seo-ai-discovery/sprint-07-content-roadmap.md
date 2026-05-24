# Sprint 07 - High-Intent Content Roadmap

Priority: Medium
Depends on: Sprint 01 through Sprint 06
Primary specs:

- `../../docs/specs/seo-ai-discovery/00-research-audit.md`
- `../../docs/specs/seo-ai-discovery/01-technical-seo-ai-spec.md`
- `../../docs/specs/seo-ai-discovery/04-high-intent-content-roadmap.md`

## Goal

Create a practical roadmap for future high-intent pages that help search engines and AI systems answer buyer questions about AI agents, WhatsApp automation, technology consulting, software engineering, and managed operations in Morocco and Tangier.

This sprint plans content. It does not require publishing every page immediately.

## Content Principles

- Answer the query directly in the first 100-150 words.
- Use `Hive Vault Arc` as the public brand.
- Mention `H.V.A` / `HVA` only in alias/search contexts.
- Include location and market served where relevant.
- Include service definition, use cases, process, proof, FAQs, and internal links.
- Use visible FAQ content before adding `FAQPage` schema.
- Use `Service` schema only where page content supports the service.
- Avoid fake claims, fake clients, fake metrics, fake awards, or broad "best company" claims.

## Priority Page Ideas

Tier 1:

- AI automation agency in Tangier
- WhatsApp AI chatbot company in Morocco
- AI agents for real estate agencies in Morocco
- Technology consulting company in Tangier
- Software engineering partner in Morocco
- Cloud infrastructure and managed operations Morocco

Tier 2:

- AI agents for clinics in Morocco
- CRM modernization company Morocco
- AI transformation roadmap for Moroccan SMEs
- Managed IT operations partner in Tangier
- Custom business software for Moroccan SMEs
- AI customer support automation in Morocco

Tier 3:

- AI agents for logistics companies in Morocco
- AI agents for retail and ecommerce in Morocco
- Government and public sector digital transformation Morocco
- France-Morocco technology delivery partner
- Arabic/French/English AI agent development

## Page Template

Each future page should include:

1. Title and metadata
   - Search-intent phrase plus `Hive Vault Arc`.
   - One clear value proposition.

2. Direct answer block
   - Plain answer to the target query.
   - Mention location and delivery model.

3. Problem and use cases
   - Describe the buyer pain.
   - List realistic workflows.

4. What Hive Vault Arc builds
   - Strategy, AI engineering, software, cloud, and managed operations as appropriate.

5. Process
   - Assess, Re-engineer, Command.
   - Keep process specific and measurable.

6. Proof and credibility
   - Link relevant case studies.
   - Use only real metrics.

7. FAQ
   - 4-6 visible questions.
   - Add FAQ schema only if visible.

8. Internal links
   - Capabilities
   - ARC
   - About
   - Contact
   - Relevant case studies

## Metadata Rules

- Canonical path on `https://hivevaultarc.com`.
- `openGraph` image exists and has alt text.
- `robots` remains index/follow for complete pages.
- `keywords` should be concise and not stuffed.
- Localized pages only get alternates after real translation exists.

## Acceptance Criteria

- Content roadmap is documented in `../../docs/specs/seo-ai-discovery/04-high-intent-content-roadmap.md`.
- Each planned page has target query, audience, service scope, proof source, schema type, and internal links.
- No planned page depends on unverified claims.
- Implementation order starts with Tier 1 pages.

## Verification

Before publishing any page:

```powershell
npm run build
rg "H\\.V\\.A|HVA|best AI|#1|hiva-nine" src public docs sprints
```

After publishing:

- Validate page in browser at mobile and desktop widths.
- Validate metadata and schema.
- Add URL to sitemap.
- Submit URL through Google Search Console, Bing Webmaster Tools, and IndexNow.
