'use client';

import type { BlogPost } from '../lib/blog';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';
import {useTranslations} from 'next-intl';

export default function BlogIndex({ posts }: { readonly posts: BlogPost[] }) {
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
