import {DocumentTextIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Insights')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Insights')
            .items([
              S.documentTypeListItem('post').title('Blogs'),
              S.documentTypeListItem('newsArticle').title('News Articles'),
              S.documentTypeListItem('perspective').title('Perspectives'),
              S.documentTypeListItem('researchReport').title('Research Reports'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
            ]),
        ),
    ])
