<template>
  <div id="app">
    <div v-if="user" class="welcome-container">
      <p>Welcome, {{ user.displayName }}!</p>
      <button @click="signOut" class="button signout-button">Sign Out</button>
    </div>
    <div v-else class="auth-container">
      <!-- Modal-like design starts here -->
      <div class="login-modal">
        <header class="modal-header">
          <h1>Pocketbook Pulse</h1>
        </header>
        <main class="modal-content">
          <Login @userLoggedIn="handleUserLoggedIn" />
        </main>
      <footer class="modal-footer">
        <p class="new-user-text">
          New to Pocketbook Pulse?
          <button class="toggle-signup" @click="toggleSignupForm">
            <span v-if="showSignupForm">&#9650;</span>
            <span v-else>&#9660;</span>
          </button>
        </p>
        <Signup v-if="showSignupForm" />
      </footer>
      </div>
    </div>
  <Dashboard v-if="user" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from './firebase.mjs'; // Import Firebase auth from your firebase.mjs file
import Login from './components/login.vue'; // Adjust the path to your Login component
import Signup from './components/signup.vue'; // Import the Signup component
import Dashboard from './components/Dashboard.vue'; // Adjust the path to your Dashboard component


export default {
  components: {
    Login,
    Signup,
    Dashboard,
  },
  setup() {
    const user = ref(null); // Example of using ref for reactive user state
    const showSignupForm = ref(false); 

    // Example authentication check (pseudo-code, replace with your logic)
    auth.onAuthStateChanged((usr) => {
      if (usr) {
        user.value = usr;
      } else {
        user.value = null;
      }
    });

    const signOut = async () => {
      await auth.signOut();
      user.value = null;
    };

    const handleUserLoggedIn = (usr) => {
      user.value = usr;
    };

    const toggleSignupForm = () => {
      showSignupForm.value = !showSignupForm.value;
    };

    return {
      user,
      signOut,
      handleUserLoggedIn,
      showSignupForm,
      toggleSignupForm,
    };
  },
};
</script>

<style src="./style.css"></style>