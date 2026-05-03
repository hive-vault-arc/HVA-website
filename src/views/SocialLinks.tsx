import type { IconType } from 'react-icons';
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

interface SocialLink {
  icon: IconType;
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: FaEnvelope,
    label: 'Email',
    handle: 'contact@hivevaultarc.com',
    href: 'mailto:contact@hivevaultarc.com',
    external: false,
  },
  {
    icon: FaPhone,
    label: 'Call',
    handle: '+212 670 431 249',
    href: 'tel:+212670431249',
    external: false,
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    handle: '@hive.vault.arc',
    href: 'https://www.instagram.com/hive.vault.arc/',
    external: true,
  },
  {
    icon: FaFacebook,
    label: 'Facebook',
    handle: 'Hive Vault Arc',
    href: 'https://web.facebook.com/profile.php?id=61588911931881',
    external: true,
  },
  {
    icon: FaXTwitter,
    label: 'X',
    handle: '@Hivevaultarc',
    href: 'https://x.com/Hivevaultarc',
    external: true,
  },
  {
    icon: FaTiktok,
    label: 'TikTok',
    handle: '@hivevaultarc',
    href: 'https://www.tiktok.com/@hivevaultarc',
    external: true,
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    handle: 'Hive Vault Arc',
    href: 'https://www.linkedin.com/company/hive-vault-arc',
    external: true,
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    handle: '+212 670 431 249',
    href: 'https://wa.me/212670431249',
    external: true,
  },
];

export default function SocialLinks() {
  return (
    <main className="bg-[#F8FAFC] text-[#0F172A]">
      <div className="mx-auto max-w-lg px-6 pb-16 pt-28 lg:pt-32">

        {/* Hero */}
        <header className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
            H . V . A
          </p>
          <h1 className="font-headline text-4xl font-medium leading-tight tracking-tight text-[#0F172A]">
            Hive Vault Arc
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">
            AI &amp; Digital Transformation — Tangier, Morocco
          </p>
        </header>

        {/* Social links list */}
        <nav aria-label="Social media links">
          <ul className="space-y-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                  className="group flex items-center gap-5 border border-[#e2e8f0] bg-white p-5 transition-colors hover:bg-[#f0f6ff]"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#0F172A] transition-colors group-hover:text-[#2563EB]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                      {label}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-[#475569]">{handle}</p>
                  </div>
                  <span
                    className="text-sm font-bold text-[#2563EB] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer note */}
        <p className="mt-10 text-center text-[11px] text-[#94a3b8]">
          hivevaultarc.com
        </p>
      </div>
    </main>
  );
}
