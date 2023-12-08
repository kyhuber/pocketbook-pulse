<template>
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <p>This is where your financial data and information will be displayed.</p>
      <button @click="signOut">Sign Out</button>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase.mjs';
  
  export default {
    methods: {
      signOut() {
        auth.signOut(); // Firebase sign-out method
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the dashboard here */
  </style>
  