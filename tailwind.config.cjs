/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
// console.log('colors', colors)

module.exports = {
  darkMode: ['class'],
  // content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./src/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // 'text-2xl',
    // 'text-3xl',
    {
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|brown|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|300|500|700|900)/,
    },
  ],
  theme: {
    extend: {
      maxWidth: {
        readable: '65ch',
      },
      fontFamily: {
        firaCode: ['Fira Code"', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.75' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'ping-once': 'ping-once 1s ease-in-out',
      },
    },
    colors: {
      ...colors,
      brown: {
        50: '#efebe9',
        100: '#d7ccc8',
        200: '#bcaaa4',
        300: '#a1887f',
        400: '#8d6e63',
        500: '#795548',
        600: '#6d4c41',
        700: '#5d4037',
        800: '#4e342e',
        900: '#3e2723',
        950: '#3e2723',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate'),
  ],
  corePlugins: {
    // preflight: false,
  },
}
