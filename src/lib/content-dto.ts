import type { BlogPost } from './blog';
import type { CaseStudy } from './proof';

export type InsightAuthorDTO = {
  name: string;
  initials: string;
};

export type InsightPageItemDTO = {
  href: string;
  title: string;
  excerpt: string;
  tag: string;
  date?: string;
  meta?: string;
  coverImage?: string;
  author?: InsightAuthorDTO;
};

export type BlogPostPreviewDTO = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage?: string;
  author?: InsightAuthorDTO;
};

export type CaseStudyPreviewDTO = {
  slug: string;
  title: string;
  summary: string;
  industry: string;
  clientName: string;
  deploymentStatus: string;
  coverImage?: string;
  lastUpdated: string;
};

export type InsightsSliderItemDTO = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type InsightGridItemDTO = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
};

export type RelatedCardItemDTO = {
  href: string;
  title: string;
  tag: string;
  coverImage?: string;
};

export type InsightsHubPayload = {
  latestPost?: BlogPostPreviewDTO;
  latestCaseStudy?: CaseStudyPreviewDTO;
  sliderItems: InsightsSliderItemDTO[];
  allInsights: InsightGridItemDTO[];
};

function deterministicShuffle<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = (i * 13 + 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function toBlogPreview(post: BlogPost): BlogPostPreviewDTO {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    coverImage: post.coverImage || undefined,
    author: post.authors[0]
      ? {
          name: post.authors[0].name,
          initials: post.authors[0].initials,
        }
      : undefined,
  };
}

export function toCaseStudyPreview(study: CaseStudy): CaseStudyPreviewDTO {
  return {
    slug: study.slug,
    title: study.title,
    summary: study.summary,
    industry: study.industry,
    clientName: study.clientName,
    deploymentStatus: study.deploymentStatus,
    coverImage: study.assets.coverImage || undefined,
    lastUpdated: study.lastUpdated,
  };
}

export function toBlogIndexItems(posts: BlogPost[]): InsightPageItemDTO[] {
  return posts.map((post) => ({
    href: `/blog/${post.slug}`,
    title: post.title,
    excerpt: post.excerpt,
    tag: post.category,
    date: post.publishedAt,
    meta: post.readTime,
    coverImage: post.coverImage || undefined,
    author: post.authors[0]
      ? {
          name: post.authors[0].name,
          initials: post.authors[0].initials,
        }
      : undefined,
  }));
}

export function toCaseStudyIndexItems(studies: CaseStudy[]): InsightPageItemDTO[] {
  return studies.map((study) => ({
    href: `/case-studies/${study.slug}`,
    title: study.title,
    excerpt: study.summary,
    tag: study.industry,
    meta: study.deploymentStatus,
    coverImage: study.assets.coverImage || undefined,
  }));
}

export function toInsightsSliderItems(
  posts: BlogPost[],
  studies: CaseStudy[],
  limit = 6
): InsightsSliderItemDTO[] {
  const source: InsightsSliderItemDTO[] = [
    ...posts
      .filter((post) => Boolean(post.coverImage))
      .map((post) => ({
        id: `blog-${post.slug}`,
        tag: post.category,
        title: post.title,
        description: post.excerpt,
        image: post.coverImage,
        href: `/blog/${post.slug}`,
      })),
    ...studies
      .filter((study) => Boolean(study.assets.coverImage))
      .map((study) => ({
        id: `case-${study.slug}`,
        tag: study.industry,
        title: study.title,
        description: study.summary,
        image: study.assets.coverImage,
        href: `/case-studies/${study.slug}`,
      })),
  ];

  return deterministicShuffle(source).slice(0, limit);
}

export function toInsightsGridItems(posts: BlogPost[], studies: CaseStudy[]): InsightGridItemDTO[] {
  const postItems = posts.map((post) => ({
    id: `blog-${post.slug}`,
    tag: post.category,
    title: post.title,
    excerpt: post.excerpt,
    image: post.coverImage ?? '',
    href: `/blog/${post.slug}`,
    date: post.publishedAt,
  }));

  const caseStudyItems = studies.map((study) => ({
    id: `case-${study.slug}`,
    tag: study.industry,
    title: study.title,
    excerpt: study.summary,
    image: study.assets.coverImage ?? '',
    href: `/case-studies/${study.slug}`,
    date: study.lastUpdated,
  }));

  const result: InsightGridItemDTO[] = [];
  let postIndex = 0;
  let caseIndex = 0;

  while (postIndex < postItems.length || caseIndex < caseStudyItems.length) {
    if (postIndex < postItems.length) result.push(postItems[postIndex++]);
    if (postIndex < postItems.length) result.push(postItems[postIndex++]);
    if (caseIndex < caseStudyItems.length) result.push(caseStudyItems[caseIndex++]);
  }

  return result.filter((item) => Boolean(item.image));
}

export function toRelatedBlogItems(
  posts: BlogPost[],
  currentSlug: string,
  limit = 3
): RelatedCardItemDTO[] {
  return posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
    .map((post) => ({
      href: `/blog/${post.slug}`,
      title: post.title,
      tag: post.category,
      coverImage: post.coverImage || undefined,
    }));
}

export function toRelatedCaseStudyItems(
  studies: CaseStudy[],
  currentSlug: string,
  limit = 3
): RelatedCardItemDTO[] {
  return studies
    .filter((study) => study.slug !== currentSlug)
    .slice(0, limit)
    .map((study) => ({
      href: `/case-studies/${study.slug}`,
      title: study.title,
      tag: study.industry,
      coverImage: study.assets.coverImage || undefined,
    }));
}

export function buildInsightsHubPayload(posts: BlogPost[], studies: CaseStudy[]): InsightsHubPayload {
  return {
    latestPost: posts[0] ? toBlogPreview(posts[0]) : undefined,
    latestCaseStudy: studies[0] ? toCaseStudyPreview(studies[0]) : undefined,
    sliderItems: toInsightsSliderItems(posts, studies, 6),
    allInsights: toInsightsGridItems(posts, studies),
  };
}
