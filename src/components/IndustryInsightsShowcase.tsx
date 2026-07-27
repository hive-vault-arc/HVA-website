'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import Image from 'next/image';
import {useReducedMotion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/config';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from '@/components/icons';

export type IndustryInsightItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  sourceLocale: AppLocale;
};

type ProgressiveInsightImageProps = {
  item: IndustryInsightItem;
  sizes: string;
  className: string;
  viewportRef?: RefObject<HTMLDivElement | null>;
  loadImmediately?: boolean;
};

const AUTOPLAY_DELAY = 5200;

function chooseFeatured(items: IndustryInsightItem[]): IndustryInsightItem[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, 2);
}

function ProgressiveInsightImage({
  item,
  sizes,
  className,
  viewportRef,
  loadImmediately = false,
}: ProgressiveInsightImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(loadImmediately);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      {
        root: viewportRef?.current ?? null,
        rootMargin: viewportRef ? '0px 30%' : '320px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [shouldLoad, viewportRef]);

  return (
    <div ref={frameRef} className="industries-insights-image-frame">
      {shouldLoad ? (
        <Image
          src={item.image}
          alt=""
          fill
          sizes={sizes}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          unoptimized
          className={`${className}${isLoaded ? ' is-loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
    </div>
  );
}

export default function IndustryInsightsShowcase({
  items,
}: {
  readonly items: IndustryInsightItem[];
}) {
  const t = useTranslations('Industries.insights');
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const featuredItems = useMemo(() => chooseFeatured(items), [items]);
  const total = items.length;

  const moveTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      setActiveIndex((nextIndex + total) % total);
    },
    [total],
  );

  const previous = useCallback(
    () => moveTo(activeIndex - 1),
    [activeIndex, moveTo],
  );
  const next = useCallback(
    () => moveTo(activeIndex + 1),
    [activeIndex, moveTo],
  );

  useEffect(() => {
    if (activeIndex >= total) setActiveIndex(0);
  }, [activeIndex, total]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      {threshold: 0.15},
    );

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const target = viewport?.querySelector<HTMLElement>(
      `[data-industry-insight-index="${activeIndex}"]`,
    );

    if (!viewport || !target || typeof viewport.scrollTo !== 'function') return;

    viewport.scrollTo({
      left: target.offsetLeft,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex, shouldReduceMotion]);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      isPointerPaused ||
      isFocusPaused ||
      !isVisible ||
      total < 2
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [
    isFocusPaused,
    isPointerPaused,
    isVisible,
    shouldReduceMotion,
    total,
  ]);

  useEffect(
    () => () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    },
    [],
  );

  const updateIndexAfterScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      const cards = Array.from(
        viewport.querySelectorAll<HTMLElement>('[data-industry-insight-index]'),
      );
      if (cards.length === 0) return;

      const nearest = cards.reduce((closest, card) =>
        Math.abs(card.offsetLeft - viewport.scrollLeft) <
        Math.abs(closest.offsetLeft - viewport.scrollLeft)
          ? card
          : closest,
      );
      const nextIndex = Number(nearest.dataset.industryInsightIndex);
      if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
    }, 140);
  };

  if (total === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="industries-insights-showcase"
      aria-labelledby="industries-insights-heading"
      onMouseEnter={() => setIsPointerPaused(true)}
      onMouseLeave={() => setIsPointerPaused(false)}
      onFocusCapture={() => setIsFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusPaused(false);
        }
      }}
    >
      <div className="site-frame-wide">
        <header className="industries-insights-header">
          <div>
            <span className="industries-insights-eyebrow">
              {t('eyebrow')}
            </span>
            <h2 id="industries-insights-heading">{t('title')}</h2>
          </div>
          <p>{t('description')}</p>
        </header>

        <div className="industries-insights-featured">
          {featuredItems.map((item, index) => (
            <article
              key={`featured-${item.id}`}
              className="industries-insights-feature-card"
            >
              <Link
                href={item.href}
                locale={item.sourceLocale}
                prefetch={false}
                className="industries-insights-feature-link"
                aria-label={t('readInsight', {title: item.title})}
              >
                <ProgressiveInsightImage
                  item={item}
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 64px), 48vw"
                  className="industries-insights-feature-image"
                  loadImmediately
                />
                <span
                  aria-hidden="true"
                  className="industries-insights-feature-shade"
                />
                <span className="industries-insights-feature-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.tag}</span>
                </span>
                <span className="industries-insights-feature-copy">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="industries-insights-feature-arrow"
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="industries-insights-rail-heading">
          <div>
            <span>{t('railLabel')}</span>
            <span aria-live="polite">
              {t('counter', {current: activeIndex + 1, total})}
            </span>
          </div>
          {total > 1 ? (
            <div className="industries-insights-controls">
              <button type="button" onClick={previous} aria-label={t('previous')}>
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={next} aria-label={t('next')}>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        <div
          ref={viewportRef}
          className="industries-insights-viewport"
          aria-label={t('railAriaLabel')}
          aria-roledescription="carousel"
          onScroll={updateIndexAfterScroll}
        >
          <div className="industries-insights-track">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="industries-insights-rail-card"
                data-industry-insight-index={index}
                aria-label={t('slidePosition', {current: index + 1, total})}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <Link
                  href={item.href}
                  locale={item.sourceLocale}
                  prefetch={false}
                  className="industries-insights-rail-link"
                  aria-label={t('readInsight', {title: item.title})}
                >
                  <ProgressiveInsightImage
                    item={item}
                    sizes="(max-width: 639px) 84vw, (max-width: 1023px) 46vw, 31vw"
                    className="industries-insights-rail-image"
                    viewportRef={viewportRef}
                    loadImmediately={index === 0}
                  />
                  <span className="industries-insights-rail-copy">
                    <span>{item.tag}</span>
                    <strong>{item.title}</strong>
                    <span aria-hidden="true">
                      {t('read')}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
