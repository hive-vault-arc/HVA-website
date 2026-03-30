'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
    eyebrow: 'AI & AUTOMATION',
    h1Line1: 'AI-Powered Transformation',
    h1Line2: 'for Operations That Matter.',
    description:
      'We build AI agents that handle customer inquiries, qualify leads, and automate internal workflows — so your team stops doing repetitive tasks and starts focusing on what actually grows the business.',
    primaryLabel: 'View Case Studies',
    primaryHref: '/case-studies',
    secondaryLabel: 'Explore AI Solutions',
    secondaryHref: '/services',
    image: '/Images/ai-powered-transformation-operations-tangier-morocco.webp',
    imageAlt: 'H.V.A AI automation and engineering team in Tangier, Morocco',
    cardIcon: <Bot className="w-8 h-8 text-[#0984E3]" strokeWidth={1.5} />,
    cardTitle: 'Always-On AI.',
    cardDesc:
      'Agents that qualify leads, handle inquiries, and run workflows 24/7 — with no manual effort required.',
  },
  {
    eyebrow: 'DIGITAL TRANSFORMATION',
    h1Line1: 'Turn Manual Processes Into',
    h1Line2: 'Scalable Digital Systems.',
    description:
      'Many businesses still run on spreadsheets, email chains, and disconnected tools. We replace that fragmented complexity with integrated digital systems — purpose-built for how your business actually works.',
    primaryLabel: 'Explore Our Programs',
    primaryHref: '/services',
    secondaryLabel: 'See Case Studies',
    secondaryHref: '/case-studies',
    image: '/Images/digital-transformation-scalable-systems-tangier-morocco.webp',
    imageAlt: 'Custom CRM and digital transformation system built by H.V.A',
    cardIcon: <Layers className="w-8 h-8 text-[#0984E3]" strokeWidth={1.5} />,
    cardTitle: 'End-to-End Programs.',
    cardDesc:
      'From operational diagnostics to production deployment — one transformation program with full accountability.',
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
    image: '/Images/strategic-technology-consulting-tangier-morocco.png',
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

  useEffect(() => {
    const t = setTimeout(() => navigate(1), 5000);
    return () => clearTimeout(t);
  }, [active, navigate]);

  const slide = SLIDES[active]!;

  return (
    <section className="relative group px-6 pt-28 pb-20 lg:px-14 lg:pt-36 lg:pb-28 overflow-visible">

      {/* Left arrow */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Previous slide"
        className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   p-2 text-[#1E272E]/30 hover:text-[#0984E3]"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => navigate(1)}
        aria-label="Next slide"
        className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   p-2 text-[#1E272E]/30 hover:text-[#0984E3]"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      <div className="container mx-auto">

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: copy */}
            <div className="lg:col-span-7 z-10">
              <span className="home-hero-eyebrow inline-block px-3 py-1 bg-[#0984E3]/10 text-[#0984E3] text-[10px] uppercase tracking-[0.22em] font-bold mb-8">
                {slide.eyebrow}
              </span>
              <h1 className="home-hero-title font-serif text-4xl sm:text-5xl md:text-7xl xl:text-[5.5rem] font-medium leading-[1.04] tracking-tight text-[#1E272E] mb-8">
                {slide.h1Line1}<br />
                <em className="italic bg-gradient-to-r from-[#0984E3] to-[#2563EB] bg-clip-text text-transparent">{slide.h1Line2}</em>
              </h1>
              <p className="home-hero-copy text-xl text-[#1E272E]/60 max-w-xl mb-12 font-light leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href={slide.primaryHref}
                  className="home-hero-primary sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300"
                >
                  {slide.primaryLabel}
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className="home-hero-secondary flex items-center gap-2 px-8 py-4 text-sm font-bold text-[#1E272E] hover:gap-4 transition-all duration-300"
                >
                  {slide.secondaryLabel} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: image + floating card */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover hero-image-animate"
                  loading={active === 0 ? 'eager' : 'lazy'}
                  fetchPriority={active === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
              {/* Asymmetric floating card */}
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
        <div className="flex items-center justify-center gap-3 mt-20 lg:mt-24">
          {SLIDES.map((_, i) => (
            <button
              key={i}
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

      </div>
    </section>
  );
}
