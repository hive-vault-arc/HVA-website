import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0zprc9fo',
    dataset: 'production',
  },
  deployment: {
    appId: 'lapr0h1bhgg67wsql9ciytpc',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    path: '../src/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../src/sanity/sanity.types.ts',
    overloadClientMethods: true,
  },
})
