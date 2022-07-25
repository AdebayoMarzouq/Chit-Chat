/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          main: '#0284c7',
          maintint: '#38bdf8',
          toasttint: '#bae6fd',
          text: '#374151',
          chat: '#111827',
          title: '#075985',
          bubble1: '#38bdf861',
          bubble2: '#cecece61',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
