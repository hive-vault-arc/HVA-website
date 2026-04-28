import type { Metadata } from 'next';
import Contact from '../../views/Contact';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CONTACT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | Start a Technology and Transformation Discovery',
  description:
    'Start a strategic discovery call with H.V.A to scope your transformation priorities, technical roadmap, and delivery model. Pricing is discussed after discovery.',
  path: '/contact',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'contact digital transformation consulting Morocco',
    'technology strategy discovery call Tangier',
    'hire software development team Morocco',
    'request quote custom mobile app Morocco',
    'request quote custom web app Morocco',
    'book consultation CRM migration Morocco',
    'book consultation cloud deployment Morocco',
    'contact IT consultant Tangier',
    'devis developpement logiciel sur mesure maroc',
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
    url: `${SITE_URL}/contact`,
    inLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'book transformation strategy call',
      'technology consulting discovery',
      'cloud and modernization consultation',
    ]),
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} />
      <Contact />
      <FaqSection faqs={CONTACT_FAQS} />
    </>
  );
}
