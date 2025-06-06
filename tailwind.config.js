/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['DM Serif Display', 'serif'],
      'sans': ['Inter', 'sans-serif'],
    },
    colors: {
      // Keep Tailwind's default colors if needed, or define a completely custom palette
      // For now, let's explicitly define our colors and key default ones
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      purple: {
        DEFAULT: '#8B5CF6',
        dark: '#5A67D8',
        darker: '#4c57c4',
        50: '#f5f3ff', // Adding a light purple shade based on default palette
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
        950: '#2e1065',
      },
      dark: '#18181b',
      // Add other default or custom colors here as needed
    },
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
