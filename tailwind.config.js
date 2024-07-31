const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [nextui()],
}
