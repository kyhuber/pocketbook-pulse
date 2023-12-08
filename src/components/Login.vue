<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-4 flex flex-col">
      <label for="email" class="mb-2 font-bold">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        required
        class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <div class="mb-4 flex flex-col">
      <label for="password" class="mb-2 font-bold">Password:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        required
        class="bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <p v-if="loginError" class="error mb-4">{{ loginError }}</p>

    <button
      type="submit"
      class="bg-primary text-white rounded px-4 py-2 font-bold shadow hover:bg-blue-600"
    >
      Login
    </button>
  </form>
</template>

<script>
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
      const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password);
      // Handle successful login here, e.g., redirect or update UI
    } catch (error) {
      this.loginError = error.message; // Display error messages to the user
    }
  },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>