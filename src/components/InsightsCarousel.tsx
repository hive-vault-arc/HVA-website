'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '@/lib/image-delivery';

export type InsightsCarouselItem = {
  id: string;
  type: 'blog' | 'case-study';
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  sourceLocale: AppLocale;
};

type InsightsCarouselProps = {
  items: InsightsCarouselItem[];
};

function InsightCard({
  item,
  featured,
}: {
  item: InsightsCarouselItem;
  featured?: boolean;
}) {
  const t = useTranslations('InsightsCarousel');
  const currentLocale = useLocale() as AppLocale;

  return (
    <article className={featured ? 'home-insight-card home-insight-card--featured' : 'home-insight-card'}>
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="home-insight-card__media"
        aria-label={item.title}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            quality={90}
            unoptimized={isSanityCdnImage(item.image)}
            sizes={featured
              ? '(max-width: 860px) 100vw, 58vw'
              : '(max-width: 860px) 100vw, 30vw'}
            className="object-cover"
          />
        ) : (
          <span className="home-insight-card__fallback" aria-hidden="true" />
        )}
      </Link>

      <div className="home-insight-card__body">
        <p className="home-insight-card__meta">
          <span>{item.type === 'blog' ? t('article') : t('caseStudy')}</span>
          <span>{item.tag}</span>
          <time>{item.date}</time>
        </p>
        {item.sourceLocale !== currentLocale ? (
          <p className="home-insight-card__language">{t('availableInEnglish')}</p>
        ) : null}
        <h3>{item.title}</h3>
        <p className="home-insight-card__excerpt">{item.excerpt}</p>
        <Link href={item.href} locale={item.sourceLocale} className="home-insight-card__link">
          {t('learnMore')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function InsightsCarousel({items}: InsightsCarouselProps) {
  const t = useTranslations('InsightsCarousel');
  const visibleItems = items.slice(0, 3);

  if (!visibleItems.length) return null;

  return (
    <section className="home-insights-editorial" aria-labelledby="home-insights-title">
      <div className="site-frame-wide">
        <header className="home-insights-editorial__header">
          <div>
            <div className="home-insights-editorial__eyebrow">
              <span aria-hidden="true" />
              <p>{t('eyebrow')}</p>
            </div>
            <h2 id="home-insights-title">
              {t('title')} <em>{t('titleAccent')}</em>
            </h2>
          </div>
          <div className="home-insights-editorial__intro">
            <p>{t('description')}</p>
            <Link href="/insights">
              {t('viewAll')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className="home-insights-editorial__grid">
          <InsightCard item={visibleItems[0]} featured />
          <div className="home-insights-editorial__secondary">
            {visibleItems.slice(1).map((item) => (
              <InsightCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
