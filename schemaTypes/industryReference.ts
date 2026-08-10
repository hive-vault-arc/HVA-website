import {defineField} from 'sanity'

export function createIndustryReferenceField() {
  return defineField({
    name: 'industryRef',
    title: 'Industry (optional)',
    type: 'reference',
    description:
      'Choose the visitor-facing industry used to classify and filter this publication. Leave empty when the publication is cross-industry.',
    to: [{type: 'industry'}],
    options: {
      filter: ({document}) => ({
        filter: 'language == $language',
        params: {language: document.language ?? 'en'},
      }),
    },
  })
}
