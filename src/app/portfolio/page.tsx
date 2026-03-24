import type { Metadata } from 'next';
import Portfolio from '../../views/Portfolio';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio | AI, Automation and Software Projects by H.V.A',
  description:
    'See H.V.A portfolio work across AI systems, software platforms, cloud delivery, and automation projects for modern businesses.',
  path: '/portfolio',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI project portfolio Morocco',
    'software development portfolio Tangier',
    'mobile app case studies Morocco',
    'web app case studies Morocco',
    'cloud migration case studies Morocco',
    'CRM automation project examples Morocco',
    'portfolio projets IA maroc',
    'études de cas développement logiciel maroc',
    'أعمال برمجية وذكاء اصطناعي المغرب',
    'دراسات حالة تطوير تطبيقات في المغرب',
    'portafolio desarrollo software marruecos',
    'casos de exito automatizacion y ia marruecos',
  ]),
});

export default function Page() {
  return <Portfolio />;
}

