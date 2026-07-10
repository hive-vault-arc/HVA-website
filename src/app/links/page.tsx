import type { Metadata } from 'next';
import SocialLinks from '../../views/SocialLinks';
import {buildPageMetadata} from '../../lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Connect',
    description: 'Find the official Hive Vault Arc contact details and social profiles.',
    path: '/links',
  }),
  robots: {index: false, follow: true},
};

export default function LinksPage() {
  return <SocialLinks />;
}
