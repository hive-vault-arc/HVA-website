import {defineDocuments, defineLocations} from 'sanity/presentation'
import {
  DOCUMENT_ROUTE_TEMPLATES,
  PAGE_ROUTE_TEMPLATES,
  routeForDocument,
  routeForPage,
  type ContentLocale,
  type PageRouteKey,
  type RoutedDocumentType,
} from './content-route-contract'

const documentTypes = Object.keys(DOCUMENT_ROUTE_TEMPLATES) as RoutedDocumentType[]
const locales = ['en', 'fr', 'es', 'ar'] as const
const localeRoute = (locale: ContentLocale, path: string) =>
  `${locale === 'en' ? '' : `/${locale}`}${path}` || '/'

export const mainDocuments = defineDocuments([
  ...documentTypes.flatMap((documentType) =>
    locales.map((locale) => ({
      route: localeRoute(locale, DOCUMENT_ROUTE_TEMPLATES[documentType][locale]).replace(
        '[slug]',
        ':slug',
      ),
      filter: `_type == $type && language == $language && slug.current == $slug`,
      params: {type: documentType, language: locale},
    })),
  ),
  ...(Object.keys(PAGE_ROUTE_TEMPLATES) as PageRouteKey[]).flatMap((routeKey) =>
    locales.map((locale) => ({
      route: routeForPage(routeKey, locale),
      filter: `_type == "pageOptimization" && routeKey == $routeKey && language == $language`,
      params: {routeKey, language: locale},
    })),
  ),
])

const documentLocations = defineLocations({
  select: {title: 'title', name: 'name', type: '_type', language: 'language', slug: 'slug.current'},
  resolve: (document) => {
    if (!document) return null
    const {type, language, slug} = document
    if (!documentTypes.includes(type as RoutedDocumentType) || !language || !slug) return null
    return {
      locations: [
        {
          title: document.title || document.name || 'Untitled document',
          href: routeForDocument(type as RoutedDocumentType, language as ContentLocale, slug),
        },
      ],
    }
  },
})

const pageLocations = defineLocations({
  select: {routeKey: 'routeKey', language: 'language'},
  resolve: (document) => {
    if (!document) return null
    const {routeKey, language} = document
    if (!routeKey || !language || !(routeKey in PAGE_ROUTE_TEMPLATES)) return null
    return {
      locations: [
        {
          title: routeKey,
          href: routeForPage(routeKey as PageRouteKey, language as ContentLocale),
        },
      ],
    }
  },
})

const industryLocations = defineLocations({
  select: {title: 'title', language: 'language', slug: 'slug.current'},
  resolve: (document) => {
    if (!document?.language) return null
    const route = routeForPage('industries', document.language as ContentLocale)
    return {
      locations: [
        {
          title: document.title || 'Industry',
          href: document.slug ? `${route}#${encodeURIComponent(document.slug)}` : route,
        },
      ],
    }
  },
})

export const locations = {
  ...Object.fromEntries(documentTypes.map((type) => [type, documentLocations])),
  industry: industryLocations,
  pageOptimization: pageLocations,
}
