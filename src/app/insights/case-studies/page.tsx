import type { Metadata } from 'next';
import CaseStudies from '../../../views/CaseStudies';
import { buildPageMetadata } from '../../../lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Insights Case Studies | Transformation Outcomes',
    description:
      'Browse H.V.A case studies showing consulting-led transformation outcomes in production environments.',
    path: '/insights/case-studies',
  }),
  robots: { index: false, follow: true },
  alternates: { canonical: '/case-studies' },
};

export default function InsightsCaseStudiesPage() {
  return <CaseStudies />;
}
