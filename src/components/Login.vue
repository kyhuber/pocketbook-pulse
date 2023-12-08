<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email" class="form-label">Email address*</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password*</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          class="form-input"
        />
        <div class="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>

      <div v-if="loginError" class="error">{{ loginError }}</div>

      <div class="form-group">
        <button type="submit" class="button login-button">Sign In</button>
      </div>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase.mjs'; // Make sure the path is correct relative to this component
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
  async handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      // Handle successful login here, e.g., redirect or update UI
    } catch (error) {
      this.loginError = error.message; // Display error messages to the user
    }
  },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto; /* Remove the top margin to align with the header */
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-input {
  width: 100%; /* Full width to match container */
  padding: 12px 20px; /* Updated padding to match global styles */
  margin-bottom: 15px; /* Consistent margin for spacing */
  border: 1px solid #ccc; /* Subtle border color */
  border-radius: 4px; /* Consistent border-radius */
  box-sizing: border-box; /* Ensures padding is included in width */
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.button {
  width: 100%; /* Full width to match input fields */
  padding: 10px 20px;
  background-color: #000; /* Consistent button color with global styles */
  color: #fff;
  border: none;
  border-radius: 20px; /* Rounded borders for buttons */
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.button:hover {
  background-color: #333; /* Slightly lighter black on hover */
}

.error {
  color: red;
  padding: 10px 0;
  text-align: center;
}

.login-button {
  font-weight: bold; /* Maintain bold font for the login button */
}
</style>
