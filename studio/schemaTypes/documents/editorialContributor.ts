import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const editorialContributor = defineType({
  name: 'editorialContributor',
  title: 'Editorial Contributor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Contributor Type',
      type: 'string',
      initialValue: 'person',
      options: {
        list: [
          {title: 'Named person', value: 'person'},
          {title: 'Internal team', value: 'team'},
          {title: 'External contributor', value: 'external'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Public Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'role', title: 'Public Role', type: 'string'}),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'credentials',
      title: 'Approved Credentials',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'profile',
      title: 'Employee Profile',
      type: 'reference',
      to: [{type: 'employeeProfile'}],
    }),
    defineField({
      name: 'publicIdentityUrl',
      title: 'Public Identity URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'publicationPermission',
      title: 'Publication Permission Confirmed',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.kind !== 'external' || value
            ? true
            : 'External contributors require recorded publication permission.',
        ),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'role'}},
})
