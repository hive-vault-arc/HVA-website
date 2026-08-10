import {ChartUpwardIcon} from '@sanity/icons'
import {defineField, defineType, type ValidationContext} from 'sanity'

const APPROVED_STATUS = 'approved'

type OutcomeParent = {
  publicationStatus?: string
}

function requiredWhenApproved(message: string) {
  return (value: unknown, context: ValidationContext) => {
    const parent = context.parent as OutcomeParent | undefined
    if (parent?.publicationStatus !== APPROVED_STATUS) return true
    if (typeof value === 'string') return value.trim().length > 0 || message
    return value !== undefined && value !== null ? true : message
  }
}

export const publishedCaseStudyOutcome = defineType({
  name: 'publishedCaseStudyOutcome',
  title: 'Published Case Study Outcome',
  type: 'object',
  icon: ChartUpwardIcon,
  description:
    'A publication-controlled outcome. Use only figures the client or project owner has explicitly cleared for public use.',
  initialValue: {
    scope: 'caseStudy',
    category: 'other',
    publicationStatus: 'notCleared',
  },
  fields: [
    defineField({
      name: 'scope',
      title: 'Outcome Group',
      type: 'string',
      description:
        'Benchmarks appear in the overview row. Case-study results appear inside the named-system panel.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Program benchmark', value: 'benchmark'},
          {title: 'Named case-study result', value: 'caseStudy'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Outcome Category',
      type: 'string',
      description: 'Semantic classification used for filtering and future reporting.',
      options: {
        list: [
          {title: 'Response time', value: 'responseTime'},
          {title: 'Conversion', value: 'conversion'},
          {title: 'Visibility', value: 'visibility'},
          {title: 'Throughput', value: 'throughput'},
          {title: 'Cycle time', value: 'cycleTime'},
          {title: 'Operating margin', value: 'operatingMargin'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Published Value',
      type: 'string',
      description: 'Keep the value concise, for example “40%” or “3–6x”.',
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: 'label',
      title: 'Outcome Label',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'context',
      title: 'Measurement Context',
      type: 'text',
      rows: 3,
      description:
        'Explain what changed without extending the claim beyond the approved measurement.',
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
      description:
        'Only approved outcomes with a permission date and reference are returned by public website queries.',
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
          requiredWhenApproved('Record the approval date before publishing this outcome.'),
        ),
    }),
    defineField({
      name: 'permissionReference',
      title: 'Permission Reference',
      type: 'string',
      description:
        'Internal reference to the approval record. Do not paste confidential correspondence.',
      hidden: ({parent}) => parent?.publicationStatus !== APPROVED_STATUS,
      validation: (rule) =>
        rule
          .max(240)
          .custom(
            requiredWhenApproved('Reference the approval record before publishing this outcome.'),
          ),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
      scope: 'scope',
      status: 'publicationStatus',
    },
    prepare({value, label, scope, status}) {
      const statusLabel =
        status === 'approved' ? 'Approved' : status === 'withdrawn' ? 'Withdrawn' : 'Not cleared'
      const scopeLabel = scope === 'benchmark' ? 'Benchmark' : 'Case result'

      return {
        title: [value, label].filter(Boolean).join(' — ') || 'Case study outcome',
        subtitle: [scopeLabel, statusLabel].join(' - '),
      }
    },
  },
})
