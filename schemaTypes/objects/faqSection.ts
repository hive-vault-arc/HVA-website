import {HelpCircleIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [defineArrayMember({type: 'faqItem'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      return {
        title: 'FAQ',
        subtitle: items?.length ? `${items.length} questions` : 'No questions',
      }
    },
  },
})
