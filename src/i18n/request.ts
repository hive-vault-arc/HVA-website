import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';
import {routing} from './routing';

const MESSAGE_CATALOGS = {
  en: enMessages,
  fr: frMessages,
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: MESSAGE_CATALOGS[locale],
  };
});
