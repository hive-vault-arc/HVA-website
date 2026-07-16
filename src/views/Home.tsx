'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  CalendarCheck,
  Cloud,
  Eye,
  Layers,
  MapPin,
  MessageSquare,
  Route,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BottomCTA from '../components/BottomCTA';
import ClientEvidenceRail from '../components/ClientEvidenceRail';
import SectionBrandMark from '../components/SectionBrandMark';
import Background3d from '../components/Plasma';
import LogoLoop from '../components/LogoItem';
import HeroSlider from '../components/ui/HeroSlider';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import { useAnimationQuality } from '../lib/animationQuality';
import type { ClientEvidenceSummary } from '../lib/proof';
import {
  SiAndroid,
  SiCplusplus,
  SiCloudflare,
  SiDatadog,
  SiDocker,
  SiElasticsearch,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGoogle,
  SiGooglecloud,
  SiGrafana,
  SiKibana,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiOpenjdk,
  SiOpenai,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSentry,
  SiSupabase,
  SiTensorflow,
  SiTerraform,
  SiVercel,
} from 'react-icons/si';

const WorldMapDemo = lazy(() =>
  import('../components/world-map-demo').then((module) => ({ default: module.WorldMapDemo }))
);
const InsightsCarousel = dynamic(() => import('../components/InsightsCarousel'), {
  loading: () => <div className="h-[560px] bg-[#FFFFFF]" aria-hidden="true" />,
});

const HOME_NAV_PRIMARY_LINKS: Array<{
  href: string;
  question: string;
  title: string;
  description: string;
  action: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}> = [
  {
    href: '/capabilities',
    question: 'What can HVA do?',
    title: 'Capabilities',
    description: 'Strategy, AI, software, cloud, and operations.',
    action: 'Explore services',
    image: '/Images/page-heroes/hva-capabilities-hero-background.webp',
    imageAlt: 'Abstract systems map for Hive Vault Arc capabilities',
    icon: Layers,
  },
  {
    href: '/industries',
    question: 'Do you work in my sector?',
    title: 'Industries',
    description: 'Real estate, healthcare, finance, public sector, retail.',
    action: 'See sectors',
    image: '/Images/page-heroes/hva-industries-hero-background.webp',
    imageAlt: 'Abstract sector coverage map for Hive Vault Arc industries',
    icon: Building2,
  },
  {
    href: '/case-studies',
    question: 'Can I see proof?',
    title: 'Case Studies',
    description: 'CRM modernization and AI operations already shipped.',
    action: 'View proof',
    image: '/Images/home/pathfinder/pathfinder-proof.webp',
    imageAlt: 'Abstract performance chart for Hive Vault Arc proof in production',
    icon: BarChart3,
  },
];

const HOME_NAV_SECONDARY_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    href: '/arc',
    title: 'ARC Framework',
    description: 'Delivery method',
    icon: Route,
  },
  {
    href: '/insights',
    title: 'Insights',
    description: 'Articles and reports',
    icon: BookOpen,
  },
  {
    href: '/aboutus',
    title: 'Who We Are',
    description: 'Team and principles',
    icon: Users,
  },
  {
    href: '/ai-agents-tangier',
    title: 'AI Agents Tangier',
    description: 'AI services in Tangier',
    icon: MapPin,
  },
  {
    href: '/contact',
    title: 'Book a Call',
    description: 'Talk with HVA',
    icon: CalendarCheck,
  },
];

type HomeProps = {
  insightsCarouselItems: InsightsCarouselItem[];
  clientEvidence: ClientEvidenceSummary[];
};

const Home: React.FC<HomeProps> = ({ insightsCarouselItems, clientEvidence }) => {
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
  const arcPhases = [
    {
      phase: '01',
      title: 'Assess',
      discipline: 'Strategy & Architecture',
      summary:
        'Diagnose operating friction, define target architecture, and sequence the work leadership can execute.',
      proof: 'Operating diagnosis',
    },
    {
      phase: '02',
      title: 'Re-engineer',
      discipline: 'AI, Software & Cloud',
      summary:
        'Build the systems, deploy the intelligence, and harden the infrastructure for real operational load.',
      proof: 'Production systems',
    },
    {
      phase: '03',
      title: 'Command',
      discipline: 'Operate & Evolve',
      summary:
        'Stabilize, monitor, and evolve the systems long-term so decisions become measurable outcomes.',
      proof: 'Managed outcomes',
    },
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
      icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Strategy & Business Consulting',
      desc: 'Diagnose, define, and design transformation before a single line of code is written.',
      image: '/Images/capabilities/hva-strategy-business-capability.webp',
      imageAlt: 'Strategy and business consulting operating model design',
      details: [
        'Business and digital transformation strategy',
        'Operational diagnostics and process redesign',
        'Innovation strategy and market expansion',
      ],
    },
    {
      icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Technology Consulting',
      desc: 'Architecture decisions made early compound positively. We design systems that last.',
      image: '/Images/capabilities/hva-technology-consulting-capability.webp',
      imageAlt: 'Technology consulting architecture and systems planning',
      details: [
        'Enterprise architecture and technology roadmaps',
        'Platform strategy and systems integration',
        'IT modernization and infrastructure design',
      ],
    },
    {
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
      title: 'AI, Data & Analytics',
      desc: 'AI agents on WhatsApp, web chat, and email — multilingual, always-on, trained on your operations.',
      image: '/Images/capabilities/hva-ai-data-capability.webp',
      imageAlt: 'AI and data analytics production intelligence systems',
      details: [
        'AI agent design and deployment',
        'Generative AI strategy and engineering',
        'Data engineering and business intelligence',
      ],
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Software Engineering',
      desc: 'Production-grade custom software, SaaS platforms, and web and mobile applications.',
      image: '/Images/capabilities/hva-software-engineering-capability.webp',
      imageAlt: 'Software engineering production-grade systems workspace',
      details: [
        'Custom software and SaaS platform development',
        'Web and mobile application delivery',
        'API engineering and DevOps',
      ],
    },
    {
      icon: <Cloud className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Cloud & Infrastructure',
      desc: 'Built for scale, security, and resilience — zero-trust design and observability from day one.',
      image: '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
      imageAlt: 'Cloud infrastructure secure systems and observability',
      details: [
        'AWS, Azure, and GCP cloud migration',
        'Infrastructure automation and security architecture',
        'Observability, DR, and managed cloud services',
      ],
    },
    {
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Operations & Managed Services',
      desc: 'We stay after go-live. Same team — strategy through production. No handoff.',
      image: '/Images/capabilities/hva-operations-managed-capability.webp',
      imageAlt: 'Operations and managed services monitoring workspace',
      details: [
        'Managed operations and application maintenance',
        'AI system management post-deployment',
        'Business process outsourcing and shared services',
      ],
    },
  ];

  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiGooglecloud />, title: 'Cloud', href: 'https://cloud.google.com' },
    { node: <SiKubernetes />, title: 'Kubernetes', href: 'https://kubernetes.io' },
    { node: <SiTerraform />, title: 'Terraform', href: 'https://www.terraform.io' },
    { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
    { node: <SiCloudflare />, title: 'Cloudflare', href: 'https://www.cloudflare.com' },
    { node: <SiFirebase />, title: 'Firebase', href: 'https://firebase.google.com' },
    { node: <SiSupabase />, title: 'Supabase', href: 'https://supabase.com' },
    { node: <SiGoogle />, title: 'Google', href: 'https://www.google.com' },
    { node: <SiGithub />, title: 'GitHub', href: 'https://www.github.com' },
    { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiFlutter />, title: 'Flutter', href: 'https://flutter.dev' },
    { node: <SiTensorflow />, title: 'AI', href: 'https://www.tensorflow.org' },
    { node: <SiOpenai />, title: 'OpenAI', href: 'https://openai.com' },
    { node: <SiGrafana />, title: 'Grafana', href: 'https://grafana.com' },
    { node: <SiPrometheus />, title: 'Prometheus', href: 'https://prometheus.io' },
    { node: <SiSentry />, title: 'Sentry', href: 'https://sentry.io' },
    { node: <SiDatadog />, title: 'Datadog', href: 'https://www.datadoghq.com' },
    { node: <SiElasticsearch />, title: 'Elasticsearch', href: 'https://www.elastic.co/elasticsearch' },
    { node: <SiKibana />, title: 'Kibana', href: 'https://www.elastic.co/kibana' },
    { node: <SiRedis />, title: 'Redis', href: 'https://redis.io' },
    { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
    { node: <SiNginx />, title: 'Nginx', href: 'https://nginx.org' },
    { node: <SiLinux />, title: 'Linux', href: 'https://www.linux.org' },
    { node: <SiAndroid />, title: 'Mobile App', href: 'https://developer.android.com' },
    { node: <SiPostgresql />, title: 'Postgres', href: 'https://www.postgresql.org' },
    { node: <SiCplusplus />, title: 'C++', href: 'https://isocpp.org' },
    { node: <SiOpenjdk />, title: 'Java', href: 'https://openjdk.org' },
  ];

  return (
    <div className="h-full home-reference">
      {bgReady && showAdvancedEffects && (
        <Background3d
          color="#E8A838"
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

      {/* ── Primary Site Shortcuts ─────────────────────────────────────── */}
      <nav
        aria-labelledby="home-site-shortcuts-title"
        className="home-pathfinder"
      >
        <div className="home-pathfinder-shell">
          <div className="home-pathfinder-header">
            <div className="home-pathfinder-title">
              <SectionBrandMark size="sm" />
              <div>
                <span>Website guide</span>
                <h2 id="home-site-shortcuts-title">Where should I go?</h2>
              </div>
            </div>
            <p>
              Pick a starting point. Direct routes stay close.
            </p>
          </div>

          <div className="home-pathfinder-board">
            <div className="home-pathfinder-primary">
              {HOME_NAV_PRIMARY_LINKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`home-pathfinder-card home-pathfinder-card--primary ${
                    index === 0 ? 'home-pathfinder-card--featured' : ''
                  }`}
                  style={{ '--pathfinder-index': index } as React.CSSProperties}
                >
                  <span className="home-pathfinder-card-media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes={index === 0 ? '(max-width: 1040px) 100vw, 44vw' : '(max-width: 1040px) 50vw, 26vw'}
                      className="object-cover"
                    />
                  </span>
                  <span className="home-pathfinder-card-body">
                    <span className="home-pathfinder-icon" aria-hidden="true">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span className="home-pathfinder-question">{item.question}</span>
                    <strong>{item.title}</strong>
                    <span className="home-pathfinder-description">{item.description}</span>
                    <span className="home-pathfinder-action">
                      {item.action}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </Link>
              );
              })}
            </div>

            <div className="home-pathfinder-secondary" aria-label="More direct pages">
              <div className="home-pathfinder-secondary-intro">
                <span>Direct routes</span>
                <strong>Jump to a specific page.</strong>
              </div>
              {HOME_NAV_SECONDARY_LINKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="home-pathfinder-card home-pathfinder-card--secondary"
                  style={{ '--pathfinder-index': index + HOME_NAV_PRIMARY_LINKS.length } as React.CSSProperties}
                >
                  <span className="home-pathfinder-secondary-icon" aria-hidden="true">
                    <Icon className="h-4 w-4" strokeWidth={1.55} />
                  </span>
                  <span className="home-pathfinder-secondary-copy">
                    <strong>{item.title}</strong>
                    <em>{item.description}</em>
                  </span>
                  <ArrowRight className="home-pathfinder-secondary-arrow h-4 w-4" strokeWidth={1.55} aria-hidden="true" />
                </Link>
              );
              })}
            </div>
          </div>
        </div>
      </nav>

      <ClientEvidenceRail evidence={clientEvidence} />

      {/* ── Insights Carousel ──────────────────────────────────────────── */}
      <InsightsCarousel items={insightsCarouselItems} />

      {/* ── Who We Are — Identity Section ──────────────────────────────── */}
      <section className="relative grid grid-cols-1 bg-[#FFFFFF] lg:grid-cols-12">

        {/* Left — dark identity panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#1A2535] px-6 py-14 sm:px-8 md:px-10 lg:col-span-4 lg:py-20">
          {/* Dot grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#F0C15A 1px, transparent 0)', backgroundSize: '28px 28px' }}
          />
          {/* Blue left accent bar */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-[3px] bg-[#E8A838]" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <SectionBrandMark surface="dark" size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--section-label-color)]">Our Identity</p>
            </div>
            <h2 className="mb-7 font-headline text-[clamp(3rem,13vw,4rem)] leading-[1.04] text-white md:text-6xl md:leading-[1.08]">
              Advise. Build.<br />{' '}
              <em className="font-headline italic text-white/40">Operate.</em>
            </h2>
            <p className="text-white/60 font-body leading-relaxed text-base mb-10 max-w-sm">
              Hive Vault Arc is a technology transformation partner — combining strategy, AI engineering, software development, and managed operations in one team. We stay until it works.
            </p>
            <div className="h-px w-12 bg-[#E8A838] mb-4" />
            <p className="text-[9px] font-label font-bold uppercase tracking-[0.28em] text-white/40">
              Strategy · AI Engineering · Software · Operations
            </p>
          </div>
        </div>

        {/* Right — mobile visual pillar grid */}
        <div className="lg:hidden grid grid-cols-1 gap-px bg-[#DDE3EA] sm:grid-cols-2">
          {capabilityPillars.map((pillar) => (
            <article key={pillar.title} className="bg-white">
              <div className="relative h-36 overflow-hidden bg-[#1A2535]">
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  loading={
                    pillar.image.includes('hva-strategy-business-capability') ||
                    pillar.image.includes('hva-technology-consulting-capability')
                      ? 'eager'
                      : 'lazy'
                  }
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover opacity-64"
                />
                <div className="absolute inset-0 bg-[#E8A838]/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/40 to-[#1A2535]/10" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1A2535]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center bg-white/10 text-white">
                  {pillar.icon}
                </div>
              </div>
              <div className="border-l-2 border-[#E8A838] p-5">
                <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[var(--section-label-color)]">
                  Pillar
                </p>
                <h3 className="font-headline text-xl leading-tight text-[#1A2535]">{pillar.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#566274]">{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Right — six capability pillars */}
        <div className="hidden lg:col-span-8 lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-px bg-[#DDE3EA]">
          {capabilityPillars.map((pillar, idx) => {
            const isHovered = hoveredPillar === idx;
            const isOther = hoveredPillar !== null && hoveredPillar !== idx;
            return (
              <motion.article
                key={pillar.title}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className={`group relative h-[330px] overflow-hidden bg-white transition-opacity duration-200 ${
                  isOther ? 'opacity-65' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredPillar(idx)}
                onFocus={() => setHoveredPillar(idx)}
                onBlur={() => setHoveredPillar(null)}
                onMouseLeave={() => setHoveredPillar(null)}
                tabIndex={0}
              >
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                  sizes="(max-width: 1024px) 100vw, 22vw"
                  className="object-cover opacity-54 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#E8A838]/10 mix-blend-multiply" />
                <div
                  className={`absolute inset-0 transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-80'
                  } bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/60 to-[#E8A838]/20`}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-75'
                  } h-3/4 bg-gradient-to-t from-[#1A2535] via-[#1A2535]/70 to-transparent`}
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-white/10 text-white ring-1 ring-white/20">
                      {pillar.icon}
                    </div>
                    <span className="font-mono text-[0.58rem] text-white/70">0{idx + 1}</span>
                  </div>

                  <div
                    className={`mt-auto border-l border-[#F0C15A]/60 px-4 py-4 transition-colors duration-200 ${
                      isHovered ? 'bg-[#1A2535]/95' : 'bg-[#1A2535]/80'
                    }`}
                  >
                    <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#F4D27C]">
                      Pillar 0{idx + 1}
                    </p>
                    <h3 className="max-w-[18rem] font-headline text-[1.72rem] leading-[1.06] text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-[21rem] text-sm leading-relaxed text-white/90">
                      {pillar.desc}
                    </p>
                    <ul
                      className={`list-none overflow-hidden p-0 m-0 transition-all duration-200 ${
                        isHovered ? 'mt-4 max-h-28 opacity-100' : 'mt-0 max-h-0 opacity-0'
                      }`}
                      aria-hidden={!isHovered}
                    >
                      {pillar.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-white/90">
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#F0C15A]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="home-arc-loop-section">
        <div className="home-arc-loop-shell">
          <div className="home-arc-loop-feature">
            <motion.div
              className="home-arc-loop-copy"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="home-arc-loop-mark">
                <SectionBrandMark surface="light" size="md" />
                <span>The ARC loop</span>
              </div>
              <h2>
                Lasting transformation requires the full ARC.
              </h2>
              <p>
                Assess the constraint. Build the operating system. Keep production accountable after launch.
              </p>
              <Link href="/capabilities" className="home-arc-loop-link">
                Our capabilities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              className="home-arc-loop-visual"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Image
                src="/Images/capabilities/hva-operations-managed-capability.webp"
                alt="Operations command workspace with dashboards and production monitoring screens"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="home-arc-loop-visual-card">
                <span>Featured operating story</span>
                <strong>One accountable team from diagnosis to production.</strong>
              </div>
            </motion.div>
          </div>

          <div className="home-arc-loop-phases">
            {arcPhases.map((phase) => (
              <article key={phase.phase} className="home-arc-loop-phase" data-phase={phase.phase}>
                <div className="home-arc-loop-phase-head">
                  <span>{phase.phase}</span>
                  <em>{phase.discipline}</em>
                </div>
                <div className="home-arc-loop-phase-title">
                  <h3>{phase.title}</h3>
                </div>
                <strong>{phase.proof}</strong>
                <p>{phase.summary}</p>
              </article>
            ))}
          </div>

          <div ref={liveMetricsRef} className="home-arc-loop-metrics" aria-label="Live ARC program metrics">
            <div className="home-arc-loop-metrics-intro">
              <span>Live program metrics</span>
              <strong>2025 Morocco</strong>
              <p>Measured after launch across active AI, CRM, and cloud programs.</p>
            </div>
            {liveMetrics.map((metric) => (
              <div key={metric.label} className="home-arc-loop-metric">
                <strong>
                  <span>{metric.dir}</span>
                  {formatLiveMetric(metric.target, metric.kind)}
                </strong>
                <em>{metric.label}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="home-technology-marquee relative overflow-hidden pt-16 pb-6 text-[#1A2535] md:pt-20 md:pb-8">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#FFFFFF"
          ariaLabel="Technology partners"
        />
      </div>

      <section ref={worldMapSectionRef} className="sharp-edge w-full pt-0 pb-0 rounded-xl overflow-hidden">
        <Suspense fallback={<div className="h-[220px] sm:h-[300px] md:h-[360px] w-full bg-[#FFF7E8]" aria-hidden="true" />}>
          <WorldMapDemo />
        </Suspense>
      </section>

      <BottomCTA
        variant="dark"
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
