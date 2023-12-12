// Firebase.mjs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyD1dgVrNeVlK8NH3g8MVujY5UBwoEvO4vw",
  authDomain: "pocketbookpulse.firebaseapp.com",
  projectId: "pocketbookpulse",
  storageBucket: "pocketbookpulse.appspot.com",
  messagingSenderId: "449810969500",
  appId: "1:449810969500:web:c555e86010beb5bc970e59"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };