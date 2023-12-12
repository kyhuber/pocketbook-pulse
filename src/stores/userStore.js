// src/stores/userStore.js
import { defineStore } from 'pinia';
import { auth, db } from '../firebase.mjs';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    error: null
  }),
  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential.user); // Log the user credential
        this.user = { uid: userCredential.user.uid, ...userCredential.user };
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    async signup(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = { uid: userCredential.user.uid, ...userCredential.user };
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    async fetchUser() {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            this.user = { uid: auth.currentUser.uid, ...userDoc.data() };
          } else {
            console.error('User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        this.user = null;
        console.error('User is not logged in.');
      }
    },

    // initializeAuthListener() {
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in
    //       this.user = user;
    //     } else {
    //       // User is signed out
    //       this.user = null;
    //     }
    //   });
    // },

    initializeAuthListener() {
      onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed. User:", user);
        this.user = user;
      });
    },

    signOut() {
      firebaseSignOut(auth);
      this.user = null;
      this.error = null;
    }
  }
});