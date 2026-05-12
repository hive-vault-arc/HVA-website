import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Layout from '../components/Layout';
import JsonLd from '../components/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  BRAND_ALIASES,
  GLOBAL_KEYWORDS,
  LINKEDIN_URL,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_NAME,
  SITE_URL,
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
        url: '/Images/brand/hva-ai-software-agency-tangier.webp',
        width: 1200,
        height: 630,
        alt: 'H.V.A — Technology Transformation Partner · Strategy · AI Engineering · Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/Images/brand/hva-ai-software-agency-tangier.webp'],
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
    'msapplication-TileColor': '#F5F6FA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F6FA',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Hive Vault Arc',
    alternateName: BRAND_ALIASES,
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
      'Technology transformation partner based in Tangier, Morocco. H.V.A combines strategy, AI engineering, custom software, cloud infrastructure, and managed operations from advisory through production.',
    foundingDate: '2026',
    founders: [
      {
        '@type': 'Person',
        name: 'Khalid',
        jobTitle: 'Founder & CEO',
      },
    ],
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
    email: 'contact@hivevaultarc.com',
    telephone: ['+212670431249'],
    sameAs: [
      LINKEDIN_URL,
      'https://github.com/hive-vault-arc',
      'https://www.instagram.com/hive.vault.arc/',
      'https://x.com/Hivevaultarc',
      'https://www.tiktok.com/@hivevaultarc',
      'https://web.facebook.com/hivevaultarc',
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
      name: 'H.V.A Services',
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
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Hive Vault Arc',
    alternateName: BRAND_ALIASES,
    description: 'Technology transformation partner for Moroccan and global businesses',
    inLanguage: ['en', 'fr', 'ar', 'es'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hive Vault Arc Site Navigation',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position: 1, name: 'Home',         url: `${SITE_URL}/` },
      { '@type': 'SiteNavigationElement', position: 2, name: 'ARC Framework', url: `${SITE_URL}/arc` },
      { '@type': 'SiteNavigationElement', position: 3, name: 'Capabilities',  url: `${SITE_URL}/capabilities` },
      { '@type': 'SiteNavigationElement', position: 4, name: 'Industries',    url: `${SITE_URL}/industries` },
      { '@type': 'SiteNavigationElement', position: 5, name: 'Who We Are',   url: `${SITE_URL}/whoweare/abouthva` },
      { '@type': 'SiteNavigationElement', position: 6, name: 'Insights',     url: `${SITE_URL}/insights` },
      { '@type': 'SiteNavigationElement', position: 7, name: 'Contact',      url: `${SITE_URL}/contact` },
    ],
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
