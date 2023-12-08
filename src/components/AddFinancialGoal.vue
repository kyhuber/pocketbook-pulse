<template>
    <div class="add-goal-container">
      <h2>Add Financial Goal</h2>
      <form @submit.prevent="addFinancialGoal">
        <!-- Goal Name -->
        <div>
          <label for="goalName">Goal Name:</label>
          <input id="goalName" v-model="financialGoal.goalName" type="text" required />
        </div>
  
        <!-- Target Amount -->
        <div>
          <label for="targetAmount">Target Amount:</label>
          <input id="targetAmount" v-model.number="financialGoal.targetAmount" type="number" required />
        </div>
  
        <!-- Target Date -->
        <div>
          <label for="targetDate">Target Date:</label>
          <input id="targetDate" v-model="financialGoal.targetDate" type="date" />
        </div>
  
        <!-- Amount Saved -->
        <div>
          <label for="amountSaved">Amount Saved:</label>
          <input id="amountSaved" v-model.number="financialGoal.amountSaved" type="number" />
        </div>
  
        <!-- Projected Rate of Return -->
        <div>
          <label for="projectedRateOfReturn">Projected Rate of Return:</label>
          <input id="projectedRateOfReturn" v-model.number="financialGoal.projectedRateOfReturn" type="number" placeholder="0" />
        </div>
  
        <!-- Priority Level -->
        <div>
          <label for="priorityLevel">Priority Level:</label>
          <select id="priorityLevel" v-model="financialGoal.priorityLevel" required>
            <option value="Critical">Critical</option>
            <option value="Important">Important</option>
            <option value="Hopefully">Hopefully</option>
            <option value="Would Be Nice">Would Be Nice</option>
          </select>
        </div>
  
        <button type="submit">Add Goal</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { db } from '../firebase.mjs';
  import { collection, addDoc } from 'firebase/firestore';
  
  export default {
    name: 'AddFinancialGoal',
    setup() {
      const financialGoal = ref({
        goalName: '',
        targetAmount: 0,
        targetDate: '',
        amountSaved: 0,
        projectedRateOfReturn: 0,
        priorityLevel: ''
      });
  
      const addFinancialGoal = async () => {
        try {
          await addDoc(collection(db, "financialGoals"), financialGoal.value);
          alert("Financial goal added successfully!");
          financialGoal.value = { ...initialState }; // Reset to initial state
        } catch (e) {
          alert("Error adding financial goal: " + e.message);
        }
      };
  
      return {
        financialGoal,
        addFinancialGoal
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  