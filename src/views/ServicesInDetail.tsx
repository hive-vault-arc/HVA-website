'use client';

import React from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Briefcase, Building2, ChartColumn, Cpu, Shield, Sparkles, Wrench } from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { BOT_DELIVERY_MODEL, SERVICE_DETAIL_SECTIONS } from '../lib/services-content';

function getDetailIcon(id: string) {
  const cls = 'h-5 w-5';
  const sw = 1.6;

  switch (id) {
    case 'ai-systems':
      return <Bot className={cls} strokeWidth={sw} />;
    case 'business-transformation':
      return <Building2 className={cls} strokeWidth={sw} />;
    case 'digital-technology-data':
      return <Briefcase className={cls} strokeWidth={sw} />;
    case 'consulting':
      return <Wrench className={cls} strokeWidth={sw} />;
    case 'engineering':
      return <Cpu className={cls} strokeWidth={sw} />;
    case 'data-growth':
      return <ChartColumn className={cls} strokeWidth={sw} />;
    case 'cybersecurity-risk':
      return <Shield className={cls} strokeWidth={sw} />;
    default:
      return <Sparkles className={cls} strokeWidth={sw} />;
  }
}

const ServicesInDetail: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#60a5fa]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        <section className="relative overflow-hidden bg-white">
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-14">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                Services In Detail
              </p>
              <h1 className="font-serif text-4xl leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
                Full capability depth:
                <br />
                <em className="italic text-[#475569]">strategy, execution, and operating ownership.</em>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#475569]">
                This page expands all service domains with strategic context, execution context, and full subservice
                coverage including digital strategy, data and analytics, cybersecurity and digital risk, agile at scale,
                digital ecosystems, deep tech, and IoT.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services/solution-programs"
                  className="sharp-edge bg-[#0F172A] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#2563EB]"
                >
                  View Solution Programs
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
                >
                  Back to Services →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F2F4F6] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">Domain Catalog</p>
                <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">Eight domains with full service context.</h2>
              </div>
              <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {SERVICE_DETAIL_SECTIONS.map((domain, index) => (
                <motion.article
                  key={domain.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  className="border border-[#e2e8f0] bg-white p-7 md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                      {getDetailIcon(domain.id)}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Service Domain</p>
                  </div>

                  <h3 className="font-headline text-3xl leading-tight text-[#0F172A]">{domain.title}</h3>

                  <div className="mt-5 grid grid-cols-1 gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Strategic Context</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">{domain.strategicContext}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Execution Context</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">{domain.executionContext}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Subservices</p>
                      <ul className="mt-2 space-y-1.5">
                        {domain.subservices.map((subservice) => (
                          <li key={subservice} className="flex items-start gap-2.5 text-sm text-[#0F172A]">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                            {subservice}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Related Outcomes</p>
                      <ul className="mt-2 space-y-1.5">
                        {domain.relatedOutcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2.5 text-sm text-[#0F172A]">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0F172A] py-20 md:py-24 text-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <div className="mb-10">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#60a5fa]">Delivery Model</p>
              <h2 className="font-headline text-3xl font-medium md:text-4xl">{BOT_DELIVERY_MODEL.name} as an operating model.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F8FAFC]/70">
                Use BOT when leadership needs accelerated capability delivery now, with structured transfer once internal
                teams are ready to own systems independently.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-[#334155] md:grid-cols-3">
              {BOT_DELIVERY_MODEL.phases.map((phase, index) => (
                <article key={phase.id} className="bg-[#111827] p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">Phase {index + 1}</p>
                  <h3 className="mt-2 font-headline text-2xl">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/75">{phase.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">When BOT Is Recommended</p>
              <ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                {BOT_DELIVERY_MODEL.fitCriteria.map((criteria) => (
                  <li key={criteria} className="bg-white/5 px-4 py-3 text-sm text-[#F8FAFC]/80">
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <BottomCTA
          variant="dark"
          headline="Need this mapped to your business constraints?"
          subtext="Book a discovery session and we will align service domains, subservices, and delivery model to your roadmap."
          primaryLabel="Book Discovery Call"
          primaryHref="/contact"
          secondaryLabel="View Solution Programs"
          secondaryHref="/services/solution-programs"
        />
      </div>
    </MotionConfig>
  );
};

export default ServicesInDetail;
