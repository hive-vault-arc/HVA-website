import type { Metadata } from 'next';
import InsightsCollection from '../../../views/InsightsCollection';
import { getAllNewsArticles } from '../../../lib/insights';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'News Articles | Technology and Transformation Signals',
  description:
    'Timely news articles from Hive Vault Arc on technology consulting, digital transformation, AI operations, and modernization trends.',
  path: '/insights/news-articles',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology transformation news',
    'AI operations news Morocco',
    'consulting industry updates',
  ]),
});

export default async function InsightsNewsArticlesPage() {
  const newsArticles = await getAllNewsArticles();

  return (
    <InsightsCollection
      eyebrow="Insights / News Articles"
      title="News Articles"
      description="Market signals, execution trends, and operational technology updates relevant to leadership teams."
      cards={newsArticles}
      basePath="/insights/news-articles"
    />
  );
}
