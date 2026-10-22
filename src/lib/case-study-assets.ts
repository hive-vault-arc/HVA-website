import type {AppLocale} from '@/i18n/config';

/** Local image safety nets and disclosures for illustrative case-study media. */
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

const LOCAL_COVER_DISCLOSURES: Record<AppLocale, Record<keyof typeof LOCAL_CASE_STUDY_COVER_FALLBACKS, string>> = {
  en: {
    'multilingual-whatsapp-ai-agent': 'Illustrative workflow reconstruction.',
    'healthcare-ai-receptionist-crm': 'Concept demonstration using synthetic data. Administrative workflow only.',
  },
  fr: {
    'multilingual-whatsapp-ai-agent': 'Reconstitution illustrative du flux de travail.',
    'healthcare-ai-receptionist-crm': 'Démonstration conceptuelle avec données synthétiques. Flux administratif uniquement.',
  },
  es: {
    'multilingual-whatsapp-ai-agent': 'Reconstrucción ilustrativa del flujo de trabajo.',
    'healthcare-ai-receptionist-crm': 'Demostración conceptual con datos sintéticos. Solo flujo administrativo.',
  },
  ar: {
    'multilingual-whatsapp-ai-agent': 'تصوّر توضيحي لسير العمل.',
    'healthcare-ai-receptionist-crm': 'عرض توضيحي ببيانات اصطناعية. لسير العمل الإداري فقط.',
  },
};

export function getLocalCaseStudyDisclosure(slug: string, locale: AppLocale): string | undefined {
  return LOCAL_COVER_DISCLOSURES[locale][slug as keyof typeof LOCAL_CASE_STUDY_COVER_FALLBACKS];
}
