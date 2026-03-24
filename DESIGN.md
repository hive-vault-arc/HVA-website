# Design System Strategy: The Digital Editorial

## 1. Overview & Creative North Star

**Creative North Star: "The Architectural Curator"**

This design system is built to transform complex IT consulting into a high-end, editorial experience. We are moving away from the "SaaS template" aesthetic toward a layout that feels curated, authoritative, and permanent. The visual strategy centers on **Sophisticated Asymmetry** and **Tonal Depth**. By utilizing high-contrast typography scales and generous, intentional whitespace, we position the agency as an expert partner rather than just a vendor.

The system breaks the rigid grid by allowing elements to overlap subtly—mimicking the layout of a premium architectural journal—and using background shifts instead of borders to define space.

---

## 2. Colors

The palette is anchored in deep slates and cool greys, providing a neutral, "executive" foundation that allows the vibrant blue and high-contrast typography to command attention.

### The "No-Line" Rule
To achieve a premium, seamless feel, **1px solid borders are prohibited for sectioning.** Structural boundaries must be defined solely through background color shifts. For example, a section using `surface-container-low` (#f2f4f6) should sit directly against a `surface` (#f7f9fb) background to create a clean, modern transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
*   **Base:** `surface` (#f7f9fb)
*   **Sectioning:** `surface-container-low` (#f2f4f6) for large content blocks.
*   **Emphasis:** `surface-container-highest` (#e0e3e5) for highlighted sidebars or cards.
*   **Floating Elements:** `surface-container-lowest` (#ffffff) for primary interactive cards.

### Signature Textures & Glass
*   **Glassmorphism:** For floating navigation bars or modals, use semi-transparent surface colors with a `20px` backdrop-blur to soften the interface.
*   **Tonal Gradients:** For primary CTAs or hero backgrounds, use a subtle linear gradient from `primary` (#000000) to `primary-container` (#00174b) to add "soul" and depth.

---

## 3. Typography

The typographic pairing is the core of our "Expert" identity. We use a high-contrast relationship between a classic serif and a modern geometric sans-serif.

*   **Display & Headlines (Newsreader):** The serif font provides an intellectual, established tone. Use `display-lg` (3.5rem) with tight letter-spacing for hero sections to create an editorial impact.
*   **Body & Titles (Manrope):** The sans-serif ensures maximum legibility for technical details. It feels precise and engineered.
*   **Visual Hierarchy:** Titles (`title-lg`) should always be Manrope to signify action and utility, while Headlines (`headline-lg`) remain Newsreader to signal thought leadership.

---

## 4. Elevation & Depth

We reject traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f2f4f6) background creates a natural, soft lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Book a Call" modal), use an extra-diffused shadow: `box-shadow: 0 10px 40px rgba(25, 28, 30, 0.06);`. The shadow color is a low-opacity version of `on-surface` to mimic natural light.
*   **The "Ghost Border":** If a border is required for accessibility, use `outline-variant` (#c6c6cd) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#000000) with `on-primary` (#ffffff) text. Use `rounded-sm` (0.125rem) for a sharp, professional look.
*   **Secondary:** `surface-container-lowest` (#ffffff) with a Ghost Border.
*   **Tertiary:** No background, `on-surface` text with a `label-md` font weight and a small arrow icon ($→$).

### Cards & Lists
*   **Cards:** Forbid divider lines. Separate card content using `spacing-6` (2rem) of vertical whitespace.
*   **Lists:** Use `surface-container-low` backgrounds for alternate list items instead of horizontal rules. Leading elements (icons) should use the `surface-tint` (#0053db) at 10% opacity as a background circle.

### Input Fields
*   **Style:** Minimalist. Only a bottom border using `outline-variant` at 40% opacity.
*   **States:** On focus, the bottom border transitions to `surface-tint` (#0053db) with a `2px` weight.

### Signature Component: The "Expert Insight" Card
A large, asymmetric card with a `surface-container-highest` background, using `display-sm` Newsreader text. This is used for testimonials or key value propositions, breaking the standard grid layout.

---

## 6. Do's and Don'ts

### Do
*   **Do** use the `spacing-20` (7rem) and `spacing-24` (8.5rem) values for hero section padding to create "executive breathing room."
*   **Do** overlap image elements with text containers by `1.5rem` to create an editorial, custom-built feel.
*   **Do** use `Newsreader` for any text that is meant to be read as a "statement" or "opinion."

### Don't
*   **Don't** use standard "Material Blue" for everything. Reserve the `surface-tint` and `on-primary-container` blue for high-impact CTAs and critical data points only.
*   **Don't** use `rounded-full` (pills) for buttons; it feels too "consumer" and "friendly." Stick to `sm` or `none` for an established, architectural feel.
*   **Don't** use icons that are too "bubbly" or "filled." Use thin-stroke (1px or 1.5px) linear icons to match the Manrope typeface.