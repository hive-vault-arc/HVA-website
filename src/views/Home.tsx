'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowRight, BarChart3, Bot, Cloud, Eye, Layers, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomCTA from '../components/BottomCTA';
import Background3d from '../components/Plasma';
import LogoLoop from '../components/LogoItem';
import VideoScrollSection from '../components/ui/VideoScrollSection';
import HeroSlider from '../components/ui/HeroSlider';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import { useAnimationQuality } from '../lib/animationQuality';
import {
  SiAndroid,
  SiCplusplus,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGoogle,
  SiGooglecloud,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTensorflow,
} from 'react-icons/si';

const WorldMapDemo = lazy(() =>
  import('../components/world-map-demo').then((module) => ({ default: module.WorldMapDemo }))
);
const InsightsCarousel = dynamic(() => import('../components/InsightsCarousel'), {
  loading: () => <div className="h-[560px] bg-[#F8FAFC]" aria-hidden="true" />,
});

type HomeProps = {
  insightsCarouselItems: InsightsCarouselItem[];
};

const Home: React.FC<HomeProps> = ({ insightsCarouselItems }) => {
  const { tier, motionReduced } = useAnimationQuality();
  const showAdvancedEffects = tier === 'high' && !motionReduced;
  const worldMapSectionRef = useRef<HTMLElement | null>(null);
  const liveMetricsRef = useRef<HTMLDivElement | null>(null);
  const metricsRafRef = useRef<number | null>(null);
  const [bgReady, setBgReady] = useState(false);
  const [liveMetricsProgress, setLiveMetricsProgress] = useState(0);

  // Defer WebGL background until after first paint so UI renders immediately
  // requestIdleCallback is not available on iOS Safari < 16.4 — fallback to setTimeout
  useEffect(() => {
    if (typeof requestIdleCallback === 'undefined') {
      const id = setTimeout(() => setBgReady(true), 200);
      return () => clearTimeout(id);
    }
    const id = requestIdleCallback(() => setBgReady(true), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, []);

  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  useEffect(() => {
    if (motionReduced) {
      setLiveMetricsProgress(1);
      return;
    }

    const node = liveMetricsRef.current;
    if (!node) return;

    let hasStarted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasStarted) return;
        hasStarted = true;
        observer.disconnect();

        const durationMs = 1400;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          setLiveMetricsProgress(eased);

          if (elapsed < 1) {
            metricsRafRef.current = requestAnimationFrame(tick);
          }
        };

        metricsRafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (metricsRafRef.current !== null) {
        cancelAnimationFrame(metricsRafRef.current);
      }
    };
  }, [motionReduced]);

  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const liveMetrics = [
    { target: 85, dir: '↓', label: 'Reduction in manual triage', kind: 'percent' as const },
    { target: 43, dir: '↑', label: 'Increase in qualified meetings', kind: 'percent' as const },
    { target: 2.4, dir: '→', label: 'Revenue pipeline tracked', kind: 'moneyM' as const },
    { target: 94, dir: '↑', label: 'Daily active system operators', kind: 'integer' as const },
  ];

  const formatLiveMetric = (target: number, kind: 'percent' | 'moneyM' | 'integer') => {
    if (kind === 'percent') {
      return `${Math.round(target * liveMetricsProgress)}%`;
    }
    if (kind === 'moneyM') {
      return `$${(target * liveMetricsProgress).toFixed(1)}M`;
    }
    return `${Math.round(target * liveMetricsProgress)}`;
  };

  const capabilityPillars = [
    {
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
      title: 'AI & Intelligent Automation',
      desc: 'AI agents that handle inquiries, qualify leads, and run your back-office — 24/7, without adding headcount.',
      details: [
        'WhatsApp & inbox AI receptionists',
        'Lead qualification & routing agents',
        'Internal workflow automation pipelines',
      ],
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Digital Transformation',
      desc: 'We take operations running on spreadsheets and rebuild them on integrated, purpose-built digital systems.',
      details: [
        'Full operational audit & process mapping',
        'CRM, ERP & platform modernization',
        'Cloud migration with zero-downtime plans',
      ],
    },
    {
      icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Technology Consulting',
      desc: 'Strategy that stays accountable through delivery. Same team from architecture decisions to long-term operations.',
      details: [
        'Technology roadmap & architecture design',
        'Build vs. buy decision frameworks',
        'Ongoing technical leadership & advisory',
      ],
    },
    {
      icon: <Cloud className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Engineering & Delivery',
      desc: 'Production-grade web, mobile, and cloud systems — built for real load and delivered with full accountability.',
      details: [
        'Full-stack web & mobile development',
        'SaaS platform & API engineering',
        'DevOps, CI/CD & cloud infrastructure',
      ],
    },
    {
      icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Conversational AI & WhatsApp',
      desc: 'AI agents deployed on WhatsApp, web chat, and email — multilingual, always available, and trained on your business.',
      details: [
        'Multilingual WhatsApp AI bots',
        'Web chat & email automation',
        'Human escalation & handoff flows',
      ],
    },
    {
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Analytics & Decision Intelligence',
      desc: 'Executive dashboards and data pipelines that turn scattered operational data into real-time clarity for leadership.',
      details: [
        'Executive KPI dashboards & control towers',
        'Operational data pipelines & ETL',
        'Custom reporting for founders & ops teams',
      ],
    },
  ];

  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiGooglecloud />, title: 'Cloud', href: 'https://cloud.google.com' },
    { node: <SiFirebase />, title: 'Firebase', href: 'https://firebase.google.com' },
    { node: <SiGoogle />, title: 'Google', href: 'https://www.google.com' },
    { node: <SiGithub />, title: 'GitHub', href: 'https://www.github.com' },
    { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiFlutter />, title: 'Flutter', href: 'https://flutter.dev' },
    { node: <SiTensorflow />, title: 'AI', href: 'https://www.tensorflow.org' },
    { node: <SiAndroid />, title: 'Mobile App', href: 'https://developer.android.com' },
    { node: <SiPostgresql />, title: 'Postgres', href: 'https://www.postgresql.org' },
    { node: <SiCplusplus />, title: 'C++', href: 'https://isocpp.org' },
    { node: <SiOpenjdk />, title: 'Java', href: 'https://openjdk.org' },
  ];


  type CardRect = { top: string; left: string; width: string; height: string };
  const defaultPos = (idx: number): CardRect => {
    const r = Math.floor(idx / 2);
    const c = idx % 2;
    return { top: `${r * 33.333}%`, left: `${c * 50}%`, width: '50%', height: '33.333%' };
  };
  const hoveredRowTop: Record<number, number> = { 0: 0, 1: 25, 2: 50 };
  const posRow0 = (idx: number, h: number): CardRect => {
    const remaining = [0, 1, 2, 3, 4, 5].filter((i) => i !== h);
    const pos = remaining.indexOf(idx);
    if (pos < 2) return { top: '50%', left: `${pos * 50}%`, width: '50%', height: '25%' };
    return { top: '75%', left: `${(pos - 2) * 33.333}%`, width: '33.333%', height: '25%' };
  };
  const posRow1 = (idx: number, sibling: number): CardRect | null => {
    const topCards = [0, 1, sibling];
    const botCards = [4, 5];
    const posTop = topCards.indexOf(idx);
    if (posTop !== -1) return { top: '0%', left: `${posTop * 33.333}%`, width: '33.333%', height: '25%' };
    const posBot = botCards.indexOf(idx);
    if (posBot !== -1) return { top: '75%', left: `${posBot * 50}%`, width: '50%', height: '25%' };
    return null;
  };
  const posRow2 = (idx: number, sibling: number): CardRect | null => {
    const topCards = [0, 1];
    const midCards = [2, 3, sibling];
    const posTop = topCards.indexOf(idx);
    if (posTop !== -1) return { top: '0%', left: `${posTop * 50}%`, width: '50%', height: '25%' };
    const posMid = midCards.indexOf(idx);
    if (posMid !== -1) return { top: '25%', left: `${posMid * 33.333}%`, width: '33.333%', height: '25%' };
    return null;
  };

  // Grid: 6 cards in 3 rows × 2 cols. Hovered card expands full-width in its row zone.
  // Its row-sibling is displaced upward, creating a 3-card row in the adjacent band.
  const getCardPos = (idx: number): CardRect => {
    if (hoveredPillar === null) return defaultPos(idx);
    const h = hoveredPillar;
    const hRow = Math.floor(h / 2);
    const sibling = h % 2 === 0 ? h + 1 : h - 1;
    if (idx === h) return { top: `${hoveredRowTop[hRow]}%`, left: '0%', width: '100%', height: '50%' };
    if (hRow === 0) return posRow0(idx, h);
    if (hRow === 1) return posRow1(idx, sibling) ?? defaultPos(idx);
    if (hRow === 2) return posRow2(idx, sibling) ?? defaultPos(idx);
    return defaultPos(idx);
  };

  return (
    <div className="h-full home-reference">
      {bgReady && showAdvancedEffects && (
        <Background3d
          color="#0984E3"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.26}
          mouseInteractive={false}
          maxDprCap={0.7}
          targetFpsCap={12}
        />
      )}

      <HeroSlider />

      {/* ── Trusted by ─────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#e2e8f0]">
        <div className="mx-auto max-w-7xl px-6 lg:px-14 py-5 flex items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#94a3b8] shrink-0 hidden sm:block">
            Trusted by
          </p>
          <div className="h-5 w-px bg-[#e2e8f0] shrink-0 hidden sm:block" />
          <div className="flex items-center gap-10 flex-1">
            <div className="group">
              <Image
                src="/Images/trustedby/logo.png"
                alt="Trusted partner logo"
                width={140}
                height={40}
                className="h-7 w-auto object-contain grayscale opacity-50 transition duration-300 group-hover:opacity-75 group-hover:grayscale-0"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-[#94a3b8] uppercase tracking-[0.22em]">Active partnership</span>
          </div>
        </div>
      </section>

      {/* ── Insights Carousel ──────────────────────────────────────────── */}
      <InsightsCarousel items={insightsCarouselItems} />

      {/* ── Who We Are — Identity Section ──────────────────────────────── */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12">

        {/* Left — dark identity panel */}
        <div className="lg:col-span-5 relative bg-[#0F172A] px-10 py-16 lg:py-24 flex flex-col justify-between overflow-hidden">
          {/* Dot grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 0)', backgroundSize: '28px 28px' }}
          />
          {/* Blue left accent bar */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-[3px] bg-[#2563EB]" />

          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB] mb-10">Our Identity</p>
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-[1.08] mb-8">
              Strategic Clarity.<br />
              <em className="font-headline italic text-white/35">Engineering Precision.</em>
            </h2>
            <p className="text-white/60 font-body leading-relaxed text-base mb-10 max-w-sm">
              H.V.A builds AI automation systems, leads digital transformation programs, and delivers production-grade engineering — from strategic roadmap through long-term operations.
            </p>
            <div className="h-px w-12 bg-[#2563EB] mb-4" />
            <p className="text-[9px] font-label font-bold uppercase tracking-[0.28em] text-white/35">
              AI · Transformation · Consulting · Cloud
            </p>
          </div>
        </div>

        {/* Right — 2×3 Capability Pillars (absolute-positioned for fixed-height section) */}
        <ul
          className="lg:col-span-7 relative list-none m-0 p-0 overflow-hidden"
          style={{ height: '600px' }}
          onMouseLeave={() => setHoveredPillar(null)}
        >
          {capabilityPillars.map((pillar, idx) => {
            const isHovered = hoveredPillar === idx;
            const isOther = hoveredPillar !== null && hoveredPillar !== idx;
            return (
              <motion.li
                key={pillar.title}
                layout
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bg-white overflow-hidden"
                style={{
                  ...getCardPos(idx),
                  zIndex: isHovered ? 10 : 1,
                  outline: '1px solid #e2e8f0',
                  opacity: isOther ? 0.45 : 1,
                  transition: 'opacity 0.4s ease',
                }}
                onMouseEnter={() => setHoveredPillar(idx)}
              >
                <div className="h-full p-5 flex flex-col relative">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#dbeafe] text-[#2563EB] shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="mt-3 pb-12">
                    <h3 className="font-headline text-lg text-[#0F172A] mb-1.5">{pillar.title}</h3>
                    <p
                      className="text-sm text-[#475569] leading-relaxed"
                      style={{ opacity: isOther ? 0 : 1, transition: 'opacity 0.25s ease' }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                  {/* Detail bullets — absolute so they never affect card height */}
                  <ul
                    className="absolute bottom-5 left-5 right-5 space-y-1.5 list-none p-0 m-0"
                    aria-hidden={!isHovered}
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
                      transition: 'opacity 0.3s ease 0.1s, transform 0.35s ease 0.1s',
                    }}
                  >
                    {pillar.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-[#2563EB] font-semibold">
                        <span className="w-1 h-1 rounded-full bg-[#2563EB] shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {/* Bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-[#2563EB]"
                    style={{
                      width: isHovered ? '100%' : '0%',
                      transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>

      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">

          {/* Header — two column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-14 pb-12 border-b border-[#e2e8f0]">
            <div className="md:col-span-7">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
                Proof In Production
              </p>
              <h2 className="font-headline text-5xl md:text-6xl leading-[1.02] tracking-tight text-[#0F172A]">
                Transformation Programs<br className="hidden md:block" /> Running in Production
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-col gap-5">
              <p className="text-base text-[#475569] leading-relaxed">
                Every program listed is live in a real operating environment — no demos, no projected results.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/case-studies" className="text-xs font-bold uppercase tracking-widest text-[#0F172A] border-b-2 border-[#0F172A]/20 hover:border-[#2563EB] hover:text-[#2563EB] pb-0.5 transition-all">
                  Proof Library →
                </Link>
                <Link href="/capabilities/solution-programs" className="text-xs font-bold uppercase tracking-widest text-[#0F172A] border-b-2 border-[#0F172A]/20 hover:border-[#2563EB] hover:text-[#2563EB] pb-0.5 transition-all">
                  Solution Programs →
                </Link>
              </div>
            </div>
          </div>

          {/* Cards — asymmetric: large featured left + 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[620px]">

            {/* Featured card */}
            <motion.article
              className="md:col-span-7 relative overflow-hidden sharp-edge aspect-[4/3] md:aspect-auto md:h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Image
                src="/Images/home/proof-in-production/customer-operations-engine-live-deployment.webp"
                alt="Customer operations engine dashboard and workflow system in production"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
              {/* Sequence number watermark */}
              <span aria-hidden="true" className="absolute top-5 right-6 font-headline text-[120px] leading-none text-white/[0.07] select-none pointer-events-none">
                01
              </span>
              {/* Eyebrow badge */}
              <span className="sharp-edge absolute left-5 top-5 z-10 bg-[#2563EB] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                System Built
              </span>
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="font-headline text-3xl md:text-4xl text-white leading-tight mb-3">
                  Customer Operations Engine
                </h3>
                <p className="text-sm text-white/55 uppercase tracking-[0.14em]">
                  Zero manual intervention · end-to-end in production
                </p>
                <div className="mt-5 h-[1px] w-0 group-hover:w-full bg-[#2563EB] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>
            </motion.article>

            {/* Right: 2 stacked cards */}
            <div className="md:col-span-5 grid grid-rows-1 md:grid-rows-2 gap-4 md:h-full">

              {/* Card 2 */}
              <motion.article
                className="relative overflow-hidden sharp-edge aspect-[4/3] md:aspect-auto group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <Image
                  src="/Images/home/proof-in-production/revenue-control-module-live-operations.webp"
                  alt="Revenue control module interface for live business operations"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
                <span aria-hidden="true" className="absolute top-3 right-4 font-headline text-[72px] leading-none text-white/[0.07] select-none pointer-events-none">02</span>
                <span className="sharp-edge absolute left-4 top-4 z-10 bg-[#0F172A]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                  Live Deployment
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-headline text-2xl text-white leading-tight mb-2">Revenue Control Module</h3>
                  <p className="text-[11px] text-white/55 uppercase tracking-[0.14em]">94 active users · production since May 2025</p>
                  <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-[#2563EB] transition-all duration-700" />
                </div>
              </motion.article>

              {/* Card 3 */}
              <motion.article
                className="relative overflow-hidden sharp-edge aspect-[4/3] md:aspect-auto group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <Image
                  src="/Images/home/proof-in-production/quantified-results-growth-dashboard.webp"
                  alt="Quantified business results and growth metrics visualization"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
                <span aria-hidden="true" className="absolute top-3 right-4 font-headline text-[72px] leading-none text-white/[0.07] select-none pointer-events-none">03</span>
                <span className="sharp-edge absolute left-4 top-4 z-10 bg-[#0F172A]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                  Measured Outcomes
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-headline text-2xl text-white leading-tight mb-2">Quantified Results</h3>
                  <p className="text-[11px] text-white/55 uppercase tracking-[0.14em]">Manual triage ↓85% · Qualified meetings ↑43%</p>
                  <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-[#2563EB] transition-all duration-700" />
                </div>
              </motion.article>

            </div>
          </div>

          {/* Metrics strip */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 border border-[#e2e8f0] divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
            {[
              { val: '↓85%', label: 'Manual triage cut' },
              { val: '↑43%', label: 'Qualified meeting lift' },
              { val: '$2.4M', label: 'Revenue pipeline active' },
              { val: '94', label: 'Daily active operators' },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-4 px-7 py-5">
                <span className="font-headline text-2xl text-[#0F172A]">{m.val}</span>
                <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest leading-snug">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Production verified */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#2563EB] shrink-0">Production Verified</span>
            <span className="h-px flex-1 bg-[#e2e8f0]" />
          </div>

        </div>
      </section>

      {/* ── Vision / Trust Section ─────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] py-24 md:py-32 overflow-hidden">
        {/* Blueprint grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#3b82f6]/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — heading + feature list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-tight mb-14">
              Lasting Transformation Requires{' '}
              <em className="not-italic text-[#2563EB] font-headline italic">Operational Mastery</em>
            </h2>

            <div className="space-y-10">
              {/* Feature 01 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10">
                  <MessageSquare className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-headline text-2xl text-white mb-2">Strategic Consulting</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We diagnose operational friction, map decision bottlenecks, and translate leadership goals into an executable transformation program.
                  </p>
                </div>
              </div>

              {/* Feature 02 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10">
                  <Layers className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-headline text-2xl text-white mb-2">Precision Engineering</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    Systems are engineered for reliability under pressure, then continuously tuned to improve business performance.
                  </p>
                </div>
              </div>

              {/* Feature 03 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10">
                  <Eye className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-headline text-2xl text-white mb-2">Technical Execution</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We run a predictable consulting-to-delivery cadence so strategy decisions translate into measurable operational outcomes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — testimonial card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Glow behind card */}
            <div className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 bg-[#2563EB]/20 blur-3xl rounded-full" />

            <div ref={liveMetricsRef} className="relative z-10 bg-[#F2F4F6] p-10 md:p-12 overflow-hidden">
              <div className="flex items-center gap-2 mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
                <p className="text-[9px] font-mono uppercase tracking-[0.28em] text-[#2563EB]">Live Program Metrics</p>
              </div>
              <div className="space-y-0">
                {liveMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-baseline justify-between border-b border-[#0F172A]/10 py-4">
                    <span className="text-sm font-body text-[#475569]">{metric.label}</span>
                    <div className="flex items-baseline gap-1.5 ml-6 shrink-0">
                      <span className="text-[#2563EB] text-sm font-bold">{metric.dir}</span>
                      <span className="font-headline text-3xl text-[#0F172A] font-medium">
                        {formatLiveMetric(metric.target, metric.kind)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[9px] font-mono uppercase tracking-[0.2em] text-[#94a3b8]">
                From live deployments in production — Morocco, 2025
              </p>
            </div>

            {/* Link to capabilities */}
            <Link
              href="/capabilities"
              className="mt-6 inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-label font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              Our Capabilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      <VideoScrollSection
        videoSrc="/Images/media/scrollanimaion.mp4"
        topBg="#0F172A"
        bottomBg="#F5F6FA"
      />

      <div style={{ position: 'relative', overflow: 'hidden', color: '#1E272E', marginBottom: '6%' }} className="min-h-[140px] md:min-h-[200px]">
        <h2 className="text-[#1E272E]/90 text-2xl lg:text-4xl md:text-xl mb-8 mx-auto text-center font-light leading-relaxed">
          CORE TECHNOLOGY STACK
        </h2>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#F5F6FA"
          ariaLabel="Technology partners"
        />
      </div>

      <section ref={worldMapSectionRef} className="sharp-edge w-full pt-12 pb-0 rounded-xl overflow-hidden">
        <Suspense fallback={<div className="h-[220px] sm:h-[300px] md:h-[360px] w-full bg-[#ECF5FD]" aria-hidden="true" />}>
          <WorldMapDemo />
        </Suspense>
      </section>

      <BottomCTA
        variant="light"
        headline="Ready to Transform Core Operations End to End?"
        subtext="Share your goals and constraints. We will define the strategy, architecture, and execution path, then discuss pricing after discovery."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />

    </div>
  );
};

export default Home;


