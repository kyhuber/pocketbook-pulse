<template>
    <div>
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
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../firebase.mjs';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  
  export default {
    name: 'AccountsList',
    setup() {
      const accounts = ref([]);
      const user = ref(null); // Replace with user state management
      
      const fetchAccounts = async () => {
        try {
          // Replace 'userId' with actual logic to get the current user's ID
          const q = query(collection(db, "accounts"), where("userId", "==", user.value));
          const querySnapshot = await getDocs(q);
          accounts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };
  
      onMounted(fetchAccounts);
  
      return {
        accounts,
        // other reactive properties here
      };
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for AccountsList */
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
  </style>
  