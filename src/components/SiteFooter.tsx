import Link from 'next/link';
import { Globe, Mail, Phone, Share2 } from 'lucide-react';
import { FiLinkedin } from 'react-icons/fi';
import Logo from './Logo';
import { SITE_URL } from '../lib/seo';

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/products-systems', label: 'Products & Systems' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const expertiseLinks = [
  { href: '/products-systems', label: 'AI Business Operating Systems' },
  { href: '/case-studies/multilingual-whatsapp-ai-agent', label: 'WhatsApp Agent Operations' },
  { href: '/case-studies/zoho-grade-crm-platform', label: 'CRM Operating System' },
  { href: '/case-studies/executive-analytics-control-tower', label: 'Decision Intelligence' },
  { href: '/services', label: 'Consulting + Delivery' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__frame sharp-edge">
        <div className="site-footer__container">
          <div className="site-footer__main">
            <div className="site-footer__brand-col">
              <Logo className="site-footer__logo" />
              <p className="site-footer__statement">
                We engineer and operate intelligent systems that keep your business clear, fast, and resilient.
              </p>
            </div>

            <nav className="site-footer__group" aria-label="Footer pages">
              <p className="site-footer__title">Pages</p>
              <ul className="site-footer__list-grid">
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
                <a href="mailto:khalid.chelhi@outlook.fr" className="site-footer__contact">
                  <Mail className="h-3.5 w-3.5" />
                  khalid.chelhi@outlook.fr
                </a>
                <a href="mailto:ali.amrani.dev@gmail.com" className="site-footer__contact">
                  <Share2 className="h-3.5 w-3.5" />
                  ali.amrani.dev@gmail.com
                </a>
                <a href="tel:+212688270772" className="site-footer__contact">
                  <Phone className="h-3.5 w-3.5" />
                  +212 688 270 772
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__bar">
            <p>© {year} H.V.A. ALL RIGHTS RESERVED. PRECISION IN EXECUTION.</p>
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
                href="https://www.linkedin.com"
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
      </div>
    </footer>
  );
}
