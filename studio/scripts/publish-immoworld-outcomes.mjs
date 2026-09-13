import {getCliClient} from 'sanity/cli'

const APPLY = process.argv.includes('--apply')
const API_VERSION = '2026-07-27'
const IMMOWORLD_SLUG = 'top-tier-crm-transformation-program-real-estate-operations'
const APPROVAL_DATE = '2026-07-27'
const PERMISSION_REFERENCE =
  'Direct project-owner instruction in the Codex task on 2026-07-27 to publish these ImmoWorld outcome figures on the ARC page and manage them in Sanity.'

const outcomesByLanguage = {
  en: [
    {
      _key: 'throughput-lift',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'throughput',
      value: '3–6x',
      label: 'Throughput lift',
      context: 'Sustained throughput improvement within the first 90 days.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'cycle-time-reduction',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'cycleTime',
      value: '30–60%',
      label: 'Cycle time reduction',
      context: 'Faster cycles by removing hidden handoffs and rework.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'operating-margin-lift',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'operatingMargin',
      value: '15–25%',
      label: 'Operating margin lift',
      context: 'Margin expansion through constraint removal and better flow.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'lead-response',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'responseTime',
      value: '40%',
      label: 'Faster lead response',
      context: 'Lead response time improved after centralizing intake and follow-up workflows.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'tour-to-lease',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'conversion',
      value: '25%',
      label: 'Lift in tour-to-lease conversion',
      context:
        'Tour-to-lease conversion improved after standardizing the pipeline and follow-up process.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'team-visibility',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'visibility',
      value: '100%',
      label: 'Real-time visibility across teams',
      context:
        'Sales and operations teams share one live view of leads, properties, and follow-up work.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
  ],
  fr: [
    {
      _key: 'throughput-lift',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'throughput',
      value: '3–6x',
      label: 'Hausse du débit opérationnel',
      context: 'Amélioration durable du débit au cours des 90 premiers jours.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'cycle-time-reduction',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'cycleTime',
      value: '30–60 %',
      label: 'Réduction du temps de cycle',
      context: 'Des cycles plus rapides grâce à la suppression des relais cachés et des reprises.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'operating-margin-lift',
      _type: 'publishedCaseStudyOutcome',
      scope: 'benchmark',
      category: 'operatingMargin',
      value: '15–25 %',
      label: 'Hausse de la marge opérationnelle',
      context: 'Une marge renforcée par la suppression des contraintes et une meilleure fluidité.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'lead-response',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'responseTime',
      value: '40 %',
      label: 'Réponse aux leads plus rapide',
      context:
        'Le délai de réponse s’est amélioré après la centralisation de la réception et du suivi des leads.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'tour-to-lease',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'conversion',
      value: '25 %',
      label: 'Hausse de la conversion visite-location',
      context:
        'La conversion de la visite à la location s’est améliorée après la standardisation du pipeline et du suivi.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
    {
      _key: 'team-visibility',
      _type: 'publishedCaseStudyOutcome',
      scope: 'caseStudy',
      category: 'visibility',
      value: '100 %',
      label: 'Visibilité en temps réel entre les équipes',
      context:
        'Les équipes commerciales et opérationnelles partagent une vue active des leads, des biens et des suivis.',
      publicationStatus: 'approved',
      permissionConfirmedOn: APPROVAL_DATE,
      permissionReference: PERMISSION_REFERENCE,
    },
  ],
}

const client = getCliClient({apiVersion: API_VERSION})
const documents = await client.fetch(
  `*[
    _type == "caseStudy" &&
    slug.current == $slug
  ]{
    _id,
    _rev,
    language,
    translationStatus,
    title
  } | order(language asc)`,
  {slug: IMMOWORLD_SLUG},
)

if (documents.length === 0) {
  throw new Error(`No ImmoWorld case study found for slug: ${IMMOWORLD_SLUG}`)
}

const updates = documents.map((document) => {
  const language = document.language === 'fr' ? 'fr' : 'en'
  return {
    document,
    outcomes: outcomesByLanguage[language],
  }
})

console.log(
  JSON.stringify(
    {
      mode: APPLY ? 'apply' : 'dry-run',
      slug: IMMOWORLD_SLUG,
      updates: updates.map(({document, outcomes}) => ({
        _id: document._id,
        language: document.language,
        title: document.title,
        outcomeCount: outcomes.length,
      })),
    },
    null,
    2,
  ),
)

if (!APPLY) {
  console.log('Dry run only. Re-run with --apply to publish the approved outcomes.')
  process.exit(0)
}

let transaction = client.transaction()

for (const {document, outcomes} of updates) {
  transaction = transaction.patch(document._id, (patch) =>
    patch.ifRevisionId(document._rev).set({
      publishedOutcomes: outcomes,
      lastUpdated: APPROVAL_DATE,
    }),
  )
}

const result = await transaction.commit({returnDocuments: false})
console.log(`Published ImmoWorld outcomes in ${updates.length} case-study document(s).`)
console.log(`Transaction ID: ${result.transactionId}`)
