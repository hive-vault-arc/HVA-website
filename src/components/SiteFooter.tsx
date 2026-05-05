import Link from 'next/link';
import { ArrowUpRight, Globe, Mail, Phone } from 'lucide-react';
import { FiLinkedin } from 'react-icons/fi';
import Logo from './Logo';
import FooterSpotlight from './ui/FooterSpotlight';
import { BRAND_SEARCH_VARIANTS, BUSINESS_NAME, LINKEDIN_URL, SITE_URL } from '../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../lib/positioning';

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/arc', label: 'ARC' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/industries', label: 'Industries' },
  { href: '/whoweare/abouthva', label: 'Who We Are' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

const expertiseLinks = [
  { href: '/capabilities/solution-programs', label: 'Solution Programs' },
  { href: '/case-studies/multilingual-whatsapp-ai-agent', label: 'WhatsApp Agent Operations' },
  { href: '/case-studies/zoho-grade-crm-platform', label: 'CRM Modernization' },
  { href: '/case-studies', label: 'Healthcare Case Studies' },
  { href: '/insights/research-reports', label: 'Research Reports' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/mentions-legales', label: 'Legal Mentions' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <FooterSpotlight>
        <div className="site-footer__container">
          <div className="site-footer__main">
            <div className="site-footer__brand-col">
              <Logo className="site-footer__logo" light />
              <p className="site-footer__statement">
                {CANONICAL_MARKET_IDENTITY.shortDescriptor}
              </p>
              <p className="site-footer__brand-aliases">
                {BUSINESS_NAME} is also searched as {BRAND_SEARCH_VARIANTS.slice(0, 7).join(', ')}.
              </p>
            </div>

            <nav className="site-footer__group" aria-label="Footer pages">
              <p className="site-footer__title">Pages</p>
              <ul className="site-footer__list-stack">
                {pageLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="site-footer__group" aria-label="Footer expertise">
              <p className="site-footer__title">Expertise</p>
              <ul className="site-footer__list-stack">
                {expertiseLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-footer__group">
              <p className="site-footer__title">Connect</p>
              <div className="site-footer__contacts">
                <Link
                  href="/contact"
                  aria-label="Book a call"
                  className="self-start px-4 py-2 bg-[#1E272E] text-[#F5F6FA] text-sm font-medium hover:bg-[#0984E3] transition-all duration-300 flex items-center sharp-edge"
                >
                  Book a Call
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <a href="mailto:contact@hivevaultarc.com" className="site-footer__contact">
                  <Mail className="h-3.5 w-3.5" />
                  contact@hivevaultarc.com
                </a>
                <a href="tel:+212670431249" className="site-footer__contact">
                  <Phone className="h-3.5 w-3.5" />
                  +212 670 431 249
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__bar">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <p>© {year} H.V.A. ALL RIGHTS RESERVED. PRECISION IN EXECUTION.</p>
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-footer__link text-[10px] opacity-50 hover:opacity-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="site-footer__social">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="site-footer__icon-link sharp-edge"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="site-footer__icon-link sharp-edge"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </FooterSpotlight>
    </footer>
  );
}


