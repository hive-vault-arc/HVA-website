import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const types = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
]
const expectedByType = {
  post: 5,
  newsArticle: 1,
  perspective: 2,
  researchReport: 3,
  caseStudy: 4,
  employeeProfile: 3,
  capability: 6,
  industry: 2,
}
const expectedDocumentsPerLanguage = Object.values(expectedByType).reduce(
  (total, count) => total + count,
  0,
)

const state = await client.fetch(
  `{
    "english": *[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "en" &&
      translationStatus == "approved"
    ]{_id, _type, title, name, "slug": slug.current},
    "french": *[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "fr" &&
      translationStatus == "approved"
    ]{_id, _type, title, name, "slug": slug.current},
    "drafts": *[
      _type in $types &&
      _id in path("drafts.**")
    ]{_id, _type, language, translationStatus, title, name, "slug": slug.current},
    "metadata": *[_type == "translation.metadata"]{
      _id,
      "englishRef": translations[language == "en"][0].value._ref,
      "frenchRef": translations[language == "fr"][0].value._ref,
      "frenchWeak": translations[language == "fr"][0].value._weak,
      "frenchStrengthenOnPublish": translations[language == "fr"][0].value._strengthenOnPublish,
      "english": translations[language == "en"][0].value->{
        _id,
        _type,
        language,
        translationStatus,
        title,
        name,
        briefLine,
        summary,
        excerpt,
        subtitle,
        description,
        story,
        sections,
        operationalModules,
        subCapabilities,
        expertise
      },
      "french": translations[language == "fr"][0].value->{
        _id,
        _type,
        language,
        translationStatus,
        title,
        name,
        briefLine,
        summary,
        excerpt,
        subtitle,
        description,
        story,
        sections,
        operationalModules,
        subCapabilities,
        expertise
      }
    },
    "missingLocalization": *[
      _type in $types &&
      (!defined(language) || !defined(translationStatus))
    ]{_id, _type}
  }`,
  {types},
)

function byType(documents) {
  return Object.fromEntries(
    types.map((type) => [type, documents.filter((document) => document._type === type).length]),
  )
}

function displayText(document) {
  return (
    document?.briefLine ||
    document?.summary ||
    document?.excerpt ||
    document?.subtitle ||
    document?.description ||
    document?.story ||
    document?.title ||
    ''
  )
}

function bodyContent(document) {
  return (
    document?.sections ||
    document?.operationalModules ||
    document?.subCapabilities ||
    document?.expertise ||
    null
  )
}

const errors = []
const englishByType = byType(state.english)
const frenchByType = byType(state.french)

if (state.english.length !== expectedDocumentsPerLanguage) {
  errors.push(
    `expected ${expectedDocumentsPerLanguage} approved English documents, found ${state.english.length}`,
  )
}
if (state.french.length !== expectedDocumentsPerLanguage) {
  errors.push(
    `expected ${expectedDocumentsPerLanguage} approved French documents, found ${state.french.length}`,
  )
}
if (state.drafts.length !== 0) {
  errors.push(
    `expected no drafts after publication, found ${state.drafts.length}: ${state.drafts.map((document) => `${document._type}:${document.title || document.name || document.slug || document._id} (${document._id}, ${document.language || 'no-language'}/${document.translationStatus || 'no-status'})`).join(', ')}`,
  )
}
if (state.metadata.length !== expectedDocumentsPerLanguage) {
  errors.push(
    `expected ${expectedDocumentsPerLanguage} translation metadata documents, found ${state.metadata.length}`,
  )
}

for (const type of types) {
  if (englishByType[type] !== expectedByType[type]) {
    errors.push(
      `expected ${expectedByType[type]} English ${type} documents, found ${englishByType[type]}`,
    )
  }
  if (frenchByType[type] !== expectedByType[type]) {
    errors.push(
      `expected ${expectedByType[type]} French ${type} documents, found ${frenchByType[type]}`,
    )
  }
}

for (const metadata of state.metadata) {
  if (!metadata.englishRef || !metadata.frenchRef || !metadata.english || !metadata.french) {
    errors.push(
      `translation metadata ${metadata._id} has a missing or unresolved language reference`,
    )
    continue
  }
  if (metadata.frenchWeak || metadata.frenchStrengthenOnPublish) {
    errors.push(`translation metadata ${metadata._id} still uses a weak French reference`)
  }
  if (
    metadata.english.language !== 'en' ||
    metadata.french.language !== 'fr' ||
    metadata.english.translationStatus !== 'approved' ||
    metadata.french.translationStatus !== 'approved'
  ) {
    errors.push(`translation metadata ${metadata._id} links an unapproved or mislabeled document`)
  }
  if (metadata.english._type !== metadata.french._type) {
    errors.push(`translation metadata ${metadata._id} links different schema types`)
  }

  const englishDisplay = displayText(metadata.english).trim()
  const frenchDisplay = displayText(metadata.french).trim()
  if (englishDisplay && englishDisplay === frenchDisplay) {
    errors.push(
      `French ${metadata.french._type}:${metadata.french._id} still copies its English display text`,
    )
  }

  const englishBody = bodyContent(metadata.english)
  const frenchBody = bodyContent(metadata.french)
  if (englishBody && JSON.stringify(englishBody) === JSON.stringify(frenchBody)) {
    errors.push(
      `French ${metadata.french._type}:${metadata.french._id} still copies its English body`,
    )
  }
}

if (state.missingLocalization.length > 0) {
  errors.push(
    `${state.missingLocalization.length} localized documents are missing language/workflow fields`,
  )
}

const summary = {
  expectedPerLanguage: expectedDocumentsPerLanguage,
  englishApproved: state.english.length,
  frenchApproved: state.french.length,
  drafts: state.drafts.length,
  translationMetadata: state.metadata.length,
  byType: {en: englishByType, fr: frenchByType},
  missingLocalizationFields: state.missingLocalization,
}

console.log(JSON.stringify(summary, null, 2))

if (errors.length > 0) {
  throw new Error(`Localization verification failed:\n- ${errors.join('\n- ')}`)
}

console.log('Published bilingual localization state verified without mutating the dataset.')
