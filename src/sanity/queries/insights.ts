import {defineQuery} from 'next-sanity';

const sourceFields = `
  sources[]{
    label,
    url
  }
`;

const authorFields = `
  authors[]{
    "name": select(_type == "reference" => @->name, name),
    "role": select(_type == "reference" => @->role, role),
    "initials": select(_type == "reference" => @->initials, initials)
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
  reviewers[]->{
    name,
    role,
    initials
  },
  relatedCases[]->{
    "label": title,
    "href": "/case-studies/" + slug.current
  },
  relatedCapabilities[]->{
    "label": title,
    "href": "/capabilities/" + slug.current
  },
  methodology,
  limitations,
  primaryCta{
    label,
    href
  }
`;

const localizationFields = `
  _id,
  language,
  translationStatus,
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
  ${editorialFields},
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
  ${editorialFields},
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
  ${editorialFields},
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
  ${editorialFields},
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
  (
    (
      defined(clientEvidence.testimonialPdf.asset._ref) &&
      clientEvidence.testimonialPdf.asset._ref in *[
        _type == "sanity.fileAsset" &&
        mimeType == "application/pdf" &&
        size > 0 &&
        size <= 3145728
      ]._id
    ) ||
    (
      defined(clientEvidence.testimonialImage.asset._ref) &&
      length(clientEvidence.testimonialImageAlt) > 0 &&
      clientEvidence.testimonialImage.asset._ref in *[
        _type == "sanity.imageAsset" && mimeType == "image/webp"
      ]._id
    )
  )
`;

const caseStudySummaryFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  clientName,
  "industry": coalesce(industryRef->title, industry),
  "engagementType": coalesce(engagementType, "customSoftware"),
  summary,
  deploymentStatus,
  "publishedOutcomes": publishedOutcomes[
    publicationStatus == "approved" &&
    defined(permissionConfirmedOn) &&
    length(permissionReference) > 0
  ]{
    _key,
    scope,
    category,
    value,
    label,
    context
  },
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

const industryPostCardFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  category,
  excerpt,
  publishedAt,
  coverImage {
    ${imageFields}
  }
`;

const industryNewsCardFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  summary,
  category,
  tag,
  publishedAt,
  coverImage {
    ${imageFields}
  }
`;

const industryEditorialCardFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  summary,
  tag,
  publishedAt,
  coverImage {
    ${imageFields}
  }
`;

const industryCaseStudyCardFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  "industry": coalesce(industryRef->title, industry),
  summary,
  lastUpdated,
  assets {
    coverImage {
      ${imageFields}
    }
  }
`;

const paginatedInsightPredicate = `
  _type in ["post", "newsArticle", "perspective", "researchReport", "caseStudy"] &&
  defined(slug.current) &&
  (defined(publishedAt) || defined(lastUpdated)) &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
  (
    language == $locale ||
    (
      $locale == "fr" &&
      language == "en" &&
      count(
        coalesce(
          *[
            _type == "translation.metadata" &&
            references(^._id)
          ][0].translations[
            value->language == $locale &&
            value->translationStatus == "approved"
          ],
          []
        )
      ) == 0
    )
  )
`;

const paginatedInsightFields = `
  _id,
  _type,
  language,
  "slug": slug.current,
  title,
  publishedAt,
  lastUpdated,
  ${editorialFields},
  _type == "post" => {
    category,
    excerpt,
    readTime,
    coverImage {
      ${imageFields}
    }
  },
  _type == "newsArticle" => {
    summary,
    category,
    tag,
    readTime,
    coverImage {
      ${imageFields}
    }
  },
  _type == "perspective" => {
    summary,
    tag,
    readTime,
    coverImage {
      ${imageFields}
    }
  },
  _type == "researchReport" => {
    summary,
    tag,
    readTime,
    coverImage {
      ${imageFields}
    }
  },
  _type == "caseStudy" => {
    clientName,
    "industry": coalesce(industryRef->title, industry),
    summary,
    assets {
      coverImage {
        ${imageFields}
      }
    }
  }
`;

const paginatedCollectionPredicate = `
  _type == $collectionType &&
  defined(slug.current) &&
  (defined(publishedAt) || defined(lastUpdated)) &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
  (
    language == $locale ||
    (
      $locale == "fr" &&
      language == "en" &&
      count(
        coalesce(
          *[
            _type == "translation.metadata" &&
            references(^._id)
          ][0].translations[
            value->language == $locale &&
            value->translationStatus == "approved"
          ],
          []
        )
      ) == 0
    )
  ) &&
  (
    $hasIndustry == false ||
    industryRef->slug.current == $industryId
  )
`;

const paginatedCollectionFields = `
  _id,
  _type,
  language,
  "slug": slug.current,
  title,
  publishedAt,
  lastUpdated,
  ${editorialFields},
  "industryTaxonomy": industryRef->{
    "id": slug.current,
    title,
    "slug": slug.current,
    language
  },
  _type == "post" => {
    excerpt,
    readTime,
    "authorName": authors[0].name,
    coverImage {
      ${imageFields}
    }
  },
  _type == "newsArticle" => {
    summary,
    readTime,
    coverImage {
      ${imageFields}
    }
  },
  _type == "perspective" => {
    summary,
    readTime,
    "authorName": authors[0].name,
    coverImage {
      ${imageFields}
    }
  },
  _type == "researchReport" => {
    summary,
    readTime,
    "authorName": authors[0].name,
    coverImage {
      ${imageFields}
    }
  },
  _type == "caseStudy" => {
    summary,
    deploymentStatus,
    "legacyIndustry": industry,
    "hasClientEvidence": (${approvedClientEvidencePredicate}),
    assets {
      coverImage {
        ${imageFields}
      }
    }
  }
`;

const portfolioCaseStudyFields = `
  ${localizationFields},
  "slug": slug.current,
  title,
  clientName,
  "industry": coalesce(industryRef->title, industry),
  summary,
  deploymentStatus,
  assets {
    coverImage {
      ${imageFields}
    },
    coverAlt,
    clientLogo {
      ${imageFields}
    },
    clientLogoAlt
  }
`;

const caseStudyProjectMediaFields = `
  "projectMedia": projectMedia[
    (
      publicationStatus == "approved" &&
      defined(permissionConfirmedOn) &&
      length(permissionReference) > 0 &&
      length(alt) > 0 &&
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
  ${editorialFields},
  problem,
  systemArchitecture,
  operationalModules,
  integrations,
  "headlineMetrics": headlineMetrics[
    publicationStatus == "approved" &&
    length(sourceReference) > 0 &&
    (
      basis == "systemScope" ||
      (
        defined(permissionConfirmedOn) &&
        length(permissionReference) > 0
      )
    )
  ]{
    _key,
    valueType,
    value,
    minimum,
    maximum,
    unit,
    label,
    context,
    basis
  },
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
      "testimonialPdf": select(
        defined(testimonialPdf.asset._ref) => testimonialPdf.asset->{
          url,
          mimeType,
          size
        }
      ),
      testimonialImage {
        ${imageFields}
      },
      testimonialImageAlt,
      "testimonialImageWidth": testimonialImage.asset->metadata.dimensions.width,
      "testimonialImageHeight": testimonialImage.asset->metadata.dimensions.height,
      "testimonialImageLqip": testimonialImage.asset->metadata.lqip
    }
  )
`;

export const allPostsQuery = defineQuery(`
  *[
    _type == "post" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${postSummaryFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[
    _type == "post" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    slug.current == $slug
  ][0] {
    ${postFields}
  }
`);

export const allNewsArticlesQuery = defineQuery(`
  *[
    _type == "newsArticle" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${newsArticleSummaryFields}
  }
`);

export const newsArticleBySlugQuery = defineQuery(`
  *[
    _type == "newsArticle" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    slug.current == $slug
  ][0] {
    ${newsArticleFields}
  }
`);

export const allPerspectivesQuery = defineQuery(`
  *[
    _type == "perspective" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${perspectiveSummaryFields}
  }
`);

export const perspectiveBySlugQuery = defineQuery(`
  *[
    _type == "perspective" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    slug.current == $slug
  ][0] {
    ${perspectiveFields}
  }
`);

export const allResearchReportsQuery = defineQuery(`
  *[
    _type == "researchReport" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current)
  ] | order(publishedAt desc, _updatedAt desc) {
    ${researchReportSummaryFields}
  }
`);

export const researchReportBySlugQuery = defineQuery(`
  *[
    _type == "researchReport" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    slug.current == $slug
  ][0] {
    ${researchReportFields}
  }
`);

export const allCaseStudiesQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
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
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${postSummaryFields}
    },
    "newsArticles": *[
      _type == "newsArticle" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${newsArticleSummaryFields}
    },
    "perspectives": *[
      _type == "perspective" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${perspectiveSummaryFields}
    },
    "researchReports": *[
      _type == "researchReport" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${researchReportSummaryFields}
    },
    "caseStudies": *[
      _type == "caseStudy" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(lastUpdated desc, _updatedAt desc) {
      ${caseStudySummaryFields}
    }
  }
`);

/**
 * Unified, card-only Insights feed.
 *
 * The locale predicate returns one public document per logical publication:
 * an approved localized document when available, otherwise its English source.
 * The compound cursor keeps pagination stable when publication dates match.
 */
export const paginatedInsightsQuery = defineQuery(`
  {
    "items": *[
      ${paginatedInsightPredicate} &&
      (
        $hasCursor == false ||
        coalesce(publishedAt, lastUpdated) < $cursorDate ||
        (
          coalesce(publishedAt, lastUpdated) == $cursorDate &&
          _id > $cursorId
        )
      )
    ]
    | order(coalesce(publishedAt, lastUpdated) desc, _id asc)
    [0...$limit] {
      ${paginatedInsightFields}
    },
    "total": count(*[
      ${paginatedInsightPredicate}
    ]),
    "fallbackCount": count(*[
      ${paginatedInsightPredicate} &&
      language != $locale
    ])
  }
`);

/**
 * One listing contract for every Insights collection page.
 *
 * The first request asks for four records (one feature plus three cards).
 * Cursor requests ask for three. Industry filtering uses the shared taxonomy
 * slug so translated and fallback records stay in one visitor-facing group.
 * The projection remains card-only.
 */
export const paginatedInsightCollectionQuery = defineQuery(`
  {
    "items": *[
      ${paginatedCollectionPredicate} &&
      (
        $hasCursor == false ||
        coalesce(publishedAt, lastUpdated) < $cursorDate ||
        (
          coalesce(publishedAt, lastUpdated) == $cursorDate &&
          _id > $cursorId
        )
      )
    ]
    | order(coalesce(publishedAt, lastUpdated) desc, _id asc)
    [0...$limit] {
      ${paginatedCollectionFields}
    },
    "total": count(*[
      ${paginatedCollectionPredicate}
    ]),
    "fallbackCount": count(*[
      ${paginatedCollectionPredicate} &&
      language != $locale
    ]),
    "industries": select(
      $includeIndustries == true => *[
        _type == "industry" &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
        slug.current in *[
          ${paginatedCollectionPredicate}
        ].industryRef->slug.current
      ]
      | order(displayOrder asc, title asc) {
        "id": slug.current,
        title,
        "slug": slug.current,
        language
      },
      []
    )
  }
`);

export const portfolioCaseStudiesQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current)
  ] | order(lastUpdated desc, _updatedAt desc) {
    ${portfolioCaseStudyFields}
  }
`);

/**
 * Card-only payload for the Industries insight showcase.
 * Keep this projection intentionally narrow: the page never needs authors,
 * body sections, SEO metadata, evidence, or case-study operational details.
 */
export const industryInsightCollectionsQuery = defineQuery(`
  {
    "posts": *[
      _type == "post" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      defined(coverImage.asset)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${industryPostCardFields}
    },
    "newsArticles": *[
      _type == "newsArticle" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      defined(coverImage.asset)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${industryNewsCardFields}
    },
    "perspectives": *[
      _type == "perspective" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      defined(coverImage.asset)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${industryEditorialCardFields}
    },
    "researchReports": *[
      _type == "researchReport" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      defined(coverImage.asset)
    ] | order(publishedAt desc, _updatedAt desc) {
      ${industryEditorialCardFields}
    },
    "caseStudies": *[
      _type == "caseStudy" &&
      language in $locales &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      defined(assets.coverImage.asset)
    ] | order(lastUpdated desc, _updatedAt desc) {
      ${industryCaseStudyCardFields}
    }
  }
`);

const clientEvidenceShowcaseFields = `
  "slug": slug.current,
  "caseStudyTitle": title,
  clientName,
  "industry": coalesce(industryRef->title, industry),
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
`;

export const homeCaseStudyProofQuery = defineQuery(`
  {
    "caseStudies": *[
      _type == "caseStudy" &&
      language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current)
    ] | order(lastUpdated desc, _updatedAt desc) {
      ${caseStudySummaryFields}
    },
    "clientEvidence": *[
      _type == "caseStudy" &&
      language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
      defined(slug.current) &&
      (${approvedClientEvidencePredicate})
    ]
    | order(coalesce(clientEvidence.evidencePriority, 2147483647) asc, lastUpdated desc, _updatedAt desc)
    [0...6] {
      ${clientEvidenceShowcaseFields}
    }
  }
`);

export const clientEvidenceShowcaseQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    defined(slug.current) &&
    (${approvedClientEvidencePredicate})
  ]
  | order(coalesce(clientEvidence.evidencePriority, 2147483647) asc, lastUpdated desc, _updatedAt desc)
  [0...6] {
    ${clientEvidenceShowcaseFields}
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[
    _type == "caseStudy" &&
    language == $locale &&
    ($preview == true || (translationStatus == "approved" && (!defined(visibility) || visibility == "published") && (_type != "caseStudy" || count(*[_type == "translation.metadata" && references(^._id)][0].translations[value->translationStatus == "approved"]) == 4))) &&
    slug.current == $slug
  ][0] {
    ${caseStudyFields},
    ${approvedClientEvidenceDetailField}
  }
`);
