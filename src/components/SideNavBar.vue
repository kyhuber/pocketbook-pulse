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
      <!-- Repeat for other navigation links -->
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px; /* Adjust width as needed */
  height: 100vh; /* Full viewport height */
  background-color: #333; /* Dark background for sidebar */
  color: white;
  padding: 1rem;
  box-sizing: border-box;
}

.brand-container {
  padding: 0.5rem 0;
  margin-bottom: 1rem; /* Space below brand/logo */
}

.nav-menu {
  display: flex;
  flex-direction: column; /* Stack nav items vertically */
}

.nav-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #555; /* Highlight on hover */
}

/* Assuming you are using Vue Router, style active links */
.router-link-exact-active {
  background-color: #555;
}
</style>

