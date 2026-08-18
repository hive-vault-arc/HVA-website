import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import { ArrowUpRight, Facebook, Globe, Instagram, Mail, Phone } from '@/components/icons';
import { FaGithub, FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import Logo from './Logo';
import FooterSpotlight from './ui/FooterSpotlight';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  DISPLAY_BRAND_NAME_UPPER,
  SITE_URL,
  SOCIAL_PROFILES,
} from '../lib/seo';

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Instagram,
  Facebook,
  X: FaXTwitter,
  TikTok: FaTiktok,
} as const;

const pageLinks = [
  { href: '/', key: 'home' },
  { href: '/arc', key: 'arc' },
  { href: '/capabilities', key: 'capabilities' },
  { href: '/industries', key: 'industries' },
  { href: '/aboutus', key: 'whoWeAre' },
  { href: '/insights', key: 'insights' },
  { href: '/contact', key: 'contact' },
] as const;

const expertiseLinks = [
  { href: '/capabilities/strategy-business', key: 'strategyBusiness' },
  { href: '/capabilities/technology-consulting', key: 'technologyConsulting' },
  { href: '/capabilities/ai-data-analytics', key: 'aiData' },
  { href: '/capabilities/software-engineering', key: 'softwareEngineering' },
  { href: '/capabilities/cloud-infrastructure', key: 'cloudInfrastructure' },
  { href: '/capabilities/operations-managed', key: 'managedOperations' },
  { href: '/capabilities/solution-programs', key: 'solutionPrograms' },
] as const;

const industryLinks = [
  { href: '/industries#real-estate', key: 'realEstate' },
  { href: '/industries#healthcare', key: 'healthcare' },
  { href: '/industries#financial-services', key: 'financialServices' },
  { href: '/industries#government', key: 'government' },
  { href: '/industries#retail', key: 'retail' },
  { href: '/industries#logistics', key: 'logistics' },
] as const;

const legalLinks = [
  { href: '/privacy-policy', key: 'privacy' },
  { href: '/mentions-legales', key: 'legalMentions' },
] as const;

export default async function SiteFooter() {
  const year = new Date().getFullYear();
  const t = await getTranslations('Footer');
  const nav = await getTranslations('Navigation');

  return (
    <footer className="site-footer">
      <FooterSpotlight>
        <div className="site-footer__container">
          <div className="site-footer__main">
            <div className="site-footer__brand-col">
              <Logo className="site-footer__logo" light kind="wordmark" size="footer" />
              <p className="site-footer__statement">
                {t('description')}
              </p>
            </div>

            <div className="site-footer__nav-grid">
            <nav className="site-footer__group site-footer__group--pages" aria-label={t('pages')}>
              <p className="site-footer__title">{t('pages')}</p>
              <ul className="site-footer__list-stack">
                {pageLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="site-footer__group site-footer__group--services" aria-label={t('services')}>
              <p className="site-footer__title">{t('services')}</p>
              <ul className="site-footer__list-stack">
                {expertiseLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="site-footer__group site-footer__group--industries" aria-label={t('industries')}>
              <p className="site-footer__title">{t('industries')}</p>
              <ul className="site-footer__list-stack">
                {industryLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-footer__link">
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-footer__group site-footer__group--connect">
              <p className="site-footer__title">{t('connect')}</p>
              <div className="site-footer__contacts">
                <Link href="/contact" className="site-footer__cta sharp-edge">
                  {nav('bookCall')}
                  <ArrowUpRight className="h-3.5 w-3.5" motion="nudge" aria-hidden="true" />
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__contact">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <a href={`tel:${CONTACT_PHONE_E164}`} className="site-footer__contact">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            </div>
          </div>

          <div className="site-footer__bar">
            <div className="site-footer__legal">
              <p>&copy; {year} {DISPLAY_BRAND_NAME_UPPER}. {t('rights')} {t('precision')}</p>
              <div className="site-footer__legal-links">
                {legalLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="site-footer__legal-link">
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
            <div className="site-footer__social">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="site-footer__icon-link sharp-edge"
                aria-label={t('website')}
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
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
                    <SocialIcon className="h-4 w-4" aria-hidden="true" />
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
