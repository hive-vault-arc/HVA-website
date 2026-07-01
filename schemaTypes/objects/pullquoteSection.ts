import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pullquoteSection = defineType({
  name: 'pullquoteSection',
  title: 'Pullquote',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      subtitle: 'content',
    },
    prepare({subtitle}) {
      return {
        title: 'Pullquote',
        subtitle,
      }
    },
  },
})
