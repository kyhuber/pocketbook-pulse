<template>
  <div class="signup-container">
    <h2 class="signup-header">Welcome to Pocketbook Pulse</h2>
    <p class="signup-subheader">Create your account to get started.</p>

    <form @submit.prevent="handleSignup" class="signup-form">
      <!-- Email input -->
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
import { useRoute, useRouter } from 'vue-router';
import { auth } from '../firebase.mjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase.mjs';
import { doc, setDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      email: '',
      password: '',
      signupError: '',
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const returnToHome = () => {
      router.push('/');
    }
    return { router, route, returnToHome };
  },
  methods: {
    async handleSignup() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        // Now create a user profile document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: this.email,
          // Any other initial fields you want to set
        });
        // Reset form fields
        this.email = '';
        this.password = '';
        // Redirect to the dashboard or another route
        this.$router.push('/dashboard');
      } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
          this.signupError = 'This email address is already in use.';
        } else {
          this.signupError = 'An error occurred during signup.';
          console.error('Error during signup:', error.message);
        }
    }
    },
  },
};
</script>

  
<style scoped>
.signup-header {
  text-align: center;
  color: #333; /* Or any color that fits the design */
  margin-bottom: 20px;
}

.signup-subheader {
  text-align: center;
  color: #555; /* A lighter shade for the subheader */
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
  display: block; /* Change to block to allow full width */
  padding: 10px 20px;
  margin: 5px 0; /* Adjusted for spacing between buttons */
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
  color: #e57373; /* A softer shade of red */
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
