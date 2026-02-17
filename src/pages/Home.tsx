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
      audioSrc: '/sfx/click-01.mp3',
    },
    {
      leftLabel: 'Web Development',
      title: <>Web apps</>,
      rightLabel: 'Web apps',
      background: './Images/web.png',
      audioSrc: '/sfx/whoosh-02.mp3',
    },
    {
      leftLabel: 'AI Development',
      title: <>AI apps</>,
      rightLabel: 'AI apps',
      background: './Images/ai.jpg',
      audioSrc: '/sfx/whoosh-02.mp3',
    },
    {
      leftLabel: 'SaaS Development',
      title: <>SaaS apps</>,
      rightLabel: 'SaaS apps',
      background: './Images/saas.png',
      audioSrc: '/sfx/whoosh-02.mp3',
    },
  ];

  return (
    <div className="h-full">
      <Background3d color="#CF9FFF" speed={0.6} direction="forward" scale={1.1} opacity={0.8} mouseInteractive={false} />

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
            <h1 className="text-5xl md:text-8xl font-semibold text-white mb-6">
              <TextType
                text={['We Build Software', 'We Build AI Systems', 'We Build SaaS Products']}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
              />
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              <ShinyText text="Custom software, AI-driven solutions, and scalable SaaS products that accelerate growth, reduce operational friction, and improve ROI." />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/portfolio"
                className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 text-lg"
              >
                View Our Work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-black border border-white rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 text-lg"
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
          <div className="relative mb-10 rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.09] via-white/[0.05] to-white/[0.03] p-6 md:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
            <p className="text-purple-200 tracking-[0.24em] text-xs uppercase font-medium">Why HIIVA</p>
            <p className="text-white/60 tracking-[0.2em] text-[11px] uppercase mt-5">Where Innovation Meets Execution</p>
            <h2 className="text-5xl md:text-7xl font-semibold text-white mt-3 leading-[0.92]">
              Crafting Digital
              <br />
              Products That
              <br />
              Endure
            </h2>
            <p className="text-white/80 mt-6 text-lg max-w-5xl">
              We build software, AI systems, and SaaS platforms with senior product judgment and disciplined engineering.
              The result is dependable delivery, scalable architecture, and systems designed to perform long after launch.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-purple-300/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-100">
              Serious engineering for long-term growth
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Clear ownership and predictable delivery',
              'Scalable architecture from day one',
              'Quality, security, and maintainability by default',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-5 text-white/95 flex items-start gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <CheckCircle2 className="w-4 h-4 mt-1 text-purple-300 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <p className="text-white/70 tracking-[0.2em] text-xs uppercase">Our Approach</p>
            <h2 className="text-4xl md:text-6xl font-semibold text-white mt-3">Simple, Focused Delivery Flow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <p className="text-purple-300 text-sm font-mono">{`0${index + 1}`}</p>
                <h3 className="text-white text-2xl mt-2">{step.title}</h3>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">{step.description}</p>
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
                  <div>The Creative</div>
                  <div>Scope</div>
                </>
              }
              footer={<div />}
              showProgress
              durations={{ change: 0.7, snap: 800 }}
            />
          </div>
        </motion.div>
      </section>

      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', color: 'white', marginBottom: '6%' }}>
        <h1 className="text-white/90 text-2xl lg:text-4xl md:text-xl mb-8 mx-auto text-center font-light leading-relaxed">
          TECHNOLOGY PARTNERS & CORE STACK
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
          fadeOutColor="black"
          ariaLabel="Technology partners"
        />
      </div>

      <section className="w-full py-12 rounded-xl overflow-hidden">
        <WorldMapDemo />
      </section>

      <section className="relative py-12 mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl text-white font-semibold">Ready to Build What’s Next?</h2>
            <p className="text-white/75 mt-4 max-w-2xl mx-auto">
              Share your goals and constraints. We will propose a focused execution plan for your product.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300"
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
