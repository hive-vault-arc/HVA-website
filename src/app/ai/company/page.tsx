import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getCompanyResource } from "@/lib/company-resource";
import {
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/seo";
import styles from "./page.module.css";

const pageTitle = "Hive Vault Arc Company Profile";
const pageDescription =
  "Verified company facts, capabilities, leadership, markets, and machine-readable resources for Hive Vault Arc in Tangier, Morocco.";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/ai/company",
    types: { "application/json": "/ai/company.json" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: pageTitle,
    description: pageDescription,
    url: "/ai/company",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: "Hive Vault Arc company profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default async function CompanyProfilePage() {
  const resource = await getCompanyResource();
  const { company } = resource;
  const reviewedDate = new Date(resource.lastUpdated);
  const reviewedLabel = Number.isNaN(reviewedDate.getTime())
    ? resource.lastUpdated
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(reviewedDate);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": absoluteUrl("/#organization"),
    name: company.name,
    legalName: company.legalName,
    alternateName: company.alternateNames,
    url: company.website,
    email: company.email,
    telephone: company.telephone,
    description: company.description,
    sameAs: company.socialProfiles,
    areaServed: company.marketsServed,
    foundingLocation: {
      "@type": "Place",
      name: `${company.location.city}, ${company.location.country}`,
    },
    founder: company.founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      url: founder.profileUrl,
      sameAs: founder.linkedinUrl ? [founder.linkedinUrl] : undefined,
    })),
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/ai/company")}#webpage`,
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl("/ai/company"),
    inLanguage: "en",
    dateModified: resource.lastUpdated,
    mainEntity: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  const resources = [
    {
      label: "Structured company record",
      description:
        "The same approved facts in JSON for programmatic retrieval.",
      href: "/ai/company.json",
    },
    {
      label: "Short AI context",
      description: "A concise overview for assistants and retrieval systems.",
      href: "/llms.txt",
    },
    {
      label: "Extended AI context",
      description: "Detailed services, evidence, and public company context.",
      href: "/llms-full.txt",
    },
    {
      label: "XML sitemap",
      description:
        "Canonical, indexable website URLs submitted to search engines.",
      href: "/sitemap.xml",
    },
  ] as const;

  return (
    <div className={styles.page}>
      <JsonLd data={[organizationSchema, pageSchema]} />

      <section className={styles.hero} aria-labelledby="company-profile-title">
        <div className={`site-frame ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.context}>Company profile</p>
            <h1 id="company-profile-title">Hive Vault Arc company profile</h1>
            <p className={styles.lead}>{company.description}</p>
            <div className={styles.actions}>
              <Link className="btn-primary" href="/">
                Visit the main website
              </Link>
              <Link className="btn-secondary" href="/ai/company.json">
                View the JSON record
              </Link>
            </div>
          </div>

          <aside className={styles.record} aria-label="Company record status">
            <div className={styles.recordHeading}>
              <p>Canonical public record</p>
              <span>Approved</span>
            </div>
            <dl className={styles.recordFacts}>
              <div>
                <dt>Based in</dt>
                <dd>{`${company.location.city}, ${company.location.country}`}</dd>
              </div>
              <div>
                <dt>Markets served</dt>
                <dd>{company.marketsServed.join(", ")}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{company.languages.join(", ")}</dd>
              </div>
              <div>
                <dt>Last reviewed</dt>
                <dd>
                  <time dateTime={resource.lastUpdated}>{reviewedLabel}</time>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        className={styles.definition}
        aria-labelledby="company-definition-title"
      >
        <div className={`site-frame ${styles.definitionGrid}`}>
          <h2 id="company-definition-title">What is Hive Vault Arc?</h2>
          <div className={styles.definitionCopy}>
            <p>
              Hive Vault Arc is a technology transformation partner based in
              Tangier, Morocco.
            </p>
            <p>
              We advise, build, and operate across strategy, AI engineering,
              custom software, cloud infrastructure, and managed operations.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="company-capabilities-title"
      >
        <div className="site-frame">
          <div className={styles.sectionHeading}>
            <h2 id="company-capabilities-title">Connected capabilities</h2>
            <p>
              Strategy and delivery stay connected from the first decision
              through production operations.
            </p>
          </div>
          {company.services.length ? (
            <div className={styles.capabilityList}>
              {company.services.map((service, index) => (
                <article className={styles.capability} key={service.id}>
                  <span className={styles.capabilityIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.summary}</p>
                  </div>
                  <a href={service.url}>Read capability</a>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              Capability records are being reviewed.
            </p>
          )}
        </div>
      </section>

      <section
        className={styles.sectionAlt}
        aria-labelledby="company-leadership-title"
      >
        <div className="site-frame">
          <div className={styles.sectionHeading}>
            <h2 id="company-leadership-title">Founder-led delivery</h2>
            <p>
              Leadership remains close to strategy, engineering decisions, and
              operating outcomes.
            </p>
          </div>
          {company.founders.length ? (
            <div className={styles.leadershipGrid}>
              {company.founders.map((founder) => (
                <article className={styles.leader} key={founder.slug}>
                  <h3>{founder.name}</h3>
                  <p className={styles.leaderRole}>{founder.role}</p>
                  <p>{founder.responsibility}</p>
                  <a href={founder.profileUrl}>View public profile</a>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              Leadership records are being reviewed.
            </p>
          )}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="company-scope-title">
        <div className={`site-frame ${styles.scopeGrid}`}>
          <div>
            <h2 id="company-scope-title">Operating scope</h2>
            <p className={styles.scopeIntro}>
              Public scope is kept consistent across the website, structured
              data, and AI resources.
            </p>
          </div>
          <div className={styles.scopeColumns}>
            <div>
              <h3>Industries</h3>
              <ul>
                {company.industries.map((industry) => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>AI and data</h3>
              <ul>
                {company.aiCapabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.resources}
        aria-labelledby="company-resources-title"
      >
        <div className="site-frame">
          <div className={styles.sectionHeading}>
            <h2 id="company-resources-title">Reference resources</h2>
            <p>
              Each resource is public, canonical, and generated from the same
              company facts.
            </p>
          </div>
          <div className={styles.resourceList}>
            {resources.map((resourceLink) => (
              <a href={resourceLink.href} key={resourceLink.href}>
                <span>{resourceLink.label}</span>
                <small>{resourceLink.description}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.contactSection}
        aria-labelledby="company-contact-title"
      >
        <div className={`site-frame ${styles.contactPanel}`}>
          <div>
            <h2 id="company-contact-title">
              Discuss a transformation priority
            </h2>
            <p>
              Start with the business decision, then define the right delivery
              path.
            </p>
          </div>
          <div className={styles.contactActions}>
            <Link
              className="site-action site-action-primary-on-dark"
              href="/contact"
            >
              Book a consultation
            </Link>
            <a className={styles.emailLink} href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
