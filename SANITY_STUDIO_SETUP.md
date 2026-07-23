# HVA Website Studio Setup Notes

Verified on: 2026-07-10

This file documents the current Sanity Studio setup, content model, import workflow, and frontend integration for the HVA website.

## Current Studio Status

The Studio folder is:

```text
hva-website-studio
```

It is a standalone Sanity Studio, separate from the Next.js frontend. This matches the recommended setup for a website where the Studio is managed as its own app.

Current package versions checked from npm on 2026-07-10:

```text
sanity: 6.4.0
@sanity/vision: 6.4.0
@sanity/eslint-config-studio: 6.0.0
```

The local `package.json` already uses:

```json
"sanity": "^6.4.0",
"@sanity/vision": "^6.4.0"
```

The local packages match the auto-update runtime used by the deployed Studio.

Local Node version checked:

```text
v24.13.1
```

Sanity Studio v4 or later requires Node 20+, so the local environment is compatible.

## Current Project Connection

The Studio is connected to this Sanity project:

```text
projectId: 0zprc9fo
dataset: production
studio title: HVA-website-studio
```

This is configured in:

```text
sanity.config.ts
sanity.cli.ts
```

The Studio currently enables:

```ts
plugins: [structureTool(), visionTool()]
```

This means:

- Structure Tool uses the custom `Capabilities`, `People`, and `Insights` desk organization.
- Vision Tool is available for testing GROQ queries against the dataset.

## Current Schema Status

The Studio registers these document types:

```text
capability
employeeProfile
post
newsArticle
perspective
researchReport
caseStudy
```

Shared object types cover authors, SEO, sources, FAQs, metrics, testimonials, and the structured article-section model used by the frontend.

Schemas are organized inside:

```text
schemaTypes/
```

Document and object schemas are registered through:

```text
schemaTypes/index.ts
```

## Setup Commands

The Studio already exists, so do not run the create command unless rebuilding the Studio from scratch.

Official create command pattern:

```sh
npm create sanity@latest -- --dataset production --template clean --typescript --output-path studio-hello-world
cd studio-hello-world
```

For this actual project, the equivalent existing folder is:

```sh
cd "C:\Users\khali\Desktop\HVA\01 - COMPANY\ADMIN\hva-website\hva-website-studio"
```

Run the Studio locally:

```sh
npm run dev
```

Open:

```text
http://localhost:3333
```

Build the Studio:

```sh
npm run build
```

Deploy the hosted Studio:

```sh
npm run deploy
```

The first deploy asks for a hostname. That hostname creates a hosted URL like:

```text
your-hostname.sanity.studio
```

## Current Build Result

The Studio build was tested successfully.

Build warning observed:

```text
No appId configured. This studio will auto-update to the latest channel.
```

This is not a blocker. Because `autoUpdates: true` is enabled in `sanity.cli.ts`, Sanity can keep the deployed Studio on the latest channel. If finer version control is needed later, configure an `appId` in Sanity Manage and add it to the deployment config.

## Basic Schema Example From Sanity

Sanity schemas should use `defineType`, `defineField`, and, for array members, `defineArrayMember`.

A simple example document type:

```ts
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
```

Register it:

```ts
import {postType} from './postType'

export const schemaTypes = [postType]
```

For HVA, this simple example is only a starting reference. The actual Insights model needs to match the existing frontend content types.

## HVA Content Sources In The Frontend

The frontend keeps typed fallback content for resilience while treating published Sanity documents as the primary source.

Frontend folder:

```text
..\Hva-website-front
```

Main content files:

```text
src/lib/blog.ts
src/lib/insights.ts
src/lib/perspectives.ts
src/lib/proof.ts
src/lib/content-dto.ts
```

Current static content groups:

```text
Blog posts: src/lib/blog.ts
News articles: src/lib/insights.ts
Perspectives: src/lib/perspectives.ts
Case studies: src/lib/proof.ts
Research report cards: src/lib/insights.ts
```

The website is connected to Sanity through projected GROQ queries, normalized image helpers, tagged revalidation, static generation, and typed fallback datasets.

## Current HVA Schema Model

Registered editorial and company document schemas:

```text
capability
employeeProfile
post
newsArticle
perspective
caseStudy
researchReport
```

Reusable object schemas:

```text
sourceLink
statItem
faqItem
articleSection
caseStudyMetric
testimonial
seo
```

Content fields shared across article-like documents:

```text
title
slug
subtitle
summary or excerpt
publishedAt
readTime
authors
category or tag
tags or keywords
coverImage
coverAlt
sources
sections
seo
```

The current frontend section model supports these block types:

```text
paragraph
heading
subheading
pullquote
stat-block
list
faq
```

In Sanity, this can be modeled either as:

- Portable Text with custom blocks, better for rich editing.
- A structured `sections` array with explicit object types, closer to the existing frontend code.

The current implementation uses a structured `sections` array to preserve the frontend content contract. Portable Text can be introduced later through a migration if editors need more free-form composition.

## Website Integration Checklist

The Next.js integration is complete for Insights, Case Studies, Capabilities, and People.

Implemented integration:

```text
Sanity client configuration for project 0zprc9fo and the production dataset.
Projected GROQ queries for every registered public document type.
Sanity-backed content helpers with typed local fallbacks.
generateStaticParams and dynamic metadata for document routes.
cdn.sanity.io in Next.js image remote patterns.
Tag-based revalidation through /api/revalidate/sanity.
CORS origins for localhost, production domains, and Vercel previews.
```

Routes backed by Sanity content helpers:

```text
/blog
/blog/[slug]
/insights
/insights/news-articles
/insights/news-articles/[slug]
/insights/perspectives
/insights/perspectives/[slug]
/insights/research-reports
/case-studies
/case-studies/[slug]
/aboutus
/aboutus/our-people/[employee]
/sitemap.xml
/ai/company
/
```

## Recommended Order Of Work

1. Update schemas with backward-compatible fields and validation.
2. Run `npm run build` in the Studio.
3. Import or edit content and verify document previews.
4. Run frontend lint, tests, and production build.
5. Verify changed routes against published and fallback content.
6. Deploy the Studio, then deploy the frontend when required.

## Official Sanity Resources

Current Studio setup:

- [Setting up your studio](https://www.sanity.io/docs/sanity-studio-quickstart)
- [Installation](https://www.sanity.io/docs/studio/installation)
- [Studio development](https://www.sanity.io/docs/studio/development)
- [Hosting and deployment](https://www.sanity.io/docs/studio/deployment)

Schema modeling:

- [Schema](https://www.sanity.io/docs/studio/schema-types)
- [Schemas and forms](https://www.sanity.io/docs/studio/schemas-and-forms)
- [Array type](https://www.sanity.io/docs/studio/array-type)
- [Block type and Portable Text](https://www.sanity.io/docs/studio/block-type)
- [Slug type](https://www.sanity.io/docs/studio/slug-type)
- [Image type](https://www.sanity.io/docs/studio/image-type)
- [List previews](https://www.sanity.io/docs/studio/previews-list-views)

CLI and deployment:

- [Init CLI command reference](https://www.sanity.io/docs/cli-reference/init)
- [CLI configuration](https://www.sanity.io/docs/apis-and-sdks/cli-config)
- [Latest version of Sanity Studio and auto-updates](https://www.sanity.io/docs/studio/latest-version-of-sanity)

TypeScript and frontend integration:

- [Using TypeScript in Sanity Studio](https://www.sanity.io/docs/studio/using-typescript-in-sanity-studio)
- [Sanity TypeGen](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen)
- [GROQ query language](https://www.sanity.io/docs/groq)
- [Next.js integration guide](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js)

Package/version references:

- [sanity on npm](https://www.npmjs.com/package/sanity)
- [@sanity/vision on npm](https://www.npmjs.com/package/@sanity/vision)

## Final Readiness Note

The Studio is installed, connected, schema-complete for the current public content surface, and buildable. Editors can manage Capabilities, People, Blogs, News Articles, Perspectives, Research Reports, and Case Studies from the custom desk structure.
