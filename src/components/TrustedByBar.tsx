import Image from 'next/image';
import Link from 'next/link';

import type { HomeTrustedPartner } from '../lib/home-hero';

type TrustedByBarProps = {
  partners: HomeTrustedPartner[];
};

export default function TrustedByBar({ partners }: TrustedByBarProps) {
  if (partners.length === 0) return null;

  return (
    <section className="home-trusted" aria-labelledby="home-trusted-title">
      <div className="home-trusted-shell">
        <div className="home-trusted-heading">
          <h2 id="home-trusted-title">Trusted by teams building for scale</h2>
        </div>
        <div className="home-trusted-logos">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.href}
              className="home-trusted-logo"
              aria-label={`Read the ${partner.name} case study`}
            >
              <span className="home-trusted-logo__media">
                <Image
                  src={partner.logo}
                  alt={partner.logoAlt}
                  fill
                  sizes="(max-width: 640px) 42vw, 220px"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
