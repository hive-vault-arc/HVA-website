import type { Metadata, Viewport } from 'next';
import Layout from '../components/Layout';
import NotFoundContent from '../components/NotFoundContent';
import { manrope, newsreader } from '../lib/fonts';
import { NOT_FOUND_METADATA } from '../lib/not-found';
import './globals.css';

export const metadata: Metadata = {
  ...NOT_FOUND_METADATA,
  title: 'Page Not Found | Hive Vault Arc',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2535',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <Layout>
          <NotFoundContent />
        </Layout>
      </body>
    </html>
  );
}
