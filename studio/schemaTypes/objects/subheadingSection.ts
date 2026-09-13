import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const subheadingSection = defineType({
  name: 'subheadingSection',
  title: 'Subheading',
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
        title: 'Subheading',
        subtitle,
      }
    },
  },
})
