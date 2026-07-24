export type ProductSystem = {
  name: string;
  category: string;
  modules: string[];
  integrations: string[];
  deliveryModel: string;
  outcomes: string[];
  proofLinks: string[];
};

export const PRODUCT_SYSTEMS: ProductSystem[] = [
  {
    name: 'AI Reception and Lead Operations Program',
    category: 'Consulting-Led AI Program',
    modules: [
      'Multilingual agent runtime',
      'Memory and context layer',
      'Lead scoring',
      'Human escalation workflows',
    ],
    integrations: ['WhatsApp Business API', 'HubSpot', 'Salesforce', 'Google Calendar'],
    deliveryModel:
      'Strategy workshops, build and deployment sprints, then ongoing optimization cycles.',
    outcomes: [
      'Always-on lead capture',
      'Lower response latency',
      'Higher qualified meeting quality',
    ],
    proofLinks: ['/case-studies/multilingual-whatsapp-ai-agent'],
  },
  {
    name: 'Enterprise CRM Modernization Program',
    category: 'Consulting-Led Transformation Program',
    modules: [
      'Pipeline orchestration',
      'Role-based permissions',
      'Automated follow-up sequences',
      'Audit and compliance logs',
    ],
    integrations: ['Meta Ads', 'DocuSign', 'Email automation suites', 'BI connectors'],
    deliveryModel:
      'Domain mapping, phased migration, production rollout, and managed improvement.',
    outcomes: ['Unified data ownership', 'Reduced manual processing', 'Faster sales operations'],
    proofLinks: [
      '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
    ],
  },
  {
    name: 'Cloud Delivery Reliability Stack',
    category: 'Cloud Reliability Program',
    modules: [
      'CI/CD pipeline hardening',
      'Blue-green deployment patterns',
      'Observability dashboards',
      'Security controls',
    ],
    integrations: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions'],
    deliveryModel: 'Reliability audit, remediation sprints, and ongoing SRE collaboration.',
    outcomes: ['Lower deployment risk', 'Faster release cycles', 'Improved uptime posture'],
    proofLinks: ['/capabilities', '/whoarewe/portfolio'],
  },
];
