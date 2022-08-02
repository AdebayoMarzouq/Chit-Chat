/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: 'var(--color-light-bg)', // check if used
          main: 'var(--color-light-main)',
          mainalt: 'var(--color-light-main-alt)',
          maintint: 'var(--color-light-maintint)',
          toasttint: 'var(--color-light-toast-tint)',
          text: 'var(--color-light-text)',
          textmuted: 'var(--color-light-text-muted)',
          chat: 'var(--color-light-chat-text)',
          chat2: 'var(--color-light-chat-text2)',
          bubble1: 'var(--color-light-bubble1)',
          bubble2: 'var(--color-light-bubble2)',
        },
        dark: {
          bg: 'var(--color-dark-bg)', // check if used
          mainalt: 'var(--color-dark-main-alt)',
          toasttint: 'var(--color-dark-toast-tint)',
          text: 'var(--color-dark-text)',
          textmuted: 'var(--color-dark-text-muted)',
          chat: 'var(--color-dark-chat-text)',
          chat2: 'var(--color-dark-chat-text2)',
          bubble2: 'var(--color-dark-bubble2)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
