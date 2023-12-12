<template>
  <div class="add-account">
    <h2>Add New Account</h2>
    <form @submit.prevent="addAccount">
      <!-- Account Type -->
      <div>
        <label for="accountType">Account Type:</label>
        <select id="accountType" v-model="account.accountType" required>
          <option disabled value="">Please select one</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
          <option value="investment">Investment</option>
          <option value="crypto">Crypto</option>
        </select>
      </div>

      <!-- Institution -->
      <div>
        <label for="institution">Institution:</label>
        <input id="institution" v-model="account.institution" type="text" required />
      </div>

      <!-- Hyperlink -->
      <div>
        <label for="hyperlink">Hyperlink:</label>
        <input id="hyperlink" v-model="account.hyperlink" type="url" />
      </div>

      <!-- Primary Account Checkbox -->
      <div v-if="account.accountType === 'checking'">
        <label for="primary">Primary Bank Account:</label>
        <input id="primary" type="checkbox" v-model="account.primary" />
      </div>

      <!-- Relevant Notes -->
      <div>
        <label for="notes">Relevant Notes:</label>
        <textarea id="notes" v-model="account.notes"></textarea>
      </div>

      <button type="submit">Add Account</button>
    </form>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { db } from '../firebase.mjs';
import { collection, addDoc } from 'firebase/firestore';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const router = useRouter(); // Get the router instance
    const userStore = useUserStore();
    const account = ref({
      accountType: '',
      institution: '',
      hyperlink: '',
      primary: false,
      notes: ''
    });

    const addAccount = async () => {
      if (!userStore.user) {
        alert('You must be logged in to add an account.');
        return;
      }

      try {
        // Include the user ID in the account data
        const accountData = {
          ...account.value,
          userId: userStore.user.uid
        };

        await addDoc(collection(db, "accounts"), accountData);
        alert("Account added successfully!");
        router.push('/accounts'); // Redirect to Accounts.vue
      } catch (e) {
        alert("Error adding account: " + e.message);
      }
    };

    return {
      account,
      addAccount
    };
  }
};
</script>

<style scoped>
.add-account {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #32424A;
  /* A professional dark color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-account h2 {
  margin-bottom: 20px;
}

.add-account form div {
  margin-bottom: 15px;
}

.add-account form label {
  display: block;
  margin-bottom: 5px;
}

.add-account form input,
.add-account form select,
.add-account form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  ;
  /* Or any other preferred color */
  color: #32424A
    /* This will set the text color to white */
}

.add-account form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-account form button:hover {
  background-color: #0056b3;
}
</style>  