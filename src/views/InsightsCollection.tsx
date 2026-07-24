'use client';

import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';
import type { InsightCard } from '../lib/insights';
import {useTranslations} from 'next-intl';

type Props = {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  cards: InsightCard[];
  basePath?: string;
};

export default function InsightsCollection({
  eyebrow,
  title,
  titleItalic,
  description,
  cards,
  basePath = '/insights',
}: Readonly<Props>) {
  const t = useTranslations('CollectionUi');
  const items: PageItem[] = cards.map((c) => ({
    href: `${basePath}/${c.slug}`,
    title: c.title,
    excerpt: c.summary,
    tag: c.tag,
    date: c.publishedAt,
    meta: c.readTime,
    coverImage: c.coverImage,
  }));

  return (
    <InsightIndexPage
      eyebrow={eyebrow}
      headline={t('brand')}
      headlineItalic={titleItalic ?? title}
      description={description}
      items={items}
      backHref="/insights"
      emptyMessage={t('collectionEmpty', {title})}
    />
  );
}
