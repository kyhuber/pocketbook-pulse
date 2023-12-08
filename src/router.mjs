// src/router.mjs

import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import { auth } from './firebase.mjs';

const routes = [
  { path: '/', component: Home },
    { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Check if the user is authenticated
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    // Redirect the user to the Home page if they are not authenticated
    next('/');
  } else {
    // Allow the route to proceed as normal if the user is authenticated or if the route does not require authentication
    next();
  }
});

export default router;
