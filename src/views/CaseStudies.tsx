'use client';

import type { CaseStudy } from '../lib/proof';
import InsightIndexPage, { type PageItem } from '../components/InsightIndexPage';

export default function CaseStudies({ studies }: { readonly studies: CaseStudy[] }) {
  const items: PageItem[] = studies.map((s) => ({
    href: `/case-studies/${s.slug}`,
    title: s.title,
    excerpt: s.summary,
    tag: s.industry,
    meta: s.deploymentStatus,
    coverImage: s.assets.coverImage || undefined,
    metrics: s.measuredOutcomes,
    evidenceLabel: s.hasClientEvidence ? 'Client letter available' : undefined,
  }));

  const industries = Array.from(new Set(studies.map((s) => s.industry)));

  return (
    <InsightIndexPage
      eyebrow="Transformation Proof"
      headline="Consulting-Led"
      headlineItalic="Case Studies"
      description="Each case documents the business challenge, execution architecture, and reported operating context, with evidence notes where documentation is still being completed."
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
