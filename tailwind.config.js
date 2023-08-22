/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/src/assets/images/HoChiMinhCity.jpg')",
        'hero': "url('/src/assets/images/HoChiMinhCItyImage.jpg')"
      }
    },
  },
  plugins: [],
}