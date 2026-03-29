import { PRODUCT_SYSTEMS } from './proof';

export type ServiceBriefSection = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

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

export const SERVICE_BRIEF_SECTIONS: ServiceBriefSection[] = [
  {
    id: 'strategy',
    title: 'Strategy and Transformation Advisory',
    summary:
      'Executive-level diagnostics, operating model design, and transformation roadmap definition before implementation begins.',
    bullets: ['Operating diagnostics', 'Transformation roadmap', 'Architecture decision support'],
  },
  {
    id: 'ai-automation',
    title: 'AI and Automation Delivery',
    summary:
      'Production AI agents and workflow automation that handle customer operations, reporting cycles, and team handoffs.',
    bullets: ['AI reception and qualification', 'Workflow orchestration', 'Decision intelligence automation'],
  },
  {
    id: 'engineering',
    title: 'Custom Engineering and Product Build',
    summary:
      'Custom web, mobile, and SaaS engineering with deployment ownership, security hardening, and long-term maintainability.',
    bullets: ['Custom software and APIs', 'Mobile and web product delivery', 'Reliability and performance engineering'],
  },
  {
    id: 'modernization',
    title: 'Modernization, Cloud, and Data',
    summary:
      'Legacy modernization, cloud infrastructure, and analytics systems to keep operations measurable and resilient as scale grows.',
    bullets: ['Cloud migration and CI/CD', 'CRM and system modernization', 'Data pipelines and KPI dashboards'],
  },
];

export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: '01',
    title: 'Diagnose',
    detail: 'Assess process friction, data quality, and system constraints with leadership and operators.',
  },
  {
    step: '02',
    title: 'Architect',
    detail: 'Define operating model, solution scope, and technical architecture before development starts.',
  },
  {
    step: '03',
    title: 'Deliver',
    detail: 'Ship in production sprints with integrations, QA controls, and measurable milestone outcomes.',
  },
  {
    step: '04',
    title: 'Evolve',
    detail: 'Maintain and optimize systems through recurring improvement cycles tied to business KPIs.',
  },
];

const PROGRAM_SUMMARIES: Record<string, string> = {
  'AI Reception and Lead Operations Program':
    'Deploy multilingual AI reception and lead operations as a daily operating capability, not a one-off automation.',
  'Enterprise CRM Modernization Program':
    'Transform fragmented CRM operations into one governed system with reliable pipeline and process ownership.',
  'Executive Analytics Control Tower':
    'Give leadership a real-time control layer with trusted KPIs, anomaly visibility, and faster operational decisions.',
  'Cloud Delivery Reliability Stack':
    'Stabilize release velocity with hardened infrastructure, deployment safety, observability, and security controls.',
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const SOLUTION_PROGRAM_DETAILS: SolutionProgramDetail[] = PRODUCT_SYSTEMS.map((program) => ({
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

