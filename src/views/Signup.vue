<template>
  <div class="signup-container">
    <h2 class="signup-header">Welcome to Pocketbook Pulse</h2>
    <p class="signup-subheader">Create your account to get started.</p>

    <form @submit.prevent="handleSignup" class="signup-form">
      <!-- Email input -->
      <div class="form-group">
        <label for="email" class="form-label">Email address*</label>
        <input id="email" type="email" v-model="email" required class="form-input" placeholder="Enter your email" />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password*</label>
        <input id="password" type="password" v-model="password" required class="form-input"
          placeholder="Create a password" />
      </div>

      <div v-if="signupError" class="error-message">
        {{ signupError }}
      </div>

      <!-- Signup button -->
      <div class="form-group">
        <button type="submit" class="button signup-button">Create Account</button>
        <button @click="returnToHome" class="back-button">Return to Home</button>
      </div>
    </form>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const signupError = ref('');
    const router = useRouter();
    const userStore = useUserStore();

    const handleSignup = async () => {
      try {
        await userStore.signup(email.value, password.value);
        router.push('/dashboard'); // Redirect to dashboard on successful signup
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          signupError.value = 'This email address is already in use.';
        } else {
          signupError.value = 'An error occurred during signup.';
          console.error('Error during signup:', error.message);
        }
      }
    };

    // Return to Home function here, if needed

    return { email, password, signupError, handleSignup };
  },
};
</script>


  
<style scoped>
.signup-header {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.signup-subheader {
  text-align: center;
  color: #555;
  margin-bottom: 30px;
}

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

.button {
  display: block;
  /* Change to block to allow full width */
  padding: 10px 20px;
  margin: 5px 0;
  /* Adjusted for spacing between buttons */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  text-align: center;
}

.signup-button {
  background-color: #000;
  font-weight: bold;
  position: center;
}

.signup-button:hover {
  background-color: #444;
}

.error-message {
  color: #e57373;
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
