import {defineRouting} from 'next-intl/routing';
import {APP_LOCALES, DEFAULT_LOCALE} from './config';

export const routing = defineRouting({
  locales: APP_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/arc': '/arc',
    '/capabilities': {
      en: '/capabilities',
      fr: '/expertises',
    },
    '/capabilities/in-detail': {
      en: '/capabilities/in-detail',
      fr: '/expertises/en-detail',
    },
    '/capabilities/solution-programs': {
      en: '/capabilities/solution-programs',
      fr: '/expertises/programmes-solutions',
    },
    '/capabilities/[slug]': {
      en: '/capabilities/[slug]',
      fr: '/expertises/[slug]',
    },
    '/industries': {
      en: '/industries',
      fr: '/secteurs',
    },
    '/aboutus': {
      en: '/aboutus',
      fr: '/qui-sommes-nous',
    },
    '/aboutus/our-people/[employee]': {
      en: '/aboutus/our-people/[employee]',
      fr: '/qui-sommes-nous/equipe/[employee]',
    },
    '/whoarewe/portfolio': {
      en: '/whoarewe/portfolio',
      fr: '/qui-sommes-nous/portfolio',
    },
    '/insights': {
      en: '/insights',
      fr: '/publications',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/case-studies': {
      en: '/case-studies',
      fr: '/etudes-de-cas',
    },
    '/case-studies/[slug]': {
      en: '/case-studies/[slug]',
      fr: '/etudes-de-cas/[slug]',
    },
    '/insights/news-articles': {
      en: '/insights/news-articles',
      fr: '/publications/actualites',
    },
    '/insights/news-articles/[slug]': {
      en: '/insights/news-articles/[slug]',
      fr: '/publications/actualites/[slug]',
    },
    '/insights/perspectives': {
      en: '/insights/perspectives',
      fr: '/publications/perspectives',
    },
    '/insights/perspectives/[slug]': {
      en: '/insights/perspectives/[slug]',
      fr: '/publications/perspectives/[slug]',
    },
    '/insights/research-reports': {
      en: '/insights/research-reports',
      fr: '/publications/rapports-de-recherche',
    },
    '/insights/research-reports/[slug]': {
      en: '/insights/research-reports/[slug]',
      fr: '/publications/rapports-de-recherche/[slug]',
    },
    '/contact': '/contact',
    '/privacy-policy': {
      en: '/privacy-policy',
      fr: '/politique-de-confidentialite',
    },
    '/mentions-legales': '/mentions-legales',
    '/links': {
      en: '/links',
      fr: '/liens',
    },
    '/ai-agents-tangier': {
      en: '/ai-agents-tangier',
      fr: '/agents-ia-tanger',
    },
    '/ai-agents-morocco': {
      en: '/ai-agents-morocco',
      fr: '/agents-ia-maroc',
    },
    '/it-consulting-tangier': {
      en: '/it-consulting-tangier',
      fr: '/conseil-informatique-tanger',
    },
    '/custom-software-morocco': {
      en: '/custom-software-morocco',
      fr: '/logiciels-sur-mesure-maroc',
    },
    '/digital-services-tangier': {
      en: '/digital-services-tangier',
      fr: '/services-digitaux-tanger',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
