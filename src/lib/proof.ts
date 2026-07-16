import {
  getAllSanityCaseStudies,
  getSanityClientEvidenceShowcase,
  getSanityCaseStudyBySlug,
} from './sanity-content';
import type { ContentSeo } from './content-seo';

export type CaseStudyMetric = {
  label: string;
  value: string;
  context: string;
};

export type ClientEvidencePdf = {
  url: string;
  mimeType: string;
  size: number;
};

export type ClientEvidence = {
  documentTitle: string;
  documentLanguage: string;
  issuedOn?: string;
  quoteExcerpt?: string;
  signatoryName?: string;
  signatoryRole?: string;
  testimonialPdf: ClientEvidencePdf;
};

export type ClientEvidenceSummary = {
  slug: string;
  caseStudyTitle: string;
  clientName: string;
  industry: string;
  documentTitle: string;
  documentLanguage: string;
  issuedOn?: string;
  quoteExcerpt?: string;
  signatoryName?: string;
  signatoryRole?: string;
  clientLogo?: string;
  clientLogoAlt: string;
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
  reportingNote?: string;
  measuredOutcomes: CaseStudyMetric[];
  hasClientEvidence: boolean;
  clientEvidence?: ClientEvidence;
  assets: {
    coverImage: string;
    logoLabel: string;
    coverAlt?: string;
    clientLogo?: string;
    clientLogoAlt?: string;
    clientWebsite?: string;
  };
  lastUpdated: string;
  seo?: ContentSeo;
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
    hasClientEvidence: false,
    assets: {
      coverImage: '/Images/case-studies/whatsapp-ai-agent-operations-case-study-morocco.webp',
      logoLabel: 'Atlas Property Group',
    },
    lastUpdated: '2026-03-27',
  },
  {
    slug: 'top-tier-crm-transformation-program-real-estate-operations',
    title: 'ImmoWorld CRM Operating System for Real Estate Operations',
    clientName: 'ImmoWorld',
    industry: 'Luxury Real Estate',
    summary:
      'A CRM operating system for ImmoWorld that centralizes lead intake, buyer-journey pipeline work, team workflows, and operational reporting.',
    problem:
      'Three disconnected tools created data duplication, missed follow-ups, and no reliable reporting layer for leadership decisions.',
    systemArchitecture:
      'A unified CRM operating system with role-based workflows, pipeline stages, follow-up automation, and a reporting layer for the sales and operations teams.',
    operationalModules: ['Lead Intake and Routing', 'Buyer-Journey Pipeline', 'Team Workflow Coordination', 'Operational Reporting'],
    integrations: ['Meta Lead Sync', 'DocuSign', 'Pipeline Automation', 'BI Reporting'],
    deploymentScale: '94 active users across sales, operations, and management',
    deploymentStatus: 'Live operational rollout since May 2025',
    reportingNote:
      'Reported figures describe the current operating record. Supporting measurement definitions and source artifacts will be added as this case-study record is finalized.',
    measuredOutcomes: [
      {
        label: 'Active Users',
        value: '94',
        context: 'Active user footprint across sales, operations, and management.',
      },
      {
        label: 'Monthly Pipeline Tracked',
        value: '$2.4M',
        context: 'Pipeline value monitored in the operational dashboard each month.',
      },
      {
        label: 'Manual Data Entry',
        value: '-40%',
        context: 'Reported reduction after workflow templates and automated follow-up.',
      },
    ],
    hasClientEvidence: false,
    assets: {
      coverImage: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp',
      coverAlt: 'ImmoWorld real estate CRM operating system engagement',
      logoLabel: 'ImmoWorld Luxury Real Estate',
      clientLogo: '/Images/trustedby/logo.png',
      clientLogoAlt: 'ImmoWorld Luxury Real Estate logo',
      clientWebsite: 'https://immoworld.ma/',
    },
    lastUpdated: '2026-07-10',
    seo: {
      title: 'ImmoWorld CRM Operating System | Case Study',
      description:
        'How Hive Vault Arc supported ImmoWorld with a unified CRM operating system for lead intake, pipeline management, team workflows, and reporting.',
      keywords: ['ImmoWorld', 'real estate CRM', 'CRM operating system', 'case study'],
      noIndex: false,
    },
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
    proofLinks: ['/case-studies/top-tier-crm-transformation-program-real-estate-operations'],
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

export function getClientEvidenceShowcase(): Promise<ClientEvidenceSummary[]> {
  return getSanityClientEvidenceShowcase();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const caseStudy = await getSanityCaseStudyBySlug(slug);
  if (!caseStudy) {
    throw new Error(`Case study not found: ${slug}`);
  }
  return caseStudy;
}

export async function getRelatedCaseStudies(currentSlug: string, limit = 3): Promise<CaseStudy[]> {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.filter((study) => study.slug !== currentSlug).slice(0, limit);
}

