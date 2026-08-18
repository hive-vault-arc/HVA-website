export default function Loading() {
  return (
    <div
      className="min-h-[72dvh] bg-[#FCFBF8] px-4 pb-16 pt-28 md:px-8 md:pt-36"
      role="status"
      aria-label="Loading"
    >
      <div className="site-frame-wide animate-pulse" aria-hidden="true">
        <div className="h-3 w-24 bg-[#DDE3EA]" />
        <div className="mt-6 h-12 max-w-xl bg-[#DDE3EA] md:h-16" />
        <div className="mt-4 h-5 max-w-md bg-[#F1F3F6]" />
        <div className="mt-12 grid gap-px bg-[#DDE3EA] md:grid-cols-3">
          <div className="h-44 bg-white" />
          <div className="h-44 bg-white" />
          <div className="h-44 bg-white" />
        </div>
      </div>
    </div>
  );
}
