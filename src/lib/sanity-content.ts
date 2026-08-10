import type { SanityImageSource } from '@sanity/image-url';
import type {AppLocale} from '@/i18n/config';
import {applyFrenchCmsFallback} from '@/i18n/cms-fallback-fr';
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
import {localeTag, type LocalizedContentMeta} from './localized-content';
import type { BlogPost } from './blog';
import type { NewsArticle, ResearchReport } from './insights';
import type { Perspective } from './perspectives';
import type {
  CaseStudy,
  CaseStudyOutcome,
  CaseStudyOutcomeCategory,
  CaseStudyProjectMedia,
  ClientEvidence,
  ClientEvidenceSummary,
  HomeCaseStudyProof,
  PortfolioCaseStudy,
} from './proof';
import { sanityFetch } from '../sanity/lib/fetch';
import { urlForImage } from '../sanity/lib/image';
import {
  allCaseStudiesQuery,
  allInsightCollectionsQuery,
  allNewsArticlesQuery,
  allPerspectivesQuery,
  allPostsQuery,
  allResearchReportsQuery,
  caseStudyBySlugQuery,
  clientEvidenceShowcaseQuery,
  homeCaseStudyProofQuery,
  industryInsightCollectionsQuery,
  newsArticleBySlugQuery,
  paginatedInsightCollectionQuery,
  perspectiveBySlugQuery,
  paginatedInsightsQuery,
  portfolioCaseStudiesQuery,
  postBySlugQuery,
  researchReportBySlugQuery,
} from '../sanity/queries/insights';

const INSIGHTS_TAG = 'insights';
const COVER_WIDTH = 1600;
const COVER_HEIGHT = 900;
const CARD_COVER_WIDTH = 960;
const CARD_COVER_HEIGHT = 540;
const MAX_CLIENT_EVIDENCE_PDF_SIZE = 3 * 1024 * 1024;

type SanityImageValue = SanityImageSource | null | undefined;
type SanityPost = Omit<BlogPost, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityNewsArticle = Omit<NewsArticle, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityPerspective = Omit<Perspective, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityResearchReport = Omit<ResearchReport, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityClientEvidence = Omit<ClientEvidence, 'testimonialPdf'> & {
  testimonialPdf?: Partial<ClientEvidence['testimonialPdf']> | null;
};
type SanityCaseStudyProjectMedia = Omit<CaseStudyProjectMedia, 'image'> & {
  image?: SanityImageValue;
};
type SanityCaseStudy = Omit<
  CaseStudy,
  | 'assets'
  | 'clientEvidence'
  | 'hasClientEvidence'
  | 'projectMedia'
  | 'publishedOutcomes'
> & {
  hasClientEvidence?: boolean;
  clientEvidence?: SanityClientEvidence | null;
  projectMedia?: SanityCaseStudyProjectMedia[] | null;
  publishedOutcomes?: Partial<CaseStudyOutcome>[] | null;
  assets?: Omit<CaseStudy['assets'], 'coverImage'> & {
    coverImage?: SanityImageValue;
  };
};
type SanityClientEvidenceSummary = {
  slug?: string;
  caseStudyTitle?: string;
  clientName?: string;
  industry?: string;
  documentTitle?: string;
  documentLanguage?: string;
  issuedOn?: string;
  quoteExcerpt?: string;
  signatoryName?: string;
  signatoryRole?: string;
  clientLogo?: SanityImageValue;
  clientLogoAlt?: string;
  coverImage?: SanityImageValue;
  coverImageAlt?: string;
};

type SanityInsightCollections = {
  posts?: SanityPost[];
  newsArticles?: SanityNewsArticle[];
  perspectives?: SanityPerspective[];
  researchReports?: SanityResearchReport[];
  caseStudies?: SanityCaseStudy[];
};

type SanityHomeCaseStudyProof = {
  caseStudies?: SanityCaseStudy[];
  clientEvidence?: SanityClientEvidenceSummary[];
};

type SanityPaginatedInsight = {
  _id: string;
  _type: 'post' | 'newsArticle' | 'perspective' | 'researchReport' | 'caseStudy';
  language?: AppLocale;
  slug: string;
  title: string;
  publishedAt?: string;
  lastUpdated?: string;
  category?: string;
  excerpt?: string;
  summary?: string;
  tag?: string;
  readTime?: string;
  clientName?: string;
  industry?: string;
  coverImage?: SanityImageValue;
  assets?: {
    coverImage?: SanityImageValue;
  };
};

type SanityPaginatedInsightsResult = {
  items?: SanityPaginatedInsight[];
  total?: number;
  fallbackCount?: number;
};

type SanityInsightIndustry = {
  id?: string;
  title?: string;
  slug?: string;
  language?: AppLocale;
};

type SanityPaginatedCollectionItem = {
  _id: string;
  _type: InsightCollectionType;
  language?: AppLocale;
  slug: string;
  title: string;
  publishedAt?: string;
  lastUpdated?: string;
  excerpt?: string;
  summary?: string;
  readTime?: string;
  authorName?: string;
  deploymentStatus?: string;
  legacyIndustry?: string;
  hasClientEvidence?: boolean;
  industryTaxonomy?: SanityInsightIndustry | null;
  coverImage?: SanityImageValue;
  assets?: {
    coverImage?: SanityImageValue;
  };
};

type SanityPaginatedInsightCollectionResult = {
  items?: SanityPaginatedCollectionItem[];
  total?: number;
  fallbackCount?: number;
  industries?: SanityInsightIndustry[];
};

export type InsightCollections = {
  posts: BlogPost[];
  newsArticles: NewsArticle[];
  perspectives: Perspective[];
  researchReports: ResearchReport[];
  caseStudies: CaseStudy[];
};

type IndustryInsightBase = LocalizedContentMeta & {
  slug: string;
  title: string;
  publishedAt: string;
  coverImage: string;
};

export type IndustryPostInsight = IndustryInsightBase & {
  category: string;
  excerpt: string;
};

export type IndustryNewsInsight = IndustryInsightBase & {
  category?: string;
  tag: string;
  summary: string;
};

export type IndustryEditorialInsight = IndustryInsightBase & {
  tag: string;
  summary: string;
};

export type IndustryCaseStudyInsight = Omit<
  IndustryInsightBase,
  'publishedAt' | 'coverImage'
> & {
  industry: string;
  summary: string;
  lastUpdated: string;
  assets: {
    coverImage: string;
  };
};
type SanityPortfolioCaseStudy = Omit<PortfolioCaseStudy, 'assets'> & {
  assets?: {
    coverImage?: SanityImageValue;
    coverAlt?: string;
    clientLogo?: SanityImageValue;
    clientLogoAlt?: string;
  };
};

export type IndustryInsightCollections = {
  posts: IndustryPostInsight[];
  newsArticles: IndustryNewsInsight[];
  perspectives: IndustryEditorialInsight[];
  researchReports: IndustryEditorialInsight[];
  caseStudies: IndustryCaseStudyInsight[];
};

type SanityIndustryPostInsight = Omit<IndustryPostInsight, 'coverImage'> & {
  coverImage?: SanityImageValue;
};

type SanityIndustryNewsInsight = Omit<IndustryNewsInsight, 'coverImage'> & {
  coverImage?: SanityImageValue;
};

type SanityIndustryEditorialInsight = Omit<
  IndustryEditorialInsight,
  'coverImage'
> & {
  coverImage?: SanityImageValue;
};

type SanityIndustryCaseStudyInsight = Omit<
  IndustryCaseStudyInsight,
  'assets'
> & {
  assets?: {
    coverImage?: SanityImageValue;
  };
};

type SanityIndustryInsightCollections = {
  posts?: SanityIndustryPostInsight[];
  newsArticles?: SanityIndustryNewsInsight[];
  perspectives?: SanityIndustryEditorialInsight[];
  researchReports?: SanityIndustryEditorialInsight[];
  caseStudies?: SanityIndustryCaseStudyInsight[];
};

function imageUrlFromSource(
  image: SanityImageValue,
  width = COVER_WIDTH,
  height = COVER_HEIGHT,
): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(width)
    .height(height)
    .fit('crop')
    .format('webp')
    .url();
}

function logoUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image).width(600).fit('max').format('webp').url();
}

function projectMediaUrlFromSource(
  image: SanityImageValue,
  deviceType: CaseStudyProjectMedia['deviceType'],
): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(deviceType === 'phone' ? 900 : 1800)
    .fit('max')
    .format('webp')
    .url();
}

function normalizeCaseStudyProjectMedia(
  media: SanityCaseStudyProjectMedia[] | null | undefined,
): CaseStudyProjectMedia[] {
  return (media ?? []).flatMap((item) => {
    const deviceType = item.deviceType === 'phone' ? 'phone' : 'desktop';
    const image = projectMediaUrlFromSource(item.image, deviceType);
    const alt = typeof item.alt === 'string' ? item.alt.trim() : '';
    if (!item._key || !image || !alt) return [];

    const placement =
      item.placement === 'afterChallenge' ||
      item.placement === 'afterArchitecture' ||
      item.placement === 'afterModules'
        ? item.placement
        : 'afterArchitecture';
    const evidenceType =
      item.evidenceType === 'deliveredInterface' ||
      item.evidenceType === 'conceptualInterface'
        ? item.evidenceType
        : 'fixtureBacked';

    return [
      {
        _key: item._key,
        image,
        width:
          typeof item.width === 'number' && item.width > 0
            ? item.width
            : deviceType === 'phone'
              ? 600
              : 1600,
        height:
          typeof item.height === 'number' && item.height > 0
            ? item.height
            : deviceType === 'phone'
              ? 1120
              : 970,
        ...(item.lqip ? {lqip: item.lqip} : {}),
        deviceType,
        placement,
        evidenceType,
        alt,
        ...(item.caption?.trim() ? {caption: item.caption.trim()} : {}),
        ...(item.disclosure?.trim() ? {disclosure: item.disclosure.trim()} : {}),
        publicationStatus:
          item.publicationStatus === 'approved' ? 'approved' : 'notCleared',
      },
    ];
  });
}

const CASE_STUDY_OUTCOME_CATEGORIES = new Set<CaseStudyOutcomeCategory>([
  'responseTime',
  'conversion',
  'visibility',
  'throughput',
  'cycleTime',
  'operatingMargin',
  'other',
]);

function normalizeCaseStudyOutcomes(
  outcomes: Partial<CaseStudyOutcome>[] | null | undefined,
): CaseStudyOutcome[] {
  return (outcomes ?? []).flatMap((outcome) => {
    const key = nonEmptyString(outcome._key);
    const value = nonEmptyString(outcome.value);
    const label = nonEmptyString(outcome.label);
    const context = nonEmptyString(outcome.context);
    const scope = outcome.scope === 'benchmark' ? 'benchmark' : 'caseStudy';
    const category = CASE_STUDY_OUTCOME_CATEGORIES.has(
      outcome.category as CaseStudyOutcomeCategory,
    )
      ? (outcome.category as CaseStudyOutcomeCategory)
      : 'other';

    if (!key || !value || !label || !context) return [];

    return [{_key: key, scope, category, value, label, context}];
  });
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

function normalizeClientEvidence(evidence: SanityClientEvidence | null | undefined): ClientEvidence | undefined {
  if (!evidence) return undefined;

  const documentTitle = nonEmptyString(evidence.documentTitle);
  const documentLanguage = nonEmptyString(evidence.documentLanguage);
  const pdfUrl = nonEmptyString(evidence.testimonialPdf?.url);
  const mimeType = nonEmptyString(evidence.testimonialPdf?.mimeType);
  const size = evidence.testimonialPdf?.size;

  if (
    !documentTitle ||
    !documentLanguage ||
    !pdfUrl ||
    mimeType !== 'application/pdf' ||
    typeof size !== 'number' ||
    !Number.isFinite(size) ||
    size <= 0 ||
    size > MAX_CLIENT_EVIDENCE_PDF_SIZE
  ) {
    return undefined;
  }

  const issuedOn = nonEmptyString(evidence.issuedOn);
  const quoteExcerpt = nonEmptyString(evidence.quoteExcerpt);
  const signatoryName = nonEmptyString(evidence.signatoryName);
  const signatoryRole = nonEmptyString(evidence.signatoryRole);

  return {
    documentTitle,
    documentLanguage,
    ...(issuedOn ? { issuedOn } : {}),
    ...(quoteExcerpt ? { quoteExcerpt } : {}),
    ...(signatoryName ? { signatoryName } : {}),
    ...(signatoryRole ? { signatoryRole } : {}),
    testimonialPdf: {
      url: pdfUrl,
      mimeType,
      size,
    },
  };
}

function normalizeClientEvidenceSummary(
  evidence: SanityClientEvidenceSummary
): ClientEvidenceSummary | null {
  const slug = nonEmptyString(evidence.slug);
  const caseStudyTitle = nonEmptyString(evidence.caseStudyTitle);
  const clientName = nonEmptyString(evidence.clientName);
  const industry = nonEmptyString(evidence.industry);
  const documentTitle = nonEmptyString(evidence.documentTitle);
  const documentLanguage = nonEmptyString(evidence.documentLanguage);

  if (!slug || !caseStudyTitle || !clientName || !industry || !documentTitle || !documentLanguage) {
    return null;
  }

  const issuedOn = nonEmptyString(evidence.issuedOn);
  const quoteExcerpt = nonEmptyString(evidence.quoteExcerpt);
  const signatoryName = nonEmptyString(evidence.signatoryName);
  const signatoryRole = nonEmptyString(evidence.signatoryRole);
  const clientLogo = logoUrlFromSource(evidence.clientLogo);
  const coverImage = imageUrlFromSource(evidence.coverImage);
  const coverImageAlt = nonEmptyString(evidence.coverImageAlt);

  return {
    slug,
    caseStudyTitle,
    clientName,
    industry,
    documentTitle,
    documentLanguage,
    ...(issuedOn ? { issuedOn } : {}),
    ...(quoteExcerpt ? { quoteExcerpt } : {}),
    ...(signatoryName ? { signatoryName } : {}),
    ...(signatoryRole ? { signatoryRole } : {}),
    ...(clientLogo ? { clientLogo } : {}),
    clientLogoAlt: nonEmptyString(evidence.clientLogoAlt) ?? `${clientName} logo`,
    ...(coverImage ? { coverImage } : {}),
    ...(coverImageAlt ? { coverImageAlt } : {}),
  };
}

function normalizePost(post: SanityPost, listing = false): BlogPost {
  return {
    ...post,
    authors: post.authors ?? [],
    coverImage: imageUrlFromSource(
      post.coverImage,
      listing ? CARD_COVER_WIDTH : COVER_WIDTH,
      listing ? CARD_COVER_HEIGHT : COVER_HEIGHT,
    ),
    coverAlt: post.coverAlt ?? post.title,
    tags: post.tags ?? [],
    faqs: post.faqs ?? [],
    sources: post.sources ?? [],
    sections: post.sections ?? [],
  };
}

function normalizeNewsArticle(article: SanityNewsArticle, listing = false): NewsArticle {
  return {
    ...article,
    coverImage: imageUrlFromSource(
      article.coverImage,
      listing ? CARD_COVER_WIDTH : COVER_WIDTH,
      listing ? CARD_COVER_HEIGHT : COVER_HEIGHT,
    ),
    coverAlt: article.coverAlt ?? article.title,
    sources: article.sources ?? [],
    tags: article.tags ?? [],
    sections: article.sections ?? [],
  };
}

function normalizePerspective(perspective: SanityPerspective, listing = false): Perspective {
  return {
    ...perspective,
    authors: perspective.authors ?? [],
    keywords: perspective.keywords ?? [],
    sources: perspective.sources ?? [],
    coverImage: imageUrlFromSource(
      perspective.coverImage,
      listing ? CARD_COVER_WIDTH : COVER_WIDTH,
      listing ? CARD_COVER_HEIGHT : COVER_HEIGHT,
    ),
    coverAlt: perspective.coverAlt ?? perspective.title,
    sections: perspective.sections ?? [],
  };
}

function normalizeResearchReport(report: SanityResearchReport, listing = false): ResearchReport {
  return {
    ...report,
    authors: report.authors ?? [],
    keywords: report.keywords ?? [],
    sources: report.sources ?? [],
    sections: report.sections ?? [],
    coverImage: imageUrlFromSource(
      report.coverImage,
      listing ? CARD_COVER_WIDTH : COVER_WIDTH,
      listing ? CARD_COVER_HEIGHT : COVER_HEIGHT,
    ),
    coverAlt: report.coverAlt ?? report.title,
  };
}

function normalizeCaseStudy(study: SanityCaseStudy, listing = false): CaseStudy {
  const {
    assets: rawAssets,
    clientEvidence: rawClientEvidence,
    hasClientEvidence: rawHasClientEvidence,
    projectMedia: rawProjectMedia,
    publishedOutcomes: rawPublishedOutcomes,
    ...baseStudy
  } = study;
  const assets: {
    coverImage?: SanityImageValue;
    coverAlt?: string;
    logoLabel?: string;
    clientLogo?: SanityImageValue;
    clientLogoAlt?: string;
    clientWebsite?: string;
  } = rawAssets ?? { logoLabel: study.clientName };
  const clientEvidence = normalizeClientEvidence(rawClientEvidence);

  return {
    ...baseStudy,
    operationalModules: study.operationalModules ?? [],
    integrations: study.integrations ?? [],
    publishedOutcomes: normalizeCaseStudyOutcomes(rawPublishedOutcomes),
    projectMedia: normalizeCaseStudyProjectMedia(rawProjectMedia),
    hasClientEvidence: Boolean(rawHasClientEvidence || clientEvidence),
    ...(clientEvidence ? { clientEvidence } : {}),
    assets: {
      ...assets,
      coverImage: imageUrlFromSource(
        assets.coverImage,
        listing ? CARD_COVER_WIDTH : COVER_WIDTH,
        listing ? CARD_COVER_HEIGHT : COVER_HEIGHT,
      ),
      coverAlt: assets.coverAlt ?? study.title,
      logoLabel: assets.logoLabel ?? study.clientName,
      clientLogo: logoUrlFromSource(assets.clientLogo),
      clientLogoAlt: assets.clientLogoAlt ?? `${study.clientName} logo`,
      clientWebsite: assets.clientWebsite,
    },
  };
}

function normalizePaginatedInsight(
  rawItem: SanityPaginatedInsight,
  locale: AppLocale,
): InsightListingItem {
  const item =
    locale === 'fr' && rawItem.language === 'en'
      ? applyFrenchCmsFallback(rawItem)
      : rawItem;
  const date = item.publishedAt ?? item.lastUpdated ?? '';
  const image = imageUrlFromSource(
    item._type === 'caseStudy' ? item.assets?.coverImage : item.coverImage,
    CARD_COVER_WIDTH,
    CARD_COVER_HEIGHT,
  );
  const base = {
    id: item._id,
    title: item.title,
    image,
    date,
    sourceLocale: locale,
  };

  switch (item._type) {
    case 'post':
      return {
        ...base,
        type: 'blog',
        tag: item.category ?? '',
        excerpt: item.excerpt ?? '',
        href: `/blog/${item.slug}`,
        ...(item.readTime ? {readTime: item.readTime} : {}),
      };
    case 'newsArticle':
      return {
        ...base,
        type: 'news-article',
        tag: item.category ?? item.tag ?? '',
        excerpt: item.summary ?? '',
        href: `/insights/news-articles/${item.slug}`,
        ...(item.readTime ? {readTime: item.readTime} : {}),
      };
    case 'perspective':
      return {
        ...base,
        type: 'perspective',
        tag: item.tag ?? '',
        excerpt: item.summary ?? '',
        href: `/insights/perspectives/${item.slug}`,
        ...(item.readTime ? {readTime: item.readTime} : {}),
      };
    case 'researchReport':
      return {
        ...base,
        type: 'research-report',
        tag: item.tag ?? '',
        excerpt: item.summary ?? '',
        href: `/insights/research-reports/${item.slug}`,
        ...(item.readTime ? {readTime: item.readTime} : {}),
      };
    case 'caseStudy':
      return {
        ...base,
        type: 'case-study',
        tag: item.industry ?? '',
        excerpt: item.summary ?? '',
        href: `/case-studies/${item.slug}`,
        ...(item.clientName ? {meta: item.clientName} : {}),
      };
  }
}

export async function getPaginatedSanityInsights(
  locale: AppLocale,
  cursor: InsightPageCursor | null = null,
): Promise<PaginatedInsights> {
  const result = await sanityFetch<SanityPaginatedInsightsResult>({
    query: paginatedInsightsQuery,
    params: {
      locale,
      limit: INSIGHTS_PAGE_SIZE,
      hasCursor: cursor !== null,
      cursorDate: cursor?.date ?? '',
      cursorId: cursor?.id ?? '',
    },
    tags: [
      INSIGHTS_TAG,
      localeTag('posts', locale),
      localeTag('newsArticles', locale),
      localeTag('perspectives', locale),
      localeTag('researchReports', locale),
      localeTag('caseStudies', locale),
    ],
  });
  const rawItems = result.items ?? [];
  const items = rawItems.map((item) => normalizePaginatedInsight(item, locale));
  const lastItem = rawItems.at(-1);

  return {
    items,
    total: Math.max(0, result.total ?? 0),
    hasFallbackContent: (result.fallbackCount ?? 0) > 0,
    nextCursor:
      rawItems.length === INSIGHTS_PAGE_SIZE && lastItem
        ? {
            date: lastItem.publishedAt ?? lastItem.lastUpdated ?? '',
            id: lastItem._id,
          }
        : null,
  };
}

const insightCollectionTags: Record<InsightCollectionType, string> = {
  post: 'posts',
  newsArticle: 'newsArticles',
  perspective: 'perspectives',
  researchReport: 'researchReports',
  caseStudy: 'caseStudies',
};

function normalizeInsightIndustry(
  industry: SanityInsightIndustry | null | undefined,
): InsightIndustry | null {
  const id = nonEmptyString(industry?.id);
  const title = nonEmptyString(industry?.title);
  const slug = nonEmptyString(industry?.slug);

  return id && title && slug ? {id, title, slug} : null;
}

function normalizeInsightIndustries(
  industries: SanityInsightIndustry[],
  locale: AppLocale,
): InsightIndustry[] {
  const grouped = new Map<string, SanityInsightIndustry[]>();

  for (const industry of industries) {
    const slug = nonEmptyString(industry.slug);
    if (!slug) continue;

    grouped.set(slug, [...(grouped.get(slug) ?? []), industry]);
  }

  return [...grouped.entries()]
    .map(([slug, translations]) => {
      const preferred =
        translations.find((industry) => industry.language === locale) ??
        translations.find((industry) => industry.language === 'en') ??
        translations[0];
      const title = nonEmptyString(preferred?.title);

      return title ? {id: slug, title, slug} : null;
    })
    .filter((industry): industry is InsightIndustry => industry !== null);
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

function normalizePaginatedCollectionItem(
  rawItem: SanityPaginatedCollectionItem,
  locale: AppLocale,
): InsightCollectionItem {
  const item =
    locale === 'fr' && rawItem.language === 'en'
      ? applyFrenchCmsFallback(rawItem)
      : rawItem;
  const imageSource =
    item._type === 'caseStudy' ? item.assets?.coverImage : item.coverImage;

  return {
    id: item._id,
    type: item._type,
    slug: item.slug,
    href: collectionHref(item._type, item.slug),
    title: item.title,
    excerpt: item.excerpt ?? item.summary ?? '',
    image: imageUrlFromSource(
      imageSource,
      CARD_COVER_WIDTH,
      CARD_COVER_HEIGHT,
    ),
    date: item.publishedAt ?? item.lastUpdated ?? '',
    sourceLocale: locale,
    industry: normalizeInsightIndustry(item.industryTaxonomy),
    ...(item.readTime ? {readTime: item.readTime} : {}),
    ...(item.authorName ? {authorName: item.authorName} : {}),
    ...(item.deploymentStatus
      ? {deploymentStatus: item.deploymentStatus}
      : {}),
    ...(item.hasClientEvidence
      ? {hasClientEvidence: item.hasClientEvidence}
      : {}),
  };
}

export async function getPaginatedSanityInsightCollection(
  locale: AppLocale,
  collectionType: InsightCollectionType,
  cursor: InsightCollectionCursor | null = null,
  industryId: string | null = null,
  includeIndustries = false,
): Promise<PaginatedInsightCollection> {
  const limit =
    cursor === null
      ? INSIGHT_COLLECTION_INITIAL_SIZE
      : INSIGHT_COLLECTION_NEXT_SIZE;
  const tag = insightCollectionTags[collectionType];
  const result = await sanityFetch<SanityPaginatedInsightCollectionResult>({
    query: paginatedInsightCollectionQuery,
    params: {
      locale,
      collectionType,
      limit,
      hasCursor: cursor !== null,
      cursorDate: cursor?.date ?? '',
      cursorId: cursor?.id ?? '',
      hasIndustry: Boolean(industryId),
      industryId: industryId ?? '',
      includeIndustries,
    },
    tags: [
      INSIGHTS_TAG,
      'industries',
      tag,
      localeTag(tag, locale),
    ],
  });
  const rawItems = result.items ?? [];
  const lastItem = rawItems.at(-1);

  return {
    items: rawItems.map((item) =>
      normalizePaginatedCollectionItem(item, locale),
    ),
    total: Math.max(0, result.total ?? 0),
    nextCursor:
      rawItems.length === limit && lastItem
        ? {
            date: lastItem.publishedAt ?? lastItem.lastUpdated ?? '',
            id: lastItem._id,
          }
        : null,
    hasFallbackContent: (result.fallbackCount ?? 0) > 0,
    industries: normalizeInsightIndustries(result.industries ?? [], locale),
  };
}

export async function getSanityInsightCollections(
  locales: AppLocale[],
): Promise<InsightCollections> {
  const collections = await sanityFetch<SanityInsightCollections>({
    query: allInsightCollectionsQuery,
    params: {locales},
    tags: [
      INSIGHTS_TAG,
      ...locales.flatMap((locale) => [
        localeTag('posts', locale),
        localeTag('newsArticles', locale),
        localeTag('perspectives', locale),
        localeTag('researchReports', locale),
        localeTag('caseStudies', locale),
      ]),
    ],
  });

  return {
    posts: (collections.posts ?? []).map((post) => normalizePost(post, true)),
    newsArticles: (collections.newsArticles ?? []).map((article) =>
      normalizeNewsArticle(article, true),
    ),
    perspectives: (collections.perspectives ?? []).map((perspective) =>
      normalizePerspective(perspective, true),
    ),
    researchReports: (collections.researchReports ?? []).map((report) =>
      normalizeResearchReport(report, true),
    ),
    caseStudies: (collections.caseStudies ?? []).map((study) =>
      normalizeCaseStudy(study, true),
    ),
  };
}

function normalizePortfolioCaseStudy(study: SanityPortfolioCaseStudy): PortfolioCaseStudy {
  const assets = study.assets ?? {};

  return {
    ...study,
    assets: {
      coverImage: imageUrlFromSource(
        assets.coverImage,
        CARD_COVER_WIDTH,
        CARD_COVER_HEIGHT,
      ),
      coverAlt: assets.coverAlt ?? study.title,
      clientLogo: logoUrlFromSource(assets.clientLogo),
      clientLogoAlt: assets.clientLogoAlt ?? `${study.clientName} logo`,
    },
  };
}

export async function getSanityIndustryInsightCollections(
  locales: AppLocale[],
): Promise<IndustryInsightCollections> {
  const collections = await sanityFetch<SanityIndustryInsightCollections>({
    query: industryInsightCollectionsQuery,
    params: {locales},
    tags: [
      INSIGHTS_TAG,
      ...locales.flatMap((locale) => [
        localeTag('posts', locale),
        localeTag('newsArticles', locale),
        localeTag('perspectives', locale),
        localeTag('researchReports', locale),
        localeTag('caseStudies', locale),
      ]),
    ],
  });

  return {
    posts: (collections.posts ?? []).map((post) => ({
      ...post,
      coverImage: imageUrlFromSource(
        post.coverImage,
        CARD_COVER_WIDTH,
        CARD_COVER_HEIGHT,
      ),
    })),
    newsArticles: (collections.newsArticles ?? []).map((article) => ({
      ...article,
      coverImage: imageUrlFromSource(
        article.coverImage,
        CARD_COVER_WIDTH,
        CARD_COVER_HEIGHT,
      ),
    })),
    perspectives: (collections.perspectives ?? []).map((perspective) => ({
      ...perspective,
      coverImage: imageUrlFromSource(
        perspective.coverImage,
        CARD_COVER_WIDTH,
        CARD_COVER_HEIGHT,
      ),
    })),
    researchReports: (collections.researchReports ?? []).map((report) => ({
      ...report,
      coverImage: imageUrlFromSource(
        report.coverImage,
        CARD_COVER_WIDTH,
        CARD_COVER_HEIGHT,
      ),
    })),
    caseStudies: (collections.caseStudies ?? []).map((study) => ({
      ...study,
      assets: {
        coverImage: imageUrlFromSource(
          study.assets?.coverImage,
          CARD_COVER_WIDTH,
          CARD_COVER_HEIGHT,
        ),
      },
    })),
  };
}

export async function getAllSanityPosts(locale: AppLocale = 'en'): Promise<BlogPost[]> {
  const posts = await sanityFetch<SanityPost[]>({
    query: allPostsQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'posts', localeTag('posts', locale)],
  });

  return posts.map((post) => normalizePost(post, true));
}

export async function getSanityPostBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<BlogPost | null> {
  const post = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: {slug, locale},
    tags: [INSIGHTS_TAG, localeTag('posts', locale), `post:${locale}:${slug}`],
  });

  return post ? normalizePost(post) : null;
}

export async function getRelatedSanityPosts(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<BlogPost[]> {
  const posts = await getAllSanityPosts(locale);
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityNewsArticles(
  locale: AppLocale = 'en'
): Promise<NewsArticle[]> {
  const articles = await sanityFetch<SanityNewsArticle[]>({
    query: allNewsArticlesQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'newsArticles', localeTag('newsArticles', locale)],
  });

  return articles.map((article) => normalizeNewsArticle(article, true));
}

export async function getSanityNewsArticleBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<NewsArticle | null> {
  const article = await sanityFetch<SanityNewsArticle | null>({
    query: newsArticleBySlugQuery,
    params: {slug, locale},
    tags: [
      INSIGHTS_TAG,
      localeTag('newsArticles', locale),
      `newsArticle:${locale}:${slug}`,
    ],
  });

  return article ? normalizeNewsArticle(article) : null;
}

export async function getRelatedSanityNewsArticles(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<NewsArticle[]> {
  const articles = await getAllSanityNewsArticles(locale);
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityPerspectives(
  locale: AppLocale = 'en'
): Promise<Perspective[]> {
  const perspectives = await sanityFetch<SanityPerspective[]>({
    query: allPerspectivesQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'perspectives', localeTag('perspectives', locale)],
  });

  return perspectives.map((perspective) => normalizePerspective(perspective, true));
}

export async function getSanityPerspectiveBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<Perspective | null> {
  const perspective = await sanityFetch<SanityPerspective | null>({
    query: perspectiveBySlugQuery,
    params: {slug, locale},
    tags: [
      INSIGHTS_TAG,
      localeTag('perspectives', locale),
      `perspective:${locale}:${slug}`,
    ],
  });

  return perspective ? normalizePerspective(perspective) : null;
}

export async function getRelatedSanityPerspectives(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<Perspective[]> {
  const perspectives = await getAllSanityPerspectives(locale);
  return perspectives.filter((perspective) => perspective.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityResearchReports(
  locale: AppLocale = 'en'
): Promise<ResearchReport[]> {
  const reports = await sanityFetch<SanityResearchReport[]>({
    query: allResearchReportsQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'researchReports', localeTag('researchReports', locale)],
  });

  return reports.map((report) => normalizeResearchReport(report, true));
}

export async function getSanityResearchReportBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<ResearchReport | null> {
  const report = await sanityFetch<SanityResearchReport | null>({
    query: researchReportBySlugQuery,
    params: {slug, locale},
    tags: [
      INSIGHTS_TAG,
      localeTag('researchReports', locale),
      `researchReport:${locale}:${slug}`,
    ],
  });

  return report ? normalizeResearchReport(report) : null;
}

export async function getAllSanityCaseStudies(
  locale: AppLocale = 'en'
): Promise<CaseStudy[]> {
  const studies = await sanityFetch<SanityCaseStudy[]>({
    query: allCaseStudiesQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'caseStudies', localeTag('caseStudies', locale)],
  });

  return studies.map((study) => normalizeCaseStudy(study, true));
}

export async function getSanityHomeCaseStudyProof(
  locale: AppLocale = 'en',
): Promise<HomeCaseStudyProof> {
  const proof = await sanityFetch<SanityHomeCaseStudyProof>({
    query: homeCaseStudyProofQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'caseStudies', localeTag('caseStudies', locale)],
  });

  return {
    caseStudies: (proof.caseStudies ?? []).map((study) =>
      normalizeCaseStudy(study, true),
    ),
    clientEvidence: (proof.clientEvidence ?? [])
      .map(normalizeClientEvidenceSummary)
      .filter((item): item is ClientEvidenceSummary => item !== null),
  };
}

export async function getSanityPortfolioCaseStudies(
  locale: AppLocale = 'en',
): Promise<PortfolioCaseStudy[]> {
  const studies = await sanityFetch<SanityPortfolioCaseStudy[]>({
    query: portfolioCaseStudiesQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'caseStudies', localeTag('caseStudies', locale)],
  });

  return studies.map(normalizePortfolioCaseStudy);
}

export async function getSanityClientEvidenceShowcase(
  locale: AppLocale = 'en'
): Promise<ClientEvidenceSummary[]> {
  const evidence = await sanityFetch<SanityClientEvidenceSummary[]>({
    query: clientEvidenceShowcaseQuery,
    params: {locale},
    tags: [INSIGHTS_TAG, 'caseStudies', localeTag('caseStudies', locale)],
  });

  return evidence
    .map(normalizeClientEvidenceSummary)
    .filter((item): item is ClientEvidenceSummary => item !== null);
}

export async function getSanityCaseStudyBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<CaseStudy | null> {
  const study = await sanityFetch<SanityCaseStudy | null>({
    query: caseStudyBySlugQuery,
    params: {slug, locale},
    tags: [
      INSIGHTS_TAG,
      localeTag('caseStudies', locale),
      `caseStudy:${locale}:${slug}`,
    ],
  });

  return study ? normalizeCaseStudy(study) : null;
}

export async function getRelatedSanityCaseStudies(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<CaseStudy[]> {
  const studies = await getAllSanityCaseStudies(locale);
  return studies.filter((study) => study.slug !== currentSlug).slice(0, limit);
}
