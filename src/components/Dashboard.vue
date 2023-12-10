<template>
  <div>
    <h2>Welcome to Your Dashboard</h2>
    <p>This is where your financial data and information will be displayed.</p>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // Method to sign out the user
    const signOut = async () => {
      try {
        await userStore.signOut();
        router.push('/login');
      } catch (error) {
        console.error('Sign out error:', error);
      }
    };

    return { signOut };
  },
};
</script>
