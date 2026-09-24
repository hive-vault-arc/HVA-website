import type {AppLocale} from '@/i18n/config';
import type {AppPathname} from '@/i18n/routing';
import {localizedPath} from '@/i18n/route-manifest';
import {Link} from '@/i18n/navigation';
import {ArrowUpRight} from '@/components/icons';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import type {FaqItem} from '@/data/faqs';
import {SITE_URL, absoluteUrl} from '@/lib/seo';
import SectionAccent from '@/components/SectionAccent';

export type GeoCardCopy = {
  title: string;
  body: string;
};

export type GeoSectionCopy = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  cards?: GeoCardCopy[];
};

export type GeoPageCopy = {
  schemaName: string;
  schemaDescription: string;
  breadcrumb: string;
  hero: {
    kicker: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    imageAlt: string;
  };
  sections: GeoSectionCopy[];
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
    tertiary?: string;
  };
};

type GeoServicePageProps = {
  locale: AppLocale;
  pathname: AppPathname;
  image: string;
  copy: GeoPageCopy;
  faqs: {heading: string; items: FaqItem[]};
  heroSecondaryHref: AppPathname;
  ctaSecondaryHref: AppPathname;
  ctaTertiaryHref?: AppPathname;
  tangier?: boolean;
};

export default function GeoServicePage({
  locale,
  pathname,
  image,
  copy,
  faqs,
  heroSecondaryHref,
  ctaSecondaryHref,
  ctaTertiaryHref,
  tangier = false,
}: GeoServicePageProps) {
  const canonicalPath = localizedPath(pathname, locale);
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: copy.schemaName,
    provider: {'@id': `${SITE_URL}/#organization`},
    serviceType: copy.schemaName,
    areaServed: tangier
      ? [
          {'@type': 'Country', name: 'Morocco'},
          {
            '@type': 'City',
            name: 'Tangier',
            containedInPlace: {'@type': 'Country', name: 'Morocco'},
          },
        ]
      : [{'@type': 'Country', name: 'Morocco'}],
    availableLanguage: ['en', 'fr'],
    url: absoluteUrl(canonicalPath),
    description: copy.schemaDescription,
    image: absoluteUrl(image),
    inLanguage: locale,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'fr' ? 'Accueil' : 'Home',
        item: absoluteUrl(localizedPath('/', locale)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: copy.breadcrumb,
        item: absoluteUrl(canonicalPath),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />
      <main className="geo-article-page">
        <section className="geo-article-hero">
          <div className="site-frame-narrow geo-article-hero-inner">
            <nav className="geo-article-breadcrumb" aria-label={copy.breadcrumb}>
              <Link href="/">{locale === 'fr' ? 'Accueil' : 'Home'}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{copy.breadcrumb}</span>
            </nav>

            <div className="geo-article-meta">
              <SectionAccent size="sm" />
              <span>{copy.hero.kicker}</span>
              <span className="geo-article-meta-dot" aria-hidden="true" />
              <span className="geo-article-meta-muted">{copy.breadcrumb}</span>
            </div>

            <h1>{copy.hero.title}</h1>
            <p className="geo-article-subtitle">{copy.hero.lead}</p>

            <div className="geo-article-author">
              <SectionAccent size="sm" />
              <div>
                <strong>{copy.schemaName}</strong>
                <span>{copy.hero.kicker}</span>
              </div>
            </div>

            <div className="geo-article-actions">
              <Link href="/contact" className="geo-article-primary-action sharp-edge">
                {copy.hero.primary}
              </Link>
              <Link href={heroSecondaryHref} className="geo-article-text-action">
                {copy.hero.secondary}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="site-frame-narrow geo-article-body">
          <div className="geo-article-grid">
            <aside className="geo-article-sidebar">
              <div className="geo-article-sidebar-sticky">
                <p className="geo-article-sidebar-label">{copy.hero.kicker}</p>
                <nav aria-label={copy.breadcrumb}>
                  <ol>
                    {copy.sections.map((section, index) => (
                      <li key={section.title}>
                        <a href={`#geo-article-section-${index + 1}`}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="geo-article-sidebar-cta">
                  <p>{copy.breadcrumb}</p>
                  <h2>{copy.cta.title}</h2>
                  <p className="geo-article-sidebar-cta-copy">{copy.cta.description}</p>
                  <Link href="/contact" className="geo-article-sidebar-cta-link">
                    {copy.cta.primary}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>

            <article className="geo-article-main">
              {copy.sections.map((section, sectionIndex) => {
                const firstParagraph = section.paragraphs[0];
                const remainingParagraphs = section.paragraphs.slice(1);

                return (
                  <section
                    key={section.title}
                    id={`geo-article-section-${sectionIndex + 1}`}
                    className={`geo-article-section geo-article-section--${sectionIndex % 3}`}
                  >
                    <div className="geo-article-section-meta">
                      <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                      <span>{section.eyebrow || copy.hero.kicker}</span>
                    </div>
                    <h2>{section.title}</h2>
                    <div className="geo-article-paragraphs">
                      {firstParagraph && <p className="geo-article-intro-copy">{firstParagraph}</p>}
                      {remainingParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.cards && section.cards.length > 0 && (
                      <div className="geo-article-card-grid">
                        {section.cards.map((card, cardIndex) => (
                          <article key={card.title} className="geo-article-card">
                            <div className="geo-article-card-mark" aria-hidden="true" />
                            <div className="geo-article-card-index">
                              {String(sectionIndex + 1).padStart(2, '0')} /{' '}
                              {String(cardIndex + 1).padStart(2, '0')}
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.body}</p>
                          </article>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </article>
          </div>
        </section>

        <section className="geo-article-cta">
          <div className="site-frame-narrow geo-article-cta-grid">
            <div>
              <p className="geo-article-cta-kicker">{copy.breadcrumb}</p>
              <h2>{copy.cta.title}</h2>
            </div>
            <div>
              <p className="geo-article-cta-description">{copy.cta.description}</p>
              <div className="geo-article-actions">
                <Link href="/contact" className="geo-article-primary-action geo-article-primary-action--light sharp-edge">
                  {copy.cta.primary}
                </Link>
                <Link href={ctaSecondaryHref} className="geo-article-text-action geo-article-text-action--light">
                  {copy.cta.secondary}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {copy.cta.tertiary && ctaTertiaryHref && (
                  <Link href={ctaTertiaryHref} className="geo-article-text-action geo-article-text-action--light">
                    {copy.cta.tertiary}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FaqSection faqs={faqs.items} heading={faqs.heading} />
    </>
  );
}
