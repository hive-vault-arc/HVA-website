import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {createLocalizationFields, localeScopedSlugIsUnique} from '../localization'

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: TagIcon,
  fields: [
    ...createLocalizationFields(),
    defineField({
      name: 'title',
      title: 'Public title',
      type: 'string',
      description: 'The concise industry name visitors see in filters and publication cards.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', isUnique: localeScopedSlugIsUnique},
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
      name: 'description',
      title: 'Editorial description',
      type: 'text',
      rows: 3,
      description:
        'Optional internal context that helps editors choose the right industry.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Filter order',
      type: 'number',
      description: 'Lower numbers appear first in visitor filters.',
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Filter order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({title, language}) {
      return {
        title: title || 'Untitled industry',
        subtitle: language?.toUpperCase() || 'No language',
      }
    },
  },
})
