'use client';

import {useEffect} from 'react';

type Props = {
  locale: string;
  direction?: 'ltr' | 'rtl';
};

export default function LocaleDocumentAttributes({locale, direction = 'ltr'}: Props) {
  useEffect(() => {
    const root = document.documentElement;
    const previousLanguage = root.lang;
    const previousDirection = root.dir;

    root.lang = locale;
    root.dir = direction;

    return () => {
      root.lang = previousLanguage || 'en';
      root.dir = previousDirection;
    };
  }, [direction, locale]);

  return null;
}
