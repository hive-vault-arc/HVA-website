import type { SanityImageSource } from '@sanity/image-url';
import type { BlogPost } from './blog';
import type { NewsArticle, ResearchReport } from './insights';
import type { Perspective } from './perspectives';
import type { CaseStudy, ClientEvidence, ClientEvidenceSummary } from './proof';
import { sanityFetch } from '../sanity/lib/fetch';
import { urlForImage } from '../sanity/lib/image';
import {
  allCaseStudiesQuery,
  allNewsArticlesQuery,
  allPerspectivesQuery,
  allPostsQuery,
  allResearchReportsQuery,
  caseStudyBySlugQuery,
  clientEvidenceShowcaseQuery,
  newsArticleBySlugQuery,
  perspectiveBySlugQuery,
  postBySlugQuery,
  researchReportBySlugQuery,
} from '../sanity/queries/insights';

const INSIGHTS_TAG = 'insights';
const COVER_WIDTH = 1600;
const COVER_HEIGHT = 900;
const MAX_CLIENT_EVIDENCE_PDF_SIZE = 3 * 1024 * 1024;

type SanityImageValue = SanityImageSource | null | undefined;
type SanityPost = Omit<BlogPost, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityNewsArticle = Omit<NewsArticle, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityPerspective = Omit<Perspective, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityResearchReport = Omit<ResearchReport, 'coverImage'> & { coverImage?: SanityImageValue };
type SanityClientEvidence = Omit<ClientEvidence, 'testimonialPdf'> & {
  testimonialPdf?: Partial<ClientEvidence['testimonialPdf']> | null;
};
type SanityCaseStudy = Omit<CaseStudy, 'assets' | 'clientEvidence' | 'hasClientEvidence'> & {
  hasClientEvidence?: boolean;
  clientEvidence?: SanityClientEvidence | null;
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

function imageUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(COVER_WIDTH)
    .height(COVER_HEIGHT)
    .fit('crop')
    .auto('format')
    .url();
}

function logoUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image).width(600).fit('max').auto('format').url();
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

function normalizePost(post: SanityPost): BlogPost {
  return {
    ...post,
    authors: post.authors ?? [],
    coverImage: imageUrlFromSource(post.coverImage),
    coverAlt: post.coverAlt ?? post.title,
    tags: post.tags ?? [],
    faqs: post.faqs ?? [],
    sources: post.sources ?? [],
    sections: post.sections ?? [],
  };
}

function normalizeNewsArticle(article: SanityNewsArticle): NewsArticle {
  return {
    ...article,
    coverImage: imageUrlFromSource(article.coverImage),
    coverAlt: article.coverAlt ?? article.title,
    sources: article.sources ?? [],
    tags: article.tags ?? [],
    sections: article.sections ?? [],
  };
}

function normalizePerspective(perspective: SanityPerspective): Perspective {
  return {
    ...perspective,
    authors: perspective.authors ?? [],
    keywords: perspective.keywords ?? [],
    sources: perspective.sources ?? [],
    coverImage: imageUrlFromSource(perspective.coverImage),
    coverAlt: perspective.coverAlt ?? perspective.title,
    sections: perspective.sections ?? [],
  };
}

function normalizeResearchReport(report: SanityResearchReport): ResearchReport {
  return {
    ...report,
    authors: report.authors ?? [],
    keywords: report.keywords ?? [],
    sources: report.sources ?? [],
    sections: report.sections ?? [],
    coverImage: imageUrlFromSource(report.coverImage),
    coverAlt: report.coverAlt ?? report.title,
  };
}

function normalizeCaseStudy(study: SanityCaseStudy): CaseStudy {
  const {
    assets: rawAssets,
    clientEvidence: rawClientEvidence,
    hasClientEvidence: rawHasClientEvidence,
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
    measuredOutcomes: study.measuredOutcomes ?? [],
    hasClientEvidence: Boolean(rawHasClientEvidence || clientEvidence),
    ...(clientEvidence ? { clientEvidence } : {}),
    assets: {
      ...assets,
      coverImage: imageUrlFromSource(assets.coverImage),
      coverAlt: assets.coverAlt ?? study.title,
      logoLabel: assets.logoLabel ?? study.clientName,
      clientLogo: logoUrlFromSource(assets.clientLogo),
      clientLogoAlt: assets.clientLogoAlt ?? `${study.clientName} logo`,
      clientWebsite: assets.clientWebsite,
    },
  };
}

export async function getAllSanityPosts(): Promise<BlogPost[]> {
  const posts = await sanityFetch<SanityPost[]>({
    query: allPostsQuery,
    tags: [INSIGHTS_TAG, 'posts'],
  });

  return posts.map(normalizePost);
}

export async function getSanityPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [INSIGHTS_TAG, `post:${slug}`],
  });

  return post ? normalizePost(post) : null;
}

export async function getRelatedSanityPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllSanityPosts();
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityNewsArticles(): Promise<NewsArticle[]> {
  const articles = await sanityFetch<SanityNewsArticle[]>({
    query: allNewsArticlesQuery,
    tags: [INSIGHTS_TAG, 'newsArticles'],
  });

  return articles.map(normalizeNewsArticle);
}

export async function getSanityNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const article = await sanityFetch<SanityNewsArticle | null>({
    query: newsArticleBySlugQuery,
    params: { slug },
    tags: [INSIGHTS_TAG, `newsArticle:${slug}`],
  });

  return article ? normalizeNewsArticle(article) : null;
}

export async function getRelatedSanityNewsArticles(currentSlug: string, limit = 3): Promise<NewsArticle[]> {
  const articles = await getAllSanityNewsArticles();
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityPerspectives(): Promise<Perspective[]> {
  const perspectives = await sanityFetch<SanityPerspective[]>({
    query: allPerspectivesQuery,
    tags: [INSIGHTS_TAG, 'perspectives'],
  });

  return perspectives.map(normalizePerspective);
}

export async function getSanityPerspectiveBySlug(slug: string): Promise<Perspective | null> {
  const perspective = await sanityFetch<SanityPerspective | null>({
    query: perspectiveBySlugQuery,
    params: { slug },
    tags: [INSIGHTS_TAG, `perspective:${slug}`],
  });

  return perspective ? normalizePerspective(perspective) : null;
}

export async function getRelatedSanityPerspectives(currentSlug: string, limit = 3): Promise<Perspective[]> {
  const perspectives = await getAllSanityPerspectives();
  return perspectives.filter((perspective) => perspective.slug !== currentSlug).slice(0, limit);
}

export async function getAllSanityResearchReports(): Promise<ResearchReport[]> {
  const reports = await sanityFetch<SanityResearchReport[]>({
    query: allResearchReportsQuery,
    tags: [INSIGHTS_TAG, 'researchReports'],
  });

  return reports.map(normalizeResearchReport);
}

export async function getSanityResearchReportBySlug(slug: string): Promise<ResearchReport | null> {
  const report = await sanityFetch<SanityResearchReport | null>({
    query: researchReportBySlugQuery,
    params: { slug },
    tags: [INSIGHTS_TAG, `researchReport:${slug}`],
  });

  return report ? normalizeResearchReport(report) : null;
}

export async function getAllSanityCaseStudies(): Promise<CaseStudy[]> {
  const studies = await sanityFetch<SanityCaseStudy[]>({
    query: allCaseStudiesQuery,
    tags: [INSIGHTS_TAG, 'caseStudies'],
  });

  return studies.map(normalizeCaseStudy);
}

export async function getSanityClientEvidenceShowcase(): Promise<ClientEvidenceSummary[]> {
  const evidence = await sanityFetch<SanityClientEvidenceSummary[]>({
    query: clientEvidenceShowcaseQuery,
    tags: [INSIGHTS_TAG, 'caseStudies'],
  });

  return evidence
    .map(normalizeClientEvidenceSummary)
    .filter((item): item is ClientEvidenceSummary => item !== null);
}

export async function getSanityCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const study = await sanityFetch<SanityCaseStudy | null>({
    query: caseStudyBySlugQuery,
    params: { slug },
    tags: [INSIGHTS_TAG, `caseStudy:${slug}`],
  });

  return study ? normalizeCaseStudy(study) : null;
}

export async function getRelatedSanityCaseStudies(currentSlug: string, limit = 3): Promise<CaseStudy[]> {
  const studies = await getAllSanityCaseStudies();
  return studies.filter((study) => study.slug !== currentSlug).slice(0, limit);
}
