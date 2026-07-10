import {
  getAllSanityPerspectives,
  getSanityPerspectiveBySlug,
} from './sanity-content';
import { withSanityFallback } from '../sanity/lib/fetch';
import type { ContentSeo } from './content-seo';

export type PerspectiveSection =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'pullquote'; content: string; attribution?: string }
  | { type: 'faq'; items: { question: string; answer: string }[] };

export type Perspective = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  publishedAt: string;
  readTime: string;
  tag: 'Perspective';
  authors: { name: string; role: string; initials: string }[];
  keywords: string[];
  sources: { label: string; url: string }[];
  coverImage: string;
  coverAlt: string;
  seo?: ContentSeo;
  sections: PerspectiveSection[];
};

export const PERSPECTIVES: Perspective[] = [
  {
    slug: 'consulting-engineering-one-loop',
    title: 'Consulting and Engineering Must Stay in One Loop',
    subtitle:
      'Transformation fails when strategy, architecture, delivery, and operations are treated as separate handoffs instead of one accountable system.',
    summary:
      "Hive Vault Arc's perspective on why modern transformation needs consulting, engineering, and operations connected from diagnosis to production.",
    publishedAt: '2026-06-04',
    readTime: '7 min read',
    tag: 'Perspective',
    authors: [{ name: 'Hive Vault Arc Editorial', role: 'Technology Transformation', initials: 'HV' }],
    coverImage: '/Images/perspectives/consulting-engineering-delivery-loop.webp',
    coverAlt:
      'Minimalist loop diagram showing strategy, architecture, engineering delivery, and operations connected in one system.',
    keywords: [
      'technology transformation partner',
      'consulting and engineering delivery model',
      'strategy to execution technology',
      'digital transformation operating model',
      'technology consulting Morocco',
      'software engineering partner Morocco',
      'managed operations partner',
      'ARC framework',
    ],
    sources: [
      {
        label: 'McKinsey - Digital and AI transformation insights',
        url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights',
      },
      {
        label: 'BCG - Digital transformation and AI strategy',
        url: 'https://www.bcg.com/capabilities/digital-technology-data/overview',
      },
      {
        label: 'Deloitte - Technology strategy and transformation',
        url: 'https://www.deloitte.com/global/en/our-thinking/insights/topics/digital-transformation.html',
      },
      {
        label: 'MIT Sloan Management Review - Strategy and technology execution',
        url: 'https://sloanreview.mit.edu/topic/strategy/',
      },
      {
        label: 'Google Search Central - Article structured data',
        url: 'https://developers.google.com/search/docs/appearance/structured-data/article',
      },
    ],
    sections: [
      {
        type: 'paragraph',
        content:
          'Consulting and engineering should stay connected because transformation depends on context. The people who diagnose the business problem must understand the architecture, and the people who build the system must understand the operating model. When strategy is handed off to delivery, decisions lose context. When engineering works without strategy, teams can ship technically correct systems that do not change the business outcome. Hive Vault Arc was built around the opposite belief: strategy consulting, AI engineering, software, cloud, and managed operations should move in one accountable loop.',
      },
      {
        type: 'heading',
        content: 'The Handoff Problem',
      },
      {
        type: 'paragraph',
        content:
          'The common transformation model separates the work into phases owned by different teams. A consultant diagnoses the situation and leaves a deck. A software agency receives a scope and builds what was written. Operations inherits the system after launch and discovers the edge cases that were never designed into the plan.',
      },
      {
        type: 'paragraph',
        content:
          'This is not a criticism of consultants or agencies as people. It is a structural problem. Each team can do its part professionally and still leave the client carrying the burden of connecting everything. The more handoffs there are, the more context has to survive through documents, meetings, assumptions, and memory.',
      },
      {
        type: 'paragraph',
        content:
          'In real transformation work, that context is the work. Why a workflow exists. Which exception matters. Which department will resist a change. Which data field is politically sensitive. Which metric leadership actually cares about. Those details are easy to lose when diagnosis, architecture, build, and operations are treated as separate worlds.',
      },
      {
        type: 'heading',
        content: 'What Gets Lost Between Strategy And Delivery',
      },
      {
        type: 'list',
        items: [
          'The original business constraint that made the project necessary.',
          'The reason a feature mattered to the operating model.',
          'The edge cases heard during discovery but not written clearly into the scope.',
          'The organizational constraint: approval rights, team capacity, incentives, or adoption risk.',
          'The real success metric behind the work.',
          'The operating responsibility after launch.',
          'The future roadmap logic that explains why some choices matter more than others.',
        ],
      },
      {
        type: 'pullquote',
        content:
          'Strategy without delivery becomes a deck. Engineering without strategy builds the wrong thing beautifully.',
        attribution: 'Hive Vault Arc perspective',
      },
      {
        type: 'heading',
        content: 'Engineering Needs Strategy',
      },
      {
        type: 'paragraph',
        content:
          'Good code is not enough. Architecture decisions are business decisions because they decide how teams will work, what data will be trusted, which processes can scale, and where future cost will appear. A data model can either clarify ownership or encode confusion. A user interface can either support adoption or quietly push staff back to spreadsheets and WhatsApp side channels.',
      },
      {
        type: 'paragraph',
        content:
          'Infrastructure decisions also carry business consequences. Reliability, security, cost, integration depth, and observability affect whether a system becomes part of daily operations or remains a fragile project. AI systems make this even more important because prompts, models, workflows, and human escalation rules need ownership after launch.',
      },
      {
        type: 'paragraph',
        content:
          'Engineering teams need to understand the operating logic, not only the feature list. Otherwise they may ship a system that meets the scope but misses the transformation.',
      },
      {
        type: 'heading',
        content: 'Strategy Needs Engineering',
      },
      {
        type: 'paragraph',
        content:
          'Strategy must respect technical reality. A roadmap that ignores data quality, integrations, security, user adoption, performance, and operations is not a transformation plan. It is an intention.',
      },
      {
        type: 'paragraph',
        content:
          'The best strategy work is informed by delivery knowledge. It understands which dependency will slow the project, which system cannot be replaced immediately, which workflow should be simplified before it is automated, and which capability should be built now because future phases will depend on it.',
      },
      {
        type: 'paragraph',
        content:
          'This is why Hive Vault Arc works as a technology transformation partner rather than an advice-only consultancy or build-only software team. The plan should be shaped by the people who understand what it will take to make the system real.',
      },
      {
        type: 'heading',
        content: 'The ARC Loop',
      },
      {
        type: 'paragraph',
        content:
          'ARC is Hive Vault Arc\'s public delivery model: Assess, Re-engineer, Command. It is not a sequence of departments. It is one team moving through three modes of responsibility.',
      },
      {
        type: 'subheading',
        content: 'Assess',
      },
      {
        type: 'paragraph',
        content:
          'Assess means diagnosis: business workflow, operating model, architecture, data, risk, constraints, and roadmap. The output is not only a recommendation. It is a shared understanding of what must change and why.',
      },
      {
        type: 'subheading',
        content: 'Re-engineer',
      },
      {
        type: 'paragraph',
        content:
          'Re-engineer means building the AI, software, cloud, integration, and process layer that supports the target operating model. Delivery stays connected to the original diagnosis, so implementation choices serve the business outcome.',
      },
      {
        type: 'subheading',
        content: 'Command',
      },
      {
        type: 'paragraph',
        content:
          'Command means managed operations after launch: monitoring, maintenance, workflow tuning, reporting, and iteration. This is where transformation becomes production reality rather than a project that ends at deployment.',
      },
      {
        type: 'heading',
        content: 'What Clients Should Look For',
      },
      {
        type: 'list',
        items: [
          'Does the partner understand the business workflow, not only the requested software?',
          'Can the partner explain architecture in business terms?',
          'Will the people who scope the project stay involved during delivery?',
          'Is there an operations plan after launch?',
          'Are metrics defined before implementation?',
          'Is ownership clear when something breaks?',
        ],
      },
      {
        type: 'paragraph',
        content:
          'A serious partner should be able to move between consulting language and engineering reality without losing the thread. They should understand the buyer\'s constraint, the user\'s workflow, the system architecture, and the operating responsibilities that continue after go-live.',
      },
      {
        type: 'heading',
        content: 'Closing Point of View',
      },
      {
        type: 'paragraph',
        content:
          'The future belongs to firms that can think and ship in the same loop. Hive Vault Arc was built around that belief: advise, build, operate, and keep learning from the system after it goes live.',
      },
      {
        type: 'paragraph',
        content:
          'Transformation does not fail only because of weak ideas or weak code. It fails when context breaks between teams. The work is strongest when diagnosis, architecture, delivery, and operations stay connected until the system is actually working in production.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Why do transformation projects fail at handoffs?',
            answer:
              'Handoffs often lose the business context behind technical decisions. When discovery, architecture, delivery, and operations are separated, teams may optimize their own part while the overall operating outcome drifts.',
          },
          {
            question: 'What does it mean to connect consulting and engineering?',
            answer:
              'It means the people shaping the strategy understand the technical path, and the people building the system understand the business workflow. Scope, architecture, data, user experience, and operations are treated as one connected system.',
          },
          {
            question: 'How does ARC reduce execution drift?',
            answer:
              'ARC keeps the same accountable loop across Assess, Re-engineer, and Command. The original diagnosis informs delivery, and production operations feed learning back into the system after launch.',
          },
          {
            question: 'What should a business ask before hiring a transformation partner?',
            answer:
              'Ask whether the partner understands the workflow, can explain architecture in business terms, will stay involved during delivery, defines metrics before implementation, and has a clear operations plan after launch.',
          },
        ],
      },
    ],
  },
  {
    slug: 'fix-the-workflow-before-ai',
    title: 'Fix the Workflow Before You Add AI',
    subtitle:
      'AI creates value only when the workflow, data, ownership, and escalation path are clear. Otherwise, automation turns operational confusion into faster confusion.',
    summary:
      "Hive Vault Arc's perspective on why businesses should diagnose workflows, data, ownership, and success metrics before deploying AI agents or automation.",
    publishedAt: '2026-06-04',
    readTime: '7 min read',
    tag: 'Perspective',
    authors: [{ name: 'Hive Vault Arc Editorial', role: 'Technology Transformation', initials: 'HV' }],
    coverImage: '/Images/perspectives/ai-workflow-automation-strategy-before-ai.webp',
    coverAlt:
      'Minimalist workflow diagram showing fragmented operations becoming a clear path before an AI automation node.',
    keywords: [
      'AI workflow automation strategy',
      'AI implementation readiness',
      'workflow automation before AI',
      'AI agents for business operations',
      'digital transformation Morocco',
      'technology transformation partner Morocco',
      'AI automation for SMEs',
    ],
    sources: [
      {
        label: 'BCG - Artificial Intelligence and business transformation',
        url: 'https://www.bcg.com/capabilities/artificial-intelligence/overview',
      },
      {
        label: 'McKinsey QuantumBlack - AI and generative AI insights',
        url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights',
      },
      {
        label: 'MIT Sloan Management Review - Artificial intelligence topic hub',
        url: 'https://sloanreview.mit.edu/topic/artificial-intelligence/',
      },
      {
        label: 'Gartner - Artificial intelligence insights',
        url: 'https://www.gartner.com/en/information-technology/topics/artificial-intelligence',
      },
      {
        label: 'Google Search Central - Structured data introduction',
        url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
      },
    ],
    sections: [
      {
        type: 'paragraph',
        content:
          'No. A business should not add AI before it understands the workflow it wants to improve. AI works best when the process, data, decision rights, escalation rules, and success metrics are clear. If those are missing, AI does not solve the problem; it reproduces confusion at higher speed. The better path is to assess the workflow first, redesign the weak points, then add AI where it can remove friction or increase capacity. This is the practical position of Hive Vault Arc: AI implementation starts with operational clarity, not tool selection.',
      },
      {
        type: 'heading',
        content: 'The Mistake Leaders Make',
      },
      {
        type: 'paragraph',
        content:
          'Many AI projects begin with the wrong question. Leaders ask which AI tool they should buy before asking which process should change. That creates a familiar pattern: a new chatbot, dashboard, or automation layer is placed on top of the same scattered operation.',
      },
      {
        type: 'paragraph',
        content:
          'A sales team may have leads across WhatsApp, Instagram, spreadsheets, calls, and personal notes. A clinic may receive appointment requests through phone calls, WhatsApp messages, and reception notebooks. A service company may have no clear escalation path when a request becomes complex. In each case, AI can respond faster, but it cannot decide the operating model by itself.',
      },
      {
        type: 'paragraph',
        content:
          'The danger is not that AI fails dramatically. The danger is that it appears to work while automating workarounds. It answers questions without a reliable source of truth. It routes leads without clear ownership. It summarizes conversations that no one knows how to act on. The company gets speed without control.',
      },
      {
        type: 'pullquote',
        content:
          'AI does not fix a broken operation. It accelerates the operation that already exists.',
        attribution: 'Hive Vault Arc perspective',
      },
      {
        type: 'heading',
        content: 'What Must Be Clear Before AI',
      },
      {
        type: 'paragraph',
        content:
          'Before a company deploys an AI agent or workflow automation, six operating questions should be clear enough to explain in plain language.',
      },
      {
        type: 'list',
        items: [
          'Workflow: what happens from first contact to final outcome?',
          'Data: where does the source of truth live, and which fields must stay accurate?',
          'Ownership: who handles each step, and who is accountable when the step fails?',
          'Exceptions: when should the system stop and escalate to a human?',
          'Success metric: are we improving response time, booking rate, conversion, support load, or missed-lead recovery?',
          'Risk boundary: what should AI never decide alone?',
        ],
      },
      {
        type: 'paragraph',
        content:
          'This checklist is not bureaucracy. It is the minimum design layer that makes AI useful. Without it, an AI agent becomes another channel to monitor. With it, AI becomes part of a controlled operating system.',
      },
      {
        type: 'heading',
        content: 'Where AI Actually Helps',
      },
      {
        type: 'paragraph',
        content:
          'Once the workflow is clear, AI can create real value. The use case should be described as an operating outcome, not as a generic technology label. Not "use AI for sales", but "reduce lead response time and route qualified leads into the CRM." Not "use AI for support", but "answer common questions, detect risk, and escalate edge cases to the right person."',
      },
      {
        type: 'list',
        items: [
          'Lead qualification: collect intent, budget, timing, and contact details before a salesperson joins.',
          'First response: acknowledge inbound requests quickly and consistently across business hours and after hours.',
          'FAQ handling: resolve repetitive questions without pulling staff away from higher-value work.',
          'Appointment routing: connect the right request to the right calendar, location, or human owner.',
          'CRM updates: keep customer records current without relying on manual copy-paste work.',
          'Internal knowledge search: help teams find procedures, policies, and project context faster.',
          'Follow-up reminders: trigger the next action when the customer or internal owner has gone quiet.',
          'Report summaries: convert operational data into concise updates for managers and founders.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'The pattern is simple: define the operating friction, redesign the handoff, then add AI where it increases capacity or consistency. AI should improve the system, not hide the absence of one.',
      },
      {
        type: 'heading',
        content: 'The ARC Way',
      },
      {
        type: 'paragraph',
        content:
          'Hive Vault Arc uses ARC - Assess, Re-engineer, Command - to keep AI implementation tied to the operating model.',
      },
      {
        type: 'subheading',
        content: 'Assess',
      },
      {
        type: 'paragraph',
        content:
          'Map the current workflow, data sources, risks, bottlenecks, owners, and measurable goal. The first deliverable is clarity: what is broken, what should change, and what must not be automated without human judgment.',
      },
      {
        type: 'subheading',
        content: 'Re-engineer',
      },
      {
        type: 'paragraph',
        content:
          'Redesign the workflow and build only the AI, software, integration, or cloud layer that improves the operating model. In a Moroccan SME, that might mean WhatsApp-native intake connected to CRM fields, calendar routing, and clear human escalation rules.',
      },
      {
        type: 'subheading',
        content: 'Command',
      },
      {
        type: 'paragraph',
        content:
          'Monitor the production system after launch. Review response quality, missed cases, escalation patterns, data accuracy, and business outcomes. AI systems need operating ownership because the business changes, the data changes, and customer behavior changes.',
      },
      {
        type: 'heading',
        content: 'Signs You Are Ready For AI',
      },
      {
        type: 'list',
        items: [
          'The workflow can be described in plain language from start to finish.',
          'The business knows the bottleneck it wants to remove.',
          'The source of truth is known and trusted enough for the first pilot.',
          'A human escalation rule exists for exceptions, complaints, risk, and uncertainty.',
          'The success metric is measurable before and after launch.',
          'The first use case is narrow enough for a 30 to 90 day pilot.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'This is especially important for AI automation for SMEs. Smaller teams often feel the pain of fragmented tools more sharply because the owner, manager, or best salesperson becomes the hidden operating system. AI can help, but only after that hidden process is made visible.',
      },
      {
        type: 'heading',
        content: 'Closing Point of View',
      },
      {
        type: 'paragraph',
        content:
          'The companies that win with AI will not be the companies that add the most tools. They will be the companies that redesign the work, then use AI to make the redesigned system faster, more consistent, and easier to operate.',
      },
      {
        type: 'paragraph',
        content:
          'That is why the first step in an AI workflow automation strategy is not a model, a prompt, or a vendor. It is operational clarity.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Should a business add AI before fixing its workflow?',
            answer:
              'No. A business should understand and redesign the workflow first. AI performs best when the process, data, ownership, escalation rules, and success metrics are already clear.',
          },
          {
            question: 'What should be prepared before implementing an AI agent?',
            answer:
              'Prepare the workflow map, data source, owner for each step, escalation rules, success metric, and risk boundary for decisions AI should not make alone.',
          },
          {
            question: 'What is the safest first AI use case for an SME?',
            answer:
              'The safest first use case is narrow, repetitive, measurable, and easy to escalate. Examples include first response, lead qualification, appointment routing, CRM updates, or FAQ handling.',
          },
          {
            question: 'How does Hive Vault Arc approach AI implementation?',
            answer:
              'Hive Vault Arc uses ARC: Assess the workflow and risk, Re-engineer the process and system layer, then Command the production system through monitoring, tuning, and continuous improvement.',
          },
        ],
      },
    ],
  },
];

export function getAllPerspectives(): Promise<Perspective[]> {
  return withSanityFallback(getAllSanityPerspectives, () => PERSPECTIVES, 'perspective');
}

export async function getPerspectiveBySlug(slug: string): Promise<Perspective> {
  const perspective = await withSanityFallback(
    () => getSanityPerspectiveBySlug(slug),
    () => PERSPECTIVES.find((item) => item.slug === slug) ?? null,
    'perspective'
  );
  if (!perspective) {
    throw new Error(`Perspective not found: ${slug}`);
  }

  return perspective;
}

export async function getRelatedPerspectives(currentSlug: string, limit = 3): Promise<Perspective[]> {
  const perspectives = await getAllPerspectives();
  return perspectives.filter((perspective) => perspective.slug !== currentSlug).slice(0, limit);
}
