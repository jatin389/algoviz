import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { useTheme } from '@/composables/useTheme';
import './style.css';

// Sync the theme class onto <html> before the app mounts to avoid a flash.
useTheme().initTheme();

createApp(App).use(router).mount('#app');
