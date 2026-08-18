import { createApp } from 'vue';
import App from './App.vue';
import router, { navRoutes } from '@/router';
import { useTheme } from '@/composables/useTheme';
import { useLastVisited } from '@/composables/useLastVisited';

// Self-hosted, so the app has no third-party font request and works offline.
// Variable faces where they exist: one file covers the whole weight range,
// which is smaller than the three static cuts it replaces.
//
// Bricolage Grotesque is the display face — it has an optical-size axis and
// deliberate irregularities that keep large headings from reading as a default.
// Public Sans carries UI text. IBM Plex Mono is the code and numeric face; it
// is used for the code panel, complexity notation and every stat readout.
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/public-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

import './style.css';

// Sync the theme class onto <html> before the app mounts to avoid a flash.
useTheme().initTheme();

// Record category visits so the landing page can offer to resume. Only routes
// in `navRoutes` count — the landing route is not a destination to return to.
const navRouteNames = new Set(navRoutes.map((route) => route.name as string));
useLastVisited().trackLastVisited(router, (name) => navRouteNames.has(name));

createApp(App).use(router).mount('#app');
