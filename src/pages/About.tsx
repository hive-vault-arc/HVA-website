import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  Globe2,
  Home,
  Layers3,
  ListChecks,
  Search,
  ShieldCheck,
  Target,
  Workflow,
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import HeroCurvedShapes from '../components/HeroCurvedShapes';

type TeamMember = {
  name: string;
  tag: string;
  role: string;
  image: string;
};

type Principle = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type DeliveryStep = {
  step: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  checkpoints: string[];
};

const proofPoints = ['Based in Morocco', 'Software & Cloud', 'Serving Worldwide'];

const aboutHeroCurves = [
  { label: 'Clarity', value: '01', height: 176, tone: 'violet' as const },
  { label: 'Quality', value: '02', height: 222, tone: 'teal' as const },
  { label: 'Scale', value: '03', height: 268, tone: 'blue' as const },
];

const teamMembers: TeamMember[] = [
  {
    name: 'Khalid Chalhi',
    tag: 'Architecture & Delivery',
    role: 'Co-Founder & Software Engineer',
    image: '/Images/khalid.webp',
  },
  {
    name: 'Ali Amrani',
    tag: 'Product & Systems',
    role: 'Co-Founder & Full-Stack Engineer',
    image: '/Images/ali.webp',
  },
  {
    name: 'Oubay Ghamat',
    tag: 'Cloud & Scale',
    role: 'Co-Founder & Cloud Engineer',
    image: '/Images/oubay.webp',
  },
];

const principles: Principle[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Outcome-Driven',
    description: 'Each milestone is tied to measurable business outcomes, not just output.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quality by Default',
    description: 'Performance, reliability, and maintainability are built in from day one.',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'Morocco + Worldwide',
    description: 'Based in Morocco and delivering for clients worldwide with global engineering standards.',
  },
];

const deliveryFlow: DeliveryStep[] = [
  {
    step: '01',
    icon: <Search className="h-8 w-8" />,
    title: 'Business Discovery',
    detail: 'Align goals, constraints, and success metrics before scope is locked.',
    checkpoints: ['Define target outcomes', 'Map current blockers', 'Agree scope boundaries'],
  },
  {
    step: '02',
    icon: <ListChecks className="h-8 w-8" />,
    title: 'System Design',
    detail: 'Define architecture, milestones, and risk boundaries with clear ownership.',
    checkpoints: ['Choose architecture model', 'Split delivery milestones', 'Assign technical ownership'],
  },
  {
    step: '03',
    icon: <CalendarCheck className="h-8 w-8" />,
    title: 'Build & Validate',
    detail: 'Ship in iterations with demos, QA checkpoints, and transparent decisions.',
    checkpoints: ['Deliver sprint increments', 'Run QA and review loops', 'Validate against outcomes'],
  },
  {
    step: '04',
    icon: <Home className="h-8 w-8" />,
    title: 'Stabilize & Scale',
    detail: 'Handover, optimize, and support the platform as usage and complexity grow.',
    checkpoints: ['Handover with documentation', 'Monitor production reliability', 'Plan scale roadmap'],
  },
];

const About: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroLift = useTransform(scrollYProgress, [0, 0.4], [0, -30]);
  const [activeDeliveryStep, setActiveDeliveryStep] = useState(0);
  const activeDeliveryItem = deliveryFlow[activeDeliveryStep] ?? deliveryFlow[0];

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0984E3] via-[#4CA6EC] to-[#00CEC9]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{ y: heroLift }}
              className="relative py-5 md:py-8"
            >
              <div className="pointer-events-none absolute -left-14 top-10 h-24 w-64 rounded-full bg-[#0984E3]/10 blur-3xl" />
              <div className="pointer-events-none absolute right-[26%] top-1 h-28 w-72 rounded-full bg-[#00CEC9]/10 blur-3xl" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(9,132,227,0.45),transparent)]" />
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,206,201,0.4),transparent)]" />
              <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[#1E272E]/60">About H.V.A</p>
                  <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.94] md:text-7xl">
                    Engineering clarity
                    <br />
                    for modern
                    <br />
                    <span className="text-[#0984E3]">products.</span>
                  </h1>
                  <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#1E272E]/78 md:text-xl">
                    H.V.A is a software and cloud engineering company focused on custom systems, AI-powered applications,
                    and production-ready digital platforms.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-[#1E272E] px-7 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0984E3]"
                    >
                      Start a Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 bg-white/90 px-7 py-3 text-[#1E272E] shadow-[0_10px_25px_rgba(9,132,227,0.08)] transition-colors hover:bg-[#ECF5FD]"
                    >
                      Explore Services
                      <Layers3 className="h-4 w-4 text-[#0984E3]" />
                    </Link>
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 lg:pl-2">
                  <div className="pointer-events-none absolute -left-10 top-6 h-20 w-20 rounded-full bg-[#0984E3]/12 blur-2xl" />
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#00CEC9]/10 blur-2xl" />
                  <p className="relative max-w-lg text-lg leading-relaxed text-[#1E272E]/78">
                    Practical systems with clear decisions from discovery to scale.
                  </p>
                  <div className="relative space-y-2">
                    {[
                      'Architecture first',
                      'Incremental delivery + optimization',
                    ].map((line) => (
                      <div key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#1E272E]/82">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  <HeroCurvedShapes items={aboutHeroCurves} badgeText="Operating Layer" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proofPoints.map((point) => (
                      <span key={point} className="rounded-full bg-white/62 px-3 py-1 text-[11px] tracking-[0.13em] text-[#1E272E]/70">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#1E272E]/56">Delivery System</p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.02] md:text-5xl">How We Work</h2>
              <p className="mt-4 max-w-3xl text-[#1E272E]/74">
                The process is transparent, paced, and intentionally designed so stakeholders always understand what is
                being built and why.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42 }}
              className="relative overflow-hidden rounded-[28px] border border-[#1E272E]/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.84),rgba(236,245,253,0.72))] p-5 shadow-[0_18px_36px_rgba(9,132,227,0.1)] md:p-8"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Interactive Delivery Flow</p>
                <p className="text-sm text-[#1E272E]/66">Select a step to inspect execution details.</p>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1E272E]/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0984E3] to-[#00CEC9]"
                  animate={{ width: `${((activeDeliveryStep + 1) / deliveryFlow.length) * 100}%` }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4">
                {deliveryFlow.map((item, index) => {
                  const isActive = activeDeliveryStep === index;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveDeliveryStep(index)}
                      onMouseEnter={() => setActiveDeliveryStep(index)}
                      onFocus={() => setActiveDeliveryStep(index)}
                      className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-[#0984E3]/65 bg-white shadow-[0_16px_30px_rgba(9,132,227,0.16)]'
                          : 'border-[#1E272E]/10 bg-white/72 hover:bg-white/92'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                            isActive
                              ? 'border-[#0984E3]/55 bg-[#ECF5FD] text-[#0984E3]'
                              : 'border-[#1E272E]/20 bg-white text-[#1E272E]/75'
                          }`}
                        >
                          {item.step}
                        </span>
                        <div className={isActive ? 'text-[#0984E3]' : 'text-[#1E272E]/45'}>{item.icon}</div>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold leading-tight text-[#1E272E]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1E272E]/70">{item.detail}</p>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeDeliveryItem.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="mt-6 rounded-2xl border border-[#0984E3]/20 bg-white/90 p-5 md:p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-[#0984E3] text-sm font-semibold text-white">
                    {activeDeliveryItem.step}
                  </span>
                  <div className="text-[#0984E3]">{activeDeliveryItem.icon}</div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#1E272E]/56">Current Step</p>
                    <h3 className="text-2xl font-semibold text-[#1E272E]">{activeDeliveryItem.title}</h3>
                  </div>
                </div>
                <p className="mt-4 max-w-3xl text-[#1E272E]/75">{activeDeliveryItem.detail}</p>
                <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
                  {activeDeliveryItem.checkpoints.map((checkpoint) => (
                    <li key={checkpoint} className="flex items-start gap-2 text-sm leading-relaxed text-[#1E272E]/80">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0984E3]" />
                      <span>{checkpoint}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-3">
                <Workflow className="h-5 w-5 text-[#0984E3]" />
                <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/58">Operating Principles</p>
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-[0.95] md:text-5xl">The Rules Behind How We Deliver</h2>
              <p className="mt-4 max-w-md text-[#1E272E]/72">
                Three non-negotiables that shape planning, quality decisions, and execution pace on every engagement.
              </p>
            </div>

            <div className="space-y-3">
              {principles.map((principle, index) => (
                <motion.article
                  key={principle.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: index * 0.06 }}
                  className="group relative overflow-hidden border border-[#1E272E]/12 bg-white/84 shadow-[0_14px_32px_rgba(9,132,227,0.1)]"
                >
                  <div className="grid grid-cols-[72px_1fr] md:grid-cols-[86px_1fr]">
                    <div className="relative flex items-center justify-center border-r border-[#1E272E]/10 bg-[linear-gradient(180deg,#1E272E_0%,#0984E3_100%)] text-[#F5F6FA]">
                      <span className="text-lg font-semibold md:text-2xl">{`0${index + 1}`}</span>
                    </div>
                    <div className="relative p-5 md:p-6">
                      <div className="inline-flex bg-[#ECF5FD] p-2 text-[#0984E3]">{principle.icon}</div>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight">{principle.title}</h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-[#1E272E]/74">{principle.description}</p>
                      <div className="mt-4 h-[3px] w-full bg-[linear-gradient(90deg,#0984E3_0%,#00CEC9_100%)] opacity-70 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-12 top-0 h-full w-24 bg-[linear-gradient(180deg,rgba(9,132,227,0.14),transparent)] blur-2xl" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-[#1E272E]/58">Our Team</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">
                The People Behind
                <br />
                H.V.A
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-[#1E272E]/68">
              Our founding team blends architecture, product, and cloud engineering expertise to deliver systems that are
              practical, resilient, and built for long-term growth.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member, index) => {
              const firstName = member.name.split(' ')[0] ?? member.name;
              return (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.42, delay: index * 0.07 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-t-[20px] bg-[#D7D8DE]">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-[360px] w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-white/70 to-white" />
                  </div>

                  <div className="rounded-b-[20px] bg-white px-5 py-4 shadow-[0_10px_22px_rgba(30,39,46,0.08)]">
                    <p className="text-sm text-[#1E272E]/56">{member.tag}</p>
                    <h3 className="mt-1 font-serif text-[2rem] leading-none text-[#1E272E]">{member.name}</h3>
                    <p className="mt-2 text-sm text-[#1E272E]/76">{member.role}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-[#10151A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0984E3]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#58FFB3]" />
                    {`Talk With ${firstName}`}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="relative container mx-auto px-4 pb-16 pt-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42 }}
            className="overflow-hidden bg-[#1E272E] px-7 py-9 text-[#F5F6FA] shadow-[0_20px_52px_rgba(30,39,46,0.28)] md:px-10 md:py-11"
          >
            <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-[#0984E3]/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#00CEC9]/20 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5F6FA]/65">Next Step</p>
                <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] md:text-5xl">
                  Ready to define the right build path?
                </h2>
                <p className="mt-4 max-w-2xl text-[#F5F6FA]/80">
                  Share your goals and constraints. We will map a clear technical direction and an execution model your
                  team can trust.
                </p>
              </div>
              <div className="grid gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#0984E3] px-7 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0776CC]"
                >
                  Book a Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-[#F5F6FA]/12 px-7 py-3 text-[#F5F6FA] transition-colors hover:bg-[#F5F6FA]/18"
                >
                  Review Services
                  <Layers3 className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default About;
