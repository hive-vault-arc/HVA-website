import {documentInternationalization} from '@sanity/document-internationalization'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {
  routeForDocument,
  routeForPage,
  type ContentLocale,
  type PageRouteKey,
  type RoutedDocumentType,
} from './content-route-contract'
import {locations, mainDocuments} from './presentation'
import {schemaTypes} from './schemaTypes'
import {
  LOCALIZED_SCHEMA_TYPES,
  STRATEGIC_SCHEMA_TYPES,
  SUPPORTED_LANGUAGES,
} from './schemaTypes/localization'
import {structure} from './structure'
import {StrategicFamilyPublishAction} from './actions/strategicFamilyPublishAction'

const websiteOrigin = process.env.SANITY_STUDIO_WEBSITE_URL || 'https://hivevaultarc.com'

function isLocalizedSchemaType(type: string) {
  return LOCALIZED_SCHEMA_TYPES.includes(type as (typeof LOCALIZED_SCHEMA_TYPES)[number])
}

export default defineConfig({
  name: 'default',
  title: 'Hive Vault Arc Content Studio',
  projectId: '0zprc9fo',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: websiteOrigin,
        previewMode: {enable: '/api/draft-mode/enable'},
      },
      resolve: {mainDocuments, locations},
    }),
    internationalizedArray({
      languages: [...SUPPORTED_LANGUAGES],
      defaultLanguages: ['en', 'fr', 'es', 'ar'],
      fieldTypes: ['string', 'text'],
    }),
    documentInternationalization({
      supportedLanguages: [...SUPPORTED_LANGUAGES],
      schemaTypes: [...LOCALIZED_SCHEMA_TYPES],
      languageField: 'language',
      weakReferences: false,
      allowCreateMetaDoc: true,
      bulkPublish: false,
      apiVersion: '2026-07-23',
      callback: async ({newDocument, client}) => {
        await client
          .patch(newDocument._id)
          .set({translationStatus: 'draft'})
          .commit({tag: 'localization.translation-created'})
      },
    }),
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter(
        (option) =>
          option.templateId !== 'organizationProfile' &&
          option.templateId !== 'strategicReleaseAudit' &&
          (!isLocalizedSchemaType(option.templateId) || option.parameters?.language === 'en'),
      ),
    actions: (previousActions, context) => {
      if (context.schemaType === 'organizationProfile') {
        return previousActions.filter(
          (action) => !['delete', 'duplicate'].includes(action.action || ''),
        )
      }
      if (context.schemaType === 'strategicReleaseAudit') {
        return previousActions.filter(
          (action) =>
            !['delete', 'duplicate', 'publish', 'unpublish'].includes(action.action || ''),
        )
      }
      if (
        STRATEGIC_SCHEMA_TYPES.includes(
          context.schemaType as (typeof STRATEGIC_SCHEMA_TYPES)[number],
        )
      ) {
        return [
          ...previousActions.filter((action) => action.action !== 'publish'),
          StrategicFamilyPublishAction,
        ]
      }
      return previousActions
    },
    productionUrl: async (previousUrl, {document}) => {
      const locale = document.language as ContentLocale | undefined
      if (!locale || !SUPPORTED_LANGUAGES.some((language) => language.id === locale)) {
        return previousUrl
      }
      if (document._type === 'pageOptimization' && typeof document.routeKey === 'string') {
        return `${websiteOrigin}${routeForPage(document.routeKey as PageRouteKey, locale)}`
      }
      const slug = (document.slug as {current?: string} | undefined)?.current
      if (
        !slug ||
        !(
          document._type in
          {
            employeeProfile: true,
            caseStudy: true,
            capability: true,
            post: true,
            newsArticle: true,
            perspective: true,
            researchReport: true,
          }
        )
      ) {
        return previousUrl
      }
      return `${websiteOrigin}${routeForDocument(document._type as RoutedDocumentType, locale, slug)}`
    },
  },
})
