'use client';

import {useTranslations} from 'next-intl';

import InsightIndexPage from '@/components/InsightIndexPage';
import type {
  InsightIndustry,
  PaginatedInsightCollection,
} from '@/lib/insight-collection-pagination';

export default function BlogIndex({
  initialPage,
  industries,
}: {
  readonly initialPage: PaginatedInsightCollection;
  readonly industries: InsightIndustry[];
}) {
  const t = useTranslations('BlogIndex');
  const collectionT = useTranslations('CollectionUi');

  return (
    <InsightIndexPage
      collectionType="post"
      eyebrow={t('eyebrow')}
      headline={collectionT('brand')}
      headlineItalic={t('headlineItalic')}
      description={t('description')}
      initialPage={initialPage}
      industries={industries}
      emptyMessage={t('empty')}
    />
  );
}
