<template>
  <div class="main-content">
    <h2>My Financial Accounts</h2>
    <ul v-if="accounts.length > 0">
      <li v-for="account in accounts" :key="account.id">
        <strong>Type:</strong> {{ account.accountType }} |
        <strong>Institution:</strong> {{ account.institution }} |
        <strong>Hyperlink:</strong> <a :href="account.hyperlink" target="_blank">{{ account.hyperlink }}</a> |
        <strong>Primary:</strong> {{ account.primary ? 'Yes' : 'No' }} |
        <strong>Notes:</strong> {{ account.notes }}
      </li>
    </ul>
    <p v-else>No financial accounts to display.</p>
    <router-link to="/addaccount" class="add-account-button">Add Financial Account</router-link>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../stores/user';
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

      onMounted(() => {
        userStore.fetchUser(); // Ensure the user is fetched on component mount
        fetchAccounts();
      });

      return {
        accounts,
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  background: #f3f3f3;
  border-radius: 8px;
}

a {
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}

.add-account-button {
  display: block;
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 10px 20px;
  margin-top: 20px;
  text-decoration: none;
  border-radius: 4px;
}

.add-account-button:hover {
  background-color: #388e3c;
}
</style>
