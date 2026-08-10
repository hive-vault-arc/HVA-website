import type {AppLocale} from '@/i18n/config';
import {applyFrenchCmsFallback} from '@/i18n/cms-fallback-fr';
import {withSanityFallback} from '@/sanity/lib/fetch';

import {POSTS} from './blog';
import {
  INSIGHT_COLLECTION_INITIAL_SIZE,
  INSIGHT_COLLECTION_NEXT_SIZE,
  type InsightCollectionCursor,
  type InsightCollectionItem,
  type InsightCollectionType,
  type InsightIndustry,
  type PaginatedInsightCollection,
} from './insight-collection-pagination';
import {
  INSIGHTS_PAGE_SIZE,
  type InsightListingItem,
  type InsightPageCursor,
  type PaginatedInsights,
} from './insight-pagination';
import {NEWS_ARTICLES, RESEARCH_REPORTS} from './insights';
import {PERSPECTIVES} from './perspectives';
import {CASE_STUDIES} from './proof';
import {
  getPaginatedSanityInsightCollection,
  getPaginatedSanityInsights,
} from './sanity-content';

type LocalCollectionRecord = {
  id: string;
  type: InsightCollectionType;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  industryLabel?: string;
  readTime?: string;
  authorName?: string;
  deploymentStatus?: string;
  hasClientEvidence?: boolean;
};

const REAL_ESTATE_LABELS = new Set([
  'luxury real estate',
  'real estate operations',
  'real estate',
  'immobilier de luxe',
  'opérations immobilières',
  'immobilier',
]);

const EDUCATION_LABELS = new Set([
  'education & professional training',
  'éducation et formation professionnelle',
]);

function localizedRecord<T extends {slug: string}>(
  record: T,
  locale: AppLocale,
): T {
  return locale === 'fr' ? applyFrenchCmsFallback(record) : record;
}

function localIndustry(
  label: string | undefined,
  locale: AppLocale,
): InsightIndustry | null {
  const normalized = label?.trim().toLocaleLowerCase();

  if (normalized && REAL_ESTATE_LABELS.has(normalized)) {
    return {
      id: 'real-estate',
      slug: 'real-estate',
      title: locale === 'fr' ? 'Immobilier' : 'Real Estate',
    };
  }

  if (normalized && EDUCATION_LABELS.has(normalized)) {
    return {
      id: 'education-professional-training',
      slug: 'education-professional-training',
      title:
        locale === 'fr'
          ? 'Éducation et formation professionnelle'
          : 'Education & Professional Training',
    };
  }

  return null;
}

function localRecords(
  collectionType: InsightCollectionType,
  locale: AppLocale,
): LocalCollectionRecord[] {
  switch (collectionType) {
    case 'post':
      return POSTS.map((source) => {
        const post = localizedRecord(source, locale);
        return {
          id: `fallback:post:${post.slug}`,
          type: 'post',
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          image: post.coverImage,
          date: post.publishedAt,
          readTime: post.readTime,
          authorName: post.authors[0]?.name,
        };
      });
    case 'newsArticle':
      return NEWS_ARTICLES.map((source) => {
        const article = localizedRecord(source, locale);
        return {
          id: `fallback:newsArticle:${article.slug}`,
          type: 'newsArticle',
          slug: article.slug,
          title: article.title,
          excerpt: article.summary,
          image: article.coverImage ?? '',
          date: article.publishedAt,
          readTime: article.readTime,
        };
      });
    case 'perspective':
      return PERSPECTIVES.map((source) => {
        const perspective = localizedRecord(source, locale);
        return {
          id: `fallback:perspective:${perspective.slug}`,
          type: 'perspective',
          slug: perspective.slug,
          title: perspective.title,
          excerpt: perspective.summary,
          image: perspective.coverImage,
          date: perspective.publishedAt,
          readTime: perspective.readTime,
          authorName: perspective.authors[0]?.name,
        };
      });
    case 'researchReport':
      return RESEARCH_REPORTS.map((source) => {
        const report = localizedRecord(source, locale);
        return {
          id: `fallback:researchReport:${report.slug}`,
          type: 'researchReport',
          slug: report.slug,
          title: report.title,
          excerpt: report.summary,
          image: report.coverImage ?? '',
          date: report.publishedAt,
          readTime: report.readTime,
        };
      });
    case 'caseStudy':
      return CASE_STUDIES.map((source) => {
        const study = localizedRecord(source, locale);
        return {
          id: `fallback:caseStudy:${study.slug}`,
          type: 'caseStudy',
          slug: study.slug,
          title: study.title,
          excerpt: study.summary,
          image:
            typeof study.assets.coverImage === 'string'
              ? study.assets.coverImage
              : '',
          date: study.lastUpdated,
          industryLabel: study.industry,
          deploymentStatus: study.deploymentStatus,
          hasClientEvidence: study.hasClientEvidence,
        };
      });
  }
}

function collectionHref(type: InsightCollectionType, slug: string): string {
  switch (type) {
    case 'post':
      return `/blog/${slug}`;
    case 'newsArticle':
      return `/insights/news-articles/${slug}`;
    case 'perspective':
      return `/insights/perspectives/${slug}`;
    case 'researchReport':
      return `/insights/research-reports/${slug}`;
    case 'caseStudy':
      return `/case-studies/${slug}`;
  }
}

function afterCursor(
  record: LocalCollectionRecord,
  cursor: InsightCollectionCursor | InsightPageCursor | null,
): boolean {
  if (!cursor) return true;

  return (
    record.date < cursor.date ||
    (record.date === cursor.date && record.id > cursor.id)
  );
}

function toCollectionItem(
  record: LocalCollectionRecord,
  locale: AppLocale,
): InsightCollectionItem {
  return {
    id: record.id,
    type: record.type,
    slug: record.slug,
    href: collectionHref(record.type, record.slug),
    title: record.title,
    excerpt: record.excerpt,
    image: record.image,
    date: record.date,
    sourceLocale: locale,
    industry: localIndustry(record.industryLabel, locale),
    ...(record.readTime ? {readTime: record.readTime} : {}),
    ...(record.authorName ? {authorName: record.authorName} : {}),
    ...(record.deploymentStatus
      ? {deploymentStatus: record.deploymentStatus}
      : {}),
    ...(record.hasClientEvidence
      ? {hasClientEvidence: record.hasClientEvidence}
      : {}),
  };
}

export function getLocalInsightCollectionPage(
  locale: AppLocale,
  collectionType: InsightCollectionType,
  cursor: InsightCollectionCursor | null = null,
  industryId: string | null = null,
  includeIndustries = false,
): PaginatedInsightCollection {
  const allRecords = localRecords(collectionType, locale).sort(
    (left, right) =>
      right.date.localeCompare(left.date) || left.id.localeCompare(right.id),
  );
  const allItems = allRecords.map((record) =>
    toCollectionItem(record, locale),
  );
  const industries = [...new Map(
    allItems
      .map((item) => item.industry)
      .filter((industry): industry is InsightIndustry => industry !== null)
      .map((industry) => [industry.id, industry]),
  ).values()];
  const filtered = industryId
    ? allItems.filter((item) => item.industry?.id === industryId)
    : allItems;
  const available = filtered.filter((item) =>
    afterCursor(
      {
        id: item.id,
        type: item.type,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        image: item.image,
        date: item.date,
      },
      cursor,
    ),
  );
  const limit =
    cursor === null
      ? INSIGHT_COLLECTION_INITIAL_SIZE
      : INSIGHT_COLLECTION_NEXT_SIZE;
  const items = available.slice(0, limit);
  const lastItem = items.at(-1);

  return {
    items,
    total: filtered.length,
    nextCursor:
      items.length === limit && lastItem
        ? {date: lastItem.date, id: lastItem.id}
        : null,
    hasFallbackContent: true,
    industries: includeIndustries ? industries : [],
  };
}

function toListingItem(
  record: LocalCollectionRecord,
  locale: AppLocale,
): InsightListingItem {
  const collectionItem = toCollectionItem(record, locale);

  return {
    id: collectionItem.id,
    type:
      record.type === 'post'
        ? 'blog'
        : record.type === 'newsArticle'
          ? 'news-article'
          : record.type === 'researchReport'
            ? 'research-report'
            : record.type === 'caseStudy'
              ? 'case-study'
              : 'perspective',
    tag:
      collectionItem.industry?.title ??
      (record.type === 'post'
        ? 'Blog'
        : record.type === 'newsArticle'
          ? 'News Article'
          : record.type === 'researchReport'
            ? 'Research Report'
            : record.type === 'caseStudy'
              ? 'Case Study'
              : 'Perspective'),
    title: collectionItem.title,
    excerpt: collectionItem.excerpt,
    image: collectionItem.image,
    href: collectionItem.href,
    date: collectionItem.date,
    sourceLocale: locale,
    ...(collectionItem.readTime
      ? {readTime: collectionItem.readTime}
      : {}),
  };
}

export function getLocalInsightsPage(
  locale: AppLocale,
  cursor: InsightPageCursor | null = null,
): PaginatedInsights {
  const records = (
    [
      'post',
      'newsArticle',
      'perspective',
      'researchReport',
      'caseStudy',
    ] as const
  )
    .flatMap((type) => localRecords(type, locale))
    .sort(
      (left, right) =>
        right.date.localeCompare(left.date) || left.id.localeCompare(right.id),
    );
  const available = records.filter((record) => afterCursor(record, cursor));
  const pageRecords = available.slice(0, INSIGHTS_PAGE_SIZE);
  const items = pageRecords.map((record) => toListingItem(record, locale));
  const lastItem = items.at(-1);

  return {
    items,
    total: records.length,
    nextCursor:
      items.length === INSIGHTS_PAGE_SIZE && lastItem
        ? {date: lastItem.date, id: lastItem.id}
        : null,
    hasFallbackContent: true,
  };
}

export function getResilientPaginatedInsightCollection(
  locale: AppLocale,
  collectionType: InsightCollectionType,
  cursor: InsightCollectionCursor | null = null,
  industryId: string | null = null,
  includeIndustries = false,
): Promise<PaginatedInsightCollection> {
  return withSanityFallback(
    () =>
      getPaginatedSanityInsightCollection(
        locale,
        collectionType,
        cursor,
        industryId,
        includeIndustries,
      ),
    () =>
      getLocalInsightCollectionPage(
        locale,
        collectionType,
        cursor,
        industryId,
        includeIndustries,
      ),
    `${collectionType} collection`,
  );
}

export function getResilientPaginatedInsights(
  locale: AppLocale,
  cursor: InsightPageCursor | null = null,
): Promise<PaginatedInsights> {
  return withSanityFallback(
    () => getPaginatedSanityInsights(locale, cursor),
    () => getLocalInsightsPage(locale, cursor),
    'insights index',
  );
}
