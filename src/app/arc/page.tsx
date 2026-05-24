import type { Metadata } from 'next';
import Arc from '../../views/Arc';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'ARC Framework | Assess · Re-engineer · Command',
  description:
    'ARC is Hive Vault Arc\'s delivery model — Assess (Strategy & Technology Consulting), Re-engineer (AI, Software & Cloud), Command (Operations & Managed Services). Same team. Strategy through production. No handoff.',
  path: '/arc',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'ARC transformation framework',
    'assess re-engineer command',
    'technology strategy to production Morocco',
    'full lifecycle technology delivery',
    'no handoff transformation model',
    'strategy engineering operations one team Morocco',
  ]),
});

export default function ArcPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ARC Framework',
    description:
      'Hive Vault Arc framework: Assess strategy and architecture, Re-engineer AI, software, and cloud systems, and Command operations through managed services.',
    url: `${SITE_URL}/arc`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'ARC Program', path: '/arc' },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <Arc />
    </>
  );
}
