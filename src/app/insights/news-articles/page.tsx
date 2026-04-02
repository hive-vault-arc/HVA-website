import type { Metadata } from 'next';
import InsightsCollection from '../../../views/InsightsCollection';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'News Articles | Technology and Transformation Signals',
  description:
    'Timely news articles from H.V.A on technology consulting, digital transformation, AI operations, and modernization trends.',
  path: '/insights/news-articles',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology transformation news',
    'AI operations news Morocco',
    'consulting industry updates',
  ]),
});

export default function InsightsNewsArticlesPage() {
  return (
    <InsightsCollection
      eyebrow="Insights / News Articles"
      title="News Articles"
      description="Market signals, execution trends, and operational technology updates relevant to leadership teams."
      cards={[]}
    />
  );
}
