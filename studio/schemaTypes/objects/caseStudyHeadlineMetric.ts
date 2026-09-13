import {ChartUpwardIcon} from '@sanity/icons'
import {defineField, defineType, type ValidationContext} from 'sanity'

const APPROVED_STATUS = 'approved'
const RANGE_TYPES = new Set(['numberRange', 'percentageRange', 'multiplierRange'])

type MetricParent = {
  valueType?: string
  minimum?: number
  basis?: string
  publicationStatus?: string
}

function requiredForScalar(value: number | undefined, context: ValidationContext) {
  const parent = context.parent as MetricParent | undefined
  if (RANGE_TYPES.has(parent?.valueType ?? '')) return true
  return typeof value === 'number' && Number.isFinite(value) ? true : 'Add the metric value.'
}

function requiredForRange(value: number | undefined, context: ValidationContext) {
  const parent = context.parent as MetricParent | undefined
  if (!RANGE_TYPES.has(parent?.valueType ?? '')) return true
  return typeof value === 'number' && Number.isFinite(value) ? true : 'Add both ends of the range.'
}

function validRangeMaximum(value: number | undefined, context: ValidationContext) {
  const parent = context.parent as MetricParent | undefined
  const required = requiredForRange(value, context)
  if (required !== true || typeof value !== 'number' || typeof parent?.minimum !== 'number') {
    return required
  }

  return value > parent.minimum ? true : 'The maximum must be greater than the minimum.'
}

function requiredWhenApproved(message: string) {
  return (value: unknown, context: ValidationContext) => {
    const parent = context.parent as MetricParent | undefined
    if (parent?.publicationStatus !== APPROVED_STATUS) return true
    return typeof value === 'string' && value.trim().length > 0 ? true : message
  }
}

function requiredForApprovedPerformance(value: unknown, context: ValidationContext) {
  const parent = context.parent as MetricParent | undefined
  if (parent?.publicationStatus !== APPROVED_STATUS || parent?.basis === 'systemScope') {
    return true
  }

  return typeof value === 'string' && value.trim().length > 0
    ? true
    : 'Record the approval date for a public performance figure.'
}

export const caseStudyHeadlineMetric = defineType({
  name: 'caseStudyHeadlineMetric',
  title: 'Case Study Headline Metric',
  type: 'object',
  icon: ChartUpwardIcon,
  description:
    'A structured number shown in the results grid after modules, optional project evidence, and integrations. System-scope facts and performance claims are deliberately identified separately.',
  initialValue: {
    valueType: 'number',
    basis: 'systemScope',
    publicationStatus: 'notCleared',
  },
  fields: [
    defineField({
      name: 'valueType',
      title: 'Number Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Number', value: 'number'},
          {title: 'Percentage', value: 'percentage'},
          {title: 'Number range', value: 'numberRange'},
          {title: 'Percentage range', value: 'percentageRange'},
          {title: 'Multiplier', value: 'multiplier'},
          {title: 'Multiplier range', value: 'multiplierRange'},
          {title: 'Duration', value: 'duration'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      hidden: ({parent}) => RANGE_TYPES.has(parent?.valueType ?? ''),
      validation: (rule) => rule.min(0).custom(requiredForScalar),
    }),
    defineField({
      name: 'minimum',
      title: 'Range Minimum',
      type: 'number',
      hidden: ({parent}) => !RANGE_TYPES.has(parent?.valueType ?? ''),
      validation: (rule) => rule.min(0).custom(requiredForRange),
    }),
    defineField({
      name: 'maximum',
      title: 'Range Maximum',
      type: 'number',
      hidden: ({parent}) => !RANGE_TYPES.has(parent?.valueType ?? ''),
      validation: (rule) => rule.min(0).custom(validRangeMaximum),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional short unit, for example “modules”, “brands”, or “days”.',
      hidden: ({parent}) =>
        ['percentage', 'percentageRange', 'multiplier', 'multiplierRange'].includes(
          parent?.valueType ?? '',
        ),
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'label',
      title: 'Metric Title',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'text',
      rows: 2,
      description: 'A concise explanation of what the number represents.',
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'basis',
      title: 'Evidence Basis',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'System scope fact', value: 'systemScope'},
          {title: 'Verified case-study result', value: 'verifiedResult'},
          {title: 'Published benchmark', value: 'benchmark'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
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
      name: 'sourceReference',
      title: 'Source Reference',
      type: 'string',
      description:
        'Internal source for this figure. Use a CMS field, project record, or approval record; do not paste confidential correspondence.',
      hidden: ({parent}) => parent?.publicationStatus !== APPROVED_STATUS,
      validation: (rule) =>
        rule
          .max(240)
          .custom(requiredWhenApproved('Reference the source before publishing this metric.')),
    }),
    defineField({
      name: 'permissionConfirmedOn',
      title: 'Permission Confirmed On',
      type: 'date',
      hidden: ({parent}) =>
        parent?.publicationStatus !== APPROVED_STATUS || parent?.basis === 'systemScope',
      validation: (rule) => rule.custom(requiredForApprovedPerformance),
    }),
    defineField({
      name: 'permissionReference',
      title: 'Permission Reference',
      type: 'string',
      hidden: ({parent}) =>
        parent?.publicationStatus !== APPROVED_STATUS || parent?.basis === 'systemScope',
      validation: (rule) =>
        rule.max(240).custom((value, context) => {
          const parent = context.parent as MetricParent | undefined
          if (parent?.publicationStatus !== APPROVED_STATUS || parent?.basis === 'systemScope') {
            return true
          }
          return typeof value === 'string' && value.trim().length > 0
            ? true
            : 'Reference the approval record before publishing this performance figure.'
        }),
    }),
  ],
  preview: {
    select: {
      valueType: 'valueType',
      value: 'value',
      minimum: 'minimum',
      maximum: 'maximum',
      unit: 'unit',
      label: 'label',
      basis: 'basis',
      status: 'publicationStatus',
    },
    prepare({valueType, value, minimum, maximum, unit, label, basis, status}) {
      const range = RANGE_TYPES.has(valueType)
      const rawValue = range
        ? [minimum, maximum].filter((part) => part !== undefined).join('–')
        : value
      const suffix = valueType?.includes('percentage')
        ? '%'
        : valueType?.includes('multiplier')
          ? '×'
          : unit
            ? ` ${unit}`
            : ''

      return {
        title: `${rawValue ?? '—'}${suffix} — ${label ?? 'Untitled metric'}`,
        subtitle: [basis, status].filter(Boolean).join(' · '),
      }
    },
  },
})
