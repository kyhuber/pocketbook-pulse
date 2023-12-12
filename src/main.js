// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.mjs';

// Import Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, getFirestore } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1dgVrNeVlK8NH3g8MVujY5UBwoEvO4vw",
    authDomain: "pocketbookpulse.firebaseapp.com",
    projectId: "pocketbookpulse",
    storageBucket: "pocketbookpulse.appspot.com",
    messagingSenderId: "449810969500",
    appId: "1:449810969500:web:c555e86010beb5bc970e59"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create a Vue 3 app instance
const pinia = createPinia();
const app = createApp(App);

// Mount the app to an element in the HTML file
app.use(pinia)
    .use(router)
    .mount('#app');

// Export services for global access
export { auth, db };