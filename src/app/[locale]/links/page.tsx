import type { Metadata } from 'next';
import SocialLinks from '@/views/SocialLinks';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import type {AppLocale} from '@/i18n/config';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const metadata = await buildStaticRouteMetadata(locale, 'links');
  return {...metadata, robots: {index: false, follow: true}};
}

export default function LinksPage() {
  return <SocialLinks />;
}
