import type { Metadata } from 'next';
import PrivacyPolicy from '../../views/PrivacyPolicy';
import JsonLd from '../../components/JsonLd';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy — Data Protection',
  description:
    'Privacy policy of Hive Vault Arc, compliant with Moroccan Law 09-08 (CNDP) and the GDPR. Learn how we collect, use, and protect your personal data.',
  path: '/privacy-policy',
  keywords: [
    'privacy policy Morocco',
    'data protection Morocco',
    'GDPR Morocco',
    'Law 09-08 CNDP',
    'Hive Vault Arc privacy',
    'personal data protection',
  ],
});

export default function PrivacyPolicyPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — Hive Vault Arc',
    description:
      'Privacy policy compliant with Law 09-08 (CNDP) and the GDPR for hivevaultarc.com.',
    url: `${SITE_URL}/privacy-policy`,
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
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <PrivacyPolicy />
    </>
  );
}
