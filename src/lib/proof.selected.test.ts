import {describe, expect, it} from 'vitest';
import {isSelectedClientCaseStudy, type CaseStudy} from './proof';

describe('selected client case studies', () => {
  it('recognizes the three approved projects by their English translation identity', () => {
    for (const slug of [
      'top-tier-crm-transformation-program-real-estate-operations',
      'premium-advice-training-keepzen-digital-academy',
      'tarik-rami-immobilier',
    ]) {
      expect(isSelectedClientCaseStudy({slug} as CaseStudy)).toBe(true);
      expect(isSelectedClientCaseStudy({
        slug: `localized-${slug}`,
        language: 'ar',
        translationTargets: [{language: 'en', translationStatus: 'approved', slug}],
      } as CaseStudy)).toBe(true);
    }
  });

  it('does not present internal demos or unrelated work as one of the three client projects', () => {
    expect(isSelectedClientCaseStudy({slug: 'healthcare-ai-receptionist-crm'} as CaseStudy)).toBe(false);
    expect(isSelectedClientCaseStudy({slug: 'unrelated-project'} as CaseStudy)).toBe(false);
  });
});
