const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|input|modal|select|table|ripple|spinner|listbox|divider|popover|scroll-shadow|checkbox|spacer).js',
  ],
  theme: {
    colors: {
      black: '#111927',
      'gray-dark': '#5A5A5A',
      'gray-dark-2': '#dcdee1',
      gray: '#6C737F',
      'gray-light': '#F3F4F6',
      'gray-light-2': '#F8F9FA',
      white: '#FFFFFF',
      error: '#FF0000',
    },
    extend: {},
  },
  plugins: [nextui()],
};
