import type { Metadata } from 'next';
import BlogIndex from '../../../views/BlogIndex';
import { buildPageMetadata } from '../../../lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Insights Blogs | Strategy and Execution Articles',
    description:
      'Browse H.V.A blog articles on technology consulting, digital transformation strategy, and engineering execution.',
    path: '/insights/blogs',
  }),
  robots: { index: false, follow: true },
  alternates: { canonical: '/blog' },
};

export default function InsightsBlogsPage() {
  return <BlogIndex />;
}
