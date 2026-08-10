import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-16'
const slug = 'premium-advice-training-keepzen-digital-academy'
const client = getCliClient({apiVersion})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const coverPath = path.join(
  studioRoot,
  'assets',
  'case-studies',
  'premiumadvice-keepzen-academy-home.webp',
)

const logoUrl =
  'https://premiumadvicetraining.com/wp-content/uploads/2025/06/cropped-premiumadvicetraining-main-logo.webp'

function imageReference(assetId) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

async function findImageBySourceId(sourceId) {
  return client.fetch('*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id}', {
    sourceId,
  })
}

async function getOrUploadLocalImage({sourceId, sourceName, sourceUrl, filePath, filename}) {
  const existing = await findImageBySourceId(sourceId)
  if (existing?._id) return imageReference(existing._id)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Required case-study image is missing: ${filePath}`)
  }

  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename,
    contentType: 'image/webp',
    source: {
      id: sourceId,
      name: sourceName,
      url: sourceUrl,
    },
  })

  return imageReference(asset._id)
}

async function getOrUploadRemoteImage({sourceId, sourceName, sourceUrl, filename}) {
  const existing = await findImageBySourceId(sourceId)
  if (existing?._id) return imageReference(existing._id)

  const response = await globalThis.fetch(sourceUrl)
  if (!response.ok) {
    throw new Error(`Unable to download ${sourceName}: ${response.status} ${response.statusText}`)
  }

  const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), {
    filename,
    source: {
      id: sourceId,
      name: sourceName,
      url: sourceUrl,
    },
  })

  return imageReference(asset._id)
}

async function main() {
  const [coverImage, clientLogo] = await Promise.all([
    getOrUploadLocalImage({
      sourceId: 'hva-case-study:premiumadvice-keepzen:academy-home:v1',
      sourceName: 'Premium Advice Training Academy live platform capture',
      sourceUrl: 'https://www.premiumadvicetrainingacademy.com/home',
      filePath: coverPath,
      filename: 'premiumadvice-keepzen-digital-academy-home.webp',
    }),
    getOrUploadRemoteImage({
      sourceId: 'hva-client-logo:premiumadvice-training:main:v1',
      sourceName: 'Premium Advice & Training official logo',
      sourceUrl: logoUrl,
      filename: 'premium-advice-training-logo.webp',
    }),
  ])

  const content = {
    title: 'Premium Advice & Training x KeepZen Digital Academy',
    slug: {
      _type: 'slug',
      current: slug,
    },
    clientName: 'Premium Advice & Training & KeepZen International',
    industry: 'Education & Professional Training',
    summary:
      'An end-to-end digital academy uniting two education brands across program discovery, controlled learner onboarding, multimedia course delivery, assessments, document review, progress tracking, and administration.',
    problem:
      'Premium Advice & Training and KeepZen International needed one digital environment capable of serving two distinct education brands without fragmenting the learner journey. The platform had to support public program discovery, registration and approval, assigned learning paths, varied assessment formats, document-based review, progress visibility, and day-to-day administration for students, trainers, and academy operators.',
    systemArchitecture:
      'A role-based digital academy connects the public website to secure learner and administration spaces. Visitors choose an academy and explore its programs; registered accounts remain gated until approved and assigned to a formation. Approved learners access PDF and video lessons, evaluations, scheduled exams, submissions, and progress indicators. A central administration layer manages students, formations, content, availability rules, assessment results, and document-validation workflows.',
    operationalModules: [
      'Dual-Brand Program Discovery',
      'Registration, Approval, and Formation Assignment',
      'Learner Dashboard and Progress Tracking',
      'PDF and Video Course Delivery',
      'QCM and Timed Evaluations',
      'Scheduled and Document-Based Exams',
      'Submission Review and Resubmission',
      'Academy Administration and Reporting',
    ],
    integrations: [
      'Secure Account Approval',
      'PDF and Video Learning Content',
      'QCM and Timed Quiz Engine',
      'Document Upload and Validation',
      'Scheduled Exam Access',
      'Progress and Results Reporting',
    ],
    deploymentStatus: 'Delivered digital academy; operational metrics pending client confirmation',
    assets: {
      coverImage,
      coverAlt: 'Premium Advice & Training and KeepZen digital academy homepage',
      logoLabel: 'Premium Advice & Training and KeepZen International',
      clientLogo,
      clientLogoAlt: 'Premium Advice & Training logo',
      clientWebsite: 'https://www.premiumadvicetrainingacademy.com/',
    },
    lastUpdated: '2026-07-16',
    seo: {
      _type: 'seo',
      title: 'Premium Advice Digital Academy | HVA Case Study',
      description:
        'How Hive Vault Arc delivered a digital academy for Premium Advice & Training and KeepZen, connecting onboarding, courses, exams, progress, and administration.',
      keywords: [
        'Premium Advice & Training',
        'KeepZen International',
        'digital academy',
        'learning management platform',
        'education technology',
        'case study',
      ],
      noIndex: false,
    },
  }

  const existing = await client.fetch(
    '*[_type == "caseStudy" && slug.current == $slug][0]{_id,_rev}',
    {slug},
  )

  if (existing?._id && existing?._rev) {
    const updated = await client
      .patch(existing._id)
      .ifRevisionId(existing._rev)
      .set(content)
      .unset(['testimonial', 'deploymentScale', 'measuredOutcomes', 'reportingNote'])
      .commit()

    console.log(`Updated Premium Advice & KeepZen case study: ${updated._id}`)
    return
  }

  const created = await client.create({
    _type: 'caseStudy',
    ...content,
    clientEvidence: {
      _type: 'clientEvidence',
      publicationStatus: 'notCleared',
    },
  })

  console.log(`Created Premium Advice & KeepZen case study: ${created._id}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
