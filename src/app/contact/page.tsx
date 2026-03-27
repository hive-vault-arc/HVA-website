import type { Metadata } from 'next';
import Contact from '../../views/Contact';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CONTACT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | Book an AI Business Transformation Discovery Call',
  description:
    'Book a discovery call with H.V.A to scope your AI business operating system, consulting roadmap, and implementation priorities. Pricing is discussed after discovery.',
  path: '/contact',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'contact AI business transformation Morocco',
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
      'book AI systems strategy call',
      'business transformation consultation',
      'cloud reliability consultation',
    ]),
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <Contact />
      <FaqSection faqs={CONTACT_FAQS} />
    </>
  );
}
