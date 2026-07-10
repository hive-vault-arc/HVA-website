import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SectionBrandMark from './SectionBrandMark';

const RECOVERY_LINKS = [
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
];

export default function NotFoundContent() {
  return (
    <section className="flex min-h-[72dvh] items-center bg-[#F7F8FA] px-4 py-24 text-[#1A2535] md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[var(--site-frame)]">
        <div className="grid gap-12 border-y border-[#DDE3EA] py-12 md:py-16 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-4">
            <div className="mb-8 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                Navigation Error / 404
              </p>
            </div>
            <p
              className="font-headline text-7xl font-light leading-none text-[var(--section-label-color)] md:text-8xl"
              aria-hidden="true"
            >
              404
            </p>
          </div>

          <div className="lg:col-span-8">
            <h1 className="max-w-[15ch] font-headline text-4xl font-medium leading-[1.04] md:text-6xl">
              This page is no longer at this address.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#566274] md:text-lg">
              The link may be outdated, or the page may have moved. Return to the main site or
              continue through one of the sections below.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="sharp-edge inline-flex min-h-12 items-center justify-center gap-2 bg-[#1A2535] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8A838] hover:text-[#1A2535]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Return Home
              </Link>
              <Link
                href="/contact"
                className="sharp-edge inline-flex min-h-12 items-center justify-center gap-2 border border-[#1A2535]/20 bg-white px-6 py-3 text-sm font-bold text-[#1A2535] transition-colors hover:border-[#E8A838] hover:text-[var(--section-label-color)]"
              >
                Contact the Team
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <nav aria-label="Suggested pages" className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {RECOVERY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center gap-2 border-b border-[#1A2535]/20 text-xs font-bold uppercase tracking-[0.14em] text-[#1A2535] transition-colors hover:border-[#E8A838] hover:text-[var(--section-label-color)]"
            >
              {item.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

