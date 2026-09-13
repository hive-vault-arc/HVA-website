import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-01'
const assetVersion = '2026-07-08-v1'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const frontendRoot = path.resolve(studioRoot, '..', 'Hva-website-front')
const suppliedCoverDir = path.join(frontendRoot, 'insights pics')
const client = getCliClient({apiVersion})

const IMMOWORLD_CRM_TITLE = 'ImmoWorld CRM Operating System for Real Estate Operations'
const IMMOWORLD_CRM_SLUG = 'top-tier-crm-transformation-program-real-estate-operations'

const covers = [
  {
    type: 'caseStudy',
    slug: IMMOWORLD_CRM_SLUG,
    title: IMMOWORLD_CRM_TITLE,
    filename: 'ImmoWorld CRM Operating System for Real Estate Operations.webp',
    alt: 'ImmoWorld CRM operating system for real estate lead intake, pipeline work, and operational reporting',
  },
  {
    type: 'caseStudy',
    slug: 'multilingual-whatsapp-ai-agent',
    filename: 'Multilingual WhatsApp AI Agent for Lead Operations.webp',
    alt: 'Multilingual WhatsApp AI agent lead operations system connected to customer conversations and sales workflows',
  },
  {
    type: 'newsArticle',
    slug: 'nvidia-rtx-spark-local-ai-superchip-private-agents',
    filename: 'NVIDIA RTX Spark The Local AI Superchip That Could Change Private Agents.webp',
    alt: 'NVIDIA RTX Spark local AI superchip concept for private agents and secure local compute',
  },
  {
    type: 'perspective',
    slug: 'fix-the-workflow-before-ai',
    filename: 'Fix the Workflow Before You Add AI.webp',
    alt: 'Workflow map showing operational fixes that should happen before adding AI automation',
  },
  {
    type: 'post',
    slug: 'why-companies-must-integrate-ai-agents-2025',
    filename: 'Why Every Company Must Start Integrating AI Agents Now.webp',
    alt: 'AI agents integrated into company operations through connected autonomous workflow nodes',
  },
  {
    type: 'post',
    slug: 'whatsapp-ai-chatbot-morocco-business-guide',
    filename: 'WhatsApp AI Chatbots for Moroccan Businesses The Complete Guide.webp',
    alt: 'WhatsApp AI chatbot guide for Moroccan businesses with customer messaging and automation flows',
  },
  {
    type: 'post',
    slug: 'agentic-ai-autonomous-revolution',
    filename: 'Agentic AI The Autonomous Revolution Reshaping Business.webp',
    alt: 'Agentic AI autonomous business operations network reshaping modern workflows',
  },
  {
    type: 'researchReport',
    slug: 'ai-operations-benchmark-response-conversion',
    filename: 'AI Operations Benchmark Service Response and Conversion.webp',
    alt: 'AI operations benchmark dashboard measuring service response and conversion performance',
  },
  {
    type: 'researchReport',
    slug: 'digital-transformation-execution-patterns-mid-market',
    filename: 'Digital Transformation Execution Patterns in Mid-Market Firms.webp',
    alt: 'Digital transformation execution patterns for mid-market firms shown as an operating roadmap',
  },
  {
    type: 'researchReport',
    slug: 'cloud-reliability-readiness-index-2026',
    filename: 'Cloud Reliability Readiness Index 2026.webp',
    alt: 'Cloud reliability readiness index for 2026 with infrastructure monitoring and resilience signals',
  },
]

function imageReference(asset) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function findDocument(cover) {
  const lookupSlugs = cover.lookupSlugs || [cover.slug]
  const document = await client.fetch(
    '*[_type == $type && slug.current in $slugs][0]{_id, title, "slug": slug.current}',
    {type: cover.type, slugs: lookupSlugs},
  )

  if (!document?._id) {
    throw new Error(`No ${cover.type} document found for slug(s): ${lookupSlugs.join(', ')}`)
  }

  return document
}

async function uploadAsset(cover, filePath) {
  const sourceId = `hva-supplied-insight-cover:${assetVersion}:${cover.slug}`
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id, url, originalFilename}',
    {sourceId},
  )

  if (existing?._id) return existing

  return client.assets.upload('image', fs.createReadStream(filePath), {
    filename: cover.filename,
    source: {
      id: sourceId,
      name: 'hva-supplied-insight-cover',
      url: `local-insight-cover://${encodeURIComponent(cover.filename)}`,
    },
  })
}

async function patchDocument(cover, document, asset) {
  const image = imageReference(asset)
  const fields =
    cover.type === 'caseStudy'
      ? {
          'assets.coverImage': image,
          'assets.coverAlt': cover.alt,
        }
      : {
          coverImage: image,
          coverAlt: cover.alt,
        }

  if (cover.title) {
    fields.title = cover.title
    fields.slug = {_type: 'slug', current: cover.slug}
    fields['seo.title'] = cover.title
  }

  await client.patch(document._id).set(fields).commit()
}

async function main() {
  if (!fs.existsSync(suppliedCoverDir)) {
    throw new Error(`Supplied cover folder not found: ${suppliedCoverDir}`)
  }

  console.log(`Uploading ${covers.length} supplied insight covers from ${suppliedCoverDir}`)

  for (const cover of covers) {
    const filePath = path.join(suppliedCoverDir, cover.filename)

    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing supplied cover file: ${filePath}`)
    }

    const document = await findDocument(cover)
    const asset = await uploadAsset(cover, filePath)
    await patchDocument(cover, document, asset)
    console.log(`updated ${cover.type}: ${document.slug} -> ${cover.slug} (${cover.filename})`)
  }

  console.log('Done. Updated only the 10 supplied cover files.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
