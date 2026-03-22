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

        {/* Hero Section */}
        <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-6 lg:px-14">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left: content */}
              <motion.div
                className="lg:col-span-7 z-10"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                style={{ y: heroLift }}
              >
                <span className="inline-block text-[#0984E3] font-bold tracking-[0.22em] text-[10px] uppercase mb-6">
                  Expertise &amp; Vision
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.08] tracking-tight text-[#1E272E] mb-8">
                  Engineering clarity<br />
                  for <em className="italic">modern products</em>
                </h1>
                <p className="text-xl text-[#1E272E]/60 font-light max-w-xl leading-relaxed mb-10">
                  H.V.A is a software and cloud engineering company focused on custom systems, AI-powered applications,
                  and production-ready digital platforms — built precise, deliberate, and engineered for scale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300"
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/services"
                    className="sharp-edge inline-flex items-center gap-2 bg-white/90 px-8 py-4 text-sm font-bold text-[#1E272E] shadow-[0_10px_25px_rgba(9,132,227,0.08)] hover:bg-[#ECF5FD] transition-colors duration-300"
                  >
                    Explore Services
                    <Layers3 className="h-4 w-4 text-[#0984E3]" />
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {proofPoints.map((point) => (
                    <span key={point} className="rounded-full bg-white/62 px-3 py-1 text-[11px] tracking-[0.13em] text-[#1E272E]/70">
                      {point}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right: image + overlay card */}
              <motion.div
                className="lg:col-span-5 relative mt-12 lg:mt-0"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="relative aspect-square w-full bg-[#eceef0] overflow-hidden">
                  <img
                    src="/Images/abouthead.webp"
                    alt="H.V.A engineering precision"
                    className="object-cover w-full h-full"
                  />
                  {/* Asymmetric overlay card — inside image container */}
                  <div className="absolute top-0 left-0 p-7 bg-white shadow-xl max-w-[220px] hidden md:block">
                    <p className="text-[10px] font-bold text-[#0984E3] tracking-[0.2em] uppercase mb-1">01. ANALYSIS</p>
                    <p className="text-lg font-serif italic text-[#1E272E]">Precision in every data point.</p>
                  </div>
                </div>
              </motion.div>

            </div>
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

        {/* Operating Principles — redesigned */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Left: heading + bordered rules */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-3 mb-6">
                  <Workflow className="h-5 w-5 text-[#0984E3]" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1E272E]/58">Operating Principles</p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1E272E] mb-12 leading-tight">
                  The Rules Behind<br />How We Deliver
                </h2>
                <div className="space-y-10">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={principle.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.38, delay: index * 0.08 }}
                      className={`border-l-2 pl-8 py-2 ${
                        index === 0 ? 'border-[#0984E3]' : 'border-[#1E272E]/20'
                      }`}
                    >
                      <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${
                        index === 0 ? 'text-[#0984E3]' : 'text-[#1E272E]/45'
                      }`}>
                        {`Rule 0${index + 1}`}
                      </h4>
                      <h3 className="text-2xl font-medium text-[#1E272E] mb-3">{principle.title}</h3>
                      <p className="text-[#1E272E]/64 font-light leading-relaxed">{principle.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: dark quote card */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative min-h-[480px] bg-[#1E272E] overflow-hidden flex flex-col justify-end">
                  <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-[#0984E3]/35 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#00CEC9]/20 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0984E3]/50 to-transparent" />
                  <div className="relative z-10 p-10 md:p-14">
                    <p className="text-[#0984E3] text-[10px] font-bold tracking-[0.24em] uppercase mb-8">
                      H.V.A Core Creed
                    </p>
                    <blockquote className="font-serif text-2xl md:text-3xl italic text-[#F5F6FA] leading-snug mb-8">
                      "The highest form of engineering is when the complexity disappears entirely."
                    </blockquote>
                    <div className="h-px bg-gradient-to-r from-[#0984E3]/60 via-[#00CEC9]/40 to-transparent mb-8" />
                    <p className="text-[#F5F6FA]/58 text-sm font-light leading-relaxed max-w-md">
                      Three non-negotiables that shape planning, quality decisions, and execution pace on every engagement.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Team Section — improved design */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-[#eceef0]">
          <div className="container mx-auto">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#1E272E]/58 uppercase mb-4">Our Team</p>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1E272E] mb-6">
                The People Behind H.V.A
              </h2>
              <p className="text-[#1E272E]/64 leading-relaxed">
                Our founding team blends architecture, product, and cloud engineering expertise to deliver systems
                that are practical, resilient, and built for long-term growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {teamMembers.map((member, index) => {
                const firstName = member.name.split(' ')[0] ?? member.name;
                return (
                  <motion.div
                    key={member.name}
                    className="group bg-[#F5F6FA]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.07 }}
                  >
                    <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8">
                      <p className="text-[10px] font-bold text-[#0984E3] uppercase tracking-[0.18em] mb-1">{member.tag}</p>
                      <h3 className="font-serif text-2xl font-light text-[#1E272E] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#1E272E]/60 mb-5">{member.role}</p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1E272E] hover:text-[#0984E3] transition-colors duration-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#58FFB3]" />
                        {`Talk with ${firstName}`}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
