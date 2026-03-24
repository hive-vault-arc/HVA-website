import type { Metadata } from 'next';
import { buildPageMetadata, GLOBAL_KEYWORDS, mergeKeywords } from '../../lib/seo';
import BlogIndex from '../../views/BlogIndex';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | AI, Software & Digital Strategy Insights',
  description:
    'Expert insights on AI agents, custom software development, workflow automation, and digital transformation for businesses in Morocco and beyond.',
  path: '/blog',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'agentic AI future',
    'AI agents Morocco blog',
    'custom software ROI Morocco',
    'digital transformation Morocco',
    'custom CRM real estate Morocco',
    'AI automation blog',
  ]),
});

export default function BlogPage() {
  return <BlogIndex />;
}
