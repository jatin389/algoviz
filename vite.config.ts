import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves project sites from /<repo-name>/, so asset URLs must
  // be rooted there in production. Keep dev server at '/' for local work.
  // Branch previews live at /<repo-name>/preview/<branch>/ instead, so CI
  // overrides the path via VITE_BASE_PATH; the default covers local builds.
  base: command === 'build' ? (process.env.VITE_BASE_PATH ?? '/algoviz/') : '/',
  plugins: [vue()],
  resolve: {
    // Mirrors "paths" in tsconfig.app.json. Extensionless '@/...' imports
    // resolve identically before and after a file flips from .js to .ts,
    // which is what makes the incremental migration safe.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}));
