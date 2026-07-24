import Image from 'next/image';
import type {AppLocale} from '@/i18n/config';
import type {AppPathname} from '@/i18n/routing';
import {localizedPath} from '@/i18n/route-manifest';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import type {FaqItem} from '@/data/faqs';
import {SITE_URL, absoluteUrl} from '@/lib/seo';

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
      <main className="bg-neutral text-tertiary">
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="geo-kicker">{copy.hero.kicker}</p>
              <h1 className="editorial-title">{copy.hero.title}</h1>
              <p className="editorial-lead max-w-3xl">{copy.hero.lead}</p>
              <div className="editorial-actions">
                <Link href="/contact" className="editorial-cta sharp-edge">
                  {copy.hero.primary}
                </Link>
                <Link href={heroSecondaryHref} className="editorial-link">
                  {copy.hero.secondary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src={image}
                alt={copy.hero.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </section>

        <div className="border-y border-[#DDE3EA] bg-white">
          <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 lg:px-12 lg:py-20">
            {copy.sections.map((section, sectionIndex) => (
              <section key={section.title}>
                {section.eyebrow && <p className="geo-kicker">{section.eyebrow}</p>}
                <h2 className="services-brief-section-title">{section.title}</h2>
                <div className="mt-5 max-w-4xl space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.cards && section.cards.length > 0 && (
                  <div
                    className={`mt-7 grid gap-4 ${
                      section.cards.length === 3
                        ? 'md:grid-cols-3'
                        : section.cards.length > 3
                          ? 'md:grid-cols-2'
                          : 'md:grid-cols-2'
                    }`}
                  >
                    {section.cards.map((card, cardIndex) => (
                      <article key={card.title} className="geo-card card-hover">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                          {String(sectionIndex + 1).padStart(2, '0')} ·{' '}
                          {String(cardIndex + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-3 font-headline text-xl leading-tight text-[#1A2535]">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-secondary">{card.body}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-12">
            <h2 className="services-brief-section-title">{copy.cta.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              {copy.cta.description}
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/contact" className="editorial-cta sharp-edge">
                {copy.cta.primary}
              </Link>
              <Link href={ctaSecondaryHref} className="editorial-link">
                {copy.cta.secondary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {copy.cta.tertiary && ctaTertiaryHref && (
                <Link href={ctaTertiaryHref} className="editorial-link">
                  {copy.cta.tertiary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <FaqSection faqs={faqs.items} heading={faqs.heading} />
    </>
  );
}
