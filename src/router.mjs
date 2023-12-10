// src/router.mjs

import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/userStore';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import Accounts from './components/Accounts.vue';
import AddAccount from './components/AddAccount.vue';
import AddFinancialGoal from './components/AddFinancialGoal.vue';
import AddLiability from './components/AddLiability.vue';
import AddTangibleAsset from './components/AddTangibleAsset.vue';
import Analysis from './components/Analysis.vue';
import BalanceInput from './components/BalanceInput.vue';
import CashFlows from './components/CashFlows.vue';
import FinancialGoals from './components/FinancialGoals.vue';
import FinancialSnapshot from './components/FinancialSnapshot.vue';
import IncomeExpenseInput from './components/IncomeExpenseInput.vue';
import UserProfile from './components/UserProfile.vue';
import Visualize from './components/Visualize.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/accounts', component: Accounts, meta: { requiresAuth: true } },
  { path: '/addaccount', component: AddAccount, meta: { requiresAuth: true } },
  { path: '/addfinancialgoal', component: AddFinancialGoal, meta: { requiresAuth: true } },
  { path: '/addliability', component: AddLiability, meta: { requiresAuth: true } },
  { path: '/addtangibleasset', component: AddTangibleAsset, meta: { requiresAuth: true } },
  { path: '/analysis', component: Analysis, meta: { requiresAuth: true } },
  { path: '/balanceinput', component: BalanceInput, meta: { requiresAuth: true } },
  { path: '/cashflows', component: CashFlows, meta: { requiresAuth: true } },
  { path: '/financialgoals', component: FinancialGoals, meta: { requiresAuth: true } },
  { path: '/financialsnapshot', component: FinancialSnapshot, meta: { requiresAuth: true } },
  { path: '/incomeexpenseinput', component: IncomeExpenseInput, meta: { requiresAuth: true } },
  { path: '/visualize', component: Visualize, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.isAuthenticated) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next(); // Proceed if the route does not require authentication
  }
});

export default router;
