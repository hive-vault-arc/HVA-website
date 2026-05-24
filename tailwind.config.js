/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    /* ── Fonts ─────────────────────────────────────────────────────────────
       Headline / Serif : Newsreader  (editorial serif  — from design system)
       Body / Sans      : Inter       (clean sans-serif — from design system)
       Label            : Inter       (same as body)
       ─────────────────────────────────────────────────────────────────── */
    fontFamily: {
      serif:    ['var(--font-newsreader)', 'Georgia', 'serif'],
      sans:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      headline: ['var(--font-newsreader)', 'Georgia', 'serif'],
      body:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      label:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },

    /* ── Color Palette ──────────────────────────────────────────────────────
       Primary   #E8A838  — brand gold  (brand gold, links, highlights, icons)
       Secondary #566274  — slate-600 (secondary text, muted UI)
       Tertiary  #1A2535  — slate-900 (primary CTA buttons, headings, dark bg)
       Neutral   #FFFFFF  — slate-50  (page background, light surfaces)
       ─────────────────────────────────────────────────────────────────── */
    colors: {
      transparent: 'transparent',
      current:     'currentColor',
      white:       '#ffffff',
      black:       '#1A2535',

      /* Primary gold — #E8A838 (Tailwind brand gold) */
      primary: {
        '50':   '#FFF9EA',
        '100':  '#FFF4D8',
        '200':  '#F8E1A6',
        '300':  '#F4D27C',
        '400':  '#F0C15A',
        '500':  '#F0C15A',
        '600':  '#E8A838',
        DEFAULT: '#E8A838',
        dark:    '#C8891C',
        darker:  '#A87316',
        '700':  '#C8891C',
        '800':  '#A87316',
        '900':  '#8B6115',
        '950':  '#6F4A10',
      },

      /* Secondary slate — #566274 (Tailwind slate-600) */
      secondary: {
        '50':   '#FFFFFF',
        '100':  '#F7F8FA',
        '200':  '#DDE3EA',
        '300':  '#C8CED7',
        '400':  '#9AA4B2',
        '500':  '#657384',
        '600':  '#566274',
        DEFAULT: '#566274',
        '700':  '#3D4858',
        '800':  '#253247',
        '900':  '#1A2535',
      },

      /* Tertiary dark navy — #1A2535 (Tailwind slate-900) */
      tertiary: {
        DEFAULT: '#1A2535',
        mid:     '#253247',
        light:   '#3D4858',
      },

      /* Neutral / background — #FFFFFF */
      neutral: {
        DEFAULT: '#FFFFFF',
        dark:    '#DDE3EA',
        mid:     '#C8CED7',
      },

      /* ── Legacy "purple" alias — backward compat with existing pages ──
         Maps old #E8A838 usage to the new primary gold scale.          */
      purple: {
        '50':   '#FFF9EA',
        '100':  '#FFF4D8',
        '200':  '#F8E1A6',
        '300':  '#F4D27C',
        '400':  '#F0C15A',
        '500':  '#E8A838',
        '600':  '#E8A838',
        '700':  '#C8891C',
        '800':  '#A87316',
        '900':  '#8B6115',
        '950':  '#6F4A10',
        DEFAULT: '#E8A838',
        dark:    '#C8891C',
        darker:  '#A87316',
      },

      /* ── Legacy "dark" / "cloud" aliases ── */
      dark:  '#1A2535',
      cloud: '#FFFFFF',

      /* Accent — lighter gold for highlights */
      cyan: {
        '500':   '#F0C15A',
        DEFAULT: '#F0C15A',
      },

      /* Grays — Tailwind slate scale */
      gray: {
        '50':  '#FFFFFF',
        '100': '#F7F8FA',
        '200': '#DDE3EA',
        '300': '#C8CED7',
        '400': '#9AA4B2',
        '500': '#657384',
        '600': '#566274',
        '700': '#3D4858',
        '800': '#253247',
        '900': '#1A2535',
      },
    },

    extend: {
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
      keyframes: {
        shine: {
          '0%':   { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      /* ── Semantic HSL colors (used by shadcn-style components) ── */
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
