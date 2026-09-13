import crypto from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-28'
const projectId = '0zprc9fo'
const dataset = 'production'
const apply = process.argv.includes('--apply')
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

const industries = [
  {
    key: 'real-estate',
    displayOrder: 10,
    translations: {
      en: {
        title: 'Real Estate',
        description:
          'Property development, brokerage, leasing, client operations, and real-estate services.',
      },
      fr: {
        title: 'Immobilier',
        description: 'Promotion, courtage, location, opérations clients et services immobiliers.',
      },
    },
    legacyLabels: {
      en: ['luxury real estate', 'real estate operations', 'real estate'],
      fr: ['immobilier de luxe', 'opérations immobilières', 'immobilier'],
    },
  },
  {
    key: 'education-professional-training',
    displayOrder: 20,
    translations: {
      en: {
        title: 'Education & Professional Training',
        description:
          'Learning platforms, academies, professional development, and training operations.',
      },
      fr: {
        title: 'Éducation et formation professionnelle',
        description:
          'Plateformes pédagogiques, académies, développement professionnel et opérations de formation.',
      },
    },
    legacyLabels: {
      en: ['education & professional training'],
      fr: ['éducation et formation professionnelle'],
    },
  },
]

function stableKey(value) {
  return crypto.createHash('sha1').update(value).digest('hex').slice(0, 16)
}

function normalized(value) {
  return typeof value === 'string' ? value.trim().toLocaleLowerCase() : ''
}

function reference(documentId) {
  return {_type: 'reference', _ref: documentId}
}

function translationReference(language, documentId) {
  return {
    _key: stableKey(`industry:${language}:${documentId}`),
    _type: 'internationalizedArrayReferenceValue',
    language,
    value: reference(documentId),
  }
}

async function findIndustryDocuments() {
  return client.fetch(
    `*[
      _type == "industry" &&
      slug.current in $slugs
    ]{
      _id,
      _rev,
      language,
      translationStatus,
      title,
      "slug": slug.current,
      "isDraft": _id in path("drafts.**")
    }`,
    {slugs: industries.map((industry) => industry.key)},
  )
}

async function findCaseStudies() {
  return client.fetch(
    `*[
      _type == "caseStudy" &&
      defined(language) &&
      !(_id in path("drafts.**"))
    ]{
      _id,
      _rev,
      language,
      title,
      industry,
      industryRef
    }`,
  )
}

function plannedIndustryForStudy(study) {
  if (study.industryRef?._ref) return null
  const label = normalized(study.industry)

  return (
    industries.find((industry) => (industry.legacyLabels[study.language] ?? []).includes(label)) ??
    null
  )
}

async function upsertIndustry(industry, language, existingDocuments) {
  const existing = existingDocuments.find(
    (document) =>
      document.slug === industry.key && document.language === language && !document.isDraft,
  )
  const translation = industry.translations[language]
  const content = {
    language,
    translationStatus: 'approved',
    title: translation.title,
    slug: {_type: 'slug', current: industry.key},
    description: translation.description,
    displayOrder: industry.displayOrder,
  }

  if (!existing) {
    const created = await client.create({_type: 'industry', ...content})
    return {document: created, action: 'created'}
  }

  const updated = await client
    .patch(existing._id)
    .ifRevisionId(existing._rev)
    .set(content)
    .commit({tag: 'insights.industry-taxonomy'})

  return {document: updated, action: 'updated'}
}

async function linkTranslations(industry, englishId, frenchId) {
  const existing = await client.fetch(
    `*[
      _type == "translation.metadata" &&
      (references($englishId) || references($frenchId))
    ][0]{_id, _rev}`,
    {englishId, frenchId},
  )
  const content = {
    schemaTypes: ['industry'],
    translations: [translationReference('en', englishId), translationReference('fr', frenchId)],
  }

  if (!existing?._id) {
    return client.create({_type: 'translation.metadata', ...content})
  }

  return client
    .patch(existing._id)
    .ifRevisionId(existing._rev)
    .set(content)
    .commit({tag: `insights.industry-translation.${industry.key}`})
}

async function main() {
  const config = client.config()
  if (config.projectId !== projectId || config.dataset !== dataset) {
    throw new Error(
      `Refusing to run against ${config.projectId}/${config.dataset}; expected ${projectId}/${dataset}.`,
    )
  }

  const [existingIndustries, caseStudies] = await Promise.all([
    findIndustryDocuments(),
    findCaseStudies(),
  ])
  const plannedStudies = caseStudies
    .map((study) => ({
      study,
      industry: plannedIndustryForStudy(study),
    }))
    .filter(({industry}) => industry !== null)

  console.log(
    JSON.stringify(
      {
        mode: apply ? 'apply' : 'dry-run',
        projectId,
        dataset,
        existingIndustries,
        industryDocumentsPlanned: industries.flatMap((industry) =>
          ['en', 'fr'].map((language) => ({
            slug: industry.key,
            language,
            title: industry.translations[language].title,
          })),
        ),
        caseStudyPatches: plannedStudies.map(({study, industry}) => ({
          id: study._id,
          language: study.language,
          title: study.title,
          legacyIndustry: study.industry,
          industrySlug: industry.key,
        })),
      },
      null,
      2,
    ),
  )

  if (!apply) {
    console.log('Dry run only. Re-run with --apply to create the taxonomy and assign references.')
    return
  }

  const referencesByKeyAndLanguage = new Map()
  for (const industry of industries) {
    const english = await upsertIndustry(industry, 'en', existingIndustries)
    const french = await upsertIndustry(industry, 'fr', existingIndustries)
    await linkTranslations(industry, english.document._id, french.document._id)

    referencesByKeyAndLanguage.set(`${industry.key}:en`, english.document._id)
    referencesByKeyAndLanguage.set(`${industry.key}:fr`, french.document._id)
  }

  for (const {study, industry} of plannedStudies) {
    const industryId = referencesByKeyAndLanguage.get(`${industry.key}:${study.language}`)
    if (!industryId) {
      throw new Error(`Missing ${industry.key}/${study.language} industry reference.`)
    }

    await client
      .patch(study._id)
      .ifRevisionId(study._rev)
      .set({industryRef: reference(industryId)})
      .commit({tag: 'insights.case-study-industry'})
  }

  const verification = await client.fetch(
    `{
      "industries": *[
        _type == "industry" &&
        slug.current in $slugs &&
        !(_id in path("drafts.**"))
      ] | order(slug.current asc, language asc) {
        _id,
        language,
        title,
        "slug": slug.current
      },
      "caseStudies": *[
        _type == "caseStudy" &&
        !(_id in path("drafts.**"))
      ] | order(language asc, title asc) {
        _id,
        language,
        title,
        industry,
        "industryRef": industryRef->{_id, title, "slug": slug.current}
      }
    }`,
    {slugs: industries.map((industry) => industry.key)},
  )

  console.log(JSON.stringify(verification, null, 2))
  if (verification.industries.length !== industries.length * 2) {
    throw new Error('Industry taxonomy verification failed.')
  }

  const unassignedMappedStudies = verification.caseStudies.filter((study) => {
    const canMap = industries.some((industry) =>
      (industry.legacyLabels[study.language] ?? []).includes(normalized(study.industry)),
    )
    return canMap && !study.industryRef?._id
  })
  if (unassignedMappedStudies.length > 0) {
    throw new Error('One or more mapped case studies still lack an industry reference.')
  }

  console.log('Industry taxonomy created and case-study references verified.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
