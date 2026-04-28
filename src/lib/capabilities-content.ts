import { PRODUCT_SYSTEMS } from './proof';

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
    id: 'ai-systems',
    title: 'AI Systems',
    briefLine: 'Production AI systems for operations, decision velocity, and always-on execution.',
    briefBullets: ['AI agents', 'Workflow automation', 'Decision intelligence'],
    strategicContext:
      'AI becomes competitive advantage only when integrated into day-to-day operations, not isolated pilots.',
    executionContext:
      'We scope operational goals, deploy production agents, and connect every workflow to measurable outcomes.',
    subCapabilities: [
      'AI agent design and deployment',
      'AI workflow orchestration',
      'Decision intelligence automation',
      'AI assistant and copilot systems',
    ],
    relatedOutcomes: ['Faster decisions', 'Lower manual load', '24/7 operational continuity'],
  },
  {
    id: 'business-transformation',
    title: 'Business Transformation',
    briefLine: 'Business and IT modernization programs that redesign operating models for scale.',
    briefBullets: ['Business + IT modernization', 'CRM + operations redesign', 'Transformation governance'],
    strategicContext:
      'Transformation succeeds when business process redesign and technology redesign move together.',
    executionContext:
      'We diagnose bottlenecks, redesign target operations, and run phased rollout across teams and systems.',
    subCapabilities: [
      'Transformation diagnostics',
      'Operating model redesign',
      'CRM and operations transformation',
      'Agile at scale enablement',
      'Business continuity migration planning',
    ],
    relatedOutcomes: ['Higher process consistency', 'Fewer operational bottlenecks', 'Stronger execution discipline'],
  },
  {
    id: 'digital-technology-data',
    title: 'Digital, Technology, and Data',
    briefLine: 'End-to-end digital capability uplift across platforms, maturity, and data foundations.',
    briefBullets: ['Digital transformation', 'Data and analytics', 'Data and digital platform'],
    strategicContext:
      'Digital strategy fails without connected platforms, trusted data, and maturity roadmaps that teams can execute.',
    executionContext:
      'We align digital strategy with platform architecture, analytics foundations, and organizational readiness.',
    subCapabilities: [
      'Digital strategy and transformation',
      'Digital maturity programs',
      'Data and digital platform architecture',
      'Digital ecosystem design',
    ],
    relatedOutcomes: ['Clear digital roadmap', 'Unified data foundations', 'Faster capability scaling'],
  },
  {
    id: 'consulting',
    title: 'Consulting',
    briefLine: 'Strategic advisory that translates business goals into technical execution plans.',
    briefBullets: ['Strategy', 'Architecture', 'Roadmaps'],
    strategicContext:
      'Leadership needs clear decisions on priorities, risk, sequencing, and investment before engineering scales.',
    executionContext:
      'We run executive workshops, architecture reviews, and delivery roadmaps tied to measurable business outcomes.',
    subCapabilities: [
      'Technology strategy advisory',
      'Architecture decision support',
      'Transformation roadmaps',
      'Tech function design',
      'Digital strategy alignment',
    ],
    relatedOutcomes: ['Sharper prioritization', 'Reduced delivery risk', 'Better strategic alignment'],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    briefLine: 'Custom engineering for web, mobile, SaaS, and cloud-native systems.',
    briefBullets: ['Web apps', 'Mobile apps', 'SaaS platforms'],
    strategicContext:
      'Growth requires systems built for operational fit, not generic tooling that creates workflow friction.',
    executionContext:
      'We engineer custom applications, APIs, and cloud systems with reliability, security, and maintainability built in.',
    subCapabilities: [
      'Custom web application engineering',
      'Mobile application development',
      'SaaS platform development',
      'Cloud system engineering',
      'API and integration engineering',
    ],
    relatedOutcomes: ['Faster product delivery', 'Better system fit', 'Sustainable maintainability'],
  },
  {
    id: 'data-growth',
    title: 'Data and Growth',
    briefLine: 'Analytics and growth systems that convert operational data into commercial leverage.',
    briefBullets: ['Analytics', 'Data pipelines', 'Marketing systems'],
    strategicContext:
      'Teams need decision-ready data and growth instrumentation to optimize revenue, efficiency, and acquisition.',
    executionContext:
      'We implement analytics architectures, pipeline governance, and marketing intelligence systems for repeatable growth.',
    subCapabilities: [
      'Executive analytics and dashboards',
      'Data pipeline engineering',
      'Marketing system architecture',
      'Attribution and growth reporting',
    ],
    relatedOutcomes: ['Improved visibility', 'Faster optimization cycles', 'Higher growth efficiency'],
  },
  {
    id: 'cybersecurity-risk',
    title: 'Cybersecurity and Digital Risk',
    briefLine: 'Security and risk controls embedded across transformation and engineering delivery.',
    briefBullets: ['Cybersecurity posture', 'Digital risk controls', 'Security operations'],
    strategicContext:
      'Security cannot be retrofitted after launch; risk controls must be designed into architecture and operations.',
    executionContext:
      'We implement security design patterns, risk monitoring, and governance controls across applications and infrastructure.',
    subCapabilities: [
      'Cybersecurity architecture',
      'Digital risk assessment and mitigation',
      'Identity and access controls',
      'Security monitoring and incident readiness',
    ],
    relatedOutcomes: ['Lower operational risk', 'Stronger compliance posture', 'Resilient delivery operations'],
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Tech',
    briefLine: 'Future-ready capability building through deep tech and Internet of Things programs.',
    briefBullets: ['Emerging technologies', 'Deep tech', 'Internet of Things'],
    strategicContext:
      'Emerging capabilities create early strategic advantage when tied to real operational and market opportunities.',
    executionContext:
      'We validate emerging technology use cases, build prototypes, and operationalize high-value deep tech and IoT paths.',
    subCapabilities: [
      'Emerging technology scouting and pilots',
      'Deep tech solution prototyping',
      'Internet of Things architecture and integration',
      'Sensor and edge data activation',
    ],
    relatedOutcomes: ['Faster innovation cycles', 'New capability options', 'Early-mover advantage'],
  },
];

export const CAPABILITY_BRIEF_SECTIONS: CapabilityBriefSection[] = CAPABILITY_DOMAINS.map((domain) => ({
  id: domain.id,
  title: domain.title,
  summary: domain.briefLine,
  bullets: domain.briefBullets.slice(0, 3),
  landingLinks:
    domain.id === 'ai-systems'
      ? [
          { label: 'AI Agents Tangier', href: '/ai-agents-tangier' },
          { label: 'AI Agents Morocco', href: '/ai-agents-morocco' },
        ]
      : domain.id === 'consulting'
      ? [{ label: 'IT Consulting Tangier', href: '/it-consulting-tangier' }]
      : domain.id === 'engineering'
      ? [{ label: 'Custom Software Morocco', href: '/custom-software-morocco' }]
      : [],
}));

export const CAPABILITY_DETAIL_SECTIONS: CapabilityDetailSection[] = CAPABILITY_DOMAINS;

export const BOT_DELIVERY_MODEL: DeliveryModel = {
  name: 'Build-Operate-Transfer',
  phases: [
    {
      id: 'build',
      title: 'Build',
      detail: 'Design and implement the target system, controls, and integrations required for production.',
    },
    {
      id: 'operate',
      title: 'Operate',
      detail: 'Run and optimize operations with H.V.A-led execution, governance, and performance management.',
    },
    {
      id: 'transfer',
      title: 'Transfer',
      detail: 'Transfer capabilities, documentation, and operating ownership to the client team when ready.',
    },
  ],
  fitCriteria: [
    'Internal team needs staged capability transfer',
    'Operations must stay stable during scale-up',
    'Leadership wants execution certainty before handover',
  ],
};

export const CAPABILITY_ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: '01',
    title: 'Diagnose',
    detail: 'Assess business constraints, process friction, and system readiness with leadership and operators.',
  },
  {
    step: '02',
    title: 'Build',
    detail: 'Design and implement systems, automations, and controls mapped to the approved roadmap.',
  },
  {
    step: '03',
    title: 'Operate',
    detail: 'Run production with optimization loops, governance, and KPI-backed performance ownership.',
  },
  {
    step: '04',
    title: 'Transfer',
    detail: 'Enable client teams to assume ownership through BOT handover or continue managed scaling with H.V.A.',
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


