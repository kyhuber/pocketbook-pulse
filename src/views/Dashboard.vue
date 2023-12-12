<!-- Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <TopNavBar />
    <div class="content-container">
      <div class="content-container">
        <h2>Welcome to Da Dashboard</h2>
        <p>This is where you see how rich you are!!</p>
        <button @click="signOut">Sign Out</button>
      </div>
      <SideNavBar />
    </div>
  </div>
</template>
  
<script>
import TopNavBar from '../components/TopNavBar.vue';
import SideNavBar from '../components/SideNavBar.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

export default {
  components: {
    TopNavBar,
    SideNavBar
  },
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
  
<style scoped>
.dashboard-container {
  margin-left: 250px;
  padding: 20px;
  background: #fff;
}

h2 {
  color: #32424A;
  margin-bottom: 10px;
}

p {
  color: #546E7A;
  /*Slightly lighter gray */
}
</style>