import type { Metadata } from 'next';
import InsightsCollection from '../../../views/InsightsCollection';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Perspectives | Point of View',
  description:
    'Strategic perspectives from Hive Vault Arc on transformation governance, operating models, and long-term technology execution.',
  path: '/insights/perspectives',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'digital transformation perspectives',
    'technology consulting point of view',
    'operating model governance insights',
  ]),
});

export default function InsightsPerspectivesPage() {
  return (
    <InsightsCollection
      eyebrow="Insights / Perspectives"
      title="Perspectives"
      description="Editorial viewpoints on how strategy, architecture, and execution should be governed in modern organizations."
      cards={[]}
    />
  );
}
