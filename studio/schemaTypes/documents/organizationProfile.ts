import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {requireWebpImage} from '../webpValidation'

export const ORGANIZATION_PROFILE_ID = 'organizationProfile'

export const organizationProfile = defineType({
  name: 'organizationProfile',
  title: 'Organization Profile',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'public', title: 'Public facts'},
    {name: 'localization', title: 'Localized descriptions'},
    {name: 'review', title: 'Approval'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'legalName', title: 'Legal Name', type: 'string', group: 'identity'}),
    defineField({
      name: 'canonicalWebsite',
      title: 'Canonical Website',
      type: 'url',
      group: 'identity',
      validation: (rule) =>
        rule
          .required()
          .custom((url) =>
            url === 'https://hivevaultarc.com'
              ? true
              : 'The canonical company website is locked to https://hivevaultarc.com.',
          ),
    }),
    defineField({
      name: 'logo',
      title: 'Approved Logo',
      type: 'image',
      group: 'identity',
      options: {hotspot: false},
      validation: (rule) => rule.custom(requireWebpImage),
    }),
    defineField({
      name: 'descriptions',
      title: 'Localized Descriptions',
      type: 'internationalizedArrayText',
      group: 'localization',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicEmail',
      title: 'Approved Public Email',
      type: 'email',
      group: 'public',
    }),
    defineField({
      name: 'publicTelephone',
      title: 'Approved Public Telephone',
      type: 'string',
      group: 'public',
    }),
    defineField({
      name: 'locations',
      title: 'Public Locations',
      type: 'array',
      group: 'public',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      group: 'public',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'sameAs',
      title: 'Approved Public Profiles',
      type: 'array',
      group: 'public',
      of: [defineArrayMember({type: 'url'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'approvedForPublicUse',
      title: 'Approved for Public Use',
      description:
        'Only approved facts may be consumed by public company and structured-data queries.',
      type: 'boolean',
      group: 'review',
      initialValue: false,
    }),
    defineField({name: 'reviewedBy', title: 'Reviewed By', type: 'string', group: 'review'}),
    defineField({name: 'reviewedAt', title: 'Reviewed At', type: 'date', group: 'review'}),
  ],
  validation: (rule) =>
    rule.custom((document) => {
      if (!document?.approvedForPublicUse) return true
      if (!(document.reviewedBy && document.reviewedAt)) {
        return 'Public use requires a reviewer and review date.'
      }
      const descriptions = (document.descriptions ?? []) as Array<{
        _key?: string
        value?: string
      }>
      const missing = ['en', 'fr', 'es', 'ar'].filter(
        (locale) => !descriptions.some((item) => item._key === locale && item.value?.trim()),
      )
      return missing.length === 0
        ? true
        : `Public use requires approved descriptions for: ${missing.join(', ')}.`
    }),
  preview: {select: {title: 'brandName', subtitle: 'legalName'}},
})
