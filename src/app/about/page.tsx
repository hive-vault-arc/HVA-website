import type { Metadata } from 'next';
import About from '../../views/About';
import { buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About H.V.A | AI and Software Engineering Team in Tangier',
  description:
    'Meet the H.V.A team building AI systems, software platforms, and cloud infrastructure for growth-focused companies in Morocco.',
  path: '/about',
  keywords: [
    'software engineering team Tangier',
    'AI agency Morocco',
    'équipe ingénierie logicielle Tanger',
    'فريق هندسة برمجيات طنجة',
    'equipo de ingenieria de software tanger',
  ],
});

export default function Page() {
  return <About />;
}

