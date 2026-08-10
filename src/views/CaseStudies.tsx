'use client';

import {useTranslations} from 'next-intl';

import InsightIndexPage from '@/components/InsightIndexPage';
import type {
  InsightIndustry,
  PaginatedInsightCollection,
} from '@/lib/insight-collection-pagination';

export default function CaseStudies({
  initialPage,
  industries,
}: {
  readonly initialPage: PaginatedInsightCollection;
  readonly industries: InsightIndustry[];
}) {
  const t = useTranslations('CaseStudiesIndex');

  return (
    <InsightIndexPage
      collectionType="caseStudy"
      eyebrow={t('eyebrow')}
      headline={t('headline')}
      headlineItalic={t('headlineItalic')}
      description={t('description')}
      initialPage={initialPage}
      industries={industries}
      emptyMessage={t('empty')}
      evidenceLabel={t('evidenceAvailable')}
      bottomCta={{
        headline: t('bottomCta.title'),
        subtext: t('bottomCta.description'),
        primaryLabel: t('bottomCta.primary'),
        primaryHref: '/contact',
        secondaryLabel: t('bottomCta.secondary'),
        secondaryHref: '/capabilities/solution-programs',
      }}
    />
  );
}
