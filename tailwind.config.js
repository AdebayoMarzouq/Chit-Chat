/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: 'var(--color-light-bg)',
          main: 'var(--color-light-main)',
          maintint: 'var(--color-light-maintint)',
          toasttint: 'var(--color-light-toasttint)',
          text: '#374151',
          chat: '#111827',
          title: '#075985',
          bubble1: 'var(--color-light-bubble1)',
          bubble2: '#cecece61',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
