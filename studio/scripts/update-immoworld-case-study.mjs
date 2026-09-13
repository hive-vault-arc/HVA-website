import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-10'
const slug = 'top-tier-crm-transformation-program-real-estate-operations'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const frontendRoot = path.resolve(studioRoot, '..', 'Hva-website-front')
const logoPath = path.join(frontendRoot, 'public', 'Images', 'trustedby', 'logo.webp')
const client = getCliClient({apiVersion})

async function getClientLogo() {
  const sourceId = 'hva-static:/Images/trustedby/logo.webp'
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id}',
    {sourceId},
  )

  if (existing?._id) {
    return {_type: 'image', asset: {_type: 'reference', _ref: existing._id}}
  }

  if (!fs.existsSync(logoPath)) {
    throw new Error(`Client logo is missing: ${logoPath}`)
  }

  const asset = await client.assets.upload('image', fs.createReadStream(logoPath), {
    filename: 'immoworld-luxury-real-estate-logo.webp',
    contentType: 'image/webp',
    source: {
      id: sourceId,
      name: 'hva-static-import',
      url: '/Images/trustedby/logo.webp',
    },
  })

  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  const study = await client.fetch(
    '*[_type == "caseStudy" && slug.current == $slug][0]{_id,_rev}',
    {slug},
  )

  if (!study?._id || !study?._rev) {
    throw new Error(`Case study not found for slug: ${slug}`)
  }

  const clientLogo = await getClientLogo()
  await client
    .patch(study._id)
    .ifRevisionId(study._rev)
    .set({
      title: 'ImmoWorld CRM Operating System for Real Estate Operations',
      clientName: 'ImmoWorld',
      industry: 'Luxury Real Estate',
      summary:
        'A CRM operating system for ImmoWorld that centralizes lead intake, buyer-journey pipeline work, team workflows, and operational reporting.',
      problem:
        'Three disconnected tools created data duplication, missed follow-ups, and no reliable reporting layer for leadership decisions.',
      systemArchitecture:
        'A unified CRM operating system with role-based workflows, pipeline stages, follow-up automation, and a reporting layer for the sales and operations teams.',
      operationalModules: [
        'Lead Intake and Routing',
        'Buyer-Journey Pipeline',
        'Team Workflow Coordination',
        'Operational Reporting',
      ],
      integrations: ['Meta Lead Sync', 'DocuSign', 'Pipeline Automation', 'BI Reporting'],
      deploymentStatus: 'Live operational rollout since May 2025',
      lastUpdated: '2026-07-10',
      seo: {
        _type: 'seo',
        title: 'ImmoWorld CRM Operating System | Case Study',
        description:
          'How Hive Vault Arc supported ImmoWorld with a unified CRM operating system for lead intake, pipeline management, team workflows, and reporting.',
        keywords: ['ImmoWorld', 'real estate CRM', 'CRM operating system', 'case study'],
        noIndex: false,
      },
      'assets.coverAlt': 'ImmoWorld real estate CRM operating system engagement',
      'assets.logoLabel': 'ImmoWorld Luxury Real Estate',
      'assets.clientLogo': clientLogo,
      'assets.clientLogoAlt': 'ImmoWorld Luxury Real Estate logo',
      'assets.clientWebsite': 'https://immoworld.ma/',
    })
    .unset(['testimonial', 'deploymentScale', 'measuredOutcomes', 'reportingNote'])
    .commit()

  console.log(`Updated ImmoWorld case study: ${study._id}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
