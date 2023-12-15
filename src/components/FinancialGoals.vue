<template>
  <div class="main-content" :class="{ 'modal-open': isModalOpen }">
    <h2>My Financial Goals</h2>

    <div v-if="financialGoals.length > 0">
      <table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Target Amount</th>
            <th>Amount Saved</th>
            <th>Projected Rate of Return</th>
            <th>Priority Level</th>
            <th>Linked Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="goal in financialGoals" :key="goal.id">
            <td v-if="!goal.isEditing">{{ goal.goalName }}</td>
            <td v-else><input type="text" v-model="goal.goalName" /></td>
            <td>{{ goal.targetAmount }}</td>
            <td>{{ goal.amountSaved }}</td>
            <td>{{ goal.projectedRateOfReturn }}%</td>
            <td>{{ goal.priorityLevel }}</td>
            <td v-if="!goal.isEditing">
              {{ getAccountNameById(goal.linkedAccountId) }}
            </td>
            <td v-else>
              <select v-model="goal.linkedAccountId">
                <option disabled value="">Select an account</option>
                <option v-for="account in accounts" :value="account.id" :key="account.id">
                  {{ account.institution }}
                </option>
              </select>
            </td>
            <td>
              <button v-if="!goal.isEditing" @click="startEditing(goal)">🖉 Edit</button>
              <button v-else @click="saveGoal(goal)">Save</button>
              <button @click="deleteGoal(goal)">⨉ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="add-item-button" @click="isModalOpen = true">Add Financial Goal</button>

      <Modal :show="isModalOpen" @update:show="isModalOpen = $event">
        <AddFinancialGoal @goalAdded="isModalOpen = false" />
      </Modal>
    </div>
    <p v-else>No financial goals to display. Start adding your goals to see them here.</p>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { db } from '../Firebase.mjs';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import AddFinancialGoal from './AddFinancialGoal.vue';
import Modal from './Modal.vue';
import useGlobalState from '../UseGlobalState';

export default {
  name: 'FinancialGoals',
  components: {
    AddFinancialGoal,
    Modal,
  },
  setup(_, { emit }) {
    const financialGoals = ref([]);
    const accounts = ref([]);
    const router = useRouter();
    const userStore = useUserStore();
    const isModalOpen = ref(false);
    const { addItem } = useGlobalState();

    const fetchFinancialGoals = async () => {
      try {
        if (userStore.user) {
          const q = query(collection(db, "financialGoals"), where("userId", "==", userStore.user.uid));
          const querySnapshot = await getDocs(q);
          financialGoals.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            isEditing: false
          }));
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching financial goals:", error);
      }
    };

    const fetchAccounts = async () => {
      try {
        if (userStore.user) {
          const q = query(collection(db, "accounts"), where("userId", "==", userStore.user.uid));
          const querySnapshot = await getDocs(q);
          accounts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    const startEditing = (goal) => {
      goal.isEditing = true;
    };

    const saveGoal = async (goal) => {
      try {
        await updateDoc(doc(db, "financialGoals", goal.id), {
          goalName: goal.goalName,
          targetAmount: goal.targetAmount,
          targetDate: goal.targetDate,
          amountSaved: goal.amountSaved,
          projectedRateOfReturn: goal.projectedRateOfReturn,
          priorityLevel: goal.priorityLevel,
          linkedAccountId: goal.linkedAccountId,
        });
        goal.isEditing = false;
        console.log("Goal updated successfully.");
      } catch (error) {
        console.error("Error updating goal:", error);
      }
    };

    const getAccountNameById = (accountId) => {
      const account = accounts.value.find((acc) => acc.id === accountId);
      return account ? account.institution : 'Not linked';
    };

    const deleteGoal = async (goal) => {
      try {
        await deleteDoc(doc(db, "financialGoals", goal.id));
        financialGoals.value = financialGoals.value.filter((g) => g.id !== goal.id);
        console.log("Goal deleted successfully.");
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    };

    const addNewItem = (newItem) => {
      addItem(newItem);
      emit('closeModal');
    };

    const handleNewGoal = (newGoal) => {
      addNewItem(newGoal);
      isModalOpen.value = false;
      router.go();
    };

    onMounted(() => {
      fetchFinancialGoals();
      fetchAccounts();
    });

    return {
      isModalOpen,
      financialGoals,
      accounts,
      getAccountNameById,
      startEditing,
      saveGoal,
      deleteGoal,
      handleNewGoal,
    };
  }
};
</script>

<style scoped>
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