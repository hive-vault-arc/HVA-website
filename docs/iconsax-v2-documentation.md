# Iconsax V2 documentation

> Consolidated implementation reference for the HVA Next.js frontend. This guide summarizes the current official Iconsax documentation instead of reproducing it verbatim.

## Document status

| Item | Value |
| --- | --- |
| Product documentation | Iconsax V2 |
| Current npm package | `iconsax@0.1.1` |
| npm release date | July 14, 2026 |
| Documentation reviewed | July 20, 2026 |
| HVA frontend | Next.js 16, React 19, TypeScript |
| Recommended integration | Native `<iconsax-icon>` custom element |

The current official npm package is `iconsax`. Do not confuse it with the older, framework-specific `iconsax-react` package, whose last published version is `0.0.8` and whose API is different.

Official starting points:

- [Iconsax website](https://iconsax.io/)
- [Iconsax V2 documentation](https://docs.iconsax.io/docs/intro)
- [Official npm/web-component guide](https://docs.iconsax.io/npm/web-component)
- [Iconsax icon browser](https://app.iconsax.io/)
- [Official npm package](https://www.npmjs.com/package/iconsax)

## Contents

1. [What Iconsax V2 provides](#what-iconsax-v2-provides)
2. [Library structure and visual styles](#library-structure-and-visual-styles)
3. [Web platform workflow](#web-platform-workflow)
4. [Install the npm package](#install-the-npm-package)
5. [`<iconsax-icon>` API](#iconsax-icon-api)
6. [Next.js 16 and React 19 integration](#nextjs-16-and-react-19-integration)
7. [Other framework examples](#other-framework-examples)
8. [Pro icons and CLI workflow](#pro-icons-and-cli-workflow)
9. [Design files, exports, and Figma](#design-files-exports-and-figma)
10. [Iconsax MCP integration](#iconsax-mcp-integration)
11. [AI-generated and animated icons](#ai-generated-and-animated-icons)
12. [Accessibility and UX standards](#accessibility-and-ux-standards)
13. [Performance, SSR, and security](#performance-ssr-and-security)
14. [License summary](#license-summary)
15. [Troubleshooting](#troubleshooting)
16. [Migration from older Iconsax React packages](#migration-from-older-iconsax-react-packages)
17. [Project conventions for HVA](#project-conventions-for-hva)
18. [Official source index](#official-source-index)

## What Iconsax V2 provides

Iconsax V2 is an icon ecosystem rather than only an SVG download pack. The official documentation describes:

- A large static icon catalog with free and Premium content.
- Six visual styles and two line-ending families.
- A 24-by-24-pixel design grid.
- An official web platform for search, selection, customization, and export.
- A Figma plugin.
- SVG, PNG, WebP, font, and framework-code exports.
- Premium animated icons in Lottie JSON and GIF formats.
- An AI icon generator based on paid credits.
- A native web-component npm package.
- A remote MCP endpoint for AI coding tools.

Catalog counts are approximate and change as Iconsax expands. The V2 feature documentation currently describes more than 40,000 total static variations, roughly 6,000 free variations, more than 34,000 Premium variations, and more than 1,000 animated icons. The npm package is narrower: its current description promises more than 1,200 free icons bundled for the web component.

## Library structure and visual styles

### Base grid

Icons are designed on a `24 × 24` grid. Use `24px` as the default UI size unless the surrounding component requires another optical size.

### Styles

The web-component `type` attribute accepts six lowercase values:

| Type | Intended character |
| --- | --- |
| `linear` | Light, neutral line icon; official default |
| `outline` | Stronger outlined form |
| `twotone` | Two-level color or opacity treatment |
| `bulk` | Layered, filled treatment |
| `broken` | Interrupted-line treatment |
| `bold` | Solid, high-emphasis treatment |

The broader Iconsax library also groups icons into straight and rounded terminations. Availability depends on the selected icon and export source.

### Choosing a style

- Use one primary style within a single interface region.
- Use `linear` or `outline` for normal navigation and secondary actions.
- Use `bold` sparingly for selected or high-priority states.
- Use `bulk` or `twotone` for larger editorial illustrations, not dense controls.
- Do not communicate state by style or color alone; preserve a text or semantic state.
- Preview icons at their real rendered size because equal numeric sizes do not always have equal optical weight.

## Web platform workflow

The official platform is available at [app.iconsax.io](https://app.iconsax.io/).

### Find and filter

The platform supports keyword search and filtering by attributes such as category, static or animated content, plan, style, and line termination. Search terms and the exact set of filters may evolve over time.

### Select icons

The right-side workspace stores the active selection. Iconsax calls its drag-across selection interaction **Slide-Select**:

1. Hold the primary mouse button in the icon gallery.
2. Move across icons to add or remove them from the selection.
3. Release to keep the resulting selection.
4. Edit or clear the selection in the workspace panel.

### Customize

The customization panel supports properties such as:

- Icon color.
- Size.
- Stroke weight, where supported.
- Style or variant.
- Export format.

Group configuration can apply compatible settings to an entire selection.

### Projects

Premium users can save selections as reusable projects. The official getting-started guide currently states a maximum of 20 projects. Projects can be reopened, customized, and downloaded; platform download limits still apply.

### Export

The web platform can export individual icons or custom packs in formats that include:

- SVG.
- PNG.
- WebP.
- Font packages with WOFF, WOFF2, TTF, and generated CSS.
- Framework or platform code for React, Vue, Svelte, Flutter, JavaScript/TypeScript, and web components.

For this frontend, prefer the `iconsax` web component or optimized SVG. Avoid bitmap exports for ordinary interface icons.

## Install the npm package

Install the official package:

```bash
npm install iconsax
```

Register the custom element once:

```ts
import "iconsax";
```

The import defines `<iconsax-icon>` in the browser. Do not import the package repeatedly in every icon consumer.

### Basic free icon

```html
<iconsax-icon
  name="home"
  type="linear"
  size="24"
  color="currentColor"
></iconsax-icon>
```

Free icons do not require an API key. The official npm documentation says free icon data resolves from package-owned data chunks rather than from an Iconsax account or subscription API at runtime.

## `<iconsax-icon>` API

### Attributes

| Attribute | Required | Accepted value | Default | Purpose |
| --- | --- | --- | --- | --- |
| `name` | Yes | Icon name | None | Selects the icon |
| `type` | No | `bold`, `broken`, `bulk`, `linear`, `outline`, `twotone` | `linear` | Selects the visual style |
| `size` | No | Pixel number or numeric string | `24` | Sets the rendered size |
| `color` | No | Any valid CSS color | `currentColor` | Sets the icon color |
| `pro` | No | Boolean attribute | Absent | Resolves the name from the registered Pro catalog |

Attributes are reactive. Updating an attribute after mount causes the icon to render again.

```ts
const icon = document.querySelector("iconsax-icon");

icon?.setAttribute("color", "#CD9F40");
icon?.setAttribute("type", "bold");
icon?.setAttribute("size", "28");
```

### Inherit color from CSS

Prefer `currentColor` for icons that should follow their parent:

```tsx
<button className="text-[#0B1B46] hover:text-[#CD9F40]">
  <iconsax-icon
    name="arrow-right"
    type="linear"
    size="20"
    color="currentColor"
    aria-hidden="true"
  />
  <span>Continue</span>
</button>
```

### CSS baseline

```css
iconsax-icon {
  display: inline-block;
  flex: 0 0 auto;
  line-height: 0;
  vertical-align: middle;
}
```

Do not place global width and height rules on the element if the `size` attribute is expected to control sizing.

## Next.js 16 and React 19 integration

This is the recommended integration for the current HVA frontend.

### 1. Register Iconsax at one client boundary

Create a small client component:

```tsx
// src/components/icons/IconsaxRuntime.tsx
"use client";

import "iconsax";

export function IconsaxRuntime() {
  return null;
}
```

Render it once near the root layout:

```tsx
// src/app/layout.tsx
import { IconsaxRuntime } from "@/components/icons/IconsaxRuntime";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <IconsaxRuntime />
        {children}
      </body>
    </html>
  );
}
```

The official package documentation says SSR and static builds are supported. If a particular bundler version reports `customElements is not defined`, use the dynamic-import fallback in [Troubleshooting](#custom-elements-is-not-defined).

### 2. Add TypeScript JSX support if required

React 19 can render custom elements, but TypeScript may still need a JSX declaration for the tag. Add this declaration only if the installed package does not already make the element visible to the project's JSX types:

```ts
// src/types/iconsax.d.ts
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

type IconsaxType =
  | "bold"
  | "broken"
  | "bulk"
  | "linear"
  | "outline"
  | "twotone";

interface IconsaxIconAttributes
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  name: string;
  type?: IconsaxType;
  size?: number | string;
  color?: string;
  pro?: boolean;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "iconsax-icon": IconsaxIconAttributes;
    }
  }
}

export {};
```

Ensure the declaration is inside a directory covered by `tsconfig.json`.

### 3. Use the icon

```tsx
export function BookCallIcon() {
  return (
    <iconsax-icon
      name="calendar"
      type="linear"
      size={24}
      color="currentColor"
      aria-hidden="true"
    />
  );
}
```

React 19 passes custom-element attributes and properties more predictably than previous React releases. Keep the official lowercase values for `type` even if an older React package used capitalized variants such as `Linear` or `Bulk`.

### 4. Optional typed wrapper

A wrapper centralizes HVA defaults without hiding normal web-component behavior:

```tsx
type IconsaxType =
  | "bold"
  | "broken"
  | "bulk"
  | "linear"
  | "outline"
  | "twotone";

interface IconProps {
  name: string;
  type?: IconsaxType;
  size?: number;
  className?: string;
  label?: string;
  pro?: boolean;
}

export function Icon({
  name,
  type = "linear",
  size = 24,
  className,
  label,
  pro,
}: IconProps) {
  return (
    <iconsax-icon
      name={name}
      type={type}
      size={size}
      color="currentColor"
      className={className}
      pro={pro}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    />
  );
}
```

Do not make every icon a Client Component. The custom-element registration needs a client boundary; the static icon markup itself can remain simple JSX.

## Other framework examples

The same custom element is intended to work across frameworks.

### React

```tsx
import "iconsax";

export function Example() {
  return (
    <iconsax-icon
      name="home"
      type="linear"
      size={24}
      color="currentColor"
    />
  );
}
```

### Vue

```vue
<script setup lang="ts">
import "iconsax";
</script>

<template>
  <iconsax-icon
    name="home"
    type="linear"
    size="24"
    color="currentColor"
  />
</template>
```

If Vue reports an unresolved component, configure `iconsax-icon` as a custom element in the Vue compiler configuration.

### Svelte

```svelte
<script lang="ts">
  import "iconsax";
</script>

<iconsax-icon
  name="home"
  type="linear"
  size="24"
  color="currentColor"
></iconsax-icon>
```

### Plain HTML or JavaScript

The official guide describes the package as a plain ES module usable without a framework. A browser still needs a way to resolve the package specifier, such as a build step, import map, or package-aware hosting setup.

```html
<script type="module">
  import "iconsax";
</script>

<iconsax-icon name="home" type="linear"></iconsax-icon>
```

## Pro icons and CLI workflow

Premium icons are not bundled into the public npm package. Iconsax resolves them during development and saves them locally.

### 1. Add a Pro icon to source code

```tsx
<iconsax-icon
  pro
  name="rocket"
  type="bold"
  size={24}
  color="currentColor"
/>
```

### 2. Generate an API key

1. Sign in at [iconsax.io](https://iconsax.io/).
2. Open the account subscription area.
3. Find the API-key section.
4. Generate a key beginning with `ix_pro_`.

Treat this key as a secret. Never place it in browser code, commit it, paste it into public issue reports, or expose it through a `NEXT_PUBLIC_` environment variable.

### 3. Synchronize used icons

Direct argument:

```bash
npx iconsax sync --key ix_pro_XXXXXXXXXXXXXXXX
```

Environment variable:

```bash
IX_PRO_KEY=ix_pro_XXXXXXXXXXXXXXXX npx iconsax sync
```

On PowerShell:

```powershell
$env:IX_PRO_KEY = "ix_pro_XXXXXXXXXXXXXXXX"
npx iconsax sync
```

The command scans source code, requests newly referenced Pro icons, and writes `iconsax-pro.icons.json` at the project root. The official guide recommends committing that generated JSON so production does not depend on the Iconsax service.

The documented limit is 300 **new** icons per key per day. Previously synchronized icons do not count again.

### 4. Register synchronized icons

```tsx
"use client";

import "iconsax";
import { registerProIcons } from "iconsax";
import proIcons from "../../../iconsax-pro.icons.json";

registerProIcons(proIcons);

export function IconsaxRuntime() {
  return null;
}
```

Enable TypeScript JSON imports if the project configuration does not already support them:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

If a Pro element renders before registration finishes, the official package documentation says it automatically updates after its icon is registered.

### CLI reference

```text
iconsax sync [--key ix_pro_xxx] [--src ./src] [--api <url>]
```

| Flag | Purpose | Default |
| --- | --- | --- |
| `--key` | Pro API key | `IX_PRO_KEY` environment variable |
| `--src` | Directory scanned for Pro usages | `./src` |
| `--api` | Pro icon API endpoint override | `https://app.iconsax.io/api/npm-pro-icon` |

Avoid overriding `--api` unless Iconsax support explicitly requires it.

### Production behavior

- Free icon data is provided by the installed package.
- Synchronized Pro icon data is stored in the local JSON file.
- Production does not need the Pro API key.
- Icons already synchronized continue to work locally if a subscription later ends.
- A lapsed subscription prevents resolving additional Pro icons; licensing rules still govern new uses.

## Design files, exports, and Figma

### Figma workflow

1. Find the official Iconsax plugin in the Figma Community.
2. Search and filter the free library without a paid account.
3. Drag an icon into the canvas as editable SVG.
4. Use the plugin to replace an icon or switch styles.
5. Sign in inside the plugin to unlock a Pro or Team catalog and saved projects.

Always confirm that a similarly named plugin is the official Iconsax plugin before entering account credentials.

### Export choice

| Use case | Recommended format |
| --- | --- |
| Web interface icon | Web component or SVG |
| Editable design source | SVG |
| CSS icon system | Generated WOFF2 package |
| Email or restricted renderer | PNG or GIF, depending on motion needs |
| Lottie animation | JSON |
| Raster asset with transparency | WebP |

Do not rasterize normal interface icons merely to match a color; both SVG and `<iconsax-icon>` can inherit CSS color.

## Iconsax MCP integration

Iconsax exposes a remote MCP server at:

```text
https://app.iconsax.io/api/mcp
```

It uses JSON-RPC 2.0 over HTTP.

### Free configuration

```json
{
  "mcpServers": {
    "iconsax": {
      "url": "https://app.iconsax.io/api/mcp"
    }
  }
}
```

The free MCP connection does not require an Iconsax account or API key.

### Pro configuration

```json
{
  "mcpServers": {
    "iconsax": {
      "url": "https://app.iconsax.io/api/mcp",
      "headers": {
        "Authorization": "Bearer ix_pro_XXXXXXXXXXXXXXXX"
      }
    }
  }
}
```

Keep MCP configuration files containing Pro credentials out of source control. Rotate a compromised key from the Iconsax subscription area and update every client that uses it.

### MCP tools documented by Iconsax

| Tier | Tool | Purpose |
| --- | --- | --- |
| Free | `search_icons` | Search free icons by keyword |
| Free | `get_icon` | Get a free icon SVG by name and style |
| Free | `get_icon_as_code` | Get a free icon as React, Vue, or HTML code |
| Free | `list_categories` | List available categories |
| Pro | `search_pro_icons` | Search the complete Pro library |
| Pro | `get_pro_icon` | Get a Pro icon SVG |
| Pro | `get_pro_icon_as_code` | Get a Pro icon as framework code |

Example requests:

```text
Search for a home icon in the bold style.
Get the notification icon as linear SVG.
Return a shopping-cart icon as React code.
List icons in the arrow category.
```

The official documentation names Claude Desktop and Cursor as supported clients and says other HTTP/JSON-RPC MCP-compatible clients can work.

## AI-generated and animated icons

### AI icon generation

The Iconsax platform offers an AI generator intended to create a missing concept while preserving the Iconsax visual language. The platform uses separately purchased credits. Review the current account and license pages before using generated icons in redistributable assets.

### Animated icons

Premium plans include animated content in:

- Lottie-compatible JSON for scalable, programmatically controlled motion.
- GIF for broadly compatible playback.

Use animation for feedback, state transitions, loading, or a focused microinteraction. Do not animate every icon. Respect `prefers-reduced-motion`, avoid infinite decorative motion near reading content, and provide a static fallback when animation communicates essential meaning.

## Accessibility and UX standards

### Decorative icons

Hide purely decorative icons from assistive technology:

```tsx
<iconsax-icon
  name="arrow-right"
  type="linear"
  size={20}
  color="currentColor"
  aria-hidden="true"
/>
```

### Icon-only controls

Put the accessible name on the control, not only on the icon:

```tsx
<button type="button" aria-label="Open navigation">
  <iconsax-icon
    name="menu"
    type="linear"
    size={24}
    color="currentColor"
    aria-hidden="true"
  />
</button>
```

### Meaningful standalone icons

If an icon carries meaning without adjacent text, give the custom-element host a semantic role and label:

```tsx
<iconsax-icon
  name="tick-circle"
  type="bold"
  size={20}
  color="currentColor"
  role="img"
  aria-label="Verified"
/>
```

Text is preferable when the meaning may be ambiguous.

### Interaction guidance

- Keep common UI icons between approximately 16px and 24px.
- Keep the interactive target at least 44px by 44px where practical.
- Maintain sufficient contrast against the background.
- Do not rely only on yellow versus blue to communicate state.
- Keep icon and label spacing consistent.
- Mirror directional icons for right-to-left interfaces only when their meaning is directional rather than symbolic.

## Performance, SSR, and security

### Performance

- Register the package once.
- Prefer the web component or SVG over bitmap files.
- Use only the icons needed by the interface.
- Avoid shipping both `iconsax` and an older full Iconsax React package for the same feature.
- Keep `color="currentColor"` so theme changes do not require duplicate assets.
- Measure bundle and rendering impact after installation because package internals can change between versions.

### Server rendering

The official npm guide states that SSR and static builds are supported. The custom element can exist in server-rendered markup and upgrade when its browser definition loads.

### Content Security Policy

The official npm guide says free assets resolve from package data and synchronized Pro icons resolve from local JSON. A normal npm integration therefore should not require an Iconsax runtime API origin in `connect-src`. Verify actual production network requests before changing the site's CSP.

### Secrets

- Never expose `IX_PRO_KEY` in client bundles.
- Never use a `NEXT_PUBLIC_` prefix for the key.
- Store CI keys in the deployment provider's encrypted secret store.
- Do not print keys in build logs.
- Rotate a key immediately if it is committed or shared publicly.

## License summary

This section is an implementation summary, not legal advice. The official [License](https://docs.iconsax.io/license-and-terms/license), [Attribution Guide](https://docs.iconsax.io/license-and-terms/atribution-guide), and [Usage Manifesto](https://docs.iconsax.io/license-and-terms/usage-manifesto) remain authoritative.

### Current high-level rules

According to the current dedicated license and attribution pages:

- Free and Premium icons may be integrated into personal and commercial final products.
- General final-product use does not require attribution.
- Icons may be modified and combined inside a final product.
- Loose icon files or icon packs may not be resold, sublicensed, or redistributed.
- The license does not transfer icon authorship or copyright.
- Licenses are non-transferable.
- Premium source files and account access must not be handed to an unlicensed client or collaborator.
- Redistributable digital items such as templates, UI kits, themes, or frameworks have special conditions, including visible attribution.
- The current license guide states a maximum of 500 Premium icons in a redistributable digital item.
- A digital item cannot be primarily an Iconsax icon redistribution product.

### HVA website interpretation

Using Iconsax icons as integrated interface elements in the HVA website is described by the official guide as ordinary final-product use, not loose-icon redistribution. General attribution is therefore not required under the current dedicated license page. Recheck the live license before distributing a reusable theme, template, UI kit, component framework, or raw icon bundle.

### Documentation inconsistencies

Some official FAQ paragraphs still contain older or contradictory wording about accounts, attribution, Creative Commons/MIT terms, and whether Premium icons may appear in templates. The dedicated License, Attribution Guide, and Usage Manifesto are the safer references for current legal decisions. If a planned use depends on an unclear clause, ask Iconsax in the official legal-support channel before release.

## Troubleshooting

### The icon is blank

1. Confirm that `import "iconsax"` runs in the browser.
2. Verify the icon name in the official gallery.
3. Use one of the six lowercase `type` values.
4. Check whether the icon is Premium and therefore needs `pro`, synchronization, and registration.
5. Inspect the browser console and network panel.
6. Remove CSS that forces the custom element or its container to zero size.

### TypeScript rejects `<iconsax-icon>`

Add the JSX module augmentation shown in the Next.js section and ensure the declaration file is included by `tsconfig.json`.

### `customElements is not defined`

If a toolchain evaluates the package in a non-browser environment despite the package's documented SSR support, load it after mount:

```tsx
"use client";

import { useEffect } from "react";

export function IconsaxRuntime() {
  useEffect(() => {
    void import("iconsax");
  }, []);

  return null;
}
```

### Pro icon remains blank

1. Confirm the element has the `pro` attribute.
2. Run `npx iconsax sync` against the directory containing the usage.
3. Confirm that `iconsax-pro.icons.json` contains the resolved icon.
4. Call `registerProIcons` once in the browser.
5. Confirm that the API key belongs to an active eligible subscription when resolving a new icon.
6. Check whether the daily new-icon limit has been reached.

### Color does not update

Use a valid CSS color and prefer `color="currentColor"`. Confirm that no parent sets an unexpected `color`, opacity, filter, or disabled-state style.

### Vue treats the icon as an unknown component

Tell the Vue compiler that `iconsax-icon` is a native custom element.

### MCP authentication fails

- Confirm the endpoint is exactly `https://app.iconsax.io/api/mcp`.
- Use `Authorization: Bearer ix_pro_...` for Pro access.
- Do not send headers for the free tier.
- Rotate and replace an expired or revoked key.
- Restart the MCP client after configuration changes.

### Reporting a bug

Iconsax directs support and community questions to the official Vuesax Discord. A useful report includes:

- The failing icon, format, or action.
- Reproduction steps.
- Browser and operating system.
- Framework and package versions.
- Console output or screenshots.
- A minimal reproduction when possible.

See the official [support page](https://docs.iconsax.io/troubleshooting/support) for the current community link and channel guidance.

## Migration from older Iconsax React packages

Older examples commonly use:

```tsx
import { EmojiHappy } from "iconsax-react";

<EmojiHappy color="#CD9F40" variant="Bulk" size={24} />;
```

The current official package uses a different API:

```tsx
import "iconsax";

<iconsax-icon
  name="emoji-happy"
  color="#CD9F40"
  type="bulk"
  size={24}
/>;
```

Key differences:

| Older framework package | Current official package |
| --- | --- |
| Named React component import | One native custom element |
| `variant="Bulk"` | `type="bulk"` |
| Framework-specific | React, Vue, Svelte, or HTML |
| Component name identifies icon | `name` attribute identifies icon |
| Pro workflow varies | `iconsax sync` plus local JSON registration |

Before replacing an installed legacy package, inventory current imports and verify every new icon name in the official V2 gallery. Names are not guaranteed to map mechanically from every third-party package.

## Project conventions for HVA

When Iconsax is adopted in this repository:

1. Install the official `iconsax` package, not `iconsax-react`.
2. Register it once through a client runtime component.
3. Use a small typed wrapper only if it enforces accessibility and design-token defaults.
4. Default to `type="linear"`, `size={24}`, and `color="currentColor"`.
5. Use the existing HVA navy and yellow through CSS tokens; the yellow is `#CD9F40`.
6. Put accessible names on controls, not decorative icons.
7. Keep raw Pro keys out of the repository and client environment.
8. Commit `iconsax-pro.icons.json` only if Pro icons are intentionally used and licensing has been confirmed.
9. Do not mix several icon libraries inside one feature without a documented reason.
10. Verify icon rendering in light and dark contexts, mobile layouts, keyboard focus states, and reduced-motion mode.

## Official source index

### Core

- [Introduction](https://docs.iconsax.io/docs/intro)
- [Getting Started](https://docs.iconsax.io/getting-started)
- [Official npm/web-component guide](https://docs.iconsax.io/npm/web-component)
- [npm package](https://www.npmjs.com/package/iconsax)

### Features and integration

- [Icon Library](https://docs.iconsax.io/features/icon-library)
- [Iconsax Platform](https://docs.iconsax.io/features/iconsax-platform)
- [Integration Overview](https://docs.iconsax.io/integrations/intro)
- [MCP Integration](https://docs.iconsax.io/mcp/ai-integration)
- [Icon Browser](https://app.iconsax.io/)

### License and support

- [License and Usage Rules](https://docs.iconsax.io/license-and-terms/license)
- [Attribution Guide](https://docs.iconsax.io/license-and-terms/atribution-guide)
- [Usage Manifesto](https://docs.iconsax.io/license-and-terms/usage-manifesto)
- [FAQ Overview](https://docs.iconsax.io/faqs/intro)
- [Quick FAQ](https://docs.iconsax.io/faqs/pingpong)
- [Key Answers](https://docs.iconsax.io/faqs/key)
- [More Questions](https://docs.iconsax.io/faqs/more)
- [Support and Community](https://docs.iconsax.io/troubleshooting/support)

Because Iconsax V2 is actively changing, verify package versions with:

```bash
npm view iconsax version
```

Review the live license before any redistribution or marketplace release.
