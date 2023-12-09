<template>
  <div class="home-container">
    <h1>Welcome to Pocketbook Pulse</h1>
    <p>This is your personal finance tracker.</p>
    <!-- Calls to action for Login and Signup -->
    <router-link to="/login" class="button">Log In</router-link>
    <router-link to="/signup" class="button">Sign Up</router-link>
    <!-- Other content -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  // Any script logic
};
</script>

<style scoped>
.home-container {
  text-align: center;
  /* Additional styling */
}

.button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #1e88e5; /* Example button color */
  color: white;
  text-decoration: none;
  width: 90px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0d47a1; /* Darker blue on hover */
}
</style>
