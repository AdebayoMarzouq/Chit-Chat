/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          main: '#8b5cf6', //#3ec1d3
          maintint: '#c4b5fd',
          text: '#676767',
          chat: '#777777',
          title: '#2d3f65',
          bubble1: '#3ec1d361',
          bubble2: '#cecece61',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
