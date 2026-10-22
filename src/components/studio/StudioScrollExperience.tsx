'use client';

import {useEffect, useRef, type ReactNode} from 'react';

export default function StudioScrollExperience({children}: {children: ReactNode}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const navigateWithKeyboard = (event: MouseEvent) => {
      if (event.detail !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('[data-service-link]');
      const chapter = link && document.getElementById(link.hash.slice(1));
      if (!link || !chapter) return;
      event.preventDefault();
      chapter.scrollIntoView({block: 'start', behavior: 'instant'});
      window.history.pushState(null, '', link.hash);
    };
    root.addEventListener('click', navigateWithKeyboard);

    async function initialise() {
      const [{gsap}, {ScrollTrigger}] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed || !root) return;
      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      media.add({reduced: '(prefers-reduced-motion: reduce)', standard: '(prefers-reduced-motion: no-preference)'}, context => {
        const {reduced} = context.conditions!;
        const tokens = getComputedStyle(root);
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const revealTravel = parseFloat(tokens.getPropertyValue('--studio-space-lg')) * rem;
        const processPhases = [...root.querySelectorAll<HTMLElement>('[data-process-phase]')];
        const processSignals = [...root.querySelectorAll<HTMLElement>('[data-process-signal]')];
        const setProcessActive = (index: number) => {
          processSignals.forEach((signal, signalIndex) => {
            if (signalIndex === index) signal.setAttribute('data-active', 'true');
            else signal.removeAttribute('data-active');
          });
          processPhases.forEach((phase, phaseIndex) => {
            if (phaseIndex === index) phase.setAttribute('data-active', 'true');
            else phase.removeAttribute('data-active');
          });
        };
        processPhases.forEach((phase, index) => ScrollTrigger.create({
          trigger: phase, start: 'top 55%', end: 'bottom 55%',
          onEnter: () => setProcessActive(index), onEnterBack: () => setProcessActive(index),
        }));

        const challengePhases = [...root.querySelectorAll<HTMLElement>('[data-challenge-phase]')];
        const challengeSignals = [...root.querySelectorAll<SVGElement>('[data-challenge-signal]')];
        const setChallengeActive = (index: number) => {
          challengePhases.forEach((phase, phaseIndex) => {
            if (phaseIndex === index) phase.setAttribute('data-active', 'true');
            else phase.removeAttribute('data-active');
          });
          challengeSignals.forEach((signal, signalIndex) => {
            if (signalIndex === index) signal.setAttribute('data-active', 'true');
            else signal.removeAttribute('data-active');
          });
        };
        challengePhases.forEach((phase, index) => ScrollTrigger.create({
          trigger: phase, start: 'top 55%', end: 'bottom 55%',
          onEnter: () => setChallengeActive(index), onEnterBack: () => setChallengeActive(index),
        }));
        const selectChallenge = (event: Event) => {
          if (!(event.target instanceof Element)) return;
          const phase = event.target.closest<HTMLElement>('[data-challenge-phase]');
          if (phase) setChallengeActive(challengePhases.indexOf(phase));
        };
        root.addEventListener('pointerover', selectChallenge);
        root.addEventListener('focusin', selectChallenge);

        const servicePhases = [...root.querySelectorAll<HTMLElement>('[data-service-phase]')];
        const setServiceActive = (index: number) => servicePhases.forEach((phase, phaseIndex) => {
          if (phaseIndex === index) phase.setAttribute('data-active', 'true');
          else phase.removeAttribute('data-active');
        });
        servicePhases.forEach((phase, index) => ScrollTrigger.create({
          trigger: phase, start: 'top 55%', end: 'bottom 55%',
          onEnter: () => setServiceActive(index), onEnterBack: () => setServiceActive(index),
        }));
        const selectService = (event: Event) => {
          if (!(event.target instanceof Element)) return;
          const phase = event.target.closest<HTMLElement>('[data-service-phase]');
          if (phase) setServiceActive(servicePhases.indexOf(phase));
        };
        root.addEventListener('pointerover', selectService);
        root.addEventListener('focusin', selectService);

        root.setAttribute('data-service-ready', 'true');

        if (reduced) return () => {
          setProcessActive(0);
          setChallengeActive(0);
          root.removeEventListener('pointerover', selectChallenge);
          root.removeEventListener('focusin', selectChallenge);
          root.removeEventListener('pointerover', selectService);
          root.removeEventListener('focusin', selectService);
        };

        const tweens = new Map<HTMLElement, ReturnType<typeof gsap.fromTo>>();
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute('data-studio-seen', 'true');
            tweens.get(entry.target as HTMLElement)?.play();
            observer.unobserve(entry.target);
          });
        }, {threshold: .08});

        root.querySelectorAll<HTMLElement>('[data-studio-reveal]').forEach(target => {
          // Leave the initial viewport and restored scroll position visible.
          if (target.getBoundingClientRect().top < window.innerHeight) {
            target.setAttribute('data-studio-seen', 'true');
            return;
          }
          const tween = gsap.fromTo(target, {opacity: 0, y: revealTravel}, {
            opacity: 1, y: 0, duration: .55, ease: 'power3.out', paused: true,
            clearProps: 'opacity,transform',
          });
          tweens.set(target, tween);
          observer.observe(target);
        });
        const revealOnFocus = (event: FocusEvent) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>('[data-studio-reveal]');
          if (target) tweens.get(target)?.progress(1);
        };
        root.addEventListener('focusin', revealOnFocus);

        const processTrack = root.querySelector<HTMLElement>('[data-process-track]');
        if (processTrack) {
          gsap.fromTo(processTrack, {scaleY: 0}, {
            scaleY: 1, ease: 'none',
            scrollTrigger: {trigger: processTrack.parentElement, start: 'top 75%', end: 'bottom 50%', scrub: .5},
          });
        }
        return () => {
          observer.disconnect();
          root.removeEventListener('focusin', revealOnFocus);
          root.removeEventListener('pointerover', selectChallenge);
          root.removeEventListener('focusin', selectChallenge);
          root.removeEventListener('pointerover', selectService);
          root.removeEventListener('focusin', selectService);
          setProcessActive(0);
          setChallengeActive(0);
        };
      }, root);
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(() => {if (!disposed) refresh();});
      root.addEventListener('load', refresh, true);
      cleanup = () => {
        root.removeAttribute('data-service-ready');
        root.removeEventListener('load', refresh, true);
        media.revert();
      };
    }

    void initialise().catch(() => { /* Static content remains usable if motion cannot load. */ });
    return () => {
      disposed = true;
      root.removeEventListener('click', navigateWithKeyboard);
      cleanup?.();
    };
  }, []);

  return <div ref={rootRef} data-studio-scroll>{children}</div>;
}
