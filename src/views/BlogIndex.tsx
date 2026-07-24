'use client';

import type { BlogPost } from '../lib/blog';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';
import {useTranslations} from 'next-intl';
import type {AppLocale} from '@/i18n/config';

export default function BlogIndex({
  posts,
  contentLocale,
}: {
  readonly posts: BlogPost[];
  readonly contentLocale: AppLocale;
}) {
  const t = useTranslations('BlogIndex');
  const items: PageItem[] = posts.map((p) => ({
    href: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    tag: p.category,
    date: p.publishedAt,
    meta: p.readTime,
    coverImage: p.coverImage || undefined,
    author: p.authors[0]
      ? { name: p.authors[0].name, initials: p.authors[0].initials }
      : undefined,
    sourceLocale: contentLocale,
  }));

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <InsightIndexPage
      eyebrow={t('eyebrow')}
      headline={t('headline')}
      headlineItalic={t('headlineItalic')}
      description={t('description')}
      items={items}
      filters={categories}
      filterKey={(item) => item.tag}
      emptyMessage={t('empty')}
    />
  );
}
