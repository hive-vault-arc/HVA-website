import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType, type ValidationContext} from 'sanity'
import {createEditorialFields} from '../editorialFields'
import {
  createLocalizationFields,
  localeScopedSlugIsUnique,
  validatePublicSlug,
} from '../localization'
import {createIndustryReferenceField} from '../industryReference'
import {requireWebpImage} from '../webpValidation'

const SOFTWARE_DELIVERY_TYPES = new Set(['customSoftware', 'hybridDelivery'])

type CaseStudyDocument = {
  engagementType?: string
}

function requiredForSoftwareDelivery(
  value: unknown[] | undefined,
  context: ValidationContext,
  fieldLabel: string,
) {
  const document = context.document as CaseStudyDocument | undefined
  const engagementType = document?.engagementType ?? 'customSoftware'
  if (!SOFTWARE_DELIVERY_TYPES.has(engagementType)) return true

  return Array.isArray(value) && value.length > 0
    ? true
    : `Add at least one ${fieldLabel} for custom software or hybrid delivery.`
}

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    ...createLocalizationFields(),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', isUnique: localeScopedSlugIsUnique},
      validation: (rule) => rule.required().custom(validatePublicSlug),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry (Deprecated)',
      type: 'string',
      deprecated: {
        reason:
          'Use the shared Industry reference. Existing values remain visible until migration is complete.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    createIndustryReferenceField(),
    defineField({
      name: 'engagementType',
      title: 'Engagement Type',
      type: 'string',
      description:
        'Describes the work delivered and determines which delivery fields are expected. Existing records without a value are treated as custom software.',
      initialValue: 'customSoftware',
      options: {
        layout: 'radio',
        list: [
          {title: 'Custom software or digital product', value: 'customSoftware'},
          {title: 'Advisory or transformation program', value: 'advisoryTransformation'},
          {title: 'Managed operations or service', value: 'managedOperations'},
          {title: 'Hybrid advisory and software delivery', value: 'hybridDelivery'},
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'systemArchitecture',
      title: 'System Architecture',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'operationalModules',
      title: 'Operational Modules',
      type: 'array',
      description:
        'Required for custom software and hybrid delivery. Optional for advisory and managed-service case studies.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) =>
        rule
          .unique()
          .custom((value, context) =>
            requiredForSoftwareDelivery(value, context, 'operational module'),
          ),
    }),
    defineField({
      name: 'integrations',
      title: 'Integrations',
      type: 'array',
      description:
        'Required for custom software and hybrid delivery. Optional when the engagement has no connected software stack.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) =>
        rule
          .unique()
          .custom((value, context) => requiredForSoftwareDelivery(value, context, 'integration')),
    }),
    defineField({
      name: 'deploymentScale',
      title: 'Deployment Scale (Deprecated)',
      type: 'string',
      deprecated: {
        reason: 'Removed from public case studies until delivery scope is audited and approved.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    defineField({
      name: 'deploymentStatus',
      title: 'Deployment Status',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headlineMetrics',
      title: 'Headline Metrics',
      type: 'array',
      description:
        'Optional approved numbers shown after the delivered system, visual evidence, and integrations. Leave empty to omit the results grid. Use scope facts unless a performance figure has explicit approval.',
      of: [defineArrayMember({type: 'caseStudyHeadlineMetric'})],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'publishedOutcomes',
      title: 'Published Outcomes',
      type: 'array',
      description:
        'Client- or owner-approved performance figures. Public queries return only approved items with a recorded approval date and reference.',
      of: [defineArrayMember({type: 'publishedCaseStudyOutcome'})],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'measuredOutcomes',
      title: 'Measured Outcomes (Deprecated)',
      type: 'array',
      of: [defineArrayMember({type: 'caseStudyMetric'})],
      deprecated: {
        reason: 'Performance figures are unpublished until a formal audit confirms them.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    defineField({
      name: 'reportingNote',
      title: 'Reporting Note (Deprecated)',
      description: 'Legacy context for unpublished performance figures.',
      type: 'text',
      rows: 3,
      deprecated: {
        reason: 'The associated performance figures have been removed pending audit.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    defineField({
      name: 'clientEvidence',
      title: 'Client Evidence',
      type: 'clientEvidence',
      description:
        'Publication-controlled client reference letter and optional exact quote for this case study.',
      initialValue: {
        publicationStatus: 'notCleared',
      },
    }),
    defineField({
      name: 'projectMedia',
      title: 'Project Media',
      type: 'array',
      description:
        'Optional ordered product and delivery evidence. Custom-software records may include desktop or phone screenshots; advisory and service records can leave this empty with no public placeholder or reserved space.',
      of: [defineArrayMember({type: 'caseStudyProjectMedia'})],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial (Deprecated)',
      type: 'testimonial',
      deprecated: {
        reason:
          'Do not publish testimonials without written client permission. Use the reporting note for evidence context instead.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'object',
      fields: [
        defineField({
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {hotspot: true},
          validation: (rule) => rule.required().custom(requireWebpImage),
        }),
        defineField({
          name: 'coverAlt',
          title: 'Cover Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'logoLabel',
          title: 'Logo Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'clientLogo',
          title: 'Client Logo',
          type: 'image',
          options: {hotspot: false},
          validation: (rule) => rule.custom(requireWebpImage),
        }),
        defineField({
          name: 'clientLogoAlt',
          title: 'Client Logo Alt Text',
          type: 'string',
          hidden: ({parent}) => !parent?.clientLogo,
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as {clientLogo?: unknown} | undefined
              if (!parent?.clientLogo || value) return true
              return 'Add alt text when a client logo is present.'
            }),
        }),
        defineField({
          name: 'clientWebsite',
          title: 'Client Website',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    ...createEditorialFields(),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clientName: 'clientName',
      industry: 'industry',
      lastUpdated: 'lastUpdated',
      media: 'assets.coverImage',
    },
    prepare({title, clientName, industry, lastUpdated, media}) {
      return {
        title,
        subtitle: [[clientName, industry].filter(Boolean).join(' / '), lastUpdated]
          .filter(Boolean)
          .join(' - '),
        media,
      }
    },
  },
})
