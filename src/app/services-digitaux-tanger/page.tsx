import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Services Digitaux à Tanger — IA, Logiciel & Conseil IT',
  description:
    "Hive Vault Arc offre des services digitaux complets à Tanger : agents IA, développement logiciel sur mesure, conseil IT et transformation digitale. Équipe basée à Tanger, standards d'ingénierie internationaux.",
  path: '/services-digitaux-tanger',
  keywords: [
    'services digitaux Tanger',
    'agence digitale Tanger',
    'services numériques Tanger',
    'agence numérique Tanger',
    'transformation digitale Tanger',
    'développement logiciel Tanger',
    'conseil IT Tanger',
    'services IA Tanger',
    'agence digitale Maroc',
    'services digitaux Maroc',
  ],
  locale: 'fr',
});

const SERVICES_DIGITAUX_TANGER_FAQS: FaqItem[] = [
  {
    question: 'Quels services digitaux Hive Vault Arc propose-t-elle à Tanger ?',
    answer:
      "Hive Vault Arc délivre des agents IA et l'automatisation WhatsApp, le conseil IT et la stratégie technologique, le développement logiciel sur mesure, les programmes de transformation digitale, l'ingénierie CRM et l'infrastructure cloud — depuis une équipe basée à Tanger.",
  },
  {
    question: 'Hive Vault Arc fait-elle uniquement du conseil ou aussi du développement ?',
    answer:
      "Les deux. Hive Vault Arc conseille et construit. Chaque mission comprend la stratégie, l'architecture et la livraison opérationnelle. Nous restons responsables jusqu'au lancement en production et à l'optimisation continue.",
  },
  {
    question: 'Pourquoi choisir une agence digitale basée à Tanger ?',
    answer:
      "Une équipe tangéroise apporte le contexte métier local, la maîtrise du français et de l'arabe, l'alignement avec les exigences réglementaires marocaines et une communication directe sans décalage horaire. Hive Vault Arc associe cette présence locale à des standards d'ingénierie internationaux.",
  },
  {
    question: "Avec quels types d'entreprises à Tanger Hive Vault Arc travaille-t-elle ?",
    answer:
      "Principalement des PME marocaines dans l'immobilier, la santé, la logistique et la finance, ainsi que des entreprises françaises opérant au Maroc et des startups mondiales ayant besoin d'une infrastructure IA ou logicielle.",
  },
  {
    question: "Quelle est la durée d'une mission type de services digitaux ?",
    answer:
      "Les missions ciblées — comme un déploiement d'agent IA ou une transformation CRM — durent généralement 6 à 12 semaines. Les programmes de transformation digitale plus larges s'étendent sur des délais plus longs avec des jalons définis.",
  },
];

const piliers = [
  {
    title: 'IA & Automatisation',
    href: '/ai-agents-tangier',
    text: "Agents IA, automatisation WhatsApp, qualification de leads et workflows d'opérations client pour des équipes multilingues à Tanger.",
  },
  {
    title: 'Conseil IT',
    href: '/it-consulting-tangier',
    text: "Audit technologique, décisions d'architecture, feuille de route de modernisation et gouvernance d'exécution reliée au terrain.",
  },
  {
    title: 'Logiciel Sur Mesure',
    href: '/custom-software-morocco',
    text: 'Backends FastAPI, interfaces Next.js, produits SaaS, CRM et plateformes internes conçus autour de votre réalité opérationnelle.',
  },
];

const services = [
  'Agents IA & Automatisation WhatsApp',
  'Conseil IT & Stratégie Technologique',
  'Logiciel Sur Mesure & Développement SaaS',
  'Programmes de Transformation Digitale',
  'CRM & Systèmes Opérationnels',
  'Infrastructure Cloud & DevOps',
];

const arcSteps = [
  {
    step: 'Audit',
    text: "Cartographier les objectifs, les outils existants, les frictions opérationnelles, la qualité des données et les premiers workflows à transformer.",
  },
  {
    step: 'Roadmap',
    text: "Définir la séquence de transformation, l'architecture, les jalons, les risques d'intégration et le modèle de responsabilité interne.",
  },
  {
    step: 'Craft',
    text: "Construire, déployer, stabiliser et améliorer le système en production avec des points de contrôle concrets.",
  },
];

const etudes = [
  {
    title: 'Agent IA WhatsApp Multilingue',
    href: '/case-studies/multilingual-whatsapp-ai-agent',
    image: '/Images/case-studies/whatsapp-ai-agent-operations-case-study-morocco.webp',
    stats: ['< 18s de temps de réponse', '85% de tri manuel en moins'],
  },
  {
    title: 'Transformation CRM',
    href: '/case-studies/zoho-grade-crm-platform',
    image: '/Images/case-studies/zoho-crm-transformation-case-study-morocco.webp',
    stats: ['$2.4M de pipeline visible', '40% de saisie manuelle en moins'],
  },
];

export default function ServicesDigitauxTangerPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Services Digitaux à Tanger',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Services Digitaux',
    inLanguage: 'fr',
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'City', name: 'Tangier', containedInPlace: { '@type': 'Country', name: 'Morocco' } },
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'AdministrativeArea', name: 'Tanger-Tetouan-Al Hoceima' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Digitaux Hive Vault Arc',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Développement d'agents IA" } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conseil IT' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Développement logiciel sur mesure' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transformation digitale' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatisation WhatsApp' } },
      ],
    },
    availableLanguage: ['fr', 'en', 'ar', 'es'],
    url: `${SITE_URL}/services-digitaux-tanger`,
    description:
      "Hive Vault Arc offre des services digitaux complets à Tanger : agents IA, développement logiciel, conseil IT et transformation digitale.",
    image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Services Digitaux Tanger', path: '/services-digitaux-tanger' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <main className="bg-neutral text-tertiary" lang="fr">
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="geo-kicker">Services Digitaux Tanger</p>
              <h1 className="editorial-title">Services Digitaux pour les Entreprises à Tanger</h1>
              <p className="editorial-lead max-w-3xl">
                Hive Vault Arc est une équipe basée à Tanger pour les entreprises qui cherchent plus qu'une agence web classique.
                Nous combinons agents IA, conseil IT, développement logiciel sur mesure, infrastructure cloud et
                transformation digitale dans un modèle d'exécution responsable. Les PME marocaines, les sociétés
                françaises opérant au Maroc et les startups internationales nous sollicitent lorsque la stratégie doit
                devenir un système fiable.
              </p>
              <div className="editorial-actions">
                <Link href="/contact" className="editorial-cta sharp-edge">
                  Démarrer par un Appel Découverte
                </Link>
                <Link href="/digital-services-tangier" className="editorial-link">
                  English Version →
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src="/Images/brand/hva-ai-software-agency-tangier.webp"
                alt="Services digitaux Hive Vault Arc à Tanger, Maroc"
                fill
                priority
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-px bg-[#DDE3EA] px-6 py-12 md:grid-cols-3 lg:px-12">
            {piliers.map((pilier) => (
              <Link key={pilier.href} href={pilier.href} className="group bg-white p-6 transition-colors hover:bg-[#F7F8FA]">
                <h2 className="font-headline text-2xl leading-tight text-[#1A2535]">{pilier.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-secondary">{pilier.text}</p>
                <span className="mt-6 inline-flex text-sm font-bold text-primary">Explorer →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-14 px-6 py-16 lg:px-12">
          <article>
            <h2 className="services-brief-section-title">Que Sont les Services Digitaux ?</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Pour une PME marocaine, les services digitaux ne devraient pas se limiter à un site web, une identité
              visuelle ou une campagne marketing. Ils couvrent l'ensemble des capacités qui rendent l'entreprise plus
              simple à piloter, à mesurer et à faire évoluer : stratégie technologique, logiciel métier, automatisation,
              données, cloud et systèmes d'exécution.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Une vraie agence digitale ou firme de services numériques aide d'abord à décider ce qu'il faut moderniser,
              puis construit les systèmes nécessaires. Cela peut être un agent IA WhatsApp, une architecture CRM pour la
              visibilité commerciale, un portail interne pour les opérations ou un modèle cloud plus fiable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Hive Vault Arc traite les services digitaux comme une couche opérationnelle complète : conseil, architecture,
              ingénierie, déploiement et amélioration continue. L'objectif est une transformation pratique, pas une
              collection d'outils déconnectés.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">L'Offre Complète de Services Digitaux Hive Vault Arc</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service} className="geo-card">
                  <h3 className="font-headline text-xl leading-tight text-[#1A2535]">{service}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    Livré avec découverte, architecture, implémentation et support en production afin de rester lié aux
                    objectifs business.
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">Pourquoi les Entreprises de Tanger Choisissent Hive Vault Arc</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Contexte Local</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Nous comprenons les rythmes commerciaux à Tanger, les environnements français et arabe, les exigences
                  réglementaires marocaines et les contraintes de coordination terrain.
                </p>
              </div>
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Standard International</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Notre travail repose sur une ingénierie de production, des jalons clairs et des résultats opérationnels
                  démontrables plutôt que sur du conseil théorique.
                </p>
              </div>
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Couverture Complète</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Stratégie, logiciel, IA, intégrations, cloud et maintenance restent sous une seule responsabilité pour
                  réduire les risques de transmission entre prestataires.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="services-brief-section-title">Aperçu du Processus ARC</h2>
              <Link href="/arc" className="editorial-link">
                Voir le Framework ARC →
              </Link>
            </div>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {arcSteps.map((item, index) => (
                <li key={item.step} className="geo-card">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-headline text-2xl text-[#1A2535]">{item.step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.text}</p>
                </li>
              ))}
            </ol>
          </article>

          <article>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="services-brief-section-title">Résultats en Production</h2>
              <Link href="/case-studies" className="editorial-link">
                Voir les Études de Cas →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {etudes.map((etude) => (
                <Link key={etude.href} href={etude.href} className="group grid bg-white md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[14rem] overflow-hidden bg-[#E8EBF0]">
                    <Image
                      src={etude.image}
                      alt={etude.title}
                      fill
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-2xl leading-tight text-[#1A2535] group-hover:text-primary">
                      {etude.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {etude.stats.map((stat) => (
                        <li key={stat} className="text-sm font-semibold text-secondary">
                          {stat}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex text-sm font-bold text-primary">Lire la preuve →</span>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-12">
            <h2 className="services-brief-section-title">Commencer par un Appel Découverte</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              Si vous comparez des agences digitales, des prestataires IT ou des équipes logiciel à Tanger, commencez
              par le processus métier. Nous identifierons où l'IA, le logiciel, le conseil et le cloud peuvent créer
              l'impact mesurable le plus fort.
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/contact" className="editorial-cta sharp-edge">
                Réserver un Appel
              </Link>
              <Link href="/capabilities" className="editorial-link">
                Explorer les Capacités →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection
        faqs={SERVICES_DIGITAUX_TANGER_FAQS}
        heading="Services Digitaux à Tanger : Questions Fréquentes"
      />
    </>
  );
}
