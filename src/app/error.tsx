'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#1A2535] px-6 text-center text-white">
      <div className="max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A838]">Hive Vault Arc</p>
        <h1 className="mt-4 font-headline text-4xl leading-tight">Page temporarily unavailable</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          The page could not load cleanly. Retry the request or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 bg-[#E8A838] px-5 text-sm font-semibold text-[#1A2535] transition-colors hover:bg-white"
          >
            Retry
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-[#E8A838] hover:text-[#E8A838]"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
