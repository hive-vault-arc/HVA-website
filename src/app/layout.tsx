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
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/Images/favico/favicon.ico' },
      { url: '/Images/favico/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/favico/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/Images/favico/apple-touch-icon.png', sizes: '180x180' }],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: BUSINESS_NAME,
    alternateName: 'H.V.A',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    logo: absoluteUrl('/Images/favico/android-chrome-512x512.png'),
    image: absoluteUrl('/Images/hero.webp'),
    areaServed: ['Tangier', 'Morocco'],
    serviceType: [
      'AI Agent Development',
      'AI Receptionist Systems',
      'Custom Software Development',
      'Workflow Automation',
      'Cloud Infrastructure',
      'DevOps',
      'Web Application Development',
      'Mobile Application Development',
    ],
    knowsAbout: GLOBAL_KEYWORDS,
    sameAs: [],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
