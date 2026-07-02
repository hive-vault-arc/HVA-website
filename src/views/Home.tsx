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
import SectionBrandMark from '../components/SectionBrandMark';
import Background3d from '../components/Plasma';
import LogoLoop from '../components/LogoItem';
import HeroSlider from '../components/ui/HeroSlider';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import { useAnimationQuality } from '../lib/animationQuality';
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
  icon: LucideIcon;
}> = [
  {
    href: '/capabilities',
    question: 'What can HVA do?',
    title: 'Capabilities',
    description: 'Strategy, AI, software, cloud, and operations.',
    icon: Layers,
  },
  {
    href: '/industries',
    question: 'Do you work in my sector?',
    title: 'Industries',
    description: 'Real estate, healthcare, finance, public sector, retail.',
    icon: Building2,
  },
  {
    href: '/case-studies',
    question: 'Can I see proof?',
    title: 'Case Studies',
    description: 'CRM modernization and AI operations already shipped.',
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
    description: 'How the work is run.',
    icon: Route,
  },
  {
    href: '/insights',
    title: 'Insights',
    description: 'Articles, news, and reports.',
    icon: BookOpen,
  },
  {
    href: '/whoweare/abouthva',
    title: 'Who We Are',
    description: 'Team and principles.',
    icon: Users,
  },
  {
    href: '/ai-agents-tangier',
    title: 'AI Agents Tangier',
    description: 'Local AI service path.',
    icon: MapPin,
  },
  {
    href: '/contact',
    title: 'Book a Call',
    description: 'Start the conversation.',
    icon: CalendarCheck,
  },
];

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
  const arcPhases = [
    {
      phase: '01',
      title: 'Assess',
      discipline: 'Strategy & Architecture',
      icon: <MessageSquare className="h-5 w-5" strokeWidth={1.5} />,
      summary:
        'Diagnose operating friction, define target architecture, and sequence the work leadership can execute.',
      proof: 'Operating diagnosis',
    },
    {
      phase: '02',
      title: 'Re-engineer',
      discipline: 'AI, Software & Cloud',
      icon: <Layers className="h-5 w-5" strokeWidth={1.5} />,
      summary:
        'Build the systems, deploy the intelligence, and harden the infrastructure for real operational load.',
      proof: 'Production systems',
    },
    {
      phase: '03',
      title: 'Command',
      discipline: 'Operate & Evolve',
      icon: <Eye className="h-5 w-5" strokeWidth={1.5} />,
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
              Choose the page that matches what you need right now.
            </p>
          </div>

          <div className="home-pathfinder-primary">
            {HOME_NAV_PRIMARY_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="home-pathfinder-card home-pathfinder-card--primary"
                >
                  <span className="home-pathfinder-icon" aria-hidden="true">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="home-pathfinder-question">{item.question}</span>
                  <strong>{item.title}</strong>
                  <span className="home-pathfinder-description">{item.description}</span>
                  <span className="home-pathfinder-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="home-pathfinder-secondary" aria-label="More direct pages">
            {HOME_NAV_SECONDARY_LINKS.map((item) => {
              const Icon = item.icon;
              return (
              <Link
                key={item.href}
                href={item.href}
                className="home-pathfinder-card home-pathfinder-card--secondary"
              >
                <span className="home-pathfinder-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <em>{item.description}</em>
                </span>
                <span className="home-pathfinder-arrow" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Trusted by ─────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#DDE3EA]">
        <div className="mx-auto max-w-7xl px-6 lg:px-14 py-5 flex items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9AA4B2] shrink-0 hidden sm:block">
            Trusted by
          </p>
          <div className="h-5 w-px bg-[#DDE3EA] shrink-0 hidden sm:block" />
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
            <span className="text-[10px] text-[#9AA4B2] uppercase tracking-[0.22em]">Active partnership</span>
          </div>
        </div>
      </section>

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
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A838]">Our Identity</p>
            </div>
            <h2 className="mb-7 font-headline text-[clamp(3rem,13vw,4rem)] leading-[1.04] text-white md:text-6xl md:leading-[1.08]">
              Advise. Build.<br />
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
                  loading={pillar.image.includes('hva-technology-consulting-capability') ? 'eager' : 'lazy'}
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
                <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#E8A838]">
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
                  loading={idx === 1 ? 'eager' : 'lazy'}
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

      <section className="bg-white pt-16 pb-14 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">

          {/* Header — two column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-end mb-10 pb-8 border-b border-[#DDE3EA]">
            <div className="md:col-span-7">
              <div className="flex items-start gap-3">
                <SectionBrandMark size="sm" className="mt-0.5" />
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A838]">
                    Proof In Production
                  </p>
                  <h2 className="font-headline text-4xl md:text-5xl leading-[1.02] tracking-tight text-[#1A2535]">
                    Transformation Programs<br className="hidden md:block" /> Running in Production
                  </h2>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-4">
              <p className="text-base text-[#566274] leading-relaxed">
                Every program listed is live in a real operating environment — no demos, no projected results.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/case-studies" className="inline-flex min-h-11 items-center border-b-2 border-[#1A2535]/20 pb-0.5 text-xs font-bold uppercase tracking-widest text-[#1A2535] transition-all hover:border-[#E8A838] hover:text-[#E8A838]">
                  Proof Library →
                </Link>
                <Link href="/capabilities/solution-programs" className="inline-flex min-h-11 items-center border-b-2 border-[#1A2535]/20 pb-0.5 text-xs font-bold uppercase tracking-widest text-[#1A2535] transition-all hover:border-[#E8A838] hover:text-[#E8A838]">
                  Solution Programs →
                </Link>
              </div>
            </div>
          </div>

          {/* Cards — asymmetric: large featured left + 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[500px] lg:h-[540px]">

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
                className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.03]"
              />
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/90 via-[#1A2535]/20 to-transparent" />
              {/* Sequence number watermark */}
              <span aria-hidden="true" className="absolute top-5 right-6 font-headline text-[120px] leading-none text-white/[0.07] select-none pointer-events-none">
                01
              </span>
              {/* Eyebrow badge */}
              <span className="sharp-edge absolute left-5 top-5 z-10 bg-[#E8A838] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                System Built
              </span>
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10">
                <h3 className="font-headline text-3xl text-white leading-tight mb-3">
                  Customer Operations Engine
                </h3>
                <p className="text-sm text-white/55 uppercase tracking-[0.14em]">
                  Zero manual intervention · end-to-end in production
                </p>
                <div className="mt-5 h-[1px] w-0 group-hover:w-full bg-[#E8A838] transition-all duration-700 ease-spring" />
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
                  className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/90 via-[#1A2535]/20 to-transparent" />
                <span aria-hidden="true" className="absolute top-3 right-4 font-headline text-[72px] leading-none text-white/[0.07] select-none pointer-events-none">02</span>
                <span className="sharp-edge absolute left-4 top-4 z-10 bg-[#1A2535]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                  Live Deployment
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-headline text-xl md:text-2xl text-white leading-tight mb-2">Revenue Control Module</h3>
                  <p className="text-[11px] text-white/55 uppercase tracking-[0.14em]">94 active users · production since May 2025</p>
                  <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-[#E8A838] transition-all duration-700" />
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
                  className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/90 via-[#1A2535]/20 to-transparent" />
                <span aria-hidden="true" className="absolute top-3 right-4 font-headline text-[72px] leading-none text-white/[0.07] select-none pointer-events-none">03</span>
                <span className="sharp-edge absolute left-4 top-4 z-10 bg-[#1A2535]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
                  Measured Outcomes
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-headline text-xl md:text-2xl text-white leading-tight mb-2">Quantified Results</h3>
                  <p className="text-[11px] text-white/55 uppercase tracking-[0.14em]">Manual triage ↓85% · Qualified meetings ↑43%</p>
                  <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-[#E8A838] transition-all duration-700" />
                </div>
              </motion.article>

            </div>
          </div>

          {/* Metrics strip */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 border border-[#DDE3EA] divide-y md:divide-y-0 md:divide-x divide-[#DDE3EA]">
            {[
              { val: '↓85%', label: 'Manual triage cut' },
              { val: '↑43%', label: 'Qualified meeting lift' },
              { val: '$2.4M', label: 'Revenue pipeline active' },
              { val: '94', label: 'Daily active operators' },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-4 px-6 py-4">
                <span className="font-headline text-2xl text-[#1A2535]">{m.val}</span>
                <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest leading-snug">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Production verified */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8A838] animate-pulse inline-block shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#E8A838] shrink-0">Production Verified</span>
            <span className="h-px flex-1 bg-[#DDE3EA]" />
          </div>

        </div>
      </section>

      {/* ── Vision / Trust Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#1A2535] py-20 md:py-28">
        {/* Blueprint grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#E8A838]/70" />
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[#E8A838]/60 lg:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)] lg:gap-20">

          {/* Left — heading + feature list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 flex items-start gap-5">
              <SectionBrandMark surface="dark" size="md" className="mt-1" />
              <h2 className="max-w-[680px] font-headline text-[clamp(2.8rem,12vw,3.9rem)] leading-[1.02] text-white md:text-6xl md:leading-[0.98]">
                Lasting Transformation Requires{' '}
                <em className="not-italic text-[#E8A838] font-headline italic">The Full ARC</em>
              </h2>
            </div>

            <div className="relative border-l border-white/20">
              {arcPhases.map((phase) => (
                <div key={phase.phase} className="relative pl-7 pb-8 last:pb-0">
                  <span className="absolute -left-px top-0 h-12 w-px bg-[#E8A838]" aria-hidden="true" />
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 bg-white/10 text-white">
                      {phase.icon}
                    </div>
                    <div className="min-w-0 border-b border-white/10 pb-7 last:border-b-0">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0C15A]">
                          Phase {phase.phase}
                        </span>
                        <span className="text-sm text-white/40">{phase.discipline}</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="font-headline text-2xl text-white">{phase.title}</h4>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                          {phase.proof}
                        </span>
                      </div>
                      <p className="mt-3 max-w-[620px] font-body leading-relaxed text-white/70">
                        {phase.summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — metrics card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div ref={liveMetricsRef} className="relative z-10 overflow-hidden border border-[#C8CED7] bg-[#FFFFFF]">
              <div className="grid gap-5 border-b border-[#1A2535]/10 px-7 py-7 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#E8A838]" aria-hidden="true" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#E8A838]">
                      Live Program Metrics
                    </p>
                  </div>
                  <p className="max-w-[360px] text-sm leading-6 text-[#566274]">
                    Measured across active AI, CRM, and cloud programs after launch, where the ARC model stays accountable.
                  </p>
                </div>
                <div className="border border-[#1A2535]/10 px-4 py-3 text-right">
                  <span className="block font-headline text-3xl leading-none text-[#1A2535]">2025</span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#9AA4B2]">
                    Morocco
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#1A2535]/10">
                {liveMetrics.map((metric, idx) => (
                  <div key={metric.label} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 px-7 py-5">
                    <span className="font-mono text-[10px] font-bold text-[#9AA4B2]">0{idx + 1}</span>
                    <span className="text-sm font-body text-[#3D4858]">{metric.label}</span>
                    <div className="ml-4 flex shrink-0 items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#E8A838]">{metric.dir}</span>
                      <span className="font-headline text-3xl font-medium leading-none text-[#1A2535]">
                        {formatLiveMetric(metric.target, metric.kind)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 border-t border-[#1A2535]/10 bg-white/70">
                {['Production', 'Managed', 'Measured'].map((item) => (
                  <div key={item} className="border-r border-[#1A2535]/10 px-5 py-4 last:border-r-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#9AA4B2]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to capabilities */}
            <Link
              href="/capabilities"
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/20 px-6 py-3 text-xs font-label font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Our Capabilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

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
