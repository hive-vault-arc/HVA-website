import type { Metadata } from 'next';
import Contact from '../../views/Contact';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact H.V.A | Start Your AI or Software Project in Morocco',
  description:
    'Contact H.V.A for AI receptionist systems, custom software development, cloud infrastructure, and workflow automation in Tangier and Morocco.',
  path: '/contact',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'contact AI agency Morocco',
    'hire software development team Morocco',
    'request quote custom mobile app Morocco',
    'request quote custom web app Morocco',
    'book consultation CRM migration Morocco',
    'book consultation cloud deployment Morocco',
    'contact IT consultant Tangier',
    'devis développement logiciel sur mesure maroc',
    'devis migration CRM maroc',
    'طلب عرض سعر تطوير تطبيق مخصص المغرب',
    'احجز استشارة ترحيل CRM في المغرب',
    'solicitar presupuesto app personalizada marruecos',
    'reservar consultoria migracion CRM marruecos',
  ]),
});

export default function Page() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact H.V.A',
    url: 'https://www.hiva.ma/contact',
    inLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'book AI strategy call',
      'custom software consultation',
      'cloud migration consultation',
    ]),
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <Contact />
    </>
  );
}

