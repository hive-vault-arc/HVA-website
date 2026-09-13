import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const frontendPublicRoot = path.resolve(scriptDir, '../../Hva-website-front/public')
const client = getCliClient({apiVersion: '2025-02-19'})
const assetVersion = '2026-07-about-redesign-v1'

const portraits = [
  {
    slug: 'khalid-chalhi',
    imagePath: '/Images/team/khalid-chalhi-founder-2026.webp',
    alt: 'Khalid Chalhi, Co-Founder and CEO of Hive Vault Arc',
  },
  {
    slug: 'ali-amrani',
    imagePath: '/Images/team/ali-amrani-founder-2026.webp',
    alt: 'Ali Amrani, Co-Founder of Hive Vault Arc',
  },
  {
    slug: 'oubay-ghamat',
    imagePath: '/Images/team/oubay-ghamat-founder-2026.webp',
    alt: 'Oubay Ghamat, Co-Founder of Hive Vault Arc',
  },
]

async function uploadPortrait({slug, imagePath, alt}) {
  const document = await client.fetch(
    '*[_type == "employeeProfile" && slug.current == $slug][0]{_id, name}',
    {slug},
  )

  if (!document?._id) {
    throw new Error(`No employeeProfile document found for ${slug}`)
  }

  const filePath = path.join(frontendPublicRoot, imagePath.slice(1))
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing portrait for ${slug}: ${filePath}`)
  }

  const sourceId = `hva-founder-portrait:${assetVersion}:${slug}`
  const existingAsset = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id}',
    {sourceId},
  )
  const asset =
    existingAsset ||
    (await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      source: {
        id: sourceId,
        name: 'HVA founder portrait',
        url: imagePath,
      },
    }))

  await client
    .patch(document._id)
    .set({
      profileImage: {
        _type: 'image',
        asset: {_type: 'reference', _ref: asset._id},
      },
      profileImageAlt: alt,
    })
    .commit()

  console.log(`Updated ${document.name} (${slug}) with ${asset._id}`)
}

for (const portrait of portraits) {
  await uploadPortrait(portrait)
}

console.log('Founder portraits uploaded and employee profiles updated.')
