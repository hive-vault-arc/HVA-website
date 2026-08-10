import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const apply = process.argv.includes('--apply')
const expectedProjectId = '0zprc9fo'
const expectedDataset = 'production'

const config = client.config()
if (config.projectId !== expectedProjectId || config.dataset !== expectedDataset) {
  throw new Error(`Refusing to run against ${config.projectId}/${config.dataset}`)
}

const metadataDocuments = await client.fetch(
  `*[_type == "translation.metadata"] | order(_id asc){
    _id,
    _rev,
    schemaTypes,
    translations,
    "french": translations[language == "fr"][0].value->{
      _id,
      language,
      translationStatus
    }
  }`,
)

const plan = []
for (const metadata of metadataDocuments) {
  if (!metadata.french || metadata.french.language !== 'fr') {
    throw new Error(`Translation metadata ${metadata._id} has no published French document`)
  }
  if (metadata.french.translationStatus !== 'approved') {
    throw new Error(`French document ${metadata.french._id} is not approved`)
  }

  const frenchReference = metadata.translations.find((translation) => translation.language === 'fr')
  if (!frenchReference?.value?._ref) {
    throw new Error(`Translation metadata ${metadata._id} has no French reference`)
  }
  if (!frenchReference.value._weak && !frenchReference.value._strengthenOnPublish) continue

  const translations = metadata.translations.map((translation) => {
    if (translation.language !== 'fr') return translation
    const {_weak, _strengthenOnPublish, ...strongReference} = translation.value
    return {...translation, value: strongReference}
  })
  plan.push({metadata, translations})
}

console.log(
  JSON.stringify(
    {
      mode: apply ? 'apply' : 'dry-run',
      metadataDocuments: metadataDocuments.length,
      referencesToStrengthen: plan.length,
      ids: plan.map(({metadata}) => metadata._id),
    },
    null,
    2,
  ),
)

if (!apply) process.exit(0)

for (const {metadata, translations} of plan) {
  await client
    .patch(metadata._id)
    .ifRevisionId(metadata._rev)
    .set({translations})
    .commit({tag: 'localization.strengthen-published-reference'})
}

const weakReferences = await client.fetch(
  `count(*[
    _type == "translation.metadata" &&
    defined(translations[language == "fr"][0].value._weak)
  ])`,
)
if (weakReferences !== 0) {
  throw new Error(`Expected zero weak French translation references, found ${weakReferences}`)
}

console.log(`Strengthened ${plan.length} published French translation references.`)
