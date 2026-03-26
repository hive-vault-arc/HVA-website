'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Cloud, Database, Eye, Layers, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Background3d from '../components/Plasma';
import LogoLoop from '../components/LogoItem';
import { FullScreenScrollFX } from '../components/ui/full-screen-scroll-fx';
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

const Home: React.FC = () => {
  const { tier, motionReduced } = useAnimationQuality();
  const showAdvancedEffects = tier === 'high' && !motionReduced;
  const worldMapSectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadWorldMap, setShouldLoadWorldMap] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    if (shouldLoadWorldMap) return;

    const section = worldMapSectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShouldLoadWorldMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadWorldMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px', threshold: 0.01 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadWorldMap]);

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

  const servicePillars = [
    {
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
      title: 'AI & Automation',
      desc: 'AI agents, receptionists, and automated workflows that handle repetitive operations continuously — no manual effort required.',
    },
    {
      icon: <Database className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Custom Platforms',
      desc: 'CRM systems, inventory tools, and enterprise platforms engineered from scratch for the exact way your business operates.',
    },
    {
      icon: <Cloud className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Cloud & Infrastructure',
      desc: 'End-to-end cloud deployment, CI/CD pipelines, and managed infrastructure built for zero-downtime reliability.',
    },
    {
      icon: <Smartphone className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Apps & Web',
      desc: 'Custom mobile apps and high-performance web platforms — from concept to production, fully owned by you.',
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

  const sections = [
    {
      leftLabel: 'Mobile Development',
      title: 'Mobile apps',
      rightLabel: 'Mobile apps',
      background: './Images/app.png',
      alt: 'Custom mobile app development by H.V.A',
    },
    {
      leftLabel: 'Web Development',
      title: 'Web apps',
      rightLabel: 'Web apps',
      background: './Images/web.png',
      alt: 'Custom web application development by H.V.A',
    },
    {
      leftLabel: 'AI Development',
      title: 'AI apps',
      rightLabel: 'AI apps',
      background: '/Images/ai.webp',
      alt: 'AI-powered application development by H.V.A',
    },
    {
      leftLabel: 'SaaS Development',
      title: 'SaaS apps',
      rightLabel: 'SaaS apps',
      background: './Images/saas.png',
      alt: 'Custom SaaS platform development by H.V.A',
    },
  ];

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

      {/* Hero Section */}
      <section className="relative px-6 pt-28 pb-32 lg:px-14 lg:pt-36 lg:pb-40 overflow-visible">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: copy */}
            <motion.div
              className="lg:col-span-7 z-10"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="home-hero-eyebrow inline-block px-3 py-1 bg-[#0984E3]/10 text-[#0984E3] text-[10px] uppercase tracking-[0.22em] font-bold mb-8">
                Software &amp; Cloud Engineering
              </span>
              <h1 className="home-hero-title font-serif text-4xl sm:text-5xl md:text-7xl xl:text-[5.5rem] font-medium leading-[1.04] tracking-tight text-[#1E272E] mb-8">
                Building the Next<br />
                Generation of{' '}
                <em className="italic">Digital<br />Systems</em>.
              </h1>
              <p className="home-hero-copy text-xl text-[#1E272E]/60 max-w-xl mb-12 font-light leading-relaxed">
                We engineer custom software, AI-powered applications, and cloud platforms that power modern businesses at scale.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/portfolio"
                  className="home-hero-primary sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300"
                >
                  View Our Work
                </Link>
                <Link
                  href="/services"
                  className="home-hero-secondary flex items-center gap-2 px-8 py-4 text-sm font-bold text-[#1E272E] hover:gap-4 transition-all duration-300"
                >
                  Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right: image + floating card */}
            <motion.div
              className="lg:col-span-5 relative mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="/Images/hero.webp"
                  alt="Precision software engineering"
                  className="w-full h-full object-cover hero-image-animate"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              {/* Asymmetric floating card */}
              <div className="absolute -bottom-16 -left-6 md:-left-14 bg-white p-8 max-w-[17rem] shadow-xl hidden md:block">
                <Layers className="w-8 h-8 text-[#0984E3] mb-4" />
                <h3 className="home-float-title font-serif text-xl mb-3 italic font-medium text-[#1E272E]">
                  Precision in Delivery.
                </h3>
                <p className="home-float-copy text-sm text-[#1E272E]/60 leading-relaxed">
                  Every line of code and architectural decision is built for performance, reliability, and long-term scale.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

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
              Strategic Vision.<br />
              <em className="font-headline italic text-white/35">Technical Execution.</em>
            </h2>
            <p className="text-white/60 font-body leading-relaxed text-base mb-10 max-w-sm">
              Hive Vault Arc is a software and AI engineering agency. We build the systems your business runs on — from intelligent automation and custom platforms to cloud infrastructure and mobile apps.
            </p>
            <div className="h-px w-12 bg-[#2563EB] mb-4" />
            <p className="text-[9px] font-label font-bold uppercase tracking-[0.28em] text-white/35">
              AI · Cloud · Automation · Mobile
            </p>
          </div>
        </div>

        {/* Right — 2×2 service pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#d1d5db]">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white p-10 flex flex-col gap-5 group relative hover:bg-[#F8FAFC] transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#dbeafe] text-[#2563EB] shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-headline text-xl text-[#0F172A] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{pillar.desc}</p>
              </div>
              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2563EB] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
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
              Our Vision is Built on{' '}
              <em className="not-italic text-[#2563EB] font-headline italic">Architectural Rigor</em>
            </h2>

            <div className="space-y-10">
              {/* Feature 01 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10">
                  <Layers className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-headline text-2xl text-white mb-2">Precision Engineering</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    We don't just write code; we engineer systems. Every module is stress-tested for endurance and future expansion.
                  </p>
                </div>
              </div>

              {/* Feature 02 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10">
                  <Eye className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-headline text-2xl text-white mb-2">Technical Execution</h4>
                  <p className="text-white/60 font-body leading-relaxed">
                    Clarity in strategy leads to excellence in execution. We maintain an uncompromising standard of technical debt management.
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

            <div className="relative z-10 bg-[#F2F4F6] p-10 md:p-12">
              {/* Opening quote mark */}
              <span aria-hidden="true" className="font-headline italic text-[#2563EB]/20 text-[5rem] leading-none absolute top-2 left-6 select-none">"</span>
              <p className="text-2xl md:text-3xl font-headline italic text-[#0F172A] leading-snug mb-8">
                "H.V.A didn't just build a platform; they built a legacy infrastructure. Their architectural vision saved us years of technical restructuring."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0F172A] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold font-label">CTO</span>
                </div>
                <div>
                  <p className="font-label font-bold uppercase tracking-widest text-xs text-[#0F172A]">Chief Technology Officer</p>
                  <p className="font-body text-sm text-[#475569]">Global Logistics Corp.</p>
                </div>
              </div>
            </div>

            {/* Link to services */}
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-label font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              Our Engineering Process
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      <section className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative z-10 mt-16 p-4 md:p-8 shadow-md"
        >
          {showAdvancedEffects ? (
            <div className="w-full overflow-hidden rounded-xl">
              <FullScreenScrollFX
                sections={sections}
                header={
                  <>
                    <div>What We</div>
                    <div>Build</div>
                  </>
                }
                footer={<div />}
                showProgress
                colors={{
                  text: 'rgba(30,39,46,0.94)',
                  overlay: 'rgba(245,246,250,0.35)',
                  pageBg: '#F5F6FA',
                  stageBg: '#ECF5FD',
                }}
                durations={{ change: 0.7, snap: 800 }}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-[#1E272E]/10 bg-white/90 p-6 md:p-8">
              <p className="text-[#1E272E]/60 tracking-[0.2em] text-xs uppercase">What We Build</p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sections.map((section) => (
                  <article key={String(section.leftLabel)} className="rounded-lg border border-[#1E272E]/12 bg-[#F5F6FA] p-3">
                    <div className="aspect-[16/10] overflow-hidden rounded-md border border-[#1E272E]/10">
                      <img src={section.background} alt={section.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-[#1E272E]">{section.title}</h3>
                    <p className="text-sm text-[#1E272E]/72 mt-1">{section.leftLabel}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

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

      <section ref={worldMapSectionRef} className="sharp-edge w-full py-12 rounded-xl overflow-hidden">
        {shouldLoadWorldMap ? (
          <Suspense fallback={<div className="h-[220px] sm:h-[300px] md:h-[360px] w-full bg-[#ECF5FD]" aria-hidden="true" />}>
            <WorldMapDemo />
          </Suspense>
        ) : (
          <div className="h-[220px] sm:h-[300px] md:h-[360px] w-full bg-[#ECF5FD]" aria-hidden="true" />
        )}
      </section>

      <section className="relative py-12 mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="sharp-edge max-w-4xl mx-auto rounded-2xl border border-[#1E272E]/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl text-[#1E272E] font-semibold">Ready to Build What’s Next?</h2>
            <p className="text-[#1E272E]/75 mt-4 max-w-2xl mx-auto">
              Share your goals and constraints. We will propose a focused execution plan for your product.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="sharp-edge inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-[#ECF5FD] transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="sharp-edge inline-flex items-center justify-center px-8 py-4 bg-[#0984E3]/10 text-[#1E272E] border border-[#1E272E]/20 rounded-lg font-medium hover:bg-[#0984E3]/20 transition-colors duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
