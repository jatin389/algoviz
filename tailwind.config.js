/** @type {import('tailwindcss').Config} */
export default {
  // Class strategy lets us toggle dark/light mode by adding/removing
  // the `dark` class on <html> instead of relying on the OS preference.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
