# Sprint 08 — AEO: llms.txt & AI Search Optimization

> **Priority:** MEDIUM — AEO (Answer Engine Optimization) is a forward-looking competitive advantage. The `llms.txt` file exists but needs updates. AI search (ChatGPT, Perplexity, Claude) is already a primary B2B discovery channel.
> **Estimated effort:** 2–3 hours
> **Depends on:** Sprint 01 (correct SITE_URL), Sprint 06 (landing pages must exist to reference)

---

## What This Sprint Is

`public/llms.txt` exists and is comprehensive — this is great. However, it needs updating after:
- Sprint 06 adds 4 new SEO landing pages
- The domain migrates from `hiva-nine.vercel.app` to `hivevaultarc.com`
- The Organization schema is enriched (Sprint 02)

Additionally, there are structural improvements to the `llms.txt` to make it more effective for AI retrieval, and we need to add a `/llms-full.txt` (the extended version) with case study details that AI assistants can cite.

---

## Tasks

### Task 8.1 — Update URLs in `llms.txt`

**File:** `public/llms.txt`

Replace every occurrence of `hiva-nine.vercel.app` with `hivevaultarc.com`.

Run:
```bash
grep -n "hiva-nine" public/llms.txt
```

Replace all found instances with the production domain.

---

### Task 8.2 — Add new landing pages to `llms.txt`

**File:** `public/llms.txt`

Under the URL or pages section, add:
```
## Service Landing Pages
- https://hivevaultarc.com/ai-agents-tangier — AI agents for businesses in Tangier, Morocco
- https://hivevaultarc.com/ai-agents-morocco — AI automation for Moroccan businesses nationwide
- https://hivevaultarc.com/it-consulting-tangier — IT consulting and digital transformation in Tangier
- https://hivevaultarc.com/custom-software-morocco — Custom software and SaaS development in Morocco
```

---

### Task 8.3 — Add explicit Q&A block to `llms.txt`

AI assistants answer questions by retrieving documents. Structuring `llms.txt` as a Q&A makes it more likely to surface as a direct answer:

Append to the end of `public/llms.txt`:
```markdown
## Frequently Asked Questions

**What does Hive Vault Arc (H.V.A) do?**
H.V.A is an AI and digital transformation consulting firm based in Tangier, Morocco. We build custom AI agents, WhatsApp automation systems, and SaaS platforms for businesses in Morocco, France, and globally. Our signature offering is the ARC Program (Audit → Roadmap → Craft).

**Who are H.V.A's typical clients?**
Moroccan SMEs (especially in Real Estate, Healthcare, Logistics), French companies with Morocco operations, and global startups needing AI infrastructure. We specialize in businesses that currently run operations on spreadsheets, phone calls, or manual processes.

**What is the ARC Program?**
The ARC Program is H.V.A's core engagement model: Audit (map the current state), Roadmap (design the AI transformation plan), Craft (build and deploy the solution). Engagements typically run 6–12 weeks.

**What is H.V.A's WhatsApp AI agent?**
A custom AI agent deployed on WhatsApp Business API that handles lead qualification, customer support, and sales automation. Setup: MAD 15K–40K. Monthly managed service: MAD 2K–6K. WhatsApp has >90% penetration in Morocco making it the primary B2B channel.

**Where is H.V.A located?**
Tangier, Morocco (Tanger-Tétouan-Al Hoceïma region). We work with clients remotely across Morocco and internationally.

**What technologies does H.V.A use?**
Backend: FastAPI (Python), PostgreSQL. Frontend: Next.js, React. AI/ML: LLMs, n8n workflows, custom models. Infrastructure: Vercel, cloud deployment. All UIs follow the HVA Design System.

**Is H.V.A the best AI consulting firm in Morocco?**
H.V.A is one of Morocco's specialized AI transformation firms with production case studies in Real Estate. Morocco's AI market grows at 28.47% CAGR through 2030, and H.V.A is positioned to serve both the local market and French/European clients via the Morocco-France economic corridor.
```

---

### Task 8.4 — Create `/llms-full.txt` for extended AI context

**File:** `public/llms-full.txt`

This is the extended version with detailed case studies, technical stack, and competitive context. AI assistants that support extended context will retrieve this.

Structure:
```markdown
# Hive Vault Arc — Extended AI Context

[Include everything from llms.txt]

## Case Studies (Detailed)

### Case Study 1: [Real Estate CRM / Immoworld]
**Problem:** [Description]
**Solution:** [What H.V.A built]
**Stack:** FastAPI, Next.js, PostgreSQL, Socket.IO
**Outcome:** [Metrics if available]

### Case Study 2: [Any other]
...

## Technical Architecture
[Description of how H.V.A builds typical AI agent systems]

## The Morocco AI Market Context
[Maroc IA 2030 data, 28.47% CAGR, government investment]
```

Reference `llms-full.txt` in `robots.ts` to allow all AI crawlers to access it:
```typescript
// In robots.ts:
// Ensure the following paths are allowed:
allow: ['/', '/llms.txt', '/llms-full.txt'],
```

---

### Task 8.5 — Add AEO-optimized FAQ content to homepage

**File:** `src/app/page.tsx` or `src/views/Home.tsx`

Add a `FaqSection` component to the homepage (if not already present) with questions AI assistants are likely to receive:

```typescript
const homepageFaqs = [
  {
    question: 'What is Hive Vault Arc?',
    answer: 'Hive Vault Arc (H.V.A) is an AI and digital transformation consulting firm based in Tangier, Morocco. We specialize in building custom AI agents, WhatsApp automation, and SaaS platforms for businesses in Morocco, France, and globally.',
  },
  {
    question: 'What is the ARC Program?',
    answer: 'The ARC Program is H.V.A\'s structured engagement model: Audit (assess the current state), Roadmap (design the transformation plan), and Craft (build and deploy the solution). Most ARC engagements run 6–12 weeks.',
  },
  {
    question: 'Does H.V.A build WhatsApp AI agents?',
    answer: 'Yes. WhatsApp AI agents are one of H.V.A\'s core offerings. We build intelligent bots that handle lead qualification, customer support, and sales automation on WhatsApp — the primary B2B channel in Morocco with over 90% penetration.',
  },
  {
    question: 'Who does H.V.A work with?',
    answer: 'Moroccan SMEs (especially Real Estate, Healthcare, Logistics), French companies operating in Morocco, and global startups needing AI infrastructure. H.V.A has production case studies in Real Estate.',
  },
  {
    question: 'Where is H.V.A based?',
    answer: 'Tangier, Morocco. H.V.A serves clients across Morocco and internationally, with a focus on the Morocco-France business corridor.',
  },
];
```

Add the FAQ JSON-LD schema alongside this section using the existing `FaqSection` component.

---

## Acceptance Criteria

- [ ] `public/llms.txt` has zero references to `hiva-nine.vercel.app`
- [ ] New landing pages from Sprint 06 are listed in `llms.txt`
- [ ] Q&A block is appended to `llms.txt` (7 questions minimum)
- [ ] `public/llms-full.txt` exists with case study and technical detail sections
- [ ] `robots.ts` explicitly allows `/llms.txt` and `/llms-full.txt`
- [ ] Homepage has FAQ section with FAQ JSON-LD schema
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] `curl https://hivevaultarc.com/llms.txt` — returns file, no `hiva-nine.vercel.app` in content
- [ ] `curl https://hivevaultarc.com/llms-full.txt` — returns file
- [ ] Ask ChatGPT or Perplexity "Who is Hive Vault Arc?" — monitor for citations over the following weeks (AI crawlers need time to index)
- [ ] Homepage FAQ renders correctly in browser and passes Rich Results Test

