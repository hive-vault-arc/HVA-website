import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Background3d from '../components/Plasma';
import TextType from '../components/TextType';
import ShinyText from '../components/ShinyText';
import LogoLoop from '../components/LogoItem';
import GradualBlur from '../components/GradualBlur';
import { WorldMapDemo } from '../components/world-map-demo';
import { InteractiveSpline } from '../components/ui/InteractiveSpline';
import { FullScreenScrollFX } from '../components/ui/full-screen-scroll-fx';
import {
  SiAmazonwebservices,
  SiDocker,
  SiFirebase,
  SiGithub,
  SiGoogle,
  SiNextdotjs,
  SiReact,
} from 'react-icons/si';

const Home: React.FC = () => {
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
      <Background3d color="#0984E3" speed={0.6} direction="forward" scale={1.1} opacity={0.26} mouseInteractive={false} />

      <InteractiveSpline
        sceneUrl="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="h-[88vh]"
        cursorSensitivity={0.15}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-8xl font-semibold text-[#1E272E] mb-6">
              <TextType
                text={[
                  'Software & Cloud Engineering',
                  'Custom Digital Systems',
                  'AI-Powered Applications',
                  'Scalable Business Platforms'
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
              />
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              <ShinyText text="A software and cloud engineering company building custom digital systems, AI-powered applications, and scalable platforms for modern businesses." />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/portfolio"
                className="px-8 py-4 bg-[#0984E3]/10 text-[#1E272E] border border-[#1E272E]/10 rounded-lg font-medium hover:bg-[#0984E3]/20 transition-colors duration-300 text-lg"
              >
                View Our Work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-black border border-white rounded-lg font-medium hover:bg-[#ECF5FD] transition-colors duration-300 text-lg"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
        <GradualBlur target="parent" position="bottom" height="6rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
      </InteractiveSpline>

      <section className="relative px-4 py-14 sm:px-6 lg:px-14 lg:py-20">
        <div className="container mx-auto relative z-10">
          <div className="relative mb-10 rounded-2xl border border-[#1E272E]/15 bg-gradient-to-r from-white/[0.09] via-white/[0.05] to-white/[0.03] p-6 md:p-10 overflow-hidden">
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
            <div className="mt-6 inline-flex items-center rounded-full border border-[#0984E3]/30 bg-[#0984E3]/10 px-4 py-2 text-sm text-[#0984E3]">
              Built for business outcomes, not just demos
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Clear ownership and predictable delivery',
              'Scalable architecture from day one',
              'Quality, security, and maintainability by default',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-[#1E272E]/15 bg-[#0984E3]/[0.06] backdrop-blur-md p-5 text-[#1E272E]/95 flex items-start gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <CheckCircle2 className="w-4 h-4 mt-1 text-[#0984E3] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-10 sm:px-6 lg:px-14 lg:pb-16">
        <div className="container mx-auto border border-[#1E272E]/10 bg-[linear-gradient(135deg,rgba(245,246,250,0.95),rgba(236,245,253,0.98))] px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl md:text-7xl font-semibold text-[#1E272E] leading-[0.95]">
              Clear Scope...Ship
            </h2>
            <p className="mt-6 text-[#1E272E]/75 text-base md:text-2xl max-w-4xl mx-auto">
              One focused process from discovery to release. We align requirements, architecture, and delivery so your product ships with confidence.
            </p>
          </div>

          <div className="my-10 h-px w-full bg-[#0984E3]/20" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            <h3 className="text-3xl md:text-5xl text-[#1E272E] font-medium leading-tight">
              From strategy to production, one dependable engineering flow
            </h3>

            <div>
              <p className="text-[#1E272E]/80 text-lg md:text-2xl">
                Discover. Plan. Build. Scale. Each phase is tied to measurable business outcomes and technical quality.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 border-b border-[#0984E3]/70 pb-1 text-[#0984E3] tracking-[0.14em] uppercase text-sm font-medium hover:text-[#1E272E] hover:border-white transition-colors"
              >
                Engineering Process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <p className="text-[#1E272E]/70 tracking-[0.2em] text-xs uppercase">How We Deliver</p>
            <h2 className="text-4xl md:text-6xl font-semibold text-[#1E272E] mt-3">Clear Engineering Execution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-[#1E272E]/10 bg-[#0984E3]/5 p-6 backdrop-blur-md"
              >
                <p className="text-[#0984E3] text-sm font-mono">{`0${index + 1}`}</p>
                <h3 className="text-[#1E272E] text-2xl mt-2">{step.title}</h3>
                <p className="text-[#1E272E]/70 mt-3 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
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

      <section className="w-full py-12 rounded-xl overflow-hidden">
        <WorldMapDemo />
      </section>

      <section className="relative py-12 mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-2xl border border-[#1E272E]/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl text-[#1E272E] font-semibold">Ready to Build What’s Next?</h2>
            <p className="text-[#1E272E]/75 mt-4 max-w-2xl mx-auto">
              Share your goals and constraints. We will propose a focused execution plan for your product.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-[#ECF5FD] transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0984E3]/10 text-[#1E272E] border border-[#1E272E]/20 rounded-lg font-medium hover:bg-[#0984E3]/20 transition-colors duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GradualBlur target="page" position="bottom" height="6rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
    </div>
  );
};

export default Home;
