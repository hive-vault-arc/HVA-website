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
    eyebrow: 'TECHNOLOGY TRANSFORMATION',
    h1Line1: 'Strategy, AI Engineering,',
    h1Line2: 'and Operations in One Team.',
    description:
      'H.V.A is a technology transformation partner for teams that need strategy, production engineering, and managed operations to move together.',
    primaryLabel: 'View Case Studies',
    primaryHref: '/case-studies',
    secondaryLabel: 'Explore Capabilities',
    secondaryHref: '/capabilities',
    image: '/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp',
    imageAlt: 'H.V.A AI automation and engineering team in Tangier, Morocco',
    cardIcon: <Bot className="w-8 h-8 text-[#0984E3]" strokeWidth={1.5} />,
    cardTitle: 'Advise. Build. Operate.',
    cardDesc:
      'One accountable team from transformation diagnosis to production operation.',
  },
  {
    eyebrow: 'ARC DELIVERY MODEL',
    h1Line1: 'Assess. Re-engineer.',
    h1Line2: 'Command Production Systems.',
    description:
      'We diagnose operating constraints, rebuild processes and platforms, then stay involved after launch so transformation becomes a working system.',
    primaryLabel: 'Explore Our Programs',
    primaryHref: '/capabilities',
    secondaryLabel: 'See Case Studies',
    secondaryHref: '/case-studies',
    image: '/Images/hero/digital-transformation-scalable-systems-tangier-morocco.webp',
    imageAlt: 'Custom CRM and digital transformation system built by H.V.A',
    cardIcon: <Layers className="w-8 h-8 text-[#0984E3]" strokeWidth={1.5} />,
    cardTitle: 'End-to-End Programs.',
    cardDesc:
      'From operating diagnosis to production deployment and managed evolution.',
  },
  {
    eyebrow: 'TECHNOLOGY CONSULTING',
    h1Line1: 'Strategic Guidance.',
    h1Line2: 'Accountable Execution.',
    description:
      "We don't just advise and walk away. We sit at the table through architecture decisions, engineering delivery, and long-term operations — so your strategy actually reaches production.",
    primaryLabel: 'Book Discovery Call',
    primaryHref: '/contact',
    secondaryLabel: 'Meet Our Team',
    secondaryHref: '/whoweare/abouthva',
    image: '/Images/hero/strategic-technology-consulting-tangier-morocco.webp',
    imageAlt: 'H.V.A consulting and engineering team in Tangier, Morocco',
    cardIcon: <Eye className="w-8 h-8 text-[#0984E3]" strokeWidth={1.5} />,
    cardTitle: 'Consulting That Delivers.',
    cardDesc:
      'The same founders who design the strategy stay accountable through delivery, release, and long-term results.',
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
      className="relative group px-6 pt-20 pb-14 lg:px-14 lg:pt-36 lg:pb-28 overflow-visible"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Left arrow — desktop only */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Previous slide"
        className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20
                   hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   p-2 text-[#1E272E]/30 hover:text-[#0984E3]"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Right arrow — desktop only */}
      <button
        onClick={() => navigate(1)}
        aria-label="Next slide"
        className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20
                   hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   p-2 text-[#1E272E]/30 hover:text-[#0984E3]"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      <div className="container mx-auto">

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-12 items-center"
          >
            {/* Left: copy — second on mobile, first on desktop */}
            <div className="lg:col-span-7 z-10 order-2 lg:order-1">
              <span className="home-hero-eyebrow inline-block px-3 py-1 bg-[#0984E3]/10 text-[#0984E3] text-[10px] uppercase tracking-[0.22em] font-bold mb-6 lg:mb-8">
                {slide.eyebrow}
              </span>
              <h1 className="home-hero-title font-serif text-3xl sm:text-4xl md:text-7xl xl:text-[5.5rem] font-medium leading-[1.04] tracking-tight text-[#1E272E] mb-6 lg:mb-8">
                {slide.h1Line1}<br />
                <em className="italic bg-gradient-to-r from-[#0984E3] to-[#2563EB] bg-clip-text text-transparent pl-[0.08em] -ml-[0.08em]">{slide.h1Line2}</em>
              </h1>
              <p className="home-hero-copy text-base lg:text-xl text-[#1E272E]/60 max-w-xl mb-8 lg:mb-12 font-light leading-relaxed line-clamp-3 lg:line-clamp-none">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6">
                <Link
                  href={slide.primaryHref}
                  className="home-hero-primary sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300 w-full sm:w-auto text-center"
                >
                  {slide.primaryLabel}
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className="home-hero-secondary flex items-center justify-center sm:justify-start gap-2 px-8 py-4 text-sm font-bold text-[#1E272E] hover:gap-4 transition-all duration-300"
                >
                  {slide.secondaryLabel} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: image + floating card — first on mobile, second on desktop */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 -mx-6 lg:mx-0">
              <div className="relative aspect-[9/10] lg:aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="w-full h-full object-cover hero-image-animate"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={active === 0}
                />
              </div>
              {/* Asymmetric floating card — desktop only */}
              <div className="absolute -bottom-16 -left-6 md:-left-14 bg-white p-8 max-w-[17rem] shadow-xl hidden md:block">
                {slide.cardIcon}
                <h3 className="home-float-title font-serif text-xl mt-4 mb-3 italic font-medium text-[#1E272E]">
                  {slide.cardTitle}
                </h3>
                <p className="home-float-copy text-sm text-[#1E272E]/60 leading-relaxed">
                  {slide.cardDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-3 mt-10 lg:mt-24">
          {SLIDES.map((s, i) => (
            <button
              key={s.eyebrow}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-8 bg-[#0984E3]'
                  : 'w-5 bg-[#1E272E]/20 hover:bg-[#1E272E]/40'
              }`}
            />
          ))}
        </div>
        <p className="lg:hidden mt-3 text-center text-[10px] uppercase tracking-widest text-[#1E272E]/30">
          Swipe to explore
        </p>

      </div>
    </section>
  );
}
