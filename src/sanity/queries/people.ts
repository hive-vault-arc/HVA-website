import { defineQuery } from 'next-sanity';

const imageFields = `
  asset,
  crop,
  hotspot
`;

const employeeProfileFields = `
  _id,
  name,
  "slug": slug.current,
  position,
  responsibilityTag,
  profileType,
  summary,
  story,
  profileImage {
    ${imageFields}
  },
  profileImageAlt,
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
  },
  expertise,
  linkedinUrl,
  displayOrder,
  featuredOnAbout,
  visibility,
  seo{
    title,
    description,
    keywords,
    noIndex
  }
`;

export const allEmployeeProfilesQuery = defineQuery(`
  *[_type == "employeeProfile" && defined(slug.current)]
  | order(displayOrder asc, name asc) {
    ${employeeProfileFields}
  }
`);

export const featuredEmployeeProfilesQuery = defineQuery(`
  *[
    _type == "employeeProfile" &&
    defined(slug.current) &&
    featuredOnAbout == true
  ] | order(displayOrder asc, name asc) {
    ${employeeProfileFields}
  }
`);

export const employeeProfileBySlugQuery = defineQuery(`
  *[_type == "employeeProfile" && slug.current == $slug][0] {
    ${employeeProfileFields}
  }
`);
