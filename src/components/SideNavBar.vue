<template>
  <aside class="sidenavbar">
    <div class="brand-container">
      <router-link to="/" class="brand">Pocketbook Pulse</router-link>
    </div>
    <nav class="nav-menu">
      <router-link to="/dashboard" class="nav-item">Dashboard</router-link>
      <router-link to="/financialsnapshot" class="nav-item">Financial Snapshot</router-link>
      <router-link to="/accounts" class="nav-item">Accounts</router-link>
      <router-link to="/financialgoals" class="nav-item">Financial Goals</router-link>
      <router-link to="/analysis" class="nav-item">Analysis</router-link>
      <router-link to="/cashflows" class="nav-item">Cash Flows</router-link>
      <router-link to="/userprofile" class="nav-item">User Profile</router-link>
      <router-link to="/visualize" class="nav-item">Visualize</router-link>
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
.sidenavbar {
  position: fixed; /* Fixed position to the side of the window */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  width: 250px; /* Width of the sidebar */
  height: 100%; /* Full height of the viewport */
  background-color: #32424A; /* A professional dark color */
  color: #E0F2F1; /* Light text color for readability */
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes the bottom content to the end */
  z-index: 1000; /* High z-index to ensure it's on top */
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