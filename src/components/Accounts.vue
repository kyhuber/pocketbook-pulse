<!-- Accounts.vue -->
<template>
  <div class="main-content">
    <h2>My Financial Accounts</h2>

    <div v-if="accounts.length > 0">
      <table>
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
      <button class="add-item-button" @click="openAddAccountModal">Add Account</button>

      <!-- Use Modal.vue to display the Add Account form -->
      <Modal :show="isModalOpen" @update:show="isModalOpen = $event">
        <AddAccount @accountAdded="isModalOpen = false" />
      </Modal>
    </div>
    <p v-else>No financial accounts to display.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { db } from '../Firebase.mjs';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import AddAccount from './AddAccount.vue'; // Import the AddAccount.vue component
import Modal from './Modal.vue';

export default {
  name: 'Accounts',
  components: {
    AddAccount, // Register the AddAccount.vue component
    Modal,
  },
  setup() {
    const userStore = useUserStore();
    const accounts = ref([]);
    const isModalOpen = ref(false);

    const fetchAccounts = async () => {
      try {
        if (userStore.user) {
          const q = query(collection(db, 'accounts'), where('userId', '==', userStore.user.uid));
          const querySnapshot = await getDocs(q);
          accounts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          console.error('User is not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    const openAddAccountModal = () => {
      isModalOpen.value = true;
    };

    const closeAddAccountModal = () => {
      isModalOpen.value = false;
    };

    const addAccount = async (newAccountData) => {
      try {
        if (!userStore.user) {
          alert('You must be logged in to add an account.');
          return;
        }

        // Include the user ID in the account data
        const accountData = {
          ...newAccountData,
          userId: userStore.user.uid,
        };

        await addDoc(collection(db, 'accounts'), accountData);
        alert('Account added successfully!');
        closeAddAccountModal();
        fetchAccounts(); // Refresh the account list
      } catch (e) {
        alert('Error adding account: ' + e.message);
      }
    };

    onMounted(() => {
      fetchAccounts();
    });

    return {
      isModalOpen,
      accounts,
      openAddAccountModal,
      closeAddAccountModal,
      addAccount,
    };
  },
};
</script>

<style scoped>
.modal-open .financial-goals {
  filter: blur(2px);
  opacity: 0.8;
  pointer-events: none;
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
