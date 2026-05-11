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
  rdLab:         '/Images/brand/hva-ai-software-agency-tangier.webp',
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

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

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
      <section className="bg-[#f2f4f6] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
          >
            <motion.div
              id="real-estate"
              data-industry-card="real-estate"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-7 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.realEstate}
                  alt="Real estate CRM lead operations Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Real Estate &amp; Construction
                </p>
                <h3
                  className="text-3xl mb-5 italic text-[#0F172A]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Real Estate
                </h3>
                <ul className="space-y-2.5 text-sm text-[#475569]">
                  {['Lead operations & CRM', 'AI agent for client communication', 'Pipeline governance'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/case-studies/zoho-grade-crm-platform"
                  className="mt-7 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                >
                  See related work <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              id="healthcare"
              data-industry-card="healthcare"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-5 group relative overflow-hidden bg-[#0F172A] flex flex-col justify-between min-h-[320px]"
            >
              <Image
                src={IMGS.healthcare}
                alt="Healthcare clinical operations dashboard Morocco"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#93c5fd] mb-4">
                    Healthcare &amp; Life Sciences
                  </p>
                  <h3
                    className="text-3xl italic text-white mb-4"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    Healthcare
                  </h3>
                  <p className="text-[#bfdbfe] text-sm leading-relaxed">
                    Clinical dashboards, electronic medical systems, and AI diagnostics for critical care environments.
                  </p>
                </div>
                <Link
                  href="/case-studies"
                  className="mt-8 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#93c5fd] hover:text-white transition-colors"
                >
                  See related work <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              id="financial-services"
              data-industry-card="financial-services"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.finance}
                  alt="Financial services deal pipeline Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Financial Services
                </p>
                <h3
                  className="text-2xl italic text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Finance &amp; Banking
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Core banking modernization, AI fraud detection, and digital banking platforms.
                </p>
              </div>
            </motion.div>

            <motion.div
              id="government"
              data-industry-card="government"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.government}
                  alt="Government digital transformation Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Government &amp; Public Sector
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Government
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Digital government platforms, citizen portals, and national AI initiatives under Morocco's Maroc IA 2030 roadmap.
                </p>
              </div>
            </motion.div>

            <motion.div
              id="retail"
              data-industry-card="retail"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 group bg-white overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden shrink-0">
                <Image
                  src={IMGS.retail}
                  alt="Retail e-commerce platform Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Retail &amp; E-Commerce
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Retail
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Omnichannel commerce, AI personalization, and CRM systems across the Morocco-France corridor.
                </p>
              </div>
            </motion.div>

            <motion.div
              id="energy"
              data-industry-card="energy"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-2/5 h-52 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.energy}
                  alt="Energy sustainability digital Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Energy, Utilities &amp; Sustainability
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Energy
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Smart grids, ESG analytics, and predictive maintenance for Morocco's renewable energy market.
                </p>
              </div>
            </motion.div>

            <motion.div
              id="logistics"
              data-industry-card="logistics"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-6 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-2/5 h-52 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.logistics}
                  alt="Logistics dispatch workflow automation Morocco"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Logistics &amp; Transportation
                </p>
                <h3
                  className="text-2xl text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Logistics
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Fleet management, route optimization, and SLA monitoring. Built for Tanger Med, Africa's largest port corridor.
                </p>
              </div>
            </motion.div>

            <motion.div
              id="consumer-goods"
              data-industry-card="consumer-goods"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="md:col-span-12 group bg-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-5/12 h-56 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={IMGS.consumerGoods}
                  alt="Consumer goods luxury operations Morocco France"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1 justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-3">
                  Consumer Goods &amp; Luxury
                </p>
                <h3
                  className="text-3xl italic text-[#0F172A] mb-4"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Consumer &amp; Luxury
                </h3>
                <p className="max-w-2xl text-sm text-[#475569] leading-relaxed">
                  Customer analytics, AI marketing, and retail intelligence across the Morocco-France luxury corridor.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── R&D / Laboratory_Active ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image left with decorative offset */}
          <div className="lg:w-1/2">
            <div className="relative">
              <Image
                src={IMGS.rdLab}
                alt="HVA AI software agency research Tangier Morocco"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full shadow-2xl relative z-10"
              />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#e6e8ea] z-0" />
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
