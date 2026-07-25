'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { useCallback, useLayoutEffect, useRef } from 'react';
import {useTranslations} from 'next-intl';

import type { HomeTrustedPartner } from '../lib/home-hero';
import {isSanityCdnImage} from '../lib/image-delivery';

type TrustedByBarProps = {
  partners: HomeTrustedPartner[];
};

type TrustedPartnerLogoProps = {
  partner: HomeTrustedPartner;
  caseStudyLabel: string;
};

function partnerSlug(name: string): string {
  return name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function TrustedPartnerLogo({ partner, caseStudyLabel }: TrustedPartnerLogoProps) {
  const monochromeRef = useRef<HTMLSpanElement>(null);
  const colorRef = useRef<HTMLSpanElement>(null);
  const pointerActiveRef = useRef(false);
  const focusActiveRef = useRef(false);
  const colorActiveRef = useRef(false);

  const setColorActive = useCallback((nextActive: boolean) => {
    const monochrome = monochromeRef.current;
    const color = colorRef.current;

    if (!monochrome || !color || colorActiveRef.current === nextActive) return;
    colorActiveRef.current = nextActive;
    gsap.killTweensOf([monochrome, color]);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(monochrome, { autoAlpha: nextActive ? 0 : 1, yPercent: 0 });
      gsap.set(color, { autoAlpha: nextActive ? 1 : 0, yPercent: 0 });
      return;
    }

    const timeline = gsap.timeline({ defaults: { duration: 0.22, ease: 'power2.out' } });

    if (nextActive) {
      gsap.set(color, { autoAlpha: 0, yPercent: -115 });
      timeline
        .to(monochrome, { autoAlpha: 0, yPercent: 115 }, 0)
        .to(color, { autoAlpha: 1, yPercent: 0 }, 0.025);
      return;
    }

    gsap.set(monochrome, { autoAlpha: 0, yPercent: -115 });
    timeline
      .to(color, { autoAlpha: 0, yPercent: -115 }, 0)
      .to(monochrome, { autoAlpha: 1, yPercent: 0 }, 0.025);
  }, []);

  const syncInteractionState = useCallback(() => {
    setColorActive(pointerActiveRef.current || focusActiveRef.current);
  }, [setColorActive]);

  useLayoutEffect(() => {
    const monochrome = monochromeRef.current;
    const color = colorRef.current;

    if (!monochrome || !color) return;

    gsap.set(monochrome, { autoAlpha: 1, yPercent: 0 });
    gsap.set(color, { autoAlpha: 0, yPercent: -115 });

    return () => {
      gsap.killTweensOf([monochrome, color]);
    };
  }, []);

  const className = [
    'home-trusted-logo',
    partner.surface === 'dark' ? 'home-trusted-logo--dark' : 'home-trusted-logo--light',
  ].join(' ');

  const interactionProps = {
    onPointerEnter: () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      pointerActiveRef.current = true;
      syncInteractionState();
    },
    onPointerLeave: () => {
      pointerActiveRef.current = false;
      syncInteractionState();
    },
    onFocus: () => {
      focusActiveRef.current = true;
      syncInteractionState();
    },
    onBlur: () => {
      focusActiveRef.current = false;
      syncInteractionState();
    },
  };

  const media = (
    <span className="home-trusted-logo__media" role="img" aria-label={partner.logoAlt}>
      <span
        ref={monochromeRef}
        className="home-trusted-logo__layer home-trusted-logo__layer--monochrome"
      >
        <Image
          src={partner.logo}
          alt=""
          fill
          unoptimized={isSanityCdnImage(partner.logo)}
          sizes="(max-width: 640px) 42vw, 220px"
        />
      </span>
      <span
        ref={colorRef}
        className="home-trusted-logo__layer home-trusted-logo__layer--color"
        aria-hidden="true"
      >
        <Image
          src={partner.logo}
          alt=""
          fill
          unoptimized={isSanityCdnImage(partner.logo)}
          sizes="(max-width: 640px) 42vw, 220px"
        />
      </span>
    </span>
  );

  if (!partner.href) {
    return (
      <div
        className={className}
        data-partner={partnerSlug(partner.name)}
        {...interactionProps}
      >
        {media}
      </div>
    );
  }

  return (
    <Link
      href={partner.href}
      locale={partner.hrefLocale}
      className={className}
      data-partner={partnerSlug(partner.name)}
      aria-label={caseStudyLabel}
      {...interactionProps}
    >
      {media}
    </Link>
  );
}

export default function TrustedByBar({ partners }: TrustedByBarProps) {
  const t = useTranslations('TrustedBy');
  if (partners.length === 0) return null;
  const visibleColumnCount = Math.min(partners.length, 3);

  return (
    <section className="home-trusted" aria-labelledby="home-trusted-title">
      <div className="home-trusted-shell">
        <div className="home-trusted-heading">
          <h2 id="home-trusted-title">{t('title')}</h2>
        </div>
        <div
          className={`home-trusted-logos home-trusted-logos--${visibleColumnCount}`}
        >
          {partners.map((partner) => (
            <TrustedPartnerLogo
              key={partner.name}
              partner={partner}
              caseStudyLabel={t('caseStudyLabel', {client: partner.name})}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
