import '@testing-library/jest-dom/vitest';
import enMessages from '../../messages/en.json';
import type {ReactNode} from 'react';

function resolveMessage(namespace: string | undefined, key: string) {
  const path = [namespace, key].filter(Boolean).join('.').split('.');
  let value: unknown = enMessages;
  for (const segment of path) {
    if (!value || typeof value !== 'object') return key;
    value = (value as Record<string, unknown>)[segment];
  }
  return value;
}

vi.mock('next-intl', async () => {
  const React = await import('react');
  return {
    NextIntlClientProvider: ({children}: {children: ReactNode}) =>
      React.createElement(React.Fragment, null, children),
    useLocale: () => 'en',
    useMessages: () => enMessages,
    useTranslations: (namespace?: string) => {
      const translate = (key: string, values?: Record<string, string | number>) => {
        const raw = resolveMessage(namespace, key);
        if (typeof raw !== 'string') return key;
        return Object.entries(values ?? {}).reduce(
          (message, [name, value]) => message.replaceAll(`{${name}}`, String(value)),
          raw,
        );
      };
      translate.raw = (key: string) => resolveMessage(namespace, key);
      translate.has = (key: string) => resolveMessage(namespace, key) !== undefined;
      return translate;
    },
  };
});

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('IntersectionObserver' in globalThis)) {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  configurable: true,
  value: mockMatchMedia,
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: mockMatchMedia,
  });
}
