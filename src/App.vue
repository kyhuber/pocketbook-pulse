<template>
  <div id="app">
    <TopNavBar v-if="user" />
    <SideNavBar v-if="user" />
    <LoadingIndicator v-if="isLoading" :isLoading="isLoading" />
    <router-view />
  </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import { useUserStore } from './stores/userStore';
import TopNavBar from './components/TopNavBar.vue';
import SideNavBar from './components/SideNavBar.vue';
import LoadingIndicator from './components/LoadingIndicator.vue';
import Modal from './components/Modal.vue';

export default {
  components: {
    TopNavBar,
    SideNavBar,
    LoadingIndicator,
    Modal,
  },

  setup() {
    const userStore = useUserStore();
    const isModalOpen = ref(false);

    onMounted(() => {
      userStore.initializeAuthListener();
      console.log('Component mounted. Current user:', userStore.user);
      console.log('Is Loading:', userStore.isLoading);
    });

    watch(() => userStore.user, (newUser) => {
      console.log('User state changed:', newUser);
    });

    watch(() => userStore.isLoading, (newLoadingState) => {
      console.log('Loading state changed:', newLoadingState);
    });

    return {
      user: userStore.user,
      isLoading: userStore.isLoading,
      userStore,
      isModalOpen,
    };
  },
};
</script>