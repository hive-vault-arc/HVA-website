'use client';

import React, { Suspense, lazy, useEffect } from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import dynamic from 'next/dynamic';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import CloudEcosystemRail from '@/components/media/CloudEcosystemRail';
import type {AppLocale} from '@/i18n/config';
import {SEMANTIC_MEDIA} from '@/lib/semantic-media';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Cloud,
  Eye,
  Layers,
  MessageSquare,
} from '@/components/icons';
import { motion } from 'framer-motion';
import HomeDecisionGuide from '../components/HomeDecisionGuide';
import TrustedByBar from '../components/TrustedByBar';
import LogoLoop from '../components/LogoItem';
import HeroSlider from '../components/ui/HeroSlider';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import type { CaseStudyShowcaseSummary, ClientEvidenceSummary } from '../lib/proof';
import type { HomeTrustedPartner } from '../lib/home-hero';
import {
  SiCloudflare,
  SiDocker,
  SiGithub,
  SiGooglecloud,
  SiKubernetes,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTerraform,
} from 'react-icons/si';

const WorldMapDemo = lazy(() =>
  import('../components/world-map-demo').then((module) => ({ default: module.WorldMapDemo }))
);
const InsightsCarousel = dynamic(() => import('../components/InsightsCarousel'), {
  loading: () => <div className="h-[520px] bg-[#F1F3F6]" aria-hidden="true" />,
});

type HomeProps = {
  insightsCarouselItems: InsightsCarouselItem[];
  clientEvidence: ClientEvidenceSummary[];
  caseStudies: CaseStudyShowcaseSummary[];
  trustedPartners: HomeTrustedPartner[];
};

const Home: React.FC<HomeProps> = ({
  insightsCarouselItems,
  clientEvidence,
  caseStudies,
  trustedPartners,
}) => {
  const t = useTranslations('Home');
  const locale = useLocale() as AppLocale;

  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  const arcPhases = t.raw('arcPhases') as Array<{
    phase: string;
    title: string;
    discipline: string;
    summary: string;
    proof: string;
  }>;

  const capabilityConfig = [
    {
      icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      icon: <Cloud className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />,
    },
  ];
  const capabilityCopy = t.raw('capabilityPillars') as Array<{
    title: string;
    desc: string;
    imageAlt: string;
    details: string[];
  }>;
  const capabilityPillars = capabilityConfig.map((config, index) => ({
    ...config,
    ...capabilityCopy[index],
  }));
  const capabilityGroups = [
    {
      media: SEMANTIC_MEDIA.home.strategyTechnology,
      pillarIndexes: [0, 1],
    },
    {
      media: SEMANTIC_MEDIA.home.aiSoftware,
      pillarIndexes: [2, 3],
    },
    {
      media: SEMANTIC_MEDIA.home.cloudOperations,
      pillarIndexes: [4, 5],
    },
  ];

  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiOpenai />, title: 'OpenAI', href: 'https://openai.com' },
    { node: <SiSupabase />, title: 'Supabase', href: 'https://supabase.com' },
    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiKubernetes />, title: 'Kubernetes', href: 'https://kubernetes.io' },
    { node: <SiTerraform />, title: 'Terraform', href: 'https://www.terraform.io' },
    { node: <SiGooglecloud />, title: 'Google Cloud', href: 'https://cloud.google.com' },
    { node: <SiCloudflare />, title: 'Cloudflare', href: 'https://www.cloudflare.com' },
    { node: <SiGithub />, title: 'GitHub', href: 'https://www.github.com' },
    { node: <SiPostgresql />, title: 'Postgres', href: 'https://www.postgresql.org' },
  ];

  return (
    <div className="h-full home-reference">
      <HeroSlider />
      <TrustedByBar partners={trustedPartners} />
      <HomeDecisionGuide evidence={clientEvidence} caseStudies={caseStudies} />

      {/* Company identity and capability system */}
      <section className="home-identity-section" aria-labelledby="home-identity-title">
        <div className="site-frame-wide home-identity-intro">
          <div className="home-identity-copy">
            <div className="home-identity-eyebrow">
              <span aria-hidden="true" />
              <p>{t('identityEyebrow')}</p>
            </div>
            <h2 id="home-identity-title">
              {t('identityTitle')}<br />{' '}
              <em>{t('identityAccent')}</em>
            </h2>
            <p className="home-identity-description">
              {t('identityDescription')}
            </p>
            <p className="home-identity-disciplines">
              {t('identityDisciplines')}
            </p>
          </div>

          <div className="home-identity-mosaic">
            {capabilityGroups.map((group, groupIndex) => (
              <motion.article
                key={group.media.altKey}
                className={`home-capability-group home-capability-group--${groupIndex + 1}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.52,
                  delay: groupIndex * 0.06,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <figure className="home-capability-group__media">
                  <ResponsiveMedia
                    media={group.media}
                    locale={locale}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 44vw, 29vw"
                    className="home-capability-group__image"
                  />
                  {groupIndex === 2 ? (
                    <CloudEcosystemRail
                      ariaLabel={
                        locale === 'fr'
                          ? 'Technologies cloud et de conteneurs'
                          : 'Cloud and container technologies'
                      }
                    />
                  ) : null}
                </figure>

                <div className="home-capability-group__content">
                  {group.pillarIndexes.map((pillarIndex) => {
                    const pillar = capabilityPillars[pillarIndex];

                    return (
                      <div key={pillar.title} className="home-capability-card">
                        <span className="home-capability-card__icon" aria-hidden="true">
                          {pillar.icon}
                        </span>
                        <div className="home-capability-card__copy">
                          <p className="home-capability-card__label">
                            {t('pillar')} 0{pillarIndex + 1}
                          </p>
                          <h3>{pillar.title}</h3>
                          <p>{pillar.desc}</p>
                        </div>
                        <Link
                          href="/capabilities"
                          className="home-capability-card__link"
                          aria-label={`${pillar.title}: ${t('ourCapabilities')}`}
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-arc-loop-section">
        <div className="home-arc-loop-shell">
          <div className="home-arc-loop-feature">
            <motion.div
              className="home-arc-loop-copy"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="home-arc-loop-mark">
                <i aria-hidden="true" />
                <span>{t('arcLoop')}</span>
              </div>
              <h2 aria-label={t('arcTitle')}>
                <span>{t('arcTitleLine1')}</span>
                <span>{t('arcTitleLine2')}</span>
                <span>{t('arcTitleLine3')}</span>
              </h2>
              <p>
                {t('arcDescription')}
              </p>
              <Link href="/capabilities" className="home-arc-loop-link">
                {t('ourCapabilities')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.figure
              className="home-arc-loop-media"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div className="home-arc-loop-visual">
                <ResponsiveMedia
                  media={SEMANTIC_MEDIA.home.arcOperatingModel}
                  locale={locale}
                  sizes="(min-width: 1041px) 42vw, 100vw"
                />
              </div>
              <figcaption className="home-arc-loop-visual-card">
                <span>{t('featuredStory')}</span>
                <strong>{t('featuredStoryTitle')}</strong>
              </figcaption>
            </motion.figure>
          </div>

          <div className="home-arc-loop-phases">
            {arcPhases.map((phase) => (
              <article key={phase.phase} className="home-arc-loop-phase" data-phase={phase.phase}>
                <div className="home-arc-loop-phase-head">
                  <span>{phase.phase}</span>
                  <em>{phase.discipline}</em>
                </div>
                <div className="home-arc-loop-phase-title">
                  <h3>{phase.title}</h3>
                </div>
                <strong>{phase.proof}</strong>
                <p>{phase.summary}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <InsightsCarousel items={insightsCarouselItems} />

      <div className="home-technology-marquee relative overflow-hidden py-10 text-[#1A2535] md:py-12">
        <LogoLoop
          logos={techLogos}
          speed={55}
          direction="left"
          logoHeight={42}
          gap={44}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#FFFFFF"
          ariaLabel={t('technologyPartners')}
        />
      </div>

      <section className="home-global-reach-section">
        <Suspense fallback={<div className="h-[220px] w-full bg-[#F8E9C8] sm:h-[300px] md:h-[360px]" aria-hidden="true" />}>
          <WorldMapDemo />
        </Suspense>
      </section>

    </div>
  );
};

export default Home;
