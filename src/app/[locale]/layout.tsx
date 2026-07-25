import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Layout from '@/components/Layout';
import JsonLd from '@/components/JsonLd';
import EmployeeHashScroller from '@/components/EmployeeHashScroller';
import {TranslationAvailabilityProvider} from '@/components/localization/TranslationAvailability';
import {routing} from '@/i18n/routing';
import {localizedPath} from '@/i18n/route-manifest';
import { manrope, newsreader } from '@/lib/fonts';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  BRAND_SEARCH_VARIANTS,
  GLOBAL_KEYWORDS,
  LINKEDIN_URL,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILE_URLS,
  absoluteUrl,
} from '@/lib/seo';
import '../globals.css';

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: GLOBAL_KEYWORDS,
  manifest: '/Images/favico/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: 'Hive Vault Arc - Technology Transformation Partner, Strategy, AI Engineering, Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  verification: {
    google: '5a73152a76ce06c0',
  },
  other: {
    'article:publisher': LINKEDIN_URL,
    'msapplication-TileColor': '#1A2535',
  },
};

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>;

const GLOBAL_FOUNDERS = [
  {name: 'Khalid Chalhi', slug: 'khalid-chalhi'},
  {name: 'Ali Amrani', slug: 'ali-amrani'},
  {name: 'Oubay Ghamat', slug: 'oubay-ghamat'},
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: LocaleLayoutProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({locale, namespace: 'Metadata'});
  const canonical = locale === 'fr' ? '/fr' : '/';

  return {
    ...baseMetadata,
    title: {
      default: t('defaultTitle'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('defaultDescription'),
    alternates: {
      canonical,
      languages: {
        en: '/',
        fr: '/fr',
        'x-default': '/',
      },
    },
    openGraph: {
      ...baseMetadata.openGraph,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: canonical,
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2535',
};

export default async function RootLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const [messages, tNavigation, tMetadata] = await Promise.all([
    getMessages(),
    getTranslations({locale, namespace: 'Navigation'}),
    getTranslations({locale, namespace: 'Metadata.pages'}),
  ]);
  const leadershipPeople = GLOBAL_FOUNDERS.map((member) => ({
    '@type': 'Person',
    '@id': `${absoluteUrl(
      localizedPath('/aboutus/our-people/[employee]', locale, {employee: member.slug}),
    )}#person`,
    name: member.name,
    jobTitle: locale === 'fr' ? 'Cofondateur' : 'Co-founder',
    url: absoluteUrl(
      localizedPath('/aboutus/our-people/[employee]', locale, {employee: member.slug}),
    ),
    worksFor: {
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
    },
  }));

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': absoluteUrl('/#organization'),
    name: 'Hive Vault Arc',
    alternateName: BRAND_SEARCH_VARIANTS,
    legalName: 'Hive Vault Arc',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE_LOGO_PATH),
      contentUrl: absoluteUrl(SITE_LOGO_PATH),
      width: SITE_LOGO_WIDTH,
      height: SITE_LOGO_HEIGHT,
    },
    image: absoluteUrl('/Images/media/og-default.webp'),
    description:
      locale === 'fr'
        ? 'Partenaire de transformation technologique basé à Tanger. Hive Vault Arc réunit stratégie, ingénierie IA, logiciels sur mesure, infrastructure cloud et opérations managées, du conseil à la production.'
        : 'Technology transformation partner based in Tangier, Morocco. Hive Vault Arc combines strategy, AI engineering, custom software, cloud infrastructure, and managed operations from advisory through production.',
    founder: leadershipPeople,
    founders: leadershipPeople,
    employee: leadershipPeople,
    member: leadershipPeople,
    foundingLocation: {
      '@type': 'Place',
      name: locale === 'fr' ? 'Tanger, Maroc' : 'Tangier, Morocco',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tangier',
      addressRegion: 'Tanger-Tetouan-Al Hoceima',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.7595,
      longitude: -5.834,
    },
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'North Africa' },
      { '@type': 'AdministrativeArea', name: 'Europe' },
    ],
    serviceType:
      locale === 'fr'
        ? [
            'Conseil en stratégie et développement',
            'Conseil technologique',
            'Ingénierie IA et analytique des données',
            'Ingénierie logicielle sur mesure',
            'Infrastructure cloud',
            'Opérations managées',
          ]
        : [
            'Strategy and Business Consulting',
            'Technology Consulting',
            'AI Engineering and Data Analytics',
            'Custom Software Engineering',
            'Cloud Infrastructure',
            'Managed Operations',
          ],
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_E164,
        availableLanguage: ['English', 'French', 'Arabic', 'Spanish'],
        areaServed: ['MA', 'FR', 'EU'],
      },
    ],
    sameAs: SOCIAL_PROFILE_URLS,
    subjectOf: [
      {
        '@type': 'WebAPI',
        name: 'Hive Vault Arc machine-readable company profile',
        url: absoluteUrl('/ai/company'),
        inLanguage: 'en',
      },
      {
        '@type': 'DigitalDocument',
        name: 'Hive Vault Arc LLM context',
        url: absoluteUrl('/llms.txt'),
        inLanguage: 'en',
      },
      {
        '@type': 'DigitalDocument',
        name: 'Hive Vault Arc extended LLM context',
        url: absoluteUrl('/llms-full.txt'),
        inLanguage: 'en',
      },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Digital Transformation',
      'WhatsApp Business API',
      'Real Estate Technology',
      'SaaS Development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Services Hive Vault Arc' : 'Hive Vault Arc Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'fr' ? 'Programme ARC' : 'ARC Program',
            description:
              locale === 'fr'
                ? 'Mission complète de transformation technologique : Évaluer, Réingénier, Piloter'
                : 'Full technology transformation engagement: Assess, Re-engineer, Command',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'fr' ? 'Agent IA WhatsApp' : 'WhatsApp AI Agent',
            description:
              locale === 'fr'
                ? 'Automatisation intelligente de WhatsApp pour la qualification, le support client et les ventes'
                : 'Intelligent WhatsApp automation for lead qualification, customer support, and sales',
          },
        },
      ],
    },
  };

  const schemaSiteLinks = [
    {pathname: '/' as const, name: tNavigation('home'), description: tMetadata('home.description')},
    {
      pathname: '/capabilities' as const,
      name: tNavigation('capabilities'),
      description: tMetadata('capabilities.description'),
    },
    {
      pathname: '/industries' as const,
      name: tNavigation('industries'),
      description: tMetadata('industries.description'),
    },
    {
      pathname: '/aboutus' as const,
      name: tNavigation('whoWeAre'),
      description: tMetadata('about.description'),
    },
    {
      pathname: '/insights' as const,
      name: tNavigation('insights'),
      description: tMetadata('insights.description'),
    },
    {
      pathname: '/contact' as const,
      name: tNavigation('contact'),
      description: tMetadata('contact.description'),
    },
  ];

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: absoluteUrl(localizedPath('/', locale)),
    name: 'Hive Vault Arc',
    alternateName: BRAND_SEARCH_VARIANTS,
    description:
      locale === 'fr'
        ? 'Partenaire de transformation technologique pour les entreprises marocaines et internationales'
        : 'Technology transformation partner for Moroccan and global businesses',
    inLanguage: locale,
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
    about: {
      '@id': absoluteUrl('/#organization'),
    },
    hasPart: schemaSiteLinks.map((item) => ({
      '@type': 'WebPage',
      name: item.name,
      description: item.description,
      url: absoluteUrl(localizedPath(item.pathname, locale)),
      inLanguage: locale,
    })),
  };

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fr' ? 'Navigation du site Hive Vault Arc' : 'Hive Vault Arc Site Navigation',
    itemListElement: schemaSiteLinks.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(localizedPath(item.pathname, locale)),
    })),
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${manrope.variable} ${newsreader.variable}`}>
      <head>
        {/* Warm up third-party connections used for 3D assets */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          <JsonLd data={websiteSchema} />
          <JsonLd data={navigationSchema} />
          <TranslationAvailabilityProvider>
            <Layout>{children}</Layout>
          </TranslationAvailabilityProvider>
          <EmployeeHashScroller />
          {process.env.VERCEL === '1' && <Analytics />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
