import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const APPLY = process.argv.includes('--apply')
const API_VERSION = '2026-08-10'
const APPROVAL_DATE = '2026-07-27'
const IMMOWORLD_SLUG = 'top-tier-crm-transformation-program-real-estate-operations'
const IMMOWORLD_PERMISSION_REFERENCE =
  'Direct project-owner instruction in the Codex task on 2026-07-27 to publish these ImmoWorld outcome figures on the ARC page and manage them in Sanity.'
const USER_REQUEST_REFERENCE =
  'Direct project-owner instruction in the Codex task on 2026-08-10 to publish dynamic case-study headline numbers.'

function approvedMetric(metric) {
  return {
    _type: 'caseStudyHeadlineMetric',
    publicationStatus: 'approved',
    ...metric,
  }
}

const immoworldMetrics = {
  en: [
    approvedMetric({
      _key: 'throughput-lift',
      valueType: 'multiplierRange',
      minimum: 3,
      maximum: 6,
      label: 'Throughput lift',
      context: 'Sustained throughput improvement within the first 90 days.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'cycle-time-reduction',
      valueType: 'percentageRange',
      minimum: 30,
      maximum: 60,
      label: 'Cycle time reduction',
      context: 'Faster cycles by removing hidden handoffs and rework.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'operating-margin-lift',
      valueType: 'percentageRange',
      minimum: 15,
      maximum: 25,
      label: 'Operating margin lift',
      context: 'Margin expansion through constraint removal and better flow.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'lead-response',
      valueType: 'percentage',
      value: 40,
      label: 'Faster lead response',
      context: 'Lead response time improved after centralizing intake and follow-up workflows.',
      basis: 'verifiedResult',
    }),
    approvedMetric({
      _key: 'tour-to-lease',
      valueType: 'percentage',
      value: 25,
      label: 'Lift in tour-to-lease conversion',
      context: 'Conversion improved after standardizing the pipeline and follow-up process.',
      basis: 'verifiedResult',
    }),
    approvedMetric({
      _key: 'team-visibility',
      valueType: 'percentage',
      value: 100,
      label: 'Real-time visibility across teams',
      context: 'Sales and operations share one live view of leads, properties, and follow-up work.',
      basis: 'verifiedResult',
    }),
  ],
  fr: [
    approvedMetric({
      _key: 'throughput-lift',
      valueType: 'multiplierRange',
      minimum: 3,
      maximum: 6,
      label: 'Hausse du débit opérationnel',
      context: 'Amélioration durable du débit au cours des 90 premiers jours.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'cycle-time-reduction',
      valueType: 'percentageRange',
      minimum: 30,
      maximum: 60,
      label: 'Réduction du temps de cycle',
      context: 'Des cycles accélérés par la suppression des relais cachés et des reprises.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'operating-margin-lift',
      valueType: 'percentageRange',
      minimum: 15,
      maximum: 25,
      label: 'Hausse de la marge opérationnelle',
      context: 'Une marge renforcée par la suppression des contraintes et une meilleure fluidité.',
      basis: 'benchmark',
    }),
    approvedMetric({
      _key: 'lead-response',
      valueType: 'percentage',
      value: 40,
      label: 'Réponse aux leads plus rapide',
      context:
        'Le délai de réponse s’est amélioré après la centralisation de la réception et du suivi.',
      basis: 'verifiedResult',
    }),
    approvedMetric({
      _key: 'tour-to-lease',
      valueType: 'percentage',
      value: 25,
      label: 'Hausse de la conversion visite-location',
      context: 'La conversion a progressé après la standardisation du pipeline et du suivi.',
      basis: 'verifiedResult',
    }),
    approvedMetric({
      _key: 'team-visibility',
      valueType: 'percentage',
      value: 100,
      label: 'Visibilité en temps réel entre les équipes',
      context: 'Les équipes partagent une vue active des leads, des biens et des suivis.',
      basis: 'verifiedResult',
    }),
  ],
}

function withPerformanceApproval(metrics) {
  return metrics.map((metric) => ({
    ...metric,
    sourceReference: 'Approved ImmoWorld publishedOutcomes record in Sanity.',
    permissionConfirmedOn: APPROVAL_DATE,
    permissionReference: IMMOWORLD_PERMISSION_REFERENCE,
  }))
}

function scopeMetric(metric, sourceField) {
  return approvedMetric({
    ...metric,
    basis: 'systemScope',
    sourceReference: `${sourceField}. ${USER_REQUEST_REFERENCE}`,
  })
}

function scopeMetricsFor(document) {
  const language = document.language === 'fr' ? 'fr' : 'en'
  const modules = document.operationalModules?.length ?? 0
  const integrations = document.integrations?.length ?? 0

  if (document.slug === 'multilingual-whatsapp-ai-agent') {
    return language === 'fr'
      ? [
          scopeMetric(
            {
              _key: 'agent-runtime',
              valueType: 'number',
              value: 1,
              unit: 'agent',
              label: 'Point d’entrée multilingue',
              context: 'Un agent gouverné prend en charge la réception, le triage et l’escalade.',
            },
            'Approved case-study architecture and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Modules opérationnels',
              context: 'Périmètre fonctionnel déclaré dans le dossier approuvé.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'connected-systems',
              valueType: 'number',
              value: integrations,
              unit: 'systèmes',
              label: 'Systèmes connectés',
              context: 'Connexions techniques listées dans le périmètre de livraison.',
            },
            'integrations.length',
          ),
        ]
      : [
          scopeMetric(
            {
              _key: 'agent-runtime',
              valueType: 'number',
              value: 1,
              unit: 'agent',
              label: 'Multilingual entry point',
              context: 'One governed agent handles reception, triage, and escalation.',
            },
            'Approved case-study architecture and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Operational modules',
              context: 'Functional scope recorded in the approved case-study document.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'connected-systems',
              valueType: 'number',
              value: integrations,
              unit: 'systems',
              label: 'Connected systems',
              context: 'Technical connections listed in the delivery scope.',
            },
            'integrations.length',
          ),
        ]
  }

  if (document.slug === 'premium-advice-training-keepzen-digital-academy') {
    return language === 'fr'
      ? [
          scopeMetric(
            {
              _key: 'academy-brands',
              valueType: 'number',
              value: 2,
              unit: 'marques',
              label: 'Marques réunies',
              context:
                'Premium Advice & Training et KeepZen partagent une même académie numérique.',
            },
            'Approved case-study summary and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Modules de l’académie',
              context: 'Parcours fonctionnel déclaré dans le dossier approuvé.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'delivery-components',
              valueType: 'number',
              value: integrations,
              unit: 'composants',
              label: 'Composants de livraison',
              context: 'Services et moteurs techniques intégrés à la plateforme.',
            },
            'integrations.length',
          ),
        ]
      : [
          scopeMetric(
            {
              _key: 'academy-brands',
              valueType: 'number',
              value: 2,
              unit: 'brands',
              label: 'Brands brought together',
              context: 'Premium Advice & Training and KeepZen share one digital academy.',
            },
            'Approved case-study summary and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Academy modules',
              context: 'Functional journey recorded in the approved case-study document.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'delivery-components',
              valueType: 'number',
              value: integrations,
              unit: 'components',
              label: 'Delivery components',
              context: 'Technical services and engines integrated into the platform.',
            },
            'integrations.length',
          ),
        ]
  }

  if (document.slug === 'tarik-rami-immobilier') {
    return language === 'fr'
      ? [
          scopeMetric(
            {
              _key: 'shared-platform',
              valueType: 'number',
              value: 1,
              unit: 'plateforme',
              label: 'Espace de travail partagé',
              context:
                'Les projets, clients, prospects et visites sont réunis dans un même système.',
            },
            'Approved case-study architecture and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Modules opérationnels',
              context: 'Fonctions métier déclarées dans le dossier approuvé.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'platform-capabilities',
              valueType: 'number',
              value: integrations,
              unit: 'capacités',
              label: 'Capacités de plateforme',
              context: 'Services techniques composant le socle livré.',
            },
            'integrations.length',
          ),
        ]
      : [
          scopeMetric(
            {
              _key: 'shared-platform',
              valueType: 'number',
              value: 1,
              unit: 'platform',
              label: 'Shared operating workspace',
              context: 'Projects, clients, prospects, and visits are held in one system.',
            },
            'Approved case-study architecture and title',
          ),
          scopeMetric(
            {
              _key: 'operational-modules',
              valueType: 'number',
              value: modules,
              unit: 'modules',
              label: 'Operational modules',
              context: 'Business functions recorded in the approved case-study document.',
            },
            'operationalModules.length',
          ),
          scopeMetric(
            {
              _key: 'platform-capabilities',
              valueType: 'number',
              value: integrations,
              unit: 'capabilities',
              label: 'Platform capabilities',
              context: 'Technical services composing the delivered foundation.',
            },
            'integrations.length',
          ),
        ]
  }

  return []
}

const client = getCliClient({apiVersion: API_VERSION})
const documents = await client.fetch(`
  *[
    _type == "caseStudy" &&
    !(_id in path("drafts.**")) &&
    translationStatus == "approved"
  ]{
    _id,
    _rev,
    language,
    title,
    "slug": slug.current,
    operationalModules,
    integrations,
    headlineMetrics
  } | order(slug asc, language asc)
`)

const updates = documents.flatMap((document) => {
  const language = document.language === 'fr' ? 'fr' : 'en'
  const metrics =
    document.slug === IMMOWORLD_SLUG
      ? withPerformanceApproval(immoworldMetrics[language])
      : scopeMetricsFor(document)

  return metrics.length > 0 ? [{document, metrics}] : []
})

if (updates.length !== documents.length) {
  const skipped = documents
    .filter((document) => !updates.some((update) => update.document._id === document._id))
    .map((document) => `${document.language}:${document.slug}`)
  throw new Error(`No safe metric mapping for: ${skipped.join(', ')}`)
}

console.log(
  JSON.stringify(
    {
      mode: APPLY ? 'apply' : 'dry-run',
      documents: updates.map(({document, metrics}) => ({
        _id: document._id,
        language: document.language,
        slug: document.slug,
        metricCount: metrics.length,
        metrics: metrics.map(({_key, valueType, value, minimum, maximum, unit, label, basis}) => ({
          _key,
          valueType,
          value,
          minimum,
          maximum,
          unit,
          label,
          basis,
        })),
      })),
    },
    null,
    2,
  ),
)

if (!APPLY) {
  console.log('Dry run only. Re-run with --apply after reviewing the metric basis and values.')
  process.exit(0)
}

const backupDirectory = path.resolve(process.cwd(), '..', '.codex', 'backups')
const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
const backupPath = path.join(backupDirectory, `case-study-headline-metrics-${timestamp}.json`)
await mkdir(backupDirectory, {recursive: true})
await writeFile(
  backupPath,
  JSON.stringify(
    updates.map(({document}) => ({
      _id: document._id,
      _rev: document._rev,
      headlineMetrics: document.headlineMetrics ?? null,
    })),
    null,
    2,
  ),
  'utf8',
)

let transaction = client.transaction()
for (const {document, metrics} of updates) {
  transaction = transaction.patch(document._id, (patch) =>
    patch.ifRevisionId(document._rev).set({headlineMetrics: metrics}),
  )
}

const result = await transaction.commit({returnDocuments: false})
console.log(`Published headline metrics for ${updates.length} localized case-study documents.`)
console.log(`Backup: ${backupPath}`)
console.log(`Transaction ID: ${result.transactionId}`)
