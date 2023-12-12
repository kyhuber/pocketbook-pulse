// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.mjs';
import { useUserStore } from './stores/userStore';
import './assets/style';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia)
    .use(router);

const userStore = useUserStore(); // Instantiate the user store
userStore.initializeAuthListener(); // Initialize the Firebase auth listener

app.mount('#app');