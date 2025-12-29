/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'mahogany': {
          DEFAULT: '#CD5C5C',
          'light': '#E9967A',
          'dark': '#B22222',
          'darker': '#8B0000',
        },
        'dark': {
          'soft': '#1a1a1a',
          'lighter': '#2a2a2a',
        },
        
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
      },
      spacing: {
        'custom-xs': '0.25rem',
        'custom-sm': '0.5rem',
        'custom-md': '1rem',
        'custom-lg': '1.5rem',
        'custom-xl': '2rem',
      },
      fontSize: {
        'custom-xs': '0.75rem',
        'custom-sm': '0.875rem',
        'custom-base': '1rem',
        'custom-lg': '1.125rem',
        'custom-xl': '1.25rem',
      },
      borderRadius: {
        'custom-sm': '0.25rem',
        'custom-md': '0.5rem',
        'custom-lg': '0.75rem',
        'custom-xl': '1rem',
      },
    },
  },
  plugins: [],
};
