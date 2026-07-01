import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const paragraphSection = defineType({
  name: 'paragraphSection',
  title: 'Paragraph',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: 'content',
    },
    prepare({subtitle}) {
      return {
        title: 'Paragraph',
        subtitle,
      }
    },
  },
})
