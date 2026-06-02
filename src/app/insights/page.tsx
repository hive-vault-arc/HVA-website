import type { Metadata } from 'next';
import InsightsHub from '../../views/InsightsHub';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Insights | Blogs, Case Studies, News, Perspectives, Research Reports',
  description:
    'Explore Hive Vault Arc Insights: blogs, case studies, news articles, perspectives, and research reports on technology consulting and digital transformation.',
  path: '/insights',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology consulting insights',
    'digital transformation insights Morocco',
    'AI and automation research reports',
    'case studies and thought leadership',
  ]),
});

export default function InsightsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hive Vault Arc Insights',
    description:
      'Insight hub containing blogs, case studies, news articles, perspectives, and research reports.',
    url: `${SITE_URL}/insights`,
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <InsightsHub />
    </>
  );
}
