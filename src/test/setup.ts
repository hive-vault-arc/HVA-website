import '@testing-library/jest-dom/vitest';

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
