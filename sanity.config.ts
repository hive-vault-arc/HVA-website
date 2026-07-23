import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const websiteOrigin = process.env.SANITY_STUDIO_WEBSITE_URL || 'https://hivevaultarc.com'

export default defineConfig({
  name: 'default',
  title: 'HVA-website-studio',

  projectId: '0zprc9fo',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: (previousUrl, {document}) => {
      const slug = (document.slug as {current?: string} | undefined)?.current
      if (!slug) return previousUrl

      if (document?._type === 'employeeProfile') {
        return `${websiteOrigin}/aboutus/our-people/${encodeURIComponent(slug)}`
      }

      if (document?._type === 'caseStudy') {
        return `${websiteOrigin}/case-studies/${encodeURIComponent(slug)}`
      }

      return previousUrl
    },
  },
})
