import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Layout from '../components/Layout';
import JsonLd from '../components/JsonLd';
import { HVA_LEADERSHIP } from '../lib/leadership';
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
  SITELINK_CANDIDATES,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILE_URLS,
  absoluteUrl,
} from '../lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: GLOBAL_KEYWORDS,
  manifest: '/Images/favico/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
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
  icons: {
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/Images/favico/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/Images/favico/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/favico/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/Images/favico/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/Images/favico/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/Images/favico/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/Images/favico/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: '5a73152a76ce06c0',
  },
  other: {
    'article:publisher': LINKEDIN_URL,
    'msapplication-TileColor': '#1A2535',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2535',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const leadershipPeople = HVA_LEADERSHIP.map((member) => ({
    '@type': 'Person',
    '@id': absoluteUrl(`/whoweare/abouthva#${member.slug}`),
    name: member.name,
    jobTitle: member.schemaJobTitle,
    description: member.description,
    image: absoluteUrl(member.image),
    url: absoluteUrl(`/whoweare/abouthva#${member.slug}`),
    worksFor: {
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
    },
    knowsAbout: member.knowsAbout,
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
    image: absoluteUrl('/Images/media/og-default.png'),
    description:
      'Technology transformation partner based in Tangier, Morocco. Hive Vault Arc combines strategy, AI engineering, custom software, cloud infrastructure, and managed operations from advisory through production.',
    foundingDate: '2026',
    founder: leadershipPeople,
    founders: leadershipPeople,
    employee: leadershipPeople,
    member: leadershipPeople,
    foundingLocation: {
      '@type': 'Place',
      name: 'Tangier, Morocco',
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
    serviceType: [
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
      name: 'Hive Vault Arc Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ARC Program',
            description: 'Full technology transformation engagement: Assess, Re-engineer, Command',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WhatsApp AI Agent',
            description:
              'Intelligent WhatsApp automation for lead qualification, customer support, and sales',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: SITE_URL,
    name: 'Hive Vault Arc',
    alternateName: BRAND_SEARCH_VARIANTS,
    description: 'Technology transformation partner for Moroccan and global businesses',
    inLanguage: ['en', 'fr', 'ar', 'es'],
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
    about: {
      '@id': absoluteUrl('/#organization'),
    },
    hasPart: SITELINK_CANDIDATES.map((item) => ({
      '@type': 'WebPage',
      name: item.label,
      description: item.description,
      url: absoluteUrl(item.href),
    })),
  };

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hive Vault Arc Site Navigation',
    itemListElement: SITELINK_CANDIDATES.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.label,
      description: item.description,
      url: absoluteUrl(item.href),
    })),
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        {/* Warm up third-party connections used for 3D assets */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={navigationSchema} />
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
