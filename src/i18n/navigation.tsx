'use client';

import type {ComponentProps, ComponentType} from 'react';
import NextLink from 'next/link';
import {useRouter as useNextRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
import type {AppLocale} from './config';
import {localizeHref} from './route-manifest';

const navigation = createNavigation(routing);

type LocalizedHref =
  | string
  | {
      pathname: string;
      params?: Record<string, string | number>;
      query?: Record<string, string | number | boolean | undefined>;
    };

type LocalizedLinkProps = Omit<ComponentProps<typeof navigation.Link>, 'href'> & {
  href: LocalizedHref;
};

type LocalizedRouter = Omit<ReturnType<typeof navigation.useRouter>, 'push' | 'replace'> & {
  push: (href: LocalizedHref, options?: {locale?: string; scroll?: boolean}) => void;
  replace: (href: LocalizedHref, options?: {locale?: string; scroll?: boolean}) => void;
};

export function Link({href, locale, ...props}: LocalizedLinkProps) {
  const currentLocale = useLocale() as AppLocale;

  if (typeof href === 'string') {
    const targetLocale = (locale as AppLocale | undefined) ?? currentLocale;
    return <NextLink {...props} href={localizeHref(href, targetLocale)} />;
  }

  const NavigationLink = navigation.Link as ComponentType<LocalizedLinkProps>;
  return <NavigationLink {...props} href={href} locale={locale} />;
}

export function useRouter(): LocalizedRouter {
  const currentLocale = useLocale() as AppLocale;
  const nextRouter = useNextRouter();
  const localizedRouter = navigation.useRouter() as LocalizedRouter;

  return {
    ...localizedRouter,
    push(href, options) {
      if (typeof href === 'string') {
        const targetLocale = (options?.locale as AppLocale | undefined) ?? currentLocale;
        nextRouter.push(localizeHref(href, targetLocale), {scroll: options?.scroll});
        return;
      }
      localizedRouter.push(href, options);
    },
    replace(href, options) {
      if (typeof href === 'string') {
        const targetLocale = (options?.locale as AppLocale | undefined) ?? currentLocale;
        nextRouter.replace(localizeHref(href, targetLocale), {scroll: options?.scroll});
        return;
      }
      localizedRouter.replace(href, options);
    },
  };
}

export const {redirect, usePathname, getPathname} = navigation;
