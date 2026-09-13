import {randomUUID} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-23'}).withConfig({perspective: 'raw'})
const APPLY = process.argv.includes('--apply')
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

const [englishDocuments, frenchCount, metadataCount] = await Promise.all([
  client.fetch(
    `*[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "en" &&
      translationStatus == "approved"
    ] | order(_type asc, _id asc)`,
    {types: TYPES},
  ),
  client.fetch(`count(*[_type in $types && language == "fr"])`, {types: TYPES}),
  client.fetch(`count(*[_type == "translation.metadata"])`),
])

if (englishDocuments.length !== EXPECTED_COUNT) {
  throw new Error(
    `Safety check failed: expected ${EXPECTED_COUNT} approved English documents, found ${englishDocuments.length}.`,
  )
}

if (frenchCount === EXPECTED_COUNT && metadataCount === EXPECTED_COUNT) {
  const associationCount = await client.fetch(
    `count(*[
      _type == "translation.metadata" &&
      count(translations[language == "en"]) == 1 &&
      count(translations[language == "fr"]) == 1
    ])`,
  )

  if (associationCount !== EXPECTED_COUNT) {
    throw new Error(
      `Existing localization data is incomplete: ${associationCount} of ${EXPECTED_COUNT} metadata documents have en/fr references.`,
    )
  }

  console.log(
    `Existing localization data verified: ${frenchCount} French drafts and ${associationCount} metadata documents.`,
  )
  process.exit(0)
}

if (frenchCount !== 0 || metadataCount !== 0) {
  throw new Error(
    `Safety check failed: found ${frenchCount} French documents and ${metadataCount} translation metadata documents.`,
  )
}

const plan = englishDocuments.map((document) => {
  const translationId = randomUUID()
  return {
    source: document,
    translationId,
    draftId: `drafts.${translationId}`,
    metadataId: randomUUID(),
  }
})

console.log(
  JSON.stringify(
    {
      mode: APPLY ? 'apply' : 'dry-run',
      count: plan.length,
      translations: plan.map(({source}) => ({
        sourceId: source._id,
        type: source._type,
        label: source.title ?? source.name ?? source._id,
        destinationLanguage: 'fr',
        destinationStatus: 'draft',
      })),
    },
    null,
    2,
  ),
)

if (!APPLY) {
  console.log('Dry run only. Re-run with --apply after the schema is deployed and reviewed.')
  process.exit(0)
}

const translationReference = (language, referenceId, type, published) => ({
  _key: randomUUID().replaceAll('-', '').slice(0, 12),
  _type: 'internationalizedArrayReferenceValue',
  language,
  value: published
    ? {_type: 'reference', _ref: referenceId}
    : {
        _type: 'reference',
        _ref: referenceId,
        _weak: true,
        _strengthenOnPublish: {type},
      },
})

let transaction = client.transaction()

for (const {source, translationId, draftId, metadataId} of plan) {
  const frenchDraft = {
    ...source,
    _id: draftId,
    language: 'fr',
    translationStatus: 'draft',
  }

  delete frenchDraft._rev
  delete frenchDraft._createdAt
  delete frenchDraft._updatedAt

  transaction = transaction.create(frenchDraft).create({
    _id: metadataId,
    _type: 'translation.metadata',
    schemaTypes: [source._type],
    translations: [
      translationReference('en', source._id, source._type, true),
      translationReference('fr', translationId, source._type, false),
    ],
  })
}

await transaction.commit({tag: 'migration.create-french-drafts'})

const verification = await client.fetch(
  `{
    "frenchDrafts": count(*[
      _type in $types &&
      _id in path("drafts.**") &&
      language == "fr" &&
      translationStatus == "draft"
    ]),
    "metadata": count(*[_type == "translation.metadata"])
  }`,
  {types: TYPES},
)

if (verification.frenchDrafts !== EXPECTED_COUNT || verification.metadata !== EXPECTED_COUNT) {
  throw new Error(`Post-creation verification failed: ${JSON.stringify(verification)}`)
}

console.log(
  `Created and verified ${verification.frenchDrafts} French drafts and ${verification.metadata} metadata documents.`,
)
