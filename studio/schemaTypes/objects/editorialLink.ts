import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

function validateHref(value?: string) {
  if (!value) return true
  if (/^\/(?!\/)[^\s]*$/.test(value)) return true
  if (/^https?:\/\//i.test(value)) return true
  return 'Use a site-relative path or a full HTTP(S) URL.'
}

export const editorialLink = defineType({
  name: 'editorialLink',
  title: 'Editorial Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: (rule) => rule.required().custom(validateHref),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
