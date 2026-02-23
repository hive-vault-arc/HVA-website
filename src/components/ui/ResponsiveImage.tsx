import React, { useState } from 'react';

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

  return (
    <div className={className}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 to-white/5"
        />
      )}

      <picture>
        {sources.map((source) => (
          <source
            key={`${source.srcSet}-${source.media ?? ''}-${source.type ?? ''}`}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
            sizes={source.sizes ?? sizes}
          />
        ))}

        <img
          src={src}
          alt={alt}
          className={imgClassName}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={(event) => {
            const img = event.currentTarget;
            if (!fallbackSrc || img.src.includes(fallbackSrc)) return;
            img.src = fallbackSrc;
          }}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
