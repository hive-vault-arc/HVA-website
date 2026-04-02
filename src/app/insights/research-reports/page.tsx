import type { Metadata } from 'next';
import InsightsCollection from '../../../views/InsightsCollection';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Research Reports | Data-Backed Transformation Analysis',
  description:
    'Research reports from H.V.A covering AI operations, transformation execution benchmarks, and cloud reliability readiness.',
  path: '/insights/research-reports',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'digital transformation research report',
    'AI operations benchmark',
    'cloud reliability readiness report',
  ]),
});

export default function InsightsResearchReportsPage() {
  return (
    <InsightsCollection
      eyebrow="Insights / Research Reports"
      title="Research Reports"
      description="Data-backed reports designed to help executives evaluate technology strategy and execution maturity."
      cards={[]}
    />
  );
}
