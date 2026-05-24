'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CapabilitiesItems = [
    { path: '/capabilities/solution-programs', label: 'Solution Programs' },
    { path: '/capabilities/in-detail', label: 'In Detail' },
  ];

  const industriesItems = [
    { path: '/industries#real-estate', label: 'Real Estate & Construction' },
    { path: '/industries#healthcare', label: 'Healthcare & Life Sciences' },
    { path: '/industries#financial-services', label: 'Financial Services' },
    { path: '/industries#government', label: 'Government & Public Sector' },
    { path: '/industries#retail', label: 'Retail & E-Commerce' },
    { path: '/industries#energy', label: 'Energy & Sustainability' },
    { path: '/industries#logistics', label: 'Logistics & Transportation' },
    { path: '/industries#consumer-goods', label: 'Consumer Goods & Luxury' },
  ];

  const insightsItems = [
    { path: '/blog', label: 'Blogs' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/insights/news-articles', label: 'News Articles' },
    { path: '/insights/perspectives', label: 'Perspectives' },
    { path: '/insights/research-reports', label: 'Research Reports' },
  ];
  const whoWeAreItems = [
    { path: '/whoweare/abouthva', label: 'About H.V.A' },
    { path: '/whoarewe/portfolio', label: 'Portfolio' },
  ];

  const isInsightsActive =
    pathname?.startsWith('/insights') || pathname?.startsWith('/blog') || pathname?.startsWith('/case-studies');
  const isCapabilitiesActive = pathname?.startsWith('/capabilities');
  const isIndustriesActive = pathname?.startsWith('/industries');
  const isWhoWeAreActive = pathname?.startsWith('/whoweare') || pathname?.startsWith('/whoarewe');

  const desktopLinkClass = (isActive: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      isActive ? 'text-[#FFFFFF] bg-[#E8A838]' : 'text-[#1A2535]/72 hover:text-[#1A2535] hover:bg-[#E8A838]/10'
    }`;

  const isRouteActive = (path: string) => pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  const isInsightsItemActive = (path: string) =>
    pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  const isCapabilitiesItemActive = (path: string) => {
    if (path === '/capabilities/solution-programs') {
      return pathname === '/capabilities/solution-programs';
    }

    return isRouteActive(path);
  };

  const isWhoWeAreItemActive = (path: string) =>
    pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  return (
    <header className="navbar-sharp fixed left-2 right-2 top-2 z-50 w-auto max-w-none lg:left-1/2 lg:right-auto lg:w-[90%] lg:max-w-6xl lg:-translate-x-1/2">
      <nav
        className={`transition-all duration-300 ${
          isScrolled ? 'py-1.5 md:py-2' : 'py-2 md:py-4'
        }`}
      >
        <div className="container mx-auto px-0 md:px-4 lg:px-8">
          <div
            className={`flex h-14 w-full items-center justify-between rounded-full px-3 transition-all duration-300 sm:px-4 md:h-16 md:px-6 ${
              isScrolled
                ? 'bg-[#FFFFFF]/90 backdrop-blur-md border border-[#1A2535]/12 shadow-[0_8px_24px_rgba(232,168,56,0.12)]'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/arc" aria-label="ARC" className={desktopLinkClass(isRouteActive('/arc'))}>
                <span className="flex items-baseline gap-1.5">
                  <span>ARC</span>
                  <span className="text-[8px] tracking-[0.18em] uppercase opacity-50 font-medium">Framework</span>
                </span>
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('capabilities')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href="/capabilities"
                  className={`${desktopLinkClass(!!isCapabilitiesActive)} inline-flex items-center gap-1.5`}
                >
                  Capabilities
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className={`absolute left-0 top-full pt-2 transition duration-200 ${openMenu === 'capabilities' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <div className="min-w-[270px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#FFFFFF]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('industries')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href="/industries"
                  className={`${desktopLinkClass(!!isIndustriesActive)} inline-flex items-center gap-1.5`}
                >
                  Industries
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className={`absolute left-0 top-full pt-2 transition duration-200 ${openMenu === 'industries' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
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
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('who-we-are')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href="/whoweare/abouthva"
                  className={`${desktopLinkClass(!!isWhoWeAreActive)} inline-flex items-center gap-1.5`}
                >
                  Who We Are
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className={`absolute left-0 top-full pt-2 transition duration-200 ${openMenu === 'who-we-are' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <div className="min-w-[220px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#FFFFFF]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('insights')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href="/insights"
                  className={`${desktopLinkClass(!!isInsightsActive)} inline-flex items-center gap-1.5`}
                >
                  Insights
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className={`absolute left-0 top-full pt-2 transition duration-200 ${openMenu === 'insights' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <div className="min-w-[220px] rounded-xl border border-[#1A2535]/10 bg-[#FFFFFF] p-2 shadow-[0_8px_24px_rgba(232,168,56,0.14)]">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#E8A838] text-[#FFFFFF]'
                            : 'text-[#1A2535]/75 hover:bg-[#E8A838]/10 hover:text-[#1A2535]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                aria-label="Book a call"
                className="ml-2 flex min-h-11 items-center rounded-full bg-[#1A2535] px-4 py-2 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:bg-[#E8A838]"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => {
                  const next = !isMobileMenuOpen;
                  document.body.style.overflow = next ? 'hidden' : '';
                  setIsMobileMenuOpen(next);
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1A2535]/70 hover:bg-[#E8A838]/10 hover:text-[#1A2535] focus:outline-none"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
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
          className="fixed inset-0 z-[80] opacity-100 pointer-events-auto lg:hidden"
          aria-label="Mobile navigation"
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2535]/10 sticky top-0 bg-[#FFFFFF]/95 backdrop-blur-md z-10">
              <Logo />
              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A2535]/8 text-[#1A2535]/60 transition-colors hover:bg-[#E8A838]/12 hover:text-[#E8A838]"
                aria-label="Close menu"
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
                    ? 'bg-[#E8A838] text-white'
                    : 'text-[#1A2535] hover:bg-[#E8A838]/8'
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
                        ? 'bg-[#E8A838] text-white'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/8'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isCapabilitiesActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      Capabilities
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('capabilities')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isCapabilitiesActive
                        ? 'border-white/20 bg-[#E8A838] text-white'
                        : 'border-[#1A2535]/8 text-[#1A2535]/45 hover:bg-[#E8A838]/8 hover:text-[#E8A838]'
                    }`}
                    aria-label="Toggle capabilities submenu"
                    aria-expanded={openMobileSection === 'capabilities'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'capabilities' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'capabilities' ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    <Link
                      href="/capabilities"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#1A2535]/50 hover:text-[#E8A838] hover:bg-[#E8A838]/6 transition-colors"
                    >
                      All Capabilities
                    </Link>
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/65 hover:text-[#E8A838] hover:bg-[#E8A838]/6'
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industries accordion */}
              <div className="mb-1">
                <div className="mb-1 flex overflow-hidden rounded-xl">
                  <Link
                    href="/industries"
                    onClick={closeMobileMenu}
                    className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                      isIndustriesActive
                        ? 'bg-[#E8A838] text-white'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/8'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isIndustriesActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      Industries
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('industries')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isIndustriesActive
                        ? 'border-white/20 bg-[#E8A838] text-white'
                        : 'border-[#1A2535]/8 text-[#1A2535]/45 hover:bg-[#E8A838]/8 hover:text-[#E8A838]'
                    }`}
                    aria-label="Toggle industries submenu"
                    aria-expanded={openMobileSection === 'industries'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'industries' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'industries' ? 'max-h-[26rem] opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#1A2535]/65 hover:text-[#E8A838] hover:bg-[#E8A838]/6 transition-colors"
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Who We Are accordion */}
              <div className="mb-1">
                <div className="mb-1 flex overflow-hidden rounded-xl">
                  <Link
                    href="/whoweare/abouthva"
                    onClick={closeMobileMenu}
                    className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                      isWhoWeAreActive
                        ? 'bg-[#E8A838] text-white'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/8'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isWhoWeAreActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      Who We Are
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('who-we-are')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isWhoWeAreActive
                        ? 'border-white/20 bg-[#E8A838] text-white'
                        : 'border-[#1A2535]/8 text-[#1A2535]/45 hover:bg-[#E8A838]/8 hover:text-[#E8A838]'
                    }`}
                    aria-label="Toggle who we are submenu"
                    aria-expanded={openMobileSection === 'who-we-are'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'who-we-are' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'who-we-are' ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/65 hover:text-[#E8A838] hover:bg-[#E8A838]/6'
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights accordion */}
              <div className="mb-1">
                <div className="mb-1 flex overflow-hidden rounded-xl">
                  <Link
                    href="/insights"
                    onClick={closeMobileMenu}
                    className={`flex min-h-11 flex-1 items-center px-4 text-[15px] font-semibold transition-colors ${
                      isInsightsActive
                        ? 'bg-[#E8A838] text-white'
                        : 'text-[#1A2535] hover:bg-[#E8A838]/8'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isInsightsActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      Insights
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('insights')}
                    className={`flex min-h-11 w-12 items-center justify-center border-l transition-colors ${
                      isInsightsActive
                        ? 'border-white/20 bg-[#E8A838] text-white'
                        : 'border-[#1A2535]/8 text-[#1A2535]/45 hover:bg-[#E8A838]/8 hover:text-[#E8A838]'
                    }`}
                    aria-label="Toggle insights submenu"
                    aria-expanded={openMobileSection === 'insights'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMobileSection === 'insights' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'insights' ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#E8A838]/20 pl-3 space-y-0.5 pb-2">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#E8A838]/10 text-[#E8A838] font-semibold'
                            : 'text-[#1A2535]/65 hover:text-[#E8A838] hover:bg-[#E8A838]/6'
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-35" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-[#1A2535]/10" />

              {/* CTA */}
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                aria-label="Book a call"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#1A2535] text-[#FFFFFF] rounded-xl text-[15px] font-semibold hover:bg-[#E8A838] transition-colors duration-200"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Brand tagline */}
              <p className="mt-6 text-center text-[9px] font-mono uppercase tracking-[0.22em] text-[#1A2535]/25">
                Hive Vault Arc - Strategy - Engineering - Operations
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
