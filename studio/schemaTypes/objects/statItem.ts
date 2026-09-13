import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
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
