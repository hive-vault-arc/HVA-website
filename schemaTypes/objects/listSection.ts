import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const listSection = defineType({
  name: 'listSection',
  title: 'List',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      return {
        title: 'List',
        subtitle: items?.length ? `${items.length} items` : 'No items',
      }
    },
  },
})
