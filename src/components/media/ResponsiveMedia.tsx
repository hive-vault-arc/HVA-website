import type {CSSProperties} from 'react';
import Image from 'next/image';
import type {AppLocale} from '@/i18n/config';
import {
  semanticMediaAlt,
  type SemanticMediaDefinition,
} from '@/lib/semantic-media';

type ResponsiveMediaProps = {
  media: SemanticMediaDefinition;
  locale: AppLocale;
  alt?: string;
  sizes: string;
  className?: string;
  pictureClassName?: string;
  priority?: boolean;
  quality?: number;
  ariaHidden?: boolean;
};

type MediaVariables = CSSProperties & {
  '--semantic-fit-desktop': 'cover' | 'contain';
  '--semantic-fit-mobile': 'cover' | 'contain';
  '--semantic-position-desktop': string;
  '--semantic-position-mobile': string;
};

export default function ResponsiveMedia({
  media,
  locale,
  alt,
  sizes,
  className = '',
  pictureClassName = '',
  priority = false,
  quality = 90,
  ariaHidden = false,
}: ResponsiveMediaProps) {
  const variables: MediaVariables = {
    '--semantic-fit-desktop': media.fit.desktop,
    '--semantic-fit-mobile': media.fit.mobile,
    '--semantic-position-desktop': media.objectPosition.desktop,
    '--semantic-position-mobile': media.objectPosition.mobile,
  };
  const renderedAlt = ariaHidden ? '' : (alt ?? semanticMediaAlt(media, locale));

  return (
    <picture
      className={`semantic-responsive-picture ${pictureClassName}`.trim()}
      style={variables}
      aria-hidden={ariaHidden || undefined}
      data-alt-key={media.altKey}
      data-media-locked={media.locked || undefined}
    >
      {media.mobileSrc && media.mobileSrc !== media.desktopSrc ? (
        <source media="(max-width: 767px)" srcSet={media.mobileSrc} />
      ) : null}
      <Image
        src={media.desktopSrc}
        alt={renderedAlt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`semantic-responsive-image ${className}`.trim()}
      />
    </picture>
  );
}

