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
      title: 'Deployment Scale',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deploymentStatus',
      title: 'Deployment Status',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'measuredOutcomes',
      title: 'Measured Outcomes',
      type: 'array',
      of: [defineArrayMember({type: 'caseStudyMetric'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'testimonial',
      validation: (rule) => rule.required(),
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
