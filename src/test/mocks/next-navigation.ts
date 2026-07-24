export function usePathname() {
  return '/';
}

export function useParams() {
  return {};
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function useRouter() {
  return {
    back() {},
    forward() {},
    refresh() {},
    push() {},
    replace() {},
    prefetch: async () => undefined,
  };
}

export function redirect(): never {
  throw new Error('NEXT_REDIRECT');
}

export function permanentRedirect(): never {
  throw new Error('NEXT_PERMANENT_REDIRECT');
}

export function notFound(): never {
  throw new Error('NEXT_NOT_FOUND');
}
