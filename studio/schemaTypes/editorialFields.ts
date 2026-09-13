import {defineArrayMember, defineField, type FieldDefinition, type ValidationContext} from 'sanity'

export const EDITORIAL_FORMATS = [
  {title: 'Operating note', value: 'operating-note'},
  {title: 'Evidence brief', value: 'evidence-brief'},
  {title: 'Industry guide', value: 'industry-guide'},
  {title: 'Case study', value: 'case'},
  {title: 'Founder view', value: 'founder-view'},
] as const

export const EDITORIAL_TOPICS = [
  {title: 'AI operational systems', value: 'ai-operational-systems'},
  {title: 'Custom software and automation', value: 'custom-software-automation'},
  {title: 'Real estate and construction', value: 'real-estate-construction'},
  {title: 'Morocco and North Africa transformation', value: 'morocco-north-africa-transformation'},
  {title: 'Data, cloud, and reliability', value: 'data-cloud-reliability'},
] as const

type EditorialDocument = {
  answerQuestion?: string
  directAnswer?: string
  evidenceType?: string
  answerEvidence?: unknown[]
  reviewers?: unknown[]
  lastReviewed?: string
  methodology?: string
  limitations?: string
  _type?: string
}

function documentFrom(context: ValidationContext) {
  return context.document as EditorialDocument | undefined
}

function requiresEvidence(document: EditorialDocument | undefined) {
  return Boolean(
    document?.directAnswer &&
    (document.evidenceType === 'external-research' ||
      document.evidenceType === 'first-party-research' ||
      /\d/.test(document.directAnswer)),
  )
}

function referenceIds(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    const reference = item as {_ref?: string} | undefined
    return reference?._ref ? [reference._ref.replace(/^drafts\./, '')] : []
  })
}

async function validateApprovedEvidence(value: unknown, context: ValidationContext) {
  if (!requiresEvidence(documentFrom(context))) return true
  const ids = referenceIds(value)
  if (!ids.length) return 'Evidence-backed or numeric answers require approved evidence.'
  const count = await context.getClient({apiVersion: '2026-07-23'}).fetch<number>(
    `count(*[
      _type == "evidenceRecord" && _id in $ids &&
      verificationStatus == "verified" && publiclyCitable == true &&
      (!defined(expiresAt) || dateTime(expiresAt + "T23:59:59Z") >= dateTime(now()))
    ])`,
    {ids},
  )
  return count > 0
    ? true
    : 'At least one evidence record must be verified and approved for public use.'
}

async function validateRelatedReferences(value: unknown, context: ValidationContext) {
  if (context.document?.translationStatus !== 'approved') return true
  const ids = referenceIds(value)
  if (!ids.length) return true
  const documents = await context
    .getClient({apiVersion: '2026-07-23'})
    .fetch<Array<{_id: string; language?: string; translationStatus?: string}>>(
      `*[_id in $ids]{_id, language, translationStatus}`,
      {ids},
    )
  const locale = context.document?.language
  return documents.length === ids.length &&
    documents.every(
      (document) => document.language === locale && document.translationStatus === 'approved',
    )
    ? true
    : 'Approved content may only reference published, approved content in the same locale.'
}

type EditorialFieldOptions = {
  group?: string
  includeRelatedCases?: boolean
  includeRelatedCapabilities?: boolean
}

export function createEditorialFields(options: EditorialFieldOptions = {}): FieldDefinition[] {
  const {group, includeRelatedCases = true, includeRelatedCapabilities = true} = options
  return [
    defineField({
      name: 'editorialFormat',
      title: 'Editorial Format',
      type: 'string',
      group,
      options: {list: [...EDITORIAL_FORMATS], layout: 'dropdown'},
    }),
    defineField({
      name: 'topics',
      title: 'Editorial Topics',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'string', options: {list: [...EDITORIAL_TOPICS]}})],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'answerQuestion',
      title: 'Question This Page Answers',
      type: 'string',
      group,
      validation: (rule) =>
        rule.max(180).custom((value, context) => {
          const document = documentFrom(context)
          return (
            !document?.directAnswer ||
            Boolean(value?.trim()) ||
            'Required when a direct answer is set.'
          )
        }),
    }),
    defineField({
      name: 'directAnswer',
      title: 'Direct Answer',
      type: 'text',
      rows: 4,
      group,
      description: 'A concise answer that is also rendered visibly on the public page.',
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(5).unique(),
    }),
    defineField({
      name: 'relatedQuestions',
      title: 'Related Questions',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(6).unique(),
    }),
    defineField({
      name: 'evidenceType',
      title: 'Evidence Type',
      type: 'string',
      group,
      options: {
        list: [
          {title: 'Operating perspective', value: 'operating-perspective'},
          {title: 'External research synthesis', value: 'external-research'},
          {title: 'First-party research', value: 'first-party-research'},
          {title: 'Approved client evidence', value: 'approved-client-evidence'},
        ],
      },
    }),
    defineField({
      name: 'answerEvidence',
      title: 'Answer Evidence',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'reference', to: [{type: 'evidenceRecord'}]})],
      validation: (rule) => rule.unique().custom(validateApprovedEvidence),
    }),
    defineField({
      name: 'reviewers',
      title: 'Reviewers',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'reference', to: [{type: 'editorialContributor'}]})],
      validation: (rule) =>
        rule.unique().custom((value, context) => {
          const document = documentFrom(context)
          return !document?.lastReviewed || (Array.isArray(value) && value.length > 0)
            ? true
            : 'A review date requires at least one reviewer.'
        }),
    }),
    defineField({
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'date',
      group,
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = documentFrom(context)
          return !document?.reviewers?.length || Boolean(value)
            ? true
            : 'Reviewer attribution requires a review date.'
        }),
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology',
      type: 'text',
      rows: 5,
      group,
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = documentFrom(context)
          return document?.evidenceType !== 'first-party-research' || Boolean(value?.trim())
            ? true
            : 'First-party research requires a methodology.'
        }),
    }),
    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'text',
      rows: 4,
      group,
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = documentFrom(context)
          return document?.evidenceType !== 'first-party-research' || Boolean(value?.trim())
            ? true
            : 'First-party research requires limitations.'
        }),
    }),
    ...(includeRelatedCases
      ? [
          defineField({
            name: 'relatedCases',
            title: 'Related Case Studies',
            type: 'array',
            group,
            of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})],
            validation: (rule) => rule.max(4).unique().custom(validateRelatedReferences),
          }),
        ]
      : []),
    ...(includeRelatedCapabilities
      ? [
          defineField({
            name: 'relatedCapabilities',
            title: 'Related Capabilities',
            type: 'array',
            group,
            of: [defineArrayMember({type: 'reference', to: [{type: 'capability'}]})],
            validation: (rule) => rule.max(4).unique().custom(validateRelatedReferences),
          }),
        ]
      : []),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'editorialLink',
      group,
    }),
  ]
}

export function createReviewFields(group?: string): FieldDefinition[] {
  return [
    defineField({
      name: 'reviewers',
      title: 'Reviewers',
      type: 'array',
      group,
      of: [defineArrayMember({type: 'reference', to: [{type: 'editorialContributor'}]})],
      validation: (rule) => rule.unique(),
    }),
    defineField({name: 'lastReviewed', title: 'Last Reviewed', type: 'date', group}),
  ]
}
