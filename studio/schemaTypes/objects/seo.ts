import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchResultPreview} from '../../components/SearchResultPreview'
import {requireWebpImage} from '../webpValidation'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: CogIcon,
  components: {input: SearchResultPreview},
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      description: 'Localized title shown in search and social previews.',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Keep SEO titles concise.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      description: 'Localized summary shown in search and social previews.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(170).warning('Keep descriptions concise for search previews.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords (deprecated)',
      description: 'Kept for legacy content only. Search engines do not use the meta keywords tag.',
      type: 'array',
      readOnly: true,
      hidden: ({value}) => !value,
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Image',
      description: 'Optional localized Open Graph image. Upload WebP only.',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.custom(requireWebpImage),
    }),
    defineField({
      name: 'socialImageAlt',
      title: 'Social Image Alt Text',
      type: 'string',
      hidden: ({parent}) => !parent?.socialImage,
      validation: (rule) =>
        rule.custom((value, context) =>
          !context.parent ||
          !(context.parent as {socialImage?: unknown}).socialImage ||
          value?.trim()
            ? true
            : 'Alt text is required when a social image is set.',
        ),
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      description: 'Exclude this document from search indexing and the public sitemap.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'SEO',
        subtitle,
      }
    },
  },
})
