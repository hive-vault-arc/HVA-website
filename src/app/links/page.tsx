import type { Metadata } from 'next';
import SocialLinks from '../../views/SocialLinks';

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Find Hive Vault Arc on Instagram, Facebook, X, TikTok, WhatsApp and more.',
  robots: { index: false, follow: false },
};

export default function LinksPage() {
  return <SocialLinks />;
}
