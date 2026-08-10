import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const drafts = await client.fetch(`*[_id in path("drafts.**")] | order(_updatedAt desc)`)

function withoutSystemFields(document) {
  const {_id, _rev, _createdAt, _updatedAt, ...content} = document || {}
  return content
}

function changedPaths(left, right, path = []) {
  if (JSON.stringify(left) === JSON.stringify(right)) return []
  if (
    !left ||
    !right ||
    typeof left !== 'object' ||
    typeof right !== 'object' ||
    Array.isArray(left) ||
    Array.isArray(right)
  ) {
    return [path.join('.') || '<document>']
  }

  const keys = new Set([...Object.keys(left), ...Object.keys(right)])
  return [...keys].flatMap((key) => changedPaths(left[key], right[key], [...path, key]))
}

const result = []
for (const draft of drafts) {
  const publishedId = draft._id.replace(/^drafts\./, '')
  const published = await client.getDocument(publishedId, {perspective: 'published'})
  result.push({
    draftId: draft._id,
    publishedId,
    type: draft._type,
    title: draft.title || draft.name,
    language: draft.language,
    translationStatus: draft.translationStatus,
    draftUpdatedAt: draft._updatedAt,
    publishedUpdatedAt: published?._updatedAt,
    changedPaths: changedPaths(withoutSystemFields(draft), withoutSystemFields(published)),
  })
}

console.log(JSON.stringify(result, null, 2))
