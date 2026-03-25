import type { Metadata } from 'next';
import About from '../../views/About';
import FaqSection from '../../components/FaqSection';
import { ABOUT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About H.V.A | AI and Software Engineering Team in Tangier',
  description:
    'Meet the H.V.A team building AI systems, software platforms, and cloud infrastructure for growth-focused companies in Morocco.',
  path: '/about',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'software engineering team Tangier',
    'AI agency Morocco',
    'company profile software and AI Morocco',
    'team for custom software projects Morocco',
    'équipe ingénierie logicielle Tanger',
    'agence software et cloud Maroc',
    'فريق هندسة برمجيات طنجة',
    'شركة متخصصة في الذكاء الاصطناعي والبرمجيات المغرب',
    'equipo de ingenieria de software tanger',
    'agencia de software e ia en marruecos',
  ]),
});

export default function Page() {
  return (
    <>
      <About />
      <FaqSection faqs={ABOUT_FAQS} />
    </>
  );
}

