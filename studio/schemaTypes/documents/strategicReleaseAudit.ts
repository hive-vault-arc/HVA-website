import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const strategicReleaseAudit = defineType({
  name: 'strategicReleaseAudit',
  title: 'Strategic Release Audit',
  type: 'document',
  icon: DocumentTextIcon,
  readOnly: true,
  fields: [
    defineField({name: 'familyId', title: 'Translation Family ID', type: 'string'}),
    defineField({name: 'schemaType', title: 'Schema Type', type: 'string'}),
    defineField({
      name: 'status',
      title: 'Release Status',
      type: 'string',
      options: {list: [{title: 'Published', value: 'published'}]},
    }),
    defineField({name: 'releasedAt', title: 'Released At', type: 'datetime'}),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'userId', title: 'Sanity User ID', type: 'string'}),
      ],
    }),
    defineField({
      name: 'documents',
      title: 'Published Documents',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'documentId', title: 'Document ID', type: 'string'}),
            defineField({name: 'language', title: 'Language', type: 'string'}),
          ],
          preview: {
            select: {title: 'documentId', subtitle: 'language'},
          },
        }),
      ],
    }),
    defineField({
      name: 'affectedRoutes',
      title: 'Affected Routes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'validationResults',
      title: 'Validation Results',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'check', title: 'Check', type: 'string'}),
            defineField({name: 'status', title: 'Status', type: 'string'}),
            defineField({name: 'details', title: 'Details', type: 'text'}),
          ],
          preview: {
            select: {title: 'check', subtitle: 'status'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {familyId: 'familyId', schemaType: 'schemaType', releasedAt: 'releasedAt'},
    prepare({familyId, schemaType, releasedAt}) {
      return {
        title: `${schemaType || 'Strategic family'} · ${familyId || 'Unknown family'}`,
        subtitle: releasedAt || 'Release time unavailable',
      }
    },
  },
})
