'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, MessageSquare, Network, ShieldCheck, ArrowUpRight } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';

const IMGS = {
  realEstate:    '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:    '/Images/industries/healthcare-clinical-operations-dashboard-morocco.webp',
  construction:  '/Images/industries/construction-project-management-automation-morocco.webp',
  logistics:     '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance:       '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  government:    '/Images/industries/government-public-sector-digital-services-morocco.webp',
  retail:        '/Images/industries/retail-ecommerce-operations-platform-morocco.webp',
  energy:        '/Images/industries/energy-sustainability-monitoring-morocco.webp',
  consumerGoods: '/Images/industries/consumer-goods-luxury-analytics-morocco.webp',
  rdLab:         '/Images/industries/hva-industries-research-development-framework.webp',
};

const approachTracks = [
  {
    code: 'IND-001',
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Sector-calibrated diagnostics',
    desc: 'Calibrated to sector economics, cycle times, and bottleneck patterns.',
    group: 'Methodology',
  },
  {
    code: 'IND-002',
    icon: <Network className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Domain-aware architecture',
    desc: 'Architecture reflects domain language, data structures, and decision hierarchies.',
    group: 'Methodology',
  },
  {
    code: 'IND-003',
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Regulatory awareness',
    desc: 'Controls introduced early to reduce delivery risk in sensitive operations.',
    group: 'Compliance',
  },
  {
    code: 'IND-004',
    icon: <MessageSquare className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Stakeholder communication',
    desc: 'Execution adapted to how leadership and operations actually communicate.',
    group: 'Compliance',
  },
];

const industryCards = [
  {
    id: 'real-estate',
    category: 'Real Estate & Construction',
    title: 'Real Estate',
    description: 'Lead operations, CRM governance, buyer qualification, and AI-assisted client communication for property teams.',
    image: IMGS.realEstate,
    imageAlt: 'Real estate CRM lead operations Morocco',
    href: '/case-studies/zoho-grade-crm-platform',
    bullets: ['Lead operations & CRM', 'AI client communication', 'Pipeline governance'],
    className: 'md:col-span-7 lg:col-span-7',
    layout: 'split',
    tone: 'light',
  },
  {
    id: 'healthcare',
    category: 'Healthcare & Life Sciences',
    title: 'Healthcare',
    description: 'Clinical dashboards, electronic medical systems, and AI diagnostics for critical care environments.',
    image: IMGS.healthcare,
    imageAlt: 'Healthcare clinical operations dashboard Morocco',
    href: '/case-studies',
    bullets: ['Clinical dashboards', 'Medical systems', 'Diagnostic intelligence'],
    className: 'md:col-span-5 lg:col-span-5',
    layout: 'overlay',
    tone: 'dark',
  },
  {
    id: 'financial-services',
    category: 'Financial Services',
    title: 'Finance & Banking',
    description: 'Core banking modernization, AI fraud detection, and digital banking platforms.',
    image: IMGS.finance,
    imageAlt: 'Financial services deal pipeline Morocco',
    href: '/case-studies',
    bullets: ['Fraud detection', 'Deal intelligence', 'Digital banking'],
    className: 'md:col-span-4',
    layout: 'stack',
    tone: 'light',
  },
  {
    id: 'government',
    category: 'Government & Public Sector',
    title: 'Government',
    description: "Digital government platforms, citizen portals, and national AI initiatives under Morocco's Maroc IA 2030 roadmap.",
    image: IMGS.government,
    imageAlt: 'Government digital transformation Morocco',
    href: '/case-studies',
    bullets: ['Citizen portals', 'Public data systems', 'AI readiness'],
    className: 'md:col-span-4',
    layout: 'stack',
    tone: 'light',
  },
  {
    id: 'retail',
    category: 'Retail & E-Commerce',
    title: 'Retail',
    description: 'Omnichannel commerce, AI personalization, and CRM systems across the Morocco-France corridor.',
    image: IMGS.retail,
    imageAlt: 'Retail e-commerce platform Morocco',
    href: '/case-studies',
    bullets: ['Omnichannel commerce', 'Personalization', 'Retail CRM'],
    className: 'md:col-span-4',
    layout: 'stack',
    tone: 'dark',
  },
  {
    id: 'energy',
    category: 'Energy, Utilities & Sustainability',
    title: 'Energy',
    description: "Smart grids, ESG analytics, and predictive maintenance for Morocco's renewable energy market.",
    image: IMGS.energy,
    imageAlt: 'Energy sustainability digital Morocco',
    href: '/case-studies',
    bullets: ['Smart grids', 'ESG analytics', 'Predictive maintenance'],
    className: 'md:col-span-6',
    layout: 'split',
    tone: 'light',
  },
  {
    id: 'logistics',
    category: 'Logistics & Transportation',
    title: 'Logistics',
    description: "Fleet management, route optimization, and SLA monitoring. Built for Tanger Med, Africa's largest port corridor.",
    image: IMGS.logistics,
    imageAlt: 'Logistics dispatch workflow automation Morocco',
    href: '/case-studies',
    bullets: ['Fleet operations', 'Route optimization', 'SLA monitoring'],
    className: 'md:col-span-6',
    layout: 'split',
    tone: 'dark',
  },
  {
    id: 'consumer-goods',
    category: 'Consumer Goods & Luxury',
    title: 'Consumer & Luxury',
    description: 'Customer analytics, AI marketing, and retail intelligence across the Morocco-France luxury corridor.',
    image: IMGS.consumerGoods,
    imageAlt: 'Consumer goods luxury operations Morocco France',
    href: '/case-studies',
    bullets: ['Customer analytics', 'AI marketing', 'Luxury intelligence'],
    className: 'md:col-span-12',
    layout: 'wide',
    tone: 'light',
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function IndustryCard({ card, index }: { card: (typeof industryCards)[number]; index: number }) {
  const isDark = card.tone === 'dark';
  const isOverlay = card.layout === 'overlay';
  const isSplit = card.layout === 'split' || card.layout === 'wide';
  const textColor = isDark || isOverlay ? 'text-white' : 'text-[#0F172A]';
  const mutedColor = isDark || isOverlay ? 'text-white/70' : 'text-[#475569]';
  const labelColor = isDark || isOverlay ? 'text-[#93c5fd]' : 'text-[#2563EB]';

  if (isOverlay) {
    return (
      <motion.article
        id={card.id}
        data-industry-card={card.id}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className={`${card.className} group relative min-h-[360px] overflow-hidden bg-[#0F172A]`}
      >
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          priority={index < 2}
          loading={index < 2 ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/46 to-[#0F172A]/10" />
        <div className="relative z-10 flex min-h-[360px] flex-col justify-between p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className={`max-w-[15rem] text-[10px] font-bold uppercase tracking-[0.22em] ${labelColor}`}>
              {card.category}
            </p>
            <span className="font-mono text-[10px] text-white/55">0{index + 1}</span>
          </div>
          <div>
            <h3 className={`font-headline text-3xl italic leading-tight ${textColor}`}>{card.title}</h3>
            <p className={`mt-4 max-w-md text-sm leading-relaxed ${mutedColor}`}>{card.description}</p>
            <Link
              href={card.href}
              className="mt-7 inline-flex min-h-11 items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#93c5fd] transition-colors hover:text-white"
            >
              See related work <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      id={card.id}
      data-industry-card={card.id}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className={`${card.className} group overflow-hidden ${
        isSplit
          ? `grid min-h-[350px] grid-cols-1 ${card.layout === 'wide' ? 'lg:grid-cols-[0.42fr_1fr]' : 'lg:grid-cols-[0.9fr_1.1fr]'}`
          : 'flex min-h-[420px] flex-col'
      } ${isDark ? 'bg-[#0F172A]' : 'bg-white'}`}
    >
      <div className={`relative overflow-hidden bg-[#0F172A] ${isSplit ? 'min-h-[240px] lg:min-h-0' : 'h-56'}`}>
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          priority={index < 2}
          loading={index < 2 ? 'eager' : 'lazy'}
          sizes={isSplit ? '(max-width: 1024px) 100vw, 42vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover opacity-88 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-[#0F172A]/30' : 'bg-white/5'}`} />
      </div>

      <div className={`flex flex-1 flex-col justify-between p-7 md:p-8 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <p className={`max-w-[19rem] text-[10px] font-bold uppercase tracking-[0.22em] ${labelColor}`}>
              {card.category}
            </p>
            <span className={`font-mono text-[10px] ${isDark ? 'text-white/45' : 'text-[#94a3b8]'}`}>
              0{index + 1}
            </span>
          </div>
          <h3 className={`font-headline text-3xl leading-tight ${textColor} ${card.layout === 'wide' ? 'md:text-4xl' : ''}`}>
            {card.title}
          </h3>
          <p className={`mt-4 max-w-2xl text-sm leading-relaxed ${mutedColor}`}>{card.description}</p>
        </div>

        <div className="mt-7">
          <ul className={`grid gap-2 ${card.layout === 'wide' ? 'sm:grid-cols-3' : ''}`}>
            {card.bullets.map((item) => (
              <li key={item} className={`flex items-start gap-2 text-xs leading-relaxed ${mutedColor}`}>
                <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={card.href}
            className={`mt-7 inline-flex min-h-11 items-center gap-1 text-[11px] font-bold uppercase tracking-widest transition-colors ${
              isDark ? 'text-[#93c5fd] hover:text-white' : 'text-[#2563EB] hover:text-[#1d4ed8]'
            }`}
          >
            See related work <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Industries() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#f7f9fb] text-[#0F172A]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden mx-auto max-w-7xl px-8 pt-36 pb-24 md:pb-32">
        <PageAmbientBackground className="-z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Industries
            </p>
            <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
              Industry Context,<br />
              <em className="italic text-[#475569]">Not Generic Delivery.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-xl md:text-2xl font-light leading-relaxed text-[#45464d]">
              H.V.A operates across 8 industry verticals — combining domain expertise with the full ARC delivery model:
              strategy, engineering, and operations in one team.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-4 flex flex-col justify-end h-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="bg-[#f2f4f6] p-8 border-l-4 border-[#2563EB]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#475569] mb-3">
                Our Mandate
              </p>
              <p
                className="text-lg text-[#0F172A] italic"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                "Specificity is the antidote to technical debt."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bento Industry Grid ──────────────────────────────────────────────── */}
      <section className="bg-[#f2f4f6] pt-16 pb-5 md:pt-20 md:pb-6">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-6 lg:px-10">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                Sector Coverage
              </p>
              <h2 className="max-w-3xl font-headline text-4xl font-light leading-[1.05] text-[#0F172A] md:text-5xl">
                Industry cards built around operating reality.
              </h2>
            </div>
            <p className="md:col-span-5 max-w-xl text-base leading-relaxed text-[#45464d]">
              Each vertical is mapped to the systems, workflows, and governance patterns that usually decide whether transformation holds in production.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {industryCards.map((card, index) => (
              <IndustryCard key={card.id} card={card} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── R&D / Laboratory_Active ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 pt-6 pb-20 md:pt-8 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-center">
          {/* Image left with decorative offset */}
          <div className="lg:w-1/2">
            <div className="relative pl-8 pt-8 sm:pl-10 sm:pt-10">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 z-0 h-44 w-44 border border-[#cbd5e1] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.10)_1px,transparent_1px),linear-gradient(0deg,rgba(37,99,235,0.10)_1px,transparent_1px)] bg-[size:18px_18px]" />
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#2563EB]" />
                <span className="absolute left-7 top-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                  R&amp;D
                </span>
                <span className="absolute left-7 top-12 block h-px w-20 bg-[#2563EB]/35" />
              </div>
              <div aria-hidden="true" className="absolute -left-3 top-16 z-0 h-24 w-24 bg-[#dbeafe]" />
              <Image
                src={IMGS.rdLab}
                alt="H.V.A analog research and development framework for industry operating contexts"
                width={1023}
                height={1537}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative z-10 w-full border border-white/80 shadow-2xl shadow-[#0F172A]/18"
              />
            </div>
          </div>

          {/* Content right */}
          <div className="lg:w-1/2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-3">
              Laboratory_Active
            </p>
            <h2
              className="text-4xl md:text-5xl mb-8 leading-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Active Research &amp; Development —<br />
              <em className="font-light italic">One Framework. Many Operating Contexts.</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {(['Methodology', 'Compliance'] as const).map((group) => (
                <div key={group}>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[#2563EB]">
                    {group}
                  </h4>
                  <ul className="space-y-5">
                    {approachTracks
                      .filter((t) => t.group === group)
                      .map((t) => (
                        <li key={t.code} className="flex gap-3 items-start">
                          <div className="text-[#2563EB] shrink-0 mt-0.5">{t.icon}</div>
                          <span className="text-sm text-[#475569] leading-relaxed">{t.title}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/arc"
                className="inline-block bg-[#0F172A] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#2563EB] transition-colors duration-200"
              >
                Learn About ARC
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
              >
                Explore Capabilities <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <BottomCTA
        variant="dark"
        headline="Need an Industry-Specific Transformation Plan?"
        subtext="Book a discovery call and we'll map the right capability and system program for your sector."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Capabilities"
        secondaryHref="/capabilities"
      />
    </div>
  );
}
