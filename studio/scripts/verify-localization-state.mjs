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
const strategicTypes = new Set([
  'capability',
  'caseStudy',
  'employeeProfile',
  'industry',
  'pageOptimization',
])

const state = await client.fetch(
  `{
    "documents": *[_type in $localizedTypes]{
      _id, _type, language, translationStatus, visibility, "noIndex": seo.noIndex,
      title, name, routeKey, "slug": slug.current
    },
    "metadata": *[_type == "translation.metadata"]{
      _id,
      translations[]{
        language,
        "weak": value._weak,
        "strengthenOnPublish": value._strengthenOnPublish,
        "ref": value._ref,
        "document": value->{_id, _type, language, translationStatus}
      }
    }
  }`,
  {localizedTypes},
)

const errors = []
const warnings = []
const referencedIds = new Set()

for (const metadata of state.metadata) {
  const translations = metadata.translations || []
  const resolved = translations.filter((translation) => translation.document)
  const types = new Set(resolved.map((translation) => translation.document._type))
  const familyType = [...types][0]

  if (types.size > 1) errors.push(`${metadata._id}: translation family mixes schema types`)

  for (const locale of locales) {
    const matches = translations.filter((translation) => translation.language === locale)
    if (matches.length > 1) errors.push(`${metadata._id}: duplicate ${locale} translation`)
    if (matches.length === 0) {
      const message = `${metadata._id}: missing ${locale} translation`
      if (familyType && strategicTypes.has(familyType)) errors.push(message)
      else warnings.push(message)
      continue
    }

    const translation = matches[0]
    if (!translation.document) errors.push(`${metadata._id}: unresolved ${locale} reference`)
    if (translation.weak || translation.strengthenOnPublish) {
      errors.push(`${metadata._id}: ${locale} reference is not strong`)
    }
    if (translation.document?.language !== locale) {
      errors.push(`${metadata._id}: ${locale} label does not match referenced document language`)
    }
    if (translation.ref) referencedIds.add(translation.ref.replace(/^drafts\./, ''))
  }
}

for (const document of state.documents) {
  const publicId = document._id.replace(/^drafts\./, '')
  if (!locales.includes(document.language)) {
    errors.push(`${document._id}: missing or invalid language`)
  }
  if (!document.translationStatus) errors.push(`${document._id}: missing translationStatus`)
  if (
    document.slug &&
    (!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(document.slug) ||
      document.slug !== document.slug.normalize('NFC'))
  ) {
    errors.push(`${document._id}: invalid Unicode slug ${JSON.stringify(document.slug)}`)
  }
  if (!referencedIds.has(publicId)) errors.push(`${document._id}: orphan translation document`)
}

const publishedApproved = state.documents.filter(
  (document) => !document._id.startsWith('drafts.') && document.translationStatus === 'approved',
)
const byLocale = Object.fromEntries(
  locales.map((locale) => [
    locale,
    publishedApproved.filter((document) => document.language === locale).length,
  ]),
)
const byType = Object.fromEntries(
  localizedTypes.map((type) => [
    type,
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        publishedApproved.filter(
          (document) => document._type === type && document.language === locale,
        ).length,
      ]),
    ),
  ]),
)

console.log(
  JSON.stringify(
    {
      translationFamilies: state.metadata.length,
      localizedDocuments: state.documents.length,
      publishedApproved: publishedApproved.length,
      byLocale,
      byType,
      warnings,
      errors,
    },
    null,
    2,
  ),
)

if (errors.length) {
  throw new Error(`Localization verification failed:\n- ${errors.join('\n- ')}`)
}

console.log('Four-language localization state verified without mutating the dataset.')
