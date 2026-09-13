import type {SanityDocumentLike, SlugIsUniqueValidator, ValidationContext} from 'sanity'
import {defineField} from 'sanity'
export {validatePublicSlug} from '../lib/publicSlug'

export const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'French'},
  {id: 'es', title: 'Spanish'},
  {id: 'ar', title: 'Arabic'},
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['id']

const NATIVE_REVIEW_ENFORCED_FROM = Date.parse('2026-09-13T00:00:00Z')

export const LOCALIZED_SCHEMA_TYPES = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
  'pageOptimization',
] as const

export const STRATEGIC_SCHEMA_TYPES = [
  'capability',
  'caseStudy',
  'employeeProfile',
  'industry',
  'pageOptimization',
] as const

export const EDITORIAL_SCHEMA_TYPES = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
] as const

export type LocalizedSchemaType = (typeof LOCALIZED_SCHEMA_TYPES)[number]

const APPROVAL_REQUIRED_FIELDS: Record<LocalizedSchemaType, string[]> = {
  post: [
    'title',
    'slug.current',
    'subtitle',
    'excerpt',
    'coverAlt',
    'sections',
    'seo.title',
    'seo.description',
  ],
  newsArticle: [
    'title',
    'slug.current',
    'subtitle',
    'summary',
    'category',
    'coverAlt',
    'sections',
    'seo.title',
    'seo.description',
  ],
  perspective: [
    'title',
    'slug.current',
    'subtitle',
    'summary',
    'coverAlt',
    'sections',
    'seo.title',
    'seo.description',
  ],
  researchReport: [
    'title',
    'slug.current',
    'summary',
    'coverAlt',
    'sections',
    'seo.title',
    'seo.description',
  ],
  caseStudy: [
    'title',
    'slug.current',
    'summary',
    'problem',
    'systemArchitecture',
    'assets.coverAlt',
    'assets.logoLabel',
    'seo.title',
    'seo.description',
  ],
  employeeProfile: [
    'name',
    'slug.current',
    'position',
    'summary',
    'story',
    'profileImageAlt',
    'seo.title',
    'seo.description',
  ],
  capability: [
    'title',
    'slug.current',
    'briefLine',
    'strategicContext',
    'executionContext',
    'heroImageAlt',
    'seo.title',
    'seo.description',
  ],
  industry: ['title', 'slug.current'],
  pageOptimization: ['routeKey', 'seo.title', 'seo.description'],
}

function valueAtPath(document: SanityDocumentLike | undefined, path: string): unknown {
  return path.split('.').reduce<unknown>((value, segment) => {
    if (!value || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[segment]
  }, document)
}

function hasTranslatedValue(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return value !== null && value !== undefined
}

function validateApproval(status: unknown, context: ValidationContext): true | string {
  if (status !== 'approved') return true
  const schemaType = context.document?._type as LocalizedSchemaType | undefined
  if (!schemaType || !LOCALIZED_SCHEMA_TYPES.includes(schemaType)) return true
  const missing = APPROVAL_REQUIRED_FIELDS[schemaType].filter(
    (path) => !hasTranslatedValue(valueAtPath(context.document, path)),
  )
  return missing.length === 0
    ? true
    : `Approval requires translated values for: ${missing.join(', ')}`
}

type NativeReviewValue = {reviewed?: boolean; reviewedBy?: string; reviewedAt?: string}

function needsNativeReview(context: ValidationContext) {
  return context.document?.language !== 'en' && context.document?.translationStatus === 'approved'
}

function nativeReviewComplete(value: unknown) {
  if (!value || typeof value !== 'object') return false
  const review = value as NativeReviewValue
  return Boolean(review.reviewed && review.reviewedBy?.trim() && review.reviewedAt)
}

function isLegacyDocument(context: ValidationContext) {
  const createdAt = Date.parse(context.document?._createdAt ?? '')
  return Number.isFinite(createdAt) && createdAt < NATIVE_REVIEW_ENFORCED_FROM
}

export function createLocalizationFields(group?: string) {
  return [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group,
      readOnly: true,
      hidden: true,
      options: {
        list: SUPPORTED_LANGUAGES.map((language) => ({title: language.title, value: language.id})),
      },
      validation: (rule) =>
        rule
          .required()
          .custom((language) =>
            SUPPORTED_LANGUAGES.some((supported) => supported.id === language)
              ? true
              : 'Choose a supported language.',
          ),
    }),
    defineField({
      name: 'translationStatus',
      title: 'Translation Status',
      description:
        'Only published documents with Approved status are visible on the public website.',
      type: 'string',
      group,
      initialValue: 'draft',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In review', value: 'inReview'},
          {title: 'Approved', value: 'approved'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().custom(validateApproval),
    }),
    defineField({
      name: 'nativeReview',
      title: 'Native-language Review',
      description:
        'Required operationally before approving French, Spanish, or Arabic content. Existing documents are audited before this becomes a hard publish gate.',
      type: 'object',
      group,
      hidden: ({document}) => document?.language === 'en',
      fields: [
        defineField({name: 'reviewed', title: 'Reviewed', type: 'boolean', initialValue: false}),
        defineField({name: 'reviewedBy', title: 'Reviewer', type: 'string'}),
        defineField({name: 'reviewedAt', title: 'Review date', type: 'date'}),
      ],
      validation: (rule) => [
        rule.custom((value, context) =>
          !needsNativeReview(context) || isLegacyDocument(context) || nativeReviewComplete(value)
            ? true
            : 'Record the native reviewer and review date before approval.',
        ),
        rule
          .custom((value, context) =>
            !needsNativeReview(context) || !isLegacyDocument(context) || nativeReviewComplete(value)
              ? true
              : 'This approved legacy translation still needs a recorded native-language review.',
          )
          .warning(),
      ],
    }),
  ]
}

export const localeScopedSlugIsUnique: SlugIsUniqueValidator = async (slug, context) => {
  const document = context.document
  if (!document?._type || !document.language) return context.defaultIsUnique(slug, context)
  const publishedId = document._id.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`
  const client = context.getClient({apiVersion: '2026-07-23'})
  const duplicateCount = await client.fetch<number>(
    `count(*[
      _type == $type && language == $language && slug.current == $slug &&
      !(_id in [$publishedId, $draftId])
    ])`,
    {type: document._type, language: document.language, slug, publishedId, draftId},
  )
  return duplicateCount === 0
}
