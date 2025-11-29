/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // PENTING: Ini agar tailwind membaca file di folder src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}