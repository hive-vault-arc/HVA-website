/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	fontFamily: {
  		serif: [
  			'DM Serif Display',
  			'serif'
  		],
  		sans: [
  			'Inter',
  			'sans-serif'
  		]
  	},
  	colors: {
  		transparent: 'transparent',
  		current: 'currentColor',
  		white: '#ffffff',
  		black: '#1E272E',
  		gray: {
  			'50': '#f9fafb',
  			'100': '#f3f4f6',
  			'200': '#e5e7eb',
  			'300': '#d1d5db',
  			'400': '#9ca3af',
  			'500': '#6b7280',
  			'600': '#4b5563',
  			'700': '#374151',
  			'800': '#1f2937',
  			'900': '#111827'
  		},
  		purple: {
  			'50': '#ecf5fd',
  			'100': '#d6ebfb',
  			'200': '#add8f6',
  			'300': '#84c5f2',
  			'400': '#5ab2ed',
  			'500': '#0984E3',
  			'600': '#0776cc',
  			'700': '#0668b4',
  			'800': '#045a9d',
  			'900': '#034c86',
  			'950': '#023d6e',
  			DEFAULT: '#0984E3',
  			dark: '#0776cc',
  			darker: '#0668b4'
  		},
  		dark: '#1E272E',
  		cyan: {
  			'500': '#00CEC9'
  		},
  		cloud: '#F5F6FA'
  	},
  	extend: {
  		animation: {
  			shine: 'shine 5s linear infinite'
  		},
  		keyframes: {
  			shine: {
  				'0%': {
  					'background-position': '100%'
  				},
  				'100%': {
  					'background-position': '-100%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
