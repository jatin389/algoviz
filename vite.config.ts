import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves project sites from /<repo-name>/, so asset URLs must
  // be rooted there in production. Keep dev server at '/' for local work.
  base: command === 'build' ? '/algoviz/' : '/',
  plugins: [vue()],
  resolve: {
    // Mirrors "paths" in tsconfig.app.json. Extensionless '@/...' imports
    // resolve identically before and after a file flips from .js to .ts,
    // which is what makes the incremental migration safe.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}));
