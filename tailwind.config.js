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
       Primary   #2563EB  — blue-600  (brand blue, links, highlights, icons)
       Secondary #475569  — slate-600 (secondary text, muted UI)
       Tertiary  #0F172A  — slate-900 (primary CTA buttons, headings, dark bg)
       Neutral   #F8FAFC  — slate-50  (page background, light surfaces)
       ─────────────────────────────────────────────────────────────────── */
    colors: {
      transparent: 'transparent',
      current:     'currentColor',
      white:       '#ffffff',
      black:       '#0F172A',

      /* Primary blue — #2563EB (Tailwind blue-600) */
      primary: {
        '50':   '#eff6ff',
        '100':  '#dbeafe',
        '200':  '#bfdbfe',
        '300':  '#93c5fd',
        '400':  '#60a5fa',
        '500':  '#3b82f6',
        '600':  '#2563eb',
        DEFAULT: '#2563EB',
        dark:    '#1d4ed8',
        darker:  '#1e40af',
        '700':  '#1d4ed8',
        '800':  '#1e40af',
        '900':  '#1e3a8a',
        '950':  '#172554',
      },

      /* Secondary slate — #475569 (Tailwind slate-600) */
      secondary: {
        '50':   '#f8fafc',
        '100':  '#f1f5f9',
        '200':  '#e2e8f0',
        '300':  '#cbd5e1',
        '400':  '#94a3b8',
        '500':  '#64748b',
        '600':  '#475569',
        DEFAULT: '#475569',
        '700':  '#334155',
        '800':  '#1e293b',
        '900':  '#0f172a',
      },

      /* Tertiary dark navy — #0F172A (Tailwind slate-900) */
      tertiary: {
        DEFAULT: '#0F172A',
        mid:     '#1e293b',
        light:   '#334155',
      },

      /* Neutral / background — #F8FAFC */
      neutral: {
        DEFAULT: '#F8FAFC',
        dark:    '#e2e8f0',
        mid:     '#cbd5e1',
      },

      /* ── Legacy "purple" alias — backward compat with existing pages ──
         Maps old #0984E3 usage to the new primary blue scale.          */
      purple: {
        '50':   '#eff6ff',
        '100':  '#dbeafe',
        '200':  '#bfdbfe',
        '300':  '#93c5fd',
        '400':  '#60a5fa',
        '500':  '#2563eb',
        '600':  '#2563eb',
        '700':  '#1d4ed8',
        '800':  '#1e40af',
        '900':  '#1e3a8a',
        '950':  '#172554',
        DEFAULT: '#2563EB',
        dark:    '#1d4ed8',
        darker:  '#1e40af',
      },

      /* ── Legacy "dark" / "cloud" aliases ── */
      dark:  '#0F172A',
      cloud: '#F8FAFC',

      /* Accent — lighter blue for highlights */
      cyan: {
        '500':   '#60a5fa',
        DEFAULT: '#60a5fa',
      },

      /* Grays — Tailwind slate scale */
      gray: {
        '50':  '#f8fafc',
        '100': '#f1f5f9',
        '200': '#e2e8f0',
        '300': '#cbd5e1',
        '400': '#94a3b8',
        '500': '#64748b',
        '600': '#475569',
        '700': '#334155',
        '800': '#1e293b',
        '900': '#0f172a',
      },
    },

    extend: {
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
