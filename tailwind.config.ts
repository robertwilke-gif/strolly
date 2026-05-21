import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand — BRAND.md §2
        teal: {
          DEFAULT: '#00B3B3',
          dark:    '#00908E',
          light:   '#E6F7F7',
        },
        navy: {
          DEFAULT: '#0D1B2A',
          soft:    '#15263A',
        },
        sunshine: '#FFC107',
        // Neutrals
        gray: {
          50:  '#F8FAFB',
          100: '#F4F6F8',
          200: '#E6EAEE',
          300: '#D6DCE3',
        },
        text: {
          DEFAULT: '#333B45',
          soft:    '#5B6573',
        },
        // Semantic
        success: {
          DEFAULT: '#14723E',
          bg:      '#E8F7EE',
        },
        error: {
          DEFAULT: '#8E1F2A',
          bg:      '#FBE9EA',
        },
      },
      fontFamily: {
        head: ['var(--font-head)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm:   '10px',
        md:   '18px',
        lg:   '28px',
        pill: '999px',
      },
      boxShadow: {
        sm:   '0 2px 6px rgba(13,27,42,.06)',
        md:   '0 12px 30px rgba(13,27,42,.10)',
        lg:   '0 30px 60px rgba(13,27,42,.18)',
        teal: '0 8px 20px rgba(0,179,179,.35)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
