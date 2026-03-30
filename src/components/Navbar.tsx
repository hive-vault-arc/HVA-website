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
  const pathname = usePathname();

  // Close all dropdowns and mobile menu on route change
  useEffect(() => {
    document.body.style.overflow = '';
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesItems = [
    { path: '/services/solution-programs', label: 'Solution Programs' },
    { path: '/services/in-detail', label: 'In Detail' },
  ];

  const industriesItems = [
    { path: '/industries#real-estate', label: 'Real Estate' },
    { path: '/industries#healthcare', label: 'Healthcare' },
    { path: '/industries#construction', label: 'Construction' },
    { path: '/industries#logistics', label: 'Logistics' },
    { path: '/industries#sme-services', label: 'SME Services' },
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
  const isServicesActive = pathname?.startsWith('/services');
  const isIndustriesActive = pathname?.startsWith('/industries');
  const isWhoWeAreActive = pathname?.startsWith('/whoweare') || pathname?.startsWith('/whoarewe');

  const desktopLinkClass = (isActive: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      isActive ? 'text-[#F5F6FA] bg-[#0984E3]' : 'text-[#1E272E]/72 hover:text-[#1E272E] hover:bg-[#0984E3]/10'
    }`;

  const mobileLinkClass = (isActive: boolean) =>
    `block px-4 py-3 text-base font-medium rounded-lg ${
      isActive ? 'text-[#F5F6FA] bg-[#0984E3]' : 'text-[#1E272E]/72 hover:text-[#1E272E] hover:bg-[#0984E3]/10'
    }`;

  const isRouteActive = (path: string) => pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

  const isInsightsItemActive = (path: string) =>
    pathname === path ||
    (path === '/insights/blogs' && pathname?.startsWith('/blog')) ||
    (path === '/insights/case-studies' && pathname?.startsWith('/case-studies'));

  const isServicesItemActive = (path: string) => {
    if (path === '/services/solution-programs') {
      return pathname === '/services/solution-programs';
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
                ARC
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu('services')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href="/services"
                  className={`${desktopLinkClass(!!isServicesActive)} inline-flex items-center gap-1.5`}
                >
                  Services
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className={`absolute left-0 top-full pt-2 transition duration-200 ${openMenu === 'services' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <div className="min-w-[220px] rounded-xl border border-[#1E272E]/10 bg-[#F5F6FA] p-2 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isServicesItemActive(item.path)
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

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-[#F5F6FA]/95 backdrop-blur-lg rounded-2xl mx-4 mt-2 border border-[#1E272E]/12 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
            <Link href="/arc" className={mobileLinkClass(isRouteActive('/arc'))}>
              ARC
            </Link>
            <Link href="/services" className={mobileLinkClass(!!isServicesActive)}>
              Services
            </Link>
            <div className="ml-3 rounded-xl border border-[#1E272E]/10 bg-white/80 p-2">
              {servicesItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    isServicesItemActive(item.path)
                      ? 'bg-[#0984E3] text-[#F5F6FA]'
                      : 'text-[#1E272E]/72 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/industries" className={mobileLinkClass(!!isIndustriesActive)}>
              Industries
            </Link>
            <div className="ml-3 rounded-xl border border-[#1E272E]/10 bg-white/80 p-2">
              {industriesItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block rounded-lg px-3 py-2 text-sm text-[#1E272E]/72 hover:bg-[#0984E3]/10 hover:text-[#1E272E]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/whoweare/abouthva" className={mobileLinkClass(!!isWhoWeAreActive)}>
              Who We Are
            </Link>
            <div className="ml-3 rounded-xl border border-[#1E272E]/10 bg-white/80 p-2">
              {whoWeAreItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    isWhoWeAreItemActive(item.path)
                      ? 'bg-[#0984E3] text-[#F5F6FA]'
                      : 'text-[#1E272E]/72 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/insights"
              className={mobileLinkClass(!!isInsightsActive)}
            >
              Insights
            </Link>
            <div className="ml-3 rounded-xl border border-[#1E272E]/10 bg-white/80 p-2">
              {insightsItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    isInsightsItemActive(item.path)
                      ? 'bg-[#0984E3] text-[#F5F6FA]'
                      : 'text-[#1E272E]/72 hover:bg-[#0984E3]/10 hover:text-[#1E272E]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                aria-label="Book a call"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-full text-base font-medium text-[#F5F6FA] bg-[#1E272E] hover:bg-[#0984E3] transition-colors duration-200"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 
