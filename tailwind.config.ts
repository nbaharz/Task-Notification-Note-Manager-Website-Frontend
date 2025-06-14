import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#1a1a1a',
          dark: '#ffffff',
        },
        primary: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
        secondary: {
          light: '#6b7280',
          dark: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
}

export default config 