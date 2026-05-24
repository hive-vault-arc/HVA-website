import type { Metadata } from 'next';
import LegalMentions from '../../views/LegalMentions';
import JsonLd from '../../components/JsonLd';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Legal Mentions',
  description:
    'Legal information for hivevaultarc.com — publisher details, hosting, intellectual property, and applicable law in accordance with Moroccan law.',
  path: '/mentions-legales',
  keywords: [
    'legal mentions Morocco',
    'site publisher information',
    'intellectual property Morocco',
    'applicable law Morocco',
    'Vercel hosting',
    'Law 31-08',
    'Hive Vault Arc legal',
  ],
});

export default function MentionsLegalesPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Legal Mentions — Hive Vault Arc',
    description:
      'Legal information for hivevaultarc.com in accordance with Moroccan law (Law 31-08, Code de Commerce).',
    url: `${SITE_URL}/mentions-legales`,
    inLanguage: 'en',
    dateModified: '2026-05-03',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Legal Mentions', path: '/mentions-legales' },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <LegalMentions />
    </>
  );
}
