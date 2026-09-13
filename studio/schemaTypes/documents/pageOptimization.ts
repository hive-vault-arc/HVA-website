import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {
  PAGE_ROUTE_TEMPLATES,
  routeForPage,
  type ContentLocale,
  type PageRouteKey,
} from '../../content-route-contract'
import {createEditorialFields} from '../editorialFields'
import {createLocalizationFields} from '../localization'

const routeOptions = Object.keys(PAGE_ROUTE_TEMPLATES).map((routeKey) => ({
  title: routeKey,
  value: routeKey,
}))

export const pageOptimization = defineType({
  name: 'pageOptimization',
  title: 'Page Optimization',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'route', title: 'Route', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'answer', title: 'Answer and evidence'},
    {name: 'publishing', title: 'Publishing'},
  ],
  fields: [
    ...createLocalizationFields('publishing'),
    defineField({
      name: 'routeKey',
      title: 'Route',
      description: 'Locked to a public route defined by the frontend contract.',
      type: 'string',
      group: 'route',
      readOnly: ({document}) => Boolean(document?.routeKey),
      options: {list: routeOptions},
      validation: (rule) =>
        rule.required().custom(async (routeKey, context) => {
          if (!routeKey || !context.document?.language) return true
          const id = context.document._id.replace(/^drafts\./, '')
          const duplicate = await context
            .getClient({apiVersion: '2026-07-23'})
            .fetch<number>(
              `count(*[_type == "pageOptimization" && routeKey == $routeKey && language == $language && !(_id in [$id, $draftId])])`,
              {routeKey, language: context.document.language, id, draftId: `drafts.${id}`},
            )
          return duplicate === 0
            ? true
            : 'Only one optimization record is allowed per route and locale.'
        }),
    }),
    defineField({
      name: 'searchIntent',
      title: 'Search Intent',
      type: 'text',
      rows: 3,
      group: 'answer',
      description: 'Internal editorial guidance. It is not rendered directly.',
    }),
    defineField({
      name: 'audienceNotes',
      title: 'Audience Notes',
      type: 'text',
      rows: 3,
      group: 'answer',
      description: 'Internal audience guidance. Do not include personal data.',
    }),
    ...createEditorialFields({group: 'answer'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {routeKey: 'routeKey', language: 'language', status: 'translationStatus'},
    prepare({routeKey, language, status}) {
      const route =
        routeKey && language
          ? routeForPage(routeKey as PageRouteKey, language as ContentLocale)
          : 'Route not selected'
      return {title: route, subtitle: [language, status].filter(Boolean).join(' · ')}
    },
  },
})
