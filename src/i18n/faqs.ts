import {getTranslations} from 'next-intl/server';
import type {FaqItem} from '@/data/faqs';
import type {AppLocale} from './config';

export type FaqKey =
  | 'home'
  | 'capabilities'
  | 'about'
  | 'contact'
  | 'portfolio'
  | 'arc'
  | 'aiAgentsTangier'
  | 'aiAgentsMorocco'
  | 'itConsultingTangier'
  | 'customSoftwareMorocco'
  | 'digitalServicesTangier';

export async function getLocalizedFaqs(
  locale: AppLocale,
  key: FaqKey,
): Promise<{heading: string; items: FaqItem[]}> {
  const t = await getTranslations({locale, namespace: 'Faqs'});
  return {
    heading: t(`${key}.heading`),
    items: t.raw(`${key}.items`) as FaqItem[],
  };
}
