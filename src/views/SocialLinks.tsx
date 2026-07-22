import type { ElementType } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Whatsapp,
} from '@/components/icons';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  SOCIAL_PROFILES,
  WHATSAPP_URL,
} from '../lib/seo';

interface SocialLink {
  icon: ElementType;
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

const socialIcons: Record<string, ElementType> = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram,
  Facebook,
  X: FaXTwitter,
  TikTok: FaTiktok,
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Mail,
    label: 'Email',
    handle: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: Phone,
    label: 'Call',
    handle: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE_E164}`,
    external: false,
  },
  ...SOCIAL_PROFILES.map((profile) => ({
    icon: socialIcons[profile.label],
    label: profile.label,
    handle: profile.handle,
    href: profile.url,
    external: true,
  })),
  {
    icon: Whatsapp,
    label: 'WhatsApp',
    handle: CONTACT_PHONE_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
  },
];

export default function SocialLinks() {
  return (
    <div className="bg-[#FFFFFF] text-[#1A2535]">
      <div className="mx-auto max-w-lg px-6 pb-16 pt-28 lg:pt-32">
        <header className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--section-label-color)]">
            HVA / Connect
          </p>
          <h1 className="font-headline text-4xl font-medium leading-tight tracking-tight text-[#1A2535]">
            Hive Vault Arc
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#566274]">
            AI &amp; Digital Transformation in Tangier, Morocco
          </p>
        </header>

        <nav aria-label="Social media links">
          <ul className="space-y-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                  className="group flex items-center gap-5 border border-[#DDE3EA] bg-white p-5 transition-colors hover:bg-[#FFF7E8]"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-[#1A2535] transition-colors group-hover:text-[var(--section-label-color)]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A2535]">
                      {label}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-[#566274]">{handle}</p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-[var(--section-label-color)]"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-center text-[11px] text-[#566274]">
          hivevaultarc.com
        </p>
      </div>
    </div>
  );
}
