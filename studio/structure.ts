import {DocumentTextIcon, TagIcon, UserIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Capabilities')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('capability')
            .title('Capabilities')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Industries')
        .icon(TagIcon)
        .child(
          S.documentTypeList('industry')
            .title('Industries')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('People')
        .icon(UserIcon)
        .child(
          S.documentTypeList('employeeProfile')
            .title('People')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.divider(),
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
