import type { Metadata } from 'next';
import Contact from '../../views/Contact';
import JsonLd from '../../components/JsonLd';
import { buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact H.V.A | Start Your AI or Software Project in Morocco',
  description:
    'Contact H.V.A for AI receptionist systems, custom software development, cloud infrastructure, and workflow automation in Tangier and Morocco.',
  path: '/contact',
  keywords: [
    'contact AI agency Morocco',
    'IT consultant Tangier contact',
    'contact services et conseil informatique maroc',
    'اتصل بخدمات الذكاء الاصطناعي المغرب',
    'contactar consultoria it marruecos',
  ],
});

export default function Page() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact H.V.A',
    url: 'https://www.hiva.ma/contact',
    inLanguage: ['en', 'fr', 'ar', 'es'],
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <Contact />
    </>
  );
}

