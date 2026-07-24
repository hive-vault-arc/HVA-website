'use client';

import { useCallback, useRef, useState, type TouchEvent } from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
} from '@/components/icons';

type SlideCopy = {
  eyebrow: string;
  titleLead: string[];
  titleAccent: string;
  titleVariant?: 'compact';
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  imageAlt: string;
};

type Slide = SlideCopy & {
  primaryHref: string;
  secondaryHref: string;
  image: string;
  imageMode?: 'contain';
};

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: '0%',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
  }),
};

const SLIDE_TRANSITION = {
  duration: 0.62,
  ease: [0.76, 0, 0.24, 1] as const,
};

const SLIDE_CONFIG: Array<
  Pick<Slide, 'primaryHref' | 'secondaryHref' | 'image' | 'imageMode' | 'titleVariant'>
> = [
  {
    primaryHref: '/contact',
    secondaryHref: '/capabilities',
    image: '/Images/hero/hva-architectural-system-hero-transparent.png',
    imageMode: 'contain',
  },
  {
    primaryHref: '/contact',
    secondaryHref: '/aboutus',
    image: '/Images/hero/hva-strategic-guidance-3d-transparent.webp',
    imageMode: 'contain',
  },
  {
    titleVariant: 'compact',
    primaryHref: '/case-studies',
    secondaryHref: '/capabilities',
    image: '/Images/hero/hva-ai-orchestration-3d-transparent.webp',
    imageMode: 'contain',
  },
  {
    titleVariant: 'compact',
    primaryHref: '/capabilities',
    secondaryHref: '/case-studies',
    image: '/Images/hero/hva-arc-production-command-3d-transparent.webp',
    imageMode: 'contain',
  },
];

export default function HeroSlider() {
  const t = useTranslations('HomeHero');
  const slideCopy = t.raw('slides') as SlideCopy[];
  const slides: Slide[] = SLIDE_CONFIG.map((config, index) => ({
    ...config,
    ...slideCopy[index],
  }));
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef(0);

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setActive((previous) => (previous + dir + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const delta = touchStartX.current - (event.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1);
  };

  const slide = slides[active];
  if (!slide) return null;

  const titleClassName = [
    'home-hero-title',
    slide.titleVariant === 'compact' ? 'home-hero-title--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const imageFrameClassName = [
    'home-hero-image-frame',
    slide.imageMode === 'contain' ? 'home-hero-image-frame--contain' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className="home-hero-redesign"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label={t('carouselLabel')}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label={t('previous')}
        className="home-hero-arrow home-hero-arrow--prev"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => navigate(1)}
        aria-label={t('next')}
        className="home-hero-arrow home-hero-arrow--next"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="home-hero-shell">
        <div className="home-hero-stage">
          <AnimatePresence initial={false} mode="sync" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial={shouldReduceMotion ? false : 'enter'}
              animate="center"
              exit={shouldReduceMotion ? undefined : 'exit'}
              transition={shouldReduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
              className="home-hero-layout"
              aria-live="polite"
            >
              <div className="home-hero-content">
                <span className="home-hero-eyebrow home-hero-reveal">{slide.eyebrow}</span>
                <h1 className={`${titleClassName} home-hero-reveal`}>
                  {slide.titleLead.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  <span className="home-hero-title-accent">{slide.titleAccent}</span>
                </h1>
                <p className="home-hero-copy home-hero-reveal">{slide.description}</p>
                <div className="home-hero-actions home-hero-reveal">
                  <Link href={slide.primaryHref} className="home-hero-primary sharp-edge">
                    {slide.primaryLabel}
                    <ChevronRight className="h-4 w-4" motion="nudge" aria-hidden="true" />
                  </Link>
                  <Link href={slide.secondaryHref} className="home-hero-secondary sharp-edge">
                    {slide.secondaryLabel}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="home-hero-media">
                <div className={imageFrameClassName}>
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className={`${
                      slide.imageMode === 'contain' ? 'object-contain' : 'object-cover'
                    } hero-image-animate`}
                    sizes="(max-width: 767px) 94vw, (max-width: 1024px) 86vw, 58vw"
                    loading={active === 0 ? 'eager' : 'lazy'}
                    fetchPriority={active === 0 ? 'high' : 'auto'}
                    draggable={false}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="home-hero-dots" aria-label={t('choose')}>
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              type="button"
              onClick={() => goTo(index)}
              aria-label={t('goTo', {number: index + 1})}
              aria-current={index === active ? 'true' : undefined}
              className="home-hero-dot-button"
            >
              <span
                className={
                  index === active ? 'home-hero-dot home-hero-dot--active' : 'home-hero-dot'
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
