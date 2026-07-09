import Link from 'next/link';
import { ArrowUpRight, Globe, Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import Logo from './Logo';
import FooterSpotlight from './ui/FooterSpotlight';
import {
  BRAND_SEARCH_VARIANTS,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  DISPLAY_BRAND_NAME_UPPER,
  SITE_URL,
  SOCIAL_PROFILES,
} from '../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../lib/positioning';

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  X: FaXTwitter,
  TikTok: FaTiktok,
} as const;

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
  { href: '/capabilities/strategy-business', label: 'Strategy & Business Consulting' },
  { href: '/capabilities/technology-consulting', label: 'Technology Consulting' },
  { href: '/capabilities/ai-data-analytics', label: 'AI, Data & Analytics' },
  { href: '/capabilities/software-engineering', label: 'Software Engineering' },
  { href: '/capabilities/cloud-infrastructure', label: 'Cloud & Infrastructure' },
  { href: '/capabilities/operations-managed', label: 'Operations & Managed Services' },
  { href: '/capabilities/solution-programs', label: 'Solution Programs' },
];

const industryLinks = [
  { href: '/industries#real-estate', label: 'Real Estate & Construction' },
  { href: '/industries#healthcare', label: 'Healthcare & Life Sciences' },
  { href: '/industries#financial-services', label: 'Financial Services' },
  { href: '/industries#government', label: 'Government & Public Sector' },
  { href: '/industries#retail', label: 'Retail & E-Commerce' },
  { href: '/industries#logistics', label: 'Logistics & Transportation' },
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
              <Logo className="site-footer__logo" light size="footer" />
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

            <nav className="site-footer__group" aria-label="Footer services">
              <p className="site-footer__title">Services</p>
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

            <nav className="site-footer__group" aria-label="Footer industries">
              <p className="site-footer__title">Industries</p>
              <ul className="site-footer__list-stack">
                {industryLinks.map((item) => (
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
                  className="sharp-edge flex min-h-11 items-center bg-[#1A2535] px-4 py-2 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:bg-[#E8A838] sm:self-start"
                >
                  Book a Call
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__contact">
                  <Mail className="h-3.5 w-3.5" />
                  {CONTACT_EMAIL}
                </a>
                <a href={`tel:${CONTACT_PHONE_E164}`} className="site-footer__contact">
                  <Phone className="h-3.5 w-3.5" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__bar">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <p>© {year} {DISPLAY_BRAND_NAME_UPPER}. ALL RIGHTS RESERVED. PRECISION IN EXECUTION.</p>
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
              {SOCIAL_PROFILES.map((profile) => {
                const SocialIcon = socialIcons[profile.label];
                return (
                  <a
                    key={profile.label}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="site-footer__icon-link sharp-edge"
                    aria-label={profile.label}
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </FooterSpotlight>
    </footer>
  );
}
