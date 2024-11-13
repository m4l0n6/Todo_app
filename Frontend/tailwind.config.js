/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Karla: ['Karla', 'sans-serif'],
        Tiny: ['Tiny5', 'sans-serif']
      },
    },
  },
  plugins: [],
}

