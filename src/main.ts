import { createApp } from 'vue';
import App from './App.vue';
import router, { navRoutes } from '@/router';
import { useTheme } from '@/composables/useTheme';
import { useLastVisited } from '@/composables/useLastVisited';
import './style.css';

// Sync the theme class onto <html> before the app mounts to avoid a flash.
useTheme().initTheme();

// Record category visits so the landing page can offer to resume. Only routes
// in `navRoutes` count — the landing route is not a destination to return to.
const navRouteNames = new Set(navRoutes.map((route) => route.name as string));
useLastVisited().trackLastVisited(router, (name) => navRouteNames.has(name));

createApp(App).use(router).mount('#app');
