import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

interface LogoProps {
  className?: string;
  light?: boolean;
  kind?: 'mark' | 'micro' | 'lockup' | 'wordmark' | 'navigation';
  size?: 'nav' | 'footer';
}

const assets = {
  mark: {
    lightSurface: '/Images/brand/hva-icon-static-light-surface.svg',
    darkSurface: '/Images/brand/hva-icon-static-dark-surface.svg',
    width: 100,
    height: 100,
  },
  micro: {
    lightSurface: '/Images/brand/hva-icon-lockup-micro-navy.svg',
    darkSurface: '/Images/brand/hva-icon-lockup-micro-dark.svg',
    width: 700,
    height: 280,
  },
  lockup: {
    lightSurface: '/Images/brand/hva-icon-lockup-wide-navy.svg',
    darkSurface: '/Images/brand/hva-icon-lockup-wide-dark.svg',
    width: 835,
    height: 210,
  },
  wordmark: {
    lightSurface: '/Images/brand/hva-wordmark-wide-navy.svg',
    darkSurface: '/Images/brand/hva-wordmark-wide-dark.svg',
    width: 1000,
    height: 260,
  },
} as const;

const sizeClasses = {
  mark: {
    nav: 'h-9 w-9 md:h-10 md:w-10',
    footer: 'h-12 w-12 md:h-14 md:w-14',
  },
  micro: {
    nav: 'h-10 w-auto md:h-11',
    footer: 'h-12 w-auto md:h-14',
  },
  lockup: {
    nav: 'h-12 w-auto md:h-14',
    footer: 'h-12 w-auto sm:h-14 md:h-16',
  },
  wordmark: {
    nav: 'h-8 w-auto md:h-9',
    footer: 'h-10 w-auto sm:h-12 md:h-14',
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

  if (kind === 'navigation') {
    const mark = assets.mark;
    const micro = assets.micro;
    const markSource = light ? mark.darkSurface : mark.lightSurface;
    const microSource = light ? micro.darkSurface : micro.lightSurface;

    return (
      <Link
        href="/"
        aria-label={`Hive Vault Arc - ${t('home')}`}
        className={['inline-flex flex-shrink-0 items-center', className].filter(Boolean).join(' ')}
      >
        <Image
          src={markSource}
          alt=""
          width={mark.width}
          height={mark.height}
          className="h-10 w-10 object-contain sm:hidden"
          loading="eager"
          fetchPriority="high"
        />
        <Image
          src={microSource}
          alt="Hive Vault Arc"
          width={micro.width}
          height={micro.height}
          className="hidden h-11 w-auto object-contain sm:block md:h-12"
          loading="eager"
          fetchPriority="high"
        />
      </Link>
    );
  }

  const asset = assets[kind];
  const source = light ? asset.darkSurface : asset.lightSurface;

  return (
    <Link
      href="/"
      aria-label={`Hive Vault Arc - ${t('home')}`}
      className={['inline-flex flex-shrink-0 items-center', className].filter(Boolean).join(' ')}
    >
      <Image
        src={source}
        alt="Hive Vault Arc"
        width={asset.width}
        height={asset.height}
        className={`${sizeClasses[kind][size]} object-contain`}
        loading={isAboveFold ? 'eager' : 'lazy'}
        fetchPriority={isAboveFold ? 'high' : 'auto'}
      />
    </Link>
  );
}
