import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const evidenceRecord = defineType({
  name: 'evidenceRecord',
  title: 'Evidence Record',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'source', title: 'Source', default: true},
    {name: 'verification', title: 'Verification'},
    {name: 'research', title: 'Research notes'},
  ],
  fields: [
    defineField({
      name: 'claimId',
      title: 'Stable Claim ID',
      type: 'string',
      group: 'source',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {name: 'stable claim ID'})
          .custom(async (claimId, context) => {
            if (!claimId) return true
            const id = context.document?._id.replace(/^drafts\./, '') ?? ''
            const count = await context
              .getClient({apiVersion: '2026-07-23'})
              .fetch<number>(
                `count(*[_type == "evidenceRecord" && claimId == $claimId && !(_id in [$id, $draftId])])`,
                {claimId, id, draftId: `drafts.${id}`},
              )
            return count === 0 ? true : 'Claim IDs must be unique.'
          }),
    }),
    defineField({name: 'sourceTitle', title: 'Source Title', type: 'string', group: 'source'}),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      group: 'source',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({name: 'publisher', title: 'Publisher', type: 'string', group: 'source'}),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      group: 'source',
    }),
    defineField({
      name: 'classification',
      title: 'Evidence Classification',
      type: 'string',
      group: 'verification',
      options: {
        list: [
          {title: 'Operating perspective', value: 'operating-perspective'},
          {title: 'External research', value: 'external-research'},
          {title: 'First-party research', value: 'first-party-research'},
          {title: 'Approved client evidence', value: 'approved-client-evidence'},
        ],
      },
    }),
    defineField({
      name: 'verificationStatus',
      title: 'Verification Status',
      type: 'string',
      group: 'verification',
      initialValue: 'unverified',
      options: {
        list: [
          {title: 'Unverified', value: 'unverified'},
          {title: 'Verified', value: 'verified'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Expired', value: 'expired'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer',
      type: 'reference',
      group: 'verification',
      to: [{type: 'editorialContributor'}],
    }),
    defineField({name: 'reviewedAt', title: 'Reviewed At', type: 'date', group: 'verification'}),
    defineField({name: 'expiresAt', title: 'Expires At', type: 'date', group: 'verification'}),
    defineField({
      name: 'publiclyCitable',
      title: 'Approved for Public Use',
      type: 'boolean',
      group: 'verification',
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value) return true
          const reviewer = context.document?.reviewer as {_ref?: string} | undefined
          return context.document?.verificationStatus === 'verified' &&
            reviewer?._ref &&
            context.document.reviewedAt
            ? true
            : 'Public use requires verified status, a reviewer, and a review date.'
        }),
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology',
      type: 'text',
      rows: 5,
      group: 'research',
    }),
    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'text',
      rows: 4,
      group: 'research',
    }),
  ],
  validation: (rule) =>
    rule.custom((document) => {
      if (
        document?.classification === 'first-party-research' &&
        !(document?.methodology && document.limitations)
      ) {
        return 'First-party research requires methodology and limitations.'
      }
      if (!document?.publiclyCitable) return true
      const reviewer = document.reviewer as {_ref?: string} | undefined
      const requiredPublicFields = [
        document.sourceTitle,
        document.sourceUrl,
        document.publisher,
        document.publicationDate,
        reviewer?._ref,
        document.reviewedAt,
      ]
      if (
        document.verificationStatus !== 'verified' ||
        requiredPublicFields.some((value) => !value)
      ) {
        return 'Public evidence requires a complete source, verified status, reviewer, and review date.'
      }
      return !document.expiresAt || Date.parse(`${document.expiresAt}T23:59:59Z`) >= Date.now()
        ? true
        : 'Expired evidence cannot remain approved for public use.'
    }),
  preview: {
    select: {title: 'sourceTitle', claimId: 'claimId', status: 'verificationStatus'},
    prepare({title, claimId, status}) {
      return {title: title || claimId, subtitle: [claimId, status].filter(Boolean).join(' · ')}
    },
  },
})
