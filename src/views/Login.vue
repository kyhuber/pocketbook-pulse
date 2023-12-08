<template>
  <div class="login-container">
    <h2 class="login-header">Welcome back to Pocketbook Pulse</h2>
    <p class="login-subheader">Enter your credentials to pick up where you left off.</p>

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
      <button @click="returnToHome" class="back-button">Return to Home</button>
      </div>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase.mjs'; // Make sure the path is correct relative to this component
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
    };
  },
  setup() {
    const router = useRouter();
    const returnToHome = () => {
      router.push('/');
    };
    return { returnToHome };
  },
  methods: {
  async handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      this.$router.push('/dashboard');
    } catch (error) {
      this.loginError = error.message; // Display error messages to the user
    }
  },
  },
};
</script>

<style scoped>

.login-header {
  text-align: center;
  color: #333; /* Or any color that fits the design */
  margin-bottom: 20px;
}

.login-subheader {
  text-align: center;
  color: #555; /* A lighter shade for the subheader */
  margin-bottom: 30px;
}
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
  color: #333
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #1e88e5; /* Or use a color that matches your site's theme */
  outline: none;
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
