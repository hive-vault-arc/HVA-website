'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ChevronLeft, ChevronRight, Eye, Layers } from 'lucide-react';
import type { ReactNode } from 'react';

type Slide = {
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  titleVariant?: 'compact';
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
  cardIcon: ReactNode;
  cardTitle: string;
  cardDesc: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: 'TECHNOLOGY CONSULTING',
    h1Line1: 'Strategic Guidance.',
    h1Line2: 'Accountable Execution.',
    description:
      "We don't just advise and walk away. We sit at the table through architecture decisions, engineering delivery, and long-term operations — so your strategy actually reaches production.",
    primaryLabel: 'Book Discovery Call',
    primaryHref: '/contact',
    secondaryLabel: 'Meet Our Team',
    secondaryHref: '/aboutus',
    image: '/Images/hero/hva-home-hero-strategic-guidance-accountable-execution.webp',
    imageAlt: 'Executive strategy workspace with operating model diagrams and city view',
    cardIcon: <Eye className="w-8 h-8 text-[#E8A838]" strokeWidth={1.5} />,
    cardTitle: 'Consulting That Delivers.',
    cardDesc:
      'The same founders who design the strategy stay accountable through delivery, release, and long-term results.',
  },
  {
    eyebrow: 'AI ENGINEERING & OPERATIONS',
    h1Line1: 'Strategy, AI Engineering,',
    h1Line2: 'and Operations in One Team.',
    titleVariant: 'compact',
    description:
      'Hive Vault Arc is a technology transformation partner for teams that need strategy, production engineering, and managed operations to move together.',
    primaryLabel: 'View Case Studies',
    primaryHref: '/case-studies',
    secondaryLabel: 'Explore Capabilities',
    secondaryHref: '/capabilities',
    image: '/Images/capabilities/hva-ai-data-capability.webp',
    imageAlt: 'AI engineering workspace with model orchestration and analytics monitors',
    cardIcon: <Bot className="w-8 h-8 text-[#E8A838]" strokeWidth={1.5} />,
    cardTitle: 'Advise. Build. Operate.',
    cardDesc:
      'One accountable team from transformation diagnosis to production operation.',
  },
  {
    eyebrow: 'ARC DELIVERY MODEL',
    h1Line1: 'Assess. Re-engineer.',
    h1Line2: 'Command Production Systems.',
    titleVariant: 'compact',
    description:
      'We diagnose operating constraints, rebuild processes and platforms, then stay involved after launch so transformation becomes a working system.',
    primaryLabel: 'Explore Our Programs',
    primaryHref: '/capabilities',
    secondaryLabel: 'See Case Studies',
    secondaryHref: '/case-studies',
    image: '/Images/hero/digital-transformation-scalable-systems-tangier-morocco.webp',
    imageAlt: 'Technology consultant reviewing digital operations dashboards on a laptop',
    cardIcon: <Layers className="w-8 h-8 text-[#E8A838]" strokeWidth={1.5} />,
    cardTitle: 'End-to-End Programs.',
    cardDesc:
      'From operating diagnosis to production deployment and managed evolution.',
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 40 : -40 }),
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number>(0);

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > active ? 1 : -1);
      setActive(i);
    },
    [active]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1);
  };

  const slide = SLIDES[active];
  if (!slide) return null;

  return (
    <section
      className="home-hero-redesign group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={() => navigate(-1)}
        aria-label="Previous slide"
        className="home-hero-arrow home-hero-arrow--prev"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        onClick={() => navigate(1)}
        aria-label="Next slide"
        className="home-hero-arrow home-hero-arrow--next"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="home-hero-shell">

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="home-hero-layout"
          >
            <div className="home-hero-content">
              <span className="home-hero-eyebrow">
                {slide.eyebrow}
              </span>
              <h1 className={slide.titleVariant === 'compact' ? 'home-hero-title home-hero-title--compact' : 'home-hero-title'}>
                <span>{slide.h1Line1}</span>{' '}
                <em>{slide.h1Line2}</em>
              </h1>
              <p className="home-hero-copy">
                {slide.description}
              </p>
              <div className="home-hero-actions">
                <Link
                  href={slide.primaryHref}
                  className="home-hero-primary sharp-edge"
                >
                  {slide.primaryLabel}
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className="home-hero-secondary"
                >
                  {slide.secondaryLabel} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="home-hero-media">
              <div className="home-hero-image-frame">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="h-full w-full object-cover hero-image-animate"
                  sizes="(max-width: 1024px) 92vw, 56vw"
                  loading="eager"
                  fetchPriority={active === 0 ? 'high' : 'auto'}
                />
              </div>
              <div className="home-hero-floating-card">
                {slide.cardIcon}
                <p className="home-float-title">
                  {slide.cardTitle}
                </p>
                <p className="home-float-copy">
                  {slide.cardDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="home-hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.eyebrow}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="home-hero-dot-button"
            >
              <span
                className={i === active ? 'home-hero-dot home-hero-dot--active' : 'home-hero-dot'}
              />
            </button>
          ))}
        </div>
        <p className="home-hero-swipe">
          Swipe to explore
        </p>

      </div>
    </section>
  );
}
