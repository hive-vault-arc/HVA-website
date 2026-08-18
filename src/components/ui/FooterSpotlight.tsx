import type {ReactNode} from 'react';

export default function FooterSpotlight({children}: Readonly<{children: ReactNode}>) {
  return <div className="site-footer__frame">{children}</div>;
}
