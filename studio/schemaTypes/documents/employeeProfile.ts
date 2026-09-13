import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {createReviewFields} from '../editorialFields'
import {
  createLocalizationFields,
  localeScopedSlugIsUnique,
  validatePublicSlug,
} from '../localization'
import {requireWebpImage} from '../webpValidation'

export const employeeProfile = defineType({
  name: 'employeeProfile',
  title: 'Employee Profile',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'profile', title: 'Profile'},
    {name: 'career', title: 'Career'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    ...createLocalizationFields('publishing'),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description: 'Controls the public URL: /aboutus/our-people/{slug}',
      options: {source: 'name', isUnique: localeScopedSlugIsUnique},
      validation: (rule) => rule.required().custom(validatePublicSlug),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'responsibilityTag',
      title: 'Responsibility Tag',
      type: 'string',
      group: 'identity',
      description: 'Short ownership line used in cards and profile headers.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'profileType',
      title: 'Profile Type',
      type: 'string',
      group: 'identity',
      initialValue: 'coFounder',
      options: {
        list: [
          {title: 'Co-Founder', value: 'coFounder'},
          {title: 'Employee', value: 'employee'},
          {title: 'Advisor', value: 'advisor'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'profile',
      rows: 4,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      group: 'profile',
      rows: 8,
      validation: (rule) => rule.required().max(4000),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      group: 'identity',
      options: {hotspot: true},
      validation: (rule) => rule.required().custom(requireWebpImage),
    }),
    defineField({
      name: 'profileImageAlt',
      title: 'Profile Image Alt Text',
      type: 'string',
      group: 'identity',
      description: 'Describe the person and context without starting with "image of".',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      group: 'career',
      of: [
        defineArrayMember({
          name: 'experienceItem',
          title: 'Experience Item',
          type: 'object',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'organization',
              title: 'Organization',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'period',
              title: 'Period',
              type: 'string',
            }),
            defineField({
              name: 'summary',
              title: 'Summary',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.unique(),
            }),
          ],
          preview: {
            select: {
              title: 'role',
              organization: 'organization',
              period: 'period',
            },
            prepare({title, organization, period}) {
              return {
                title,
                subtitle: [organization, period].filter(Boolean).join(' - '),
              }
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).warning('Add at least one experience item for profile depth.'),
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'career',
      of: [
        defineArrayMember({
          name: 'educationItem',
          title: 'Education Item',
          type: 'object',
          fields: [
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'credential',
              title: 'Credential',
              type: 'string',
            }),
            defineField({
              name: 'period',
              title: 'Period',
              type: 'string',
            }),
            defineField({
              name: 'summary',
              title: 'Summary',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'institution',
              credential: 'credential',
              period: 'period',
            },
            prepare({title, credential, period}) {
              return {
                title,
                subtitle: [credential, period].filter(Boolean).join(' - '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      group: 'profile',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).max(12).unique(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'identity',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .custom((url) => {
            if (!url) return true

            try {
              const hostname = new URL(url).hostname.replace(/^www\./, '')
              return hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')
                ? true
                : 'Use a LinkedIn profile URL.'
            } catch {
              return 'Use a valid LinkedIn profile URL.'
            }
          }),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'publishing',
      description: 'Lower numbers appear first on the About page and related-profile lists.',
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'featuredOnAbout',
      title: 'Featured on About Page',
      type: 'boolean',
      group: 'publishing',
      initialValue: true,
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      group: 'publishing',
      description: 'Hidden profiles are excluded from public profile pages and listings.',
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
    ...createReviewFields('publishing'),
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
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      responsibilityTag: 'responsibilityTag',
      media: 'profileImage',
    },
    prepare({title, position, responsibilityTag, media}) {
      return {
        title,
        subtitle: [position, responsibilityTag].filter(Boolean).join(' - '),
        media,
      }
    },
  },
})
