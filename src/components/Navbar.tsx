'use client';

import React, { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from '@/components/icons';
import Logo from './Logo';
import LocaleSwitcher from './localization/LocaleSwitcher';
import {useHydratedPathname} from './localization/useHydratedPathname';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const pathname = useHydratedPathname();
  const t = useTranslations('Navigation');

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((prev) => (prev === section ? null : section));
  };

  const closeMobileMenu = () => {
    document.body.style.overflow = '';
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  // Close all dropdowns and mobile menu on route change
  useEffect(() => {
    document.body.style.overflow = '';
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    setOpenMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CapabilitiesItems = [
    { path: '/capabilities/solution-programs', label: t('solutionPrograms') },
    { path: '/capabilities/in-detail', label: t('inDetail') },
  ];

  const industriesItems = [
    { path: '/industries#real-estate', label: t('realEstate') },
    { path: '/industries#healthcare', label: t('healthcare') },
    { path: '/industries#financial-services', label: t('financialServices') },
    { path: '/industries#government', label: t('government') },
    { path: '/industries#retail', label: t('retail') },
    { path: '/industries#energy', label: t('energy') },
    { path: '/industries#logistics', label: t('logistics') },
    { path: '/industries#consumer-goods', label: t('consumerGoods') },
  ];

  const insightsItems = [
    { path: '/blog', label: t('blog') },
    { path: '/case-studies', label: t('caseStudies') },
    { path: '/insights/news-articles', label: t('newsArticles') },
    { path: '/insights/perspectives', label: t('perspectives') },
    { path: '/insights/research-reports', label: t('researchReports') },
  ];
  const whoWeAreItems = [
    { path: '/aboutus', label: t('aboutUs') },
    { path: '/whoarewe/portfolio', label: t('portfolio') },
  ];

  const isInsightsActive = Boolean(
    pathname?.startsWith('/insights') ||
      pathname?.startsWith('/blog') ||
      pathname?.startsWith('/case-studies'),
  );
  const isCapabilitiesActive = Boolean(pathname?.startsWith('/capabilities'));
  const isIndustriesActive = Boolean(pathname?.startsWith('/industries'));
  const isWhoWeAreActive = Boolean(
    pathname?.startsWith('/aboutus') || pathname?.startsWith('/whoarewe'),
  );

  const desktopLinkClass = (isActive: boolean) =>
    `px-3 py-2 text-sm font-semibold transition-colors duration-150 xl:px-4 ${
      isActive ? 'bg-[#E8A838] text-[#1A2535]' : 'text-[#1A2535]/[0.88] hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
    }`;

  const isRouteActive = (path: string) =>
    pathname === path ||
    Boolean(path !== '/' && pathname?.startsWith(`${path}/`));

  const isInsightsItemActive = (path: string) =>
    pathname === path ||
    Boolean(path !== '/' && pathname?.startsWith(`${path}/`));

  const isCapabilitiesItemActive = (path: string) => {
    if (path === '/capabilities/solution-programs') {
      return pathname === '/capabilities/solution-programs';
    }

    return isRouteActive(path);
  };

  const isWhoWeAreItemActive = (path: string) =>
    pathname === path ||
    Boolean(path !== '/' && pathname?.startsWith(`${path}/`));

  return (
    <header className="navbar-sharp fixed left-2 right-2 top-2 z-50 w-auto max-w-none lg:left-1/2 lg:right-auto lg:w-[94%] lg:max-w-6xl lg:-translate-x-1/2">
      <nav className={`transition-[padding] duration-300 ${isScrolled ? 'py-1.5 md:py-2' : 'py-2 md:py-4'}`}>
        <div className="container mx-auto px-0 md:px-4 lg:px-8">
          <div
            data-scrolled={isScrolled}
            className={`flex h-14 w-full items-center justify-between border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4 md:h-16 md:px-6 ${
              isScrolled
                ? 'border-[#1A2535]/10 bg-white/95 shadow-[0_8px_24px_rgba(26,37,53,0.08)] backdrop-blur-md'
                : 'border-transparent bg-transparent shadow-none'
            }`}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="ml-auto hidden items-center space-x-1 xl:flex">
              <Link href="/arc" className={desktopLinkClass(isRouteActive('/arc'))}>
                <span className="flex items-baseline gap-1.5">
                  <span>ARC</span>{' '}
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] opacity-60">{t('framework')}</span>
                </span>
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('capabilities')}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu('capabilities')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <Link
                  href="/capabilities"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'capabilities'}
                  className={`${desktopLinkClass(!!isCapabilitiesActive)} inline-flex items-center gap-1.5`}
                >
                  {t('capabilities')}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {openMenu === 'capabilities' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[270px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#1A2535]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('industries')}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu('industries')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <Link
                  href="/industries"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'industries'}
                  className={`${desktopLinkClass(!!isIndustriesActive)} inline-flex items-center gap-1.5`}
                >
                  {t('industries')}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {openMenu === 'industries' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[220px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1A2535]/75 transition-colors hover:bg-[#E8A838]/10 hover:text-[#1A2535]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('who-we-are')}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu('who-we-are')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <Link
                  href="/aboutus"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'who-we-are'}
                  className={`${desktopLinkClass(!!isWhoWeAreActive)} inline-flex items-center gap-1.5`}
                >
                  {t('whoWeAre')}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {openMenu === 'who-we-are' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[220px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#1A2535]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('insights')}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu('insights')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <Link
                  href="/insights"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'insights'}
                  className={`${desktopLinkClass(!!isInsightsActive)} inline-flex items-center gap-1.5`}
                >
                  {t('insights')}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {openMenu === 'insights' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[220px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#1A2535]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
            </div>

            <div
              data-navbar-actions
              className="ml-4 hidden shrink-0 items-center gap-2 xl:flex"
            >
              <LocaleSwitcher />
              <Link
                href="/contact"
                className="flex min-h-11 items-center bg-[#1A2535] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-150 hover:bg-[#E8A838] hover:text-[#1A2535]"
              >
                {t('bookCall')}
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => {
                  const next = !isMobileMenuOpen;
                  document.body.style.overflow = next ? 'hidden' : '';
                  setIsMobileMenuOpen(next);
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1A2535]/70 hover:bg-[#E8A838]/10 hover:text-[#1A2535] focus:outline-none"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">{t('openMenu')}</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - full-screen slide-down overlay */}
        {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[80] opacity-100 pointer-events-auto xl:hidden"
          role="navigation"
          aria-label={t('mobileNavigation')}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1A2535]/25 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Slide-down panel */}
          <div
            className="absolute inset-x-0 top-0 translate-y-0 bg-[#FFFFFF] shadow-2xl max-h-[100dvh] overflow-y-auto transition-transform duration-300 ease-out"
          >
            {/* Panel header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1A2535]/10 bg-white px-6 py-4">
              <Logo />
              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A2535]/[0.08] text-[#1A2535]/60 transition-colors hover:bg-[#E8A838]/[0.12] hover:text-[#E8A838]"
                aria-label={t('closeMenu')}
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
                  isRouteActive('/arc')
                    ? 'bg-[#E8A838] text-[#1A2535]'
                    : 'text-[#1A2535] hover:bg-[#E8A838]/[0.08]'
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
                        ? 'bg-[#E8A838] text-[#1A2535]'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/[0.08]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {t('capabilities')}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('capabilities')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isCapabilitiesActive
                        ? 'border-[#1A2535]/10 bg-[#E8A838] text-[#1A2535]'
                        : 'border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#E8A838]/[0.08] hover:text-[#E8A838]'
                    }`}
                    aria-label={t('toggleCapabilities')}
                    aria-expanded={openMobileSection === 'capabilities'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'capabilities' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {openMobileSection === 'capabilities' && (
                <div className="mt-1 overflow-hidden">
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    <Link
                      href="/capabilities"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#1A2535]/50 hover:text-[#E8A838] hover:bg-[#E8A838]/[0.06] transition-colors"
                    >
                      {t('allCapabilities')}
                    </Link>
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/[0.65] hover:text-[#E8A838] hover:bg-[#E8A838]/[0.06]'
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
                        ? 'bg-[#E8A838] text-[#1A2535]'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/[0.08]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {t('industries')}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('industries')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isIndustriesActive
                        ? 'border-[#1A2535]/10 bg-[#E8A838] text-[#1A2535]'
                        : 'border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#E8A838]/[0.08] hover:text-[#E8A838]'
                    }`}
                    aria-label={t('toggleIndustries')}
                    aria-expanded={openMobileSection === 'industries'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'industries' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {openMobileSection === 'industries' && (
                <div className="mt-1 overflow-hidden">
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#1A2535]/[0.65] hover:text-[#E8A838] hover:bg-[#E8A838]/[0.06] transition-colors"
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
                        ? 'bg-[#E8A838] text-[#1A2535]'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/[0.08]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {t('whoWeAre')}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('who-we-are')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isWhoWeAreActive
                        ? 'border-[#1A2535]/10 bg-[#E8A838] text-[#1A2535]'
                        : 'border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#E8A838]/[0.08] hover:text-[#E8A838]'
                    }`}
                    aria-label={t('toggleWhoWeAre')}
                    aria-expanded={openMobileSection === 'who-we-are'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'who-we-are' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {openMobileSection === 'who-we-are' && (
                <div className="mt-1 overflow-hidden">
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/[0.65] hover:text-[#E8A838] hover:bg-[#E8A838]/[0.06]'
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

              {/* Insights accordion */}
              <div className="mb-1">
                <div className="mb-1 flex overflow-hidden rounded-xl">
                  <Link
                    href="/insights"
                    onClick={closeMobileMenu}
                    className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                      isInsightsActive
                        ? 'bg-[#E8A838] text-[#1A2535]'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/[0.08]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {t('insights')}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('insights')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isInsightsActive
                        ? 'border-[#1A2535]/10 bg-[#E8A838] text-[#1A2535]'
                        : 'border-[#1A2535]/[0.08] text-[#1A2535]/[0.45] hover:bg-[#E8A838]/[0.08] hover:text-[#E8A838]'
                    }`}
                    aria-label={t('toggleInsights')}
                    aria-expanded={openMobileSection === 'insights'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'insights' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {openMobileSection === 'insights' && (
                <div className="mt-1 overflow-hidden">
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/[0.65] hover:text-[#E8A838] hover:bg-[#E8A838]/[0.06]'
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

              <LocaleSwitcher mobile />

              {/* Divider */}
              <div className="my-5 h-px bg-[#1A2535]/10" />

              {/* CTA */}
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#1A2535] text-[#FFFFFF] rounded-xl text-[15px] font-semibold hover:bg-[#E8A838] hover:text-[#1A2535] transition-colors duration-200"
              >
                {t('bookCall')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Brand tagline */}
              <p className="mt-6 text-center text-[9px] font-mono uppercase tracking-[0.22em] text-[#1A2535]/25">
                {t('tagline')}
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
