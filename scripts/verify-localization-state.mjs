import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-23'}).withConfig({perspective: 'raw'})
const EXPECTED_COUNT = 23
const TYPES = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
]

const state = await client.fetch(
  `{
    "englishApproved": *[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "en" &&
      translationStatus == "approved"
    ]{_id, _type},
    "frenchDrafts": *[
      _type in $types &&
      _id in path("drafts.**") &&
      language == "fr" &&
      translationStatus == "draft"
    ]{_id, _type},
    "publishedFrench": count(*[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "fr"
    ]),
    "metadata": *[_type == "translation.metadata"]{
      _id,
      "english": translations[language == "en"][0].value._ref,
      "french": translations[language == "fr"][0].value._ref
    },
    "missingLocalization": *[
      _type in $types &&
      (!defined(language) || !defined(translationStatus))
    ]{_id, _type}
  }`,
  {types: TYPES},
)

const byType = (documents) =>
  Object.fromEntries(
    TYPES.map((type) => [type, documents.filter((document) => document._type === type).length]),
  )

const incompleteMetadata = state.metadata.filter(
  (document) => !document.english || !document.french,
)
const errors = []

if (state.englishApproved.length !== EXPECTED_COUNT) {
  errors.push(
    `expected ${EXPECTED_COUNT} approved English documents, found ${state.englishApproved.length}`,
  )
}
if (state.frenchDrafts.length !== EXPECTED_COUNT) {
  errors.push(`expected ${EXPECTED_COUNT} French drafts, found ${state.frenchDrafts.length}`)
}
if (state.metadata.length !== EXPECTED_COUNT) {
  errors.push(
    `expected ${EXPECTED_COUNT} translation metadata documents, found ${state.metadata.length}`,
  )
}
if (incompleteMetadata.length > 0) {
  errors.push(`${incompleteMetadata.length} translation metadata documents have missing references`)
}
if (state.publishedFrench !== 0) {
  errors.push(
    `expected no published French documents before review, found ${state.publishedFrench}`,
  )
}
if (state.missingLocalization.length !== 0) {
  errors.push(
    `${state.missingLocalization.length} localized documents have missing workflow fields: ${state.missingLocalization.map((document) => `${document._type}:${document._id}`).join(', ')}`,
  )
}

const summary = {
  expectedPerLocale: EXPECTED_COUNT,
  englishApproved: state.englishApproved.length,
  frenchDrafts: state.frenchDrafts.length,
  publishedFrench: state.publishedFrench,
  translationMetadata: state.metadata.length,
  completeAssociations: state.metadata.length - incompleteMetadata.length,
  missingLocalizationFields: state.missingLocalization,
  byType: {
    en: byType(state.englishApproved),
    fr: byType(state.frenchDrafts),
  },
}

console.log(JSON.stringify(summary, null, 2))

if (errors.length > 0) {
  throw new Error(`Localization verification failed:\n- ${errors.join('\n- ')}`)
}

console.log('Localization state verified without mutating the dataset.')
