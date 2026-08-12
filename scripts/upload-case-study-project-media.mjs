import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-25'
const uploadVersion = '2026-08-12-content-hash-v2'
const permissionConfirmedOn = '2026-08-10'
const permissionReference =
  'Direct project-owner instruction in the Codex task on 2026-08-10 to upload and display the supplied case-study WebP images.'
const apply = process.argv.includes('--apply')
const deleteReplaced = process.argv.includes('--delete-replaced')
const requestedProjects = new Set(
  (process.argv.find((argument) => argument.startsWith('--projects='))?.split('=')[1] || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const packageRoot = path.resolve(studioRoot, '..', 'case studies')
const backupRoot = path.resolve(studioRoot, '..', '.codex', 'backups')
const client = getCliClient({apiVersion})

const projects = [
  {
    directory: 'immoworld-crm',
    documentSlug: 'top-tier-crm-transformation-program-real-estate-operations',
    order: [
      'immoworld-performance-dashboard-desktop-window',
      'immoworld-project-snapshot-phone',
      'immoworld-lead-profile-phone',
      'immoworld-active-opportunity-phone',
      'immoworld-visit-calendar-phone',
    ],
    placement: {
      'immoworld-performance-dashboard-desktop-window': 'afterChallenge',
      'immoworld-project-snapshot-phone': 'afterArchitecture',
      'immoworld-lead-profile-phone': 'afterArchitecture',
      'immoworld-active-opportunity-phone': 'afterModules',
      'immoworld-visit-calendar-phone': 'afterModules',
    },
  },
  {
    directory: 'premium-advice-training',
    documentSlug: 'premium-advice-training-keepzen-digital-academy',
    order: [
      'premium-advice-learning-platform-desktop-window',
      'premium-advice-courses-phone',
      'premium-advice-evaluations-phone',
    ],
    placement: {
      'premium-advice-learning-platform-desktop-window': 'afterArchitecture',
      'premium-advice-courses-phone': 'afterModules',
      'premium-advice-evaluations-phone': 'afterModules',
    },
  },
  {
    directory: 'tarik-rami-immobilier',
    documentSlug: 'tarik-rami-immobilier',
    order: [
      'tarik-rami-dashboard',
      'tarik-rami-prospects',
      'tarik-rami-prospect-details',
      'tarik-rami-property-details',
      'tarik-rami-visit-calendar',
    ],
    placement: {
      'tarik-rami-dashboard': 'afterChallenge',
      'tarik-rami-prospects': 'afterArchitecture',
      'tarik-rami-prospect-details': 'afterModules',
      'tarik-rami-property-details': 'afterModules',
      'tarik-rami-visit-calendar': 'afterModules',
    },
  },
]

function readManifest(project) {
  const manifestPath = path.join(packageRoot, project.directory, 'manifest.json')
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing manifest: ${manifestPath}`)
  }

  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
}

function orderedAssets(project, manifest) {
  const byId = new Map(manifest.assets.map((asset) => [asset.id, asset]))

  return project.order.map((id) => {
    const asset = byId.get(id)
    if (!asset) throw new Error(`Manifest ${project.directory} is missing asset ${id}`)

    const filePath = path.join(packageRoot, project.directory, asset.webp)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing WebP asset: ${filePath}`)
    }

    const actualSha256 = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
    const expectedSha256 = String(asset.sha256 || '').toLowerCase()
    if (!expectedSha256) {
      throw new Error(`Manifest ${project.directory} is missing sha256 for ${id}`)
    }
    if (actualSha256 !== expectedSha256) {
      throw new Error(
        `Checksum mismatch for ${project.directory}/${id}: expected ${expectedSha256}, received ${actualSha256}`,
      )
    }

    return {asset: {...asset, sha256: expectedSha256}, filePath}
  })
}

function sourceId(project, asset) {
  return `hva-case-study-project-media:${uploadVersion}:${project.directory}:${asset.id}:${asset.sha256}`
}

function sourceUrl(project, asset) {
  return `local-case-study-webp://${project.directory}/${encodeURIComponent(path.basename(asset.webp))}`
}

function imageReference(asset) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

function evidenceType(asset, project) {
  if (project.directory === 'tarik-rami-immobilier') return 'deliveredInterface'
  if (asset.evidenceType === 'conceptual-interface') return 'conceptualInterface'
  if (asset.evidenceType === 'fixture-backed-application') return 'fixtureBacked'
  return 'conceptualInterface'
}

function mediaKey(project, asset) {
  return crypto
    .createHash('sha1')
    .update(`${project.directory}:${asset.id}`)
    .digest('hex')
    .slice(0, 16)
}

function localizedValue(value, locale, fallback = '') {
  if (typeof value === 'string') return value
  return value?.[locale] || value?.en || fallback
}

function projectMediaItem(project, manifest, asset, uploadedAsset, locale) {
  const disclosure = localizedValue(
    manifest.disclosure,
    locale,
    locale === 'fr' ? 'Données d’interface illustratives.' : 'Illustrative interface data.',
  )

  return {
    _key: mediaKey(project, asset),
    _type: 'caseStudyProjectMedia',
    internalLabel: asset.id,
    image: imageReference(uploadedAsset),
    deviceType: asset.deviceType === 'phone' ? 'phone' : 'desktop',
    placement: project.placement[asset.id] || 'afterArchitecture',
    evidenceType: evidenceType(asset, project),
    alt: localizedValue(asset.alt, locale),
    caption: localizedValue(asset.caption, locale),
    disclosure,
    publicationStatus: 'approved',
    permissionConfirmedOn,
    permissionReference,
  }
}

async function findDocuments(project) {
  if (!project.documentSlug) return null

  const documents = await client.fetch(
    `*[
      _type == "caseStudy" &&
      language in ["en", "fr"] &&
      slug.current == $slug
    ] | order(language asc) {
      _id,
      _rev,
      _type,
      language,
      translationStatus,
      title,
      "slug": slug.current,
      projectMedia[] {
        _key,
        _type,
        internalLabel,
        deviceType,
        placement,
        evidenceType,
        alt,
        caption,
        disclosure,
        publicationStatus,
        permissionConfirmedOn,
        permissionReference,
        image {asset->{_id, originalFilename, source}}
      }
    }`,
    {slug: project.documentSlug},
  )

  const locales = new Set(documents.map((document) => document.language))
  const missingLocales = ['en', 'fr'].filter((locale) => !locales.has(locale))
  if (missingLocales.length > 0) {
    throw new Error(
      `Missing ${missingLocales.join(', ')} caseStudy document(s) for ${project.documentSlug}`,
    )
  }

  return documents
}

async function findUploadedAsset(project, asset) {
  return client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id, url, originalFilename, mimeType}',
    {sourceId: sourceId(project, asset)},
  )
}

async function uploadAsset(project, asset, filePath) {
  const existing = await findUploadedAsset(project, asset)
  if (existing?._id) return {asset: existing, created: false}

  const uploaded = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
    contentType: 'image/webp',
    source: {
      id: sourceId(project, asset),
      name: 'hva-case-study-project-media',
      url: sourceUrl(project, asset),
    },
  })

  return {asset: uploaded, created: true}
}

async function deleteUnreferencedAssets(assetIds) {
  const deleted = []
  const retained = []

  for (const assetId of assetIds) {
    const references = await client.fetch('count(*[references($assetId)])', {assetId})
    if (references > 0) {
      retained.push({assetId, references})
      continue
    }

    const assetExists = await client.fetch('defined(*[_id == $assetId][0]._id)', {assetId})
    if (!assetExists) continue
    await client.delete(assetId, {tag: 'case-study-project-media.delete-replaced'})
    deleted.push(assetId)
  }

  return {deleted, retained}
}

async function preflight() {
  const prepared = []

  const selectedProjects = requestedProjects.size
    ? projects.filter((project) => requestedProjects.has(project.directory))
    : projects

  if (selectedProjects.length === 0) {
    throw new Error(`No matching projects for --projects=${[...requestedProjects].join(',')}`)
  }

  for (const project of selectedProjects) {
    const manifest = readManifest(project)
    const assets = orderedAssets(project, manifest)
    const documents = await findDocuments(project)
    prepared.push({project, manifest, assets, documents})
  }

  return prepared
}

function writeBackup(prepared) {
  fs.mkdirSync(backupRoot, {recursive: true})
  const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
  const backupPath = path.join(backupRoot, `case-study-project-media-${timestamp}.json`)
  const payload = {
    createdAt: new Date().toISOString(),
    reason: permissionReference,
    documents: prepared.flatMap(({documents}) => documents),
  }
  fs.writeFileSync(backupPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  return backupPath
}

function mediaMismatches(project, manifest, assets, document) {
  const expected = assets.map(({asset}) => asset)
  const actual = document.projectMedia || []
  const mismatches = []

  if (document.translationStatus !== 'approved') {
    mismatches.push(`translationStatus=${document.translationStatus || 'missing'}`)
  }
  if (actual.length !== expected.length) {
    mismatches.push(`count=${actual.length}/${expected.length}`)
  }

  expected.forEach((asset, index) => {
    const item = actual[index]
    if (!item) return
    const expectedSourceId = sourceId(project, asset)
    const expectedAlt = localizedValue(asset.alt, document.language)
    const expectedCaption = localizedValue(asset.caption, document.language)
    const expectedDisclosure = localizedValue(manifest.disclosure, document.language)

    if (item.internalLabel !== asset.id) mismatches.push(`item${index + 1}:label`)
    if (item.image?.asset?.source?.id !== expectedSourceId) {
      mismatches.push(`item${index + 1}:asset`)
    }
    if (item.alt !== expectedAlt) mismatches.push(`item${index + 1}:alt`)
    if (item.caption !== expectedCaption) mismatches.push(`item${index + 1}:caption`)
    if (item.disclosure !== expectedDisclosure) mismatches.push(`item${index + 1}:disclosure`)
    if (item.publicationStatus !== 'approved') mismatches.push(`item${index + 1}:status`)
  })

  return mismatches
}

async function main() {
  const prepared = await preflight()
  const total = prepared.reduce((count, entry) => count + entry.assets.length, 0)

  console.log(
    `${apply ? 'Applying' : 'Dry run:'} ${total} framed WebP project-media assets across ${prepared.reduce((count, entry) => count + entry.documents.length, 0)} localized documents`,
  )

  const backupPath = apply ? writeBackup(prepared) : null
  if (backupPath) console.log(`backed up affected documents -> ${backupPath}`)

  for (const entry of prepared) {
    const {project, manifest, assets, documents} = entry

    if (!apply) {
      const existingAssets = await Promise.all(
        assets.map(({asset}) => findUploadedAsset(project, asset)),
      )
      const existingCount = existingAssets.filter(Boolean).length
      console.log(
        `${project.directory}: ${assets.length} WebPs, ${existingCount} already uploaded; ` +
          documents
            .map((document) => {
              const mismatches = mediaMismatches(project, manifest, assets, document)
              return `${document.language}:${document.slug} ${
                mismatches.length > 0 ? `needs sync (${mismatches.join('|')})` : 'verified'
              }`
            })
            .join(', '),
      )
      continue
    }

    const uploadedAssets = []
    const previousAssetIds = new Set(
      documents.flatMap((document) =>
        (document.projectMedia || []).map((item) => item.image?.asset?._id).filter(Boolean),
      ),
    )

    for (const {asset, filePath} of assets) {
      const upload = await uploadAsset(project, asset, filePath)
      uploadedAssets.push({manifestAsset: asset, uploadedAsset: upload.asset})
      console.log(
        `${upload.created ? 'uploaded' : 'reused'} ${project.directory}/${path.basename(filePath)} -> ${upload.asset._id}`,
      )
    }

    let transaction = client.transaction()
    for (const document of documents) {
      const projectMedia = uploadedAssets.map(({manifestAsset, uploadedAsset}) =>
        projectMediaItem(project, manifest, manifestAsset, uploadedAsset, document.language),
      )
      transaction = transaction.patch(document._id, (patch) =>
        patch.ifRevisionId(document._rev).set({projectMedia}),
      )
    }
    await transaction.commit({tag: 'case-study-project-media.localized-upload'})
    const verifiedDocuments = await findDocuments(project)
    const verificationErrors = verifiedDocuments.flatMap((document) =>
      mediaMismatches(project, manifest, assets, document).map(
        (mismatch) => `${document.language}:${mismatch}`,
      ),
    )
    if (verificationErrors.length > 0) {
      throw new Error(`${project.directory} verification failed: ${verificationErrors.join(', ')}`)
    }
    console.log(
      `attached and verified ${assets.length} images on ${verifiedDocuments.map((document) => `${document.language}:${document.slug}`).join(', ')}`,
    )

    if (deleteReplaced) {
      const currentAssetIds = new Set(uploadedAssets.map(({uploadedAsset}) => uploadedAsset._id))
      const replacedAssetIds = [...previousAssetIds].filter(
        (assetId) => !currentAssetIds.has(assetId),
      )
      const cleanup = await deleteUnreferencedAssets(replacedAssetIds)
      console.log(
        `cleanup: deleted ${cleanup.deleted.length} replaced assets` +
          (cleanup.retained.length > 0
            ? `; retained ${cleanup.retained.map(({assetId, references}) => `${assetId} (${references} refs)`).join(', ')}`
            : ''),
      )
    }
  }

  console.log(
    apply ? 'Upload complete.' : 'Dry run complete. Re-run with --apply to mutate Sanity.',
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
