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
    signOut() {
      auth.signOut();
      this.user = null;
    }
  }
});