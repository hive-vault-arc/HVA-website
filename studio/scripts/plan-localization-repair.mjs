import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const locales = ['en', 'fr', 'es', 'ar']
const localizedTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
  'pageOptimization',
]

const state = await client.fetch(
  `{
    "documents": *[_type in $localizedTypes]{
      _id, _type, language, translationStatus, nativeReview, "slug": slug.current
    },
    "metadata": *[_type == "translation.metadata"]{
      _id,
      translations[]{language, "ref": value._ref, "weak": value._weak, "document": value->{_id, _type, language}}
    }
  }`,
  {localizedTypes},
)

const proposals = []
const referencedIds = new Set()

for (const family of state.metadata) {
  const translations = family.translations ?? []
  const familyTypes = [
    ...new Set(translations.flatMap((item) => (item.document?._type ? [item.document._type] : []))),
  ]

  for (const translation of translations) {
    if (translation.ref) referencedIds.add(translation.ref.replace(/^drafts\./, ''))
    if (translation.weak && translation.ref) {
      proposals.push({
        documentId: family._id,
        path: `translations[language == ${JSON.stringify(translation.language)}].value`,
        before: {_ref: translation.ref, _weak: true},
        after: {_ref: translation.ref},
        reason: 'Strengthen the translation reference after the target is published.',
      })
    }
    if (translation.document && translation.language !== translation.document.language) {
      proposals.push({
        documentId: family._id,
        path: `translations[ref == ${JSON.stringify(translation.ref)}].language`,
        before: translation.language,
        after: translation.document.language,
        reason: 'Align the metadata locale label with the referenced document.',
      })
    }
  }

  for (const locale of locales) {
    if (!translations.some((item) => item.language === locale)) {
      proposals.push({
        documentId: family._id,
        path: 'translations',
        before: translations.map(({language, ref}) => ({language, ref})),
        after: null,
        reason: `Missing ${locale} translation. A native-reviewed document must be created before a reference can be proposed.`,
      })
    }
  }

  if (familyTypes.length > 1) {
    proposals.push({
      documentId: family._id,
      path: 'translations',
      before: familyTypes,
      after: null,
      reason: 'The translation family mixes schema types and requires editorial review.',
    })
  }
}

for (const document of state.documents) {
  if (!referencedIds.has(document._id.replace(/^drafts\./, ''))) {
    proposals.push({
      documentId: document._id,
      path: 'translation.metadata',
      before: null,
      after: null,
      reason: 'Orphan localized document; select the correct family before creating metadata.',
    })
  }
}

console.log(
  JSON.stringify(
    {
      mode: 'dry-run-only',
      localizedDocuments: state.documents.length,
      translationFamilies: state.metadata.length,
      proposedDiffs: proposals.length,
      affectedDocumentIds: [...new Set(proposals.map((proposal) => proposal.documentId))],
      proposals,
      note: 'No mutations are implemented. Null after-values require an editor or native reviewer to choose the correct target.',
    },
    null,
    2,
  ),
)
