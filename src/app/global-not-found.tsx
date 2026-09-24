import type { Metadata, Viewport } from 'next';
import SectionAccent from '../components/SectionAccent';
import { manrope, newsreader } from '../lib/fonts';
import { NOT_FOUND_METADATA } from '../lib/not-found';
import './globals.css';

export const metadata: Metadata = {
  ...NOT_FOUND_METADATA,
  title: 'Page Not Found | Hive Vault Arc',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2535',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <main className="flex min-h-dvh items-center bg-[#F7F8FA] px-4 py-24 text-[#1A2535] md:px-8">
          <section className="mx-auto w-full max-w-[var(--site-frame)]">
            <div className="grid gap-12 border-y border-[#DDE3EA] py-12 md:py-16 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-4">
                <div className="mb-8 flex items-center gap-3">
                  <SectionAccent size="sm" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                    Navigation error
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
                  This page could not be found.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#566274] md:text-lg">
                  The address may have changed, or the page may no longer be available.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/"
                    className="sharp-edge inline-flex min-h-12 items-center justify-center bg-[#1A2535] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8A838] hover:text-[#1A2535]"
                  >
                    Return home
                  </a>
                  <a
                    href="/contact"
                    className="sharp-edge inline-flex min-h-12 items-center justify-center border border-[#1A2535]/20 bg-white px-6 py-3 text-sm font-bold text-[#1A2535] transition-colors hover:border-[#E8A838]"
                  >
                    Contact our team
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
