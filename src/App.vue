<!-- App.vue -->
<template>
  <div id="app">
    <TopNavBar v-if="user"/>
    <SideNavBar v-if="user" />
    <router-view />
  </div>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue';
import SideNavBar from './components/SideNavBar.vue';
import { ref, onMounted } from 'vue';
import { auth } from './firebase.mjs';

export default {
  components: {
    TopNavBar,
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