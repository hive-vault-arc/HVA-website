import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-01'
const assetVersion = '2026-07-09-v1'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const frontendRoot = path.resolve(studioRoot, '..', 'Hva-website-front')
const frontendPublicRoot = path.join(frontendRoot, 'public')
const client = getCliClient({apiVersion})

const capabilities = [
  {
    title: 'Strategy & Business Consulting',
    slug: 'strategy-business',
    shortTitle: 'Strategy & Business',
    kicker: 'The thinking layer',
    briefLine:
      'The thinking layer - diagnosing, defining, and designing transformation before a line of code is written.',
    briefBullets: ['Business transformation', 'Digital transformation', 'Operational excellence'],
    strategicContext:
      'Transformation succeeds when the business model, operating model, and technology architecture move together from the first decision.',
    executionContext:
      'We run diagnostics, design target operating models, build technology roadmaps, and sequence transformation programs that leadership and operators can execute.',
    subCapabilities: [
      'Business and digital transformation strategy',
      'Operational diagnostics and process redesign',
      'Innovation strategy and market expansion via technology',
      'Organizational redesign and change management',
      'Cost optimization and operational excellence',
    ],
    relatedOutcomes: [
      'Sharper prioritization',
      'Reduced delivery risk',
      'Clearer transformation sequencing',
    ],
    landingLinks: [],
    heroImage: '/Images/capabilities/hva-strategy-business-capability.webp',
    heroImageAlt: 'Strategy and business consulting operating model design',
    displayOrder: 10,
  },
  {
    title: 'Technology Consulting',
    slug: 'technology-consulting',
    shortTitle: 'Technology Consulting',
    kicker: 'The architecture layer',
    briefLine: 'The architecture layer - designing systems that last before building them.',
    briefBullets: ['Enterprise architecture', 'Technology roadmaps', 'Systems integration'],
    strategicContext:
      'Architecture decisions made early compound positively. Architecture decisions deferred compound into technical debt.',
    executionContext:
      'We design the technology blueprint, sequence the roadmap, select platforms, and connect fragmented tools so data and workflows move without friction.',
    subCapabilities: [
      'Enterprise architecture and technology roadmaps',
      'Platform strategy - build vs. buy vs. agent',
      'IT modernization and legacy system replacement',
      'Systems integration and digital workplace design',
      'Infrastructure modernization for cloud, AI, and scale',
    ],
    relatedOutcomes: [
      'Systems built to last',
      'Reduced integration debt',
      'Technology that serves the business 3-5 years out',
    ],
    landingLinks: [{label: 'IT Consulting Tangier', href: '/it-consulting-tangier'}],
    heroImage: '/Images/capabilities/hva-technology-consulting-capability.webp',
    heroImageAlt: 'Technology consulting architecture and systems planning',
    displayOrder: 20,
  },
  {
    title: 'AI, Data & Analytics',
    slug: 'ai-data-analytics',
    shortTitle: 'AI & Data',
    kicker: 'The intelligence layer',
    briefLine:
      'The intelligence layer - where Hive Vault Arc is deepest: AI engineering, not just AI consulting.',
    briefBullets: ['AI agents', 'Generative AI engineering', 'Predictive analytics'],
    strategicContext:
      'AI becomes competitive advantage only when integrated into day-to-day operations at the channel clients already live in, not isolated in a pilot dashboard.',
    executionContext:
      "We scope operational goals, deploy production AI agents, build data infrastructure, and connect every workflow to measurable outcomes, including WhatsApp, Morocco's primary B2B channel.",
    subCapabilities: [
      'AI agent design and deployment',
      'Generative AI strategy and engineering',
      'Machine learning and predictive analytics',
      'Data engineering, warehouses, and pipelines',
      'Business intelligence and executive dashboards',
      'Conversational AI and WhatsApp agent systems',
      'MLOps and AI production operations',
    ],
    relatedOutcomes: ['Faster decisions', 'Lower manual load', '24/7 operational continuity'],
    landingLinks: [
      {label: 'AI Agents Tangier', href: '/ai-agents-tangier'},
      {label: 'AI Agents Morocco', href: '/ai-agents-morocco'},
    ],
    heroImage: '/Images/capabilities/hva-ai-data-capability.webp',
    heroImageAlt: 'AI and data analytics production intelligence systems',
    displayOrder: 30,
  },
  {
    title: 'Software Engineering & Product Development',
    slug: 'software-engineering',
    shortTitle: 'Software Engineering',
    kicker: 'The build layer',
    briefLine: 'The build layer - production-grade systems, not prototypes.',
    briefBullets: ['Custom software', 'SaaS platforms', 'Web and mobile applications'],
    strategicContext:
      'Growth requires systems built for operational fit, not generic tooling that creates workflow friction and scales the wrong behaviors.',
    executionContext:
      'We engineer custom applications, SaaS platforms, APIs, and mobile apps with reliability, security, and maintainability built in, sprint-based, with CI/CD from day one.',
    subCapabilities: [
      'Custom software development - bespoke systems for the exact problem',
      'SaaS platform development - multi-tenant, subscription-based',
      'Web application engineering (Next.js, React)',
      'Mobile application development (React Native, Expo)',
      'API development and deep integration engineering',
      'UX/UI engineering - design wired to the actual frontend',
      'DevOps, CI/CD, and platform engineering',
    ],
    relatedOutcomes: [
      'Faster product delivery',
      'Better system fit',
      'Sustainable maintainability',
    ],
    landingLinks: [{label: 'Custom Software Morocco', href: '/custom-software-morocco'}],
    heroImage: '/Images/capabilities/hva-software-engineering-capability.webp',
    heroImageAlt: 'Software engineering production-grade systems workspace',
    displayOrder: 40,
  },
  {
    title: 'Cloud & Infrastructure',
    slug: 'cloud-infrastructure',
    shortTitle: 'Cloud & Infrastructure',
    kicker: 'The foundation layer',
    briefLine: 'The foundation layer - built for scale, security, and resilience.',
    briefBullets: ['Cloud migration', 'Security architecture', 'Infrastructure automation'],
    strategicContext:
      'Security and infrastructure cannot be retrofitted after launch. Risk controls, zero-trust design, and observability must be designed in from the start.',
    executionContext:
      'We migrate, design cloud-native systems, automate infrastructure, implement zero-trust security, and deliver observability from day one - no manual infrastructure.',
    subCapabilities: [
      'AWS, Azure, and GCP cloud migration and native development',
      'Infrastructure automation with Terraform and IaC',
      'Security architecture, zero-trust design, and secrets management',
      'Disaster recovery - RTO/RPO planning and multi-region failover',
      'Observability, logging, tracing, and alerting',
      'Managed cloud services and cost optimization',
      'Cybersecurity posture and digital risk assessment',
    ],
    relatedOutcomes: [
      'Lower operational risk',
      'Stronger compliance posture',
      'Resilient production systems',
    ],
    landingLinks: [],
    heroImage: '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
    heroImageAlt: 'Cloud infrastructure secure systems and observability',
    displayOrder: 50,
  },
  {
    title: 'Operations & Managed Services',
    slug: 'operations-managed',
    shortTitle: 'Operations & Managed',
    kicker: 'The evolution layer',
    briefLine:
      "The evolution layer - we stay after go-live, because that's where transformation actually happens.",
    briefBullets: ['Managed operations', 'Application maintenance', 'AI system management'],
    strategicContext:
      'Most transformation programs fail at the handoff. Advisory firms advise, then leave after the deck. Agencies ship and disappear. Hive Vault Arc eliminates the handoff - same team, strategy through production.',
    executionContext:
      'We provide ongoing ownership of the systems we build - monitoring, evolving, and operating them as a long-term partner, not a vendor.',
    subCapabilities: [
      'Managed operations - ongoing ownership post-launch',
      'Application maintenance, performance tuning, and feature expansion',
      'Automation and AI system management and evolution',
      'IT support and helpdesk (L1/L2) for internal digital systems',
      'Business process outsourcing and shared services',
    ],
    relatedOutcomes: [
      'Stable production operations',
      'Continuous improvement post-launch',
      'Long-term partnership accountability',
    ],
    landingLinks: [],
    heroImage: '/Images/capabilities/hva-operations-managed-capability.webp',
    heroImageAlt: 'Operations and managed services monitoring workspace',
    displayOrder: 60,
  },
]

function slugRef(slug) {
  return {_type: 'slug', current: slug}
}

function arrayKey(prefix, index) {
  return `${prefix}_${String(index).padStart(3, '0')}`
}

function withObjectKeys(items, prefix) {
  return (items || []).map((item, index) => ({
    _key: arrayKey(prefix, index),
    ...item,
  }))
}

function staticImagePathToFilePath(staticPath) {
  if (!staticPath || !staticPath.startsWith('/')) {
    throw new Error(`Expected a local public image path, received: ${staticPath}`)
  }

  return path.join(frontendPublicRoot, staticPath.slice(1))
}

async function sanityImageFromStaticPath(staticPath) {
  const filePath = staticImagePathToFilePath(staticPath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing local image file for ${staticPath}: ${filePath}`)
  }

  const sourceId = `hva-capability:${assetVersion}:${staticPath}`
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id}',
    {sourceId},
  )

  const asset =
    existing ||
    (await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      source: {
        id: sourceId,
        name: 'hva-capability',
        url: staticPath,
      },
    }))

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

function toSeo(capability) {
  return {
    _type: 'seo',
    title: capability.title,
    description: capability.briefLine,
    keywords: [
      capability.title,
      `${capability.title} Morocco`,
      'Hive Vault Arc capabilities',
      ...capability.briefBullets,
      ...capability.relatedOutcomes,
    ],
    noIndex: false,
  }
}

async function upsertBySlug(doc) {
  const existing = await client.fetch('*[_type == $type && slug.current == $slug][0]{_id}', {
    type: doc._type,
    slug: doc.slug.current,
  })

  if (existing?._id) {
    const {_type, ...fields} = doc
    await client.patch(existing._id).set(fields).commit()
    return {action: 'updated', id: existing._id}
  }

  const created = await client.create(doc)
  return {action: 'created', id: created._id}
}

async function toCapabilityDocument(capability) {
  return {
    _type: 'capability',
    title: capability.title,
    slug: slugRef(capability.slug),
    shortTitle: capability.shortTitle,
    kicker: capability.kicker,
    briefLine: capability.briefLine,
    briefBullets: capability.briefBullets,
    strategicContext: capability.strategicContext,
    executionContext: capability.executionContext,
    subCapabilities: capability.subCapabilities,
    relatedOutcomes: capability.relatedOutcomes,
    landingLinks: withObjectKeys(capability.landingLinks, 'landingLink'),
    heroImage: await sanityImageFromStaticPath(capability.heroImage),
    heroImageAlt: capability.heroImageAlt,
    displayOrder: capability.displayOrder,
    featuredOnCapabilities: true,
    visibility: 'published',
    seo: toSeo(capability),
  }
}

async function main() {
  console.log(`Importing ${capabilities.length} capabilities...`)

  for (const capability of capabilities) {
    const doc = await toCapabilityDocument(capability)
    const result = await upsertBySlug(doc)
    console.log(`${result.action} capability: ${capability.slug}`)
  }

  console.log('Done. Capabilities are ready for the Capabilities section.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
