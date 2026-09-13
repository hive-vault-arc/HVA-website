import {ImageIcon} from '@sanity/icons'
import {defineField, defineType, type ValidationContext} from 'sanity'
import {requireWebpImage} from '../webpValidation'

const APPROVED_STATUS = 'approved'

type ProjectMediaParent = {
  publicationStatus?: string
}

function requiredWhenApproved(message: string) {
  return (value: unknown, context: ValidationContext) => {
    const parent = context.parent as ProjectMediaParent | undefined
    if (parent?.publicationStatus !== APPROVED_STATUS) return true
    if (typeof value === 'string') return value.trim().length > 0 || message
    return value !== undefined && value !== null ? true : message
  }
}

export const caseStudyProjectMedia = defineType({
  name: 'caseStudyProjectMedia',
  title: 'Project Media',
  type: 'object',
  icon: ImageIcon,
  description:
    'A publication-controlled product or delivery image. Sanity image assets are publicly addressable, so upload only media cleared for the intended review or publication context.',
  initialValue: {
    deviceType: 'desktop',
    placement: 'afterArchitecture',
    evidenceType: 'fixtureBacked',
    publicationStatus: 'notCleared',
  },
  fields: [
    defineField({
      name: 'internalLabel',
      title: 'Internal Label',
      type: 'string',
      description: 'Editor-facing name for finding this image in the ordered media list.',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Use the transparent framed master. The website preserves its intrinsic ratio and never crops the device.',
      validation: (rule) => rule.required().custom(requireWebpImage),
    }),
    defineField({
      name: 'deviceType',
      title: 'Device Type',
      type: 'string',
      description:
        'Phone screenshots are automatically grouped in the optional product-evidence stage after activated modules. Wide interfaces follow their narrative placement.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Desktop or wide interface', value: 'desktop'},
          {title: 'Phone interface', value: 'phone'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placement',
      title: 'Narrative Placement',
      type: 'string',
      description:
        'Choose where a desktop or wide interface supports the story. Phone screenshots are always grouped after activated modules so every case study keeps one consistent reading order.',
      options: {
        layout: 'radio',
        list: [
          {title: 'After the business challenge', value: 'afterChallenge'},
          {title: 'After the execution architecture', value: 'afterArchitecture'},
          {title: 'After the activated modules', value: 'afterModules'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'evidenceType',
      title: 'Evidence Type',
      type: 'string',
      description:
        'Internal classification only. It prevents conceptual or illustrative screens from being described as measured production evidence.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Delivered interface', value: 'deliveredInterface'},
          {title: 'Fixture-backed interface', value: 'fixtureBacked'},
          {title: 'Conceptual interface', value: 'conceptualInterface'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the visible interface in the language of this case-study document.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'A concise editorial explanation. Do not turn visible interface values into performance claims.',
      validation: (rule) => [
        rule.max(220),
        rule.custom(
          requiredWhenApproved('A caption is required before project media can be approved.'),
        ),
      ],
    }),
    defineField({
      name: 'disclosure',
      title: 'Illustrative Data Disclosure',
      type: 'string',
      description:
        'Visible disclosure shown beside this proof group, localized to the document language.',
      validation: (rule) => [
        rule.max(180),
        rule.custom(
          requiredWhenApproved('A disclosure is required before project media can be approved.'),
        ),
      ],
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
      description:
        'Only approved media appears publicly. Not-cleared media is available only in authenticated draft preview.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Not cleared', value: 'notCleared'},
          {title: 'Approved', value: 'approved'},
          {title: 'Withdrawn', value: 'withdrawn'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permissionConfirmedOn',
      title: 'Permission Confirmed On',
      type: 'date',
      hidden: ({parent}) => parent?.publicationStatus !== APPROVED_STATUS,
      validation: (rule) =>
        rule.custom(
          requiredWhenApproved('Record the permission date before project media can be approved.'),
        ),
    }),
    defineField({
      name: 'permissionReference',
      title: 'Permission Reference',
      type: 'string',
      description:
        'Internal reference to the written approval, contract clause, or approval record. Do not paste confidential correspondence.',
      hidden: ({parent}) => parent?.publicationStatus !== APPROVED_STATUS,
      validation: (rule) =>
        rule.custom(
          requiredWhenApproved(
            'Reference the approval record before project media can be approved.',
          ),
        ),
    }),
  ],
  preview: {
    select: {
      title: 'internalLabel',
      media: 'image',
      deviceType: 'deviceType',
      placement: 'placement',
      status: 'publicationStatus',
    },
    prepare({title, media, deviceType, placement, status}) {
      const statusLabel =
        status === 'approved' ? 'Approved' : status === 'withdrawn' ? 'Withdrawn' : 'Not cleared'

      return {
        title: title || 'Project media',
        subtitle: [statusLabel, deviceType, placement].filter(Boolean).join(' - '),
        media,
      }
    },
  },
})
