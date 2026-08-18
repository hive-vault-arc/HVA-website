/**
 * Local safety nets used only when a CMS case study has no cover asset.
 * Sanity remains the source of truth whenever an asset is present.
 */
export const LOCAL_CASE_STUDY_COVER_FALLBACKS = {
  'multilingual-whatsapp-ai-agent': {
    image: '/Images/case-studies/immoworld-whatsapp-ai-french-dutch-phone-pair.webp',
    alt: 'Two ImmoWorld WhatsApp workflow screens showing French and Dutch lead conversations in Tangier',
    title: 'Multilingual WhatsApp lead workflow',
    summary:
      'Lead capture, qualification, project matching and visit handoff in one connected workflow.',
    coverDisclosure: 'Illustrative workflow reconstruction.',
    deploymentStatus: '',
  },
  'healthcare-ai-receptionist-crm': {
    image: '/Images/case-studies/healthcare-ai-receptionist-crm.webp',
    alt: 'AI receptionist appointments workspace with a WhatsApp conversation phone on the right',
    title: 'AI Receptionist CRM — Administrative Workflow Demo',
    summary:
      'A synthetic workflow demonstration connecting WhatsApp conversations, appointment availability, reminders, and staff handoff in one reception workspace.',
    coverDisclosure:
      'Concept demonstration using synthetic data. Administrative workflow only.',
    deploymentStatus: 'Concept demonstration using synthetic data',
  },
} as const;

export type LocalCaseStudyCover =
  (typeof LOCAL_CASE_STUDY_COVER_FALLBACKS)[keyof typeof LOCAL_CASE_STUDY_COVER_FALLBACKS];

export function getLocalCaseStudyCover(
  slug: string,
): LocalCaseStudyCover | undefined {
  return LOCAL_CASE_STUDY_COVER_FALLBACKS[
    slug as keyof typeof LOCAL_CASE_STUDY_COVER_FALLBACKS
  ];
}
