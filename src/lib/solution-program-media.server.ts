import 'server-only';

import type {AppLocale} from '@/i18n/config';
import {getAllCaseStudies} from './proof';
import {
  AI_RECEPTION_PROGRAM_SLUG,
  CRM_MODERNIZATION_PROGRAM_SLUG,
  DEFAULT_SOLUTION_PROGRAM_MEDIA,
  mediaFromCaseStudyRecord,
  type SolutionProgramMedia,
} from './solution-program-media';

const AI_CASE_STUDY_SLUG = 'multilingual-whatsapp-ai-agent';
const CRM_CASE_STUDY_SLUG =
  'top-tier-crm-transformation-program-real-estate-operations';

export async function getSolutionProgramMedia(
  locale: AppLocale,
): Promise<SolutionProgramMedia> {
  const [localizedStudies, englishStudies] = await Promise.all([
    getAllCaseStudies(locale),
    locale === 'en' ? Promise.resolve([]) : getAllCaseStudies('en'),
  ]);
  const studies = [...localizedStudies, ...englishStudies];
  const findStudy = (slug: string) =>
    studies.find((study) => study.slug === slug);

  return {
    ...DEFAULT_SOLUTION_PROGRAM_MEDIA,
    [AI_RECEPTION_PROGRAM_SLUG]: mediaFromCaseStudyRecord(
      findStudy(AI_CASE_STUDY_SLUG),
      DEFAULT_SOLUTION_PROGRAM_MEDIA[AI_RECEPTION_PROGRAM_SLUG],
    ),
    [CRM_MODERNIZATION_PROGRAM_SLUG]: mediaFromCaseStudyRecord(
      findStudy(CRM_CASE_STUDY_SLUG),
      DEFAULT_SOLUTION_PROGRAM_MEDIA[CRM_MODERNIZATION_PROGRAM_SLUG],
    ),
  };
}
