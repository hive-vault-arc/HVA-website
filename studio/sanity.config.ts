import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {
  documentInternationalization,
  useDeleteTranslationAction,
  useDuplicateWithTranslationsAction,
} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {LOCALIZED_SCHEMA_TYPES, SUPPORTED_LANGUAGES} from './schemaTypes/localization'

const websiteOrigin = process.env.SANITY_STUDIO_WEBSITE_URL || 'https://hivevaultarc.com'

export default defineConfig({
  name: 'default',
  title: 'HVA-website-studio',

  projectId: '0zprc9fo',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: websiteOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
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

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter(
        (option) =>
          !LOCALIZED_SCHEMA_TYPES.includes(
            option.templateId as (typeof LOCALIZED_SCHEMA_TYPES)[number],
          ) || option.parameters?.language === 'en',
      ),
    actions: (previousActions, context) =>
      LOCALIZED_SCHEMA_TYPES.includes(context.schemaType as (typeof LOCALIZED_SCHEMA_TYPES)[number])
        ? [...previousActions, useDeleteTranslationAction, useDuplicateWithTranslationsAction]
        : previousActions,
    productionUrl: (previousUrl, {document}) => {
      const slug = (document.slug as {current?: string} | undefined)?.current
      if (!slug) return previousUrl
      const language = document.language === 'fr' ? 'fr' : 'en'

      const localizedPath = (englishPath: string, frenchPath: string) =>
        `${websiteOrigin}${language === 'fr' ? `/fr${frenchPath}` : englishPath}`

      if (document?._type === 'employeeProfile') {
        return localizedPath(
          `/aboutus/our-people/${encodeURIComponent(slug)}`,
          `/qui-sommes-nous/equipe/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'caseStudy') {
        return localizedPath(
          `/case-studies/${encodeURIComponent(slug)}`,
          `/etudes-de-cas/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'capability') {
        return localizedPath(
          `/capabilities/${encodeURIComponent(slug)}`,
          `/expertises/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'post') {
        return localizedPath(
          `/blog/${encodeURIComponent(slug)}`,
          `/blog/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'newsArticle') {
        return localizedPath(
          `/insights/news-articles/${encodeURIComponent(slug)}`,
          `/publications/actualites/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'perspective') {
        return localizedPath(
          `/insights/perspectives/${encodeURIComponent(slug)}`,
          `/publications/perspectives/${encodeURIComponent(slug)}`,
        )
      }

      if (document?._type === 'researchReport') {
        return localizedPath(
          `/insights/research-reports/${encodeURIComponent(slug)}`,
          `/publications/rapports-de-recherche/${encodeURIComponent(slug)}`,
        )
      }

      return previousUrl
    },
  },
})
