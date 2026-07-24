import {PRODUCT_SYSTEMS} from './product-systems';

export type CapabilityDomain = {
  id: string;
  title: string;
  briefLine: string;
  briefBullets: string[];
  strategicContext: string;
  executionContext: string;
  subCapabilities: string[];
  relatedOutcomes: string[];
};

export type DeliveryModel = {
  name: string;
  phases: { id: string; title: string; detail: string }[];
  fitCriteria: string[];
};

export type CapabilityBriefSection = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  landingLinks: { label: string; href: string }[];
};

export type CapabilityDetailSection = CapabilityDomain;

export type EngagementStep = {
  step: string;
  title: string;
  detail: string;
};

export type SolutionProgramDetail = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  modules: string[];
  integrations: string[];
  deliveryModel: string;
  outcomes: string[];
  proofLinks: string[];
};

export const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'strategy-business',
    title: 'Strategy & Business Consulting',
    briefLine: 'The thinking layer — diagnosing, defining, and designing transformation before a line of code is written.',
    briefBullets: ['Business transformation', 'Digital transformation', 'Operational excellence'],
    strategicContext:
      'Transformation succeeds when the business model, operating model, and technology architecture move together from the first decision.',
    executionContext:
      'We run diagnostics, design target operating models, build technology roadmaps, and sequence transformation programs that leadership and operators can execute.',
    subCapabilities: [
      'Business and digital transformation strategy',
      'Operational diagnostics and process redesign',
      'Innovation strategy and market expansion via technology',
      'Organizational redesign and change management',
      'Cost optimization and operational excellence',
    ],
    relatedOutcomes: ['Sharper prioritization', 'Reduced delivery risk', 'Clearer transformation sequencing'],
  },
  {
    id: 'technology-consulting',
    title: 'Technology Consulting',
    briefLine: 'The architecture layer — designing systems that last before building them.',
    briefBullets: ['Enterprise architecture', 'Technology roadmaps', 'Systems integration'],
    strategicContext:
      'Architecture decisions made early compound positively. Architecture decisions deferred compound into technical debt.',
    executionContext:
      'We design the technology blueprint, sequence the roadmap, select platforms, and connect fragmented tools so data and workflows move without friction.',
    subCapabilities: [
      'Enterprise architecture and technology roadmaps',
      'Platform strategy — build vs. buy vs. agent',
      'IT modernization and legacy system replacement',
      'Systems integration and digital workplace design',
      'Infrastructure modernization for cloud, AI, and scale',
    ],
    relatedOutcomes: ['Systems built to last', 'Reduced integration debt', 'Technology that serves the business over the long term'],
  },
  {
    id: 'ai-data-analytics',
    title: 'AI, Data & Analytics',
    briefLine: 'The intelligence layer — where Hive Vault Arc is deepest: AI engineering, not just AI consulting.',
    briefBullets: ['AI agents', 'Generative AI engineering', 'Predictive analytics'],
    strategicContext:
      'AI becomes competitive advantage only when integrated into day-to-day operations at the channel clients already live in — not isolated in a pilot dashboard.',
    executionContext:
      'We scope operational goals, deploy production AI agents, build data infrastructure, and connect every workflow to measurable outcomes — including WhatsApp, Morocco\'s primary B2B channel.',
    subCapabilities: [
      'AI agent design and deployment',
      'Generative AI strategy and engineering',
      'Machine learning and predictive analytics',
      'Data engineering, warehouses, and pipelines',
      'Business intelligence and executive dashboards',
      'Conversational AI and WhatsApp agent systems',
      'MLOps and AI production operations',
    ],
    relatedOutcomes: ['Faster decisions', 'Lower manual load', 'Continuous operational coverage'],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering & Product Development',
    briefLine: 'The build layer — production-grade systems, not prototypes.',
    briefBullets: ['Custom software', 'SaaS platforms', 'Web and mobile applications'],
    strategicContext:
      'Growth requires systems built for operational fit, not generic tooling that creates workflow friction and scales the wrong behaviors.',
    executionContext:
      'We engineer custom applications, SaaS platforms, APIs, and mobile apps with reliability, security, and maintainability built in — sprint-based, with CI/CD from day one.',
    subCapabilities: [
      'Custom software development — bespoke systems for the exact problem',
      'SaaS platform development — multi-tenant, subscription-based',
      'Web application engineering (Next.js, React)',
      'Mobile application development (React Native, Expo)',
      'API development and deep integration engineering',
      'UX/UI engineering — design wired to the actual frontend',
      'DevOps, CI/CD, and platform engineering',
    ],
    relatedOutcomes: ['Faster product delivery', 'Better system fit', 'Sustainable maintainability'],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    briefLine: 'The foundation layer — built for scale, security, and resilience.',
    briefBullets: ['Cloud migration', 'Security architecture', 'Infrastructure automation'],
    strategicContext:
      'Security and infrastructure cannot be retrofitted after launch. Risk controls, zero-trust design, and observability must be designed in from the start.',
    executionContext:
      'We migrate, design cloud-native systems, automate infrastructure, implement zero-trust security, and deliver observability from day one — no manual infrastructure.',
    subCapabilities: [
      'AWS, Azure, and GCP cloud migration and native development',
      'Infrastructure automation with Terraform and IaC',
      'Security architecture, zero-trust design, and secrets management',
      'Disaster recovery — RTO/RPO planning and multi-region failover',
      'Observability, logging, tracing, and alerting',
      'Managed cloud services and cost optimization',
      'Cybersecurity posture and digital risk assessment',
    ],
    relatedOutcomes: ['Lower operational risk', 'Stronger compliance posture', 'Resilient production systems'],
  },
  {
    id: 'operations-managed',
    title: 'Operations & Managed Services',
    briefLine: 'The evolution layer — we stay after go-live, because that\'s where transformation actually happens.',
    briefBullets: ['Managed operations', 'Application maintenance', 'AI system management'],
    strategicContext:
      'Most transformation programs fail at the handoff. Advisory firms advise, then leave after the deck. Agencies ship and disappear. Hive Vault Arc eliminates the handoff — same team, strategy through production.',
    executionContext:
      'We provide ongoing ownership of the systems we build — monitoring, evolving, and operating them as a long-term partner, not a vendor.',
    subCapabilities: [
      'Managed operations — ongoing ownership post-launch',
      'Application maintenance, performance tuning, and feature expansion',
      'Automation and AI system management and evolution',
      'IT support and helpdesk (L1/L2) for internal digital systems',
      'Business process outsourcing and shared services',
    ],
    relatedOutcomes: ['Stable production operations', 'Continuous improvement post-launch', 'Long-term partnership accountability'],
  },
];

export const CAPABILITY_BRIEF_SECTIONS: CapabilityBriefSection[] = CAPABILITY_DOMAINS.map((domain) => ({
  id: domain.id,
  title: domain.title,
  summary: domain.briefLine,
  bullets: domain.briefBullets.slice(0, 3),
  landingLinks:
    domain.id === 'ai-data-analytics'
      ? [
          { label: 'AI Agents Tangier', href: '/ai-agents-tangier' },
          { label: 'AI Agents Morocco', href: '/ai-agents-morocco' },
        ]
      : domain.id === 'technology-consulting'
      ? [{ label: 'IT Consulting Tangier', href: '/it-consulting-tangier' }]
      : domain.id === 'software-engineering'
      ? [{ label: 'Custom Software Morocco', href: '/custom-software-morocco' }]
      : [],
}));

export const CAPABILITY_DETAIL_SECTIONS: CapabilityDetailSection[] = CAPABILITY_DOMAINS;

export const BOT_DELIVERY_MODEL: DeliveryModel = {
  name: 'ARC — Assess · Re-engineer · Command',
  phases: [
    {
      id: 'assess',
      title: 'Assess',
      detail: 'Assess operating constraints, technology readiness, business priorities, and the transformation path.',
    },
    {
      id: 're-engineer',
      title: 'Re-engineer',
      detail: 'Redesign processes, architecture, systems, and delivery controls around the approved target state.',
    },
    {
      id: 'command',
      title: 'Command',
      detail: 'Run, stabilize, monitor, and improve the production operation with long-term accountability.',
    },
  ],
  fitCriteria: [
    'Client needs strategy and build delivered by the same team',
    'Operations must remain stable while transformation scales',
    'Leadership wants execution certainty with long-term operating accountability',
  ],
};

export const CAPABILITY_ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: '01',
    title: 'Assess',
    detail: 'Assess business constraints, process friction, and system readiness with leadership and operators.',
  },
  {
    step: '02',
    title: 'Re-engineer',
    detail: 'Design and implement processes, systems, automations, and controls mapped to the approved roadmap.',
  },
  {
    step: '03',
    title: 'Command',
    detail: 'Run production with optimization loops, governance, and KPI-backed performance ownership.',
  },
];

const PROGRAM_SUMMARIES: Record<string, string> = {
  'AI Reception and Lead Operations Program':
    'Deploy multilingual AI reception and lead operations as a daily operating capability, not a one-off automation.',
  'Enterprise CRM Modernization Program':
    'Transform fragmented CRM operations into one governed system with reliable pipeline and process ownership.',
  'Cloud Delivery Reliability Stack':
    'Stabilize release velocity with hardened infrastructure, deployment safety, observability, and security controls.',
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const CAPABILITY_SOLUTION_PROGRAM_DETAILS: SolutionProgramDetail[] = PRODUCT_SYSTEMS.map((program) => ({
  slug: slugify(program.name),
  name: program.name,
  category: program.category,
  summary:
    PROGRAM_SUMMARIES[program.name] ??
    'Consulting-led program that combines architecture decisions, delivery execution, and long-term operational ownership.',
  modules: program.modules,
  integrations: program.integrations,
  deliveryModel: program.deliveryModel,
  outcomes: program.outcomes,
  proofLinks: program.proofLinks,
}));


