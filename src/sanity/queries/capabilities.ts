import { defineQuery } from 'next-sanity';

const imageFields = `
  asset,
  crop,
  hotspot
`;

const editorialFields = `
  editorialFormat,
  topics,
  answerQuestion,
  directAnswer,
  keyTakeaways,
  answerEvidence[
    @->.verificationStatus == "verified" &&
    @->.publiclyCitable == true &&
    (!defined(@->.expiresAt) || dateTime(@->.expiresAt + "T23:59:59Z") >= dateTime(now()))
  ][]->{
    "label": sourceTitle,
    "url": sourceUrl,
    "claimIds": [claimId]
  },
  relatedQuestions,
  lastReviewed,
  evidenceType,
  reviewers[]->{name, role, initials},
  relatedCases[]->{"label": title, "href": "/case-studies/" + slug.current},
  methodology,
  limitations,
  primaryCta{label, href}
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
  "translationTargets": (*[
    _type == "translation.metadata" &&
    references(^._id)
  ][0].translations[].value->{
    language,
    translationStatus,
    "noIndex": seo.noIndex,
    "slug": slug.current
  })[translationStatus == "approved" && noIndex != true]
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
  },
  ${editorialFields}
`;

export const allCapabilityProfilesQuery = defineQuery(`
  *[
    _type == "capability" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
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
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
    defined(slug.current) &&
    featuredOnCapabilities == true
  ] | order(displayOrder asc, title asc) {
    ${capabilitySummaryFields}
  }
`);

export const capabilityProfileBySlugQuery = defineQuery(`
  *[
    _type == "capability" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
    slug.current == $slug
  ][0] {
    ${capabilityFields}
  }
`);
