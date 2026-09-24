import {defineQuery} from 'next-sanity';

export const pageOptimizationQuery = defineQuery(`
  *[
    _type == "pageOptimization" &&
    routeKey == $routeKey &&
    language == $locale &&
    ($preview == true || (!(_id in path("drafts.**")) && translationStatus == "approved" && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))
  ][0]{
    _id,
    routeKey,
    language,
    translationStatus,
    searchIntent,
    audienceNotes,
    editorialFormat,
    topics,
    answerQuestion,
    directAnswer,
    keyTakeaways,
    relatedQuestions,
    lastReviewed,
    evidenceType,
    methodology,
    limitations,
    primaryCta{label, href},
    reviewers[]->{name, role, initials},
    answerEvidence[
      @->.verificationStatus == "verified" &&
      @->.publiclyCitable == true &&
      (!defined(@->.expiresAt) || dateTime(@->.expiresAt + "T23:59:59Z") >= dateTime(now()))
    ][]->{
      "label": sourceTitle,
      "url": sourceUrl,
      "claimIds": [claimId]
    },
    seo{
      title,
      description,
      noIndex,
      socialImage{asset, crop, hotspot},
      socialImageAlt
    }
  }
`);

export const pageOptimizationsForLocaleQuery = defineQuery(`
  *[
    _type == "pageOptimization" &&
    language == $locale &&
    ($preview == true || (!(_id in path("drafts.**")) && translationStatus == "approved" && count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))
  ]{
    routeKey,
    answerQuestion,
    directAnswer,
    keyTakeaways,
    methodology,
    limitations,
    answerEvidence[
      @->.verificationStatus == "verified" &&
      @->.publiclyCitable == true &&
      (!defined(@->.expiresAt) || dateTime(@->.expiresAt + "T23:59:59Z") >= dateTime(now()))
    ][]->{
      "label": sourceTitle,
      "url": sourceUrl,
      "claimIds": [claimId]
    }
  }
`);

export const noindexedPageOptimizationsQuery = defineQuery(`
  *[
    _type == "pageOptimization" &&
    !(_id in path("drafts.**")) &&
    translationStatus == "approved" &&
    count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4 &&
    seo.noIndex == true
  ]{"key": routeKey + ":" + language}
`);

export const approvedOrganizationProfileQuery = defineQuery(`
  *[
    _id == "organizationProfile" &&
    approvedForPublicUse == true &&
    defined(reviewedBy) &&
    defined(reviewedAt)
  ][0]{
    brandName,
    legalName,
    canonicalWebsite,
    logo{asset, crop, hotspot},
    descriptions[]{_key, value},
    publicEmail,
    publicTelephones,
    publicTelephone,
    locations,
    serviceAreas,
    sameAs,
    reviewedAt
  }
`);
