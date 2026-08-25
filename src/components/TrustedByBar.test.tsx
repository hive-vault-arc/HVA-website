import React from 'react';
import {render, within} from '@testing-library/react';
import TrustedByBar from './TrustedByBar';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('img', props as React.ImgHTMLAttributes<HTMLImageElement>),
}));

describe('TrustedByBar', () => {
  it('renders exactly one visual logo for each client', () => {
    const {container} = render(
      <TrustedByBar
        partners={[
          {
            name: 'Premium Advice & Training',
            logo: '/premium.webp',
            logoAlt: 'Premium Advice & Training logo',
            href: '/case-studies/premium',
            hrefLocale: 'en',
            surface: 'light',
          },
          {
            name: 'Tarik Rami Immobilier',
            logo: '/tarik.webp',
            logoAlt: 'Tarik Rami Immobilier logo',
            href: '/case-studies/tarik',
            hrefLocale: 'en',
            surface: 'light',
          },
        ]}
      />,
    );

    for (const client of ['premium-advice-training', 'tarik-rami-immobilier']) {
      const logo = container.querySelector(`[data-partner="${client}"]`);
      expect(logo).not.toBeNull();
      expect(within(logo as HTMLElement).getAllByRole('img')).toHaveLength(1);
    }

    expect(container.querySelectorAll('.home-trusted-logo__layer')).toHaveLength(4);
    expect(
      container.querySelectorAll('.home-trusted-logo__layer--color[aria-hidden="true"]'),
    ).toHaveLength(2);
  });

  it('keeps localized client aliases on the canonical sizing hooks', () => {
    const {container} = render(
      <TrustedByBar
        partners={[
          {
            name: 'Asesoramiento y formación premium',
            logo: '/premium.webp',
            logoAlt: 'Premium Advice & Training logo',
            href: '/case-studies/premium',
            hrefLocale: 'es',
            surface: 'light',
          },
          {
            name: 'طارق رامي للعقارات',
            logo: '/tarik.webp',
            logoAlt: 'Tarik Rami Immobilier logo',
            href: '/case-studies/tarik',
            hrefLocale: 'ar',
            surface: 'light',
          },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-partner="premium-advice-training"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-partner="tarik-rami-immobilier"]'),
    ).not.toBeNull();
  });
});
