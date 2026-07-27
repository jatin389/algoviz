/** @type {import('tailwindcss').Config} */
export default {
  // Class strategy lets us toggle dark/light mode by adding/removing
  // the `dark` class on <html> instead of relying on the OS preference.
  darkMode: 'class',
  // Must include .ts: the migration to TypeScript would otherwise silently
  // stop Tailwind from scanning converted files, dropping any class it only
  // ever saw there.
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
