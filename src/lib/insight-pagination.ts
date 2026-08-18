import type {AppLocale} from '@/i18n/config';
import type {
  EditorialFormat,
  EditorialTopic,
} from './editorial-taxonomy';

export const INSIGHTS_PAGE_SIZE = 6;

export type InsightListingType =
  | 'blog'
  | 'case-study'
  | 'news-article'
  | 'perspective'
  | 'research-report';

export type InsightListingItem = {
  id: string;
  type: InsightListingType;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  readTime?: string;
  meta?: string;
  sourceLocale: AppLocale;
  editorialFormat?: EditorialFormat;
  topics?: EditorialTopic[];
  directAnswer?: string;
  evidenceType?: string;
  coverDisclosure?: string;
};

export type InsightPageCursor = {
  date: string;
  id: string;
};

export type PaginatedInsights = {
  items: InsightListingItem[];
  total: number;
  hasFallbackContent: boolean;
  nextCursor: InsightPageCursor | null;
};
