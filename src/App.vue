<!-- App.vue -->
<template>
  <div id="app">
    <SideNavBar v-if="user" />
    <router-view />
  </div>
</template>

<script>
import SideNavBar from './components/SideNavBar.vue';
import { ref, onMounted } from 'vue';
import { auth } from './firebase.mjs';

export default {
  components: {
    SideNavBar
  },
  setup() {
    const user = ref(null);

    onMounted(() => {
      auth.onAuthStateChanged((firebaseUser) => {
        user.value = firebaseUser;
      });
    });

    return { user };
  }
};
</script>