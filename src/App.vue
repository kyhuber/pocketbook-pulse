<template>
  <div id="app">
    <!-- Display SideNavBar only when the user is logged in -->
    <SideNavBar v-if="user" />

    <!-- The router-view will handle rendering the appropriate component based on the route -->
    <router-view v-else />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from './firebase.mjs';
import SideNavBar from './components/SideNavBar.vue';

export default {
  components: {
    SideNavBar,
  },
  setup() {
    const user = ref(null);

    // Listen for auth state changes
    onMounted(() => {
      auth.onAuthStateChanged((usr) => {
        user.value = usr;
      });
    });

    return {
      user,
    };
  },
};
</script>
