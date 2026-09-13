import {
  routeForDocument,
  routeForPage,
  type ContentLocale,
  type RoutedDocumentType,
} from '../content-route-contract'

export const REQUIRED_RELEASE_LOCALES = ['en', 'fr', 'es', 'ar'] as const

export type StrategicReleaseDocument = {
  _id: string
  _type: string
  language?: string
  translationStatus?: string
  visibility?: string
  slug?: {current?: string}
  routeKey?: string
  seo?: {title?: string; description?: string; noIndex?: boolean}
  nativeReview?: {reviewed?: boolean; reviewedBy?: string; reviewedAt?: string}
  directAnswer?: string
  evidenceType?: string
  answerEvidence?: Array<{_ref?: string}>
  methodology?: string
  limitations?: string
}

export type StrategicReleaseMember = {
  referenceId: string
  document: StrategicReleaseDocument
}

export type StrategicReleaseValidation = {
  check: string
  status: 'passed' | 'failed'
  details: string
}

const routedStrategicTypes = new Set<RoutedDocumentType>([
  'capability',
  'caseStudy',
  'employeeProfile',
])

function hasCompleteNativeReview(document: StrategicReleaseDocument) {
  if (document.language === 'en') return true
  const review = document.nativeReview
  return Boolean(review?.reviewed && review.reviewedBy?.trim() && review.reviewedAt)
}

function answerNeedsEvidence(document: StrategicReleaseDocument) {
  if (!document.directAnswer?.trim()) return false
  if (['external-research', 'first-party-research'].includes(document.evidenceType || '')) {
    return true
  }
  return /\d/.test(document.directAnswer)
}

export function validateStrategicReleaseFamily(
  members: StrategicReleaseMember[],
  evidenceIdsApprovedForPublicUse: ReadonlySet<string>,
): StrategicReleaseValidation[] {
  const documents = members.map((member) => member.document)
  const locales = documents.map((document) => document.language).filter(Boolean)
  const types = new Set(documents.map((document) => document._type))
  const checks: StrategicReleaseValidation[] = []

  const localeComplete =
    documents.length === REQUIRED_RELEASE_LOCALES.length &&
    REQUIRED_RELEASE_LOCALES.every(
      (locale) => locales.filter((candidate) => candidate === locale).length === 1,
    )
  checks.push({
    check: 'four-language-family',
    status: localeComplete ? 'passed' : 'failed',
    details: localeComplete
      ? 'Exactly one English, French, Spanish, and Arabic document is present.'
      : `Expected en, fr, es, ar exactly once; found ${locales.join(', ') || 'none'}.`,
  })

  const typesMatch = types.size === 1
  checks.push({
    check: 'matching-schema-types',
    status: typesMatch ? 'passed' : 'failed',
    details: typesMatch
      ? `All documents use ${documents[0]?._type || 'the same schema type'}.`
      : `Translation family mixes schema types: ${Array.from(types).join(', ')}.`,
  })

  const unapproved = documents.filter((document) => document.translationStatus !== 'approved')
  checks.push({
    check: 'approved-translations',
    status: unapproved.length === 0 ? 'passed' : 'failed',
    details:
      unapproved.length === 0
        ? 'Every translation is approved.'
        : `Not approved: ${unapproved.map((document) => document._id).join(', ')}.`,
  })

  const privateDocuments = documents.filter(
    (document) => document.visibility && document.visibility !== 'published',
  )
  checks.push({
    check: 'public-visibility',
    status: privateDocuments.length === 0 ? 'passed' : 'failed',
    details:
      privateDocuments.length === 0
        ? 'Every document is eligible for public visibility.'
        : `Not publicly visible: ${privateDocuments.map((document) => document._id).join(', ')}.`,
  })

  const missingSeo = documents.filter(
    (document) =>
      document._type !== 'industry' &&
      (!document.seo?.title?.trim() || !document.seo?.description?.trim()),
  )
  checks.push({
    check: 'localized-seo',
    status: missingSeo.length === 0 ? 'passed' : 'failed',
    details:
      missingSeo.length === 0
        ? 'Every routed document has localized SEO title and description.'
        : `Missing SEO metadata: ${missingSeo.map((document) => document._id).join(', ')}.`,
  })

  const missingNativeReview = documents.filter((document) => !hasCompleteNativeReview(document))
  checks.push({
    check: 'native-language-review',
    status: missingNativeReview.length === 0 ? 'passed' : 'failed',
    details:
      missingNativeReview.length === 0
        ? 'French, Spanish, and Arabic reviews are recorded.'
        : `Missing native review: ${missingNativeReview.map((document) => document._id).join(', ')}.`,
  })

  const invalidEvidence = documents.filter((document) => {
    if (!answerNeedsEvidence(document)) return false
    const references = (document.answerEvidence || [])
      .map((reference) => reference._ref?.replace(/^drafts\./, ''))
      .filter((reference): reference is string => Boolean(reference))
    return !references.some((reference) => evidenceIdsApprovedForPublicUse.has(reference))
  })
  checks.push({
    check: 'public-evidence',
    status: invalidEvidence.length === 0 ? 'passed' : 'failed',
    details:
      invalidEvidence.length === 0
        ? 'Evidence-dependent answers reference approved public evidence.'
        : `Missing approved evidence: ${invalidEvidence.map((document) => document._id).join(', ')}.`,
  })

  const incompleteResearch = documents.filter(
    (document) =>
      document.evidenceType === 'first-party-research' &&
      (!document.methodology?.trim() || !document.limitations?.trim()),
  )
  checks.push({
    check: 'research-disclosure',
    status: incompleteResearch.length === 0 ? 'passed' : 'failed',
    details:
      incompleteResearch.length === 0
        ? 'First-party research includes methodology and limitations.'
        : `Incomplete first-party research: ${incompleteResearch.map((document) => document._id).join(', ')}.`,
  })

  return checks
}

export function routeForStrategicReleaseDocument(document: StrategicReleaseDocument) {
  const locale = document.language as ContentLocale | undefined
  if (!locale || !REQUIRED_RELEASE_LOCALES.includes(locale)) return null

  if (document._type === 'pageOptimization' && document.routeKey) {
    return routeForPage(document.routeKey as Parameters<typeof routeForPage>[0], locale)
  }

  if (document._type === 'industry') {
    const base = routeForPage('industries', locale)
    return document.slug?.current ? `${base}#${encodeURIComponent(document.slug.current)}` : base
  }

  if (routedStrategicTypes.has(document._type as RoutedDocumentType) && document.slug?.current) {
    return routeForDocument(document._type as RoutedDocumentType, locale, document.slug.current)
  }

  return null
}
