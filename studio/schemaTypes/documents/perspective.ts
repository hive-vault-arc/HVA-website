import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionArrayMembers} from '../objects/sectionArrayMembers'
import {createLocalizationFields, localeScopedSlugIsUnique} from '../localization'
import {createIndustryReferenceField} from '../industryReference'
import {requireWebpImage} from '../webpValidation'

export const perspective = defineType({
  name: 'perspective',
  title: 'Perspective',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    ...createLocalizationFields(),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      initialValue: 'Perspective',
      options: {
        list: [{title: 'Perspective', value: 'Perspective'}],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    createIndustryReferenceField(),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [defineArrayMember({type: 'author'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [defineArrayMember({type: 'sourceLink'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().custom(requireWebpImage),
    }),
    defineField({
      name: 'coverAlt',
      title: 'Cover Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Article Sections',
      type: 'array',
      of: sectionArrayMembers,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tag: 'tag',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
    prepare({title, tag, publishedAt, media}) {
      return {
        title,
        subtitle: [tag, publishedAt].filter(Boolean).join(' - '),
        media,
      }
    },
  },
})
