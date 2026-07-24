import {forwardRef, type AnchorHTMLAttributes, type ReactNode} from 'react';

type TestLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | {pathname?: string};
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, TestLinkProps>(function TestLink(
  {href, children, ...props},
  ref,
) {
  const resolvedHref = typeof href === 'string' ? href : href.pathname ?? '/';
  return (
    <a ref={ref} href={resolvedHref} {...props}>
      {children}
    </a>
  );
});

export function usePathname() {
  return '/';
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

export function getPathname({href}: {href: string}) {
  return href;
}
