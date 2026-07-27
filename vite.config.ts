import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves project sites from /<repo-name>/, so asset URLs must
  // be rooted there in production. Keep dev server at '/' for local work.
  base: command === 'build' ? '/algoviz/' : '/',
  plugins: [vue()],
}));
