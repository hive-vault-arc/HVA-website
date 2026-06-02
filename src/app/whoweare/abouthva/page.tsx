import type { Metadata } from 'next';
import About from '../../../views/About';
import FaqSection from '../../../components/FaqSection';
import JsonLd from '../../../components/JsonLd';
import { ABOUT_FAQS } from '../../../data/faqs';
import { HVA_CEO_ANSWER, HVA_LEADERSHIP, HVA_LEADERSHIP_SEARCH_KEYWORDS } from '../../../lib/leadership';
import {
  BRAND_SEARCH_VARIANTS,
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About | Founder-Led Technology Transformation Team',
  description:
    'Hive Vault Arc is led by Founder & CEO Khalid Chalhi and co-founders Ali Amrani and Oubay Ghamat from Tangier, Morocco.',
  path: '/whoweare/abouthva',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    ...HVA_LEADERSHIP_SEARCH_KEYWORDS,
    'technology transformation partner Morocco',
    'software engineering team Tangier',
    'digital transformation consulting team Morocco',
    'technology advisory firm Morocco',
    'ARC framework assess re-engineer command',
    'AI engineering firm Morocco',
    'managed operations technology Morocco',
    'founder-led technology firm Morocco',
    'Khalid Chalhi Founder CEO HVA',
    'Ali Amrani co-founder HVA',
    'Oubay Ghamat co-founder HVA',
    'six service pillars technology transformation',
    'what is Hive Vault Arc',
    'who founded HVA Morocco',
    'equipe ingenierie logicielle Tanger',
    'agence software et cloud Maroc',
    'فريق هندسة برمجيات طنجة',
    'شركة متخصصة في الذكاء الاصطناعي والبرمجيات المغرب',
    'equipo de ingenieria de software tanger',
    'agencia de software e ia en marruecos',
  ]),
});

export default function Page() {
  const leadershipPeople = HVA_LEADERSHIP.map((member) => ({
    '@type': 'Person',
    '@id': absoluteUrl(`/whoweare/abouthva#${member.slug}`),
    name: member.name,
    jobTitle: member.schemaJobTitle,
    description: member.description,
    image: absoluteUrl(member.image),
    url: absoluteUrl(`/whoweare/abouthva#${member.slug}`),
    worksFor: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    knowsAbout: member.knowsAbout,
  }));

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Hive Vault Arc - Technology Transformation Partner',
    url: absoluteUrl('/whoweare/abouthva'),
    description: HVA_CEO_ANSWER,
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      alternateName: BRAND_SEARCH_VARIANTS,
      description:
        'Technology transformation partner for strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations delivered by one founder-led team.',
      founder: leadershipPeople,
      founders: leadershipPeople,
      employee: leadershipPeople,
      member: leadershipPeople,
      foundingLocation: 'Tangier, Morocco',
      areaServed: ['Morocco', 'France', 'Europe', 'MENA'],
      knowsAbout: [
        'Technology Transformation',
        'AI Engineering',
        'Strategy Consulting',
        'Software Development',
        'Cloud Infrastructure',
        'Managed Operations',
      ],
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Hive Vault Arc', path: '/whoweare/abouthva' },
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, ...leadershipPeople, breadcrumbSchema]} />
      <About />
      <FaqSection faqs={ABOUT_FAQS} />
    </>
  );
}
