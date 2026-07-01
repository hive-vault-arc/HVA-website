import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const caseStudyMetric = defineType({
  name: 'caseStudyMetric',
  title: 'Case Study Metric',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
