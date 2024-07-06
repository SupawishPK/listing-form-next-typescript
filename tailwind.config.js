/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#111927',
      'gray-dark': '#5A5A5A',
      gray: '#6C737F',
      'gray-light': '#F3F4F6',
      'gray-light-2': '#F8F9FA',
      white: '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
};
