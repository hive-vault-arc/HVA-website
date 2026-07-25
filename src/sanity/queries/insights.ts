import { defineQuery } from 'next-sanity';

const sourceFields = `
  sources[]{
    label,
    url
  }
`;

const authorFields = `
  authors[]{
    name,
    role,
    initials
  }
`;

const imageFields = `
  asset,
  crop,
  hotspot
`;

const seoFields = `
  seo{
    title,
    description,
    keywords,
    noIndex
  }
`;

const localizationFields = `
  _id,
  language,
  translationStatus,
  "translationTargets": *[
    _type == "translation.metadata" &&
    references(^._id)
  ][0].translations[].value->{
    language,
    translationStatus,
    "slug": slug.current
  }[translationStatus == "approved"]
`;

const sectionFields = `
  sections[]{
    _key,
    _type == "paragraphSection" => {
      "type": "paragraph",
      content
    },
    _type == "headingSection" => {
      "type": "heading",
      content
    },
    _type == "subheadingSection" => {
      "type": "subheading",
      content
    },
    _type == "pullquoteSection" => {
      "type": "pullquote",
      content,
      attribution
    },
    _type == "statBlockSection" => {
      "type": "stat-block",
      stats[]{
        value,
        label,
        source
      }
    },
    _type == "listSection" => {
      "type": "list",
      items
    },
    _type == "faqSection" => {
      "type": "faq",
      items[]{
        question,
        answer
      }
    }
  }
`;

const postSummaryFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  subtitle,
  category,
  readTime,
  publishedAt,
  ${authorFields},
  coverImage {
    ${imageFields}
  },
  coverAlt,
  excerpt,
  tags,
  ${seoFields}
`;

const postFields = `
  ${postSummaryFields},
  faqs[]{
    question,
    answer
  },
  ${sourceFields},
  ${sectionFields}
`;

const newsArticleSummaryFields = `
  ${localizationFields},
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  tag,
  readTime,
  coverImage {
    ${imageFields}
  },
  coverAlt,
  subtitle,
  category,
  tags,
  ${seoFields}
`;

const newsArticleFields = `
  ${newsArticleSummaryFields},
  ${sourceFields},
  ${sectionFields}
`;

const perspectiveSummaryFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  subtitle,
  summary,
  publishedAt,
  readTime,
  tag,
  ${authorFields},
  keywords,
  coverImage {
    ${imageFields}
  },
  coverAlt,
  ${seoFields}
`;

const perspectiveFields = `
  ${perspectiveSummaryFields},
  ${sourceFields},
  ${sectionFields}
`;

const researchReportSummaryFields = `
  ${localizationFields},
  title,
  "slug": slug.current,
  subtitle,
  summary,
  publishedAt,
  tag,
  readTime,
  ${authorFields},
  keywords,
  coverImage {
    ${imageFields}
  },
  coverAlt,
  ${seoFields}
`;

const researchReportFields = `
  ${researchReportSummaryFields},
  ${sourceFields},
  ${sectionFields}
`;

const approvedClientEvidencePredicate = `
  clientEvidence.publicationStatus == "approved" &&
  defined(clientEvidence.permissionConfirmedOn) &&
  length(clientEvidence.documentTitle) > 0 &&
  length(clientEvidence.documentLanguage) > 0 &&
  defined(clientEvidence.testimonialPdf.asset._ref) &&
  clientEvidence.testimonialPdf.asset._ref in *[
    _type == "sanity.fileAsset" &&
    mimeType == "application/pdf" &&
    size > 0 &&
    size <= 3145728
  ]._id
`;

const caseStudySummaryFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  clientName,
  industry,
  summary,
  deploymentStatus,
  "hasClientEvidence": (${approvedClientEvidencePredicate}),
  assets{
    coverImage {
      ${imageFields}
    },
    logoLabel,
    coverAlt,
    clientLogo {
      ${imageFields}
    },
    clientLogoAlt,
    clientWebsite
  },
  lastUpdated,
  ${seoFields}
`;

const caseStudyProjectMediaFields = `
  "projectMedia": projectMedia[
    (
      publicationStatus == "approved" &&
      defined(permissionConfirmedOn) &&
      length(permissionReference) > 0 &&
      length(caption) > 0 &&
      length(disclosure) > 0
    ) ||
    ($preview == true && publicationStatus == "notCleared")
  ]{
    _key,
    internalLabel,
    deviceType,
    placement,
    evidenceType,
    alt,
    caption,
    disclosure,
    publicationStatus,
    image {
      ${imageFields}
    },
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "lqip": image.asset->metadata.lqip
  }
`;

const caseStudyFields = `
  ${caseStudySummaryFields},
  problem,
  systemArchitecture,
  operationalModules,
  integrations,
  ${caseStudyProjectMediaFields}
`;

const approvedClientEvidenceDetailField = `
  "clientEvidence": select(
    (${approvedClientEvidencePredicate}) => clientEvidence{
      documentTitle,
      documentLanguage,
      issuedOn,
      quoteExcerpt,
      signatoryName,
      signatoryRole,
      "testimonialPdf": testimonialPdf.asset->{
        url,
        mimeType,
        size
      }
    }
  )
`;

export const allPostsQuery = defineQuery(`
  *[
    _type == "post" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${postSummaryFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[
    _type == "post" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${postFields}
  }
`);

export const allNewsArticlesQuery = defineQuery(`
  *[
    _type == "newsArticle" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${newsArticleSummaryFields}
  }
`);

export const newsArticleBySlugQuery = defineQuery(`
  *[
    _type == "newsArticle" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${newsArticleFields}
  }
`);

export const allPerspectivesQuery = defineQuery(`
  *[
    _type == "perspective" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${perspectiveSummaryFields}
  }
`);

export const perspectiveBySlugQuery = defineQuery(`
  *[
    _type == "perspective" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${perspectiveFields}
  }
`);

export const allResearchReportsQuery = defineQuery(`
  *[
    _type == "researchReport" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${researchReportSummaryFields}
  }
`);

export const researchReportBySlugQuery = defineQuery(`
  *[
    _type == "researchReport" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${researchReportFields}
  }
`);

export const allCaseStudiesQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ] | order(lastUpdated desc, _updatedAt desc) {
    ${caseStudySummaryFields}
  }
`);

export const allInsightCollectionsQuery = defineQuery(`
  {
    "posts": *[
      _type == "post" &&
      language in $locales &&
      ($preview == true || translationStatus == "approved") &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${postSummaryFields}
    },
    "newsArticles": *[
      _type == "newsArticle" &&
      language in $locales &&
      ($preview == true || translationStatus == "approved") &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${newsArticleSummaryFields}
    },
    "perspectives": *[
      _type == "perspective" &&
      language in $locales &&
      ($preview == true || translationStatus == "approved") &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${perspectiveSummaryFields}
    },
    "researchReports": *[
      _type == "researchReport" &&
      language in $locales &&
      ($preview == true || translationStatus == "approved") &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${researchReportSummaryFields}
    },
    "caseStudies": *[
      _type == "caseStudy" &&
      language in $locales &&
      ($preview == true || translationStatus == "approved") &&
      defined(slug.current)
    ] | order(lastUpdated desc, _updatedAt desc) {
      ${caseStudySummaryFields}
    }
  }
`);

export const clientEvidenceShowcaseQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current) &&
    (${approvedClientEvidencePredicate})
  ]
  | order(coalesce(clientEvidence.evidencePriority, 2147483647) asc, lastUpdated desc, _updatedAt desc)
  [0...6] {
    "slug": slug.current,
    "caseStudyTitle": title,
    clientName,
    industry,
    "documentTitle": clientEvidence.documentTitle,
    "documentLanguage": clientEvidence.documentLanguage,
    "issuedOn": clientEvidence.issuedOn,
    "quoteExcerpt": clientEvidence.quoteExcerpt,
    "signatoryName": clientEvidence.signatoryName,
    "signatoryRole": clientEvidence.signatoryRole,
    "clientLogo": assets.clientLogo {
      ${imageFields}
    },
    "clientLogoAlt": assets.clientLogoAlt,
    "coverImage": assets.coverImage {
      ${imageFields}
    },
    "coverImageAlt": assets.coverAlt
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${caseStudyFields},
    ${approvedClientEvidenceDetailField}
  }
`);
