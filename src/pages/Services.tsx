import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Background3d from '../components/Plasma';
import GradualBlur from '../components/GradualBlur';

const capabilityShowcase = [
  {
    title: 'Custom Software Systems',
    subtitle: 'Product and internal systems engineered around your workflow.',
    image: '/Images/dashboard3.jpg',
  },
  {
    title: 'Cloud & Platform Engineering',
    subtitle: 'Reliable cloud architecture designed for growth and uptime.',
    image: '/Images/web.png',
  },
  {
    title: 'Applied AI for Operations',
    subtitle: 'Practical AI features that reduce manual effort and response time.',
    image: '/Images/ai.jpg',
  },
];

const deliveryPhases = [
  {
    title: 'Discovery and Scoping',
    detail:
      'We align on goals, user needs, constraints, and delivery priorities before implementation begins.',
    points: ['Business objectives and KPIs', 'Solution blueprint and milestones', 'Technical scope and timeline'],
    accent: 'from-fuchsia-500/30 to-violet-500/10',
  },
  {
    title: 'Design and Architecture',
    detail:
      'We design the experience and architecture together so product, engineering, and business stay aligned.',
    points: ['UX/UI system and interaction model', 'Data model and API contracts', 'Security and reliability baselines'],
    accent: 'from-cyan-500/30 to-blue-500/10',
  },
  {
    title: 'Build and Integrate',
    detail:
      'We deliver in short iterations with clear demos, QA, and integration checkpoints.',
    points: ['Feature delivery in sprints', 'Integration and regression testing', 'Infrastructure and release pipeline'],
    accent: 'from-emerald-500/30 to-teal-500/10',
  },
  {
    title: 'Launch and Optimize',
    detail:
      'Post-launch, we monitor, optimize, and iterate based on usage patterns and performance.',
    points: ['Go-live and operational handover', 'Monitoring and performance tuning', 'Roadmap for next growth phase'],
    accent: 'from-orange-500/30 to-amber-500/10',
  },
];

const Services: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background3d
        color="#CF9FFF"
        speed={0.5}
        direction="forward"
        scale={1.05}
        opacity={0.75}
        mouseInteractive={false}
        maxDprCap={1}
        targetFpsCap={24}
        visibilityThreshold={0.15}
      />

      <section className="relative pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Services</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Digital Engineering for teams that need quality and momentum
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">
              HIIVA helps companies design, build, and scale software products. We focus on clear delivery,
              robust architecture, and measurable outcomes. No public pricing is shown, every engagement is scoped
              around your exact business needs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
              <div className="lg:sticky lg:top-28 h-fit rounded-2xl border border-white/10 bg-black/20 p-6 md:p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">What We Offer</p>
                <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">Capability Areas</h2>
                <p className="mt-5 text-white/75 leading-relaxed">
                  A focused set of engineering capabilities used to design, ship, and scale dependable products.
                  Each area is tied to business outcomes, not just technical output.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">Delivery Model</p>
                    <p className="mt-2 text-white/90">Structured scope, clear milestones, and accountable ownership.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">Build Standard</p>
                    <p className="mt-2 text-white/90">Performance, security, and maintainability from day one.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {capabilityShowcase.map((item, idx) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="group rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl overflow-hidden shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
                  >
                    <div className="h-9 px-3 border-b border-white/10 flex items-center justify-between bg-black/20">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">Capability</span>
                    </div>
                    <div className="p-2">
                      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-white text-base font-medium">{item.title}</p>
                      <p className="text-white/65 text-sm mt-1 leading-relaxed">{item.subtitle}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">How We Deliver</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Execution Framework</h2>
          </div>

          <div className="relative space-y-5">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent md:left-5" />
            {deliveryPhases.map((phase, index) => (
              <motion.article
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative rounded-3xl border border-white/12 bg-gradient-to-br ${phase.accent} backdrop-blur-xl p-6 md:p-8 md:pl-12`}
              >
                <div className="absolute left-2 top-7 flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-black/40 text-[10px] font-semibold text-white/90 md:left-2">
                  {index + 1}
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold">{phase.title}</h3>
                <p className="mt-3 text-white/80 max-w-3xl leading-relaxed">{phase.detail}</p>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {phase.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white/90 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 mb-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Engagement Model</p>
                <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Custom Scoping, Zero Public Pricing</h2>
                <p className="mt-5 text-white/80 leading-relaxed max-w-2xl">
                  We scope each engagement around your product goals, technical constraints, and delivery timeline.
                  If you share your project context, we provide a structured proposal with timeline, scope, and team plan.
                </p>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300/90 shrink-0" />
                  <p className="text-white/90">Dedicated team and communication rhythm</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/90 shrink-0" />
                  <p className="text-white/90">Clear milestones and release visibility</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/90 shrink-0" />
                  <p className="text-white/90">Quality, security, and maintainability by default</p>
                </div>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition-colors"
                >
                  Contact Us to Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradualBlur target="page" position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
    </div>
  );
};

export default Services;
