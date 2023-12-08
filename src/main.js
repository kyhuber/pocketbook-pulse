import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css'; // Import the global CSS here

createApp(App).use(router).mount('#app');