import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-25'
const apply = process.argv.includes('--apply')
const projectId = '0zprc9fo'
const dataset = 'production'
const slug = 'tarik-rami-immobilier'
const permissionConfirmedOn = '2026-07-25'
const permissionReference =
  'Direct project-owner instruction in the Codex task on 2026-07-25 to publish the bilingual Tarik Rami Immobilier case study and its supplied WebP interface proofs.'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const packageRoot = path.resolve(studioRoot, '..', 'case studies', 'tarik-rami-immobilier')
const manifestPath = path.join(packageRoot, 'manifest.json')
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

const order = [
  'tarik-rami-dashboard',
  'tarik-rami-prospects',
  'tarik-rami-prospect-details',
  'tarik-rami-property-details',
  'tarik-rami-visit-calendar',
]

const placements = {
  'tarik-rami-dashboard': 'afterChallenge',
  'tarik-rami-prospects': 'afterArchitecture',
  'tarik-rami-prospect-details': 'afterModules',
  'tarik-rami-property-details': 'afterModules',
  'tarik-rami-visit-calendar': 'afterModules',
}

const localizedContent = {
  en: {
    title: 'Tarik Rami Immobilier: Centralized Project and Client Platform',
    industry: 'Real Estate Operations',
    summary:
      'A focused platform that centralizes property projects, client and prospect records, next actions, and planned visits in one shared operational view.',
    problem:
      'Tarik Rami Immobilier needed a simpler way to organize its day-to-day commercial activity. Project information, client and prospect context, property requirements, ownership, and follow-up actions could become scattered across separate conversations and working files. The team needed one dependable place to see every active project and client file without introducing the complexity of a large CRM.',
    systemArchitecture:
      'Hive Vault Arc designed and delivered a focused web platform around the team’s actual workflow. It centralizes property projects, client and prospect records, search criteria, recommended properties, responsible advisers, next actions, and planned visits. Shared desktop views support coordination and oversight, while responsive mobile records keep the essential context available during follow-up and property visits.',
    operationalModules: [
      'Centralized Project Portfolio',
      'Client and Prospect Records',
      'Property Requirements and Matching',
      'Ownership and Next-Action Tracking',
      'Visit Planning and Preparation',
      'Operational Dashboard',
    ],
    integrations: [
      'Role-Based Access',
      'Centralized Data Store',
      'Responsive Web Interface',
      'Search and Filters',
      'Visit Scheduling',
      'Activity History',
    ],
    deploymentStatus:
      'Delivered and in active team use; interface values are illustrative and no performance metrics are claimed',
    coverAlt:
      'Tarik Rami Immobilier platform dashboard centralizing projects, clients, visits, priorities, and active commercial files',
    logoLabel: 'Tarik Rami Immobilier',
    disclosure:
      'The interfaces use illustrative data to protect confidentiality. Visible values are not measured results.',
    seo: {
      _type: 'seo',
      title: 'Tarik Rami Immobilier Platform | HVA Case Study',
      description:
        'How Hive Vault Arc centralized Tarik Rami Immobilier projects, client records, property context, follow-up actions, and planned visits in one focused platform.',
      keywords: [
        'Tarik Rami Immobilier',
        'real estate operations platform',
        'client management platform',
        'property project management',
        'case study',
      ],
      noIndex: false,
    },
  },
  fr: {
    title: 'Tarik Rami Immobilier : plateforme centralisée projets et clients',
    industry: 'Opérations immobilières',
    summary:
      'Une plateforme ciblée qui centralise les projets immobiliers, les dossiers clients et prospects, les prochaines actions et les visites planifiées.',
    problem:
      'Tarik Rami Immobilier avait besoin d’une méthode plus simple pour organiser son activité commerciale quotidienne. Les informations sur les projets, le contexte des clients et prospects, les critères de recherche, les responsabilités et les actions de suivi pouvaient se disperser entre plusieurs échanges et fichiers de travail. L’équipe avait besoin d’un espace fiable pour retrouver chaque projet et chaque dossier client, sans la complexité d’un grand CRM.',
    systemArchitecture:
      'Hive Vault Arc a conçu et livré une plateforme web ciblée autour du fonctionnement réel de l’équipe. Elle centralise les projets immobiliers, les dossiers clients et prospects, les critères de recherche, les biens recommandés, les conseillers responsables, les prochaines actions et les visites planifiées. Les vues partagées sur ordinateur facilitent la coordination et le pilotage, tandis que les fiches mobiles gardent le contexte essentiel disponible pendant le suivi et les visites.',
    operationalModules: [
      'Portefeuille centralisé des projets',
      'Dossiers clients et prospects',
      'Critères de recherche et rapprochement des biens',
      'Responsables et prochaines actions',
      'Planification et préparation des visites',
      'Tableau de bord opérationnel',
    ],
    integrations: [
      'Accès par rôle',
      'Base de données centralisée',
      'Interface web responsive',
      'Recherche et filtres',
      'Planification des visites',
      'Historique des activités',
    ],
    deploymentStatus:
      'Plateforme livrée et utilisée par l’équipe ; les valeurs affichées sont illustratives et aucun résultat chiffré n’est revendiqué',
    coverAlt:
      'Tableau de bord Tarik Rami Immobilier centralisant projets, clients, visites, priorités et dossiers commerciaux actifs',
    logoLabel: 'Tarik Rami Immobilier',
    disclosure:
      'Les interfaces utilisent des données illustratives afin de préserver la confidentialité. Les valeurs visibles ne constituent pas des résultats mesurés.',
    seo: {
      _type: 'seo',
      title: 'Plateforme Tarik Rami Immobilier | Étude de cas HVA',
      description:
        'Comment Hive Vault Arc a centralisé les projets, dossiers clients, biens, actions de suivi et visites de Tarik Rami Immobilier dans une plateforme ciblée.',
      keywords: [
        'Tarik Rami Immobilier',
        'plateforme opérations immobilières',
        'gestion des clients immobiliers',
        'gestion de projets immobiliers',
        'étude de cas',
      ],
      noIndex: false,
    },
  },
}

function stableKey(value) {
  return crypto.createHash('sha1').update(value).digest('hex').slice(0, 16)
}

function imageReference(assetId) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

function sourceId(asset) {
  return `hva-case-study-project-media:2026-07-25-webp-v1:tarik-rami-immobilier:${asset.id}`
}

function sourceUrl(asset) {
  return `local-case-study-webp://tarik-rami-immobilier/${encodeURIComponent(path.basename(asset.webp))}`
}

function verifyWebp(filePath, expectedHash) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required WebP asset is missing: ${filePath}`)
  }

  const buffer = fs.readFileSync(filePath)
  const isWebp =
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  if (!isWebp) {
    throw new Error(`Asset is not a valid WebP file: ${filePath}`)
  }

  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase()
  if (expectedHash && actualHash !== expectedHash.toUpperCase()) {
    throw new Error(`SHA-256 mismatch for ${filePath}`)
  }
}

function readPackage() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Tarik Rami manifest is missing: ${manifestPath}`)
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const byId = new Map(manifest.assets.map((asset) => [asset.id, asset]))
  const assets = order.map((id) => {
    const asset = byId.get(id)
    if (!asset) throw new Error(`Tarik Rami manifest is missing ${id}`)
    const filePath = path.join(packageRoot, asset.webp)
    verifyWebp(filePath, asset.sha256)
    return {asset, filePath}
  })

  return {manifest, assets}
}

async function findUploadedAsset(asset) {
  return client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id, url, originalFilename, mimeType}',
    {sourceId: sourceId(asset)},
  )
}

async function uploadAsset(asset, filePath) {
  const existing = await findUploadedAsset(asset)
  if (existing?._id) {
    if (existing.mimeType !== 'image/webp') {
      throw new Error(`Existing asset ${existing._id} is not WebP`)
    }
    return {asset: existing, created: false}
  }

  const uploaded = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
    contentType: 'image/webp',
    source: {
      id: sourceId(asset),
      name: 'hva-case-study-project-media',
      url: sourceUrl(asset),
    },
  })

  return {asset: uploaded, created: true}
}

function localizeProjectMedia(locale, manifestAsset, uploadedAsset) {
  const content = localizedContent[locale]
  return {
    _key: stableKey(`${slug}:${locale}:${manifestAsset.id}`),
    _type: 'caseStudyProjectMedia',
    internalLabel: manifestAsset.id,
    image: imageReference(uploadedAsset._id),
    deviceType: manifestAsset.deviceType === 'phone' ? 'phone' : 'desktop',
    placement: placements[manifestAsset.id],
    evidenceType: 'deliveredInterface',
    alt: manifestAsset.alt[locale],
    caption: manifestAsset.caption[locale],
    disclosure: content.disclosure,
    publicationStatus: 'approved',
    permissionConfirmedOn,
    permissionReference,
  }
}

function caseStudyContent(locale, uploadedAssets) {
  const content = localizedContent[locale]
  const coverAsset =
    uploadedAssets.find(({manifestAsset}) => manifestAsset.id === 'tarik-rami-dashboard') ??
    uploadedAssets[0]

  return {
    language: locale,
    translationStatus: 'approved',
    title: content.title,
    slug: {_type: 'slug', current: slug},
    clientName: 'Tarik Rami Immobilier',
    industry: content.industry,
    summary: content.summary,
    problem: content.problem,
    systemArchitecture: content.systemArchitecture,
    operationalModules: content.operationalModules,
    integrations: content.integrations,
    deploymentStatus: content.deploymentStatus,
    clientEvidence: {
      _type: 'clientEvidence',
      publicationStatus: 'notCleared',
    },
    projectMedia: uploadedAssets.map(({manifestAsset, uploadedAsset}) =>
      localizeProjectMedia(locale, manifestAsset, uploadedAsset),
    ),
    assets: {
      _type: 'object',
      coverImage: imageReference(coverAsset.uploadedAsset._id),
      coverAlt: content.coverAlt,
      logoLabel: content.logoLabel,
    },
    lastUpdated: permissionConfirmedOn,
    seo: content.seo,
  }
}

async function findDocuments() {
  return client.fetch(
    `*[
      _type == "caseStudy" &&
      slug.current == $slug
    ] | order(language asc, _id asc) {
      _id,
      _rev,
      language,
      translationStatus,
      title,
      "isDraft": _id in path("drafts.**")
    }`,
    {slug},
  )
}

async function upsertDocument(locale, content, existingDocuments) {
  const existing = existingDocuments.find(
    (document) => document.language === locale && !document.isDraft,
  )

  if (!existing) {
    const created = await client.create({_type: 'caseStudy', ...content})
    return {document: created, action: 'created'}
  }

  const updated = await client
    .patch(existing._id)
    .ifRevisionId(existing._rev)
    .set(content)
    .unset(['testimonial', 'deploymentScale', 'measuredOutcomes', 'reportingNote'])
    .commit({tag: 'case-study.tarik-rami.upsert'})

  return {document: updated, action: 'updated'}
}

function translationReference(language, documentId) {
  return {
    _key: stableKey(`${slug}:translation:${language}`),
    _type: 'internationalizedArrayReferenceValue',
    language,
    value: {
      _type: 'reference',
      _ref: documentId,
    },
  }
}

async function linkTranslations(englishId, frenchId) {
  const existing = await client.fetch(
    `*[
      _type == "translation.metadata" &&
      (references($englishId) || references($frenchId))
    ][0]{_id, _rev}`,
    {englishId, frenchId},
  )
  const content = {
    schemaTypes: ['caseStudy'],
    translations: [translationReference('en', englishId), translationReference('fr', frenchId)],
  }

  if (!existing?._id) {
    const created = await client.create({_type: 'translation.metadata', ...content})
    return {document: created, action: 'created'}
  }

  const updated = await client
    .patch(existing._id)
    .ifRevisionId(existing._rev)
    .set(content)
    .commit({tag: 'case-study.tarik-rami.link-translations'})
  return {document: updated, action: 'updated'}
}

async function verifyPublishedState() {
  return client.fetch(
    `{
      "documents": *[
        _type == "caseStudy" &&
        slug.current == $slug &&
        !(_id in path("drafts.**"))
      ] | order(language asc) {
        _id,
        language,
        translationStatus,
        title,
        "slug": slug.current,
        "coverMimeType": assets.coverImage.asset->mimeType,
        "projectMediaCount": count(projectMedia),
        "approvedProjectMediaCount": count(projectMedia[publicationStatus == "approved"]),
        "projectMediaMimeTypes": array::unique(projectMedia[].image.asset->mimeType)
      },
      "metadata": *[
        _type == "translation.metadata" &&
        count(translations[value._ref in *[
          _type == "caseStudy" &&
          slug.current == $slug
        ]._id]) > 0
      ][0]{
        _id,
        "languages": translations[].language,
        "documentIds": translations[].value._ref
      }
    }`,
    {slug},
  )
}

async function main() {
  const config = client.config()
  if (config.projectId !== projectId || config.dataset !== dataset) {
    throw new Error(
      `Refusing to run against ${config.projectId}/${config.dataset}; expected ${projectId}/${dataset}.`,
    )
  }

  const {assets} = readPackage()
  const [existingDocuments, existingAssets] = await Promise.all([
    findDocuments(),
    Promise.all(assets.map(({asset}) => findUploadedAsset(asset))),
  ])

  const summary = {
    mode: apply ? 'apply' : 'dry-run',
    projectId: config.projectId,
    dataset: config.dataset,
    slug,
    documents: existingDocuments,
    assets: assets.map(({asset, filePath}, index) => ({
      id: asset.id,
      file: path.relative(studioRoot, filePath),
      deviceType: asset.deviceType,
      existingAssetId: existingAssets[index]?._id ?? null,
    })),
    plannedLocales: Object.keys(localizedContent),
  }
  console.log(JSON.stringify(summary, null, 2))

  const unexpectedDrafts = existingDocuments.filter((document) => document.isDraft)
  if (unexpectedDrafts.length > 0) {
    throw new Error(
      `Refusing to publish while Tarik Rami drafts already exist: ${unexpectedDrafts.map((document) => document._id).join(', ')}`,
    )
  }

  if (!apply) {
    console.log('Dry run only. Re-run with --apply to upload and publish the bilingual case study.')
    return
  }

  const uploadedAssets = []
  for (const {asset, filePath} of assets) {
    const upload = await uploadAsset(asset, filePath)
    uploadedAssets.push({manifestAsset: asset, uploadedAsset: upload.asset})
    console.log(`${upload.created ? 'Uploaded' : 'Reused'} ${asset.id}: ${upload.asset._id}`)
  }

  const english = await upsertDocument(
    'en',
    caseStudyContent('en', uploadedAssets),
    existingDocuments,
  )
  const french = await upsertDocument(
    'fr',
    caseStudyContent('fr', uploadedAssets),
    existingDocuments,
  )
  console.log(`${english.action} English case study: ${english.document._id}`)
  console.log(`${french.action} French case study: ${french.document._id}`)

  const metadata = await linkTranslations(english.document._id, french.document._id)
  console.log(`${metadata.action} translation metadata: ${metadata.document._id}`)

  const verification = await verifyPublishedState()
  const documentsValid =
    verification.documents.length === 2 &&
    verification.documents.every(
      (document) =>
        document.translationStatus === 'approved' &&
        document.coverMimeType === 'image/webp' &&
        document.projectMediaCount === 5 &&
        document.approvedProjectMediaCount === 5 &&
        document.projectMediaMimeTypes.length === 1 &&
        document.projectMediaMimeTypes[0] === 'image/webp',
    )
  const metadataValid =
    verification.metadata?.languages?.includes('en') &&
    verification.metadata?.languages?.includes('fr') &&
    verification.metadata?.documentIds?.includes(english.document._id) &&
    verification.metadata?.documentIds?.includes(french.document._id)

  console.log(JSON.stringify(verification, null, 2))
  if (!documentsValid || !metadataValid) {
    throw new Error('Post-publication verification failed.')
  }

  console.log('Tarik Rami Immobilier bilingual case study published and verified.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
