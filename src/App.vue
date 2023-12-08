<template>
  <div id="app">
    <header>
      <h1>Pocketbook Pulse</h1>
    </header>
    <main>
      <!-- Check if the user is authenticated -->
      <div v-if="user">
        <!-- Content for authenticated users -->
        <p>Welcome, {{ user.displayName }}!</p>
        <button @click="signOut">Sign Out</button>
      </div>
      <div v-else>
        <!-- Content for non-authenticated users -->
        <Login @userLoggedIn="handleUserLoggedIn" />
        <Signup /> <!-- Include the Signup component here -->
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from './firebase.mjs'; // Import Firebase auth from your firebase.mjs file
import Login from './components/Login.vue'; // Adjust the path to your Login component
import Signup from './components/Signup.vue'; // Import the Signup component

export default {
  components: {
    Login, // Register the Login component
    Signup, // Register the Signup component
  },
  data() {
    return {
      loginError: null,
    };
  },
  methods: {
    handleLoginSuccess() {
      // Handle successful login here, e.g., redirect or update UI
    },
  },
};
</script>

<style src="./style.css"></style>