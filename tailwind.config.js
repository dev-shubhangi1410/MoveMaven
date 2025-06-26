/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
  animation: {
    'float-slow': 'float 8s ease-in-out infinite',
  },
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(20px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  }
},
  },
  plugins: [],
};
