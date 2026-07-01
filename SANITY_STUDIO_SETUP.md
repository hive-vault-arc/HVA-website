# HVA Website Studio Setup Notes

Verified on: 2026-07-01

This file documents the current Sanity Studio setup for the HVA website and collects the official Sanity resources needed to finish the Insights content model.

## Current Studio Status

The Studio folder is:

```text
hva-website-studio
```

It is a standalone Sanity Studio, separate from the Next.js frontend. This matches the recommended setup for a website where the Studio is managed as its own app.

Current package versions checked from npm on 2026-07-01:

```text
sanity: 6.3.0
@sanity/vision: 6.3.0
@sanity/eslint-config-studio: 6.0.0
```

The local `package.json` already uses:

```json
"sanity": "^6.3.0",
"@sanity/vision": "^6.3.0"
```

That means the Studio is already on the latest Sanity Studio package version available at the time of this check.

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

- Structure Tool is available for editing documents once schemas exist.
- Vision Tool is available for testing GROQ queries against the dataset.

## Current Schema Status

The Studio currently has no registered schema types:

```ts
export const schemaTypes = []
```

This means the Studio can run and build, but editors cannot create HVA Insights documents yet.

The next required step is to create schema files inside:

```text
schemaTypes/
```

Then import and register them in:

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

## HVA Insights Content Sources In The Frontend

The frontend already has strong static content structures. These should guide the Studio schemas.

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

The website currently reads these static arrays directly. It is not yet connected to Sanity with GROQ or a Sanity client.

## Recommended HVA Schema Plan

Minimum document schemas for Insights:

```text
post
newsArticle
perspective
caseStudy
researchReport
author
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

Recommended content fields shared across article-like documents:

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

For the fastest migration from the current website, use a structured `sections` array first. Portable Text can be introduced later if the editing experience needs more flexibility.

## Website Integration Checklist

After schemas exist, the Next.js frontend still needs the integration layer.

Required frontend work:

```text
Install next-sanity or @sanity/client.
Create a Sanity client config using projectId 0zprc9fo and dataset production.
Create GROQ queries for each content type.
Replace static helpers such as getAllPosts() with Sanity-backed fetch functions.
Update generateStaticParams() for dynamic routes.
Update metadata generation to fetch Sanity content.
Add cdn.sanity.io to next.config.ts images.remotePatterns if using Sanity images with next/image.
Set CORS origins for localhost and production website domains in Sanity Manage.
```

Routes that currently depend on static insight data:

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
/sitemap.xml
/ai/company
/
```

## Recommended Order Of Work

1. Create schemas in `schemaTypes/`.
2. Register schemas in `schemaTypes/index.ts`.
3. Run `npm run dev` and confirm document types appear in Studio.
4. Create or import the existing static content.
5. Add Sanity client and GROQ queries to the Next.js frontend.
6. Replace static content readers route by route.
7. Add CORS origins in Sanity Manage.
8. Deploy Studio with `npm run deploy`.
9. Deploy the frontend after confirming Sanity data renders.

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

The Studio is installed, connected, current, and buildable.

It is not ready for HVA editors yet because no schemas are registered. Once the schemas above are created and registered, the Studio will become usable for authoring the Insights content.
