import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-23'})
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

const documents = await client.fetch(
  `*[
    _type in $types &&
    !(_id in path("drafts.**"))
  ] | order(_type asc, _id asc) {
    _id,
    _type,
    title,
    name,
    language,
    translationStatus
  }`,
  {types: TYPES},
)

if (documents.length !== EXPECTED_COUNT) {
  throw new Error(
    `Safety check failed: expected ${EXPECTED_COUNT} published localized documents, found ${documents.length}.`,
  )
}

const alreadyLocalized = documents.filter(
  (document) => document.language || document.translationStatus,
)

if (alreadyLocalized.length > 0) {
  throw new Error(
    `Safety check failed: ${alreadyLocalized.length} documents already contain localization fields.`,
  )
}

const summary = {
  mode: APPLY ? 'apply' : 'dry-run',
  count: documents.length,
  byType: Object.fromEntries(
    TYPES.map((type) => [type, documents.filter((document) => document._type === type).length]),
  ),
  patches: documents.map((document) => ({
    _id: document._id,
    _type: document._type,
    label: document.title ?? document.name ?? document._id,
    set: {language: 'en', translationStatus: 'approved'},
  })),
}

console.log(JSON.stringify(summary, null, 2))

if (!APPLY) {
  console.log('Dry run only. Re-run with --apply after reviewing this output.')
  process.exit(0)
}

let transaction = client.transaction()
for (const document of documents) {
  transaction = transaction.patch(document._id, (patch) =>
    patch.setIfMissing({language: 'en', translationStatus: 'approved'}),
  )
}

await transaction.commit({tag: 'migration.localization-baseline'})

const verification = await client.fetch(
  `count(*[
    _type in $types &&
    !(_id in path("drafts.**")) &&
    language == "en" &&
    translationStatus == "approved"
  ])`,
  {types: TYPES},
)

if (verification !== EXPECTED_COUNT) {
  throw new Error(
    `Post-migration verification failed: expected ${EXPECTED_COUNT}, found ${verification}.`,
  )
}

console.log(`Localization baseline applied and verified for ${verification} documents.`)
