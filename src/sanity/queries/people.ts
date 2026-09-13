import { defineQuery } from 'next-sanity';

const imageFields = `
  asset,
  crop,
  hotspot
`;

const employeeProfileSummaryFields = `
  _id,
  language,
  translationStatus,
  name,
  "slug": slug.current,
  position,
  responsibilityTag,
  profileType,
  summary,
  profileImage {
    ${imageFields}
  },
  profileImageAlt,
  expertise,
  linkedinUrl,
  reviewers[]->{name, role, initials},
  lastReviewed,
  displayOrder,
  featuredOnAbout,
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

const employeeProfileFields = `
  ${employeeProfileSummaryFields},
  story,
  experience[]{
    _key,
    role,
    organization,
    location,
    period,
    summary,
    highlights
  },
  education[]{
    _key,
    institution,
    credential,
    period,
    summary
  }
`;

export const allEmployeeProfilesQuery = defineQuery(`
  *[
    _type == "employeeProfile" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
    defined(slug.current)
  ]
  | order(displayOrder asc, name asc) {
    ${employeeProfileSummaryFields}
  }
`);

export const featuredEmployeeProfilesQuery = defineQuery(`
  *[
    _type == "employeeProfile" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
    defined(slug.current) &&
    featuredOnAbout == true
  ] | order(displayOrder asc, name asc) {
    ${employeeProfileSummaryFields}
  }
`);

export const employeeProfileBySlugQuery = defineQuery(`
  *[
    _type == "employeeProfile" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4)) &&
    slug.current == $slug
  ][0] {
    ${employeeProfileFields}
  }
`);
