'use client';

import type {MouseEvent, ReactNode} from 'react';

export default function StudioHeroAnchor({href, className, children}: {href: '#contact' | '#work'; className: string; children: ReactNode}) {
  function followAnchor(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({block: 'start', behavior: 'instant'});
    window.history.pushState(null, '', href);
  }

  return <a className={className} href={href} onClick={followAnchor}>{children}</a>;
}
