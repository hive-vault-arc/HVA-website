'use client';

import { getAllCaseStudies } from '../lib/proof';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';

export default function CaseStudies() {
  const allStudies = getAllCaseStudies();

  const items: PageItem[] = allStudies.map((s) => ({
    href: `/case-studies/${s.slug}`,
    title: s.title,
    excerpt: s.summary,
    tag: s.industry,
    meta: s.deploymentStatus,
    coverImage: s.assets.coverImage || undefined,
    metrics: s.measuredOutcomes,
  }));

  const industries = Array.from(new Set(allStudies.map((s) => s.industry)));

  return (
    <InsightIndexPage
      eyebrow="Transformation Proof"
      headline="Consulting-Led"
      headlineItalic="Case Studies"
      description="Each case documents the business challenge, execution architecture, and measurable operating impact — no marketing, just production proof."
      items={items}
      filters={industries}
      filterKey={(item) => item.tag}
      emptyMessage="No case studies in this category yet."
      bottomCta={{
        headline: 'Ready to See How Transformation Looks in Production?',
        subtext: "Start with a discovery call. We'll show you exactly how strategy, architecture, and delivery are aligned in real environments.",
        primaryLabel: 'Start Discovery',
        primaryHref: '/contact',
        secondaryLabel: 'View Solution Programs',
        secondaryHref: '/capabilities/solution-programs',
      }}
    />
  );
}
