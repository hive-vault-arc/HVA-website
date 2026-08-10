/* global AbortController, URL, clearTimeout, fetch, setTimeout */

import {getCliClient} from 'sanity/cli'
import {frenchOutcomeOverrides, frenchOverrides} from './french-localization-overrides.mjs'

const apiVersion = '2026-08-10'
const expectedProjectId = '0zprc9fo'
const expectedDataset = 'production'
const expectedDraftCount = 23
const apply = process.argv.includes('--apply')
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

const localizedTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
]

const translatableScalarKeys = new Set([
  'answer',
  'attribution',
  'briefLine',
  'caption',
  'category',
  'content',
  'context',
  'coverAlt',
  'credential',
  'deploymentStatus',
  'description',
  'disclosure',
  'excerpt',
  'heroImageAlt',
  'industry',
  'kicker',
  'label',
  'location',
  'position',
  'problem',
  'profileImageAlt',
  'question',
  'readTime',
  'responsibilityTag',
  'role',
  'shortTitle',
  'story',
  'subtitle',
  'summary',
  'systemArchitecture',
  'tag',
  'title',
])

const translatableStringArrays = new Set([
  'briefBullets',
  'expertise',
  'highlights',
  'integrations',
  'items',
  'keywords',
  'operationalModules',
  'relatedOutcomes',
  'subCapabilities',
  'tags',
])

const protectedPathSegments = new Set(['clientEvidence'])
const translationCache = new Map()
let translatedStringCount = 0
let activeTranslationRequests = 0
const translationWaiters = []
const maxConcurrentTranslationRequests = 6

function documentSlug(document) {
  return document.slug?.current || document.slug || document.name
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function withTranslationSlot(callback) {
  if (activeTranslationRequests >= maxConcurrentTranslationRequests) {
    await new Promise((resolve) => translationWaiters.push(resolve))
  }

  activeTranslationRequests += 1
  try {
    return await callback()
  } finally {
    activeTranslationRequests -= 1
    translationWaiters.shift()?.()
  }
}

function protectTerms(value) {
  const terms = [
    'Hive Vault Arc',
    'Premium Advice & Training',
    'KeepZen International',
    'WhatsApp Business API',
    'WhatsApp',
    'Google Calendar',
    'React Native',
    'Next.js',
    'PostgreSQL',
    'Salesforce',
    'Terraform',
    'DocuSign',
    'HubSpot',
    'McKinsey',
    'Gartner',
    'Microsoft',
    'NVIDIA',
    'ImmoWorld',
    'KeepZen',
    'AWS',
    'Azure',
    'GCP',
    'MLOps',
    'DevOps',
    'CI/CD',
    'RTO/RPO',
    'SaaS',
    'CUDA',
    'n8n',
  ]

  const replacements = []
  let protectedValue = value
  for (const term of terms) {
    if (!protectedValue.includes(term)) continue
    const token = `ZXQTERM${replacements.length}QXZ`
    protectedValue = protectedValue.split(term).join(token)
    replacements.push({token, term})
  }

  return {protectedValue, replacements}
}

function restoreTerms(value, replacements) {
  let restored = value
  for (const {token, term} of replacements) {
    restored = restored
      .split(token)
      .join(term)
      .split(token.toLowerCase())
      .join(term)
      .split(token.replace('TERM', ' TERME '))
      .join(term)
  }
  return restored
}

function polishFrench(value) {
  const replacements = [
    ['transcrire des discours', 'transcrire la parole'],
    ['Il fixe des objectifs, les divise', 'Elle fixe des objectifs, les divise'],
    ['Cela agit.', 'Elle agit.'],
    ['il reproduit la confusion', 'elle reproduit la confusion'],
    [
      "Le dépôt n'était pas un problème de produit.",
      'L’abandon n’était pas un problème de produit.',
    ],
    [
      'À 50 ans, cela devient un travail à temps plein.',
      'À 50 messages par jour, cela devient un travail à temps plein.',
    ],
    ['A 200, ça casse.', 'À 200 messages, le processus ne tient plus.'],
    ['Ils sont à la traîne de leurs concurrents', 'Elles prennent du retard sur leurs concurrents'],
    ['qualité des qualifications', 'qualité de la qualification'],
    [
      'transformation du marché intermédiaire',
      'transformation des entreprises de taille intermédiaire',
    ],
    ['modèles de prestation', 'modèles de livraison'],
  ]

  return replacements.reduce(
    (polished, [englishMachineOutput, frenchEditorialCopy]) =>
      polished.split(englishMachineOutput).join(frenchEditorialCopy),
    value,
  )
}

async function requestTranslation(value) {
  const cached = translationCache.get(value)
  if (cached) return cached

  const translation = withTranslationSlot(async () => {
    const {protectedValue, replacements} = protectTerms(value)
    const url = new URL('https://translate.googleapis.com/translate_a/single')
    url.searchParams.set('client', 'gtx')
    url.searchParams.set('sl', 'en')
    url.searchParams.set('tl', 'fr')
    url.searchParams.set('dt', 't')
    url.searchParams.set('q', protectedValue)

    let lastError
    for (let attempt = 1; attempt <= 4; attempt += 1) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 20_000)

      try {
        const response = await fetch(url, {
          headers: {'user-agent': 'HVA-Sanity-localization-migration/1.0'},
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`translation endpoint returned ${response.status}`)

        const payload = await response.json()
        const translated = payload?.[0]
          ?.map((part) => part?.[0] || '')
          .join('')
          .trim()
        if (!translated) throw new Error('translation endpoint returned an empty result')

        translatedStringCount += 1
        await sleep(50)
        return polishFrench(restoreTerms(translated, replacements))
      } catch (error) {
        lastError = error
        await sleep(attempt * 400)
      } finally {
        clearTimeout(timeout)
      }
    }

    throw new Error(`Could not translate ${JSON.stringify(value.slice(0, 80))}: ${lastError}`)
  })

  translationCache.set(value, translation)
  return translation
}

function shouldTranslateString(value, path) {
  if (!value.trim() || /^https?:\/\//i.test(value) || /^mailto:/i.test(value)) return false
  if (path.some((segment) => protectedPathSegments.has(segment))) return false

  const key = path.at(-1)
  const parentKey = path.at(-2)
  return translatableScalarKeys.has(key) || translatableStringArrays.has(parentKey)
}

async function translateValue(value, path = []) {
  if (typeof value === 'string') {
    return shouldTranslateString(value, path) ? requestTranslation(value) : value
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item, index) => translateValue(item, [...path, index])))
  }

  if (!value || typeof value !== 'object') return value

  const translatedEntries = await Promise.all(
    Object.entries(value).map(async ([key, nestedValue]) => [
      key,
      await translateValue(nestedValue, [...path, key]),
    ]),
  )
  return Object.fromEntries(translatedEntries)
}

function deepMerge(source, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) return override

  const result = {...source}
  for (const [key, value] of Object.entries(override)) {
    result[key] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? deepMerge(source?.[key] || {}, value)
        : value
  }
  return result
}

function applyCuratedOverrides(document) {
  const slug = documentSlug(document)
  const override = frenchOverrides[slug]
  if (!override) throw new Error(`Missing curated French override for ${document._type}:${slug}`)

  const merged = deepMerge(document, override)
  const outcomeOverrides = frenchOutcomeOverrides[slug]
  if (outcomeOverrides && Array.isArray(merged.publishedOutcomes)) {
    merged.publishedOutcomes = merged.publishedOutcomes.map((outcome) =>
      outcomeOverrides[outcome._key] ? {...outcome, ...outcomeOverrides[outcome._key]} : outcome,
    )
  }

  const translatedDescription = [
    override.summary,
    override.excerpt,
    override.subtitle,
    override.briefLine,
    override.story,
  ].find((value) => typeof value === 'string' && value.length > 0)
  if (merged.seo) {
    merged.seo = {
      ...merged.seo,
      ...(typeof override.title === 'string' ? {title: override.title} : {}),
      ...(translatedDescription ? {description: translatedDescription} : {}),
    }
  }
  if (merged.assets?.coverAlt && typeof override.title === 'string') {
    merged.assets = {...merged.assets, coverAlt: override.title}
  }

  return merged
}

function cleanForReplace(document) {
  const {_rev, _createdAt, _updatedAt, ...cleanDocument} = document
  return cleanDocument
}

const config = client.config()
if (config.projectId !== expectedProjectId || config.dataset !== expectedDataset) {
  throw new Error(
    `Refusing to run against ${config.projectId}/${config.dataset}; expected ${expectedProjectId}/${expectedDataset}.`,
  )
}

const state = await client.fetch(
  `{
    "drafts": *[
      _type in $types &&
      _id in path("drafts.**") &&
      language == "fr" &&
      translationStatus == "draft"
    ] | order(_type asc, slug.current asc),
    "publishedFrench": count(*[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "fr" &&
      translationStatus == "approved"
    ]),
    "metadata": *[
      _type == "translation.metadata" &&
      count(translations[language == "en"]) == 1 &&
      count(translations[language == "fr"]) == 1
    ]{
      _id,
      "englishId": translations[language == "en"][0].value._ref,
      "frenchId": translations[language == "fr"][0].value._ref
    }
  }`,
  {types: localizedTypes},
)

if (state.drafts.length === 0 && state.publishedFrench === expectedDraftCount + 1) {
  console.log('All 24 French localized documents are already published and approved.')
  process.exit(0)
}

if (state.drafts.length !== expectedDraftCount || state.publishedFrench !== 1) {
  throw new Error(
    `Unexpected localization state: ${state.drafts.length} French drafts and ${state.publishedFrench} approved French publications.`,
  )
}

const metadataByFrenchId = new Map(state.metadata.map((item) => [item.frenchId, item]))
const plan = []
for (const draft of state.drafts) {
  const publishedId = draft._id.replace(/^drafts\./, '')
  const metadata = metadataByFrenchId.get(publishedId)
  if (!metadata) throw new Error(`No translation metadata links French document ${publishedId}`)

  const english = await client.getDocument(metadata.englishId, {perspective: 'published'})
  if (!english || english.language !== 'en' || english.translationStatus !== 'approved') {
    throw new Error(`English source ${metadata.englishId} is missing or not approved`)
  }

  const translated = applyCuratedOverrides(await translateValue(draft))
  translated._id = draft._id
  translated.language = 'fr'
  translated.translationStatus = 'approved'
  plan.push({draft, english, publishedId, translated: cleanForReplace(translated)})
}

const slugs = plan.map(({translated}) => documentSlug(translated))
const missingOverrides = slugs.filter((slug) => !frenchOverrides[slug])
if (missingOverrides.length > 0) {
  throw new Error(`Missing curated French overrides: ${missingOverrides.join(', ')}`)
}

console.log(
  JSON.stringify(
    {
      mode: apply ? 'apply-and-publish' : 'dry-run',
      projectId: config.projectId,
      dataset: config.dataset,
      documents: plan.map(({translated}) => ({
        id: translated._id,
        type: translated._type,
        slug: documentSlug(translated),
        title: translated.title || translated.name,
        sampleBody: translated.sections
          ?.filter((section) => typeof section.content === 'string')
          .slice(0, 2)
          .map((section) => section.content),
      })),
      translatedUniqueStrings: translatedStringCount,
    },
    null,
    2,
  ),
)

if (!apply) {
  console.log('\nDry run only. Re-run with --apply to replace and publish the French documents.')
  process.exit(0)
}

for (const {draft, publishedId, translated} of plan) {
  const replacedDraft = await client.createOrReplace(translated, {
    tag: 'localization.french-content.translate',
  })

  await client.action(
    {
      actionType: 'sanity.action.document.publish',
      draftId: draft._id,
      publishedId,
      ifDraftRevisionId: replacedDraft._rev,
    },
    {tag: 'localization.french-content.publish'},
  )

  console.log(`Published ${translated._type}:${documentSlug(translated)} (${publishedId})`)
}

const verification = await client.fetch(
  `{
    "drafts": count(*[_type in $types && _id in path("drafts.**") && language == "fr"]),
    "publishedApproved": count(*[
      _type in $types &&
      !(_id in path("drafts.**")) &&
      language == "fr" &&
      translationStatus == "approved"
    ])
  }`,
  {types: localizedTypes},
)

if (verification.drafts !== 0 || verification.publishedApproved !== expectedDraftCount + 1) {
  throw new Error(`Post-publish verification failed: ${JSON.stringify(verification)}`)
}

console.log(`French localization publication complete: ${JSON.stringify(verification)}`)
