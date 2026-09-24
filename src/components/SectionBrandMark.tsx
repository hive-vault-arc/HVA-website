import Image from 'next/image';

type SectionBrandMarkProps = {
  surface?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  eager?: boolean;
};

const STACKED_WORDMARK_SRC = '/Images/brand/hva-rostex-wordmark-stacked-web.svg';

const sizeClasses = {
  sm: 'h-8 w-16',
  md: 'h-10 w-20 md:h-12 md:w-24',
  lg: 'h-14 w-28 md:h-16 md:w-32',
};

export default function SectionBrandMark({
  surface = 'light',
  size = 'md',
  className = '',
  eager = false,
}: SectionBrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      data-brand-logo="stacked"
      data-logo-surface={surface}
      className={[
        'inline-flex shrink-0 items-center justify-center p-1',
        surface === 'dark' ? 'bg-white' : 'bg-transparent',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Image
        src={STACKED_WORDMARK_SRC}
        alt=""
        width={792}
        height={400}
        className="h-full w-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </span>
  );
}
