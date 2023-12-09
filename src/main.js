// main.js or similar entry file
import { createApp } from 'vue';
import App from './App.vue';
import { useUserState } from './userState';
import router from './router.mjs';

const app = createApp(App);

app.use(router);

app.provide('userState', useUserState());

app.mount('#app');