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

function foundersFrom(teamMembers: EmployeeProfile[]): EmployeeProfile[] {
  return teamMembers.filter((member) => member.profileType === 'coFounder');
}

function founderDescription(): string {
  return 'About Hive Vault Arc, a founder-led technology transformation firm in Tangier delivering strategy, AI, software, cloud, and managed operations.';
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
    description: founderDescription(),
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
  const priorityQuestions = new Set([
    'What is Hive Vault Arc?',
    'What is the ARC framework?',
    'Do you stay involved after the initial build?',
    'What industries does Hive Vault Arc serve?',
  ]);
  const aboutFaqs = [
    ...ABOUT_FAQS.filter((faq) => priorityQuestions.has(faq.question)),
    ...founderFaqs(founders).filter((faq) => faq.question === 'Who leads Hive Vault Arc engagements?'),
  ];

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Hive Vault Arc - Technology Transformation Partner',
    url: absoluteUrl('/aboutus'),
    description: founderDescription(),
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
