import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type ResponsiveSource = {
  srcSet: string;
  media?: string;
  type?: string;
  sizes?: string;
};

type ResponsiveImageProps = {
  alt: string;
  src: string;
  fallbackSrc?: string;
  sources?: ResponsiveSource[];
  sizes?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  alt,
  src,
  fallbackSrc,
  sources = [],
  sizes = '(min-width: 1024px) 48vw, 100vw',
  className,
  imgClassName,
  eager = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(() => sources[0]?.srcSet.split(',')[0]?.trim().split(' ')[0] || src);

  useEffect(() => {
    setResolvedSrc(sources[0]?.srcSet.split(',')[0]?.trim().split(' ')[0] || src);
    setIsLoaded(false);
  }, [src, sources]);

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 to-white/5"
        />
      )}

      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className={imgClassName}
        sizes={sizes}
        priority={eager}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!fallbackSrc || resolvedSrc === fallbackSrc) return;
          setResolvedSrc(fallbackSrc);
        }}
      />
    </div>
  );
};

export default ResponsiveImage;
