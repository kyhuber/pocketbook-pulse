<template>
  <div id="app">
    <!-- Display TopNavbar only when the user is logged in -->
    <TopNavbar v-if="user" />

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
import { auth } from './firebase.mjs';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import Dashboard from './components/Dashboard.vue';
import AddAccount from './components/AddAccount.vue';
import SideNavBar from './components/SideNavBar.vue';
import AddFinancialGoal from './components/AddFinancialGoal.vue';
import AddTangibleAsset from './components/AddTangibleAsset.vue';
import AddLiability from './components/AddLiability.vue';

export default {
  components: {
    Login,
    Signup,
    Dashboard,
    AddAccount,
    SideNavBar,
    AddFinancialGoal,
    AddTangibleAsset,
    AddLiability,
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