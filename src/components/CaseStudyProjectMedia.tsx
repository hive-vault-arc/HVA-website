'use client';

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import Image from 'next/image';
import {ArrowLeft, ArrowRight} from '@/components/icons';
import type {CaseStudyProjectMedia as ProjectMedia} from '@/lib/proof';
import {isSanityCdnImage} from '@/lib/image-delivery';

type Props = {
  items: ProjectMedia[];
  label: string;
  className?: string;
  mediaLabels?: CaseStudyProjectMediaLabels;
};

export type CaseStudyProjectMediaLabels = Partial<
  Record<
    ProjectMedia['deviceType'],
    {
      eyebrow: string;
      title: string;
      previousLabel?: string;
      nextLabel?: string;
    }
  >
>;

function MediaFigure({
  item,
  phone = false,
}: {
  item: ProjectMedia;
  phone?: boolean;
}) {
  return (
    <figure
      data-device={item.deviceType}
      data-publication-status={item.publicationStatus}
      className={
        phone
          ? 'case-study-project-media__figure case-study-project-media__figure--phone'
          : 'case-study-project-media__figure case-study-project-media__figure--desktop'
      }
    >
      <Image
        src={item.image}
        alt={item.alt}
        width={item.width}
        height={item.height}
        unoptimized={isSanityCdnImage(item.image)}
        className="case-study-project-media__image"
        loading="lazy"
        decoding="async"
        sizes={
          phone
            ? '(max-width: 640px) min(78vw, 22rem), (max-width: 1280px) 30vw, 22rem'
            : '(max-width: 1024px) calc(100vw - 4rem), min(1220px, calc(75vw - 5rem))'
        }
        {...(item.lqip
          ? {
              placeholder: 'blur' as const,
              blurDataURL: item.lqip,
            }
          : {})}
      />
    </figure>
  );
}

type MediaGroup = {
  deviceType: ProjectMedia['deviceType'];
  items: ProjectMedia[];
};

function groupMediaBySequence(items: ProjectMedia[]) {
  return items.reduce<MediaGroup[]>((groups, item) => {
    const previous = groups.at(-1);
    if (previous?.deviceType === item.deviceType) {
      previous.items.push(item);
      return groups;
    }

    groups.push({deviceType: item.deviceType, items: [item]});
    return groups;
  }, []);
}

function MediaGroupCarousel({
  group,
  mediaLabels,
}: {
  group: MediaGroup;
  mediaLabels?: CaseStudyProjectMediaLabels;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const labels = mediaLabels?.[group.deviceType];
  const hasControls = group.items.length > 1;
  const total = group.items.length;
  const currentItem = group.items[activeIndex] ?? group.items[0];
  const previousLabel =
    labels?.previousLabel ?? `Previous ${group.deviceType} screen`;
  const nextLabel = labels?.nextLabel ?? `Next ${group.deviceType} screen`;

  function move(delta: number) {
    setActiveIndex((current) => (current + delta + total) % total);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!hasControls) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    if (hasControls) touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    if (!hasControls || touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX;
    const delta = endX === undefined ? 0 : endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 44) return;
    move(delta < 0 ? 1 : -1);
  }

  return (
    <div
      className="case-study-project-media__group"
      data-device={group.deviceType}
      data-count={total}
    >
      {labels ? (
        <header className="case-study-project-media__group-heading">
          <span className="case-study-project-media__group-eyebrow">
            {labels.eyebrow}
          </span>
          <h3 className="case-study-project-media__group-title">
            {labels.title}
          </h3>
        </header>
      ) : null}

      <div
        className="case-study-project-media__carousel"
        role={hasControls ? 'region' : undefined}
        aria-roledescription={hasControls ? 'carousel' : undefined}
        aria-label={
          hasControls
            ? labels?.title ?? `${group.deviceType} proof`
            : undefined
        }
        aria-keyshortcuts={hasControls ? 'ArrowLeft ArrowRight' : undefined}
        tabIndex={hasControls ? 0 : undefined}
        onKeyDown={handleKeyDown}
      >
        <div
          className={
            group.deviceType === 'phone'
              ? 'case-study-project-media__phone-grid'
              : 'case-study-project-media__desktop-stack'
          }
          data-count={total}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <MediaFigure
            key={currentItem._key}
            item={currentItem}
            phone={group.deviceType === 'phone'}
          />
        </div>

        {hasControls ? (
          <div className="case-study-project-media__controls">
            <button
              type="button"
              className="case-study-project-media__control"
              aria-label={previousLabel}
              onClick={() => move(-1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <span
              className="case-study-project-media__counter"
              aria-live="polite"
            >
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="case-study-project-media__control"
              aria-label={nextLabel}
              onClick={() => move(1)}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function CaseStudyProjectMedia({
  items,
  label,
  className = '',
  mediaLabels,
}: Props) {
  if (items.length === 0) return null;

  const mediaGroups = groupMediaBySequence(items);

  return (
    <section
      aria-label={label}
      className={`case-study-project-media ${className}`.trim()}
    >
      <div className="case-study-project-media__groups">
        {mediaGroups.map((group, index) => (
          <MediaGroupCarousel
            key={`${group.deviceType}-${index}`}
            group={group}
            mediaLabels={mediaLabels}
          />
        ))}
      </div>

    </section>
  );
}
