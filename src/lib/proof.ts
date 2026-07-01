import {
  getAllSanityCaseStudies,
  getRelatedSanityCaseStudies,
  getSanityCaseStudyBySlug,
} from './sanity-content';

export type CaseStudyMetric = {
  label: string;
  value: string;
  context: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  summary: string;
  problem: string;
  systemArchitecture: string;
  operationalModules: string[];
  integrations: string[];
  deploymentScale: string;
  deploymentStatus: string;
  measuredOutcomes: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  assets: {
    coverImage: string;
    logoLabel: string;
    coverAlt?: string;
  };
  lastUpdated: string;
};

export type ProductSystem = {
  name: string;
  category: string;
  modules: string[];
  integrations: string[];
  deliveryModel: string;
  outcomes: string[];
  proofLinks: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'multilingual-whatsapp-ai-agent',
    title: 'Multilingual WhatsApp AI Agent for Lead Operations',
    clientName: 'Atlas Property Group',
    industry: 'Real Estate',
    summary:
      'Built a production AI WhatsApp agent with persistent memory, automated scheduling, lead qualification, and CRM pipeline updates in real time.',
    problem:
      'Inbound leads were handled manually across WhatsApp and phone. The client was losing after-hours opportunities and spending too much time on repetitive triage.',
    systemArchitecture:
      'Event-driven AI orchestration with multilingual NLU, memory store, intent routing, and escalation policies for human takeover.',
    operationalModules: ['Customer Operations Engine', 'Automation and Orchestration Layer', 'Revenue and Pipeline Control'],
    integrations: ['WhatsApp Business API', 'HubSpot', 'Google Calendar', 'n8n workflow runner', 'PostgreSQL'],
    deploymentScale: '6 regions, 24/7 operation, 12-language support',
    deploymentStatus: 'Live in production since October 2025',
    measuredOutcomes: [
      {
        label: 'Lead Response Time',
        value: '< 18 seconds',
        context: 'Average first-response latency measured over last 90 days.',
      },
      {
        label: 'Manual Triage Reduction',
        value: '85%',
        context: 'Measured from baseline support workload before launch.',
      },
      {
        label: 'Qualified Meetings Booked',
        value: '+43%',
        context: 'Quarter-over-quarter increase in sales-qualified appointments.',
      },
    ],
    testimonial: {
      quote:
        'Hive Vault Arc shipped a system that answers faster than our sales desk, updates the CRM automatically, and keeps context across conversations.',
      author: 'Nadia El Idrissi',
      role: 'Head of Growth, Atlas Property Group',
    },
    assets: {
      coverImage: '/Images/case-studies/whatsapp-ai-agent-operations-case-study-morocco.webp',
      logoLabel: 'Atlas Property Group',
    },
    lastUpdated: '2026-03-27',
  },
  {
    slug: 'zoho-grade-crm-platform',
    title: 'Zoho-Grade CRM Transformation Program for Real Estate Operations',
    clientName: 'Capstone Living Morocco',
    industry: 'Real Estate',
    summary:
      'Engineered a full CRM operating system with pipeline stages, role-based workflows, audit trails, and automated follow-up orchestration.',
    problem:
      'Three disconnected tools created data duplication, missed follow-ups, and no reliable reporting layer for leadership decisions.',
    systemArchitecture:
      'Modular CRM architecture with domain-driven entities, workflow engine, event logs, and permissions by department.',
    operationalModules: ['Revenue and Pipeline Control', 'Automation and Orchestration Layer', 'Executive Decision Intelligence'],
    integrations: ['Meta Ads Lead Sync', 'HubSpot migration bridge', 'DocuSign', 'Twilio', 'Power BI'],
    deploymentScale: '94 active users across sales, operations, and management',
    deploymentStatus: 'Live in production since May 2025',
    measuredOutcomes: [
      {
        label: 'Pipeline Visibility',
        value: '100%',
        context: 'All active deals tracked from first touch to closing.',
      },
      {
        label: 'Data Entry Time',
        value: '-40%',
        context: 'Time saved through workflow automation and templates.',
      },
      {
        label: 'Tracked Deal Volume',
        value: '$2.4M',
        context: 'Monthly pipeline volume monitored in the operational dashboard.',
      },
    ],
    testimonial: {
      quote:
        'This is the first time our sales and operations teams work from one trusted system. Forecast meetings are now based on real-time numbers.',
      author: 'Youssef Bakkali',
      role: 'COO, Capstone Living Morocco',
    },
    assets: {
      coverImage: '/Images/case-studies/zoho-crm-transformation-case-study-morocco.webp',
      logoLabel: 'Capstone Living Morocco',
    },
    lastUpdated: '2026-03-27',
  },
];

export const PRODUCT_SYSTEMS: ProductSystem[] = [
  {
    name: 'AI Reception and Lead Operations Program',
    category: 'Consulting-Led AI Program',
    modules: ['Multilingual agent runtime', 'Memory and context layer', 'Lead scoring', 'Human escalation workflows'],
    integrations: ['WhatsApp Business API', 'HubSpot', 'Salesforce', 'Google Calendar'],
    deliveryModel: 'Strategy workshops, build and deployment sprints, then ongoing optimization cycles.',
    outcomes: ['24/7 lead capture', 'Lower response latency', 'Higher qualified meeting rates'],
    proofLinks: ['/case-studies/multilingual-whatsapp-ai-agent'],
  },
  {
    name: 'Enterprise CRM Modernization Program',
    category: 'Consulting-Led Transformation Program',
    modules: ['Pipeline orchestration', 'Role-based permissions', 'Automated follow-up sequences', 'Audit and compliance logs'],
    integrations: ['Meta Ads', 'DocuSign', 'Email automation suites', 'BI connectors'],
    deliveryModel: 'Domain mapping, phased migration, production rollout, and managed improvement.',
    outcomes: ['Unified data ownership', 'Reduced manual processing', 'Faster sales operations'],
    proofLinks: ['/case-studies/zoho-grade-crm-platform'],
  },
  {
    name: 'Cloud Delivery Reliability Stack',
    category: 'Cloud Reliability Program',
    modules: ['CI/CD pipeline hardening', 'Blue-green deployment patterns', 'Observability dashboards', 'Security controls'],
    integrations: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions'],
    deliveryModel: 'Reliability audit, remediation sprints, and ongoing SRE collaboration.',
    outcomes: ['Lower deployment risk', 'Faster release cycles', 'Improved uptime posture'],
    proofLinks: ['/capabilities', '/whoarewe/portfolio'],
  },
];

export function getAllCaseStudies(): Promise<CaseStudy[]> {
  return getAllSanityCaseStudies();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const caseStudy = await getSanityCaseStudyBySlug(slug);
  if (!caseStudy) {
    throw new Error(`Case study not found: ${slug}`);
  }
  return caseStudy;
}

export function getRelatedCaseStudies(currentSlug: string, limit = 3): Promise<CaseStudy[]> {
  return getRelatedSanityCaseStudies(currentSlug, limit);
}

