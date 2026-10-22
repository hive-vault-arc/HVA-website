import React from 'react';
import {getLocale} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {STUDIO_COPY} from '@/data/studio-home';
import RouteShell from './studio/RouteShell';
import StudioNavigation from './studio/StudioNavigation';
import StudioFooter from './studio/StudioFooter';

interface LayoutProps {
  children: React.ReactNode;
  afterContent?: React.ReactNode;
}

const Layout = async ({children, afterContent}: LayoutProps) => {
  const locale = await getLocale() as AppLocale;
  const copy = STUDIO_COPY[locale];
  const navigationLinks = [
    {href: '/capabilities' as const, label: copy.nav.services},
    {href: '/case-studies' as const, label: copy.nav.work},
    {href: '/aboutus' as const, label: copy.nav.about},
    {href: '/insights' as const, label: copy.nav.insights},
  ];
  return (
    <RouteShell afterContent={afterContent} header={<StudioNavigation links={navigationLinks} action={{href: '/contact', label: copy.nav.action}} menuLabel={copy.nav.menu} closeLabel={copy.nav.close} />} footer={<StudioFooter copy={copy} />}>
      {children}
    </RouteShell>
  );
};

export default Layout;
