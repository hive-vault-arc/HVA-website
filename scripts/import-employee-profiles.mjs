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

const profiles = [
  {
    name: 'Khalid Chalhi',
    slug: 'khalid-chalhi',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Strategy · AI · Software Engineering',
    profileType: 'coFounder',
    summary:
      'Khalid Chalhi leads Hive Vault Arc across strategy, AI engineering, and software execution, connecting business direction with production-grade systems.',
    story:
      'Khalid works at the intersection of strategy, AI, and software engineering. His role at Hive Vault Arc is to turn transformation ambition into a practical operating path: define the business problem, shape the architecture, and keep delivery tied to measurable outcomes. Public LinkedIn information positions him as Co-Founder & CEO of Hive Vault Arc and an AI and software engineer based in Tangier, Morocco.',
    profileImage: '/Images/team/khalid-chalhi-hva-co-founder.webp',
    profileImageAlt: 'Khalid Chalhi, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads company direction across strategy, AI engineering, software execution, and transformation programs.',
        highlights: [
          'Shapes the ARC delivery model from strategy to production',
          'Guides AI agent, custom software, and operating-system engagements',
          'Connects leadership goals with engineering decisions',
        ],
      },
      {
        role: 'AI & Software Engineer',
        organization: 'Technology and software engineering practice',
        location: 'Morocco',
        summary:
          'Builds around AI-enabled workflows, production software systems, and business process transformation.',
      },
    ],
    education: [
      {
        institution: "Ecole Marocaine des Sciences de l'Ingenieur",
        credential: 'Computer engineering and networks background',
      },
    ],
    expertise: [
      'Strategy Consulting',
      'AI Engineering',
      'Software Engineering',
      'Technology Transformation',
      'AI Agents',
      'Custom Software',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/khalid-chalhi/',
    displayOrder: 10,
  },
  {
    name: 'Ali Amrani',
    slug: 'ali-amrani',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Product · Systems · Full-Stack',
    profileType: 'coFounder',
    summary:
      'Ali Amrani owns product systems, full-stack engineering, and delivery architecture for Hive Vault Arc programs.',
    story:
      'Ali brings a software engineering background into the operating layer of Hive Vault Arc. His work focuses on turning strategy and AI ambition into product systems that teams can actually use: interfaces, workflows, integrations, and reliable delivery architecture. Public LinkedIn information describes him as CEO & Co-Founder of Hive Vault Arc, working across AI transformation, software engineering, and managed operations.',
    profileImage: '/Images/team/ali-amrani-hva-co-founder-portrait.jpeg',
    profileImageAlt: 'Ali Amrani, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads product systems, full-stack delivery, software architecture, and operational product execution.',
        highlights: [
          'Designs delivery architecture for client-facing and internal systems',
          'Connects AI transformation work to usable software products',
          'Supports managed operations through maintainable product engineering',
        ],
      },
      {
        role: 'Software Engineering Background',
        organization: 'EMSI',
        location: 'Tangier, Morocco',
        summary:
          'Public LinkedIn information references a software engineering background from EMSI and work at the intersection of technology, business, and AI.',
      },
    ],
    education: [
      {
        institution: 'EMSI Tanger',
        credential: 'Software engineering background',
      },
    ],
    expertise: [
      'Full-Stack Engineering',
      'Product Systems',
      'Software Architecture',
      'Technology Delivery',
      'AI Transformation',
      'Managed Operations',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/ali-amrani-566361349/',
    displayOrder: 20,
  },
  {
    name: 'Oubay Ghamat',
    slug: 'oubay-ghamat',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Cloud · Infrastructure · Operations',
    profileType: 'coFounder',
    summary:
      'Oubay Ghamat leads cloud infrastructure, operations, and production reliability for Hive Vault Arc systems.',
    story:
      'Oubay focuses on the systems that keep transformation work stable after launch: cloud infrastructure, operational readiness, frontend delivery, and production reliability. Public LinkedIn information lists him as CEO & Co-Founder of Hive Vault Arc, Junior React Developer at Coffee IT, and a BSc Hons Computer Science graduate from Lancaster University.',
    profileImage: '/Images/team/oubay-ghamat-hva-co-founder.webp',
    profileImageAlt: 'Oubay Ghamat, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads cloud infrastructure, managed operations, production reliability, and delivery support for deployed systems.',
        highlights: [
          'Keeps infrastructure and operations close to the delivery loop',
          'Supports production readiness for AI, software, and cloud systems',
          'Aligns reliability decisions with long-term client operations',
        ],
      },
      {
        role: 'Junior React Developer',
        organization: 'Coffee IT',
        summary:
          'Public LinkedIn information references frontend development work as a Junior React Developer.',
      },
    ],
    education: [
      {
        institution: 'Lancaster University',
        credential: 'BSc Hons Computer Science',
      },
    ],
    expertise: [
      'Cloud Infrastructure',
      'Managed Operations',
      'Production Reliability',
      'DevOps',
      'React Development',
      'Computer Science',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/oubaye-el-ghammat-ghori-68a50a213/',
    displayOrder: 30,
  },
]

function slugRef(slug) {
  return {_type: 'slug', current: slug}
}

function arrayKey(prefix, index) {
  return `${prefix}_${String(index).padStart(3, '0')}`
}

function withKeys(items, prefix) {
  return (items || []).map((item, index) => ({
    _key: arrayKey(prefix, index),
    ...item,
    ...(item.highlights ? {highlights: item.highlights} : {}),
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

  const sourceId = `hva-employee-profile:${assetVersion}:${staticPath}`
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
        name: 'hva-employee-profile',
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

function toSeo(profile) {
  return {
    _type: 'seo',
    title: `${profile.name} | ${profile.position}`,
    description: profile.summary,
    keywords: [
      profile.name,
      `${profile.name} Hive Vault Arc`,
      profile.position,
      ...profile.expertise,
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

async function toEmployeeProfileDocument(profile) {
  return {
    _type: 'employeeProfile',
    name: profile.name,
    slug: slugRef(profile.slug),
    position: profile.position,
    responsibilityTag: profile.responsibilityTag,
    profileType: profile.profileType,
    summary: profile.summary,
    story: profile.story,
    profileImage: await sanityImageFromStaticPath(profile.profileImage),
    profileImageAlt: profile.profileImageAlt,
    experience: withKeys(profile.experience, 'experience'),
    education: withKeys(profile.education, 'education'),
    expertise: profile.expertise,
    linkedinUrl: profile.linkedinUrl,
    displayOrder: profile.displayOrder,
    featuredOnAbout: true,
    visibility: 'published',
    seo: toSeo(profile),
  }
}

async function main() {
  console.log(`Importing ${profiles.length} employee profiles...`)

  for (const profile of profiles) {
    const doc = await toEmployeeProfileDocument(profile)
    const result = await upsertBySlug(doc)
    console.log(`${result.action} employeeProfile: ${profile.slug}`)
  }

  console.log('Done. Employee profiles are ready for the People section.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
