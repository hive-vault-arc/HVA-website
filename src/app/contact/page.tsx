import type { Metadata } from 'next';
import Contact from '../../views/Contact';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CONTACT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | Start Your AI or Software Project in Morocco',
  description:
    'Book a free discovery call with H.V.A. Tell us your challenge — AI, software, or cloud — and we will define a scope and timeline before any work begins.',
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
    url: `${SITE_URL}/contact`,
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
      <FaqSection faqs={CONTACT_FAQS} />
    </>
  );
}

