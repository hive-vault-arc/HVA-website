'use client';

import type { CaseStudy } from '../lib/proof';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';
import {useTranslations} from 'next-intl';
import type {AppLocale} from '@/i18n/config';

export default function CaseStudies({
  studies,
  contentLocale,
}: {
  readonly studies: CaseStudy[];
  readonly contentLocale: AppLocale;
}) {
  const t = useTranslations('CaseStudiesIndex');
  const items: PageItem[] = studies.map((s) => ({
    href: `/case-studies/${s.slug}`,
    title: s.title,
    excerpt: s.summary,
    tag: s.industry,
    meta: s.deploymentStatus,
    coverImage: s.assets.coverImage || undefined,
    evidenceLabel: s.hasClientEvidence ? t('evidenceAvailable') : undefined,
    sourceLocale: contentLocale,
  }));

  const industries = Array.from(new Set(studies.map((s) => s.industry)));

  return (
    <InsightIndexPage
      eyebrow={t('eyebrow')}
      headline={t('headline')}
      headlineItalic={t('headlineItalic')}
      description={t('description')}
      items={items}
      filters={industries}
      filterKey={(item) => item.tag}
      emptyMessage={t('empty')}
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
