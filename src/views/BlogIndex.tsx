'use client';

import { getAllPosts } from '../lib/blog';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';

export default function BlogIndex() {
  const allPosts = getAllPosts();

  const items: PageItem[] = allPosts.map((p) => ({
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

  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  return (
    <InsightIndexPage
      eyebrow="Strategy + Execution Journal"
      headline="Hive Vault Arc"
      headlineItalic="Consulting Briefing"
      description="An editorial collection of insights on AI agents, custom software, and the architecture of modern business operations — written for CEOs, COOs, and leadership teams in Morocco and beyond."
      items={items}
      filters={categories}
      filterKey={(item) => item.tag}
      emptyMessage="No articles in this category yet."
    />
  );
}
