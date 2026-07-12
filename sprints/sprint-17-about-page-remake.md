# Sprint 17 - About Page Full Remake

> 2026-05-24 status: historical sprint. Current public brand is `Hive Vault Arc`; use `H.V.A` and `HVA` only as aliases/search variants. For SEO + AI discovery execution, start from `sprints/seo-ai-discovery/README.md`.

> **Priority:** HIGH — This is the highest-intent evaluation page. Prospects land here to decide if H.V.A is serious. Every word must earn its place.
> **Estimated effort:** 4–6 hours
> **Blocking:** None
> **Blocked by:** Sprint 10 (positioning language), Sprint 11 (six-pillar names)

---

## What This Sprint Is

The About page (`/aboutus`) carries old framing across every section. As of this sprint the page says:
- Hero eyebrow: "AI · Digital Transformation · Technology Consulting" — generic, pre-repositioning
- Hero h1: "Long-Term Partners for AI and Digital Transformation" — old identity
- Floating card: "01. FOUNDATIONS — We align executive strategy with technical execution" — vague
- `deliveryFlow`: a 4-step model (Business Discovery / System Design / Build & Validate / Stabilize & Scale) — invented flow that does **not** match the ARC framework
- `principles`: 3 generic rules (Outcome-Driven / Quality by Default / Morocco + Worldwide)
- **Zero content about the 6 service pillars** — the most important H.V.A differentiator is completely absent
- Team tags do not reflect pillar ownership
- BottomCTA headline still references "AI and Transformation Roadmap"
- FAQs in `faqs.ts` still reference the old "three disciplines" framing

This sprint rebuilds the page around the real H.V.A identity: **Technology Transformation Partner · Strategy · AI Engineering · Operations**. The result should feel like a firm with a clear point of view, not a generic consultancy.

---

## Tasks

### Task 17.1 — Update the hero eyebrow, h1, subtitle, proofPoints, and floating card

**File:** `src/views/About.tsx`

**17.1a — Eyebrow label**

Find:
```tsx
                <span className="inline-block text-[#0984E3] font-bold tracking-[0.22em] text-[10px] uppercase mb-6">
                  AI · Digital Transformation · Technology Consulting
                </span>
```

Replace with:
```tsx
                <span className="inline-block text-[#0984E3] font-bold tracking-[0.22em] text-[10px] uppercase mb-6">
                  Technology Transformation Partner · Tangier, Morocco
                </span>
```

---

**17.1b — Hero h1**

Find:
```tsx
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.08] tracking-tight text-[#1E272E] mb-8">
                  Long-Term Partners for AI<br />
                  <em className="italic">and Digital Transformation</em>
                </h1>
```

Replace with:
```tsx
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.08] tracking-tight text-[#1E272E] mb-8">
                  We Advise. We Build.<br />
                  <em className="italic">We Operate.</em>
                </h1>
```

---

**17.1c — Hero subtitle paragraph**

Find:
```tsx
                <p className="text-xl text-[#1E272E]/60 font-light max-w-xl leading-relaxed mb-10">
                  {CANONICAL_MARKET_IDENTITY.longDescriptor} We do not hand projects off between layers; the same founders stay accountable from discovery to production operations.
                </p>
```

Replace with:
```tsx
                <p className="text-xl text-[#1E272E]/60 font-light max-w-xl leading-relaxed mb-10">
                  H.V.A is a technology transformation partner combining strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations — delivered by one team, from first whiteboard to production. No handoffs. Same founders throughout.
                </p>
```

---

**17.1d — proofPoints array**

Find:
```tsx
const proofPoints = ['Based in Morocco', 'Software & Cloud', 'Serving Worldwide'];
```

Replace with:
```tsx
const proofPoints = ['Based in Tangier, Morocco', 'Strategy · AI · Engineering · Operations', 'Serving Morocco & Europe'];
```

---

**17.1e — Floating card**

Find:
```tsx
                <div className="absolute -top-10 left-5 z-10 p-6 bg-white shadow-xl max-w-[240px] hidden md:block">
                  <p className="text-[10px] font-bold text-[#2563EB] tracking-[0.2em] uppercase mb-2">01. FOUNDATIONS</p>
                  <p className="text-lg font-serif italic text-[#0F172A] leading-snug">
                    We align executive strategy with technical execution.
                  </p>
                </div>
```

Replace with:
```tsx
                <div className="absolute -top-10 left-5 z-10 p-6 bg-white shadow-xl max-w-[240px] hidden md:block">
                  <p className="text-[10px] font-bold text-[#2563EB] tracking-[0.2em] uppercase mb-2">ARC Framework</p>
                  <p className="text-lg font-serif italic text-[#0F172A] leading-snug">
                    Assess. Re-engineer. Command.
                  </p>
                </div>
```

---

### Task 17.2 — Replace the deliveryFlow section with the ARC 3-phase model

The current section has a 4-step `deliveryFlow` array and interactive card grid. Replace the entire data array and section header copy to match the official ARC loop.

**File:** `src/views/About.tsx`

**17.2a — Update imports** — Add `Compass` to the lucide import (for Assess phase):

Find:
```tsx
import {
  CalendarCheck,
  Globe2,
  Home,
  Layers3,
  ListChecks,
  Search,
  ShieldCheck,
  Target,
  Workflow,
} from 'lucide-react';
```

Replace with:
```tsx
import {
  Compass,
  Globe2,
  Layers3,
  Settings2,
  ShieldCheck,
  Target,
  Terminal,
  Workflow,
} from 'lucide-react';
```

---

**17.2b — Replace the `deliveryFlow` array**

Find:
```tsx
const deliveryFlow: DeliveryStep[] = [
  {
    step: '01',
    icon: <Search className="h-8 w-8" />,
    title: 'Business Discovery',
    detail: 'Align goals, constraints, and success metrics before scope is locked.',
    checkpoints: ['Define target outcomes', 'Map current blockers', 'Agree scope boundaries'],
  },
  {
    step: '02',
    icon: <ListChecks className="h-8 w-8" />,
    title: 'System Design',
    detail: 'Define architecture, milestones, and risk boundaries with clear ownership.',
    checkpoints: ['Choose architecture model', 'Split delivery milestones', 'Assign technical ownership'],
  },
  {
    step: '03',
    icon: <CalendarCheck className="h-8 w-8" />,
    title: 'Build & Validate',
    detail: 'Ship in iterations with demos, QA checkpoints, and transparent decisions.',
    checkpoints: ['Deliver sprint increments', 'Run QA and review loops', 'Validate against outcomes'],
  },
  {
    step: '04',
    icon: <Home className="h-8 w-8" />,
    title: 'Stabilize & Scale',
    detail: 'Handover, optimize, and support the system as usage and complexity grow.',
    checkpoints: ['Handover with documentation', 'Monitor production reliability', 'Plan scale roadmap'],
  },
];
```

Replace with:
```tsx
const deliveryFlow: DeliveryStep[] = [
  {
    step: '01',
    icon: <Compass className="h-8 w-8" />,
    title: 'Assess',
    detail: 'Map friction, define target architecture, and sequence the transformation before a single line of code is written.',
    checkpoints: ['Define measurable outcomes', 'Audit current systems and blockers', 'Sequence strategy into milestones'],
  },
  {
    step: '02',
    icon: <Settings2 className="h-8 w-8" />,
    title: 'Re-engineer',
    detail: 'Build the systems, deploy the intelligence, and wire the infrastructure — shipped in sprint increments with full transparency.',
    checkpoints: ['Deliver AI, software, and cloud layers', 'Validate against real outcomes', 'Iterate with demos and QA loops'],
  },
  {
    step: '03',
    icon: <Terminal className="h-8 w-8" />,
    title: 'Command',
    detail: 'Stabilize, monitor, and evolve — the same team owns operations long-term. No handoff. No knowledge transfer failure.',
    checkpoints: ['Operate production systems', 'Monitor reliability and performance', 'Evolve as business requirements grow'],
  },
];
```

---

**17.2c — Update the "How We Work" section header copy**

Find:
```tsx
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-3">Delivery System</p>
              <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] leading-[1.02]">How We Work</h2>
```

Replace with:
```tsx
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-3">The ARC Loop</p>
              <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] leading-[1.02]">How We Deliver</h2>
```

---

**17.2d — Update the right-side descriptor in the section header**

Find:
```tsx
              <p className="max-w-xl text-[#475569] leading-relaxed lg:text-right">
                The process is transparent, paced, and intentionally designed so stakeholders always understand what is
                being changed, why it matters, and how outcomes will be measured.
              </p>
```

Replace with:
```tsx
              <p className="max-w-xl text-[#475569] leading-relaxed lg:text-right">
                The ARC loop — Assess, Re-engineer, Command — is not a handoff chain. It is a single continuous loop operated by the same team. Strategy informs build. Build informs operations. Operations feeds back into strategy.
              </p>
```

---

**17.2e — Update the active step detail panel label**

Find:
```tsx
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-1">Current Step</p>
```

Replace with:
```tsx
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-1">ARC Phase</p>
```

---

**17.2f — Update the grid layout from 4 columns to 3**

Find:
```tsx
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-300">
```

Replace with:
```tsx
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-px bg-slate-300">
```

---

### Task 17.3 — Add a Six Service Pillars section

This section is completely absent from the current page. It belongs between the ARC section and the Operating Principles section — it is the most important content block for prospect evaluation and AI citation.

**File:** `src/views/About.tsx`

**17.3a — Add the `pillars` data array** near the top of the file, after the `principles` array:

Find:
```tsx
const deliveryFlow: DeliveryStep[] = [
```

Insert before that line:
```tsx
type Pillar = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    number: '01',
    shortTitle: 'Strategy',
    title: 'Strategy & Business Consulting',
    description: 'Diagnose the transformation before any code is written. We redesign operating models, define AI strategy, sequence digital programs, and build the roadmap that connects business outcomes to technical execution.',
  },
  {
    number: '02',
    shortTitle: 'Technology',
    title: 'Technology Consulting',
    description: 'Design the architecture that serves the business 3–5 years out. Enterprise blueprints, technology roadmaps, platform strategy, IT modernization, systems integration, and infrastructure redesign.',
  },
  {
    number: '03',
    shortTitle: 'AI & Data',
    title: 'AI, Data & Analytics',
    description: 'Engineer intelligence into operations. Generative AI systems, autonomous agents, machine learning, data pipelines, business intelligence, MLOps, and conversational AI on WhatsApp and web channels.',
  },
  {
    number: '04',
    shortTitle: 'Software',
    title: 'Software Engineering & Product',
    description: 'Production-grade custom software, web and mobile applications, SaaS platforms, API ecosystems, DevOps pipelines, and UX-wired frontend delivery.',
  },
  {
    number: '05',
    shortTitle: 'Cloud',
    title: 'Cloud & Infrastructure',
    description: 'AWS, Azure, and GCP migration, cloud-native architecture, Terraform-based infrastructure automation, security design, disaster recovery, and production observability.',
  },
  {
    number: '06',
    shortTitle: 'Operations',
    title: 'Operations & Managed Services',
    description: 'Ongoing ownership of the systems H.V.A builds. Managed operations, application evolution, automation maintenance, IT support, and business process management — long after go-live.',
  },
];

```

---

**17.3b — Insert the pillars section into JSX**

In the JSX return, find the closing tag of the ARC delivery section and the opening tag of the Operating Principles section:

Find:
```tsx
        {/* Operating Principles — redesigned */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24">
```

Insert before that line:
```tsx
        {/* Six Service Pillars */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35 }}
              className="mb-14"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0984E3] mb-3">What We Do</p>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1E272E] leading-tight max-w-xl">
                  Six Integrated<br />Service Pillars
                </h2>
                <p className="max-w-md text-[#1E272E]/60 leading-relaxed lg:text-right">
                  These are not separate departments. They are phases of the same transformation loop — applied in full or in part depending on where the client is.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8eaed]">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="bg-[#F5F6FA] p-8 group hover:bg-white transition-colors duration-300"
                >
                  <p className="font-headline text-[4rem] leading-none text-[#1E272E]/[0.05] select-none mb-4 -ml-1">
                    {pillar.number}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0984E3] mb-2">{pillar.shortTitle}</p>
                  <h3 className="font-serif text-xl font-medium text-[#1E272E] mb-4 leading-snug">{pillar.title}</h3>
                  <p className="text-sm text-[#1E272E]/64 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

```

---

### Task 17.4 — Update Operating Principles

Replace the 3 generic principles with 4 that reflect the transformation partner model.

**File:** `src/views/About.tsx`

**17.4a — Replace the `principles` array**

Find:
```tsx
const principles: Principle[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Outcome-Driven',
    description: 'Each milestone is tied to measurable business outcomes, not just output.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quality by Default',
    description: 'Performance, reliability, and maintainability are built in from day one.',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'Morocco + Worldwide',
    description: 'Based in Morocco and delivering for clients worldwide with global engineering standards.',
  },
];
```

Replace with:
```tsx
const principles: Principle[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'No Handoffs',
    description: 'The same team that defines strategy designs the architecture, writes the code, and operates the system. No agency-to-consultancy drift. No knowledge transfer failure.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Outcomes Over Output',
    description: 'Every milestone is tied to a measurable business result. We do not ship features — we move metrics. Performance, reliability, and maintainability are built in from day one.',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'Vertical Depth',
    description: 'We operate in defined industries — Real Estate, Healthcare, Financial Services, Logistics — because domain knowledge compounds. Generic technology advice does not.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Founder Accountability',
    description: 'H.V.A is founder-led. Khalid, Ali, and Oubay are on every engagement. Decisions are made by the people who understand the full system — not escalated up a management chain.',
  },
];
```

---

**17.4b — Update the Operating Principles section header**

Find:
```tsx
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1E272E] mb-12 leading-tight">
                  The Rules Behind<br />How We Partner
                </h2>
```

Replace with:
```tsx
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1E272E] mb-12 leading-tight">
                  Four Non-Negotiables<br />of Transformation
                </h2>
```

---

**17.4c — Update the dark quote card right-panel text**

Find:
```tsx
                    <p className="text-[#F5F6FA]/90 text-sm font-light leading-relaxed max-w-md">
                      Three non-negotiables that shape planning, quality decisions, and execution pace on every engagement.
                    </p>
```

Replace with:
```tsx
                    <p className="text-[#F5F6FA]/90 text-sm font-light leading-relaxed max-w-md">
                      Four non-negotiables that shape every engagement — from the first strategy session to the last infrastructure alert.
                    </p>
```

---

### Task 17.5 — Update team member tags

**File:** `src/views/About.tsx`

Find:
```tsx
const teamMembers: TeamMember[] = [
  {
    name: 'Khalid Chalhi',
    tag: 'Architecture & Delivery',
    role: 'Co-Founder & Software Engineer',
    image: '/Images/team/khalid-chalhi-hva-co-founder.webp',
  },
  {
    name: 'Ali Amrani',
    tag: 'Product & Systems',
    role: 'Co-Founder & Full-Stack Engineer',
    image: '/Images/team/ali-amrani-hva-co-founder.webp',
  },
  {
    name: 'Oubay Ghamat',
    tag: 'Cloud & Scale',
    role: 'Co-Founder & Cloud Engineer',
    image: '/Images/team/oubay-ghamat-hva-co-founder.webp',
  },
];
```

Replace with:
```tsx
const teamMembers: TeamMember[] = [
  {
    name: 'Khalid Chalhi',
    tag: 'Strategy · AI · Software Engineering',
    role: 'Co-Founder & Software Engineer',
    image: '/Images/team/khalid-chalhi-hva-co-founder.webp',
  },
  {
    name: 'Ali Amrani',
    tag: 'Product · Systems · Full-Stack',
    role: 'Co-Founder & Full-Stack Engineer',
    image: '/Images/team/ali-amrani-hva-co-founder.webp',
  },
  {
    name: 'Oubay Ghamat',
    tag: 'Cloud · Infrastructure · Operations',
    role: 'Co-Founder & Cloud Engineer',
    image: '/Images/team/oubay-ghamat-hva-co-founder.webp',
  },
];
```

---

**17.5b — Update the team section intro paragraph**

Find:
```tsx
              <p className="text-[#1E272E]/64 leading-relaxed">
                Our founding team combines strategy consulting, technology architecture, AI engineering, software development, cloud infrastructure, and managed operations — delivering technology transformation programs that are practical, resilient, and built for long-term evolution.
              </p>
```

Replace with:
```tsx
              <p className="text-[#1E272E]/64 leading-relaxed">
                Three co-founders. Six service pillars. One team that stays from strategy to operations. H.V.A was founded in Tangier by engineers who wanted to build transformation programs that do not fall apart after the first deployment.
              </p>
```

---

### Task 17.6 — Update the BottomCTA

**File:** `src/views/About.tsx`

Find:
```tsx
        <BottomCTA
          variant="dark"
          headline="Ready to Define Your AI and Transformation Roadmap?"
          subtext="Share your goals and constraints. We will map the right strategy, engineering, and operations path — and discuss scope after discovery. No handoff. Same team."
          primaryLabel="Book a Call"
          primaryHref="/contact"
          secondaryLabel="ReView Capabilities"
          secondaryHref="/capabilities"
        />
```

Replace with:
```tsx
        <BottomCTA
          variant="dark"
          headline="Ready to Start Your Transformation?"
          subtext="Tell us where you are and where you need to be. H.V.A will map the right strategy, engineering, and operations path — and stay involved until the outcome is measurable."
          primaryLabel="Book a Discovery Call"
          primaryHref="/contact"
          secondaryLabel="View Our Capabilities"
          secondaryHref="/capabilities"
        />
```

---

### Task 17.7 — Update FAQs for the About page

**File:** `src/data/faqs.ts`

Find:
```tsx
export const ABOUT_FAQS: FaqSet = [
  {
    question: 'Who leads H.V.A engagements?',
    answer:
      'H.V.A is founder-led. The same engineering leaders who shape AI strategy, automation architecture, and transformation roadmaps stay involved through delivery, deployment, and long-term maintenance.',
  },
  {
    question: 'What makes H.V.A different from a typical consulting firm or AI agency?',
    answer:
      'We sit at the intersection of three disciplines that are usually siloed: strategic consulting, AI and intelligent automation, and digital transformation engineering. We do not hand off between advisory and delivery layers — the same team owns strategy through production. That end-to-end accountability is what separates us from advice-only consultants and build-only agencies.',
  },
  {
    question: 'What is your partnership style with client teams?',
    answer:
      'We operate as a strategic and technical partner to leadership teams. We co-define AI and transformation priorities, communicate in transparent milestones, and transfer operational clarity across business and engineering stakeholders.',
  },
  {
    question: 'Do you stay involved after the initial build?',
    answer:
      'Yes. We provide stabilization, optimization, and managed evolution so AI systems and digital infrastructure remain reliable and aligned with changing business requirements.',
  },
  {
    question: 'What principles guide your delivery?',
    answer:
      'Outcome accountability, architecture quality, and end-to-end ownership guide every engagement. We prioritize intelligent systems that remain measurable, maintainable, and scalable over time.',
  },
];
```

Replace with:
```tsx
export const ABOUT_FAQS: FaqSet = [
  {
    question: 'What is Hive Vault Arc (H.V.A)?',
    answer:
      'Hive Vault Arc is a technology transformation partner based in Tangier, Morocco. We combine strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations in one founder-led team — delivering transformation programs from strategy through production without handoffs.',
  },
  {
    question: 'What is the ARC framework?',
    answer:
      'ARC is the H.V.A delivery model: Assess, Re-engineer, Command. Assess means mapping friction and defining architecture before any code is written. Re-engineer means building AI systems, software, and cloud infrastructure in sprint increments. Command means operating and evolving the systems long-term. The same team runs all three phases — there is no handoff between them.',
  },
  {
    question: 'What are H.V.A\'s six service pillars?',
    answer:
      'H.V.A delivers across six integrated pillars: (1) Strategy & Business Consulting — operating model redesign and transformation roadmaps; (2) Technology Consulting — enterprise architecture and platform strategy; (3) AI, Data & Analytics — generative AI, autonomous agents, machine learning, and data engineering; (4) Software Engineering & Product — custom software, SaaS platforms, and mobile apps; (5) Cloud & Infrastructure — AWS, Azure, GCP, and infrastructure automation; (6) Operations & Managed Services — ongoing production ownership and application evolution.',
  },
  {
    question: 'Who leads H.V.A engagements?',
    answer:
      'H.V.A is founder-led. Khalid Chalhi, Ali Amrani, and Oubay Ghamat are directly involved in every engagement — from strategy and architecture to delivery and production operations. Decisions are made by the people who understand the full system, not delegated to junior staff.',
  },
  {
    question: 'Do you stay involved after the initial build?',
    answer:
      'Yes — that is the Command phase of ARC. We provide managed operations, production monitoring, application evolution, and ongoing optimization. Transformation is only complete when the systems are running and the outcomes are measurable. We do not disappear after go-live.',
  },
  {
    question: 'What industries does H.V.A serve?',
    answer:
      'H.V.A operates in eight defined verticals: Real Estate & Construction, Healthcare & Life Sciences, Financial Services, Government & Public Sector, Retail & E-Commerce, Energy & Sustainability, Logistics & Transportation, and Consumer Goods & Luxury. We focus on Morocco and the France–MENA corridor.',
  },
];
```

---

### Task 17.8 — Update page.tsx metadata and JSON-LD schema

**File:** `src/app/aboutus/page.tsx`

**17.8a — Update the metadata description**

Find:
```tsx
  description:
    'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco — combining strategy, AI engineering, software development, cloud infrastructure, and managed operations in one team.',
```

Replace with:
```tsx
  description:
    'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco. We combine strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations in one founder-led team — from first whiteboard to production operations. No handoffs.',
```

---

**17.8b — Expand the keywords array** to include ARC, pillar, and AEO-friendly question phrases:

Find:
```tsx
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'software engineering team Tangier',
    'digital transformation consulting team Morocco',
    'technology advisory firm Morocco',
    'team for custom software projects Morocco',
    'equipe ingenierie logicielle Tanger',
    'agence software et cloud Maroc',
    'فريق هندسة برمجيات طنجة',
    'شركة متخصصة في الذكاء الاصطناعي والبرمجيات المغرب',
    'equipo de ingenieria de software tanger',
    'agencia de software e ia en marruecos',
  ]),
```

Replace with:
```tsx
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology transformation partner Morocco',
    'software engineering team Tangier',
    'digital transformation consulting team Morocco',
    'technology advisory firm Morocco',
    'ARC framework assess re-engineer command',
    'AI engineering firm Morocco',
    'managed operations technology Morocco',
    'founder-led technology firm Morocco',
    'six service pillars technology transformation',
    'what is Hive Vault Arc',
    'who founded HVA Morocco',
    'equipe ingenierie logicielle Tanger',
    'agence software et cloud Maroc',
    'فريق هندسة برمجيات طنجة',
    'شركة متخصصة في الذكاء الاصطناعي والبرمجيات المغرب',
    'equipo de ingenieria de software tanger',
    'agencia de software e ia en marruecos',
  ]),
```

---

**17.8c — Expand the JSON-LD AboutPage schema**

Find:
```tsx
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About H.V.A',
    url: `${SITE_URL}/aboutus`,
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
    },
  };
```

Replace with:
```tsx
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About H.V.A — Technology Transformation Partner',
    url: `${SITE_URL}/aboutus`,
    description:
      'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco combining strategy, AI engineering, software development, cloud infrastructure, and managed operations.',
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      alternateName: 'H.V.A',
      description:
        'Technology transformation partner — strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations delivered by one founder-led team.',
      foundingLocation: 'Tangier, Morocco',
      areaServed: ['Morocco', 'France', 'Europe', 'MENA'],
      knowsAbout: [
        'Technology Transformation',
        'AI Engineering',
        'Strategy Consulting',
        'Software Development',
        'Cloud Infrastructure',
        'Managed Operations',
      ],
    },
  };
```

---

## Acceptance Criteria

- [ ] Hero eyebrow says "Technology Transformation Partner · Tangier, Morocco"
- [ ] Hero h1 says "We Advise. We Build. We Operate."
- [ ] proofPoints updated to include "Strategy · AI · Engineering · Operations"
- [ ] Floating card says "ARC Framework — Assess. Re-engineer. Command."
- [ ] Delivery section now shows 3 ARC phases (not 4 old steps)
- [ ] Delivery grid renders in 3 columns (not 4)
- [ ] Six pillars section renders between ARC and Operating Principles
- [ ] All 6 pillars visible in 3×2 grid with number, short title, full title, description
- [ ] Operating Principles has 4 rules (not 3) — no reference to "Outcome-Driven / Quality by Default / Morocco + Worldwide" old labels
- [ ] Team tags updated for all 3 founders
- [ ] Team intro paragraph updated
- [ ] BottomCTA headline says "Ready to Start Your Transformation?"
- [ ] FAQs now include 6 questions with ARC framework explanation, six pillars detail, industry list
- [ ] Page title metadata updated
- [ ] JSON-LD schema includes `areaServed`, `knowsAbout`, `foundingLocation`
- [ ] No TypeScript errors (`pnpm build` clean)
- [ ] No unused import warnings (removed `CalendarCheck`, `Home`, `ListChecks`, `Search`)

---

## Exit Criteria

Sprint 17 is done when:
1. The About page at `/aboutus` renders without errors in dev mode
2. All 6 service pillars are visible in their grid
3. The ARC 3-phase section replaces the old 4-step flow — all interactive states work
4. FAQs answer the six questions above
5. `pnpm build` exits clean with no type errors
