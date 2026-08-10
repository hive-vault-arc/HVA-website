import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const apply = process.argv.includes('--apply')
const expectedProjectId = '0zprc9fo'
const expectedDataset = 'production'
const publishedId = 'gg7RnZRpI6fQeqXVUf17Rb'
const draftId = `drafts.${publishedId}`

const config = client.config()
if (config.projectId !== expectedProjectId || config.dataset !== expectedDataset) {
  throw new Error(`Refusing to run against ${config.projectId}/${config.dataset}`)
}

const state = await client.fetch(
  `{
    "draft": *[_id == $draftId][0],
    "published": *[_id == $publishedId][0],
    "metadata": *[
      _type == "translation.metadata" &&
      translations[language == "en"][0].value._ref == $publishedId
    ][0]{
      "frenchId": translations[language == "fr"][0].value._ref
    }
  }`,
  {draftId, publishedId},
)

if (!state.draft) {
  console.log('The approved NVIDIA draft has already been resolved.')
  process.exit(0)
}
if (!state.published || !state.metadata?.frenchId) {
  throw new Error('NVIDIA publication or French translation metadata is missing')
}
if (
  state.draft._type !== 'newsArticle' ||
  state.draft.language !== 'en' ||
  state.draft.translationStatus !== 'approved' ||
  state.draft.slug?.current !== 'nvidia-rtx-spark-local-ai-superchip-private-agents'
) {
  throw new Error('The remaining draft no longer matches the approved NVIDIA cover update')
}

const changedTopLevelFields = Object.keys({...state.published, ...state.draft}).filter((key) => {
  if (['_id', '_rev', '_createdAt', '_updatedAt', '_system'].includes(key)) return false
  return JSON.stringify(state.published[key]) !== JSON.stringify(state.draft[key])
})
const allowedChanges = new Set(['coverAlt', 'coverImage'])
const unsafeChanges = changedTopLevelFields.filter((field) => !allowedChanges.has(field))
if (unsafeChanges.length > 0) {
  throw new Error(`Refusing unexpected NVIDIA draft changes: ${unsafeChanges.join(', ')}`)
}

console.log(
  JSON.stringify(
    {
      mode: apply ? 'apply' : 'dry-run',
      draftId,
      frenchId: state.metadata.frenchId,
      changedTopLevelFields,
      coverAsset: state.draft.coverImage?.asset?._ref,
    },
    null,
    2,
  ),
)

if (!apply) process.exit(0)

await client
  .patch(state.metadata.frenchId)
  .set({coverImage: state.draft.coverImage})
  .commit({tag: 'localization.sync-nvidia-cover'})

await client.action(
  {
    actionType: 'sanity.action.document.publish',
    draftId,
    publishedId,
    ifDraftRevisionId: state.draft._rev,
    ifPublishedRevisionId: state.published._rev,
  },
  {tag: 'content.publish-approved-nvidia-cover'},
)

const remainingDrafts = await client.fetch(`count(*[_id in path("drafts.**")])`)
if (remainingDrafts !== 0) throw new Error(`Expected zero drafts, found ${remainingDrafts}`)

console.log('Published the approved NVIDIA cover update and synchronized its French image asset.')
