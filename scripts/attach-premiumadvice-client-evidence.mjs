import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-16'
const slug = 'premium-advice-training-keepzen-digital-academy'
const permissionConfirmedOn = '2026-07-16'
const pdfMimeType = 'application/pdf'
const maxPdfSize = 3 * 1024 * 1024
const client = getCliClient({apiVersion})

const pdfPath = process.env.PAT_TESTIMONIAL_PDF
const logoPath = process.env.PAT_CLIENT_LOGO

function requireFile(filePath, label) {
  if (!filePath) throw new Error(`${label} path is required.`)
  if (!fs.existsSync(filePath)) throw new Error(`${label} is missing: ${filePath}`)

  return filePath
}

function assetReference(assetId, type) {
  return {
    _type: type,
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

async function findAssetBySourceId(assetType, sourceId) {
  return client.fetch('*[_type == $assetType && source.id == $sourceId][0]{_id}', {
    assetType,
    sourceId,
  })
}

async function getOrUploadPdf(filePath) {
  const sourceId = 'hva-client-evidence:premium-advice-training:2026-06:signed:v1'
  const existing = await findAssetBySourceId('sanity.fileAsset', sourceId)
  if (existing?._id) return assetReference(existing._id, 'file')

  const bytes = fs.readFileSync(filePath)
  if (bytes.length === 0 || bytes.length > maxPdfSize) {
    throw new Error(`The client reference letter must be between 1 byte and ${maxPdfSize} bytes.`)
  }
  if (bytes.subarray(0, 5).toString('ascii') !== '%PDF-') {
    throw new Error('The supplied client reference letter is not a PDF.')
  }

  const asset = await client.assets.upload('file', bytes, {
    contentType: pdfMimeType,
    source: {
      id: sourceId,
      name: 'Premium Advice & Training signed client reference letter',
    },
  })

  return assetReference(asset._id, 'file')
}

async function getOrUploadLogo(filePath) {
  const sourceId = 'hva-client-logo:premium-advice-training:user-supplied:v1'
  const existing = await findAssetBySourceId('sanity.imageAsset', sourceId)
  if (existing?._id) return assetReference(existing._id, 'image')

  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: 'premium-advice-training-logo.jpg',
    source: {
      id: sourceId,
      name: 'Premium Advice & Training user-supplied logo',
    },
  })

  return assetReference(asset._id, 'image')
}

async function main() {
  const resolvedPdfPath = path.resolve(requireFile(pdfPath, 'Signed testimonial PDF'))
  const resolvedLogoPath = path.resolve(requireFile(logoPath, 'Client logo'))

  const study = await client.fetch(
    '*[_type == "caseStudy" && slug.current == $slug][0]{_id,_rev}',
    {slug},
  )
  if (!study?._id || !study?._rev) {
    throw new Error(`Case study not found for slug: ${slug}`)
  }

  const [testimonialPdf, clientLogo] = await Promise.all([
    getOrUploadPdf(resolvedPdfPath),
    getOrUploadLogo(resolvedLogoPath),
  ])

  const updated = await client
    .patch(study._id)
    .ifRevisionId(study._rev)
    .set({
      clientName: 'Premium Advice & Training',
      clientEvidence: {
        _type: 'clientEvidence',
        publicationStatus: 'approved',
        permissionConfirmedOn,
        documentTitle: 'Lettre de référence client — Premium Advice & Training',
        documentLanguage: 'fr',
        testimonialPdf,
        quoteExcerpt:
          "HIVE VAULT ARC a transformé notre façon de délivrer nos formations. Des premiers jalons jusqu'à la livraison finale, leur engagement envers la qualité et la rapidité a établi un nouveau standard pour ce que nous pensions possible.",
        signatoryName: 'GASMI Marouane',
        signatoryRole: 'Chef de projet & Consultant junior',
        evidencePriority: 1,
      },
      'assets.logoLabel': 'Premium Advice & Training',
      'assets.clientLogo': clientLogo,
      'assets.clientLogoAlt': 'Premium Advice & Training logo',
      'assets.clientWebsite': 'https://premiumadvicetraining.com/',
      lastUpdated: permissionConfirmedOn,
    })
    .commit()

  console.log(`Attached approved Premium Advice client evidence: ${updated._id}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
