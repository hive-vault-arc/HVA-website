'use client';

import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';

import {ArrowDown, ArrowUpRight} from '@/components/icons';
import type {AppLocale} from '@/i18n/config';
import {Link} from '@/i18n/navigation';
import {
  type InsightCollectionCursor,
  type InsightCollectionItem,
  type InsightCollectionType,
  type InsightIndustry,
  type PaginatedInsightCollection,
} from '@/lib/insight-collection-pagination';
import {isSanityCdnImage} from '@/lib/image-delivery';

import BottomCTA from './BottomCTA';
import SectionBrandMark from './SectionBrandMark';

type BottomCtaConfig = {
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'light';
};

type Props = {
  collectionType: InsightCollectionType;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  description: string;
  initialPage: PaginatedInsightCollection;
  industries: InsightIndustry[];
  backHref?: string;
  backLabel?: string;
  emptyMessage?: string;
  evidenceLabel?: string;
  bottomCta?: BottomCtaConfig;
};

function formatDate(iso: string, locale: AppLocale) {
  if (!iso) return '';

  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function requestUrl({
  locale,
  collectionType,
  industryId,
  cursor,
}: {
  locale: AppLocale;
  collectionType: InsightCollectionType;
  industryId: string;
  cursor: InsightCollectionCursor | null;
}) {
  const params = new URLSearchParams({
    locale,
    type: collectionType,
  });

  if (industryId) params.set('industry', industryId);
  if (cursor) {
    params.set('cursorDate', cursor.date);
    params.set('cursorId', cursor.id);
  }

  return `/api/insight-collections?${params.toString()}`;
}

function PublicationImage({
  item,
  priority = false,
}: {
  item: InsightCollectionItem;
  priority?: boolean;
}) {
  const t = useTranslations('CollectionUi');

  return (
    <div className="insight-index-v2__media">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized={isSanityCdnImage(item.image)}
          className="insight-index-v2__image insights-card-image"
          sizes={
            priority
              ? '(max-width: 900px) 100vw, 58vw'
              : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'
          }
        />
      ) : (
        <div className="insight-index-v2__placeholder">
          <SectionBrandMark size="sm" />
          <span>{t(`types.${item.type}`)}</span>
        </div>
      )}
    </div>
  );
}

function PublicationMeta({
  item,
  locale,
  industries,
}: {
  item: InsightCollectionItem;
  locale: AppLocale;
  industries: InsightIndustry[];
}) {
  const t = useTranslations('CollectionUi');
  const primaryLabel =
    industries.find((industry) => industry.id === item.industry?.id)?.title ??
    item.industry?.title ??
    t(`types.${item.type}`);
  const secondaryLabel =
    item.readTime ??
    item.deploymentStatus ??
    formatDate(item.date, locale);

  return (
    <div className="insight-index-v2__meta">
      <span>{primaryLabel}</span>
      {secondaryLabel ? <span>{secondaryLabel}</span> : null}
    </div>
  );
}

function FeaturedPublication({
  item,
  locale,
  evidenceLabel,
  industries,
}: {
  item: InsightCollectionItem;
  locale: AppLocale;
  evidenceLabel?: string;
  industries: InsightIndustry[];
}) {
  const t = useTranslations('CollectionUi');

  return (
    <article className="insight-index-v2__feature">
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="insight-index-v2__feature-link"
      >
        <PublicationImage item={item} priority />
        <div className="insight-index-v2__feature-copy">
          <div>
            <div className="insight-index-v2__feature-heading">
              <span>{t('featured')}</span>
              <span>{formatDate(item.date, locale)}</span>
            </div>
            <PublicationMeta
              item={item}
              locale={locale}
              industries={industries}
            />
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            {item.hasClientEvidence && evidenceLabel ? (
              <span className="case-evidence-marker">{evidenceLabel}</span>
            ) : null}
          </div>
          <span className="insight-index-v2__read-link">
            {t('read')}
            <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function PublicationCard({
  item,
  locale,
  evidenceLabel,
  industries,
}: {
  item: InsightCollectionItem;
  locale: AppLocale;
  evidenceLabel?: string;
  industries: InsightIndustry[];
}) {
  const t = useTranslations('CollectionUi');

  return (
    <article className="insight-index-v2__card">
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="insight-index-v2__card-link"
      >
        <PublicationImage item={item} />
        <div className="insight-index-v2__card-copy">
          <PublicationMeta
            item={item}
            locale={locale}
            industries={industries}
          />
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
          {item.hasClientEvidence && evidenceLabel ? (
            <span className="case-evidence-marker">{evidenceLabel}</span>
          ) : null}
          <div className="insight-index-v2__card-footer">
            <span>
              {item.authorName || formatDate(item.date, locale)}
            </span>
            <span aria-hidden="true">
              {t('read')}
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function InsightIndexPage({
  collectionType,
  eyebrow,
  headline,
  headlineItalic,
  description,
  initialPage,
  industries,
  backHref,
  backLabel,
  emptyMessage,
  evidenceLabel,
  bottomCta,
}: Props) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('CollectionUi');
  const defaultCta = useTranslations('InsightsHub.bottomCta');
  const abortRef = useRef<AbortController | null>(null);
  const [items, setItems] = useState(initialPage.items);
  const [total, setTotal] = useState(initialPage.total);
  const [cursor, setCursor] = useState(initialPage.nextCursor);
  const [hasFallbackContent, setHasFallbackContent] = useState(
    initialPage.hasFallbackContent,
  );
  const [activeIndustry, setActiveIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  async function fetchPage(
    nextIndustry: string,
    nextCursor: InsightCollectionCursor | null,
  ) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        requestUrl({
          locale,
          collectionType,
          industryId: nextIndustry,
          cursor: nextCursor,
        }),
        {signal: controller.signal},
      );
      if (!response.ok) throw new Error('Collection request failed.');

      const page = (await response.json()) as PaginatedInsightCollection;
      startTransition(() => {
        if (nextCursor === null) {
          setItems(page.items);
        } else {
          setItems((current) => {
            const knownIds = new Set(current.map((item) => item.id));
            return [
              ...current,
              ...page.items.filter((item) => !knownIds.has(item.id)),
            ];
          });
        }
        setTotal(page.total);
        setCursor(page.nextCursor);
        setHasFallbackContent(page.hasFallbackContent);
      });
      return true;
    } catch (requestError) {
      if (
        requestError instanceof DOMException &&
        requestError.name === 'AbortError'
      ) {
        return false;
      }
      setError(true);
      return false;
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setLoading(false);
      }
    }
  }

  async function chooseIndustry(industryId: string) {
    if (industryId === activeIndustry || loading) return;

    const previousIndustry = activeIndustry;
    setActiveIndustry(industryId);
    const succeeded = await fetchPage(industryId, null);
    if (!succeeded) setActiveIndustry(previousIndustry);
  }

  async function loadMore() {
    if (!cursor || loading) return;
    await fetchPage(activeIndustry, cursor);
  }

  const featured = items[0];
  const cards = items.slice(1);
  const canLoadMore = items.length < total && cursor !== null;
  const resolvedBottomCta = bottomCta ?? {
    headline: defaultCta('title'),
    subtext: defaultCta('description'),
    primaryLabel: defaultCta('primary'),
    primaryHref: '/contact',
    secondaryLabel: defaultCta('secondary'),
    secondaryHref: '/capabilities',
  };

  return (
    <main className="insight-index-v2">
      <section className="insight-index-v2__hero" aria-labelledby="insight-index-title">
        <div className="site-frame-wide insight-index-v2__hero-grid">
          <div className="insight-index-v2__hero-title">
            <div className="insight-index-v2__brand-line">
              <SectionBrandMark size="sm" />
              <span>{eyebrow}</span>
            </div>
            <h1 id="insight-index-title">
              {headline}
              <span>{headlineItalic}</span>
            </h1>
          </div>
          <div className="insight-index-v2__hero-context">
            <p>{description}</p>
            <div className="insight-index-v2__hero-stat">
              <strong>{total.toString().padStart(2, '0')}</strong>
              <span>{t('publishedCount', {count: total})}</span>
            </div>
            <a href="#publication-index" className="insight-index-v2__browse-link">
              {t('browseLatest')}
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {hasFallbackContent ? (
        <aside className="site-frame-wide insight-index-v2__fallback">
          <strong>EN</strong>
          <span>
            <b>{t('englishCatalogueTitle')}</b>
            {t('englishCatalogueDescription')}
          </span>
        </aside>
      ) : null}

      <section
        id="publication-index"
        className="site-frame-wide insight-index-v2__collection"
        aria-busy={loading}
      >
        <header className="insight-index-v2__collection-header">
          <div>
            {backHref ? (
              <Link href={backHref} className="insight-index-v2__back-link">
                {backLabel ?? t('allInsights')}
              </Link>
            ) : null}
            <p>{t('showingCount', {shown: items.length, total})}</p>
          </div>

          {industries.length > 0 ? (
            <div className="insight-index-v2__filters">
              <label htmlFor={`industry-filter-${collectionType}`}>
                {t('industryFilter')}
              </label>
              <select
                id={`industry-filter-${collectionType}`}
                value={activeIndustry}
                disabled={loading}
                onChange={(event) => chooseIndustry(event.target.value)}
              >
                <option value="">{t('all')}</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.title}
                  </option>
                ))}
              </select>
              <div className="insight-index-v2__filter-buttons">
                <button
                  type="button"
                  data-active={activeIndustry === ''}
                  aria-pressed={activeIndustry === ''}
                  disabled={loading}
                  onClick={() => chooseIndustry('')}
                >
                  {t('all')}
                </button>
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    type="button"
                    data-active={activeIndustry === industry.id}
                    aria-pressed={activeIndustry === industry.id}
                    disabled={loading}
                    onClick={() => chooseIndustry(industry.id)}
                  >
                    {industry.title}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        {featured ? (
          <>
            <FeaturedPublication
              item={featured}
              locale={locale}
              evidenceLabel={evidenceLabel}
              industries={industries}
            />
            {cards.length > 0 ? (
              <div className="insight-index-v2__grid">
                {cards.map((item) => (
                  <PublicationCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    evidenceLabel={evidenceLabel}
                    industries={industries}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="insight-index-v2__empty">
            <SectionBrandMark size="sm" />
            <h2>{emptyMessage ?? t('defaultEmpty')}</h2>
            <p>{t('emptyDescription')}</p>
          </div>
        )}

        {canLoadMore || error ? (
          <div className="insight-index-v2__load-zone" aria-live="polite">
            {error ? <p>{t('loadError')}</p> : null}
            <button
              type="button"
              className="btn-secondary sharp-edge"
              disabled={loading}
              onClick={loadMore}
            >
              {loading ? t('loading') : error ? t('tryAgain') : t('loadMore')}
              <ArrowDown aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </section>

      <BottomCTA
        variant={resolvedBottomCta.variant ?? 'dark'}
        revealImmediately
        headline={resolvedBottomCta.headline}
        subtext={resolvedBottomCta.subtext}
        primaryLabel={resolvedBottomCta.primaryLabel}
        primaryHref={resolvedBottomCta.primaryHref}
        secondaryLabel={resolvedBottomCta.secondaryLabel}
        secondaryHref={resolvedBottomCta.secondaryHref}
      />
    </main>
  );
}
