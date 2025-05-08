/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Pacifico"', 'cursive'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        modalFadeIn: 'modalFadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        modalFadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        'none': 'none',
        '1000': '1000px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
        'visible': 'visible',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    },
  },
  plugins: [
    // Custom plugin for 3D transform properties
    function({ addUtilities }) {
      const newUtilities = {
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective': {
          perspective: '1000px',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};