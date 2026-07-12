import type { Metadata } from 'next';
import About from '../../views/About';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { ABOUT_FAQS, type FaqItem } from '../../data/faqs';
import { getFeaturedEmployeeProfiles, type EmployeeProfile } from '../../lib/employee-profiles';
import {
  BRAND_SEARCH_VARIANTS,
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../lib/seo';

const DYNAMIC_FOUNDER_FAQ_QUESTIONS = new Set([
  'Who is the CEO of Hive Vault Arc?',
  'Qui est le PDG de Hive Vault Arc ?',
  'Who leads Hive Vault Arc engagements?',
]);

function foundersFrom(teamMembers: EmployeeProfile[]): EmployeeProfile[] {
  return teamMembers.filter((member) => member.profileType === 'coFounder');
}

function founderDescription(founders: EmployeeProfile[]): string {
  const names = founders.map((member) => member.name).filter(Boolean);
  if (names.length === 0) {
    return 'Hive Vault Arc is a founder-led technology transformation team based in Tangier, Morocco.';
  }

  return `Hive Vault Arc is led by ${names.join(', ')} from Tangier, Morocco.`;
}

function founderFaqs(founders: EmployeeProfile[]): FaqItem[] {
  const names = founders.map((founder) => founder.name).join(', ');
  const responsibilities = founders
    .map((founder) => founder.responsibilityTag)
    .filter(Boolean)
    .join('; ');
  const englishAnswer = names
    ? `Hive Vault Arc is led by ${names}. Current founder responsibilities include ${responsibilities || 'strategy, delivery, and operations'}.`
    : 'Hive Vault Arc is founder-led. Current founder profiles are maintained in the People section.';
  const frenchAnswer = names
    ? `Hive Vault Arc est dirigee par ${names}. Les responsabilites actuelles des fondateurs couvrent ${responsibilities || 'la strategie, la livraison et les operations'}.`
    : 'Hive Vault Arc est dirigee par ses fondateurs. Les profils actuels sont maintenus dans la section People.';

  return [
    { question: 'Who is the CEO of Hive Vault Arc?', answer: englishAnswer },
    { question: 'Qui est le PDG de Hive Vault Arc ?', answer: frenchAnswer },
    { question: 'Who leads Hive Vault Arc engagements?', answer: englishAnswer },
  ];
}

function personSchema(member: EmployeeProfile) {
  return {
    '@type': 'Person',
    '@id': absoluteUrl(`/aboutus/our-people/${member.slug}#person`),
    name: member.name,
    jobTitle: member.position,
    description: member.summary,
    image: absoluteUrl(member.profileImage),
    url: absoluteUrl(`/aboutus/our-people/${member.slug}`),
    worksFor: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    knowsAbout: member.expertise,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const founders = foundersFrom(await getFeaturedEmployeeProfiles());

  return buildPageMetadata({
    title: 'About | Founder-Led Technology Transformation Team',
    description: founderDescription(founders),
    path: '/aboutus',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      ...founders.flatMap((member) => [member.name, member.position, ...member.expertise]),
      'CEO of HVA',
      'CEO of Hive Vault Arc',
      'Hive Vault Arc CEO',
      'HVA founders',
      'Hive Vault Arc founders',
      'technology transformation partner Morocco',
      'software engineering team Tangier',
      'digital transformation consulting team Morocco',
      'technology advisory firm Morocco',
      'ARC framework assess re-engineer command',
      'AI engineering firm Morocco',
      'managed operations technology Morocco',
      'founder-led technology firm Morocco',
      'six service pillars technology transformation',
      'what is Hive Vault Arc',
      'who founded HVA Morocco',
      'equipe ingenierie logicielle Tanger',
      'agence software et cloud Maroc',
      'equipo de ingenieria de software tanger',
      'agencia de software e ia en marruecos',
    ]),
  });
}

export default async function Page() {
  const teamMembers = await getFeaturedEmployeeProfiles();
  const founders = foundersFrom(teamMembers);
  const leadershipPeople = founders.map(personSchema);
  const aboutFaqs = [
    ...ABOUT_FAQS.filter((faq) => !DYNAMIC_FOUNDER_FAQ_QUESTIONS.has(faq.question)),
    ...founderFaqs(founders),
  ];

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Hive Vault Arc - Technology Transformation Partner',
    url: absoluteUrl('/aboutus'),
    description: founderDescription(founders),
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      alternateName: BRAND_SEARCH_VARIANTS,
      description:
        'Technology transformation partner for strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations delivered by one founder-led team.',
      founder: leadershipPeople,
      founders: leadershipPeople,
      employee: teamMembers.map(personSchema),
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
    { name: 'About Hive Vault Arc', path: '/aboutus' },
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, ...leadershipPeople, breadcrumbSchema]} />
      <About teamMembers={teamMembers} />
      <FaqSection faqs={aboutFaqs} />
    </>
  );
}
