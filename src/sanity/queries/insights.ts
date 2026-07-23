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

const postFields = `
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
  ${seoFields},
  faqs[]{
    question,
    answer
  },
  ${sourceFields},
  ${sectionFields}
`;

const newsArticleFields = `
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
  ${sourceFields},
  tags,
  ${seoFields},
  ${sectionFields}
`;

const perspectiveFields = `
  "slug": slug.current,
  title,
  subtitle,
  summary,
  publishedAt,
  readTime,
  tag,
  ${authorFields},
  keywords,
  ${sourceFields},
  coverImage {
    ${imageFields}
  },
  coverAlt,
  ${seoFields},
  ${sectionFields}
`;

const researchReportFields = `
  title,
  "slug": slug.current,
  subtitle,
  summary,
  publishedAt,
  tag,
  readTime,
  ${authorFields},
  keywords,
  ${sourceFields},
  coverImage {
    ${imageFields}
  },
  coverAlt,
  ${seoFields},
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

const caseStudyFields = `
  "slug": slug.current,
  title,
  clientName,
  industry,
  summary,
  problem,
  systemArchitecture,
  operationalModules,
  integrations,
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
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`);

export const allNewsArticlesQuery = defineQuery(`
  *[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${newsArticleFields}
  }
`);

export const newsArticleBySlugQuery = defineQuery(`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    ${newsArticleFields}
  }
`);

export const allPerspectivesQuery = defineQuery(`
  *[_type == "perspective" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${perspectiveFields}
  }
`);

export const perspectiveBySlugQuery = defineQuery(`
  *[_type == "perspective" && slug.current == $slug][0] {
    ${perspectiveFields}
  }
`);

export const allResearchReportsQuery = defineQuery(`
  *[_type == "researchReport" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${researchReportFields}
  }
`);

export const researchReportBySlugQuery = defineQuery(`
  *[_type == "researchReport" && slug.current == $slug][0] {
    ${researchReportFields}
  }
`);

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(lastUpdated desc, _updatedAt desc) {
    ${caseStudyFields}
  }
`);

export const clientEvidenceShowcaseQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
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
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${caseStudyFields},
    ${approvedClientEvidenceDetailField}
  }
`);
