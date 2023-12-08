<template>
  <aside class="sidenavbar">
    <div class="brand-container">
      <router-link to="/">Pocketbook Pulse</router-link>
    </div>
    <nav class="nav-menu">
      <router-link to="/financial-snapshot" class="nav-item">Financial Snapshot</router-link>
      <!-- Dropdown menu can be implemented with Vue.js logic if needed -->
      <router-link to="/accounts" class="nav-item">Accounts</router-link>
      <router-link to="/assets" class="nav-item">Assets</router-link>
      <router-link to="/liabilities" class="nav-item">Liabilities</router-link>
      <router-link to="/cashflows" class="nav-item">Cash Flows</router-link>
    </nav>
    <button class="sign-out" @click="signOut">Sign Out</button>
  </aside>
</template>

<script>
import { auth } from '../firebase.mjs';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const signOut = async () => {
      try {
        await auth.signOut();
        router.push('/'); // Redirect to Home page after signing out
      } catch (error) {
        console.error('Error signing out:', error);
        // Handle any errors here (e.g., show an error message)
      }
    };

    return {
      signOut,
    };
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed; /* Fixed position to the side of the window */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  width: 250px; /* Width of the sidebar */
  height: 100%; /* Full height of the viewport */
  background-color: #073b4c; /* A professional dark blue color */
  color: white;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes the bottom content to the end */
}

/* Sign Out button at the bottom of the sidebar */
.sign-out {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
}

.sign-out:hover {
  background-color: #1d3557; /* A lighter shade for hover effect */
}

/* Navigation links styling */
.nav-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  display: block; /* Make the links fill the horizontal space */
  margin-bottom: 0.5rem; /* Space between links */
}

.nav-item:hover {
  background-color: #1d3557; /* A lighter shade for hover effect */
}

/* Main content styles */
.main-content {
  margin-left: 250px; /* Push main content to the right */
  padding: 20px; /* Padding around the content */
  background-color: #f0f0f0; /* Light grey background for content area */
}
</style>