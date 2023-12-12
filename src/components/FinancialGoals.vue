<template>
  <div class="main-content">
    <h2>My Financial Goals</h2>
    <button @click="goToAddFinancialGoal" class="add-item-button">Add Financial Goal</button>

    <div v-if="financialGoals.length > 0">
      <table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Target Amount</th>
            <th>Target Date</th>
            <th>Amount Saved</th>
            <th>Projected Rate of Return</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="goal in financialGoals" :key="goal.id">
            <td>{{ goal.goalName }}</td>
            <td>{{ goal.targetAmount }}</td>
            <td>{{ goal.targetDate }}</td>
            <td>{{ goal.amountSaved }}</td>
            <td>{{ goal.projectedRateOfReturn }}%</td>
            <td>{{ goal.priorityLevel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No financial goals to display. Start adding your goals to see them here.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../firebase.mjs';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore'; // Make sure to import useUserStore

export default {
  name: 'FinancialGoals',
  setup() {
    const financialGoals = ref([]);
    const router = useRouter();
    const userStore = useUserStore(); // Use the user store to get the user's id

    const fetchFinancialGoals = async () => {
      try {
        if (userStore.user) {
          const q = query(collection(db, "financialGoals"), where("userId", "==", userStore.user.uid));
          const querySnapshot = await getDocs(q);
          financialGoals.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching financial goals:", error);
      }
    };

    onMounted(() => {
      fetchFinancialGoals();
    });

    const goToAddFinancialGoal = () => {
      router.push('/addfinancialgoal');
    };

    return {
      financialGoals,
      goToAddFinancialGoal
    };
  }
};
</script>

<style scoped>
.add-goal-button {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #1e88e5;
  /* Example button color */
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-goal-button:hover {
  background-color: #1565c0;
  /* Darker shade on hover */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>