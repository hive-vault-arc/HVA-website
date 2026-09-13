import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-08-10'
const apply = process.argv.includes('--apply')
const slug = 'top-tier-crm-transformation-program-real-estate-operations'
const permissionConfirmedOn = '2026-08-10'
const sourceId = 'hva-client-evidence:immoworld:official-testimonial:2026-07:pdf:v1'
const sourceName = 'ImmoWorld official signed client testimonial PDF'
const quoteExcerpt =
  'Immoworld did not have to adapt to a generic system; Hive Vault Arc designed the CRM around the reality of our real-estate operations.'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const workspaceRoot = path.resolve(studioRoot, '..')
const sourcePath = path.resolve(
  process.env.IMMOWORLD_TESTIMONIAL_PDF ||
    path.join(os.homedir(), 'Downloads', 'testimonial-immoworld.pdf'),
)
const backupRoot = path.join(workspaceRoot, '.codex', 'backups')
const client = getCliClient({apiVersion})

const localizedEvidence = {
  en: {
    documentTitle: 'Official client testimonial — ImmoWorld Luxury Real Estate',
  },
  fr: {
    documentTitle: 'Témoignage client officiel — ImmoWorld Luxury Real Estate',
  },
}

function fileReference(assetId) {
  return {
    _type: 'file',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

async function findDocuments() {
  const documents = await client.fetch(
    `*[
      _type == "caseStudy" &&
      language in ["en", "fr"] &&
      slug.current == $slug
    ] | order(language asc) {
      _id,
      _rev,
      language,
      title,
      translationStatus,
      "slug": slug.current,
      clientEvidence {
        ...,
        testimonialPdf {asset->{_id, mimeType, size, source}},
        testimonialImage {asset->{_id, mimeType, source}}
      }
    }`,
    {slug},
  )

  const locales = new Set(documents.map((document) => document.language))
  const missingLocales = ['en', 'fr'].filter((locale) => !locales.has(locale))
  if (missingLocales.length > 0) {
    throw new Error(`Missing ${missingLocales.join(', ')} ImmoWorld case-study document(s).`)
  }

  return documents
}

async function findUploadedAsset() {
  return client.fetch(
    '*[_type == "sanity.fileAsset" && source.id == $sourceId][0]{_id, url, mimeType, size, originalFilename, source}',
    {sourceId},
  )
}

async function uploadAsset() {
  const existing = await findUploadedAsset()
  if (existing?._id) return {asset: existing, created: false}

  const asset = await client.assets.upload('file', fs.createReadStream(sourcePath), {
    filename: 'immoworld-official-client-testimonial.pdf',
    contentType: 'application/pdf',
    source: {
      id: sourceId,
      name: sourceName,
      url: 'local-client-evidence://Downloads/testimonial-immoworld.pdf',
    },
  })

  return {asset, created: true}
}

function writeBackup(documents) {
  fs.mkdirSync(backupRoot, {recursive: true})
  const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
  const backupPath = path.join(backupRoot, `immoworld-client-testimonial-pdf-${timestamp}.json`)
  fs.writeFileSync(
    backupPath,
    `${JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        reason:
          'Direct project-owner instruction on 2026-08-10 to replace the ImmoWorld testimonial image with the supplied signed PDF.',
        sourcePath,
        documents,
      },
      null,
      2,
    )}\n`,
    'utf8',
  )
  return backupPath
}

function testimonialEvidence(document, assetId) {
  const localized = localizedEvidence[document.language]
  const existing = {...(document.clientEvidence || {})}
  delete existing.testimonialImage
  delete existing.testimonialImageAlt
  delete existing.testimonialPdf

  return {
    ...existing,
    _type: 'clientEvidence',
    publicationStatus: 'approved',
    permissionConfirmedOn,
    documentTitle: localized.documentTitle,
    documentLanguage: 'en',
    quoteExcerpt,
    signatoryRole: 'Founder & CEO',
    testimonialPdf: fileReference(assetId),
  }
}

function verifyDocuments(documents, assetId) {
  const errors = []

  for (const document of documents) {
    const evidence = document.clientEvidence
    const localized = localizedEvidence[document.language]
    if (document.translationStatus !== 'approved') {
      errors.push(`${document.language}:translationStatus=${document.translationStatus}`)
    }
    if (evidence?.publicationStatus !== 'approved') {
      errors.push(`${document.language}:publicationStatus`)
    }
    if (evidence?.testimonialPdf?.asset?._id !== assetId) {
      errors.push(`${document.language}:testimonialPdf`)
    }
    if (evidence?.testimonialImage) {
      errors.push(`${document.language}:testimonialImage-still-present`)
    }
    if (evidence?.testimonialImageAlt) {
      errors.push(`${document.language}:testimonialImageAlt-still-present`)
    }
    if (evidence?.documentTitle !== localized.documentTitle) {
      errors.push(`${document.language}:documentTitle`)
    }
    if (evidence?.quoteExcerpt !== quoteExcerpt) {
      errors.push(`${document.language}:quoteExcerpt`)
    }
  }

  return errors
}

async function main() {
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing testimonial source PDF: ${sourcePath}`)

  const sourceStats = fs.statSync(sourcePath)
  if (sourceStats.size <= 0 || sourceStats.size > 3 * 1024 * 1024) {
    throw new Error(`Testimonial PDF must be between 1 byte and 3 MB: ${sourceStats.size}`)
  }

  const [documents, existingAsset] = await Promise.all([findDocuments(), findUploadedAsset()])
  console.log(
    `${apply ? 'Applying' : 'Dry run:'} ImmoWorld PDF testimonial for ${documents.map((document) => document.language).join(', ')}; asset ${existingAsset ? 'already uploaded' : 'will be uploaded'}; previous image references will be removed.`,
  )

  if (!apply) {
    for (const document of documents) {
      console.log(
        `${document.language}:${document.slug} -> ${localizedEvidence[document.language].documentTitle}`,
      )
    }
    console.log('Dry run complete. Re-run with --apply to mutate Sanity.')
    return
  }

  const backupPath = writeBackup(documents)
  console.log(`backed up affected documents -> ${backupPath}`)

  const {asset, created} = await uploadAsset()
  console.log(`${created ? 'uploaded' : 'reused'} testimonial PDF -> ${asset._id}`)

  let transaction = client.transaction()
  for (const document of documents) {
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).set({
        clientEvidence: testimonialEvidence(document, asset._id),
      }),
    )
  }
  const transactionResult = await transaction.commit({
    tag: 'case-study-testimonial.immoworld.replace-image-with-pdf',
  })

  const verifiedDocuments = await findDocuments()
  const verificationErrors = verifyDocuments(verifiedDocuments, asset._id)
  if (asset.mimeType !== 'application/pdf') {
    verificationErrors.push(`asset:mimeType=${asset.mimeType}`)
  }
  if (asset.size !== sourceStats.size) {
    verificationErrors.push(`asset:size=${asset.size};source=${sourceStats.size}`)
  }
  if (verificationErrors.length > 0) {
    throw new Error(`Verification failed: ${verificationErrors.join(', ')}`)
  }

  console.log(`transaction -> ${transactionResult.transactionId}`)
  console.log(
    `Attached and verified the PDF-only testimonial on ${verifiedDocuments.map((document) => `${document.language}:${document.slug}`).join(', ')}.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
