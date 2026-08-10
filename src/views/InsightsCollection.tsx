'use client';

import {useTranslations} from 'next-intl';

import InsightIndexPage from '@/components/InsightIndexPage';
import type {
  InsightCollectionType,
  InsightIndustry,
  PaginatedInsightCollection,
} from '@/lib/insight-collection-pagination';

type Props = {
  collectionType: Exclude<InsightCollectionType, 'post' | 'caseStudy'>;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  initialPage: PaginatedInsightCollection;
  industries: InsightIndustry[];
};

export default function InsightsCollection({
  collectionType,
  eyebrow,
  title,
  titleItalic,
  description,
  initialPage,
  industries,
}: Readonly<Props>) {
  const t = useTranslations('CollectionUi');

  return (
    <InsightIndexPage
      collectionType={collectionType}
      eyebrow={eyebrow}
      headline={t('brand')}
      headlineItalic={titleItalic ?? title}
      description={description}
      initialPage={initialPage}
      industries={industries}
      backHref="/insights"
      emptyMessage={t('collectionEmpty', {title})}
    />
  );
}
