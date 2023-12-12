<!-- Accounts.vue -->
<template>
  <div class="accounts-container">
    <h2>My Financial Accounts</h2>
    <table v-if="accounts.length > 0">
      <thead>
        <tr>
          <th>Type</th>
          <th>Institution</th>
          <th>Hyperlink</th>
          <th>Primary</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ account.accountType }}</td>
          <td>{{ account.institution }}</td>
          <td><a :href="account.hyperlink" target="_blank">{{ account.hyperlink }}</a></td>
          <td>{{ account.primary ? 'Yes' : 'No' }}</td>
          <td>{{ account.notes }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No financial accounts to display.</p>
    <router-link to="/addaccount" class="add-item-button">Add Financial Account</router-link>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { db } from '../firebase.mjs';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default {
  name: 'Accounts',
  setup() {
    const userStore = useUserStore();
    const accounts = ref([]);

    const fetchAccounts = async () => {
      try {
        if (userStore.user) {
          const q = query(collection(db, "accounts"), where("userId", "==", userStore.user.uid));
          const querySnapshot = await getDocs(q);
          accounts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          console.error("User is not authenticated or not available.");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    const sortedAccounts = computed(() => {
      return [...accounts.value].sort((a, b) => b.primary - a.primary); // Sorts such that primary account comes first
    });

    onMounted(() => {
      userStore.fetchUser();
      console.log("User on mounted in Accounts.vue:", userStore.user);
      fetchAccounts();
    });

    return {
      accounts: sortedAccounts,
    };
  },
};
</script>


<style scoped>
.accounts-container {
  margin: auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

a {
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>