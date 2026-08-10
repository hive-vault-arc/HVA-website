'use client';

import {useEffect, useRef} from 'react';
import Image from 'next/image';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CloudCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from '@/components/icons';
import BottomCTA from '@/components/BottomCTA';
import SectionBrandMark from '@/components/SectionBrandMark';
import {useAnimationQuality} from '@/lib/animationQuality';
import {isSanityCdnImage} from '@/lib/image-delivery';
import type {PortfolioCaseStudy} from '@/lib/proof';

type PortfolioProps = {
  readonly projects: readonly PortfolioCaseStudy[];
};

type SignatureItem = {
  title: string;
  detail: string;
};

const signatureIcons = [Bot, BarChart3, Workflow, CloudCog, ShieldCheck, Sparkles] as const;

const reveal = {
  initial: {opacity: 0, y: 18},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, amount: 0.18},
  transition: {duration: 0.48, ease: [0.23, 1, 0.32, 1]},
} as const;

const getIndustryFamily = (industry: string) => {
  const normalizedIndustry = industry.trim().toLocaleLowerCase();
  const sharedFamilies = [
    'real estate',
    'immobili',
    'healthcare',
    'financial',
    'government',
    'retail',
    'logistics',
    'education',
  ];

  return sharedFamilies.find((family) => normalizedIndustry.includes(family)) ?? normalizedIndustry;
};

const selectFeaturedProjects = (projects: readonly PortfolioCaseStudy[]) => {
  const primaryProject = projects[0];
  if (!primaryProject) return [];

  const primaryIndustry = getIndustryFamily(primaryProject.industry);
  const contrastingProject =
    projects.find(
      (project) =>
        project.slug !== primaryProject.slug &&
        getIndustryFamily(project.industry) !== primaryIndustry,
    ) ?? projects[1];

  return contrastingProject ? [primaryProject, contrastingProject] : [primaryProject];
};

const Portfolio = ({projects}: PortfolioProps) => {
  const t = useTranslations('Portfolio');
  const rootRef = useRef<HTMLDivElement>(null);
  const {motionReduced} = useAnimationQuality();
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const featuredProjects = selectFeaturedProjects(projects);
  const featuredProjectSlugs = new Set(featuredProjects.map((project) => project.slug));
  const signatureCopy = t.raw('signature.items') as SignatureItem[];
  const signatureItems = signatureCopy.map((item, index) => ({
    ...item,
    Icon: signatureIcons[index] ?? Bot,
  }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root || motionReduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-portfolio-hero-media]').forEach((media, index) => {
        gsap.to(media, {
          yPercent: index === 0 ? 7 : -5,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '70% top',
            scrub: 0.8,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-portfolio-project]').forEach((project) => {
        const media = project.querySelector<HTMLElement>('[data-portfolio-project-media]');
        if (!media) return;

        gsap.fromTo(
          media,
          {scale: 0.94, opacity: 0.76},
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: project,
              start: 'top 92%',
              end: 'center 48%',
              scrub: 0.65,
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [motionReduced, projects.length]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div ref={rootRef} className="portfolio-v2">
        <motion.div
          aria-hidden="true"
          className="portfolio-v2__progress"
          style={{scaleX: progressScale}}
        />

        <section className="portfolio-v2__hero" aria-labelledby="portfolio-title">
          <div className="site-frame-wide portfolio-v2__hero-layout">
            <motion.div
              className="portfolio-v2__hero-copy"
              initial={{opacity: 0, y: 22}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.58, ease: [0.23, 1, 0.32, 1]}}
            >
              <div className="portfolio-v2__mark">
                <SectionBrandMark size="sm" eager />
                <span>{t('hero.eyebrow')}</span>
              </div>
              <h1 id="portfolio-title">
                <span>{t('hero.titleLineOne')}</span>
                <em>{t('hero.titleLineTwo')}</em>
              </h1>
              <p>{t('hero.description')}</p>
              <div className="portfolio-v2__hero-actions">
                <Link href="#portfolio-projects">
                  {t('hero.primaryCta')} <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/contact">
                  {t('hero.secondaryCta')} <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <div
              className="portfolio-v2__hero-media"
              aria-label={t('hero.featuredAriaLabel')}
            >
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project, index) => (
                  <motion.figure
                    key={project.slug}
                    data-portfolio-hero-media
                    initial={{opacity: 0, clipPath: 'inset(0 0 100% 0)'}}
                    animate={{opacity: 1, clipPath: 'inset(0 0 0% 0)'}}
                    transition={{
                      duration: 0.72,
                      delay: 0.12 + index * 0.1,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      aria-label={t('projects.openAria', {title: project.title})}
                    >
                      {project.assets.coverImage ? (
                        <Image
                          src={project.assets.coverImage}
                          alt={project.assets.coverAlt ?? project.title}
                          fill
                          priority={index === 0}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          loading="eager"
                          sizes="(max-width: 767px) 88vw, (max-width: 1199px) 44vw, 32vw"
                          unoptimized={isSanityCdnImage(project.assets.coverImage)}
                          className="object-cover"
                        />
                      ) : (
                        <span className="portfolio-v2__media-fallback" aria-hidden="true" />
                      )}
                      <figcaption>
                        <span>{project.clientName}</span>
                        <strong>{project.title}</strong>
                      </figcaption>
                    </Link>
                  </motion.figure>
                ))
              ) : (
                <div className="portfolio-v2__hero-empty">
                  <SectionBrandMark size="md" />
                  <p>{t('projects.empty')}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          id="portfolio-projects"
          className="portfolio-v2__projects"
          aria-labelledby="portfolio-projects-title"
        >
          <div className="site-frame-wide portfolio-v2__project-layout">
            <motion.header className="portfolio-v2__project-intro" {...reveal}>
              <div className="portfolio-v2__mark">
                <SectionBrandMark size="sm" />
                <span>{t('projects.eyebrow')}</span>
              </div>
              <h2 id="portfolio-projects-title">{t('projects.title')}</h2>
              <p>{t('projects.description')}</p>
              <strong>{t('projects.count', {count: projects.length})}</strong>
            </motion.header>

            <div className="portfolio-v2__project-list">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.article
                    key={project.slug}
                    data-portfolio-project
                    className="portfolio-v2__project"
                    {...reveal}
                    transition={{
                      duration: 0.5,
                      delay: motionReduced ? 0 : Math.min(index * 0.04, 0.16),
                    }}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      aria-label={t('projects.openAria', {title: project.title})}
                    >
                      <figure
                        data-portfolio-project-media
                        className="portfolio-v2__project-media"
                      >
                        {project.assets.coverImage ? (
                          <Image
                            src={project.assets.coverImage}
                            alt={project.assets.coverAlt ?? project.title}
                            fill
                            loading={
                              index < 2 || featuredProjectSlugs.has(project.slug) ? 'eager' : 'lazy'
                            }
                            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 46vw, 38vw"
                            unoptimized={isSanityCdnImage(project.assets.coverImage)}
                            className="object-cover"
                          />
                        ) : (
                          <span className="portfolio-v2__media-fallback" aria-hidden="true" />
                        )}
                        {project.assets.clientLogo && (
                          <span className="portfolio-v2__client-logo">
                            <Image
                              src={project.assets.clientLogo}
                              alt={project.assets.clientLogoAlt ?? `${project.clientName} logo`}
                              fill
                              loading="lazy"
                              sizes="112px"
                              unoptimized={isSanityCdnImage(project.assets.clientLogo)}
                              className="object-contain"
                            />
                          </span>
                        )}
                      </figure>

                      <div className="portfolio-v2__project-copy">
                        <div className="portfolio-v2__project-meta">
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <span>{project.industry}</span>
                          <span>{project.clientName}</span>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                        <div className="portfolio-v2__project-footer">
                          <span>
                            <small>{t('projects.statusLabel')}</small>
                            <strong>{project.deploymentStatus}</strong>
                          </span>
                          <em>
                            {t('projects.caseStudyCta')} <ArrowRight aria-hidden="true" />
                          </em>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              ) : (
                <div className="portfolio-v2__project-empty">
                  <p>{t('projects.empty')}</p>
                  <Link href="/contact">{t('hero.secondaryCta')}</Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="portfolio-v2__signature" aria-labelledby="portfolio-signature-title">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.4}}
              className="text-center"
            >
              <h2
                id="portfolio-signature-title"
                className="mx-auto max-w-5xl font-serif text-3xl font-semibold leading-[0.96] text-[#1A2535] sm:text-4xl md:text-5xl lg:text-8xl"
              >
                {t('signature.titleLineOne')}
                <br />
                {t('signature.titleLineTwo')}
              </h2>
              <div className="mt-10 flex items-center justify-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--section-label-color)]">
                  {t('signature.eyebrow')}
                </p>
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold leading-[1.02] text-[#1A2535] sm:text-2xl md:text-3xl lg:text-5xl">
                {t('signature.subtitle')}
              </h3>
              <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-[#1A2535]/[0.72] md:text-[1.55rem]">
                {t('signature.description')}
              </p>
            </motion.div>

            <div className="mt-10 overflow-hidden border border-[#1A2535]/[0.12] bg-white/[0.84]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {signatureItems.map(({title, detail, Icon}, index) => (
                  <motion.article
                    key={title}
                    initial={{opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.35, delay: index * 0.04}}
                    className={[
                      'relative border border-[#1A2535]/10 p-5 py-6 md:p-6',
                      'bg-[linear-gradient(rgba(30,39,46,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,39,46,0.055)_1px,transparent_1px)] bg-[size:26px_26px]',
                      index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F7F8FA]',
                    ].join(' ')}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(232,168,56,0.09),transparent_52%)]" />
                    <div className="relative z-10">
                      <Icon
                        className="h-5 w-5 text-[var(--section-label-color)]"
                        aria-hidden="true"
                      />
                      <h4 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A2535] md:text-[2.1rem]">
                        {title}
                      </h4>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-[#1A2535]/[0.82] md:text-xl">
                        {detail}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BottomCTA
          variant="dark"
          headline={t('bottomCta.title')}
          subtext={t('bottomCta.description')}
          primaryLabel={t('bottomCta.primary')}
          primaryHref="/contact"
          secondaryLabel={t('bottomCta.secondary')}
          secondaryHref="/case-studies"
        />
      </div>
    </MotionConfig>
  );
};

export default Portfolio;
