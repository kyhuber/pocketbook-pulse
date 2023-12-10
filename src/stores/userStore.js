// src/stores/userStore.js
import { defineStore } from 'pinia';
import { auth } from '../firebase.mjs';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    fetchUser() {
      auth.onAuthStateChanged((user) => {
        this.setUser(user);
      });
    },
  },
});