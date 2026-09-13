import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {createEditorialFields} from '../editorialFields'
import {
  createLocalizationFields,
  localeScopedSlugIsUnique,
  validatePublicSlug,
} from '../localization'
import {requireWebpImage} from '../webpValidation'

const hrefValidation = (href?: string) => {
  if (!href) return true
  if (/^\/(?!\/)[^\s]*$/.test(href)) return true
  if (/^https?:\/\//i.test(href)) return true

  return 'Use a relative path starting with / or a full http(s) URL.'
}

export const capability = defineType({
  name: 'capability',
  title: 'Capability',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'narrative', title: 'Narrative'},
    {name: 'answer', title: 'Answer and evidence'},
    {name: 'connections', title: 'Connections'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    ...createLocalizationFields('publishing'),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      options: {source: 'title', isUnique: localeScopedSlugIsUnique},
      validation: (rule) => rule.required().custom(validatePublicSlug),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title',
      type: 'string',
      group: 'identity',
      description: 'Concise title for cards, related links, and tight navigation.',
      validation: (rule) => rule.max(48),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      group: 'identity',
      description: 'Short discipline label shown above the page title.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'briefLine',
      title: 'Brief Line',
      type: 'text',
      group: 'narrative',
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'briefBullets',
      title: 'Brief Bullets',
      type: 'array',
      group: 'narrative',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).max(5).unique(),
    }),
    defineField({
      name: 'strategicContext',
      title: 'Strategic Context',
      type: 'text',
      group: 'narrative',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'executionContext',
      title: 'Execution Context',
      type: 'text',
      group: 'narrative',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subCapabilities',
      title: 'Sub-Capabilities',
      type: 'array',
      group: 'narrative',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).max(12).unique(),
    }),
    defineField({
      name: 'relatedOutcomes',
      title: 'Related Outcomes',
      type: 'array',
      group: 'narrative',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).max(8).unique(),
    }),
    defineField({
      name: 'landingLinks',
      title: 'Landing Links',
      type: 'array',
      group: 'connections',
      of: [
        defineArrayMember({
          name: 'landingLink',
          title: 'Landing Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              validation: (rule) => rule.required().custom(hrefValidation),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'identity',
      options: {hotspot: true},
      validation: (rule) => rule.required().custom(requireWebpImage),
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      group: 'identity',
      description: 'Describe the scene and its business context without starting with "image of".',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      group: 'connections',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'capability'}],
        }),
      ],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'publishing',
      description: 'Lower numbers appear first on capability listings.',
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'featuredOnCapabilities',
      title: 'Featured on Capabilities Page',
      type: 'boolean',
      group: 'publishing',
      initialValue: true,
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      group: 'publishing',
      description: 'Hidden capabilities are excluded from public detail pages and listings.',
      initialValue: 'published',
      options: {
        list: [
          {title: 'Published', value: 'published'},
          {title: 'Hidden', value: 'hidden'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    ...createEditorialFields({group: 'answer', includeRelatedCapabilities: false}),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      shortTitle: 'shortTitle',
      briefLine: 'briefLine',
      media: 'heroImage',
    },
    prepare({title, shortTitle, briefLine, media}) {
      return {
        title: shortTitle || title,
        subtitle: briefLine,
        media,
      }
    },
  },
})
