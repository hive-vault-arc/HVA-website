import {
  getAllSanityCaseStudies,
  getSanityPortfolioCaseStudies,
  getSanityClientEvidenceShowcase,
  getSanityCaseStudyBySlug,
  getSanityHomeCaseStudyProof,
} from './sanity-content';
import type {ContentSeo} from './content-seo';
import type {AppLocale} from '@/i18n/config';
import type {
  LocalizedContentMeta,
  PublishedCollection,
} from './localized-content';
import {
  buildPublishedCollection,
  getPublishedCollection,
  getPublishedDocument,
} from './localized-content';
import {applyFrenchCmsFallback} from '@/i18n/cms-fallback-fr';
import {withSanityFallback} from '../sanity/lib/fetch';
import {cache} from 'react';
export {PRODUCT_SYSTEMS} from './product-systems';
export type {ProductSystem} from './product-systems';

export type ClientEvidencePdf = {
  url: string;
  mimeType: string;
  size: number;
};

export type ClientEvidenceImage = {
  url: string;
  width: number;
  height: number;
  lqip?: string;
  alt: string;
};

export type ClientEvidence = {
  documentTitle: string;
  documentLanguage: string;
  issuedOn?: string;
  quoteExcerpt?: string;
  signatoryName?: string;
  signatoryRole?: string;
  testimonialPdf?: ClientEvidencePdf;
  testimonialImage?: ClientEvidenceImage;
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
  coverImage?: string;
  coverImageAlt?: string;
};

export type HomeCaseStudyProof = {
  caseStudies: CaseStudy[];
  clientEvidence: ClientEvidenceSummary[];
};

export type PublishedHomeCaseStudyProof = {
  caseStudies: PublishedCollection<CaseStudy>;
  clientEvidence: ClientEvidenceSummary[];
};

export type CaseStudyProjectMediaPlacement =
  'afterChallenge' | 'afterArchitecture' | 'afterModules';

export type CaseStudyProjectMedia = {
  _key: string;
  image: string;
  width: number;
  height: number;
  lqip?: string;
  deviceType: 'desktop' | 'phone';
  placement: CaseStudyProjectMediaPlacement;
  evidenceType: 'deliveredInterface' | 'fixtureBacked' | 'conceptualInterface';
  alt: string;
  disclosure?: string;
  publicationStatus: 'notCleared' | 'approved';
};

export type CaseStudyOutcomeCategory =
  | 'responseTime'
  | 'conversion'
  | 'visibility'
  | 'throughput'
  | 'cycleTime'
  | 'operatingMargin'
  | 'other';

export type CaseStudyOutcome = {
  _key: string;
  scope: 'benchmark' | 'caseStudy';
  category: CaseStudyOutcomeCategory;
  value: string;
  label: string;
  context: string;
};

export type CaseStudyHeadlineMetricValueType =
  | 'number'
  | 'percentage'
  | 'numberRange'
  | 'percentageRange'
  | 'multiplier'
  | 'multiplierRange'
  | 'duration';

export type CaseStudyHeadlineMetricBasis =
  'systemScope' | 'verifiedResult' | 'benchmark';

export type CaseStudyHeadlineMetric = {
  _key: string;
  valueType: CaseStudyHeadlineMetricValueType;
  value?: number;
  minimum?: number;
  maximum?: number;
  unit?: string;
  label: string;
  context: string;
  basis: CaseStudyHeadlineMetricBasis;
};

export type CaseStudyEngagementType =
  | 'customSoftware'
  | 'advisoryTransformation'
  | 'managedOperations'
  | 'hybridDelivery';

export type CaseStudy = LocalizedContentMeta & {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  engagementType: CaseStudyEngagementType;
  summary: string;
  problem: string;
  systemArchitecture: string;
  operationalModules: string[];
  integrations: string[];
  deploymentStatus: string;
  headlineMetrics: CaseStudyHeadlineMetric[];
  publishedOutcomes: CaseStudyOutcome[];
  projectMedia: CaseStudyProjectMedia[];
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
  coverDisclosure?: string;
  lastUpdated: string;
  seo?: ContentSeo;
};

export type CaseStudyShowcaseSummary = Pick<
  CaseStudy,
  'slug' | 'title' | 'clientName' | 'industry' | 'summary'
> & {
  assets: Pick<
    CaseStudy['assets'],
    'coverImage' | 'coverAlt' | 'clientLogo' | 'clientLogoAlt'
  >;
};

export type PortfolioCaseStudy = LocalizedContentMeta &
  Pick<
    CaseStudy,
    | 'slug'
    | 'title'
    | 'clientName'
    | 'industry'
    | 'summary'
    | 'deploymentStatus'
  > & {
    assets: Pick<
      CaseStudy['assets'],
      'coverImage' | 'coverAlt' | 'clientLogo' | 'clientLogoAlt'
    >;
  };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'multilingual-whatsapp-ai-agent',
    title: 'Multilingual WhatsApp lead workflow',
    clientName: 'Atlas Property Group',
    industry: 'Real Estate',
    engagementType: 'customSoftware',
    summary:
      'Lead capture, qualification, project matching and visit handoff in one connected workflow.',
    problem:
      'Inbound leads were handled manually across WhatsApp and phone. The client was losing after-hours opportunities and spending too much time on repetitive triage.',
    systemArchitecture:
      'Event-driven AI orchestration with multilingual NLU, memory store, intent routing, and escalation policies for human takeover.',
    operationalModules: [
      'Customer Operations Engine',
      'Automation and Orchestration Layer',
      'Revenue and Pipeline Control',
    ],
    integrations: [
      'WhatsApp Business API',
      'HubSpot',
      'Google Calendar',
      'n8n workflow runner',
      'PostgreSQL',
    ],
    deploymentStatus: '',
    coverDisclosure: 'Illustrative workflow reconstruction.',
    headlineMetrics: [
      {
        _key: 'agent-runtime',
        valueType: 'number',
        value: 1,
        unit: 'agent',
        label: 'Multilingual entry point',
        context:
          'One governed agent handles reception, triage, and escalation.',
        basis: 'systemScope',
      },
      {
        _key: 'operational-modules',
        valueType: 'number',
        value: 3,
        unit: 'modules',
        label: 'Operational modules',
        context:
          'Functional scope recorded in the approved case-study document.',
        basis: 'systemScope',
      },
      {
        _key: 'connected-systems',
        valueType: 'number',
        value: 5,
        unit: 'systems',
        label: 'Connected systems',
        context: 'Technical connections listed in the delivery scope.',
        basis: 'systemScope',
      },
    ],
    publishedOutcomes: [],
    projectMedia: [],
    hasClientEvidence: false,
    assets: {
      coverImage:
        '/Images/case-studies/immoworld-whatsapp-ai-french-dutch-phone-pair.webp',
      coverAlt:
        'Two ImmoWorld WhatsApp workflow screens showing French and Dutch lead conversations in Tangier',
      logoLabel: 'Atlas Property Group',
    },
    lastUpdated: '2026-03-27',
  },
  {
    slug: 'top-tier-crm-transformation-program-real-estate-operations',
    title: 'ImmoWorld CRM Operating System for Real Estate Operations',
    clientName: 'ImmoWorld',
    industry: 'Luxury Real Estate',
    engagementType: 'customSoftware',
    summary:
      'A CRM operating system for ImmoWorld that centralizes lead intake, buyer-journey pipeline work, team workflows, and operational reporting.',
    problem:
      'Three disconnected tools created data duplication, missed follow-ups, and no reliable reporting layer for leadership decisions.',
    systemArchitecture:
      'A unified CRM operating system with role-based workflows, pipeline stages, follow-up automation, and a reporting layer for the sales and operations teams.',
    operationalModules: [
      'Lead Intake and Routing',
      'Buyer-Journey Pipeline',
      'Team Workflow Coordination',
      'Operational Reporting',
    ],
    integrations: [
      'Meta Lead Sync',
      'DocuSign',
      'Pipeline Automation',
      'BI Reporting',
    ],
    deploymentStatus: 'Live operational rollout since May 2025',
    headlineMetrics: [
      {
        _key: 'throughput-lift',
        valueType: 'multiplierRange',
        minimum: 3,
        maximum: 6,
        label: 'Throughput lift',
        context: 'Sustained throughput improvement within the first 90 days.',
        basis: 'benchmark',
      },
      {
        _key: 'cycle-time-reduction',
        valueType: 'percentageRange',
        minimum: 30,
        maximum: 60,
        label: 'Cycle time reduction',
        context: 'Faster cycles by removing hidden handoffs and rework.',
        basis: 'benchmark',
      },
      {
        _key: 'operating-margin-lift',
        valueType: 'percentageRange',
        minimum: 15,
        maximum: 25,
        label: 'Operating margin lift',
        context: 'Margin expansion through constraint removal and better flow.',
        basis: 'benchmark',
      },
      {
        _key: 'lead-response',
        valueType: 'percentage',
        value: 40,
        label: 'Faster lead response',
        context:
          'Lead response time improved after centralizing intake and follow-up workflows.',
        basis: 'verifiedResult',
      },
      {
        _key: 'tour-to-lease',
        valueType: 'percentage',
        value: 25,
        label: 'Lift in tour-to-lease conversion',
        context:
          'Conversion improved after standardizing the pipeline and follow-up process.',
        basis: 'verifiedResult',
      },
      {
        _key: 'team-visibility',
        valueType: 'percentage',
        value: 100,
        label: 'Real-time visibility across teams',
        context: 'Sales and operations teams share one live operating view.',
        basis: 'verifiedResult',
      },
    ],
    publishedOutcomes: [],
    projectMedia: [],
    hasClientEvidence: false,
    assets: {
      coverImage:
        '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp',
      coverAlt: 'ImmoWorld real estate CRM operating system engagement',
      logoLabel: 'ImmoWorld Luxury Real Estate',
      clientLogo: '/Images/trustedby/logo.webp',
      clientLogoAlt: 'ImmoWorld Luxury Real Estate logo',
      clientWebsite: 'https://immoworld.ma/',
    },
    lastUpdated: '2026-07-10',
    seo: {
      title: 'ImmoWorld CRM Operating System | Case Study',
      description:
        'How Hive Vault Arc supported ImmoWorld with a unified CRM operating system for lead intake, pipeline management, team workflows, and reporting.',
      keywords: [
        'ImmoWorld',
        'real estate CRM',
        'CRM operating system',
        'case study',
      ],
      noIndex: false,
    },
  },
  {
    slug: 'healthcare-ai-receptionist-crm',
    title: 'AI Receptionist CRM — Administrative Workflow Demo',
    clientName: 'H.V.A. Demo',
    industry: 'Healthcare & Life Sciences',
    engagementType: 'customSoftware',
    summary:
      'A synthetic workflow demonstration connecting WhatsApp conversations, appointment availability, reminders, and staff handoff in one reception workspace.',
    problem:
      'Reception teams need a clear administrative view of incoming conversations, appointment requests, confirmations, and the moments that require staff review.',
    systemArchitecture:
      'A demonstration workflow connects a WhatsApp-style conversation, availability checks, appointment creation, reminders, and an explicit human handoff without making clinical decisions.',
    operationalModules: [
      'Conversation and reception queue',
      'Appointment availability and scheduling',
      'Reminder and staff handoff controls',
    ],
    integrations: [
      'WhatsApp-style conversation interface',
      'Appointment scheduling workspace',
      'Human reception review',
    ],
    deploymentStatus: 'Concept demonstration using synthetic data',
    coverDisclosure:
      'Concept demonstration using synthetic data. Administrative workflow only.',
    headlineMetrics: [],
    publishedOutcomes: [],
    projectMedia: [],
    hasClientEvidence: false,
    assets: {
      coverImage:
        '/Images/case-studies/healthcare-ai-receptionist-crm.webp',
      coverAlt:
        'AI receptionist appointments workspace with a WhatsApp conversation phone on the right',
      logoLabel: 'H.V.A. Demo',
    },
    lastUpdated: '2026-08-16',
    seo: {
      title: 'AI Receptionist CRM — Administrative Workflow Demo | Case Study',
      description:
        'A synthetic H.V.A. demonstration of an AI receptionist administrative workflow for conversations, appointment scheduling, reminders, and staff handoff.',
      keywords: [
        'AI receptionist demo',
        'administrative workflow',
        'appointment scheduling',
        'healthcare operations software',
      ],
      noIndex: true,
    },
  },
];

export function getAllCaseStudies(
  locale: AppLocale = 'en',
): Promise<CaseStudy[]> {
  return withSanityFallback(
    () => getAllSanityCaseStudies(locale),
    () => (locale === 'en' ? CASE_STUDIES : []),
    'case studies',
  );
}

function getHomeCaseStudyProof(locale: AppLocale): Promise<HomeCaseStudyProof> {
  return withSanityFallback(
    () => getSanityHomeCaseStudyProof(locale),
    () => ({
      caseStudies: locale === 'en' ? CASE_STUDIES : [],
      clientEvidence: [],
    }),
    'homepage proof',
  );
}

export async function getPublishedHomeCaseStudyProof(
  locale: AppLocale = 'en',
): Promise<PublishedHomeCaseStudyProof> {
  if (locale === 'en') {
    const proof = await getHomeCaseStudyProof('en');
    return {
      caseStudies: buildPublishedCollection('en', [], proof.caseStudies),
      clientEvidence: proof.clientEvidence,
    };
  }

  const [localizedProof, englishProof] = await Promise.all([
    getHomeCaseStudyProof(locale),
    getHomeCaseStudyProof('en'),
  ]);

  return {
    caseStudies: buildPublishedCollection(
      locale,
      localizedProof.caseStudies,
      englishProof.caseStudies,
    ),
    clientEvidence:
      localizedProof.clientEvidence.length > 0
        ? localizedProof.clientEvidence
        : englishProof.clientEvidence.map((evidence) =>
            applyFrenchCmsFallback(evidence),
          ),
  };
}

function toPortfolioCaseStudy(study: CaseStudy): PortfolioCaseStudy {
  return {
    _id: study._id,
    language: study.language,
    translationStatus: study.translationStatus,
    translationTargets: study.translationTargets,
    slug: study.slug,
    title: study.title,
    clientName: study.clientName,
    industry: study.industry,
    summary: study.summary,
    deploymentStatus: study.deploymentStatus,
    assets: {
      coverImage: study.assets.coverImage,
      coverAlt: study.assets.coverAlt,
      clientLogo: study.assets.clientLogo,
      clientLogoAlt: study.assets.clientLogoAlt,
    },
  };
}

export function getPortfolioCaseStudies(
  locale: AppLocale = 'en',
): Promise<PortfolioCaseStudy[]> {
  return withSanityFallback(
    () => getSanityPortfolioCaseStudies(locale),
    () => (locale === 'en' ? CASE_STUDIES.map(toPortfolioCaseStudy) : []),
    'portfolio case studies',
  );
}

export function getClientEvidenceShowcase(
  locale: AppLocale = 'en',
): Promise<ClientEvidenceSummary[]> {
  const fetchEvidence = (targetLocale: AppLocale) =>
    withSanityFallback(
      () => getSanityClientEvidenceShowcase(targetLocale),
      () => [],
      'client evidence',
    );

  if (locale === 'en') return fetchEvidence('en');

  return Promise.all([fetchEvidence(locale), fetchEvidence('en')]).then(
    ([localizedEvidence, englishEvidence]) =>
      localizedEvidence.length > 0
        ? localizedEvidence
        : englishEvidence.map((evidence) => applyFrenchCmsFallback(evidence)),
  );
}

export const getCaseStudyBySlug = cache(async function getCaseStudyBySlug(
  slug: string,
  locale: AppLocale = 'en',
): Promise<CaseStudy> {
  const caseStudy = await getPublishedDocument(locale, (targetLocale) =>
    getSanityCaseStudyBySlug(slug, targetLocale),
  );
  if (caseStudy) return caseStudy;

  const localCaseStudy = CASE_STUDIES.find((study) => study.slug === slug);
  if (localCaseStudy) {
    return locale === 'fr'
      ? applyFrenchCmsFallback(localCaseStudy)
      : localCaseStudy;
  }

  throw new Error(`Case study not found: ${slug}`);
});

export async function getRelatedCaseStudies(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en',
): Promise<CaseStudy[]> {
  const caseStudies = await getPublishedCollection(locale, getAllCaseStudies);
  return caseStudies.items
    .filter((study) => study.slug !== currentSlug)
    .slice(0, limit);
}
