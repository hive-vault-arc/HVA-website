"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ChevronDown, Globe, Menu, X } from "@/components/icons";
import { LOCALE_PROFILES, type AppLocale } from "@/i18n/config";
import Logo from "./Logo";
import LocaleSwitcher from "./localization/LocaleSwitcher";
import { useHydratedPathname } from "./localization/useHydratedPathname";
import { SOCIAL_PROFILES } from "../lib/seo";

type DesktopMenuKey = "capabilities" | "industries" | "who-we-are" | "insights";
type NavigationMenuItem = {
  external?: boolean;
  label: string;
  path: string;
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DesktopMenuKey | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);
  const pathname = useHydratedPathname();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Navigation");
  const localeLabel = LOCALE_PROFILES[locale].label;

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((prev) => (prev === section ? null : section));
  };

  const restoreBodyScroll = useCallback(() => {
    if (previousBodyOverflowRef.current === null) return;
    document.body.style.overflow = previousBodyOverflowRef.current;
    previousBodyOverflowRef.current = null;
  }, []);

  const closeMobileMenu = useCallback(() => {
    restoreBodyScroll();
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
    requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  }, [restoreBodyScroll]);

  const openMobileMenu = useCallback(() => {
    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";
    setOpenMobileSection(null);
    setIsMobileMenuOpen(true);
  }, []);

  // Close all dropdowns and mobile menu on route change
  useEffect(() => {
    restoreBodyScroll();
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    setOpenMobileSection(null);
  }, [pathname, restoreBodyScroll]);

  useEffect(() => restoreBodyScroll, [restoreBodyScroll]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = mobileMenuPanelRef.current;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    const focusInitialControl = requestAnimationFrame(() => {
      mobileMenuCloseRef.current?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusInitialControl);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  const cancelMenuClose = () => {
    if (!menuCloseTimer.current) return;
    clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;
  };

  const openDesktopMenu = (menu: DesktopMenuKey) => {
    cancelMenuClose();
    setOpenMenu(menu);
  };

  const scheduleMenuClose = () => {
    cancelMenuClose();
    menuCloseTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const CapabilitiesItems: NavigationMenuItem[] = [
    { path: "/capabilities/strategy-business", label: t("strategyBusiness") },
    { path: "/capabilities/technology-consulting", label: t("technologyConsulting") },
    { path: "/capabilities/ai-data-analytics", label: t("aiData") },
    { path: "/capabilities/software-engineering", label: t("softwareEngineering") },
    { path: "/capabilities/cloud-infrastructure", label: t("cloudInfrastructure") },
    { path: "/capabilities/operations-managed", label: t("managedOperations") },
    { path: "/capabilities/solution-programs", label: t("solutionPrograms") },
    { path: "/capabilities/in-detail", label: t("inDetail") },
  ];

  const industriesItems = [
    { path: "/industries#real-estate", label: t("realEstate") },
    { path: "/industries#healthcare", label: t("healthcare") },
    { path: "/industries#financial-services", label: t("financialServices") },
    { path: "/industries#government", label: t("government") },
    { path: "/industries#retail", label: t("retail") },
    { path: "/industries#energy", label: t("energy") },
    { path: "/industries#logistics", label: t("logistics") },
    { path: "/industries#consumer-goods", label: t("consumerGoods") },
  ];

  const insightsItems = [
    { path: "/blog", label: t("blog") },
    { path: "/case-studies", label: t("caseStudies") },
    { path: "/insights/news-articles", label: t("newsArticles") },
    { path: "/insights/perspectives", label: t("perspectives") },
    { path: "/insights/research-reports", label: t("researchReports") },
  ];
  const whoWeAreItems: NavigationMenuItem[] = [
    { path: "/aboutus", label: t("aboutUs") },
    { path: "/whoarewe/portfolio", label: t("portfolio") },
    ...SOCIAL_PROFILES.filter(({ label }) =>
      ["LinkedIn", "Instagram", "X"].includes(label),
    ).map(({ label, url }) => ({ external: true, label, path: url })),
  ];

  const isInsightsActive = Boolean(
    pathname?.startsWith("/insights") ||
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/case-studies"),
  );
  const isCapabilitiesActive = Boolean(pathname?.startsWith("/capabilities"));
  const isIndustriesActive = Boolean(pathname?.startsWith("/industries"));
  const isWhoWeAreActive = Boolean(
    pathname?.startsWith("/aboutus") || pathname?.startsWith("/whoarewe"),
  );

  const isRouteActive = (path: string) =>
    pathname === path ||
    Boolean(path !== "/" && pathname?.startsWith(`${path}/`));
  const isArcRoute = isRouteActive("/arc");
  const isDarkHeroRoute = Boolean(
    isArcRoute || pathname === "/capabilities" || pathname === "/industries",
  );
  const useDarkSurface = isArcRoute || (isDarkHeroRoute && !isScrolled);

  const desktopLinkClass = (isActive: boolean) =>
    `flex min-h-11 items-center whitespace-nowrap px-2.5 py-2 text-[13px] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] 2xl:px-3 ${
      useDarkSurface
        ? isActive
          ? "text-white"
          : "text-white/75 hover:text-white"
        : isActive
          ? "text-[#1A2535]"
          : "text-[#1A2535]/70 hover:text-[#1A2535]"
    }`;

  const isInsightsItemActive = (path: string) =>
    pathname === path ||
    Boolean(path !== "/" && pathname?.startsWith(`${path}/`));

  const isCapabilitiesItemActive = (path: string) => {
    if (path === "/capabilities/solution-programs") {
      return pathname === "/capabilities/solution-programs";
    }

    return isRouteActive(path);
  };

  const isWhoWeAreItemActive = (path: string) =>
    !path.startsWith("http") &&
    (pathname === path ||
      Boolean(path !== "/" && pathname?.startsWith(`${path}/`)));

  const desktopMenus: Array<{
    active: boolean;
    href: string;
    items: NavigationMenuItem[];
    key: DesktopMenuKey;
    label: string;
    overviewLabel: string;
    toggleLabel: string;
  }> = [
    {
      active: isCapabilitiesActive,
      href: "/capabilities",
      items: CapabilitiesItems,
      key: "capabilities",
      label: t("capabilities"),
      overviewLabel: t("allCapabilities"),
      toggleLabel: t("toggleCapabilities"),
    },
    {
      active: isIndustriesActive,
      href: "/industries",
      items: industriesItems,
      key: "industries",
      label: t("industries"),
      overviewLabel: t("industries"),
      toggleLabel: t("toggleIndustries"),
    },
    {
      active: isWhoWeAreActive,
      href: "/aboutus",
      items: whoWeAreItems,
      key: "who-we-are",
      label: t("whoWeAre"),
      overviewLabel: t("aboutUs"),
      toggleLabel: t("toggleWhoWeAre"),
    },
    {
      active: isInsightsActive,
      href: "/insights",
      items: insightsItems,
      key: "insights",
      label: t("insights"),
      overviewLabel: t("insights"),
      toggleLabel: t("toggleInsights"),
    },
  ];

  const activeDesktopMenu = desktopMenus.find((menu) => menu.key === openMenu);

  const isDesktopMenuItemActive = (menu: DesktopMenuKey, path: string) => {
    if (menu === "capabilities") return isCapabilitiesItemActive(path);
    if (menu === "who-we-are") return isWhoWeAreItemActive(path);
    if (menu === "insights") return isInsightsItemActive(path);
    return false;
  };

  const mobileRowClass = (isActive: boolean) =>
    `flex min-h-12 flex-1 items-center justify-between gap-4 px-4 text-start text-[15px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838] ${
      useDarkSurface
        ? isActive
          ? "bg-white/[0.1] text-white"
          : "text-white/80 hover:bg-white/[0.08] hover:text-white"
        : isActive
          ? "bg-[#F8E9C8] text-[#1A2535]"
          : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
    }`;

  const mobileToggleClass = (isActive: boolean) =>
    `flex min-h-12 w-12 shrink-0 items-center justify-center border-s transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838] ${
      useDarkSurface
        ? isActive
          ? "border-white/15 bg-white/[0.1] text-white"
          : "border-white/10 text-white/55 hover:bg-white/[0.08] hover:text-white"
        : isActive
          ? "border-[#1A2535]/10 bg-[#F8E9C8] text-[#1A2535]"
          : "border-[#1A2535]/10 text-[#536174] hover:bg-[#E8A838]/[0.08] hover:text-[#1A2535]"
    }`;

  const mobileSubItemClass = (isActive: boolean) =>
    `flex min-h-11 items-center justify-between gap-4 border-s-2 px-3 py-2.5 text-start text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E8A838] ${
      useDarkSurface
        ? isActive
          ? "border-[#E8A838] bg-white/[0.08] text-white"
          : "border-transparent text-white/70 hover:border-white/35 hover:bg-white/[0.06] hover:text-white"
        : isActive
          ? "border-[#E8A838] bg-[#F8E9C8]/55 text-[#1A2535]"
          : "border-transparent text-[#536174] hover:border-[#E8A838]/60 hover:bg-[#E8A838]/[0.06] hover:text-[#1A2535]"
    }`;

  return (
    <header
      className="navbar-sharp fixed inset-x-2 top-2 z-50 w-auto max-w-none lg:start-1/2 lg:end-auto lg:w-[94%] lg:max-w-[1600px] lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
      onMouseEnter={cancelMenuClose}
      onMouseLeave={scheduleMenuClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          scheduleMenuClose();
        }
      }}
    >
      <nav className="relative">
        <div className="mx-auto w-full">
          <div
            data-scrolled={isScrolled}
            data-navbar-surface="shell"
            className={`navbar-shell rounded-none relative z-30 flex h-14 w-full items-center justify-between border px-3 transition-[background-color,border-color,box-shadow] duration-200 sm:px-4 md:h-16 md:px-5 lg:px-6 ${
              useDarkSurface
                ? `bg-[#0D1824] ${
                    isScrolled
                      ? "border-white/15 shadow-[0_6px_18px_rgba(5,13,22,0.22)]"
                      : "border-transparent shadow-none"
                  }`
                : `bg-[#FCFBF8] ${
                    isScrolled
                      ? "border-[#DDE3EA] shadow-[0_6px_18px_rgba(26,37,53,0.10)]"
                      : "border-transparent shadow-none"
                  }`
            }`}
          >
            <Logo kind="navigation" light={useDarkSurface} />

            <div className="ms-auto hidden h-full items-stretch gap-0.5 xl:flex">
              <div
                className="relative flex items-stretch"
                onMouseEnter={() => setOpenMenu(null)}
              >
                <Link
                  href="/arc"
                  aria-label="ARC Framework"
                  data-navbar-link="arc"
                  className={desktopLinkClass(isRouteActive("/arc"))}
                >
                  <span className="flex items-baseline gap-1.5">
                    <span>ARC</span>
                    <span className="text-[8px] font-semibold uppercase tracking-[0.18em] opacity-55">
                      {t("framework")}
                    </span>
                  </span>
                </Link>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2 bottom-0 h-0.5 origin-left bg-[#E8A838] transition-transform duration-300 ${
                    isRouteActive("/arc") ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>

              {desktopMenus.map((menu) => {
                const isOpen = openMenu === menu.key;
                const isHighlighted = menu.active || isOpen;

                return (
                  <div
                    key={menu.key}
                    className="relative flex items-stretch"
                    onMouseEnter={() => openDesktopMenu(menu.key)}
                  >
                    <Link
                      href={menu.href}
                      data-navbar-link={menu.key}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onFocus={() => openDesktopMenu(menu.key)}
                      className={desktopLinkClass(menu.active)}
                    >
                      {menu.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={menu.toggleLabel}
                      aria-expanded={isOpen}
                      onClick={() => openDesktopMenu(menu.key)}
                      className={`flex min-h-11 w-7 items-center justify-center transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                        useDarkSurface
                          ? "text-white/55 hover:text-white"
                          : "text-[#536174] hover:text-[#1A2535]"
                      }`}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2 bottom-0 h-0.5 origin-left bg-[#E8A838] transition-transform duration-300 ${
                        isHighlighted ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div
              data-navbar-actions
              onMouseEnter={() => setOpenMenu(null)}
              className="ms-3 hidden shrink-0 items-center gap-2 xl:flex"
            >
              <Suspense
                fallback={
                  <div
                    data-locale-switcher-fallback="desktop"
                    aria-hidden="true"
                    className="inline-flex min-h-12 min-w-[4.25rem] items-center justify-between gap-1.5 border border-[#1A2535]/15 bg-white px-2.5 text-[10px] font-semibold text-[#1A2535]"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 shrink-0 text-[#E8A838]" aria-hidden="true" />
                      <span className="max-w-[8rem] truncate text-start">{localeLabel}</span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 text-[#1A2535]/50"
                    />
                  </div>
                }
              >
                <LocaleSwitcher />
              </Suspense>
              <Link
                href="/contact"
                className="site-action site-action-primary px-4 text-[13px]"
              >
                {t("bookCall")}
              </Link>
            </div>

            <div className="flex items-center xl:hidden">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                  useDarkSurface
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-[#1A2535]/70 hover:bg-[#E8A838]/10 hover:text-[#1A2535]"
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-controls={isMobileMenuOpen ? "mobile-navigation-panel" : undefined}
                aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeDesktopMenu && (
          <>
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={() => setOpenMenu(null)}
              className={`fixed inset-0 z-0 hidden cursor-default backdrop-blur-[3px] xl:block ${
                useDarkSurface ? "bg-[#0D1824]/30" : "bg-[#0D1824]/10"
              }`}
            />
            <div
              data-navbar-surface="desktop-menu"
              className={`navbar-mega-panel rounded-none absolute inset-x-0 top-full z-20 mt-1.5 hidden overflow-hidden border shadow-[0_24px_60px_rgba(13,24,36,0.18)] xl:block ${
                useDarkSurface
                  ? "border-white/15 bg-[#0D1824]/[0.98] text-white"
                  : "border-[#DDE3EA] bg-[#FCFBF8]/[0.99] text-[#1A2535]"
              }`}
              onMouseEnter={cancelMenuClose}
            >
              <div className="grid min-h-[238px] grid-cols-[minmax(240px,0.78fr)_2.22fr]">
                <div
                  className={`flex flex-col justify-between border-s px-8 py-7 ${
                    useDarkSurface ? "border-white/10" : "border-[#DDE3EA]"
                  }`}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8A838]">
                      {activeDesktopMenu.label}
                    </p>
                    <Link
                      href={activeDesktopMenu.href}
                      aria-label={`Explore ${activeDesktopMenu.overviewLabel}`}
                      className={`mt-5 flex max-w-[250px] items-end justify-between gap-5 font-serif text-[30px] leading-[1.05] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8A838] ${
                        useDarkSurface
                          ? "text-white hover:text-[#F8E9C8]"
                          : "text-[#1A2535] hover:text-[#536174]"
                      }`}
                    >
                      {activeDesktopMenu.overviewLabel}
                      <ArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-[#E8A838] rtl:rotate-180" />
                    </Link>
                  </div>
                  <span aria-hidden="true" className="h-px w-12 bg-[#E8A838]" />
                </div>

                <div
                  className={`grid content-start gap-x-8 gap-y-1 px-8 py-7 ${
                    activeDesktopMenu.key === "industries"
                      ? "grid-cols-4"
                      : activeDesktopMenu.key === "insights" ||
                          activeDesktopMenu.key === "capabilities"
                        ? "grid-cols-3"
                        : "grid-cols-2"
                  }`}
                >
                  {activeDesktopMenu.items.map((item, index) => {
                    const isItemActive = isDesktopMenuItemActive(
                      activeDesktopMenu.key,
                      item.path,
                    );
                    const itemClassName = `group relative flex min-h-[54px] items-center justify-between gap-4 border-b px-1 py-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                      useDarkSurface
                        ? isItemActive
                          ? "border-[#E8A838]/70"
                          : "border-white/10 hover:border-white/30"
                        : isItemActive
                          ? "border-[#E8A838]"
                          : "border-[#DDE3EA] hover:border-[#E8A838]/70"
                    }`;
                    const itemContent = (
                      <>
                        <span className="flex min-w-0 items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="pt-0.5 text-[10px] font-semibold tabular-nums text-[#E8A838]"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[13px] font-semibold leading-5 transition-colors duration-200 ${
                              useDarkSurface
                                ? "text-white/85 group-hover:text-white"
                                : "text-[#1A2535]/80 group-hover:text-[#1A2535]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200 rtl:rotate-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                            useDarkSurface ? "text-white/55" : "text-[#536174]"
                          }`}
                        />
                      </>
                    );

                    return item.external ? (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClassName}
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={itemClassName}
                      >
                        {itemContent}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[80] xl:hidden">
            <button
              type="button"
              className="navbar-mobile-backdrop absolute inset-0 cursor-default bg-[#0D1824]/45"
              aria-label={t("closeMenu")}
              onClick={closeMobileMenu}
            />

            <div
              ref={mobileMenuPanelRef}
              id="mobile-navigation-panel"
              data-navbar-surface="mobile-menu"
              className={`navbar-mobile-panel absolute inset-y-0 end-0 flex h-[100dvh] min-h-[100dvh] w-full max-w-[34rem] flex-col overflow-hidden border-s shadow-2xl md:w-[32rem] ${
                useDarkSurface
                  ? "border-white/15 bg-[#0D1824] text-white"
                  : "border-[#DDE3EA] bg-[#FCFBF8] text-[#1A2535]"
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              tabIndex={-1}
            >
              <div
                className={`flex min-h-16 shrink-0 items-center justify-between border-b px-4 sm:px-5 ${
                  useDarkSurface
                    ? "border-white/15 bg-[#0D1824]"
                    : "border-[#DDE3EA] bg-[#FCFBF8]"
                }`}
              >
                <h2 id="mobile-navigation-title" className="sr-only">
                  {t("mobileNavigation")}
                </h2>
                <Logo kind="micro" light={useDarkSurface} />
                <button
                  ref={mobileMenuCloseRef}
                  type="button"
                  onClick={closeMobileMenu}
                  className={`flex h-12 w-12 items-center justify-center border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                    useDarkSurface
                      ? "border-white/15 text-white/75 hover:bg-white/[0.08] hover:text-white"
                      : "border-[#1A2535]/15 text-[#1A2535]/65 hover:bg-[#E8A838]/[0.08] hover:text-[#1A2535]"
                  }`}
                  aria-label={t("closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
                aria-label={t("mobileNavigation")}
              >
                <div
                  className={`border-y ${
                    useDarkSurface ? "border-white/15" : "border-[#DDE3EA]"
                  }`}
                >
                  <Link
                    href="/arc"
                    onClick={closeMobileMenu}
                    aria-current={isRouteActive("/arc") ? "page" : undefined}
                    className={`${mobileRowClass(isRouteActive("/arc"))} border-s-2 ${
                      isRouteActive("/arc")
                        ? "border-[#E8A838]"
                        : "border-transparent"
                    }`}
                  >
                    <span>ARC</span>
                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 rtl:rotate-180 ${
                        useDarkSurface ? "text-white/55" : "text-[#536174]"
                      }`}
                    />
                  </Link>

                  {desktopMenus.map((menu) => {
                    const isExpanded = openMobileSection === menu.key;
                    const sectionId = `mobile-navigation-${menu.key}`;

                    return (
                      <div
                        key={menu.key}
                        className={`border-t ${
                          useDarkSurface ? "border-white/15" : "border-[#DDE3EA]"
                        }`}
                      >
                        <div className="flex">
                          <Link
                            href={menu.href}
                            onClick={closeMobileMenu}
                            aria-current={menu.active ? "page" : undefined}
                            className={`${mobileRowClass(menu.active)} border-s-2 ${
                              menu.active
                                ? "border-[#E8A838]"
                                : "border-transparent"
                            }`}
                          >
                            <span>{menu.label}</span>
                            <ArrowUpRight
                              className={`h-4 w-4 shrink-0 rtl:rotate-180 ${
                                useDarkSurface ? "text-white/55" : "text-[#536174]"
                              }`}
                            />
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleMobileSection(menu.key)}
                            className={mobileToggleClass(menu.active || isExpanded)}
                            aria-label={menu.toggleLabel}
                            aria-controls={sectionId}
                            aria-expanded={isExpanded}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {isExpanded && (
                          <div
                            id={sectionId}
                            className={`navbar-mobile-accordion border-t px-4 py-2 ${
                              useDarkSurface
                                ? "border-white/10"
                                : "border-[#DDE3EA]"
                            }`}
                          >
                            {menu.items.map((item) => {
                              const isItemActive = isDesktopMenuItemActive(
                                menu.key,
                                item.path,
                              );
                              const itemContent = (
                                <>
                                  <span>{item.label}</span>
                                  <ArrowUpRight
                                    className={`h-3.5 w-3.5 shrink-0 rtl:rotate-180 ${
                                      useDarkSurface
                                        ? "text-white/45"
                                        : "text-[#536174]"
                                    }`}
                                  />
                                </>
                              );

                              return item.external ? (
                                <a
                                  key={item.path}
                                  href={item.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={closeMobileMenu}
                                  className={mobileSubItemClass(isItemActive)}
                                >
                                  {itemContent}
                                </a>
                              ) : (
                                <Link
                                  key={item.path}
                                  href={item.path}
                                  onClick={closeMobileMenu}
                                  aria-current={isItemActive ? "page" : undefined}
                                  className={mobileSubItemClass(isItemActive)}
                                >
                                  {itemContent}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </nav>

              <div
                className={`navbar-mobile-actions shrink-0 border-t px-4 pt-4 sm:px-5 ${
                  useDarkSurface ? "border-white/15" : "border-[#DDE3EA]"
                }`}
              >
                <Suspense
                fallback={
                  <div
                    data-locale-switcher-fallback="mobile"
                    aria-hidden="true"
                    className={`flex min-h-12 items-center justify-center border-y px-3 text-[13px] font-semibold ${
                      useDarkSurface
                        ? "border-white/15 text-white/75"
                        : "border-[#1A2535]/10 text-[#1A2535]/65"
                    }`}
                  >
                    {localeLabel}
                  </div>
                }
              >
                  <LocaleSwitcher mobile dark={useDarkSurface} />
                </Suspense>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="site-action site-action-primary mt-3 w-full px-6 text-[15px]"
                >
                  {t("bookCall")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
