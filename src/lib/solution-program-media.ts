export const AI_RECEPTION_PROGRAM_SLUG =
  'ai-reception-and-lead-operations-program';
export const CRM_MODERNIZATION_PROGRAM_SLUG =
  'enterprise-crm-modernization-program';
export const CLOUD_RELIABILITY_PROGRAM_SLUG =
  'cloud-delivery-reliability-stack';

export type SolutionProgramMediaItem = {
  cardImage: string;
  stageImage: string;
  mobileImage: string;
  alt: string;
  cardFit: 'cover' | 'contain';
  stageFit: 'cover' | 'contain';
  mobileFit: 'cover' | 'contain';
  objectPosition: string;
  proofHref?: string;
};

export type SolutionProgramMedia = Record<string, SolutionProgramMediaItem>;

export type CaseStudyMediaRecord = {
  slug: string;
  title: string;
  assets: {
    coverImage: string;
    coverAlt?: string;
  };
};

export function mediaFromCaseStudyRecord(
  study: CaseStudyMediaRecord | undefined,
  fallback: SolutionProgramMediaItem,
): SolutionProgramMediaItem {
  if (!study?.assets.coverImage) return fallback;

  return {
    ...fallback,
    cardImage: study.assets.coverImage,
    stageImage: study.assets.coverImage,
    mobileImage: study.assets.coverImage,
    alt: study.assets.coverAlt || study.title,
    proofHref: `/case-studies/${study.slug}`,
  };
}

export const DEFAULT_SOLUTION_PROGRAM_MEDIA: SolutionProgramMedia = {
  [AI_RECEPTION_PROGRAM_SLUG]: {
    cardImage:
      '/Images/case-studies/immoworld-whatsapp-ai-french-dutch-phone-pair.webp',
    stageImage:
      '/Images/case-studies/immoworld-whatsapp-ai-french-dutch-phone-pair.webp',
    mobileImage:
      '/Images/case-studies/immoworld-whatsapp-ai-french-dutch-phone-pair.webp',
    alt: 'Two ImmoWorld WhatsApp workflow screens showing French and Dutch lead conversations in Tangier',
    cardFit: 'cover',
    stageFit: 'contain',
    mobileFit: 'contain',
    objectPosition: 'center',
    proofHref: '/case-studies/multilingual-whatsapp-ai-agent',
  },
  [CRM_MODERNIZATION_PROGRAM_SLUG]: {
    cardImage:
      '/Images/case-studies/immoworld-crm-operations-cover.webp',
    stageImage:
      '/Images/case-studies/immoworld-crm-operations-cover.webp',
    mobileImage:
      '/Images/case-studies/immoworld-crm-operations-cover.webp',
    alt: 'ImmoWorld real estate projects and operations dashboard',
    cardFit: 'cover',
    stageFit: 'contain',
    mobileFit: 'contain',
    objectPosition: 'center',
    proofHref:
      '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
  },
  [CLOUD_RELIABILITY_PROGRAM_SLUG]: {
    cardImage:
      '/Images/semantic/programs/cloud-reliability-card.webp',
    stageImage:
      '/Images/semantic/programs/cloud-reliability-square.webp',
    mobileImage:
      '/Images/semantic/programs/cloud-reliability-mobile.webp',
    alt: 'Cloud reliability engineer checking redundant server rows, failover equipment, and availability status',
    cardFit: 'cover',
    stageFit: 'cover',
    mobileFit: 'cover',
    objectPosition: 'center',
  },
};
