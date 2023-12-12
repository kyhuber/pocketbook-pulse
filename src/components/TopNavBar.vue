<!-- TopNavBar.vue -->
<template>
  <nav class="top-nav">
    <div class="nav-content">
      <div class="nav-left">
        <a href="/" class="brand">Pocketbook Pulse</a>
      </div>

      <!-- Right side of the nav -->
      <div class="nav-right">
        <button @click="onHelpClick" class="help-button">Help</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

  },

  methods: {
    onHelpClick() {
      // Implement the logic for Help button click
      console.log("Help button clicked");
    }
  }
};
</script>

  
<style scoped>
.top-nav {
  width: 100%;
  position: fixed;
  /* Fix it to the top of the viewport */
  top: 0;
  /* Align it right at the top */
  left: 0;
  /* Align it to the left edge */
  background-color: #32424A;
  color: #ffffff;
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  /* Adjust as needed */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.brand {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

.help-button {
  background-color: #007bff;
  /* Example color */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.help-button:hover {
  background-color: #0056b3;
}
</style>
  