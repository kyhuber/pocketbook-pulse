
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
        <login @userLoggedIn="handleUserLoggedIn" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

import login from './components/login.svelte'; // Import your login component

export default {
  setup() {
    const user = ref(null);

    // Observe the authentication state
    firebase.auth().onAuthStateChanged((authUser) => {
      user.value = authUser;
    });

    // Sign out method
    const signOut = async () => {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        console.error(error.message);
      }
    };

    // Handle user logged in event from login component
    const handleUserLoggedIn = (loggedInUser) => {
      user.value = loggedInUser;
    };

    return {
      user,
      signOut,
      handleUserLoggedIn,
    };
  },
};
</script>

<style src="./style.css"></style>