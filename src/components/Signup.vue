<template>
  <div class="signup-container">
    <form @submit.prevent="handleSignup" class="signup-form">
      <div class="form-group">
        <label for="email" class="form-label">Email address*</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          class="form-input"
          placeholder="Enter your email"
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
          placeholder="Create a password"
        />
      </div>

      <div class="form-group">
        <button type="submit" class="button signup-button">Create Account</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebase.mjs';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSignup() {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          // Handle successful signup here, e.g., redirect or update UI
        } catch (error) {
          console.error(error.message); // Handle signup errors
        }
      },
    },
  };
  </script>
  
  <style scoped>
.signup-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
}

.signup-form {
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.button:hover {
  background-color: #444;
}

.signup-button {
  font-weight: bold;
}
</style>
  