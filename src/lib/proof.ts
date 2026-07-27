import {
  getAllSanityCaseStudies,
  getSanityClientEvidenceShowcase,
  getSanityCaseStudyBySlug,
} from './sanity-content';
import type { ContentSeo } from './content-seo';
import type {AppLocale} from '@/i18n/config';
import type {LocalizedContentMeta} from './localized-content';
import {getPublishedCollection, getPublishedDocument} from './localized-content';
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
  coverImage?: string;
  coverImageAlt?: string;
};

export type CaseStudyProjectMediaPlacement =
  | 'afterChallenge'
  | 'afterArchitecture'
  | 'afterModules';

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
  caption?: string;
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

export type CaseStudy = LocalizedContentMeta & {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  summary: string;
  problem: string;
  systemArchitecture: string;
  operationalModules: string[];
  integrations: string[];
  deploymentStatus: string;
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
    deploymentStatus: 'Live in production since October 2025',
    publishedOutcomes: [],
    projectMedia: [],
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
    deploymentStatus: 'Live operational rollout since May 2025',
    publishedOutcomes: [],
    projectMedia: [],
    hasClientEvidence: false,
    assets: {
      coverImage: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp',
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
      keywords: ['ImmoWorld', 'real estate CRM', 'CRM operating system', 'case study'],
      noIndex: false,
    },
  },
];

export function getAllCaseStudies(locale: AppLocale = 'en'): Promise<CaseStudy[]> {
  return withSanityFallback(
    () => getAllSanityCaseStudies(locale),
    () => (locale === 'en' ? CASE_STUDIES : []),
    'case studies',
  );
}

export function getClientEvidenceShowcase(
  locale: AppLocale = 'en'
): Promise<ClientEvidenceSummary[]> {
  const fetchEvidence = (targetLocale: AppLocale) =>
    withSanityFallback(
      () => getSanityClientEvidenceShowcase(targetLocale),
      () => [],
      'client evidence',
    );

  if (locale === 'en') return fetchEvidence('en');

  return Promise.all([
    fetchEvidence(locale),
    fetchEvidence('en'),
  ]).then(([localizedEvidence, englishEvidence]) =>
    localizedEvidence.length > 0
      ? localizedEvidence
      : englishEvidence.map((evidence) => applyFrenchCmsFallback(evidence)),
  );
}

export const getCaseStudyBySlug = cache(async function getCaseStudyBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<CaseStudy> {
  const caseStudy = await getPublishedDocument(locale, (targetLocale) =>
    getSanityCaseStudyBySlug(slug, targetLocale),
  );
  if (!caseStudy) {
    throw new Error(`Case study not found: ${slug}`);
  }
  return caseStudy;
});

export async function getRelatedCaseStudies(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<CaseStudy[]> {
  const caseStudies = await getPublishedCollection(locale, getAllCaseStudies);
  return caseStudies.items
    .filter((study) => study.slug !== currentSlug)
    .slice(0, limit);
}

