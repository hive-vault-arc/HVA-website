import SectionBrandMark from '../components/SectionBrandMark';

export default function Loading() {
  return (
    <div
      className="flex min-h-[72dvh] items-center justify-center bg-[#F7F8FA] px-6 text-[#1A2535]"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm border-y border-[#DDE3EA] py-10 text-center">
        <SectionBrandMark size="sm" className="mx-auto" />
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
          Loading Hive Vault Arc
        </p>
        <div className="mx-auto mt-6 h-px w-24 overflow-hidden bg-[#DDE3EA]" aria-hidden="true">
          <div className="h-full w-full origin-left bg-[#E8A838] motion-safe:animate-pulse" />
        </div>
      </div>
    </div>
  );
}
