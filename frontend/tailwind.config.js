/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        meow : ['Meow Script', 'cursive'],
        shadows : ['Shadows Into Light', 'cursive'],
      }
    },
  },
  plugins: [],
}
