import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';
import esMessages from '../../messages/es.json';
import arMessages from '../../messages/ar.json';
import {isPublicLocale} from './config';
import {routing} from './routing';

const PUBLIC_MESSAGE_CATALOGS = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
  ar: arMessages,
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    // The unpublished ES/AR routes are stopped in the locale layout before
    // content renders. Supplying no catalog here prevents accidental English
    // message fallback while still allowing next-intl to parse their routes.
    messages: isPublicLocale(locale) ? PUBLIC_MESSAGE_CATALOGS[locale] : {},
  };
});
