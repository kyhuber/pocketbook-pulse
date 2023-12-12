<template>
  <div class="add-liability-container">
    <h2>Add Liability</h2>
    <form @submit.prevent="addLiability">
      <!-- Liability Type -->
      <div>
        <label for="liabilityType">Liability Type:</label>
        <select id="liabilityType" v-model="liability.liabilityType" required>
          <option disabled value="">Select a liability type</option>
          <option value="loan">Loan</option>
          <option value="mortgage">Mortgage</option>
          <option value="creditCard">Credit Card</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Institution -->
      <div>
        <label for="institution">Institution:</label>
        <input id="institution" v-model="liability.institution" type="text" required />
      </div>

      <!-- Hyperlink -->
      <div>
        <label for="hyperlink">Hyperlink:</label>
        <input id="hyperlink" v-model="liability.hyperlink" type="url" />
      </div>

      <!-- Relevant Notes -->
      <div>
        <label for="notes">Relevant Notes:</label>
        <textarea id="notes" v-model="liability.notes"></textarea>
      </div>

      <button type="submit">Add Liability</button>
    </form>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { db } from '../Firebase.mjs';
import { collection, addDoc } from 'firebase/firestore';
import { useUserStore } from '../stores/userStore';

export default {
  name: 'AddLiability',
  setup() {
    const liability = ref({
      liabilityType: '',
      institution: '',
      hyperlink: '',
      notes: ''
    });

    const userStore = useUserStore();

    const addLiability = async () => {
      if (userStore.user) {
        try {
          await addDoc(collection(db, "liabilities"), {
            ...liability.value,
            userId: userStore.user.uid
          });
          alert("Liability added successfully!");
          liability.value = {
            liabilityType: '',
            institution: '',
            hyperlink: '',
            notes: ''
          };
        } catch (e) {
          console.error("Error adding liability:", e);
          alert("Error adding liability. Please try again.");
        }
      } else {
        alert("You must be logged in to add a liability.");
      }
    };

    return {
      liability,
      addLiability
    };
  }
};
</script>

  
<style scoped>
.add-liability-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
  