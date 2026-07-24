import { defineQuery } from 'next-sanity';

const imageFields = `
  asset,
  crop,
  hotspot
`;

const capabilitySummaryFields = `
  _id,
  language,
  translationStatus,
  title,
  "slug": slug.current,
  shortTitle,
  kicker,
  briefLine,
  briefBullets,
  heroImage {
    ${imageFields}
  },
  heroImageAlt,
  displayOrder,
  featuredOnCapabilities,
  visibility,
  seo{
    title,
    description,
    keywords,
    noIndex
  },
  "translationTargets": *[
    _type == "translation.metadata" &&
    references(^._id)
  ][0].translations[].value->{
    language,
    translationStatus,
    "slug": slug.current
  }[translationStatus == "approved"]
`;

const capabilityFields = `
  ${capabilitySummaryFields},
  strategicContext,
  executionContext,
  subCapabilities,
  relatedOutcomes,
  landingLinks[]{
    _key,
    label,
    href
  },
  relatedCapabilities[]->{
    ${capabilitySummaryFields}
  }
`;

export const allCapabilityProfilesQuery = defineQuery(`
  *[
    _type == "capability" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current)
  ]
  | order(displayOrder asc, title asc) {
    ${capabilityFields}
  }
`);

export const featuredCapabilityProfilesQuery = defineQuery(`
  *[
    _type == "capability" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    defined(slug.current) &&
    featuredOnCapabilities == true
  ] | order(displayOrder asc, title asc) {
    ${capabilityFields}
  }
`);

export const capabilityProfileBySlugQuery = defineQuery(`
  *[
    _type == "capability" &&
    language == $locale &&
    ($preview == true || translationStatus == "approved") &&
    slug.current == $slug
  ][0] {
    ${capabilityFields}
  }
`);
