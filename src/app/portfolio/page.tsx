import type { Metadata } from 'next';
import Portfolio from '../../views/Portfolio';
import { buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio | AI, Automation and Software Projects by H.V.A',
  description:
    'See H.V.A portfolio work across AI systems, software platforms, cloud delivery, and automation projects for modern businesses.',
  path: '/portfolio',
  keywords: [
    'AI project portfolio Morocco',
    'software development portfolio Tangier',
    'portfolio projets IA maroc',
    'أعمال برمجية وذكاء اصطناعي المغرب',
    'portafolio desarrollo software marruecos',
  ],
});

export default function Page() {
  return <Portfolio />;
}

