import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Background3d from '../components/Plasma';
import LogoLoop from '../components/LogoItem';
import { FullScreenScrollFX } from '../components/ui/full-screen-scroll-fx';
import { useAnimationQuality } from '../lib/animationQuality';
import {
  SiAndroid,
  SiAmazonwebservices,
  SiCplusplus,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGoogle,
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

  const processSteps = [
    {
      title: 'Discover',
      description: 'Align on goals, audience, and delivery constraints.',
    },
    {
      title: 'Plan',
      description: 'Define scope, architecture, and milestone roadmap.',
    },
    {
      title: 'Build',
      description: 'Ship in focused sprints with QA and regular demos.',
    },
    {
      title: 'Scale',
      description: 'Optimize performance and grow with confidence.',
    },
  ];

  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiAmazonwebservices />, title: 'AWS', href: 'https://aws.amazon.com' },
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
      title: <>Mobile apps</>,
      rightLabel: 'Mobile apps',
      background: './Images/app.png',
    },
    {
      leftLabel: 'Web Development',
      title: <>Web apps</>,
      rightLabel: 'Web apps',
      background: './Images/web.png',
    },
    {
      leftLabel: 'AI Development',
      title: <>AI apps</>,
      rightLabel: 'AI apps',
      background: '/Images/ai.webp',
    },
    {
      leftLabel: 'SaaS Development',
      title: <>SaaS apps</>,
      rightLabel: 'SaaS apps',
      background: './Images/saas.png',
    },
  ];

  return (
    <div className="h-full">
      {showAdvancedEffects && (
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
              <span className="inline-block px-3 py-1 bg-[#0984E3]/10 text-[#0984E3] text-[10px] uppercase tracking-[0.22em] font-bold mb-8">
                Software &amp; Cloud Engineering
              </span>
              <h1 className="font-serif text-5xl md:text-7xl xl:text-[5.5rem] font-medium leading-[1.04] tracking-tight text-[#1E272E] mb-8">
                Building the Next<br />
                Generation of{' '}
                <em className="italic">Digital<br />Systems</em>.
              </h1>
              <p className="text-xl text-[#1E272E]/60 max-w-xl mb-12 font-light leading-relaxed">
                We engineer custom software, AI-powered applications, and cloud platforms that power modern businesses at scale.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/portfolio"
                  className="sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300"
                >
                  View Our Work
                </Link>
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-8 py-4 text-sm font-bold text-[#1E272E] hover:gap-4 transition-all duration-300"
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
                />
              </div>
              {/* Asymmetric floating card */}
              <div className="absolute -bottom-16 -left-6 md:-left-14 bg-white p-8 max-w-[17rem] shadow-xl hidden md:block">
                <Layers className="w-8 h-8 text-[#0984E3] mb-4" />
                <h3 className="font-serif text-xl mb-3 italic font-medium text-[#1E272E]">
                  Precision in Delivery.
                </h3>
                <p className="text-sm text-[#1E272E]/60 leading-relaxed">
                  Every line of code and architectural decision is built for performance, reliability, and long-term scale.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="relative px-4 py-14 sm:px-6 lg:px-14 lg:py-20">
        <div className="container mx-auto relative z-10">
          <div className="sharp-edge relative mb-10 rounded-2xl border border-[#1E272E]/15 bg-gradient-to-r from-white/[0.09] via-white/[0.05] to-white/[0.03] p-6 md:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#0984E3]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
            <p className="text-[#0984E3] tracking-[0.24em] text-xs uppercase font-medium">Who We Are</p>
            <p className="text-[#1E272E]/60 tracking-[0.2em] text-[11px] uppercase mt-5">Software & Cloud Engineering Company</p>
            <h2 className="text-5xl md:text-7xl font-semibold text-[#1E272E] mt-3 leading-[0.92]">
              Building Digital
              <br />
              Systems That
              <br />
              Scale
            </h2>
            <p className="text-[#1E272E]/80 mt-6 text-lg max-w-5xl">
              We engineer custom software systems, AI-powered applications, and cloud platforms with a focus on reliability,
              performance, and long-term maintainability.
            </p>
            <div className="sharp-edge mt-6 inline-flex items-center rounded-full border border-[#0984E3]/30 bg-[#0984E3]/10 px-4 py-2 text-sm text-[#0984E3]">
              Built for business outcomes, not just demos
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Clear ownership and predictable delivery',
              'Scalable architecture from day one',
              'Quality, security, and maintainability by default',
            ].map((item) => (
              <div key={item} className="sharp-edge rounded-xl border border-[#1E272E]/15 bg-[#0984E3]/[0.06] p-5 text-[#1E272E]/95 flex items-start gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <CheckCircle2 className="w-4 h-4 mt-1 text-[#0984E3] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-10 sm:px-6 lg:px-14 lg:pb-16">
        <div className="container mx-auto px-2 py-10 md:px-4 md:py-14">
          <div className="relative overflow-hidden bg-[linear-gradient(132deg,#1E272E_0%,#2A4D79_52%,#0984E3_100%)] px-4 py-8 shadow-[0_24px_44px_rgba(9,132,227,0.2)] md:px-7 md:py-11">
            <div className="pointer-events-none absolute -left-14 top-10 h-36 w-36 rounded-full bg-[#4CA6EC]/16 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[#00CEC9]/14 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(255,255,255,0.1),transparent_44%),radial-gradient(circle_at_88%_16%,rgba(255,255,255,0.14),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/42 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00CEC9]/55 to-transparent" />

            <div className="relative z-10 mx-auto max-w-5xl px-2 text-center md:px-4">
              <h2 className="font-serif text-4xl md:text-7xl font-semibold text-[#F5F6FA] leading-[0.95]">
                Clear Scope...Ship
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-base text-[#F5F6FA]/84 md:text-2xl">
                One focused process from discovery to release. We align requirements, architecture, and delivery so your product ships with confidence.
              </p>
            </div>

            <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/32 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 gap-8 px-2 pb-1 md:grid-cols-2 md:items-start md:px-4">
              <h3 className="font-serif text-3xl md:text-5xl text-[#F5F6FA] leading-tight">
                From strategy to production, one dependable engineering flow
              </h3>

              <div>
                <p className="text-lg text-[#F5F6FA]/86 md:text-2xl">
                  Discover. Plan. Build. Scale. Each phase is tied to measurable business outcomes and technical quality.
                </p>
                <Link
                  to="/services"
                  className="mt-7 inline-flex items-center gap-2 border border-white/44 bg-white/12 px-5 py-2.5 text-[#F5F6FA] tracking-[0.14em] uppercase text-xs font-medium backdrop-blur-sm transition-colors hover:bg-white/18"
                >
                  Engineering Process
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <p className="text-[#1E272E]/62 tracking-[0.24em] text-xs uppercase">How We Deliver</p>
            <h2 className="mt-3 font-serif text-4xl md:text-6xl font-semibold text-[#1E272E]">Clear Engineering Execution</h2>
          </div>

          <div className="relative rounded-[34px] bg-[linear-gradient(155deg,rgba(255,255,255,0.62),rgba(236,245,253,0.42))] p-4 md:p-5">
            <div className="pointer-events-none absolute -left-8 top-14 h-24 w-24 rounded-full bg-[#0984E3]/10 blur-2xl" />
            <div className="pointer-events-none absolute right-10 top-8 h-20 w-20 rounded-full bg-[#00CEC9]/12 blur-2xl" />
            <div className="pointer-events-none absolute left-[11%] right-[11%] top-[4.2rem] hidden h-[2px] bg-gradient-to-r from-[#0984E3]/45 via-[#4CA6EC]/45 to-[#00CEC9]/45 xl:block" />

            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className={[
                    'group relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(236,245,253,0.68))] p-6 shadow-[0_12px_28px_rgba(9,132,227,0.09)]',
                    index % 2 === 1 ? 'md:translate-y-3' : '',
                  ].join(' ')}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#0984E3]/10 blur-2xl transition-transform duration-500 group-hover:scale-110" />
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/86 px-2.5 py-1">
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ECF5FD] text-[#0984E3] text-xs font-semibold">
                      {`0${index + 1}`}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1E272E]/56">Step</span>
                  </div>
                  <h3 className="mt-4 text-[#1E272E] text-4xl font-serif leading-none">{step.title}</h3>
                  <p className="text-[#1E272E]/72 mt-4 text-lg leading-relaxed">{step.description}</p>
                  <div className="mt-5 h-[3px] w-full bg-[#1E272E]/10">
                    <div
                      className="h-full bg-[linear-gradient(90deg,#0984E3_0%,#00CEC9_100%)]"
                      style={{ width: `${44 + index * 18}%` }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
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
                      <img src={section.background} alt={String(section.title)} className="h-full w-full object-cover" loading="lazy" />
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

      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', color: '#1E272E', marginBottom: '6%' }}>
        <h1 className="text-[#1E272E]/90 text-2xl lg:text-4xl md:text-xl mb-8 mx-auto text-center font-light leading-relaxed">
          CORE TECHNOLOGY STACK
        </h1>
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
          <Suspense fallback={<div className="h-[360px] w-full bg-[#ECF5FD]" aria-hidden="true" />}>
            <WorldMapDemo />
          </Suspense>
        ) : (
          <div className="h-[360px] w-full bg-[#ECF5FD]" aria-hidden="true" />
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
                to="/contact"
                className="sharp-edge inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-[#ECF5FD] transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
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
