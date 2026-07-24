import React from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

interface LogoProps {
  /** Extra classes on the root Link element */
  className?: string;
  /** Use the white logo variant for dark or non-white backgrounds */
  light?: boolean;
  /** Display size for the logo mark */
  size?: 'nav' | 'footer';
}

const LOGO_ON_LIGHT_SRC = '/Images/brand/hva-logo-number-3.png';
const LOGO_ON_DARK_SRC = '/Images/brand/hva-logo-number-4.png';

const Logo: React.FC<LogoProps> = ({ className, light = false, size = 'nav' }) => {
  const t = useTranslations('Navigation');
  const sizeClass = size === 'footer' ? 'h-16 w-16 md:h-20 md:w-20' : 'h-10 w-10 md:h-12 md:w-12';
  const logoSrc = light ? LOGO_ON_DARK_SRC : LOGO_ON_LIGHT_SRC;
  const isAboveFold = size === 'nav';

  return (
    <Link
      href="/"
      aria-label={`Hive Vault Arc — ${t('home')}`}
      className={['inline-flex flex-shrink-0 items-center', className].filter(Boolean).join(' ')}
    >
      <Image
        src={logoSrc}
        alt="Hive Vault Arc"
        width={1086}
        height={1086}
        className={`${sizeClass} object-contain`}
        loading={isAboveFold ? 'eager' : 'lazy'}
        fetchPriority={isAboveFold ? 'high' : 'auto'}
      />
    </Link>
  );
};

export default Logo;
