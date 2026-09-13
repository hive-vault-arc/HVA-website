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
const sourceId = 'hva-client-logo:2026-07-25-webp-v1:tarik-rami-immobilier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const logoPath = path.resolve(
  studioRoot,
  '..',
  'Hva-website-front',
  'public',
  'Images',
  'trustedby',
  'tarik-rami-immobilier-logo.webp',
)
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

const localizedAltText = {
  en: 'Tarik Rami Immobilier logo',
  fr: 'Logo de Tarik Rami Immobilier',
}

function readLogo() {
  if (!fs.existsSync(logoPath)) {
    throw new Error(`Trusted By logo is missing: ${logoPath}`)
  }

  const buffer = fs.readFileSync(logoPath)
  const isWebp =
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'

  if (!isWebp) {
    throw new Error(`Trusted By logo is not valid WebP data: ${logoPath}`)
  }

  return {
    buffer,
    sha1: crypto.createHash('sha1').update(buffer).digest('hex'),
  }
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

async function findPublishedCaseStudies() {
  return client.fetch(
    `*[
      _type == "caseStudy" &&
      slug.current == $slug &&
      language in ["en", "fr"] &&
      !(_id in path("drafts.**"))
    ] | order(language asc) {
      _id,
      _rev,
      language,
      title,
      "currentLogoId": assets.clientLogo.asset._ref
    }`,
    {slug},
  )
}

async function findExistingAsset(sha1) {
  return client.fetch(
    `*[
      _type == "sanity.imageAsset" &&
      (source.id == $sourceId || sha1hash == $sha1)
    ][0]{
      _id,
      originalFilename,
      mimeType,
      sha1hash,
      url
    }`,
    {sourceId, sha1},
  )
}

async function uploadLogo(buffer) {
  return client.assets.upload('image', buffer, {
    filename: path.basename(logoPath),
    contentType: 'image/webp',
    source: {
      id: sourceId,
      name: 'hva-client-logo',
      url: `local-frontend-webp://trustedby/${path.basename(logoPath)}`,
    },
  })
}

async function verify(assetId, sha1) {
  return client.fetch(
    `*[
      _type == "caseStudy" &&
      slug.current == $slug &&
      language in ["en", "fr"] &&
      !(_id in path("drafts.**"))
    ] | order(language asc) {
      _id,
      language,
      "clientLogoId": assets.clientLogo.asset._ref,
      "clientLogoAlt": assets.clientLogoAlt,
      "clientLogoMimeType": assets.clientLogo.asset->mimeType,
      "clientLogoSha1": assets.clientLogo.asset->sha1hash,
      "matchesExpectedAsset": assets.clientLogo.asset._ref == $assetId,
      "matchesExpectedSha1": assets.clientLogo.asset->sha1hash == $sha1
    }`,
    {assetId, sha1, slug},
  )
}

async function main() {
  const config = client.config()
  if (config.projectId !== projectId || config.dataset !== dataset) {
    throw new Error(
      `Refusing to run against ${config.projectId}/${config.dataset}; expected ${projectId}/${dataset}.`,
    )
  }

  const {buffer, sha1} = readLogo()
  const [documents, existingAsset] = await Promise.all([
    findPublishedCaseStudies(),
    findExistingAsset(sha1),
  ])

  if (
    documents.length !== 2 ||
    !documents.some((document) => document.language === 'en') ||
    !documents.some((document) => document.language === 'fr')
  ) {
    throw new Error(
      `Expected one published English and one published French Tarik Rami case study; found ${documents.length}.`,
    )
  }

  console.log(
    JSON.stringify(
      {
        mode: apply ? 'apply' : 'dry-run',
        projectId: config.projectId,
        dataset: config.dataset,
        slug,
        logoPath: path.relative(studioRoot, logoPath),
        logoBytes: buffer.length,
        logoSha1: sha1,
        existingAsset,
        documents,
      },
      null,
      2,
    ),
  )

  if (!apply) {
    console.log('Dry run only. Re-run with --apply to attach the Trusted By logo.')
    return
  }

  const asset = existingAsset ?? (await uploadLogo(buffer))
  if (asset.mimeType !== 'image/webp' || asset.sha1hash !== sha1) {
    throw new Error(`Uploaded asset ${asset._id} failed WebP or SHA-1 verification.`)
  }

  let transaction = client.transaction()
  for (const document of documents) {
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).set({
        'assets.clientLogo': imageReference(asset._id),
        'assets.clientLogoAlt': localizedAltText[document.language],
      }),
    )
  }

  await transaction.commit({tag: 'case-study.tarik-rami.attach-client-logo'})

  const verification = await verify(asset._id, sha1)
  const valid =
    verification.length === 2 &&
    verification.every(
      (document) =>
        document.matchesExpectedAsset &&
        document.matchesExpectedSha1 &&
        document.clientLogoMimeType === 'image/webp' &&
        document.clientLogoAlt === localizedAltText[document.language],
    )

  console.log(JSON.stringify({assetId: asset._id, verification}, null, 2))
  if (!valid) {
    throw new Error('Tarik Rami client-logo verification failed.')
  }

  console.log('Tarik Rami Trusted By logo attached to both published case studies.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
