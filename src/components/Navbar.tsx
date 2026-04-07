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
    { path: '/industries#real-estate', label: 'Real Estate' },
    { path: '/industries#healthcare', label: 'Healthcare' },
    { path: '/industries#construction', label: 'Construction' },
    { path: '/industries#logistics', label: 'Logistics' },
    { path: '/industries#finance-brokerage', label: 'Finance & Brokerage' },
    { path: '/industries#sme-capabilities', label: 'SME Capabilities' },
  ];

  const insightsItems = [
    { path: '/insights/blogs', label: 'Blogs' },
    { path: '/insights/case-studies', label: 'Case Studies' },
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
      isActive ? 'text-[#F5F6FA] bg-[#0984E3]' : 'text-[#1E272E]/72 hover:text-[#1E272E] hover:bg-[#0984E3]/10'
    }`;

  const isRouteActive = (path: string) => pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  const isInsightsItemActive = (path: string) =>
    pathname === path ||
    (path === '/insights/blogs' && pathname?.startsWith('/blog')) ||
    (path === '/insights/case-studies' && pathname?.startsWith('/case-studies'));

  const isCapabilitiesItemActive = (path: string) => {
    if (path === '/capabilities/solution-programs') {
      return pathname === '/capabilities/solution-programs';
    }

    return isRouteActive(path);
  };

  const isWhoWeAreItemActive = (path: string) =>
    pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  return (
    <header className="navbar-sharp fixed top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <nav 
        className={`transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex items-center justify-between h-16 px-6 rounded-full transition-all duration-300 w-full ${
              isScrolled 
                ? 'bg-[#F5F6FA]/90 backdrop-blur-md border border-[#1E272E]/12 shadow-[0_8px_24px_rgba(9,132,227,0.12)]' 
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/arc" className={desktopLinkClass(isRouteActive('/arc'))}>
                <span className="flex flex-col leading-none gap-0.5">
                  <span>ARC</span>
                  <span className="text-[8px] tracking-widest uppercase opacity-50 font-normal">Framework</span>
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
                  <div className="min-w-[220px] rounded-xl border border-[#1E272E]/10 bg-[#F5F6FA] p-2 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#0984E3] text-[#F5F6FA]'
                            : 'text-[#1E272E]/75 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
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
                  <div className="min-w-[220px] rounded-xl border border-[#1E272E]/10 bg-[#F5F6FA] p-2 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1E272E]/75 transition-colors hover:bg-[#0984E3]/10 hover:text-[#1E272E]"
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
                  <div className="min-w-[220px] rounded-xl border border-[#1E272E]/10 bg-[#F5F6FA] p-2 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#0984E3] text-[#F5F6FA]'
                            : 'text-[#1E272E]/75 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
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
                  <div className="min-w-[220px] rounded-xl border border-[#1E272E]/10 bg-[#F5F6FA] p-2 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#0984E3] text-[#F5F6FA]'
                            : 'text-[#1E272E]/75 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
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
                className="ml-2 px-4 py-2 bg-[#1E272E] text-[#F5F6FA] rounded-full text-sm font-medium hover:bg-[#0984E3] transition-all duration-300 flex items-center"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => {
                  const next = !isMobileMenuOpen;
                  document.body.style.overflow = next ? 'hidden' : '';
                  setIsMobileMenuOpen(next);
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#1E272E]/70 hover:text-[#1E272E] hover:bg-[#0984E3]/10 focus:outline-none"
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

        {/* Mobile menu — full-screen slide-down overlay */}
        <div
          className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0F172A]/25 backdrop-blur-sm"
            onClick={() => {
              document.body.style.overflow = '';
              setIsMobileMenuOpen(false);
            }}
          />

          {/* Slide-down panel */}
          <div
            className={`absolute inset-x-0 top-0 bg-[#F5F6FA] shadow-2xl max-h-[100dvh] overflow-y-auto transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
            }`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E272E]/10 sticky top-0 bg-[#F5F6FA]/95 backdrop-blur-md z-10">
              <Logo />
              <button
                type="button"
                onClick={() => {
                  document.body.style.overflow = '';
                  setIsMobileMenuOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E272E]/8 text-[#1E272E]/60 hover:bg-[#0984E3]/12 hover:text-[#0984E3] transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="px-4 py-3 pb-10">

              {/* ARC — standalone */}
              <Link
                href="/arc"
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors mb-1 ${
                  isRouteActive('/arc')
                    ? 'bg-[#0984E3] text-white'
                    : 'text-[#1E272E] hover:bg-[#0984E3]/8'
                }`}
              >
                ARC
                <ArrowUpRight className="h-4 w-4 opacity-40" />
              </Link>

              {/* Capabilities accordion */}
              <div className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleMobileSection('capabilities')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${
                    isCapabilitiesActive ? 'text-[#0984E3]' : 'text-[#1E272E]'
                  } hover:bg-[#0984E3]/8`}
                >
                  <span className="flex items-center gap-2.5">
                    {isCapabilitiesActive && <span className="h-1.5 w-1.5 rounded-full bg-[#0984E3]" />}
                    Capabilities
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1E272E]/35 transition-transform duration-200 ${
                      openMobileSection === 'capabilities' ? 'rotate-180 text-[#0984E3]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'capabilities' ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#0984E3]/20 pl-3 space-y-0.5 pb-2">
                    <Link
                      href="/capabilities"
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#1E272E]/50 hover:text-[#0984E3] hover:bg-[#0984E3]/6 transition-colors"
                    >
                      All Capabilities
                    </Link>
                    {CapabilitiesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isCapabilitiesItemActive(item.path)
                            ? 'bg-[#0984E3]/10 text-[#0984E3] font-semibold'
                            : 'text-[#1E272E]/65 hover:text-[#0984E3] hover:bg-[#0984E3]/6'
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
                <button
                  type="button"
                  onClick={() => toggleMobileSection('industries')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${
                    isIndustriesActive ? 'text-[#0984E3]' : 'text-[#1E272E]'
                  } hover:bg-[#0984E3]/8`}
                >
                  <span className="flex items-center gap-2.5">
                    {isIndustriesActive && <span className="h-1.5 w-1.5 rounded-full bg-[#0984E3]" />}
                    Industries
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1E272E]/35 transition-transform duration-200 ${
                      openMobileSection === 'industries' ? 'rotate-180 text-[#0984E3]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'industries' ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#0984E3]/20 pl-3 space-y-0.5 pb-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#1E272E]/65 hover:text-[#0984E3] hover:bg-[#0984E3]/6 transition-colors"
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
                <button
                  type="button"
                  onClick={() => toggleMobileSection('who-we-are')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${
                    isWhoWeAreActive ? 'text-[#0984E3]' : 'text-[#1E272E]'
                  } hover:bg-[#0984E3]/8`}
                >
                  <span className="flex items-center gap-2.5">
                    {isWhoWeAreActive && <span className="h-1.5 w-1.5 rounded-full bg-[#0984E3]" />}
                    Who We Are
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1E272E]/35 transition-transform duration-200 ${
                      openMobileSection === 'who-we-are' ? 'rotate-180 text-[#0984E3]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'who-we-are' ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#0984E3]/20 pl-3 space-y-0.5 pb-2">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isWhoWeAreItemActive(item.path)
                            ? 'bg-[#0984E3]/10 text-[#0984E3] font-semibold'
                            : 'text-[#1E272E]/65 hover:text-[#0984E3] hover:bg-[#0984E3]/6'
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
                <button
                  type="button"
                  onClick={() => toggleMobileSection('insights')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${
                    isInsightsActive ? 'text-[#0984E3]' : 'text-[#1E272E]'
                  } hover:bg-[#0984E3]/8`}
                >
                  <span className="flex items-center gap-2.5">
                    {isInsightsActive && <span className="h-1.5 w-1.5 rounded-full bg-[#0984E3]" />}
                    Insights
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1E272E]/35 transition-transform duration-200 ${
                      openMobileSection === 'insights' ? 'rotate-180 text-[#0984E3]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMobileSection === 'insights' ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-2 border-[#0984E3]/20 pl-3 space-y-0.5 pb-2">
                    {insightsItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isInsightsItemActive(item.path)
                            ? 'bg-[#0984E3]/10 text-[#0984E3] font-semibold'
                            : 'text-[#1E272E]/65 hover:text-[#0984E3] hover:bg-[#0984E3]/6'
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
              <div className="my-5 h-px bg-[#1E272E]/10" />

              {/* CTA */}
              <Link
                href="/contact"
                aria-label="Book a call"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#1E272E] text-[#F5F6FA] rounded-xl text-[15px] font-semibold hover:bg-[#0984E3] transition-colors duration-200"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Brand tagline */}
              <p className="mt-6 text-center text-[9px] font-mono uppercase tracking-[0.22em] text-[#1E272E]/25">
                H.V.A · Strategy · Engineering · Operations
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 


