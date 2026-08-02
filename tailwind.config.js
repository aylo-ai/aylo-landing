/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d0d11',
        panel: '#141319',
        brand: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#ffc9a8',
          300: '#ffa470',
          400: '#ff7a36',
          500: '#ff5c1a',
          600: '#f04310',
          700: '#c7300f',
          800: '#9e2915',
          900: '#7f2514',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 30%, rgba(255,92,26,0.35), rgba(13,13,17,0) 60%)',
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
}
