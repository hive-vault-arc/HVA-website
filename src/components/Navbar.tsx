"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "@/components/icons";
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
  const pathname = useHydratedPathname();
  const t = useTranslations("Navigation");

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((prev) => (prev === section ? null : section));
  };

  const closeMobileMenu = () => {
    document.body.style.overflow = "";
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  // Close all dropdowns and mobile menu on route change
  useEffect(() => {
    document.body.style.overflow = "";
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    setOpenMobileSection(null);
  }, [pathname]);

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

  return (
    <header
      className="navbar-sharp fixed left-2 right-2 top-2 z-50 w-auto max-w-none lg:left-1/2 lg:right-auto lg:w-[94%] lg:max-w-[1600px] lg:-translate-x-1/2"
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
            className={`navbar-shell relative z-30 flex h-14 w-full items-center justify-between border px-3 transition-[background-color,border-color,box-shadow] duration-200 sm:px-4 md:h-16 md:px-5 lg:px-6 ${
              useDarkSurface
                ? `border-white/15 bg-[#0D1824] ${
                    isScrolled
                      ? "shadow-[0_6px_18px_rgba(5,13,22,0.22)]"
                      : "shadow-none"
                  }`
                : `border-[#DDE3EA] bg-[#FCFBF8] ${
                    isScrolled
                      ? "shadow-[0_6px_18px_rgba(26,37,53,0.10)]"
                      : "shadow-none"
                  }`
            }`}
          >
            <Logo kind="navigation" light={useDarkSurface} />

            <div className="ml-auto hidden h-full items-stretch gap-0.5 xl:flex">
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
              className="ml-3 hidden shrink-0 items-center gap-2 xl:flex"
            >
              <Suspense
                fallback={
                  <div
                    aria-hidden="true"
                    className="h-11 w-16 border border-[#DDE3EA]"
                  />
                }
              >
                <LocaleSwitcher />
              </Suspense>
              <Link
                href="/contact"
                className="group flex min-h-11 items-center bg-[#1A2535] px-4 py-2 text-[13px] font-semibold text-[#FFFFFF] transition-colors duration-300 hover:bg-[#E8A838] hover:text-[#1A2535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838]"
              >
                {t("bookCall")}
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="flex items-center xl:hidden">
              <button
                onClick={() => {
                  const next = !isMobileMenuOpen;
                  document.body.style.overflow = next ? "hidden" : "";
                  setIsMobileMenuOpen(next);
                }}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-md focus:outline-none ${
                  useDarkSurface
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-[#1A2535]/70 hover:bg-[#E8A838]/10 hover:text-[#1A2535]"
                }`}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">{t("openMenu")}</span>
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
              className={`navbar-mega-panel absolute left-0 right-0 top-full z-20 mt-1.5 hidden overflow-hidden border shadow-[0_24px_60px_rgba(13,24,36,0.18)] xl:block ${
                useDarkSurface
                  ? "border-white/15 bg-[#0D1824]/[0.98] text-white"
                  : "border-[#DDE3EA] bg-[#FCFBF8]/[0.99] text-[#1A2535]"
              }`}
              onMouseEnter={cancelMenuClose}
            >
              <div className="grid min-h-[238px] grid-cols-[minmax(240px,0.78fr)_2.22fr]">
                <div
                  className={`flex flex-col justify-between border-r px-8 py-7 ${
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
                      <ArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-[#E8A838]" />
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
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
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

        {/* Mobile menu - full-screen slide-down overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-[80] opacity-100 pointer-events-auto xl:hidden"
            role="navigation"
            aria-label={t("mobileNavigation")}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#1A2535]/25 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />

            {/* Slide-down panel */}
            <div className="absolute inset-x-0 top-0 translate-y-0 bg-[#FFFFFF] shadow-2xl max-h-[100dvh] overflow-y-auto transition-transform duration-300 ease-out">
              {/* Panel header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1A2535]/10 bg-white px-6 py-4">
                <Logo kind="mark" />
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A2535]/[0.08] text-[#1A2535]/60 transition-colors hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                  aria-label={t("closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav items */}
              <div className="px-4 py-3 pb-10">
                {/* ARC - standalone */}
                <Link
                  href="/arc"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors mb-1 ${
                    isRouteActive("/arc")
                      ? "bg-[#F8E9C8] text-[#1A2535]"
                      : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
                  }`}
                >
                  ARC
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>

                {/* Capabilities accordion */}
                <div className="mb-1">
                  <div className="mb-1 flex overflow-hidden rounded-xl">
                    <Link
                      href="/capabilities"
                      onClick={closeMobileMenu}
                      className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                        isCapabilitiesActive
                          ? "bg-[#F8E9C8] text-[#1A2535]"
                          : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {t("capabilities")}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection("capabilities")}
                      className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                        isCapabilitiesActive
                          ? "border-[#1A2535]/10 bg-[#F8E9C8] text-[#1A2535]"
                          : "border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                      }`}
                      aria-label={t("toggleCapabilities")}
                      aria-expanded={openMobileSection === "capabilities"}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileSection === "capabilities"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                  {openMobileSection === "capabilities" && (
                    <div className="mt-1 overflow-hidden">
                      <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                        <Link
                          href="/capabilities"
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#536174] hover:bg-[#F8E9C8] hover:text-[#1A2535] transition-colors"
                        >
                          {t("allCapabilities")}
                        </Link>
                        {CapabilitiesItems.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={closeMobileMenu}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isCapabilitiesItemActive(item.path)
                                ? "bg-[#F8E9C8] text-[#E8A838] font-semibold"
                                : "text-[#536174] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                            }`}
                          >
                            {item.label}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Industries accordion */}
                <div className="mb-1">
                  <div className="mb-1 flex overflow-hidden rounded-xl">
                    <Link
                      href="/industries"
                      onClick={closeMobileMenu}
                      className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                        isIndustriesActive
                          ? "bg-[#F8E9C8] text-[#1A2535]"
                          : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {t("industries")}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection("industries")}
                      className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                        isIndustriesActive
                          ? "border-[#1A2535]/10 bg-[#F8E9C8] text-[#1A2535]"
                          : "border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                      }`}
                      aria-label={t("toggleIndustries")}
                      aria-expanded={openMobileSection === "industries"}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileSection === "industries" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {openMobileSection === "industries" && (
                    <div className="mt-1 overflow-hidden">
                      <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                        {industriesItems.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#536174] hover:bg-[#F8E9C8] hover:text-[#1A2535] transition-colors"
                          >
                            {item.label}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Who We Are accordion */}
                <div className="mb-1">
                  <div className="mb-1 flex overflow-hidden rounded-xl">
                    <Link
                      href="/aboutus"
                      onClick={closeMobileMenu}
                      className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                        isWhoWeAreActive
                          ? "bg-[#F8E9C8] text-[#1A2535]"
                          : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {t("whoWeAre")}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection("who-we-are")}
                      className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                        isWhoWeAreActive
                          ? "border-[#1A2535]/10 bg-[#F8E9C8] text-[#1A2535]"
                          : "border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                      }`}
                      aria-label={t("toggleWhoWeAre")}
                      aria-expanded={openMobileSection === "who-we-are"}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileSection === "who-we-are" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {openMobileSection === "who-we-are" && (
                    <div className="mt-1 overflow-hidden">
                      <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                        {whoWeAreItems.map((item) => {
                          const itemClassName = `flex min-h-11 items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isWhoWeAreItemActive(item.path)
                              ? "bg-[#F8E9C8] text-[#E8A838] font-semibold"
                              : "text-[#536174] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                          }`;
                          const itemContent = (
                            <>
                              {item.label}
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                            </>
                          );

                          return item.external ? (
                            <a
                              key={item.path}
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMobileMenu}
                              className={itemClassName}
                            >
                              {itemContent}
                            </a>
                          ) : (
                            <Link
                              key={item.path}
                              href={item.path}
                              onClick={closeMobileMenu}
                              className={itemClassName}
                            >
                              {itemContent}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Insights accordion */}
                <div className="mb-1">
                  <div className="mb-1 flex overflow-hidden rounded-xl">
                    <Link
                      href="/insights"
                      onClick={closeMobileMenu}
                      className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                        isInsightsActive
                          ? "bg-[#F8E9C8] text-[#1A2535]"
                          : "text-[#1A2535] hover:bg-[#E8A838]/[0.08]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {t("insights")}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection("insights")}
                      className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                        isInsightsActive
                          ? "border-[#1A2535]/10 bg-[#F8E9C8] text-[#1A2535]"
                          : "border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                      }`}
                      aria-label={t("toggleInsights")}
                      aria-expanded={openMobileSection === "insights"}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileSection === "insights" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {openMobileSection === "insights" && (
                    <div className="mt-1 overflow-hidden">
                      <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                        {insightsItems.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={closeMobileMenu}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isInsightsItemActive(item.path)
                                ? "bg-[#F8E9C8] text-[#E8A838] font-semibold"
                                : "text-[#536174] hover:bg-[#F8E9C8] hover:text-[#1A2535]"
                            }`}
                          >
                            {item.label}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Suspense
                  fallback={
                    <div
                      aria-hidden="true"
                      className="h-11 w-full border border-[#DDE3EA]"
                    />
                  }
                >
                  <LocaleSwitcher mobile />
                </Suspense>

                {/* Divider */}
                <div className="my-5 h-px bg-[#1A2535]/10" />

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#1A2535] text-[#FFFFFF] rounded-xl text-[15px] font-semibold hover:bg-[#E8A838] hover:text-[#1A2535] transition-colors duration-200"
                >
                  {t("bookCall")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                {/* Brand tagline */}
                <p className="mt-6 text-center text-[9px] font-mono uppercase tracking-[0.22em] text-[#1A2535]/25">
                  {t("tagline")}
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
