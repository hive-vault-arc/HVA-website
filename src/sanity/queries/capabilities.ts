import { defineQuery } from 'next-sanity';

const imageFields = `
  asset,
  crop,
  hotspot
`;

const capabilitySummaryFields = `
  _id,
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
  }
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
  *[_type == "capability" && defined(slug.current)]
  | order(displayOrder asc, title asc) {
    ${capabilityFields}
  }
`);

export const featuredCapabilityProfilesQuery = defineQuery(`
  *[
    _type == "capability" &&
    defined(slug.current) &&
    featuredOnCapabilities == true
  ] | order(displayOrder asc, title asc) {
    ${capabilityFields}
  }
`);

export const capabilityProfileBySlugQuery = defineQuery(`
  *[_type == "capability" && slug.current == $slug][0] {
    ${capabilityFields}
  }
`);
