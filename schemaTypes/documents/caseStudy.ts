import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
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
      options: {source: 'title'},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Slug must be lowercase with hyphens only.'
          }

          return true
        }),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (rule) => rule.required(),
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
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'integrations',
      title: 'Integrations',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
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
          validation: (rule) => rule.required(),
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
        }),
        defineField({
          name: 'clientLogoAlt',
          title: 'Client Logo Alt Text',
          type: 'string',
          hidden: ({parent}) => !parent?.clientLogo,
          validation: (rule) =>
            rule.custom((value, context) => {
              if (!context.parent?.clientLogo || value) return true
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
