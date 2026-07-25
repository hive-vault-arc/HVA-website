'use client';

import Image from 'next/image';
import type {CaseStudyProjectMedia as ProjectMedia} from '@/lib/proof';
import {isSanityCdnImage} from '@/lib/image-delivery';

type Props = {
  items: ProjectMedia[];
  label: string;
  className?: string;
};

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
      {item.caption ? (
        <figcaption
          className="case-study-project-media__caption"
          style={{fontFamily: 'var(--font-body)'}}
        >
          {item.caption}
        </figcaption>
      ) : null}
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

export default function CaseStudyProjectMedia({items, label, className = ''}: Props) {
  if (items.length === 0) return null;

  const mediaGroups = groupMediaBySequence(items);
  const disclosures = Array.from(
    new Set(items.map((item) => item.disclosure?.trim()).filter(Boolean)),
  ) as string[];

  return (
    <section
      aria-label={label}
      className={`case-study-project-media ${className}`.trim()}
    >
      <div className="case-study-project-media__groups">
        {mediaGroups.map((group, index) => (
          <div
            key={`${group.deviceType}-${index}`}
            className={
              group.deviceType === 'phone'
                ? 'case-study-project-media__phone-grid'
                : 'case-study-project-media__desktop-stack'
            }
            data-count={group.items.length}
          >
            {group.items.map((item) => (
              <MediaFigure
                key={item._key}
                item={item}
                phone={group.deviceType === 'phone'}
              />
            ))}
          </div>
        ))}
      </div>

      {disclosures.length > 0 ? (
        <div
          className="case-study-project-media__disclosure"
          style={{fontFamily: 'var(--font-body)'}}
        >
          {disclosures.map((disclosure) => (
            <p key={disclosure}>{disclosure}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
