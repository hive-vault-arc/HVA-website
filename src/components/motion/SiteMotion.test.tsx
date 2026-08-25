import {render, waitFor} from '@testing-library/react';
import SiteMotion, {SITE_MOTION, siteMotionDelay} from './SiteMotion';

class RevealingIntersectionObserver {
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [{isIntersecting: true, target} as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve() {}
  disconnect() {}
}

function setReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', () => ({
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

describe('SiteMotion', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      RevealingIntersectionObserver as unknown as typeof IntersectionObserver,
    );
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('assigns once-only section, card, and media motion contracts', async () => {
    const {container} = render(
      <SiteMotion>
        <section>
          <article>
            <img alt="Proof" src="/proof.webp" />
          </article>
        </section>
      </SiteMotion>,
    );

    const scope = container.querySelector('[data-site-motion]');
    const section = container.querySelector('section');
    const card = container.querySelector('article');

    await waitFor(
      () => {
        expect(scope).toHaveAttribute('data-motion-ready', 'true');
        expect(section).toHaveAttribute('data-motion-state', 'revealed');
        expect(card).toHaveAttribute('data-motion-state', 'revealed');
      },
      {timeout: 2_000},
    );

    expect(section).toHaveAttribute('data-motion-section', 'true');
    expect(card).toHaveAttribute('data-motion-card', 'true');
    expect(card).toHaveAttribute('data-motion-media', 'true');
    expect(siteMotionDelay(99)).toBe(SITE_MOTION.maxStaggerMs);
  });

  it('keeps the static presentation for reduced-motion users', async () => {
    setReducedMotion(true);

    const {container} = render(
      <SiteMotion>
        <section>Static content</section>
      </SiteMotion>,
    );

    const scope = container.querySelector('[data-site-motion]');
    const section = container.querySelector('section');

    await waitFor(
      () => {
        expect(scope).toHaveAttribute('data-motion-mode', 'reduced');
        expect(scope).toHaveAttribute('data-motion-ready', 'false');
        expect(section).toHaveAttribute('data-motion-state', 'revealed');
      },
      {timeout: 2_000},
    );
  });
});
