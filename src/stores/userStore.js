// src/stores/userStore.js
import { defineStore } from 'pinia';
import { auth } from '../firebase.mjs';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    error: null
  }),
  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    async signup(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Handle user credential, possibly storing the user data
        // ...
      } catch (error) {
        // Handle any errors here
        throw error; // Rethrow the error to be caught by the component
      }
    },

    async fetchUser() {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          this.user = userDoc.data();
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        this.user = null;
        console.error('User is not logged in.');
      }
    },

    signOut() {
      auth.signOut();
      this.user = null;
    }
  }
});