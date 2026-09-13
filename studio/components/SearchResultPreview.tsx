import {useFormValue, type ObjectInputProps} from 'sanity'
import {
  DOCUMENT_ROUTE_TEMPLATES,
  PAGE_ROUTE_TEMPLATES,
  routeForDocument,
  routeForPage,
  type ContentLocale,
  type PageRouteKey,
  type RoutedDocumentType,
} from '../content-route-contract'

const websiteOrigin = process.env.SANITY_STUDIO_WEBSITE_URL || 'https://hivevaultarc.com'

export function SearchResultPreview(props: ObjectInputProps) {
  const documentType = useFormValue(['_type']) as string | undefined
  const language = useFormValue(['language']) as ContentLocale | undefined
  const slug = useFormValue(['slug', 'current']) as string | undefined
  const routeKey = useFormValue(['routeKey']) as PageRouteKey | undefined
  const title = useFormValue(['seo', 'title']) as string | undefined
  const description = useFormValue(['seo', 'description']) as string | undefined
  const direction = language === 'ar' ? 'rtl' : 'ltr'

  let route = '/'
  if (
    language &&
    documentType === 'pageOptimization' &&
    routeKey &&
    routeKey in PAGE_ROUTE_TEMPLATES
  ) {
    route = routeForPage(routeKey, language)
  } else if (language && slug && documentType && documentType in DOCUMENT_ROUTE_TEMPLATES) {
    route = routeForDocument(documentType as RoutedDocumentType, language, slug)
  }

  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      {props.renderDefault(props)}
      <section
        aria-label="Search result preview"
        dir={direction}
        style={{
          background: '#fff',
          border: '1px solid #d8dce3',
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
      >
        <div style={{color: '#202124', fontSize: '0.8rem', marginBottom: '0.25rem'}}>
          {websiteOrigin.replace(/\/$/, '')}
          {route}
        </div>
        <div style={{color: '#1a0dab', fontSize: '1.15rem', lineHeight: 1.35}}>
          {title?.trim() || 'Add an SEO title to preview this result'}
        </div>
        <div style={{color: '#4d5156', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '0.35rem'}}>
          {description?.trim() || 'Add a meta description to preview the search summary.'}
        </div>
      </section>
    </div>
  )
}
