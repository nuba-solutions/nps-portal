import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px'
    },
    extend: {
      content: {
        'check-symbol': 'url("/icons/checkmark-outline.svg")',
        'radio-symbol': 'url("/icons/ellipse-outline.svg")',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-50': 'rgb(var(--primary-50) / <alpha-value>)',
        'primary-100': 'rgb(var(--primary-100) / <alpha-value>)',
        'primary-200': 'rgb(var(--primary-200) / <alpha-value>)',
        'primary-300': 'rgb(var(--primary-300) / <alpha-value>)',
        'primary-400': 'rgb(var(--primary-400) / <alpha-value>)',
        'primary-500': 'rgb(var(--primary-500) / <alpha-value>)',
        'primary-600': 'rgb(var(--primary-600) / <alpha-value>)',
        'primary-700': 'rgb(var(--primary-700) / <alpha-value>)',
        'primary-800': 'rgb(var(--primary-800) / <alpha-value>)',
        'primary-900': 'rgb(var(--primary-900) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
export default config
