import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const headingSection = defineType({
  name: 'headingSection',
  title: 'Heading',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: 'content',
    },
    prepare({subtitle}) {
      return {
        title: 'Heading',
        subtitle,
      }
    },
  },
})
