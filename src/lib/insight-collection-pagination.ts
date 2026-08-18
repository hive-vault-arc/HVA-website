import type {AppLocale} from '@/i18n/config';
import type {
  EditorialFormat,
  EditorialTopic,
} from './editorial-taxonomy';

export const INSIGHT_COLLECTION_INITIAL_SIZE = 4;
export const INSIGHT_COLLECTION_CASE_STUDY_INITIAL_SIZE = 5;
export const INSIGHT_COLLECTION_NEXT_SIZE = 3;

export const INSIGHT_COLLECTION_TYPES = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
] as const;

export type InsightCollectionType = (typeof INSIGHT_COLLECTION_TYPES)[number];

export type InsightCollectionCursor = {
  date: string;
  id: string;
};

export type InsightIndustry = {
  id: string;
  title: string;
  slug: string;
};

export type InsightCollectionItem = {
  id: string;
  type: InsightCollectionType;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  sourceLocale: AppLocale;
  industry: InsightIndustry | null;
  readTime?: string;
  authorName?: string;
  deploymentStatus?: string;
  hasClientEvidence?: boolean;
  editorialFormat?: EditorialFormat;
  topics?: EditorialTopic[];
  directAnswer?: string;
  evidenceType?: string;
  coverDisclosure?: string;
};

export type PaginatedInsightCollection = {
  items: InsightCollectionItem[];
  total: number;
  nextCursor: InsightCollectionCursor | null;
  hasFallbackContent: boolean;
  industries: InsightIndustry[];
};

export function isInsightCollectionType(value: string): value is InsightCollectionType {
  return INSIGHT_COLLECTION_TYPES.includes(value as InsightCollectionType);
}
