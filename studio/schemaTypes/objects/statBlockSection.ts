import {TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const statBlockSection = defineType({
  name: 'statBlockSection',
  title: 'Stat Block',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'statItem'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare({stats}) {
      return {
        title: 'Stat Block',
        subtitle: stats?.length ? `${stats.length} stats` : 'No stats',
      }
    },
  },
})
