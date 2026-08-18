"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import BottomCTA from "@/components/BottomCTA";
import InsightsEditorialHero from "@/components/InsightsEditorialHero";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  ChevronDown,
  Cloud,
  Code,
  Workflow,
  type IconsaxIconComponent,
} from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import {
  EDITORIAL_FORMATS,
  EDITORIAL_TOPICS,
  getEditorialTopicImage,
  type EditorialFormat,
  type EditorialTopic,
} from "@/lib/editorial-taxonomy";
import { isSanityCdnImage } from "@/lib/image-delivery";
import type {
  InsightListingItem,
  InsightPageCursor,
  PaginatedInsights,
} from "@/lib/insight-pagination";

const TOPIC_ICONS: Record<EditorialTopic, IconsaxIconComponent> = {
  "ai-operational-systems": Bot,
  "custom-software-automation": Code,
  "real-estate-construction": Building2,
  "morocco-north-africa-transformation": Workflow,
  "data-cloud-reliability": Cloud,
};

type InsightsHubProps = {
  readonly initialInsights: InsightListingItem[];
  readonly evidenceItems: InsightListingItem[];
  readonly totalInsights: number;
  readonly initialCursor: InsightPageCursor | null;
  readonly hasFallbackContent: boolean;
};

type PublicationIndexProps = {
  readonly initialItems: InsightListingItem[];
  readonly total: number;
  readonly initialCursor: InsightPageCursor | null;
  readonly locale: AppLocale;
  readonly initialTopic?: EditorialTopic;
  readonly onTopicChange?: (topic: EditorialTopic | undefined) => void;
};

function formatDate(value: string, locale: AppLocale) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

function resolvePublicationImage(item: InsightListingItem) {
  return item.editorialFormat === "case"
    ? item.image
    : getEditorialTopicImage(item.topics, item.image);
}

function PublicationImage({
  item,
  priority = false,
  sizes,
}: {
  readonly item: InsightListingItem;
  readonly priority?: boolean;
  readonly sizes: string;
}) {
  const image = resolvePublicationImage(item);

  if (!image) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#F1F3F6] text-xs font-bold uppercase text-[#536174]">
        Hive Vault Arc
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={item.title}
      fill
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={90}
      unoptimized={isSanityCdnImage(image)}
      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]${image.includes("immoworld-whatsapp-ai-french-dutch-phone-pair") ? " insights-publication-image--contain" : ""}`}
      sizes={sizes}
    />
  );
}

function PublicationMeta({ item }: { readonly item: InsightListingItem }) {
  const t = useTranslations("InsightsHub.editorial");
  const locale = useLocale() as AppLocale;

  return (
    <span className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase">
      <span>{t(`formats.${item.editorialFormat ?? "operating-note"}`)}</span>
      <span aria-hidden="true">/</span>
      <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
    </span>
  );
}

function FeaturedPublicationCard({
  item,
}: {
  readonly item: InsightListingItem;
}) {
  const t = useTranslations("InsightsHub.editorial");
  const primaryTopic = item.topics?.[0];

  return (
    <article
      className="group relative min-w-[84vw] snap-start overflow-hidden border border-[#DDE3EA] bg-[#0D1824] sm:min-w-[72vw] lg:min-w-0"
    >
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838]"
      >
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
          <PublicationImage
            item={item}
            priority
            sizes="(max-width: 1023px) 84vw, 48vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,24,36,0.04)_18%,rgba(13,24,36,0.82)_100%)]" />
        </div>

        {primaryTopic ? (
          <span className="absolute left-4 top-4 border border-white/70 bg-[#0D1824]/85 px-4 py-2 text-[10px] font-bold uppercase text-white backdrop-blur-sm sm:left-6 sm:top-6">
            {t(`topics.${primaryTopic}.title`)}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-8">
          <div className="text-white/75">
            <PublicationMeta item={item} />
          </div>
          <h3 className="mt-3 max-w-[22ch] text-balance font-headline text-3xl leading-[1.04] md:text-4xl xl:text-[3rem]">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-2 max-w-[62ch] text-sm leading-6 text-white/75">
            {item.directAnswer || item.excerpt}
          </p>
          <span className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-[#E8A838] text-xs font-bold uppercase">
            {t("readFeatured")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function FeaturedPublications({
  items,
}: {
  readonly items: InsightListingItem[];
}) {
  const t = useTranslations("InsightsHub.editorial");
  const editorialItems = items.filter(
    (item) => item.editorialFormat !== "case",
  );
  const featuredItems = (
    editorialItems.length >= 2 ? editorialItems : items
  ).slice(0, 2);

  if (featuredItems.length === 0) return null;

  return (
    <section
      className="insights-hub-featured bg-white py-12 md:py-16"
      aria-labelledby="featured-publications-title"
    >
      <div className="site-frame-wide">
        <div className="mb-5 flex items-end justify-between gap-6 md:mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#536174]">
              {t("featuredEyebrow")}
            </p>
            <h2
              id="featured-publications-title"
              className="mt-2 font-headline text-3xl leading-tight text-[#1A2535] md:text-[2.15rem]"
            >
              {t("featuredTitle")}
            </h2>
          </div>
          <Link
            href="#publication-index"
            className="hidden min-h-11 items-center gap-2 text-xs font-bold text-[#1A2535] sm:inline-flex"
          >
            {t("browseAll")}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="insights-featured-rail -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {featuredItems.map((item) => (
            <FeaturedPublicationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicNavigation({
  selectedTopic,
  onSelect,
}: {
  readonly selectedTopic?: EditorialTopic;
  readonly onSelect: (topic: EditorialTopic) => void;
}) {
  const t = useTranslations("InsightsHub.editorial");

  return (
    <section
      className="insights-hub-topics bg-[#FCFBF8] py-12 md:py-16"
      aria-labelledby="insights-topics-title"
    >
      <div className="site-frame-wide">
        <div className="mb-6 grid gap-3 md:grid-cols-[0.78fr_1.22fr] md:items-end md:gap-10">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#536174]">
              {t("indexEyebrow")}
            </p>
            <h2
              id="insights-topics-title"
              className="mt-2 max-w-[15ch] font-headline text-3xl leading-tight text-[#1A2535] md:text-[2.15rem]"
            >
              {t("topicsTitle")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#536174] md:text-base">
            {t("topicsDescription")}
          </p>
        </div>

        <div className="insights-topic-grid -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
          {EDITORIAL_TOPICS.map((topic) => {
            const Icon = TOPIC_ICONS[topic];
            const topicImage = getEditorialTopicImage([topic]);

            return (
              <button
                key={topic}
                type="button"
                aria-pressed={selectedTopic === topic}
                data-active={selectedTopic === topic}
                onClick={() => onSelect(topic)}
                className="insights-topic-card group relative min-h-[18rem] min-w-[72vw] snap-start overflow-hidden border border-[#DDE3EA] bg-[#0D1824] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838] sm:min-w-[44vw] lg:min-w-0"
              >
                {topicImage ? (
                  <Image
                    src={topicImage}
                    alt=""
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    sizes="(max-width: 639px) 72vw, (max-width: 1023px) 44vw, 20vw"
                  />
                ) : null}
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,24,36,0.06)_18%,rgba(13,24,36,0.92)_100%)]" />
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center border border-white/65 bg-white text-[#E8A838]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <strong className="block font-headline text-2xl font-normal leading-[1.05]">
                    {t(`topics.${topic}.title`)}
                  </strong>
                  <span className="mt-2 line-clamp-2 block text-xs leading-5 text-white/70">
                    {t(`topics.${topic}.description`)}
                  </span>
                  <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-bold">
                    {t("browseAll")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EvidenceSection({ items }: { readonly items: InsightListingItem[] }) {
  const t = useTranslations("InsightsHub.editorial");
  const visibleItems = items.slice(0, 2);

  if (visibleItems.length === 0) return null;

  return (
    <section
      className="insights-hub-evidence bg-[#F1F3F6] py-12 md:py-16"
      aria-labelledby="evidence-section-title"
    >
      <div className="site-frame-wide">
        <div className="mb-6 grid gap-3 md:grid-cols-[0.78fr_1.22fr] md:items-end md:gap-10">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#536174]">
              {t("evidenceEyebrow")}
            </p>
            <h2
              id="evidence-section-title"
              className="mt-2 max-w-[16ch] font-headline text-3xl leading-tight text-[#1A2535] md:text-4xl"
            >
              {t("evidenceTitle")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#536174] md:text-base">
            {t("evidenceDescription")}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="insights-evidence-card group overflow-hidden border border-[#DDE3EA] bg-white"
            >
              <Link
                href={item.href}
                locale={item.sourceLocale}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838]"
              >
                <div className="insights-evidence-card__media relative aspect-[16/9] overflow-hidden bg-[#0D1824]">
                  <PublicationImage
                    item={item}
                    sizes="(max-width: 1023px) 100vw, 48vw"
                  />
                </div>

                <div className="insights-evidence-card__copy p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase text-[#536174]">
                    {item.evidenceType || t("approvedCase")}
                  </span>
                  <h3 className="mt-3 text-balance font-headline text-2xl leading-[1.06] text-[#1A2535] sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  {item.directAnswer || item.excerpt ? (
                    <p className="mt-3 line-clamp-3 max-w-[62ch] text-sm leading-6 text-[#536174]">
                      {item.directAnswer || item.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-flex min-h-10 items-center gap-3 border-b border-[#1A2535] text-xs font-bold text-[#1A2535]">
                    {t("readFeatured")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationCard({
  item,
  index,
}: {
  readonly item: InsightListingItem;
  readonly index: number;
}) {
  const t = useTranslations("InsightsHub.editorial");
  const primaryTopic = item.topics?.[0];

  return (
    <article
      className="insights-publication-card group overflow-hidden border border-[#DDE3EA] bg-white"
      data-card-index={index}
    >
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838]"
      >
        <div className="insights-publication-card__media relative aspect-[16/9] overflow-hidden bg-[#F1F3F6]">
          <PublicationImage
            item={item}
            priority={index < 3}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,24,36,0.03)_18%,rgba(13,24,36,0.48)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 text-[10px] font-bold uppercase text-white sm:p-5">
            <span className="border border-white/65 bg-[#0D1824]/80 px-3 py-2 backdrop-blur-sm">
            {primaryTopic ? t(`topics.${primaryTopic}.title`) : item.tag}
            </span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="insights-publication-card__copy flex min-h-[12rem] flex-col p-5 sm:p-6">
          <div className="text-[#536174]">
            <PublicationMeta item={item} />
          </div>
          <h3 className="mt-3 line-clamp-3 text-balance font-headline text-[1.65rem] leading-[1.06] text-[#1A2535] sm:text-[1.85rem]">
            {item.title}
          </h3>
          {item.coverDisclosure ? (
            <span className="insights-publication-disclosure mt-3 block text-[10px] uppercase tracking-[0.12em] text-[#536174]">
              {item.coverDisclosure}
            </span>
          ) : null}
          <span className="mt-auto inline-flex min-h-10 items-center gap-2 border-b border-[#1A2535] pt-4 text-xs font-bold text-[#1A2535] transition-colors duration-300 group-hover:border-[#E8A838]">
            {t("readFeatured")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

type InsightFilterOption<T extends string> = {
  readonly value: T;
  readonly label: string;
};

function InsightFilterMenu<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  readonly label: string;
  readonly value: T;
  readonly options: readonly InsightFilterOption<T>[];
  readonly onChange: (value: T) => void;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const selected =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function focusOption(direction: 1 | -1) {
    const optionElements = menuRef.current?.querySelectorAll<HTMLElement>(
      '[role="option"]',
    );
    if (!optionElements?.length) return;
    const currentIndex = Array.from(optionElements).findIndex(
      (option) => option === document.activeElement,
    );
    const nextIndex =
      currentIndex < 0
        ? direction === 1
          ? 0
          : optionElements.length - 1
        : (currentIndex + direction + optionElements.length) %
          optionElements.length;
    optionElements[nextIndex]?.focus();
  }

  function openMenu() {
    setOpen(true);
  }

  return (
    <div
      ref={rootRef}
      className="relative grid gap-2"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="text-xs font-bold text-[#1A2535]"
      >
        {label}
      </label>
      <select
        id={id}
        aria-label={label}
        tabIndex={-1}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="sr-only"
      >
        {options.map((option) => (
          <option key={option.value || "all"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-menu` : undefined}
        aria-label={`${label}: ${selected?.label}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (
            event.key !== "ArrowDown" &&
            event.key !== "ArrowUp" &&
            event.key !== "Enter" &&
            event.key !== " "
          ) {
            return;
          }
          event.preventDefault();
          if (event.key === "Enter" || event.key === " ") {
            setOpen((current) => !current);
            return;
          }
          openMenu();
          requestAnimationFrame(() => focusOption(event.key === "ArrowDown" ? 1 : -1));
        }}
        className="flex min-h-11 items-center justify-between gap-3 border border-[#DDE3EA] bg-white px-3 text-sm text-[#1A2535] transition-[border-color,background-color] duration-150 hover:border-[#E8A838]/70 hover:bg-[#FCFBF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838]"
      >
        <span className="truncate text-left">{selected?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 shrink-0 text-[#1A2535]/75 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div
          ref={menuRef}
          id={`${id}-menu`}
          role="listbox"
          aria-label={label}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden border border-[#DDE3EA] bg-[#FCFBF8] text-[#1A2535] shadow-[0_16px_36px_rgba(13,24,36,0.16)]"
        >
          {options.map((option, index) => {
            const active = option.value === value;
            return (
              <button
                key={option.value || "all"}
                type="button"
                role="option"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    focusOption(event.key === "ArrowDown" ? 1 : -1);
                  } else if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onChange(option.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
                className={`group flex min-h-11 w-full items-center justify-between gap-3 border-b px-3 py-2.5 text-left text-sm transition-[border-color,background-color,color] duration-150 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#E8A838] ${
                  active
                    ? "border-[#E8A838] bg-[#1A2535] text-white"
                    : "border-[#DDE3EA] text-[#1A2535]/80 hover:border-[#E8A838]/70 hover:bg-white hover:text-[#1A2535]"
                }`}
              >
                <span className="flex min-w-0 items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`shrink-0 pt-0.5 text-[10px] font-semibold tabular-nums ${
                      active ? "text-[#F8E9C8]" : "text-[#E8A838]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[13px] font-semibold leading-5">
                    {option.label}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    active ? "text-white/70" : "text-[#536174]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function AllInsightsGrid({
  initialItems,
  total,
  initialCursor,
  locale,
  initialTopic,
  onTopicChange,
}: PublicationIndexProps) {
  const t = useTranslations("InsightsHub.editorial");
  const abortRef = useRef<AbortController | null>(null);
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [topic, setTopic] = useState<EditorialTopic | "">(initialTopic ?? "");
  const [format, setFormat] = useState<EditorialFormat | "">("");

  useEffect(() => setTopic(initialTopic ?? ""), [initialTopic]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (topic && !item.topics?.includes(topic)) return false;
        if (format && item.editorialFormat !== format) return false;
        return true;
      }),
    [format, items, topic],
  );

  async function loadMore() {
    if (!cursor || loading) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setLoadError(false);

    try {
      const params = new URLSearchParams({
        locale,
        cursorDate: cursor.date,
        cursorId: cursor.id,
      });
      const response = await fetch(`/api/insights?${params.toString()}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Insights request failed.");
      const page = (await response.json()) as PaginatedInsights;
      setItems((current) => {
        const knownIds = new Set(current.map((item) => item.id));
        return [
          ...current,
          ...page.items.filter((item) => !knownIds.has(item.id)),
        ];
      });
      setCursor(page.nextCursor);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setLoadError(true);
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setLoading(false);
      }
    }
  }

  function selectTopic(value: string) {
    const nextTopic = value as EditorialTopic | "";
    setTopic(nextTopic);
    onTopicChange?.(nextTopic || undefined);
  }

  const canLoadMore = items.length < total && cursor !== null;

  return (
    <section
      id="publication-index"
      className="insights-hub-index scroll-mt-24 border-b border-[#DDE3EA] bg-white py-12 md:py-16"
      aria-labelledby="publication-index-title"
    >
      <div className="site-frame-wide">
        <div className="grid gap-6 border-b border-[#DDE3EA] pb-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#536174]">
              {t("indexEyebrow")}
            </p>
            <h2
              id="publication-index-title"
              className="mt-2 max-w-[16ch] font-headline text-4xl leading-[1.02] text-[#1A2535] md:text-[2.65rem]"
            >
              {t("indexTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#536174]">
              {t("indexDescription")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[31rem]">
            <InsightFilterMenu
              label={t("topicFilter")}
              value={topic}
              onChange={selectTopic}
              options={[
                { value: "", label: t("allTopics") },
                ...EDITORIAL_TOPICS.map((value) => ({
                  value,
                  label: t(`topics.${value}.title`),
                })),
              ]}
            />
            <InsightFilterMenu
              label={t("formatFilter")}
              value={format}
              onChange={(value) => setFormat(value)}
              options={[
                { value: "", label: t("allFormats") },
                ...EDITORIAL_FORMATS.map((value) => ({
                  value,
                  label: t(`formats.${value}`),
                })),
              ]}
            />
          </div>
        </div>

        <div
          className="insights-publication-grid mt-6 grid grid-cols-1 gap-3 md:grid-cols-12"
          aria-live="polite"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <PublicationCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="border-y border-[#DDE3EA] py-10 md:col-span-12">
              <h3 className="font-headline text-2xl text-[#1A2535]">
                {t("emptyTitle")}
              </h3>
              <p className="mt-2 text-sm text-[#536174]">
                {t("emptyDescription")}
              </p>
            </div>
          )}
        </div>

        {canLoadMore || loadError ? (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="inline-flex min-h-11 items-center gap-2 border border-[#1A2535] bg-white px-6 text-xs font-bold uppercase text-[#1A2535] transition-colors duration-700 hover:bg-[#1A2535] hover:text-white disabled:cursor-wait disabled:opacity-60"
            >
              {loading
                ? t("loading")
                : loadError
                  ? t("tryAgain")
                  : t("loadMore")}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {loadError ? (
              <p className="text-sm text-[#536174]">{t("loadError")}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function InsightsHub({
  initialInsights,
  evidenceItems,
  totalInsights,
  initialCursor,
  hasFallbackContent,
}: InsightsHubProps) {
  const t = useTranslations("InsightsHub.editorial");
  const collectionT = useTranslations("CollectionUi");
  const locale = useLocale() as AppLocale;
  const [selectedTopic, setSelectedTopic] = useState<EditorialTopic>();

  function chooseTopic(topic: EditorialTopic) {
    setSelectedTopic(topic);
    window.requestAnimationFrame(() => {
      document
        .getElementById("publication-index")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="insights-hub-page overflow-x-hidden bg-white text-[#1A2535]">
      <InsightsEditorialHero
        eyebrow={t("heroEyebrow")}
        headline={collectionT("brand")}
        headlineItalic={t("heroTitle")}
        description={t("heroDescription")}
        total={totalInsights}
        countLabel={collectionT("publishedCount", {count: totalInsights})}
        browseLabel={t("browseAll")}
        secondaryLink={{label: t("viewEvidence"), href: "/case-studies"}}
        titleId="insights-title"
      />

      {locale === "fr" && hasFallbackContent ? (
        <aside className="border-b border-[#DDE3EA] bg-[#F1F3F6]">
          <div className="site-frame-wide py-4 text-sm leading-6 text-[#536174]">
            <strong className="mr-2 text-[#1A2535]">EN</strong>
            {t("englishFallback")}
          </div>
        </aside>
      ) : null}

      <FeaturedPublications items={initialInsights} />
      <TopicNavigation selectedTopic={selectedTopic} onSelect={chooseTopic} />
      <EvidenceSection items={evidenceItems} />
      <AllInsightsGrid
        initialItems={initialInsights}
        total={totalInsights}
        initialCursor={initialCursor}
        locale={locale}
        initialTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
      />
      <BottomCTA
        variant="light"
        headline={t("ctaTitle")}
        subtext={t("ctaDescription")}
        primaryLabel={t("ctaPrimary")}
        primaryHref="/contact"
        secondaryLabel={t("ctaSecondary")}
        secondaryHref="/capabilities"
      />
    </main>
  );
}
