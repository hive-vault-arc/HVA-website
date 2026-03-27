import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Newsreader } from 'next/font/google';
import Layout from '../components/Layout';
import JsonLd from '../components/JsonLd';
import {
  BUSINESS_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GLOBAL_KEYWORDS,
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
        url: '/Images/hva-ai-software-agency-tangier.webp',
        width: 1200,
        height: 630,
        alt: 'H.V.A — AI Agents, Custom Software & Cloud Engineering in Tangier, Morocco',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/Images/hva-ai-software-agency-tangier.webp'],
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
    google: '10960c2117d3f45e',
  },
  other: {
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
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    alternateName: ['H.V.A', 'Hive Vault Arc', 'HIVA'],
    url: SITE_URL,
    description: 'Hive Vault Arc (H.V.A) is an AI agent and software engineering agency based in Tangier, Morocco. We build AI receptionist systems, AI analyst tools, custom software platforms, workflow automation, and cloud infrastructure for businesses across Morocco and internationally.',
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/Images/favico/android-chrome-512x512.png'),
    },
    image: absoluteUrl('/Images/hva-ai-software-agency-tangier.webp'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Tarik Ibn Ziad N 38, Etage 6 N 32',
      addressLocality: 'Tangier',
      addressRegion: 'Tanger-Tétouan-Al Hoceïma',
      postalCode: '90000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.7595,
      longitude: -5.834,
    },
    areaServed: [
      { '@type': 'City', name: 'Tangier' },
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'City', name: 'casablanca' },
      { '@type': 'City', name: 'rabat' },
      { '@type': 'City', name: 'marrakech' },
      { '@type': 'City', name: 'fes' },
      { '@type': 'City', name: 'agadir' },
      { '@type': 'City', name: 'Madrid' },
      { '@type': 'City', name: 'Paris' },
      { '@type': 'City', name: 'London' },
      { '@type': 'City', name: 'Berlin' },
      { '@type': 'City', name: 'Amsterdam' },
      { '@type': 'City', name: 'Rome' },
      { '@type': 'City', name: 'New York' },
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'Sydney' },
    ],
    serviceType: [
      'AI Agent Development',
      'AI Receptionist Systems',
      'AI Analyst Tools',
      'Workflow Automation',
      'Custom Software Development',
      'Cloud Infrastructure',
      'DevOps Engineering',
      'Web Application Development',
      'Mobile Application Development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI & Software Engineering Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agent Development', description: 'Custom AI agents for receptionists, analysts, and business automation in Tangier and Morocco.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation', description: 'End-to-end business process automation using AI and custom integrations.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development', description: 'Bespoke web and mobile applications, CRM systems, and enterprise platforms.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Infrastructure', description: 'Cloud deployment, CI/CD pipelines, and managed infrastructure on AWS, GCP, and Azure.' } },
      ],
    },
    telephone: ['+212688270772', '+212691918296'],
    priceRange: '$$',
    foundingDate: '2026',
    knowsLanguage: ['en', 'fr', 'ar', 'es'],
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'H.V.A',
    alternateName: ['H.V.A', 'Hive Vault Arc', 'HIVA'],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: ['en', 'fr', 'ar', 'es'],
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
      </body>
    </html>
  );
}
