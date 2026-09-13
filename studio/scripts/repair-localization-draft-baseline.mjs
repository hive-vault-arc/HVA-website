import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-23'}).withConfig({perspective: 'raw'})
const APPLY = process.argv.includes('--apply')
const TYPES = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
]

const drafts = await client.fetch(
  `*[
    _type in $types &&
    _id in path("drafts.**") &&
    (!defined(language) || !defined(translationStatus))
  ]{
    _id,
    _type,
    title,
    name,
    "publishedId": string::split(_id, "drafts.")[1]
  }`,
  {types: TYPES},
)

const eligibleDrafts = []
for (const draft of drafts) {
  const published = await client.fetch(
    `*[
      _id == $publishedId &&
      language == "en" &&
      translationStatus == "approved"
    ][0]{_id}`,
    {publishedId: draft.publishedId},
  )

  if (!published) {
    throw new Error(
      `Safety check failed: ${draft._id} has no approved English published counterpart.`,
    )
  }

  eligibleDrafts.push(draft)
}

console.log(
  JSON.stringify(
    {
      mode: APPLY ? 'apply' : 'dry-run',
      count: eligibleDrafts.length,
      patches: eligibleDrafts.map((draft) => ({
        _id: draft._id,
        _type: draft._type,
        label: draft.title ?? draft.name ?? draft._id,
        set: {language: 'en', translationStatus: 'approved'},
      })),
    },
    null,
    2,
  ),
)

if (!APPLY || eligibleDrafts.length === 0) {
  console.log(
    eligibleDrafts.length === 0
      ? 'No draft baseline repairs are required.'
      : 'Dry run only. Re-run with --apply after reviewing this output.',
  )
  process.exit(0)
}

let transaction = client.transaction()
for (const draft of eligibleDrafts) {
  transaction = transaction.patch(draft._id, (patch) =>
    patch.set({language: 'en', translationStatus: 'approved'}),
  )
}

await transaction.commit({tag: 'migration.localization-draft-baseline'})
console.log(`Applied localization workflow fields to ${eligibleDrafts.length} English draft(s).`)
