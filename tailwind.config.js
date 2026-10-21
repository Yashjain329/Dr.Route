/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b2545',
          dark: '#001026',
          light: '#133e6e',
          fixed: '#d5e3ff',
          container: '#0b2545',
        },
        secondary: {
          DEFAULT: '#0d9488',
          teal: '#006a61',
          light: '#14b8a6',
          container: '#86f2e4',
          fixed: '#89f5e7',
        },
        tertiary: {
          DEFAULT: '#06b6d4',
          fixed: '#acedff',
        },
        emergency: {
          DEFAULT: '#dc2626',
          dark: '#ba1a1a',
          container: '#ffdad6',
        },
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          lowest: '#ffffff',
          low: '#eff4ff',
          container: '#e5eeff',
          high: '#dce9ff',
          highest: '#d3e4fe',
          variant: '#d3e4fe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'clinical': '0px 2px 6px -1px rgba(11, 37, 69, 0.04), 0px 1px 3px -1px rgba(11, 37, 69, 0.02)',
        'clinical-md': '0px 8px 16px -4px rgba(11, 37, 69, 0.08), 0px 4px 6px -2px rgba(11, 37, 69, 0.03)',
        'clinical-lg': '0px 20px 28px -6px rgba(11, 37, 69, 0.12), 0px 8px 10px -4px rgba(11, 37, 69, 0.06)',
        'sos': '0px 8px 20px -2px rgba(220, 38, 38, 0.35)',
      },
    },
  },
  plugins: [],
}
