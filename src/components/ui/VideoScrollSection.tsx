'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger);
}

const PANELS = [
  {
    num: '01',
    category: 'AI Development',
    title: 'AI Agents',
    description:
      'Intelligent agents and LLM-powered automation that handles calls, qualifies leads, and surfaces insights around the clock.',
  },
  {
    num: '02',
    category: 'Web Development',
    title: 'Web Apps',
    description:
      'High-performance web systems and enterprise portals built with Next.js and React — from concept to production.',
  },
  {
    num: '03',
    category: 'SaaS & Platforms',
    title: 'SaaS Platforms',
    description:
      'End-to-end SaaS product development — scalable architecture, cloud deployment, and the infrastructure your users rely on.',
  },
  {
    num: '04',
    category: 'Mobile Development',
    title: 'Mobile Apps',
    description:
      'Custom iOS & Android applications built with Flutter and React Native — engineered for performance, designed to scale.',
  },
  {
    num: '05',
    category: 'Process Automation',
    title: 'Automation',
    description:
      'End-to-end workflow automation and system integrations — eliminate manual ops and connect every tool in your stack.',
  },
  {
    num: '06',
    category: 'Data & Intelligence',
    title: 'Analytics',
    description:
      'Custom data pipelines, dashboards, and AI-powered insights that turn raw signals into decisions your team can act on.',
  },
  {
    num: '07',
    category: 'Growth & Scale',
    title: 'Growth Stack',
    description:
      'Performance marketing infrastructure, attribution systems, and conversion tooling — built to compound as your business grows.',
  },
];

interface Props {
  readonly videoSrc: string;
  /** Colour the TOP gradient fades FROM — match the section above (default: dark navy) */
  readonly topBg?: string;
  /** Colour the BOTTOM gradient fades TO — match the section below (default: off-white) */
  readonly bottomBg?: string;
}

export default function VideoScrollSection({
  videoSrc,
  topBg = '#0F172A',
  bottomBg = '#F5F6FA',
}: Props) {
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  // GSAP tweens this plain JS object — the RAF loop reads it and seeks the video.
  const scrubProxyRef = useRef({ time: 0 });
  // Throttle flag: prevents concurrent seeks from flooding the decoder.
  const isSeekingRef = useRef(false);
  // Visibility gate — skip expensive video work when section is off-screen.
  const isVisibleRef = useRef(false);

  // Delay attaching the heavy video source until this section nears the viewport.
  useEffect(() => {
    if (activeVideoSrc || !wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActiveVideoSrc(videoSrc);
        observer.disconnect();
      },
      { threshold: 0.1 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [activeVideoSrc, videoSrc]);

  // ── Canvas RAF loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sync canvas pixel dimensions to its CSS display size
    const syncSize = () => {
      const w = canvas.offsetWidth || globalThis.window?.innerWidth || 1920;
      const h = canvas.offsetHeight || globalThis.window?.innerHeight || 1080;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    const drawCover = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!cw || !ch || !vw || !vh) return;

      // object-fit: cover math
      const canvasAR = cw / ch;
      const videoAR = vw / vh;
      let sx = 0, sy = 0, sw = vw, sh = vh;
      if (videoAR > canvasAR) {
        sw = vh * canvasAR;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / canvasAR;
        sy = (vh - sh) / 2;
      }

      // Clear before drawing — prevents ghosting/smearing from accumulated frames
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    // Issue a seek to the current proxy target, guarded by the throttle flag.
    const doSeek = () => {
      if (video.readyState < 1) return;
      isSeekingRef.current = true;
      video.currentTime = scrubProxyRef.current.time;
    };

    // When a seek completes: draw the frame, then re-seek if the target has moved.
    // This chains seeks so scroll-during-seek is always caught without decoder flooding.
    const onSeeked = () => {
      isSeekingRef.current = false;
      if (video.readyState >= 2) drawCover();
      if (Math.abs(video.currentTime - scrubProxyRef.current.time) > 0.016) {
        doSeek();
      }
    };
    video.addEventListener('seeked', onSeeked);

    // Visibility gate — only do expensive video work when section is in view.
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    // RAF loop: trigger a seek whenever the target has moved and we're not already seeking.
    // One seek at a time — no lerp, no catch-up animation after scroll stops.
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      if (!isVisibleRef.current) return;
      const target = scrubProxyRef.current.time;
      if (!isSeekingRef.current && Math.abs(video.currentTime - target) > 0.016 && video.readyState >= 1) {
        doSeek();
      } else if (!isSeekingRef.current && video.readyState >= 2) {
        drawCover();
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      observer.disconnect();
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  // ── GSAP scroll timeline ─────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (globalThis.window === undefined) return;

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!wrapper || !sticky || !video || !activeVideoSrc) return;

    // Initial panel states — runs before paint, no flash
    panelRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 50 });
    });
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
    }

    let ctx: gsap.Context | null = null;

    const setupTimeline = () => {
      const dur = video.duration;
      if (!dur || !Number.isFinite(dur)) return;

      ctx?.revert();
      ctx = gsap.context(() => {
        const TOTAL = PANELS.length;

        // scrub: true = playhead tracks scroll immediately.
        // GSAP tweens the proxy (a plain JS object), NOT video.currentTime directly,
        // so no seeks are triggered by GSAP. The RAF loop lerps currentTime toward
        // proxy.time at a controlled rate — preventing seek-flooding.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            pin: sticky,
            pinSpacing: true,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });

        // Tween the proxy — RAF loop reads this and seeks the video
        tl.to(scrubProxyRef.current, { time: dur, ease: 'none', duration: TOTAL }, 0);

        // Progress bar
        if (progressRef.current) {
          tl.to(progressRef.current, { scaleX: 1, ease: 'none', duration: TOTAL }, 0);
        }

        // Panel crossfades — each panel owns ~1 unit, 0.3-unit fade window
        for (let i = 0; i < TOTAL; i++) {
          const el = panelRefs.current[i];
          if (!el) continue;
          if (i > 0) {
            tl.to(el, { opacity: 1, yPercent: 0, duration: 0.3, ease: 'none' }, i - 0.2);
          }
          if (i < TOTAL - 1) {
            tl.to(el, { opacity: 0, yPercent: -50, duration: 0.3, ease: 'none' }, i + 0.8);
          }
        }
      }, wrapper);
    };

    video.src = activeVideoSrc;
    video.load();
    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener('loadedmetadata', setupTimeline, { once: true });
    }

    return () => ctx?.revert();
  }, [activeVideoSrc]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${(PANELS.length + 1) * 100}vh` }}
      aria-label="What We Build — scroll to explore Our Capabilities"
    >
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#050505',
        }}
      >
        {/* Canvas — receives blended video frames */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            // Extra blur masks keyframe-seek seams; lower brightness lifts text contrast
            filter: 'blur(9px) brightness(0.72) saturate(1.05)',
          }}
        />

        {/* Hidden video — GSAP animates currentTime; canvas reads the decoded frames */}
        <video
          ref={videoRef}
          src={activeVideoSrc ?? undefined}
          muted
          playsInline
          preload="none"
          tabIndex={-1}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Dark scrim — lifts text contrast without competing with the blur */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.50)',
            zIndex: 1,
          }}
        />

        {/* Top fade — blends FROM the dark section above (no white band) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '32%',
            background: `linear-gradient(to bottom, ${topBg} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom fade — blends TO the page background below */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '28%',
            background: `linear-gradient(to top, ${bottomBg} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 max(2rem, 8vw)',
          }}
        >
          <p
            style={{
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            }}
          >
            What We Build
          </p>

          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 'clamp(180px, 44vh, 400px)',
            }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={panel.num}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }}
              >
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#3b82f6',
                    marginBottom: '0.9rem',
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  }}
                >
                  {panel.num} &mdash; {panel.category}
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2.8rem, 9vw, 8rem)',
                    fontWeight: 900,
                    lineHeight: 0.88,
                    letterSpacing: '-0.025em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,246,250,0.97)',
                    marginBottom: '1.75rem',
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  }}
                >
                  {panel.title}
                </h2>
                <p
                  style={{
                    maxWidth: '28rem',
                    margin: '0 auto',
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  }}
                >
                  {panel.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '7%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 4,
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(245,246,250,0.7)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

