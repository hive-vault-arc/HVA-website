import path from 'node:path'
import sharp from 'sharp'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-25'
const migrationVersion = '2026-07-25-v1'
const apply = process.argv.includes('--apply')
const rasterExtensions = ['avif', 'bmp', 'gif', 'heic', 'heif', 'jpeg', 'jpg', 'png', 'tif', 'tiff']
const client = getCliClient({apiVersion}).withConfig({
  perspective: 'raw',
  useCdn: false,
})

function migratedSourceId(assetId) {
  return `hva-webp-migration:${migrationVersion}:${assetId}`
}

function webpFilename(originalFilename, assetId) {
  const fallback = assetId.replace(/^image-/, '').replace(/-[^-]+$/, '')
  return `${path.basename(originalFilename || fallback, path.extname(originalFilename || ''))}.webp`
}

function encodingOptions(asset, metadata) {
  const filename = (asset.originalFilename || '').toLowerCase()
  const isBrandAsset = /(?:^|[_.-])(?:favicon|icon|logo)(?:[_.-]|$)/.test(filename)

  if (metadata.pages && metadata.pages > 1) {
    return {
      quality: 88,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
      minSize: true,
      mixed: true,
      exact: true,
    }
  }

  if (isBrandAsset) {
    return {
      lossless: true,
      effort: 6,
      exact: true,
    }
  }

  return {
    quality: 86,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: true,
    exact: Boolean(metadata.hasAlpha),
    preset: metadata.hasAlpha ? 'picture' : 'photo',
  }
}

async function fetchNonWebpAssets() {
  return client.fetch(
    `*[_type == "sanity.imageAsset" && extension in $extensions] | order(_id asc) {
      _id,
      extension,
      mimeType,
      originalFilename,
      size,
      url,
      metadata {
        dimensions,
        hasAlpha
      }
    }`,
    {extensions: rasterExtensions},
  )
}

async function findExistingMigration(asset) {
  return client.fetch(
    `*[
      _type == "sanity.imageAsset" &&
      extension == "webp" &&
      source.id == $sourceId
    ][0] {
      _id,
      extension,
      mimeType,
      originalFilename,
      size,
      url
    }`,
    {sourceId: migratedSourceId(asset._id)},
  )
}

async function convertAndUpload(asset) {
  const existing = await findExistingMigration(asset)
  if (existing?._id) return {asset: existing, created: false}

  const response = await globalThis.fetch(asset.url)
  if (!response.ok) {
    throw new Error(`Could not download ${asset._id}: ${response.status} ${response.statusText}`)
  }

  const input = Buffer.from(await response.arrayBuffer())
  const metadata = await sharp(input, {animated: true}).metadata()
  const output = await sharp(input, {
    animated: Boolean(metadata.pages && metadata.pages > 1),
    autoOrient: true,
  })
    .webp(encodingOptions(asset, metadata))
    .toBuffer({resolveWithObject: true})

  if (
    output.info.format !== 'webp' ||
    output.info.width !== metadata.width ||
    (output.info.pageHeight || output.info.height) !== (metadata.pageHeight || metadata.height) ||
    (output.info.pages || 1) !== (metadata.pages || 1)
  ) {
    throw new Error(`Converted output did not preserve geometry/animation for ${asset._id}`)
  }

  const uploaded = await client.assets.upload('image', output.data, {
    filename: webpFilename(asset.originalFilename, asset._id),
    contentType: 'image/webp',
    source: {
      id: migratedSourceId(asset._id),
      name: 'hva-webp-migration',
      url: asset.url,
    },
  })

  return {asset: uploaded, created: true}
}

function replaceReferences(value, replacements) {
  if (Array.isArray(value)) {
    let changed = false
    const next = value.map((item) => {
      const result = replaceReferences(item, replacements)
      changed ||= result.changed
      return result.value
    })
    return {value: changed ? next : value, changed}
  }

  if (!value || typeof value !== 'object') return {value, changed: false}

  const reference = typeof value._ref === 'string' ? replacements.get(value._ref) : null
  let changed = Boolean(reference)
  const next = {...value}
  if (reference) next._ref = reference

  for (const [key, child] of Object.entries(next)) {
    if (key === '_ref') continue
    const result = replaceReferences(child, replacements)
    if (result.changed) {
      next[key] = result.value
      changed = true
    }
  }

  return {value: changed ? next : value, changed}
}

async function documentsReferencing(assetIds) {
  if (assetIds.length === 0) return []

  return client.fetch(
    `*[
      _type != "sanity.imageAsset" &&
      references($assetIds)
    ]`,
    {assetIds},
  )
}

async function patchReferences(replacements) {
  const oldAssetIds = Array.from(replacements.keys())
  const documents = await documentsReferencing(oldAssetIds)
  let transaction = client.transaction()
  let patchedDocuments = 0

  for (const document of documents) {
    const set = {}

    for (const [key, value] of Object.entries(document)) {
      if (key.startsWith('_')) continue
      const result = replaceReferences(value, replacements)
      if (result.changed) set[key] = result.value
    }

    if (Object.keys(set).length > 0) {
      transaction = transaction.patch(document._id, (patch) => patch.set(set))
      patchedDocuments += 1
    }
  }

  if (patchedDocuments > 0) {
    await transaction.commit({tag: 'assets.webp-migration.references'})
  }

  return patchedDocuments
}

async function deleteObsoleteAssets(assetIds) {
  const remainingReferences = await documentsReferencing(assetIds)
  if (remainingReferences.length > 0) {
    throw new Error(
      `Refusing to delete original assets; ${remainingReferences.length} document(s) still reference them.`,
    )
  }

  let transaction = client.transaction()
  for (const assetId of assetIds) transaction = transaction.delete(assetId)
  await transaction.commit({tag: 'assets.webp-migration.cleanup'})
}

async function main() {
  const assets = await fetchNonWebpAssets()
  console.log(`${apply ? 'Applying' : 'Dry run:'} ${assets.length} non-WebP CMS raster asset(s)`)

  if (!apply) {
    const assetIds = assets.map((asset) => asset._id)
    const references = await documentsReferencing(assetIds)
    for (const asset of assets) {
      console.log(
        `would migrate ${asset._id} (${asset.originalFilename || asset.extension}, ${asset.size} bytes)`,
      )
    }
    console.log(`${references.length} published/draft document(s) require reference updates.`)
    console.log('Dry run complete; no CMS data changed.')
    return
  }

  const replacements = new Map()
  for (const asset of assets) {
    const upload = await convertAndUpload(asset)
    replacements.set(asset._id, upload.asset._id)
    console.log(
      `${upload.created ? 'uploaded' : 'reused'} ${asset._id} -> ${upload.asset._id} (${upload.asset.originalFilename})`,
    )
  }

  const patchedDocuments = await patchReferences(replacements)
  console.log(`patched ${patchedDocuments} published/draft document(s)`)

  const oldAssetIds = Array.from(replacements.keys())
  if (oldAssetIds.length > 0) {
    await deleteObsoleteAssets(oldAssetIds)
    console.log(`deleted ${oldAssetIds.length} verified-unreferenced original asset(s)`)
  }

  const remaining = await fetchNonWebpAssets()
  if (remaining.length > 0) {
    throw new Error(`CMS still contains ${remaining.length} non-WebP raster asset(s).`)
  }

  console.log('CMS WebP migration complete: zero non-WebP raster assets remain.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
