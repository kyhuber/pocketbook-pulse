<template>
    <div>
      <h2>My Financial Goals</h2>
      <div v-if="financialGoals.length > 0">
        <ul>
          <li v-for="goal in financialGoals" :key="goal.id">
            <div>
              <strong>Goal Name:</strong> {{ goal.goalName }}
            </div>
            <div>
              <strong>Target Amount:</strong> {{ goal.targetAmount | currency }}
            </div>
            <div>
              <strong>Target Date:</strong> {{ goal.targetDate | date }}
            </div>
            <div>
              <strong>Amount Saved:</strong> {{ goal.amountSaved | currency }}
            </div>
            <div>
              <strong>Projected Rate of Return:</strong> {{ goal.projectedRateOfReturn }}%
            </div>
            <div>
              <strong>Priority Level:</strong> {{ goal.priorityLevel }}
            </div>
            <div>
              <strong>Notes:</strong> {{ goal.notes }}
            </div>
          </li>
        </ul>
      </div>
      <p v-else>No financial goals to display. Start adding your goals to see them here.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../firebase.mjs';
  import { collection, query, where, onSnapshot } from 'firebase/firestore';
  
  export default {
    name: 'FinancialGoals',
    setup() {
      const financialGoals = ref([]);
  
      // You need to replace 'userId' with the actual user's ID
      const fetchFinancialGoals = (userId) => {
        const q = query(collection(db, "financialGoals"), where("userId", "==", userId));
  
        // Real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          financialGoals.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        });
  
        // Call this function to stop listening to changes
        // onSnapshot returns a function that you can call to unsubscribe to changes
        return unsubscribe;
      };
  
      onMounted(() => {
        // Here you need to pass the actual logged in user's ID
        fetchFinancialGoals('userId');
      });
  
      return {
        financialGoals
      };
    }
  };
  </script>
  
  <style scoped>
  /* Scoped styles for FinancialGoals */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f5f5f5;
    border-radius: 0.5rem;
  }
  
  </style>  