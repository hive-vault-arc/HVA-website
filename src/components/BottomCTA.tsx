'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface BottomCTAProps {
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'blue' | 'light';
}

export default function BottomCTA({
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
}: BottomCTAProps) {
  if (variant === 'blue') {
    return (
      <section className="cta-banner bg-[#2563EB] py-20 px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className="text-3xl md:text-4xl text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {headline}
          </h2>
          <p
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subtext}
          </p>
          <Link
            href={primaryHref}
            className="sharp-edge inline-flex items-center gap-2 bg-white text-[#2563EB] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#0F172A] hover:text-white transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {primaryLabel}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    );
  }

  if (variant === 'light') {
    return (
      <section className="cta-banner relative py-12 mb-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto rounded-2xl border border-[#1E272E]/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-5xl text-[#1E272E] font-semibold">{headline}</h2>
            <p className="text-[#1E272E]/75 mt-4 max-w-2xl mx-auto">{subtext}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-[#ECF5FD] transition-colors duration-300"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0984E3]/10 text-[#1E272E] border border-[#1E272E]/20 rounded-lg font-medium hover:bg-[#0984E3]/20 transition-colors duration-300"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // dark variant (default)
  return (
    <section className="cta-banner py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-[#0F172A] text-[#F8FAFC] px-6 py-10 sm:px-10 sm:py-16 md:px-20 md:py-24"
        >
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#3b82f6]/20 blur-3xl" />
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-[#2563EB] text-[10px] font-bold tracking-[0.22em] uppercase mb-5">
                Next Step
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight mb-6">
                {headline}
              </h2>
              <p className="text-[#F8FAFC]/65 text-lg font-light leading-relaxed max-w-xl">
                {subtext}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href={primaryHref}
                className="sharp-edge bg-[#2563EB] text-white px-10 py-5 text-sm font-bold uppercase tracking-wide hover:bg-[#1d4ed8] transition-colors duration-200 inline-flex items-center justify-center gap-2 active:scale-95"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="sharp-edge border border-[#F8FAFC]/20 text-[#F8FAFC] px-10 py-5 text-sm font-bold uppercase tracking-wide hover:bg-[#F8FAFC]/10 transition-colors duration-200 inline-flex items-center justify-center gap-2"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
