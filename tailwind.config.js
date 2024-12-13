const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'sm': '640px', 'md': '768px', 'lg': '1150px', // change the value of lg to 1150px
      'xl': '1280px', '2xl': '1536px',
    }, extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#000000',
        'blue': '#0066FF',
        'lightblue': '#d9e8ff',
        'darkpurple': '#241A24',
        'lightgrey': '#F4F5F6',
        'navyblue': '#00224A',
        'darkblue': '#1E013A',
        'offwhite': 'rgba(255, 255, 255, 0.75)',
        'lightblack': 'rgba(0, 0, 0, 0.55)',
        'bluish': 'rgba(14, 13, 13, 0.75)',
        'testColor': 'rgba(54, 54, 54, 0.75)',
        'grey': '#909090',
        'bgblue': '#02398A',
        'darkgrey': '#747474',
        'faqblue': '#0861FF',
        'gold': '#FAAF38',
        'hoblue': '#0000FF',
        'btnblue': "#267dff",
        'bggrey': '#DDDDDD',
        'footer': 'rgba(226, 223, 223, 0.75)',
        'linegrey': "#C4C4C4",
        lightPrimary: "#F4F7FE",
        brand: {
          50: "#E9E3FF",
          100: "#C0B8FE",
          200: "#A195FD",
          300: "#8171FC",
          400: "#7551FF",
          500: "#422AFB",
          600: "#3311DB",
          700: "#2111A5",
          800: "#190793",
          900: "#11047A",
        },
        navy: {
          50: "#d0dcfb",
          100: "#aac0fe",
          200: "#a3b9f8",
          300: "#728fea",
          400: "#3652ba",
          500: "#1b3bbb",
          600: "#24388a",
          700: "#1B254B",
          800: "#111c44",
          900: "#0b1437",
        },
      }, fontSize: {
        xs: ['0.75rem', {lineHeight: '1rem'}],
        sm: ['0.875rem', {lineHeight: '1.25rem'}],
        base: ['1rem', {lineHeight: '1.5rem'}],
        lg: ['1.125rem', {lineHeight: '1.75rem'}],
        xl: ['1.25rem', {lineHeight: '1.75rem'}],
        '2xl': ['1.5rem', {lineHeight: '2rem'}],
        '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
        '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
        '5xl': ['3rem', {lineHeight: '1'}],
        '6xl': ['3.75rem', {lineHeight: '1'}],
        '7xl': ['4.5rem', {lineHeight: '1'}],
        '8xl': ['6rem', {lineHeight: '1'}],
        '9xl': ['8rem', {lineHeight: '1'}],
        '65xl': ['65px', {lineHeight: '1'}],
        '80xl': ['80px', {lineHeight: '6rem'}],
      },
    },
  },
  plugins: [nextui()],
}
