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
  ${sectionFields}
`;

const researchReportFields = `
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  tag,
  readTime,
  coverImage {
    ${imageFields}
  },
  coverAlt
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
  deploymentScale,
  deploymentStatus,
  measuredOutcomes[]{
    label,
    value,
    context
  },
  testimonial{
    quote,
    author,
    role
  },
  assets{
    coverImage {
      ${imageFields}
    },
    logoLabel,
    coverAlt
  },
  lastUpdated
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

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${caseStudyFields}
  }
`);
