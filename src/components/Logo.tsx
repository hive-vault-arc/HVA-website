import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

interface LogoProps {
  className?: string;
  light?: boolean;
  kind?: 'mark' | 'micro' | 'lockup' | 'wordmark' | 'navigation';
  size?: 'nav' | 'footer';
}

const STACKED_WORDMARK = {
  src: '/Images/brand/hva-rostex-wordmark-stacked-web.svg',
  width: 792,
  height: 400,
} as const;

const HORIZONTAL_WORDMARK = {
  src: '/Images/brand/hva-rostex-wordmark-horizontal-web.svg',
  width: 1968,
  height: 148,
} as const;

const assetByKind = {
  mark: STACKED_WORDMARK,
  micro: STACKED_WORDMARK,
  lockup: HORIZONTAL_WORDMARK,
  wordmark: HORIZONTAL_WORDMARK,
} as const;

const sizeClasses = {
  mark: {
    nav: 'h-9 w-auto',
    footer: 'h-12 w-auto md:h-14',
  },
  micro: {
    nav: 'h-9 w-auto',
    footer: 'h-12 w-auto md:h-14',
  },
  lockup: {
    nav: 'h-5 w-auto md:h-6',
    footer: 'h-5 w-auto sm:h-6',
  },
  wordmark: {
    nav: 'h-5 w-auto md:h-6',
    footer: 'h-5 w-auto sm:h-6',
  },
} as const;

export default function Logo({
  className,
  light = false,
  kind = 'mark',
  size = 'nav',
}: LogoProps) {
  const t = useTranslations('Navigation');
  const isAboveFold = size === 'nav';
  const resolvedKind = kind === 'navigation' ? 'mark' : kind;
  const asset = assetByKind[resolvedKind];
  const assetShape = resolvedKind === 'mark' || resolvedKind === 'micro'
    ? 'stacked'
    : 'horizontal';

  return (
    <Link
      href="/"
      aria-label={`Hive Vault Arc - ${t('home')}`}
      data-brand-logo={assetShape}
      data-logo-surface={light ? 'dark' : 'light'}
      className={[
        'inline-flex min-h-11 flex-shrink-0 items-center justify-center px-2 py-1',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838]',
        light ? 'bg-white' : 'bg-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Image
        src={asset.src}
        alt=""
        aria-hidden="true"
        width={asset.width}
        height={asset.height}
        className={`${sizeClasses[resolvedKind][size]} object-contain`}
        loading={isAboveFold ? 'eager' : 'lazy'}
        fetchPriority={isAboveFold ? 'high' : 'auto'}
      />
    </Link>
  );
}
