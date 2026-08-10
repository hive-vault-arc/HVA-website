import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-25'
const uploadVersion = '2026-07-25-webp-v1'
const permissionConfirmedOn = '2026-07-25'
const permissionReference =
  'Direct project-owner instruction in the Codex task on 2026-07-25 to upload and display all case-study WebP images.'
const apply = process.argv.includes('--apply')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const packageRoot = path.resolve(studioRoot, '..', 'case studies')
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

    return {asset, filePath}
  })
}

function sourceId(project, asset) {
  return `hva-case-study-project-media:${uploadVersion}:${project.directory}:${asset.id}`
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

function projectMediaItem(project, manifest, asset, uploadedAsset) {
  const disclosure = manifest.disclosure?.en || 'Illustrative interface data.'

  return {
    _key: mediaKey(project, asset),
    _type: 'caseStudyProjectMedia',
    internalLabel: asset.id,
    image: imageReference(uploadedAsset),
    deviceType: asset.deviceType === 'phone' ? 'phone' : 'desktop',
    placement: project.placement[asset.id] || 'afterArchitecture',
    evidenceType: evidenceType(asset, project),
    alt: asset.alt.en,
    caption: asset.caption.en,
    disclosure,
    publicationStatus: 'approved',
    permissionConfirmedOn,
    permissionReference,
  }
}

async function findDocument(project) {
  if (!project.documentSlug) return null

  const document = await client.fetch(
    '*[_type == "caseStudy" && language == "en" && slug.current == $slug][0]{_id, title, "slug": slug.current}',
    {slug: project.documentSlug},
  )

  if (!document?._id) {
    throw new Error(`No English caseStudy document found for ${project.documentSlug}`)
  }

  return document
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

async function preflight() {
  const prepared = []

  for (const project of projects) {
    const manifest = readManifest(project)
    const assets = orderedAssets(project, manifest)
    const document = await findDocument(project)
    prepared.push({project, manifest, assets, document})
  }

  return prepared
}

async function main() {
  const prepared = await preflight()
  const total = prepared.reduce((count, entry) => count + entry.assets.length, 0)

  console.log(`${apply ? 'Applying' : 'Dry run:'} ${total} framed WebP project-media uploads`)

  for (const entry of prepared) {
    const {project, manifest, assets, document} = entry

    if (!apply) {
      const existingAssets = await Promise.all(
        assets.map(({asset}) => findUploadedAsset(project, asset)),
      )
      const existingCount = existingAssets.filter(Boolean).length
      console.log(
        `${project.directory}: ${assets.length} WebPs, ${existingCount} already uploaded, ${
          document ? `attach to ${document.slug}` : 'asset-library upload only'
        }`,
      )
      continue
    }

    const projectMedia = []

    for (const {asset, filePath} of assets) {
      const upload = await uploadAsset(project, asset, filePath)
      projectMedia.push(projectMediaItem(project, manifest, asset, upload.asset))
      console.log(
        `${upload.created ? 'uploaded' : 'reused'} ${project.directory}/${path.basename(filePath)} -> ${upload.asset._id}`,
      )
    }

    if (document) {
      await client
        .patch(document._id)
        .set({projectMedia})
        .commit({tag: 'case-study-project-media.upload'})
      console.log(`attached ${projectMedia.length} images to ${document.slug}`)
    } else {
      console.log(
        `${project.directory}: uploaded ${projectMedia.length} assets without attaching; no matching caseStudy document exists.`,
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
