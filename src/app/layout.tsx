import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Layout from '../components/Layout';
import JsonLd from '../components/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GLOBAL_KEYWORDS,
  LINKEDIN_URL,
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
        alt: 'H.V.A — AI & Automation · Digital Transformation · Technology Consulting',
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
    icon: [
      { url: '/Images/favico/favicon.ico' },
      { url: '/Images/favico/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/favico/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/Images/favico/apple-touch-icon.png', sizes: '180x180' }],
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
    alternateName: 'H.V.A',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/Images/favico/android-chrome-512x512.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/Images/media/og-default.png'),
    description:
      'AI & digital transformation consulting firm based in Tangier, Morocco. Specializing in custom AI agents, WhatsApp automation, ARC programs, and SaaS platform development for businesses in Morocco, France, and globally.',
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
      'AI Consulting',
      'Digital Transformation',
      'WhatsApp AI Agents',
      'Custom Software Development',
      'SaaS Platform Development',
    ],
    email: 'contact@hivevaultarc.com',
    telephone: ['+212688270772', '+212691918296'],
    sameAs: [
      LINKEDIN_URL,
      'https://github.com/hive-vault-arc',
      // Add Twitter/X, Instagram, Crunchbase URLs here when accounts exist
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
            description: 'Full AI & digital transformation engagement: Audit, Roadmap, Craft',
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
    description: 'AI & digital transformation consulting for Moroccan and global businesses',
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
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
