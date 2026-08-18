/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
      sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      headline: ['var(--font-newsreader)', 'Georgia', 'serif'],
      body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      label: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#1A2535',
      canvas: {
        DEFAULT: '#FFFFFF',
        warm: '#FCFBF8',
        alternate: '#F1F3F6',
      },
      ink: {
        DEFAULT: '#1A2535',
        dark: '#0D1824',
      },
      brand: {
        DEFAULT: '#E8A838',
        muted: '#DBAA4D',
        display: '#CD9F40',
        bright: '#F0C15A',
        soft: '#F8E9C8',
        text: '#E8A838',
      },
      body: '#536174',
      line: '#DDE3EA',

      // Compatibility aliases. New code should use the semantic names above.
      primary: {
        50: '#F8E9C8',
        100: '#F8E9C8',
        200: '#F8E9C8',
        300: '#F0C15A',
        400: '#F0C15A',
        500: '#E8A838',
        600: '#E8A838',
        700: '#DBAA4D',
        800: '#CD9F40',
        900: '#E8A838',
        950: '#E8A838',
        DEFAULT: '#E8A838',
        dark: '#E8A838',
        darker: '#E8A838',
      },
      secondary: {
        50: '#FFFFFF',
        100: '#FCFBF8',
        200: '#F1F3F6',
        300: '#DDE3EA',
        400: '#DDE3EA',
        500: '#536174',
        600: '#536174',
        700: '#1A2535',
        800: '#1A2535',
        900: '#0D1824',
        DEFAULT: '#536174',
      },
      tertiary: {
        DEFAULT: '#1A2535',
        mid: '#0D1824',
        light: '#536174',
      },
      neutral: {
        DEFAULT: '#FFFFFF',
        dark: '#DDE3EA',
        mid: '#F1F3F6',
      },
      purple: {
        50: '#F8E9C8',
        100: '#F8E9C8',
        200: '#F8E9C8',
        300: '#F0C15A',
        400: '#F0C15A',
        500: '#E8A838',
        600: '#E8A838',
        700: '#DBAA4D',
        800: '#CD9F40',
        900: '#E8A838',
        950: '#E8A838',
        DEFAULT: '#E8A838',
        dark: '#E8A838',
        darker: '#E8A838',
      },
      dark: '#1A2535',
      cloud: '#FFFFFF',
      cyan: {
        500: '#F0C15A',
        DEFAULT: '#F0C15A',
      },
      gray: {
        50: '#FFFFFF',
        100: '#FCFBF8',
        200: '#F1F3F6',
        300: '#DDE3EA',
        400: '#DDE3EA',
        500: '#536174',
        600: '#536174',
        700: '#1A2535',
        800: '#1A2535',
        900: '#0D1824',
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
          '0%': {'background-position': '100%'},
          '100%': {'background-position': '-100%'},
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
