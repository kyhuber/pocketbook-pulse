<!-- App.vue -->
<template>
  <div id="app">
    <TopNavBar v-if="user" />
    <SideNavBar v-if="user" />
    <router-view />
  </div>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue';
import SideNavBar from './components/SideNavBar.vue';
import { useUserStore } from './stores/userStore';

export default {
  components: {
    TopNavBar,
    SideNavBar,
  },
  setup() {
    const userStore = useUserStore();

    return {
      user: userStore.user,
    };
  }
};
</script>