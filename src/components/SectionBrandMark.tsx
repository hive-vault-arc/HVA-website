import Image from 'next/image';

type SectionBrandMarkProps = {
  surface?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  eager?: boolean;
};

const LOGO_ON_LIGHT_SRC = '/Images/brand/hva-logo-number-3.png';
const LOGO_ON_DARK_SRC = '/Images/brand/hva-logo-number-4.png';

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10 md:h-12 md:w-12',
  lg: 'h-14 w-14 md:h-16 md:w-16',
};

export default function SectionBrandMark({
  surface = 'light',
  size = 'md',
  className = '',
  eager = false,
}: SectionBrandMarkProps) {
  const src = surface === 'dark' ? LOGO_ON_DARK_SRC : LOGO_ON_LIGHT_SRC;

  return (
    <span
      aria-hidden="true"
      className={['inline-flex shrink-0 items-center justify-center', sizeClasses[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      <Image
        src={src}
        alt=""
        width={1086}
        height={1086}
        className="h-full w-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </span>
  );
}
