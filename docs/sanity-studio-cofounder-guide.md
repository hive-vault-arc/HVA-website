# Hive Vault Arc Sanity Studio — Co-Founder Guide

Last verified: 12 August 2026  
Website: [hivevaultarc.com](https://hivevaultarc.com)  
Hosted Studio: [hva.sanity.studio](https://hva.sanity.studio/)

## Purpose of this guide

Sanity is the content management system (CMS) behind the editorial and company content on the Hive
Vault Arc website. Use it to manage:

- English and French content;
- capabilities;
- industries;
- people and employee profiles;
- blog posts;
- news articles;
- perspectives;
- research reports;
- case studies;
- images and client logos;
- project screenshots;
- approved testimonials and client evidence;
- approved case-study metrics;
- sources, FAQs, structured article sections, and SEO fields.

The Studio is a separate application from the public Next.js website. Content editors work in
Sanity; the frontend reads approved, published content from Sanity and renders it on
`hivevaultarc.com`.

This guide covers both everyday editing and developer operations. If you only need to edit content,
focus on **Getting access**, **Running the Studio**, **Understanding English and French**, and
**Everyday publishing workflow**.

## System overview

```text
Sanity Studio (editor interface)
        │
        │ writes structured content
        ▼
Sanity project 0zprc9fo / production dataset
        │
        │ GROQ queries, images, preview, revalidation
        ▼
Next.js frontend / hivevaultarc.com
```

The workspace contains two independent applications:

```text
hva-website/
├── Hva-website-front/       # Next.js public website
└── hva-website-studio/      # Sanity Studio and CMS schemas
```

The Sanity connection is already configured:

| Setting        | Value                        |
| -------------- | ---------------------------- |
| Project ID     | `0zprc9fo`                   |
| Dataset        | `production`                 |
| Local Studio   | `http://localhost:3333`      |
| Local frontend | `http://localhost:3000`      |
| Hosted Studio  | `https://hva.sanity.studio/` |
| Public website | `https://hivevaultarc.com`   |

The `production` dataset is live. Publishing, unpublishing, deleting, migrations, imports, and
upload scripts can affect the public website.

## Important source-code handover note

At the time this guide was written, `hva-website-studio` is a local Git repository with no Git
remote. It is not inside the frontend GitHub repository. The hosted Studio is deployed, but its
source code must be transferred separately.

Before the co-founder takes over development, do one of the following:

1. create a private GitHub repository for `hva-website-studio`, configure its remote, and push
   `main`; or
2. provide the complete `hva-website-studio` folder as a secure archive.

The current local Studio checkpoint is:

```text
b4fc6ad standardize case study content model
```

Do not rebuild a new Studio from scratch. Use the existing folder because it contains the actual
schemas, localization rules, project connection, content workflows, and deployment identity.

## Getting access

### Sanity account

1. Open the local or hosted Studio.
2. Select **Continue with Google** / **Connect with Gmail**.
3. Sign in with the official Hive Vault Arc Google Workspace account—the company-managed address
   ending in `@hivevaultarc.com`.
4. If the project is not visible, ask the current Sanity project administrator to add that Google
   account as a member of project `0zprc9fo` with the appropriate role.

Use the company-managed Google account, not a personal Gmail account. The exact email address and
recovery details should live in the company password manager, not in this Git repository.

Ordinary Studio use does not require placing a password or API token in the project files. Sanity
stores the signed-in session for the local user. Never commit Sanity tokens, Google credentials,
webhook secrets, or `.env` contents.

To change the locally authenticated Sanity account:

```powershell
npx sanity logout
npx sanity login
```

Choose Google when the login page opens.

## Downloading and installing the Studio locally

### Prerequisites

- Git, if the Studio is supplied through a repository;
- Node.js 20 or newer;
- npm;
- access to the Hive Vault Arc Sanity project through the company Google account.

Check the installed versions:

```powershell
node --version
npm --version
git --version
```

### Obtain the source

Use the existing `hva-website-studio` source supplied by the owner or clone its private repository
after a remote has been configured. Keep it beside the frontend folder:

```text
hva-website/
├── Hva-website-front/
└── hva-website-studio/
```

### Install dependencies

Open PowerShell in the Studio folder:

```powershell
cd 'C:\path\to\hva-website\hva-website-studio'
npm ci
```

Use `npm ci` for a clean installation based on `package-lock.json`. Do not run
`npm create sanity@latest`; the Studio already exists.

## Running the Studio locally

From `hva-website-studio`:

```powershell
npm run dev
```

Sanity normally opens automatically. If it does not, visit:

```text
http://localhost:3333
```

Sign in through Google with the Hive Vault Arc workspace account.

Stop the local Studio with `Ctrl+C` in the terminal.

The hosted Studio at [hva.sanity.studio](https://hva.sanity.studio/) is useful for routine editing
when no local schema development is needed. Local Studio is required when developing or validating
schema and workflow changes.

### Optional local website preview

To preview Studio drafts against a local frontend, run the two applications in separate terminals.

Terminal 1:

```powershell
cd 'C:\path\to\hva-website\Hva-website-front'
npm ci
npm run dev
```

Terminal 2:

```powershell
cd 'C:\path\to\hva-website\hva-website-studio'
$env:SANITY_STUDIO_WEBSITE_URL='http://localhost:3000'
npm run dev
```

The frontend needs its existing `SANITY_PREVIEW_TOKEN` configuration for Draft Mode. Never copy
that token into this document or commit it.

## How the Studio is organized

The **Structure** area is the main content workspace.

| Studio section              | What it manages                                                   |
| --------------------------- | ----------------------------------------------------------------- |
| Capabilities                | Consulting and delivery capability pages                          |
| Industries                  | Shared visitor-facing industry taxonomy and filters               |
| People                      | Co-founders, employees, advisors, bios, experience, and portraits |
| Insights → Blogs            | Blog posts                                                        |
| Insights → News Articles    | News and company articles                                         |
| Insights → Perspectives     | Editorial viewpoints and perspectives                             |
| Insights → Research Reports | Long-form reports and research content                            |
| Insights → Case Studies     | Client work, evidence, screenshots, testimonials, and metrics     |

Pictures and testimonials are not separate top-level pages. They are structured fields inside the
document that owns them:

- capability hero pictures belong to a capability;
- employee portraits belong to a person;
- insight covers belong to that insight document;
- client logos, project screenshots, testimonials, and evidence belong to a case study.

The Studio also includes:

- **Presentation** for previewing supported documents on the website;
- **Vision** for developer-only GROQ query inspection;
- **Releases**, when Sanity release functionality is used for coordinated publishing.

Editors should normally work in **Structure**.

## Understanding schemas

A schema defines the fields, validation, previews, and editorial rules for a content type. The
schema code is in:

```text
hva-website-studio/schemaTypes/
├── documents/       # top-level content records
├── objects/         # reusable nested content
├── localization.ts  # English/French publishing rules
├── webpValidation.ts
└── index.ts
```

Current document schemas:

| Schema            | Public purpose                                           |
| ----------------- | -------------------------------------------------------- |
| `capability`      | Capability profiles and capability-page content          |
| `industry`        | Industry names used by filters and content relationships |
| `employeeProfile` | People and founder profiles                              |
| `post`            | Blog posts                                               |
| `newsArticle`     | News articles                                            |
| `perspective`     | Perspectives                                             |
| `researchReport`  | Research reports                                         |
| `caseStudy`       | Case studies and all supporting evidence                 |

Reusable object schemas include SEO, source links, authors, FAQs, headings, paragraphs, lists,
pullquotes, stat blocks, testimonials, client evidence, project media, case-study metrics, and
approved outcomes.

Changing a schema changes the editing interface and content contract. It does not automatically
change the frontend. A new public field usually requires all of the following:

1. update the Studio schema;
2. validate old documents and migration requirements;
3. update the frontend GROQ projection;
4. update frontend normalization/types;
5. render the field in the appropriate page/component;
6. add or update tests;
7. build and deploy the Studio;
8. build and deploy the frontend if its code changed.

## Understanding English and French

The CMS uses **document-level localization**. English and French are separate documents linked as
translations. This allows the two languages to be reviewed and published independently.

Localized schemas:

- capabilities;
- industries;
- people;
- blog posts;
- news articles;
- perspectives;
- research reports;
- case studies.

### Two different statuses

Do not confuse these two concepts:

1. **Sanity document state** — Draft or Published, shown by Sanity at the top of the document.
2. **Translation Status** — Draft, In review, or Approved, stored inside the document.

The public website only shows a localized CMS document when it is both:

- published in Sanity; and
- marked **Approved** in Translation Status.

A French record can therefore exist in Studio but remain invisible publicly because it is still a
draft, is not approved, or has not been published.

### Creating a French version

1. Open the approved English document.
2. Use the **Translations** action in the document header.
3. Create or open the French translation.
4. Translate every visitor-facing field. A newly created French document can initially contain
   copied English values; that copy is a starting point, not a completed translation.
5. Translate image alt text, captions, disclosures, SEO title, SEO description, summaries, and all
   structured article sections—not only the visible title.
6. Set Translation Status to **In review** while it is being checked.
7. After review, set Translation Status to **Approved**.
8. Publish the French document.
9. Open the French production URL and verify it.

Do not manually create an unrelated French record when a translation link should exist. Always use
the Translations workflow so metadata connects both versions.

### Required translated fields

The schema prevents approval when important localized fields are missing. Depending on document
type, this includes the title, slug, summary/excerpt, body sections, alt text, SEO title, SEO
description, case-study problem/solution, capability narrative, or person profile copy.

### Slugs and routes

Slugs must use lowercase letters, numbers, and hyphens. Slug uniqueness is checked per language.
Follow the pattern used by existing records and verify the generated public URL before publishing.

English routes are unprefixed. French routes begin with `/fr` and use localized route names where
configured. Examples:

| Content         | English                             | French                                          |
| --------------- | ----------------------------------- | ----------------------------------------------- |
| Capability      | `/capabilities/[slug]`              | `/fr/expertises/[slug]`                         |
| Person          | `/aboutus/our-people/[slug]`        | `/fr/qui-sommes-nous/equipe/[slug]`             |
| Case study      | `/case-studies/[slug]`              | `/fr/etudes-de-cas/[slug]`                      |
| Blog            | `/blog/[slug]`                      | `/fr/blog/[slug]`                               |
| News            | `/insights/news-articles/[slug]`    | `/fr/publications/actualites/[slug]`            |
| Perspective     | `/insights/perspectives/[slug]`     | `/fr/publications/perspectives/[slug]`          |
| Research report | `/insights/research-reports/[slug]` | `/fr/publications/rapports-de-recherche/[slug]` |

## Everyday publishing workflow

### Edit existing content

1. Open **Structure**.
2. Choose the content type.
3. Confirm that you opened the correct language version.
4. Make the change.
5. Check validation messages.
6. Use **Presentation** or the production link to review the result where appropriate.
7. Keep Translation Status at **In review** until editorial review is complete.
8. Set it to **Approved** only when the localized content is ready.
9. Click **Publish**.
10. Verify the public page in both languages if shared content or relationships changed.

### Create new content

1. Create the English document from its correct Studio list.
2. Complete every required field, including SEO and image alt text.
3. Use a relevant shared Industry reference where applicable.
4. Review the document and publish the approved English version.
5. Create the French version through **Translations**.
6. Translate, review, approve, and publish French independently.
7. Confirm that both documents are linked and both public URLs work.

### Unpublish, withdraw, and delete

- Prefer **Unpublish** when content should temporarily disappear.
- Use a field's **Withdrawn** state when permission for media, evidence, or a metric has been revoked.
- Do not delete translation metadata casually; it connects English and French documents.
- Do not delete shared assets just because one document no longer uses them.
- Before deleting a Sanity asset, verify that no document references it.
- For client evidence, remove public assets when permission is revoked and the retention decision has
  been approved internally.

Deleting content and assets is harder to recover than unpublishing. If unsure, stop and ask the
owner.

## Content-type guidance

### Capabilities

Capabilities contain the public title, slug, short title, kicker, brief copy, strategic context,
execution context, sub-capabilities, outcomes, landing links, hero image and alt text, related
capabilities, display order, page visibility, and SEO.

Use **Display Order** to control ordering. Keep English and French narrative copy genuinely
localized. Do not replace an image without checking its alt text in both languages.

### Industries

Industries are shared taxonomy documents used by filters and Insight relationships. Assign the
reference rather than typing an industry name into an old deprecated text field.

English and French industry documents share the same conceptual identity through translation
metadata. Keep filter titles concise and display order consistent.

### People

People records contain the person's name, slug, role, responsibility tag, profile type, summary,
story, portrait, image alt text, experience, education, expertise, LinkedIn URL, display order,
About-page feature state, visibility, and SEO.

Only upload portraits cleared for publication. Use **Hidden** when a profile should not appear
publicly without deleting its history.

### Insights

Blog posts, news articles, perspectives, and research reports share a structured editorial model:

- title and slug;
- subtitle and summary/excerpt;
- category/tag and keywords;
- publication date and reading time;
- authors;
- cover image and localized alt text;
- sources;
- structured sections;
- FAQs where supported;
- SEO metadata;
- optional Industry reference.

Use sources for factual claims. Keep cover images relevant and optimized. Do not paste an entire
article into the summary field; summaries should work as collection-card copy.

### Case studies

Case studies contain more publication controls because they can include client evidence and
performance claims.

Core fields:

- client and localized title;
- Industry reference;
- engagement type;
- summary;
- business problem;
- system architecture, rendered publicly as **Solution delivered**;
- operational modules;
- integrations;
- deployment status;
- cover image, client logo, alt text, and website;
- optional ordered project media;
- optional approved headline metrics or outcomes;
- optional approved client evidence/testimonial;
- last-updated date and SEO.

Engagement types:

| Type                                  | Use when                                                      |
| ------------------------------------- | ------------------------------------------------------------- |
| Custom software or digital product    | HVA delivered a software system or product                    |
| Advisory or transformation program    | The work was primarily diagnosis, strategy, or transformation |
| Managed operations or service         | HVA operates or supports an ongoing service                   |
| Hybrid advisory and software delivery | The engagement includes both advisory and software delivery   |

Modules and integrations are required for custom-software and hybrid records. They can be omitted
for advisory or managed-service work when they are not applicable. Project screenshots are always
optional; the frontend removes the entire media stage when none exist.

## Images and project media

### WebP requirement

All Sanity image fields enforce WebP. Convert JPG, PNG, or other raster sources to WebP before
uploading. Keep the source master in the approved company asset archive.

Every public image needs meaningful alt text in the language of its document. Do not reuse English
alt text in French.

### Project screenshots

Each case-study project-media record includes:

- an internal editor label;
- a WebP image;
- device type: desktop/wide or phone;
- narrative placement;
- evidence type;
- localized alt text;
- caption and disclosure;
- publication status;
- permission date and internal approval reference when approved.

Only **Approved** media appears publicly. **Not cleared** media is available only in authenticated
draft review; **Withdrawn** media is excluded.

Phone screenshots are grouped after activated modules by the shared frontend template. Wide
screens support the business-challenge or solution chapter according to their placement. Preserve
the intrinsic image ratio; do not upload manually cropped screenshots just to force a layout.

Sanity image assets are publicly addressable if someone has their CDN URL. Upload only material
that is permitted to exist in the project, even when its publication status is Not cleared.

## Testimonials and client evidence

Client evidence is optional and appears only when its publication status is **Approved**.

It can include:

- a final PDF reference letter;
- an optional WebP testimonial image;
- an exact quote excerpt;
- the original document language;
- signatory name and role;
- issue date;
- permission-confirmation date;
- optional homepage priority.

Rules:

- Obtain written permission before approval.
- Use the exact quote from the source; do not rewrite or translate it as if it were the original.
- Record the original language using a code such as `en`, `fr`, `ar`, or `fr-MA`.
- PDFs must be publication-ready and no larger than 3 MB; optimize files above 1.5 MB.
- Do not paste confidential correspondence into permission-reference fields.
- If permission is withdrawn, mark the evidence Withdrawn and follow the approved asset-removal
  process.

ImmoWorld currently uses an approved PDF testimonial. The former JPEG testimonial is not the public
source of truth.

## Case-study metrics and performance claims

Headline metrics support numbers, percentages, ranges, multipliers, and durations. Every metric has
a label, context, evidence basis, publication status, and internal source reference.

Evidence bases:

- **System scope fact** — a count or fact describing what exists, such as modules or integrations;
- **Verified case-study result** — an approved measured result for this client;
- **Published benchmark** — a clearly identified external or approved benchmark.

Do not invent results, percentages, ROI, revenue, client counts, or performance improvements.
Verified results and benchmarks require an approval date and permission reference. Only Approved
metrics appear publicly. Leave the array empty to remove the metrics section without empty space.

## SEO, sources, and structured sections

### SEO

Complete the SEO title and description for each language. SEO copy should be accurate, concise, and
specific to the document. Do not copy English metadata into French.

### Sources

Use source links for factual, regulatory, research, and benchmark claims. Prefer primary sources.
Do not cite a search-results page when a direct source is available.

### Structured article sections

Insight documents use structured section objects such as paragraphs, headings, subheadings,
pullquotes, stat blocks, lists, and FAQs. Keep section order intentional. Preview long articles to
check heading hierarchy, list formatting, and mobile rhythm before publishing.

## Preview, publishing, and frontend updates

The Studio's Presentation tool connects to the website's Draft Mode endpoint. Preview uses a
private token and bypasses public CDN caching so drafts can be reviewed.

Public content reads use Sanity's CDN and Next.js cache tags. A configured Sanity webhook calls:

```text
/api/revalidate/sanity
```

This refreshes affected content after publishing. In normal operation, a content-only update does
not require rebuilding the frontend.

If a published change is not visible:

1. confirm the correct language document is open;
2. confirm Translation Status is Approved;
3. confirm the document is Published, not only saved as a draft;
4. confirm its slug and required references;
5. for media, evidence, or metrics, confirm their nested Publication Status is Approved;
6. hard-refresh the public page;
7. verify the Sanity revalidation webhook and deployment environment if the issue continues.

The frontend intentionally has local fallback content for some public routes when Sanity is
temporarily unreachable. A warning such as `using local fallback content` indicates a recoverable
network problem, not permission to overwrite or delete CMS records.

## Safe developer commands

Run these inside `hva-website-studio`.

### Everyday local development

```powershell
npm ci
npm run dev
npm run lint
npm run format:check
npm run build
```

`npm run build` validates that the Studio can compile. It does not deploy it.

### Read-only audits and verification

```powershell
npm run localization:verify
npm run localization:audit-fr
npm run drafts:audit
npm run industries:migrate:dry-run
npm run upload:case-study-media:dry-run
npm run attach:immoworld-testimonial:dry-run
npm run publish:case-study-headline-metrics:dry-run
```

Dry-run output must be reviewed before any write command.

### Production-affecting commands

The following categories require explicit authorization, a backup or rollback plan where
appropriate, and post-run verification:

- `npm run deploy` — deploys the Studio/schema interface;
- commands ending in `:apply`;
- import commands;
- upsert commands without `:dry-run`;
- attach or upload commands without `:dry-run`;
- migration commands without `:dry-run`;
- publish/remove/resolve commands that do not say `:dry-run`;
- direct `sanity exec ... --with-user-token` write scripts.

Never assume a command is safe because it starts with `npm run`. Read its definition in
`hva-website-studio/package.json` and inspect the script first.

## Deploying Studio schema changes

Routine content publishing does not require a Studio deployment. Deploy only when schema,
structure, plugins, Preview configuration, or Studio behavior changed.

Before deployment:

```powershell
cd 'C:\path\to\hva-website\hva-website-studio'
git status --short --branch
npm run lint
npm run format:check
npm run build
```

Then, only with authorization:

```powershell
npm run deploy
npx sanity schema list
```

The hosted target is:

```text
https://hva.sanity.studio/
```

The Studio uses Sanity auto-updates. A local/runtime Sanity version advisory can appear during a
build; treat it as informational when lint and `sanity build` pass, but read actual errors rather
than ignoring them.

After deploying:

1. open the hosted Studio;
2. sign in with the company Google account;
3. open every changed document type;
4. confirm fields, validation, translations, and previews;
5. verify affected public pages;
6. commit and push the Studio source to its configured remote.

At present, step 6 is blocked until a Studio Git remote is configured.

## Frontend integration map

Important frontend files:

```text
Hva-website-front/src/sanity/
├── env.ts
├── lib/client.ts
├── lib/fetch.ts
├── lib/image.ts
└── queries/
    ├── capabilities.ts
    ├── insights.ts
    └── people.ts
```

Related application code:

```text
src/lib/                         # normalization, DTOs, fallbacks, domain helpers
src/views/                       # public page compositions
src/app/[locale]/                # localized routes and metadata
src/app/api/draft-mode/          # authenticated preview
src/app/api/revalidate/sanity/   # signed Sanity webhook revalidation
messages/en.json                 # static English interface copy
messages/fr.json                 # static French interface copy
```

CMS editorial copy belongs in Sanity. Static navigation, buttons, and shared page-interface copy
belong in `messages/en.json` and `messages/fr.json`. Do not move CMS-owned project content into a
React component to work around an incomplete document.

Default frontend Sanity settings are:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=0zprc9fo
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-01
```

Private environment variables used by preview and revalidation include
`SANITY_PREVIEW_TOKEN` and `SANITY_REVALIDATE_SECRET`. Never expose them in client code or commit
their values.

## Troubleshooting

### The Studio does not open on port 3333

Check whether another process is using the port:

```powershell
Get-NetTCPConnection -LocalPort 3333 -State Listen -ErrorAction SilentlyContinue
```

Stop the previous Studio terminal with `Ctrl+C`, or stop the verified process only after confirming
its identity.

### Google login succeeds but the project is unavailable

- Confirm the correct company Google account was selected.
- Ask a Sanity project administrator to verify membership and role in project `0zprc9fo`.
- Log out of Sanity and log in again after access is granted.

### French content shows English or does not appear

- Confirm the French translation is linked through Translations.
- Replace copied English values with real French copy.
- Translate SEO, alt text, captions, disclosures, and structured sections.
- Set Translation Status to Approved.
- Publish the French document.
- Verify the French slug and route.

### An image is rejected

The schema accepts WebP images only. Convert the file to WebP, then upload it again. For client
reference letters, upload a PDF through the testimonial PDF field rather than an image field.

### A case-study screenshot, testimonial, or number does not appear

Check both the parent case study and the nested item:

- correct locale;
- Translation Status Approved;
- document Published;
- nested Publication Status Approved;
- permission date/reference completed where required;
- image is WebP or letter is a valid PDF;
- required caption, disclosure, source, and alt text are present.

### The public site logs a Sanity timeout

The frontend has bounded requests and local fallback content for recoverable outages. Confirm
internet/DNS access and Sanity service health, then retry. Do not mutate content to solve a network
timeout.

### Draft preview reports that it is not configured

The frontend environment is missing `SANITY_PREVIEW_TOKEN`. Restore it through the approved secret
manager or deployment environment. Never place the token in source control.

## Handover checklist

- [ ] Co-founder has the complete `hva-website-studio` source.
- [ ] Studio source has a private Git remote and backup strategy.
- [ ] Company Google account is a member of Sanity project `0zprc9fo`.
- [ ] Co-founder can open [hva.sanity.studio](https://hva.sanity.studio/).
- [ ] Co-founder can run Studio locally at `http://localhost:3333`.
- [ ] Co-founder understands Draft/Published versus Translation Status.
- [ ] Co-founder can create and link a French translation.
- [ ] Co-founder can preview, approve, publish, and verify content.
- [ ] Co-founder understands WebP, alt text, and client-permission requirements.
- [ ] Co-founder knows that metrics and testimonials require evidence and approval.
- [ ] Preview token, webhook secret, Google access, and recovery details are stored privately.
- [ ] Production-writing scripts are restricted to reviewed, authorized operations.

## Official references

- [Sanity Studio introduction](https://www.sanity.io/docs/studio)
- [Developing Studio locally](https://www.sanity.io/docs/studio/development)
- [Schemas and forms](https://www.sanity.io/docs/studio/schemas-and-forms)
- [Document internationalization](https://www.sanity.io/plugins/document-internationalization)
- [GROQ](https://www.sanity.io/docs/groq)
- [Images](https://www.sanity.io/docs/studio/image-type)
- [Studio deployment](https://www.sanity.io/docs/studio/deployment)
- [Sanity project management](https://www.sanity.io/manage)
