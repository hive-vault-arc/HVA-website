import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType, type FileValue, type ValidationContext} from 'sanity'
import {requireWebpImage} from '../webpValidation'

const APPROVED_STATUS = 'approved'
const PDF_MIME_TYPE = 'application/pdf'
const WARNING_SIZE_BYTES = 1.5 * 1024 * 1024
const MAX_SIZE_BYTES = 3 * 1024 * 1024
const ASSET_API_VERSION = '2026-07-01'

type ClientEvidenceParent = {
  publicationStatus?: string
  testimonialImage?: {
    asset?: {
      _ref?: string
    }
  }
}

type FileAssetMetadata = {
  mimeType?: string
  size?: number
}

function isApproved(context: ValidationContext) {
  return (context.parent as ClientEvidenceParent | undefined)?.publicationStatus === APPROVED_STATUS
}

function requiredWhenApproved(message: string) {
  return (value: unknown, context: ValidationContext) => {
    if (!isApproved(context)) return true
    if (typeof value === 'string') return value.trim().length > 0 || message
    return value !== undefined && value !== null ? true : message
  }
}

function fileAssetRef(value: FileValue | undefined) {
  return value?.asset?._ref
}

async function getFileAssetMetadata(value: FileValue | undefined, context: ValidationContext) {
  const assetId = fileAssetRef(value)
  if (!assetId) return null

  return context
    .getClient({apiVersion: ASSET_API_VERSION})
    .fetch<FileAssetMetadata | null>('*[_id == $assetId][0]{mimeType, size}', {assetId})
}

export const clientEvidence = defineType({
  name: 'clientEvidence',
  title: 'Client Evidence',
  type: 'object',
  icon: DocumentTextIcon,
  description:
    'Publication-controlled evidence for this case study. Upload a final testimonial PDF, image, or both only after written permission is confirmed; Sanity assets are publicly addressable.',
  initialValue: {
    publicationStatus: 'notCleared',
  },
  fields: [
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
      description:
        'Approved evidence can appear on the website. Withdrawn evidence is never queried publicly; remove its testimonial assets if permission has been revoked.',
      initialValue: 'notCleared',
      options: {
        layout: 'radio',
        list: [
          {title: 'Not cleared', value: 'notCleared'},
          {title: 'Approved', value: 'approved'},
          {title: 'Withdrawn', value: 'withdrawn'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permissionConfirmedOn',
      title: 'Permission Confirmed On',
      type: 'date',
      description: 'Date written permission to publish this client evidence was confirmed.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      validation: (rule) =>
        rule.custom(requiredWhenApproved('Required before client evidence can be approved.')),
    }),
    defineField({
      name: 'documentTitle',
      title: 'Document Title',
      type: 'string',
      description: 'Public title shown on the client-reference-letter card.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      validation: (rule) =>
        rule.custom(requiredWhenApproved('Required before client evidence can be approved.')),
    }),
    defineField({
      name: 'documentLanguage',
      title: 'Document Language',
      type: 'string',
      description:
        'BCP 47 language code for the original letter and exact quote excerpt, for example en, fr, ar, es, or fr-MA.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      validation: (rule) =>
        rule
          .custom(requiredWhenApproved('Required before client evidence can be approved.'))
          .regex(/^[a-z]{2,3}(?:-[A-Z]{2})?$/, {
            name: 'BCP 47 language code',
            invert: false,
          }),
    }),
    defineField({
      name: 'testimonialPdf',
      title: 'Client Reference Letter',
      type: 'file',
      description:
        'Upload the final publication-ready PDF. Files above 1.5 MB produce a warning; files above 3 MB cannot be published.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      options: {
        accept: PDF_MIME_TYPE,
        storeOriginalFilename: false,
      },
      validation: (rule) => [
        rule
          .custom((value, context) => {
            if (!isApproved(context)) return true
            const parent = context.parent as ClientEvidenceParent | undefined
            return (
              Boolean(fileAssetRef(value) || parent?.testimonialImage?.asset?._ref) ||
              'A testimonial PDF or image is required before approval.'
            )
          })
          .error(),
        rule
          .custom(async (value, context) => {
            const metadata = await getFileAssetMetadata(value, context)
            if (!metadata) return true
            if (metadata.mimeType && metadata.mimeType !== PDF_MIME_TYPE) {
              return 'Only PDF files are allowed for client reference letters.'
            }
            if (typeof metadata.size === 'number' && metadata.size > MAX_SIZE_BYTES) {
              return 'The PDF must be 3 MB or smaller before it can be published.'
            }
            return true
          })
          .error(),
        rule
          .custom(async (value, context) => {
            const metadata = await getFileAssetMetadata(value, context)
            if (!metadata || typeof metadata.size !== 'number') return true
            if (metadata.size > WARNING_SIZE_BYTES && metadata.size <= MAX_SIZE_BYTES) {
              return 'This PDF is above 1.5 MB. Optimize it before publishing when possible.'
            }
            return true
          })
          .warning(),
      ],
    }),
    defineField({
      name: 'testimonialImage',
      title: 'Client Testimonial Image',
      type: 'image',
      description:
        'Optional signed or stamped testimonial image displayed in full on the case-study page. The website omits the section when this field is empty.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.custom(requireWebpImage),
    }),
    defineField({
      name: 'testimonialImageAlt',
      title: 'Testimonial Image Alternative Text',
      type: 'string',
      description: 'Describe the testimonial document in the language of this case study.',
      hidden: ({parent}) => !parent?.testimonialImage,
      validation: (rule) =>
        rule.max(240).custom((value, context) => {
          const parent = context.parent as ClientEvidenceParent | undefined
          if (!parent?.testimonialImage?.asset?._ref) return true
          return (typeof value === 'string' && value.trim().length > 0) || 'Required'
        }),
    }),
    defineField({
      name: 'issuedOn',
      title: 'Issued On',
      type: 'date',
      description: 'Optional date printed on the reference letter.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
    }),
    defineField({
      name: 'quoteExcerpt',
      title: 'Quote Excerpt',
      type: 'text',
      rows: 4,
      description:
        'Optional exact excerpt from the approved PDF. Keep it in the document’s original language; do not translate or rewrite it.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: 'signatoryName',
      title: 'Signatory Name',
      type: 'string',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
    }),
    defineField({
      name: 'signatoryRole',
      title: 'Signatory Role',
      type: 'string',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
    }),
    defineField({
      name: 'evidencePriority',
      title: 'Homepage Priority',
      type: 'number',
      description: 'Optional. Lower numbers appear first in the homepage client-evidence rail.',
      hidden: ({parent}) => parent?.publicationStatus === 'notCleared',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'documentTitle',
      status: 'publicationStatus',
      language: 'documentLanguage',
    },
    prepare({title, status, language}) {
      const statusLabel =
        status === 'approved' ? 'Approved' : status === 'withdrawn' ? 'Withdrawn' : 'Not cleared'

      return {
        title: title || 'Client evidence',
        subtitle: [statusLabel, language?.toUpperCase()].filter(Boolean).join(' · '),
      }
    },
  },
})
