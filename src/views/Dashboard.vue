<!-- Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <TopNavBar />
    <div class="content-wrapper">
      <SideNavBar />
      <main class="main-content">
        <h2>Welcome to Da Dashboard</h2>
        <p>This is where you see how rich you are!</p>
      </main>
    </div>
  </div>
</template>
  
<script>
import TopNavBar from '../components/TopNavBar.vue';
import SideNavBar from '../components/SideNavBar.vue';

export default {
  components: {
    TopNavBar,
    SideNavBar
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