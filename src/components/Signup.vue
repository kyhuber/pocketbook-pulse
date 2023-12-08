<template>
    <form @submit.prevent="handleSignup">
      <div class="mb-4 flex flex-col">
        <label for="email" class="mb-2 font-bold">Email:</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
  
      <div class="mb-4 flex flex-col">
        <label for="password" class="mb-2 font-bold">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
  
      <button
        type="submit"
        class="bg-primary text-white rounded px-4 py-2 font-bold shadow hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebase.mjs';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSignup() {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          // Handle successful signup here, e.g., redirect or update UI
        } catch (error) {
          console.error(error.message); // Handle signup errors
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the signup form */
  </style>
  