import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Layout from '../components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'H.V.A',
  description: 'Marketing website for H.V.A.',
  manifest: '/Images/favico/site.webmanifest',
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
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
