import { createApp } from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1dgVrNeVlK8NH3g8MVujY5UBwoEvO4vw",
    authDomain: "pocketbookpulse.firebaseapp.com",
    projectId: "pocketbookpulse",
    storageBucket: "pocketbookpulse.appspot.com",
    messagingSenderId: "449810969500",
    appId: "1:449810969500:web:c555e86010beb5bc970e59"
  };

firebase.initializeApp(firebaseConfig);

// Create a Vue 3 app instance
const app = createApp(App);

// Mount the app to an element in the HTML file
app.mount('#app');
