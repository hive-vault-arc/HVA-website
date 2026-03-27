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
        'H.V.A shipped a system that answers faster than our sales desk, updates the CRM automatically, and keeps context across conversations.',
      author: 'Nadia El Idrissi',
      role: 'Head of Growth, Atlas Property Group',
    },
    assets: {
      coverImage: '/Images/custom-ai-agent-morocco.webp',
      logoLabel: 'Atlas Property Group',
    },
    lastUpdated: '2026-03-27',
  },
  {
    slug: 'zoho-grade-crm-platform',
    title: 'Zoho-Grade CRM Operating System for Real Estate Operations',
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
      coverImage: '/Images/custom-crm-system-morocco.webp',
      logoLabel: 'Capstone Living Morocco',
    },
    lastUpdated: '2026-03-27',
  },
  {
    slug: 'executive-analytics-control-tower',
    title: 'Executive Analytics Control Tower for Multi-Site Operations',
    clientName: 'Northline Health Network',
    industry: 'Healthcare Services',
    summary:
      'Delivered a unified analytics and dashboard system combining operational KPIs, agent performance, and revenue intelligence for executives.',
    problem:
      'Leadership had fragmented reports and no single source of truth across clinics, call operations, and billing teams.',
    systemArchitecture:
      'Lakehouse-backed analytics stack with scheduled ETL, semantic KPI layer, and role-aware dashboard delivery.',
    operationalModules: ['Executive Decision Intelligence', 'Cloud Reliability and Security Runtime'],
    integrations: ['BigQuery', 'Power BI', 'Google Sheets ingestion', 'Custom API connectors', 'Slack alerts'],
    deploymentScale: '3 executive teams, 11 clinics, 42 tracked KPI streams',
    deploymentStatus: 'Live in production since January 2026',
    measuredOutcomes: [
      {
        label: 'Reporting Cycle Time',
        value: '-72%',
        context: 'Weekly performance reporting reduced from 11 hours to 3 hours.',
      },
      {
        label: 'KPI Accuracy',
        value: '99.3%',
        context: 'Validated against finance and operations source systems.',
      },
      {
        label: 'Executive Decision Latency',
        value: '-58%',
        context: 'Average time to act on flagged KPI anomalies.',
      },
    ],
    testimonial: {
      quote:
        'The dashboards changed how we run weekly leadership. We now see risk signals early and take action before they become operational incidents.',
      author: 'Dr. Salma Kettani',
      role: 'Director of Operations, Northline Health Network',
    },
    assets: {
      coverImage: '/Images/ai-analytics-dashboard-business.jpg',
      logoLabel: 'Northline Health Network',
    },
    lastUpdated: '2026-03-27',
  },
];

export const PRODUCT_SYSTEMS: ProductSystem[] = [
  {
    name: 'AI Reception & Lead Engine',
    category: 'AI Product System',
    modules: ['Multilingual agent runtime', 'Memory and context layer', 'Lead scoring', 'Human escalation workflows'],
    integrations: ['WhatsApp Business API', 'HubSpot', 'Salesforce', 'Google Calendar'],
    deliveryModel: 'Build + deploy + optimization sprints with monthly performance tuning.',
    outcomes: ['24/7 lead capture', 'Lower response latency', 'Higher qualified meeting rates'],
    proofLinks: ['/case-studies/multilingual-whatsapp-ai-agent'],
  },
  {
    name: 'Enterprise CRM Operating System',
    category: 'AI Business Operating System',
    modules: ['Pipeline orchestration', 'Role-based permissions', 'Automated follow-up sequences', 'Audit and compliance logs'],
    integrations: ['Meta Ads', 'DocuSign', 'Email automation suites', 'BI connectors'],
    deliveryModel: 'Domain mapping, phased migration, and production rollout by team.',
    outcomes: ['Unified data ownership', 'Reduced manual processing', 'Faster sales operations'],
    proofLinks: ['/case-studies/zoho-grade-crm-platform'],
  },
  {
    name: 'Executive Analytics Control Tower',
    category: 'Decision Intelligence System',
    modules: ['ETL orchestration', 'Semantic KPI catalog', 'Executive dashboards', 'Anomaly alerts'],
    integrations: ['BigQuery', 'Power BI', 'Slack', 'Internal APIs'],
    deliveryModel: 'KPI design workshops followed by staged data-product delivery.',
    outcomes: ['Real-time leadership visibility', 'Higher forecasting accuracy', 'Faster operational decisions'],
    proofLinks: ['/case-studies/executive-analytics-control-tower'],
  },
  {
    name: 'Cloud Delivery Reliability Stack',
    category: 'Infrastructure System',
    modules: ['CI/CD pipeline hardening', 'Blue-green deployment patterns', 'Observability dashboards', 'Security controls'],
    integrations: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions'],
    deliveryModel: 'Reliability baseline audit, remediation sprints, and ongoing SRE support.',
    outcomes: ['Lower deployment risk', 'Faster release cycles', 'Improved uptime posture'],
    proofLinks: ['/services', '/portfolio'],
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug);
  if (!caseStudy) {
    throw new Error(`Case study not found: ${slug}`);
  }
  return caseStudy;
}
